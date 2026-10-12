import type { BrowserStore, BrowserStoreId } from "@/types/browser-store"

export const browserStores: Record<BrowserStoreId, BrowserStore> = {
  chrome: {
    id: "chrome",
    name: "Chrome Web Store",
    action: "Add to Chrome",
    logo: "/browser/google-chrome.svg",
    url: "https://chromewebstore.google.com/detail/anonymous-story-viewer/ehgnmpihpelidmmblpamihdaajbbeehf",
  },
  edge: {
    id: "edge",
    name: "Microsoft Edge Add-ons",
    action: "Get it for Edge",
    logo: "/browser/microsoft-edge.svg",
    url: "https://microsoftedge.microsoft.com/addons/detail/anonymous-story-viewer/cfieebihkobiagnhmodjpljpdkjnbhbm",
  },
  firefox: {
    id: "firefox",
    name: "Firefox Add-ons",
    action: "Add to Firefox",
    logo: "/browser/firefox.svg",
    url: "https://addons.mozilla.org/en-US/firefox/addon/anon-story-viewer/",
  },
}

export const browserStoreOrder: BrowserStoreId[] = ["chrome", "edge", "firefox"]

export function detectBrowserStore(userAgent: string): BrowserStoreId | null {
  if (/\bEdg(?:A|iOS)?\//i.test(userAgent)) {
    return "edge"
  }

  if (/\b(?:Firefox|FxiOS)\//i.test(userAgent)) {
    return "firefox"
  }

  if (/\b(?:Chrome|CriOS)\//i.test(userAgent)) {
    return "chrome"
  }

  return null
}

export function getAlternativeStores(primary: BrowserStoreId) {
  return browserStoreOrder
    .filter((storeId) => storeId !== primary)
    .map((storeId) => browserStores[storeId])
}
