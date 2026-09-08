<p align="center">
  <img src="public/icon/128.png" alt="Anonymous Story Viewer" width="80" />
</p>

<h1 align="center">Anonymous Story Viewer</h1>

<p align="center">
  <strong>View Instagram and Facebook stories without leaving a trace.</strong>
</p>

<p align="center">
  <a href="https://github.com/dyzulk/anonymous-story-viewer/releases/latest">
    <img src="https://img.shields.io/github/v/release/dyzulk/anonymous-story-viewer?style=for-the-badge&color=0097ff" alt="Latest Release" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/dyzulk/anonymous-story-viewer?style=for-the-badge&color=6366f1" alt="License" />
  </a>
</p>

<br />

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,ts,tailwind,vite&theme=dark" alt="Tech Stack" />
</p>

<br />

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

---

## Overview

Anonymous Story Viewer is a browser extension that lets you browse Instagram and Facebook stories without sending "seen" receipts. Story owners will never know you viewed their content.

The extension intercepts the specific API mutations that mark stories as "seen" &mdash; blocking them silently while keeping your browsing experience completely normal. No proxies, no third-party servers, no data leaves your browser.

Built with [WXT](https://wxt.dev/), React 19, TypeScript, and [shadcn/ui](https://ui.shadcn.com/), the extension targets Chrome, Edge (including Edge Mobile), and Firefox from a single codebase.

---

## Features

- **True anonymity** &mdash; blocks "seen" receipts at the network level, not just the UI
- **Per-platform control** &mdash; toggle Instagram and Facebook independently
- **One-click toggle** &mdash; master switch to enable or disable blocking instantly
- **Real-time badge** &mdash; extension icon badge shows On/Off status at a glance
- **Dark and light themes** &mdash; follows your system preference with a manual toggle
- **Mobile-friendly popup** &mdash; responsive layout that works in Edge Mobile's drawer popup
- **Zero data collection** &mdash; everything runs locally, nothing is sent anywhere
- **Cross-browser support** &mdash; Chrome, Edge, Brave, Vivaldi, Opera, and Firefox

---

## How It Works

The extension uses two content scripts working in tandem:

1. **Isolated World Script** &mdash; runs in Chrome's isolated context where it can access `chrome.storage`. It reads your toggle state and relays it to the main world via `window.postMessage`.

2. **Main World Interceptor** &mdash; injects into the page's JavaScript context where it overrides `XMLHttpRequest.send` and `window.fetch`. When a "story seen" mutation is detected (e.g., `PolarisStoriesV3SeenMutation` on Instagram), the request is silently blocked and a fake success response is returned to the page.

The result: Instagram and Facebook think the request succeeded, but the "seen" data never reaches their servers.

---

## Installation

### Manual Installation via GitHub Releases

Pre-built extension packages are attached to every [GitHub Release](https://github.com/dyzulk/anonymous-story-viewer/releases/latest):

| Artifact | Browser | Instructions |
|:---|:---|:---|
| `anonymous-story-viewer-*-chrome.zip` | Chrome, Edge, Brave, Vivaldi, Opera | Unzip, then load via `chrome://extensions` with **Developer mode** enabled |
| `anonymous-story-viewer-*-firefox.zip` | Firefox | Load as a temporary add-on via `about:debugging#/runtime/this-firefox` |

---

## Getting Started

<details>
<summary><strong>Prerequisites</strong></summary>

<br />

- [Node.js](https://nodejs.org/) 22 or later
- [pnpm](https://pnpm.io/) package manager

</details>

<details>
<summary><strong>Installation</strong></summary>

<br />

```bash
git clone https://github.com/dyzulk/anonymous-story-viewer.git
cd anonymous-story-viewer
pnpm install
```

</details>

<details>
<summary><strong>Development</strong></summary>

<br />

Start the development server with hot reload:

```bash
# Chromium browsers (Chrome, Edge, Brave)
pnpm dev

# Firefox
pnpm dev:firefox
```

The unpacked extension output is written to `.output/chrome-mv3` or `.output/firefox-mv2`. Load it via your browser's extension developer page.

</details>

<details>
<summary><strong>Building for Production</strong></summary>

<br />

```bash
# Build without packaging
pnpm build              # Chrome
pnpm build:firefox      # Firefox

# Build and create distributable ZIP archives
pnpm zip                # Chrome
pnpm zip:firefox        # Firefox
```

Output artifacts are placed in the `.output/` directory.

</details>

---

## Architecture

```
anonymous-story-viewer/
  entrypoints/
    background.ts                 Service worker: storage initialization, badge sync
    isolated.content.ts           Content script (ISOLATED): bridges storage to main world
    interceptor.content/
      index.ts                    Content script (MAIN): XHR/Fetch interception
    popup/                        React popup UI
      App.tsx                     Root component (Header + Body + Footer)
      main.tsx                    React entry point with ThemeProvider
      components/
        Header.tsx                Logo, title, theme toggle
        Body.tsx                  Master switch, platform toggles, status
        Footer.tsx                Version, credits
  components/
    theme-provider.tsx            Dark/light/system theme context
    ui/                           shadcn/ui primitives (Button, Switch, Card, Badge)
  hooks/
    use-storage.ts                Reactive hook for chrome.storage.local
  lib/
    storage.ts                    Storage types, defaults, constants
    seen-mutation.ts              Story-seen mutation detection logic
    utils.ts                      Tailwind CSS utilities
  assets/
    index.css                     shadcn design system (Tailwind v4)
    logo.svg                      Extension logo
  public/
    icon/                         Extension icons (16–128px)
```

The extension follows a three-layer architecture:

1. **Content Scripts** &mdash; two scripts operating in different worlds. The isolated script bridges `chrome.storage` state; the main world script intercepts and blocks "seen" API mutations.
2. **Background Service Worker** &mdash; initializes storage on install and keeps the badge icon in sync with the current toggle state.
3. **Popup UI** &mdash; a React application with shadcn/ui components that provides a clean interface for toggling blocking per platform, with dark/light theme support.

---

## Contributing

Contributions are welcome. Please read the [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

To report a bug or request a feature, open an issue on [GitHub Issues](https://github.com/dyzulk/anonymous-story-viewer/issues).

---

## Credits

Based on the original concept by [omidnikrah](https://github.com/omidnikrah/anonymous-instagram-story-seen). Completely rewritten with WXT, React, and Manifest V3 for modern browser compatibility and Facebook support.

---

## License

This project is distributed under the [MIT License](LICENSE).

<br />

---

<p align="center">
  <a href="https://github.com/dyzulk/anonymous-story-viewer/network/members">
    <img src="https://img.shields.io/github/forks/dyzulk/anonymous-story-viewer?style=flat-square&color=0097ff" alt="Forks" />
  </a>
  <a href="https://github.com/dyzulk/anonymous-story-viewer/issues">
    <img src="https://img.shields.io/github/issues/dyzulk/anonymous-story-viewer?style=flat-square&color=6366f1" alt="Issues" />
  </a>
  <img src="https://img.shields.io/github/repo-size/dyzulk/anonymous-story-viewer?style=flat-square&color=0097ff" alt="Repo Size" />
  <img src="https://img.shields.io/github/languages/top/dyzulk/anonymous-story-viewer?style=flat-square&color=6366f1" alt="Top Language" />
</p>

<p align="center">
  <sub>Built with privacy in mind by <a href="https://github.com/dyzulk">dyzulk</a></sub>
</p>
