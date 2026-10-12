import { useEffect } from "react"

export function useHashlessSmoothScroll() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const clickedElement = event.target
      if (!(clickedElement instanceof Element)) {
        return
      }

      const link = clickedElement.closest("a[href]")
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) {
        return
      }

      const destination = new URL(link.href)
      if (
        !destination.hash ||
        destination.origin !== window.location.origin ||
        destination.pathname !== window.location.pathname ||
        destination.search !== window.location.search
      ) {
        return
      }

      const targetId = decodeURIComponent(destination.hash.slice(1))
      const target = document.getElementById(targetId)
      if (!target) {
        return
      }

      event.preventDefault()

      const stickyHeader = document.getElementById("top")
      const headerOffset = stickyHeader?.getBoundingClientRect().height ?? 0
      const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - headerOffset
      )

      window.scrollTo({
        top,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      })
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])
}
