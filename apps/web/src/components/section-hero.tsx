import { Check, EyeOff, ShieldCheck } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { Switch } from "@workspace/ui/components/switch"
import { DownloadActions } from "@/components/download-actions"
import styles from "./section-hero.module.css"

const platforms = ["Instagram", "Facebook"]

export function SectionHero() {
  return (
    <section className={styles.hero}>
      <div aria-hidden="true" className={styles.mesh} />
      <div aria-hidden="true" className={styles.halftone} />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <Badge className="gap-1.5" variant="outline">
            <ShieldCheck aria-hidden="true" />
            Free browser extension
          </Badge>
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              View stories without sending seen receipts.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Browse Instagram and Facebook stories with a lightweight
              extension that filters supported view confirmations in your
              browser.
            </p>
          </div>
          <DownloadActions />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-4" />
              No account password required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-4" />
              Available for Chrome, Edge, and Firefox
            </span>
          </div>
        </div>

        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="flex-row items-center gap-3">
            <img
              alt=""
              className="size-11 rounded-lg"
              height="44"
              src="/icon/128.png"
              width="44"
            />
            <div className="min-w-0 flex-1">
              <CardTitle>Story protection</CardTitle>
              <CardDescription>Extension popup preview</CardDescription>
            </div>
            <Badge variant="secondary">On</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Separator />
            <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <EyeOff
                  aria-hidden="true"
                  className="size-5 text-muted-foreground"
                />
                <div>
                  <p className="text-sm font-medium">Block story seen</p>
                  <p className="text-sm text-muted-foreground">
                    Hide your story views
                  </p>
                </div>
              </div>
              <Switch aria-label="Preview: block story seen" checked disabled />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">
                PROTECTED PLATFORMS
              </p>
              {platforms.map((platform) => (
                <div
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                  key={platform}
                >
                  <span className="text-sm font-medium">{platform}</span>
                  <Badge variant="outline">Enabled</Badge>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Settings stay in the browser and can be changed from the extension
              popup.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
