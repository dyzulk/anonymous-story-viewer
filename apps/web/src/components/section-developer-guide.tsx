import { Code2, Layers3, PackageCheck } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

const implementationTopics = [
  {
    icon: Layers3,
    title: "One workspace, two apps",
    description:
      "The pnpm workspace keeps the WXT browser extension and Vite website in separate apps while sharing the shadcn/ui primitives and Tailwind theme from packages/ui.",
    href: "https://github.com/dyzulk/anonymous-story-viewer/tree/main/packages/ui",
    linkLabel: "Explore the shared UI package",
  },
  {
    icon: Code2,
    title: "Content-script boundaries",
    description:
      "A WXT isolated-world content script reads extension storage and relays settings to a main-world interceptor. Keeping these responsibilities separate reflects the browser extension execution model.",
    href: "https://github.com/dyzulk/anonymous-story-viewer/tree/main/apps/extension/entrypoints",
    linkLabel: "Browse WXT entrypoints",
  },
  {
    icon: PackageCheck,
    title: "Build and inspect",
    description:
      "Build the Chrome or Firefox extension from the repository root, then inspect the generated browser-specific package. The complete source and contribution instructions are public.",
    href: "https://github.com/dyzulk/anonymous-story-viewer#architecture",
    linkLabel: "Read the architecture overview",
  },
]

export function SectionDeveloperGuide() {
  return (
    <section className="border-y bg-muted/40" id="developer-guide">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            FOR DEVELOPERS
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How this browser extension is built
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Anonymous Story Viewer is an open-source TypeScript browser
            extension built with WXT, React, and a pnpm workspace. Its source
            provides a concrete example of sharing a UI system between an
            extension popup and a standalone web app.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {implementationTopics.map((topic) => {
            const Icon = topic.icon
            return (
              <Card className="h-full" key={topic.title}>
                <CardHeader>
                  <Icon
                    aria-hidden="true"
                    className="mb-2 size-5 text-muted-foreground"
                  />
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {topic.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    className="text-sm font-medium underline underline-offset-4"
                    href={topic.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {topic.linkLabel}
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Build locally</CardTitle>
            <CardDescription>
              From the repository root, install dependencies and build an
              extension target:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-md border bg-background p-4 text-sm">
              <code>{`pnpm install
pnpm build:extension
pnpm build:firefox`}</code>
            </pre>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The extension uses browser storage for local settings and
              declares only storage access plus Instagram and Facebook host
              permissions. Review the{" "}
              <a
                className="font-medium underline underline-offset-4"
                href="https://github.com/dyzulk/anonymous-story-viewer/blob/main/apps/extension/wxt.config.ts"
                rel="noreferrer"
                target="_blank"
              >
                WXT manifest configuration
              </a>{" "}
              and{" "}
              <a
                className="font-medium underline underline-offset-4"
                href="https://github.com/dyzulk/anonymous-story-viewer/blob/main/CONTRIBUTING.md"
                rel="noreferrer"
                target="_blank"
              >
                contribution guide
              </a>{" "}
              before making changes.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
