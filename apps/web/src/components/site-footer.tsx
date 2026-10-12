import { ArrowUpRight } from "lucide-react"
import { Separator } from "@workspace/ui/components/separator"

const footerLinks = [
  {
    href: "https://github.com/dyzulk/anonymous-story-viewer",
    label: "Source code",
  },
  {
    href: "https://github.com/dyzulk/anonymous-story-viewer/releases",
    label: "Releases",
  },
  {
    href: "https://github.com/dyzulk/anonymous-story-viewer/issues",
    label: "Support",
  },
]

export function SiteFooter() {
  return (
    <footer>
      <Separator />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <a
          className="flex items-center gap-3"
          href="#top"
          aria-label="Anonymous Story Viewer home"
        >
          <img
            alt=""
            className="size-8"
            height="32"
            src="/logo.svg"
            width="32"
          />
          <span className="text-sm font-medium">Anonymous Story Viewer</span>
        </a>
        <nav
          aria-label="Footer links"
          className="flex flex-wrap gap-x-5 gap-y-2"
        >
          {footerLinks.map((link) => (
            <a
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              href={link.href}
              key={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">
          Free and open source under the MIT License.
        </p>
      </div>
    </footer>
  )
}
