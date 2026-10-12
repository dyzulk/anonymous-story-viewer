import { isSeenMutation } from '@/lib/seen-mutation';
import { MESSAGE_TYPE } from '@/lib/storage';
import type { PlatformState, SeenBlockerMessage } from '@/lib/storage';

/**
 * MAIN world content script.
 *
 * Intercepts XHR and Fetch requests to block Instagram/Facebook
 * "story seen" mutations. Receives state from the ISOLATED world
 * content script via window.postMessage.
 */
export default defineContentScript({
  matches: ['*://*.instagram.com/*', '*://*.facebook.com/*'],
  runAt: 'document_start',
  world: 'MAIN',

  main() {
    let isBlockerActive = false;
    let platforms: PlatformState = { instagram: true, facebook: true };

    // Listen for state messages from isolated world
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data && event.data.type === MESSAGE_TYPE) {
        const msg = event.data as SeenBlockerMessage;
        isBlockerActive = msg.isActive;
        platforms = msg.platforms;
        console.log('[Seen Blocker] State updated:', isBlockerActive, platforms);
      }
    });

    const originalSend = XMLHttpRequest.prototype.send;
    const originalFetch = window.fetch;

    // Override XHR.send
    XMLHttpRequest.prototype.send = function (body?: Document | XMLHttpRequestBodyInit | null) {
      if (isBlockerActive) {
        const result = isSeenMutation(body);
        if (result.isSeen && result.platform && platforms[result.platform]) {
          console.log(
            `[Seen Blocker] Blocked XHR "Seen" request (${result.platform})`,
          );

          // Fake a successful response to prevent UI errors
          Object.defineProperty(this, 'readyState', { value: 4 });
          Object.defineProperty(this, 'status', { value: 200 });
          Object.defineProperty(this, 'responseText', { value: '{}' });

          this.dispatchEvent(new Event('readystatechange'));
          this.dispatchEvent(new Event('load'));
          return;
        }
      }
      return originalSend.apply(this, arguments as unknown as [body?: Document | XMLHttpRequestBodyInit | null]);
    };

    // Override window.fetch
    window.fetch = async function (
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Response> {
      if (isBlockerActive && init?.body) {
        const result = isSeenMutation(init.body);
        if (result.isSeen && result.platform && platforms[result.platform]) {
          console.log(
            `[Seen Blocker] Blocked Fetch "Seen" request (${result.platform})`,
          );
          return new Response('{}', {
            status: 200,
            statusText: 'OK',
            headers: new Headers({ 'Content-Type': 'application/json' }),
          });
        }
      }
      return originalFetch.apply(this, [input, init]);
    };

    console.log('[Seen Blocker] Interceptor active (Main World)');
  },
});
