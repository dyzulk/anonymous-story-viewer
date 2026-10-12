/**
 * Shared storage types, defaults, and constants for the extension.
 */

/** Per-platform toggle state */
export interface PlatformState {
  instagram: boolean;
  facebook: boolean;
}

/** Root storage schema */
export interface StorageState {
  isActive: boolean;
  platforms: PlatformState;
}

/** Default storage values (used on first install) */
export const STORAGE_DEFAULTS: StorageState = {
  isActive: false,
  platforms: {
    instagram: true,
    facebook: true,
  },
};

/** postMessage type constant for ISOLATED ↔ MAIN world communication */
export const MESSAGE_TYPE = 'SEEN_BLOCKER_STATE' as const;

/** Shape of the postMessage payload sent from ISOLATED to MAIN world */
export interface SeenBlockerMessage {
  type: typeof MESSAGE_TYPE;
  isActive: boolean;
  platforms: PlatformState;
}
