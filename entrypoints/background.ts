import { STORAGE_DEFAULTS } from '@/lib/storage';

export default defineBackground(() => {
  // Initialize storage on first install
  browser.runtime.onInstalled.addListener(async () => {
    await browser.storage.local.set(STORAGE_DEFAULTS);
    await updateIcon(STORAGE_DEFAULTS.isActive);
  });

  // Sync icon with storage on startup
  browser.storage.local.get(null).then((data) => {
    const isActive = (data.isActive as boolean) ?? false;
    updateIcon(isActive);
  });

  // Listen for storage changes and update icon
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local') return;
    if (changes.isActive !== undefined) {
      updateIcon(changes.isActive.newValue as boolean);
    }
  });
});

async function updateIcon(isActive: boolean) {
  const folder = isActive ? 'icon' : 'icon-disabled';
  await browser.action.setIcon({
    path: {
      16: `/${folder}/16.png`,
      32: `/${folder}/32.png`,
      48: `/${folder}/48.png`,
      128: `/${folder}/128.png`,
    },
  });
}

