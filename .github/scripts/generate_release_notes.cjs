const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = process.cwd();
const outputPath = path.join(root, 'release_notes.md');
const templatePath = path.join(root, '.github', 'release-prompt-template.md');
const repository = process.env.GITHUB_REPOSITORY || 'dyzulk/anonymous-story-viewer';
const releaseTag = process.env.GITHUB_REF_NAME || 'v0.0.0';

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function getCommitLog() {
  try {
    const tags = git('tag', '--sort=-version:refname', '--list', 'v*').split('\n').filter(Boolean);
    if (tags.length > 1) {
      return git('log', `${tags[1]}..HEAD`, '--oneline');
    }
    return git('log', '--oneline', '-n', '50');
  } catch {
    return 'Initial release / No commit logs found.';
  }
}

function artifactTable() {
  return `
### Downloads

| Browser | Package | Installation |
| --- | --- | --- |
| Chrome, Edge, Brave, Vivaldi, Opera | [anonymous-story-viewer-${releaseTag}-chrome.zip](https://github.com/${repository}/releases/download/${releaseTag}/anonymous-story-viewer-${releaseTag}-chrome.zip) | Load the extracted package from the browser extensions page |
| Firefox | [anonymous-story-viewer-${releaseTag}-firefox.zip](https://github.com/${repository}/releases/download/${releaseTag}/anonymous-story-viewer-${releaseTag}-firefox.zip) | Load as a temporary add-on from about:debugging |
`;
}

async function generate() {
  const commitLog = getCommitLog() || 'No commits found since the previous release.';
  const template = fs.readFileSync(templatePath, 'utf8')
    .replace('{{COMMIT_LOG}}', commitLog)
    .replace('{{ARTIFACT_TABLE}}', artifactTable());
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured. Gemini is required to generate release notes.');
  }

  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath);
  }

  const candidateModels = [
    'gemini-flash-latest',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.7-flash',
    'gemini-flash-lite-latest',
  ];
  const requestBody = {
    contents: [{ parts: [{ text: template }] }],
  };
  const failures = [];
  let notes;

  for (const modelName of candidateModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        console.log(`Requesting Gemini model ${modelName} (attempt ${attempt}/3)...`);
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          failures.push(`${modelName} attempt ${attempt}: HTTP ${response.status} ${errorText}`);
          if (response.status >= 500 || response.status === 429) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            continue;
          }
          break;
        }

        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText?.trim()) {
          notes = generatedText.trim();
          console.log(`Release notes generated with Gemini model ${modelName}.`);
          break;
        }

        failures.push(`${modelName} attempt ${attempt}: empty response`);
      } catch (error) {
        failures.push(`${modelName} attempt ${attempt}: ${error.message}`);
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    }

    if (notes) {
      break;
    }
  }

  if (!notes) {
    throw new Error(`All Gemini models failed or returned empty content.\n${failures.join('\n')}`);
  }

  fs.writeFileSync(outputPath, notes.trim() + '\n');
  console.log(`Release notes written for ${releaseTag}.`);
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});