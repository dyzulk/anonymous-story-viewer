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

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: template }] }] }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini API returned ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  const notes = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!notes?.trim()) {
    throw new Error('Gemini returned empty release notes.');
  }
  fs.writeFileSync(outputPath, notes.trim() + '\n');
  console.log(`Release notes generated for ${releaseTag}.`);
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});