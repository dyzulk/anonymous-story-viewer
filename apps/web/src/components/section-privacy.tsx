import {
  ArrowRight,
  ExternalLink,
  Fingerprint,
  KeyRound,
  ServerOff,
} from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

const privacyPoints = [
  {
    title: "No account credentials",
    description: "The extension never asks for your social account password.",
    icon: KeyRound,
  },
  {
    title: "No proxy service",
    description: "Your browsing is not routed through a third-party proxy.",
    icon: ServerOff,
  },
  {
    title: "Local request filtering",
    description:
      "Supported seen-status requests are handled by the extension in your browser.",
    icon: Fingerprint,
  },
]

export function SectionPrivacy() {
  return (
    <section className="border-y bg-muted/40" id="privacy">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Badge className="w-fit" variant="outline">
              Privacy by design
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your browsing stays yours
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Anonymous Story Viewer runs as a browser extension. It does not
              need your password or a separate service to process story views.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {privacyPoints.map((point) => {
              const Icon = point.icon
              return (
                <Card
                  className="flex-row items-center gap-4 p-4"
                  key={point.title}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-5 shrink-0 text-muted-foreground"
                  />
                  <div className="min-w-0">
                    <CardTitle className="text-sm">{point.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {point.description}
                    </CardDescription>
                  </div>
                </Card>
              )
            })}
          </div>
          <a
            className="inline-flex w-fit items-center gap-2 text-sm font-medium underline underline-offset-4"
            href="https://github.com/dyzulk/anonymous-story-viewer/blob/main/PRIVACY.md"
            rel="noreferrer"
            target="_blank"
          >
            Read the privacy policy
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>What the extension does</CardTitle>
            <CardDescription>
              A local filter between the website and its seen-status request.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex w-full flex-1 flex-col items-center gap-2 rounded-lg border p-5 text-center">
              <img
                alt=""
                className="size-12"
                height="48"
                src="/icon/128.png"
                width="48"
              />
              <p className="text-sm font-medium">Your browser</p>
              <p className="text-sm text-muted-foreground">
                Extension checks supported requests
              </p>
            </div>
            <div aria-hidden="true" className="text-muted-foreground">
              <ArrowRight className="size-5" />
            </div>
            <div className="flex w-full flex-1 flex-col items-center gap-2 rounded-lg border p-5 text-center">
              <Badge variant="secondary">Seen-status request filtered</Badge>
              <p className="text-sm font-medium">Story view</p>
              <p className="text-sm text-muted-foreground">
                Other site requests continue normally
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
