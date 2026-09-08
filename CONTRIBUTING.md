# Contributing to Anonymous Story Viewer

Thank you for your interest in contributing to Anonymous Story Viewer. This document outlines the process for submitting changes, reporting issues, and extending the extension's capabilities.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Adding a New Platform](#adding-a-new-platform)
- [Code Style](#code-style)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

All contributors are expected to be respectful and constructive in all interactions. Harassment, discrimination, and disruptive behavior will not be tolerated.

---

## Getting Started

1. **Fork** the repository and clone your fork locally.
2. Ensure you have **Node.js 22+** and **pnpm** installed.
3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   # Chrome / Edge / Brave
   pnpm dev

   # Firefox
   pnpm dev:firefox
   ```

5. Load the extension from `.output/chrome-mv3-dev` or `.output/firefox-mv2-dev` in your browser's extension developer page.

---

## Development Workflow

- Create a feature branch from `main`:

  ```bash
  git checkout -b feat/your-feature-name
  ```

- Make your changes in small, focused commits.
- Run the TypeScript compiler to check for type errors:

  ```bash
  pnpm compile
  ```

- Build for production to verify the output:

  ```bash
  pnpm build
  ```

- Test your changes manually by loading the built extension in your browser.

---

## Adding a New Platform

Anonymous Story Viewer uses a mutation-detection approach to block "story seen" receipts. To add support for a new platform (e.g., Threads, WhatsApp Web):

### 1. Update the Mutation Detector

Edit [`lib/seen-mutation.ts`](lib/seen-mutation.ts) and add detection logic for the new platform:

```typescript
export type Platform = 'instagram' | 'facebook' | 'newplatform';

// Inside isSeenMutation():
const isNewPlatform = hostname.includes('newplatform.com');

if (isNewPlatform && matchesNewPlatformSeen(text)) {
  return { isSeen: true, platform: 'newplatform' };
}

function matchesNewPlatformSeen(text: string): boolean {
  // Identify the API mutation name used by the platform
  return text.includes('StorySeenMutation');
}
```

### 2. Update the Storage Schema

Add the new platform to [`lib/storage.ts`](lib/storage.ts):

```typescript
export interface PlatformState {
  instagram: boolean;
  facebook: boolean;
  newplatform: boolean;
}

export const STORAGE_DEFAULTS: StorageState = {
  isActive: false,
  platforms: {
    instagram: true,
    facebook: true,
    newplatform: true,
  },
};
```

### 3. Add Content Script Matches

Update both content scripts to include the new domain:

- [`entrypoints/isolated.content.ts`](entrypoints/isolated.content.ts) &mdash; add `*://*.newplatform.com/*` to `matches`
- [`entrypoints/interceptor.content/index.ts`](entrypoints/interceptor.content/index.ts) &mdash; add `*://*.newplatform.com/*` to `matches`

### 4. Update the Manifest

Add host permissions in [`wxt.config.ts`](wxt.config.ts):

```typescript
host_permissions: [
  '*://*.instagram.com/*',
  '*://*.facebook.com/*',
  '*://*.newplatform.com/*',
],
```

### 5. Add a Platform Toggle in the Popup

Add a new toggle row in [`entrypoints/popup/components/Body.tsx`](entrypoints/popup/components/Body.tsx) with the appropriate icon and label.

### 6. Test Thoroughly

- Verify the mutation is correctly detected by watching the browser console for `[Seen Blocker]` logs.
- Confirm that stories can be viewed without the "seen" receipt appearing on the other end.
- Test with the platform toggle off to ensure normal behavior is preserved.

---

## Code Style

- **Language**: TypeScript (strict mode).
- **Formatting**: Follow the existing conventions in the codebase.
- **Naming**: Use descriptive, self-documenting names. Avoid abbreviations.
- **Comments**: Write comments to explain *why*, not *what*. The code should be self-explanatory.
- **Imports**: Use path aliases (`@/`) for project-internal imports.
- **React**: Functional components only. Hooks for state management.

---

## Submitting a Pull Request

1. Ensure your branch is up to date with `main`.
2. Verify that `pnpm compile` completes without errors.
3. Verify that `pnpm build` produces a working extension.
4. Write a clear PR title and description explaining the purpose of the change.
5. Reference any related issues (e.g., `Closes #12`).
6. Submit the PR and await review.

---

## Reporting Issues

When reporting a bug, please include:

- **Browser and version** (e.g., Chrome 130, Edge Mobile 128, Firefox 138).
- **Extension version** (visible in the popup footer).
- **The platform** where the issue occurs (Instagram, Facebook, or both).
- **Steps to reproduce** the problem.
- **Expected behavior** versus **actual behavior**.
- **Console logs** from the browser's developer tools (`[Seen Blocker]` prefixed lines are especially helpful).

Open an issue at [github.com/dyzulk/anonymous-story-viewer/issues](https://github.com/dyzulk/anonymous-story-viewer/issues).
