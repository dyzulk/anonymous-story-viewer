import { STORAGE_DEFAULTS } from '@/lib/storage';
import type { PlatformState } from '@/lib/storage';

export default defineBackground(() => {
  // Initialize storage on first install
  browser.runtime.onInstalled.addListener(async () => {
    await browser.storage.local.set(STORAGE_DEFAULTS);
    await updateBadge(false);
  });

  // Sync badge with storage on startup
  browser.storage.local.get(null).then((data) => {
    const isActive = (data.isActive as boolean) ?? false;
    updateBadge(isActive);
  });

  // Listen for storage changes and update badge
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local') return;
    if (changes.isActive !== undefined) {
      updateBadge(changes.isActive.newValue as boolean);
    }
  });
});

async function updateBadge(isActive: boolean) {
  await browser.action.setBadgeText({ text: isActive ? 'On' : 'Off' });
  await browser.action.setBadgeBackgroundColor({
    color: isActive ? '#0097ff' : '#777',
  });
}
