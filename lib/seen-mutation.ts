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
 * Check if the request body contains a story-seen mutation.
 *
 * @param body - The request body (string, FormData, or object)
 * @returns Whether it's a seen mutation and which platform
 */
export function isSeenMutation(body: unknown): SeenMutationResult {
  if (!body) return { isSeen: false, platform: null };

  try {
    const hostname = window.location.hostname;
    const isInstagram = hostname.includes('instagram.com');
    const isFacebook = hostname.includes('facebook.com');

    if (!isInstagram && !isFacebook) {
      return { isSeen: false, platform: null };
    }

    // Check string body (URLSearchParams format)
    if (typeof body === 'string' && body.includes('fb_api_req_friendly_name')) {
      if (isInstagram && matchesInstagramSeen(body)) {
        return { isSeen: true, platform: 'instagram' };
      }
      if (isFacebook && matchesFacebookSeen(body)) {
        return { isSeen: true, platform: 'facebook' };
      }
    }

    // Check FormData body
    if (body instanceof FormData) {
      const friendlyName = body.get('fb_api_req_friendly_name');
      if (typeof friendlyName === 'string') {
        if (isInstagram && matchesInstagramSeen(friendlyName)) {
          return { isSeen: true, platform: 'instagram' };
        }
        if (isFacebook && matchesFacebookSeen(friendlyName)) {
          return { isSeen: true, platform: 'facebook' };
        }
      }
    }
  } catch (e) {
    console.error('[Seen Blocker] Error checking body', e);
  }

  return { isSeen: false, platform: null };
}

/** Instagram seen mutation pattern: PolarisStoriesV3SeenMutation */
function matchesInstagramSeen(text: string): boolean {
  return (
    text.includes('Polaris') &&
    text.includes('Seen') &&
    text.includes('Mutation')
  );
}

/** Facebook seen mutation patterns */
function matchesFacebookSeen(text: string): boolean {
  if (text.includes('storiesUpdateSeenStateMutation')) return true;
  return (
    text.includes('Story') &&
    text.includes('Seen') &&
    text.includes('Mutation')
  );
}
