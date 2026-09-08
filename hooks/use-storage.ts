import { useState, useEffect, useCallback } from 'react';
import type { StorageState, PlatformState } from '@/lib/storage';
import { STORAGE_DEFAULTS } from '@/lib/storage';

/**
 * Reactive hook for chrome.storage.local.
 *
 * Reads the initial state on mount, listens for changes from
 * other contexts (background, content scripts), and provides
 * setter functions that write back to storage.
 */
export function useStorage() {
  const [state, setState] = useState<StorageState>(STORAGE_DEFAULTS);
  const [loading, setLoading] = useState(true);

  // Read initial state
  useEffect(() => {
    browser.storage.local.get(null).then((data) => {
      setState({
        isActive: (data.isActive as boolean) ?? STORAGE_DEFAULTS.isActive,
        platforms: {
          instagram:
            (data.platforms as PlatformState | undefined)?.instagram ??
            STORAGE_DEFAULTS.platforms.instagram,
          facebook:
            (data.platforms as PlatformState | undefined)?.facebook ??
            STORAGE_DEFAULTS.platforms.facebook,
        },
      });
      setLoading(false);
    });
  }, []);

  // Listen for storage changes from other contexts
  useEffect(() => {
    const listener = (
      changes: Record<string, browser.storage.StorageChange>,
      areaName: string,
    ) => {
      if (areaName !== 'local') return;

      setState((prev) => {
        const next = { ...prev };
        if (changes.isActive !== undefined) {
          next.isActive = changes.isActive.newValue as boolean;
        }
        if (changes.platforms !== undefined) {
          next.platforms = changes.platforms.newValue as PlatformState;
        }
        return next;
      });
    };

    browser.storage.onChanged.addListener(listener);
    return () => browser.storage.onChanged.removeListener(listener);
  }, []);

  const setActive = useCallback((isActive: boolean) => {
    browser.storage.local.set({ isActive });
  }, []);

  const setPlatform = useCallback(
    (platform: keyof PlatformState, enabled: boolean) => {
      // Read current platforms first to avoid race conditions
      browser.storage.local.get('platforms').then((data) => {
        const current =
          (data.platforms as PlatformState | undefined) ??
          STORAGE_DEFAULTS.platforms;
        browser.storage.local.set({
          platforms: { ...current, [platform]: enabled },
        });
      });
    },
    [],
  );

  return {
    ...state,
    loading,
    setActive,
    setPlatform,
  };
}
