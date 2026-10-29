import { isSeenMutation } from '@/lib/seen-mutation';
import { MESSAGE_TYPE } from '@/lib/storage';
import type { PlatformState, SeenBlockerMessage } from '@/lib/storage';

/**
 * MAIN world content script.
 *
 * Intercepts XHR, Fetch, and sendBeacon requests to block
 * Instagram/Facebook "story seen" mutations. Receives state
 * from the ISOLATED world content script via window.postMessage.
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

    /**
     * Standard GraphQL-compatible mock response so that Facebook/Instagram
     * Relay clients do not error or enter a retry loop.
     */
    const MOCK_GRAPHQL_RESPONSE = JSON.stringify({
      data: {
        stories_update_seen_state: {
          success: true,
          __typename: 'StoriesUpdateSeenStateMutationResponse',
        },
      },
      extensions: { is_final: true },
    });

    /**
     * Check if the request should be blocked based on current state.
     */
    function shouldBlock(body: unknown, url?: string): boolean {
      if (!isBlockerActive) return false;
      const result = isSeenMutation(body, url);
      if (result.isSeen && result.platform && platforms[result.platform]) {
        console.log(
          `[Seen Blocker] Blocked "${result.platform}" seen request`,
        );
        return true;
      }
      return false;
    }

    // ========================================
    // 1. Override XMLHttpRequest
    // ========================================
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    // Store the request URL on the XHR instance
    const XHR_URL_KEY = Symbol('seenBlocker.xhr.url');

    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL,
      ...rest: unknown[]
    ) {
      (this as unknown as Record<symbol, unknown>)[XHR_URL_KEY] = typeof url === 'string' ? url : url.href;
      return (originalOpen as Function).apply(this, [method, url, ...rest]);
    };

    XMLHttpRequest.prototype.send = function (body?: Document | XMLHttpRequestBodyInit | null) {
      const requestUrl = (this as unknown as Record<symbol, unknown>)[XHR_URL_KEY] as string | undefined;

      if (shouldBlock(body, requestUrl)) {
        // Fake a successful response to prevent UI errors
        Object.defineProperty(this, 'readyState', { value: 4 });
        Object.defineProperty(this, 'status', { value: 200 });
        Object.defineProperty(this, 'statusText', { value: 'OK' });
        Object.defineProperty(this, 'responseText', { value: MOCK_GRAPHQL_RESPONSE });
        Object.defineProperty(this, 'response', { value: MOCK_GRAPHQL_RESPONSE });

        // Trigger standard XHR lifecycle events asynchronously
        setTimeout(() => {
          const events = ['readystatechange', 'load', 'loadend'];
          events.forEach((name) => {
            try {
              const handler = (this as unknown as Record<string, unknown>)[`on${name}`];
              if (typeof handler === 'function') {
                (handler as EventListener)(new Event(name));
              }
              this.dispatchEvent(new Event(name));
            } catch {
              // ignore
            }
          });
        }, 0);
        return;
      }
      return originalSend.apply(this, arguments as unknown as [body?: Document | XMLHttpRequestBodyInit | null]);
    };

    // ========================================
    // 2. Override window.fetch
    // ========================================
    const originalFetch = window.fetch;

    window.fetch = async function (
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Response> {
      // Extract URL from the input
      let url = '';
      if (typeof input === 'string') {
        url = input;
      } else if (input instanceof URL) {
        url = input.href;
      } else if (input instanceof Request) {
        url = input.url;
      }

      // Check body from init first, then from Request object
      let body: unknown = init?.body;
      if (body === undefined && input instanceof Request) {
        // Try to read body from the Request object
        try {
          body = await input.clone().text();
        } catch {
          body = undefined;
        }
      }

      if (shouldBlock(body, url)) {
        return new Response(MOCK_GRAPHQL_RESPONSE, {
          status: 200,
          statusText: 'OK',
          headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
          }),
        });
      }

      return originalFetch.apply(this, [input, init]);
    };

    // ========================================
    // 3. Override navigator.sendBeacon
    // ========================================
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const originalSendBeacon = navigator.sendBeacon.bind(navigator);

      navigator.sendBeacon = function (
        url: string | URL,
        data?: BodyInit | null,
      ): boolean {
        const urlStr = typeof url === 'string' ? url : url.href;

        if (shouldBlock(data, urlStr)) {
          return true; // Pretend it succeeded
        }

        return originalSendBeacon(url, data);
      };
    }

    console.log('[Seen Blocker] Interceptor active (Main World)');
  },
});
