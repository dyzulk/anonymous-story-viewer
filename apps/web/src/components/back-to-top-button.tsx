import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 400)

    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    return () => window.removeEventListener("scroll", updateVisibility)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <Button
      aria-label="Back to top"
      className="fixed right-4 bottom-4 z-50 shadow-none sm:right-6 sm:bottom-6"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        })
      }}
      size="icon"
      title="Back to top"
      variant="outline"
    >
      <ArrowUp aria-hidden="true" />
    </Button>
  )
}
