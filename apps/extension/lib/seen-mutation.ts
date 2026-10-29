/**
 * Detects whether a request body contains a "story seen" mutation
 * for Instagram or Facebook.
 *
 * Used by the MAIN world interceptor to decide whether to block
 * an XHR or Fetch request.
 */

export type Platform = 'instagram' | 'facebook';

interface SeenMutationResult {
  isSeen: boolean;
  platform: Platform | null;
}

/**
 * All known Facebook story-seen mutation patterns.
 * Case-insensitive to handle any casing variant Meta may ship.
 */
const FB_SEEN_PATTERNS: RegExp[] = [
  /storiesUpdateSeenStateMutation/i,
  /StoriesReaderUpdateSeenStateMutation/i,
  /stories_update_seen_state/i,
  /updateStorySeenState/i,
  /StoriesUpdateSeenState/i,
  /CometStoriesSeenMutation/i,
  /MarkStor\w*Seen/i,
];

/**
 * Instagram seen mutation pattern: PolarisStoriesV3SeenMutation
 */
const IG_SEEN_PATTERNS: RegExp[] = [
  /Polaris\w*Seen\w*Mutation/i,
];

/**
 * Serialize a request body to a string for pattern matching.
 * Handles string, URLSearchParams, FormData, ArrayBuffer, and TypedArray.
 */
function serializeBody(body: unknown): string {
  if (!body) return '';

  // Plain string (URL-encoded form or JSON)
  if (typeof body === 'string') {
    return body;
  }

  // URLSearchParams
  if (body instanceof URLSearchParams) {
    return body.toString();
  }

  // FormData — extract all string entries
  if (body instanceof FormData) {
    const parts: string[] = [];
    for (const [key, value] of body.entries()) {
      if (typeof value === 'string') {
        parts.push(`${key}=${value}`);
      }
    }
    return parts.join('&');
  }

  // ArrayBuffer
  if (body instanceof ArrayBuffer) {
    try {
      const view = new Uint8Array(body, 0, Math.min(body.byteLength, 8192));
      return new TextDecoder('utf-8', { fatal: false }).decode(view);
    } catch {
      return '';
    }
  }

  // TypedArray (Uint8Array, etc.)
  if (ArrayBuffer.isView(body)) {
    try {
      const view = new Uint8Array(
        body.buffer,
        body.byteOffset,
        Math.min(body.byteLength, 8192),
      );
      return new TextDecoder('utf-8', { fatal: false }).decode(view);
    } catch {
      return '';
    }
  }

  return '';
}

/**
 * Decode URL-encoded text for a second-pass match.
 */
function decodeIfUrlEncoded(text: string): string {
  if (!text) return '';
  try {
    return decodeURIComponent(text.replace(/\+/g, '%20'));
  } catch {
    return text;
  }
}

/**
 * Test whether text matches any pattern in the given list.
 */
function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((re) => re.test(text));
}

/**
 * Check if the request body contains a story-seen mutation.
 *
 * @param body - The request body (string, FormData, URLSearchParams, ArrayBuffer, or object)
 * @param url  - Optional request URL to inspect for mutation identifiers
 * @returns Whether it's a seen mutation and which platform
 */
export function isSeenMutation(
  body: unknown,
  url?: string,
): SeenMutationResult {
  const hostname = window.location.hostname;
  const isInstagram = hostname.includes('instagram.com');
  const isFacebook = hostname.includes('facebook.com');

  if (!isInstagram && !isFacebook) {
    return { isSeen: false, platform: null };
  }

  try {
    // 1. Check URL if provided (some mutations encode the name in the URL)
    if (url) {
      const decoded = decodeIfUrlEncoded(url);
      if (isInstagram && matchesAny(decoded, IG_SEEN_PATTERNS)) {
        return { isSeen: true, platform: 'instagram' };
      }
      if (isFacebook && matchesAny(decoded, FB_SEEN_PATTERNS)) {
        return { isSeen: true, platform: 'facebook' };
      }
    }

    // 2. Serialize and check body
    if (!body) return { isSeen: false, platform: null };

    const text = serializeBody(body);
    if (!text) return { isSeen: false, platform: null };

    // Check raw text
    if (isInstagram && matchesAny(text, IG_SEEN_PATTERNS)) {
      return { isSeen: true, platform: 'instagram' };
    }
    if (isFacebook && matchesAny(text, FB_SEEN_PATTERNS)) {
      return { isSeen: true, platform: 'facebook' };
    }

    // Check URL-decoded text (for URL-encoded form bodies)
    const decoded = decodeIfUrlEncoded(text);
    if (decoded !== text) {
      if (isInstagram && matchesAny(decoded, IG_SEEN_PATTERNS)) {
        return { isSeen: true, platform: 'instagram' };
      }
      if (isFacebook && matchesAny(decoded, FB_SEEN_PATTERNS)) {
        return { isSeen: true, platform: 'facebook' };
      }
    }
  } catch (e) {
    console.error('[Seen Blocker] Error checking body', e);
  }

  return { isSeen: false, platform: null };
}
