import { MESSAGE_TYPE, STORAGE_DEFAULTS } from '@/lib/storage';
import type { PlatformState, SeenBlockerMessage } from '@/lib/storage';

/**
 * ISOLATED world content script.
 *
 * Bridges chrome.storage state to the MAIN world interceptor
 * via window.postMessage. The MAIN world cannot access chrome.storage
 * directly, so this script relays state changes.
 */
export default defineContentScript({
  matches: ['*://*.instagram.com/*', '*://*.facebook.com/*'],
  runAt: 'document_start',
  world: 'ISOLATED',

  main() {
    /** Send current state to MAIN world */
    function sendState(isActive: boolean, platforms: PlatformState) {
      const message: SeenBlockerMessage = {
        type: MESSAGE_TYPE,
        isActive,
        platforms,
      };
      window.postMessage(message, '*');
    }

    /** Read state from storage and send to MAIN world */
    async function readAndSend() {
      const data = await browser.storage.local.get(null);
      const isActive = (data.isActive as boolean) ?? STORAGE_DEFAULTS.isActive;
      const platforms =
        (data.platforms as PlatformState | undefined) ??
        STORAGE_DEFAULTS.platforms;
      sendState(isActive, platforms);
    }

    // Listen for storage changes (from popup or background)
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== 'local') return;
      if (changes.isActive !== undefined || changes.platforms !== undefined) {
        readAndSend();
      }
    });

    // Send initial state
    readAndSend();

    // Re-send on window focus to ensure interceptor stays in sync
    window.addEventListener('focus', () => {
      readAndSend();
    });
  },
});
