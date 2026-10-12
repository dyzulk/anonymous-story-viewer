import { ArrowUpRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#privacy", label: "Privacy" },
  { href: "#faq", label: "FAQ" },
]

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur"
      id="top"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          aria-label="Anonymous Story Viewer home"
          className="flex min-w-0 items-center gap-3"
          href="#top"
        >
          <img
            alt=""
            className="size-9 shrink-0"
            height="36"
            src="/logo.svg"
            width="36"
          />
          <span className="truncate text-sm font-semibold sm:text-base">
            Anonymous Story Viewer
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 md:flex"
        >
          {navigation.map((item) => (
            <a
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <a href="#download">
              Download
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
