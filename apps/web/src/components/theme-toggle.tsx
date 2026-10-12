import { Moon, Sun } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Button
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-keyshortcuts="D"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="icon"
      title="Switch theme (press D)"
      variant="outline"
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  )
}
