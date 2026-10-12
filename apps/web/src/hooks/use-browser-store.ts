import { useState } from "react"
import { detectBrowserStore } from "@/lib/browser-stores"
import type { BrowserStoreId } from "@/types/browser-store"

export function useBrowserStore(): BrowserStoreId {
  const [browserStore] = useState(() => {
    if (typeof navigator === "undefined") {
      return null
    }

    return detectBrowserStore(navigator.userAgent)
  })

  return browserStore ?? "chrome"
}
