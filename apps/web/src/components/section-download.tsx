import { Download, ShieldCheck } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { browserStores, browserStoreOrder } from "@/lib/browser-stores"
import { DownloadActions } from "@/components/download-actions"

export function SectionDownload() {
  return (
    <section className="border-t bg-muted/40" id="download">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit" variant="outline">
            <Download aria-hidden="true" />
            Get the extension
          </Badge>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Choose your browser
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The main download button selects a store based on your browser. You
            can also choose any of the supported stores below.
          </p>
          <DownloadActions />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {browserStoreOrder.map((storeId) => {
            const store = browserStores[storeId]
            return (
              <Card className="flex h-full flex-col" key={store.id}>
                <CardHeader>
                  <img
                    alt=""
                    aria-hidden="true"
                    className="mb-2 size-8"
                    height="32"
                    src={store.logo}
                    width="32"
                  />
                  <CardTitle>{store.name}</CardTitle>
                  <CardDescription>
                    Official listing for{" "}
                    {store.id === "edge" ? "Microsoft Edge" : store.id}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild className="w-full" variant="outline">
                    <a href={store.url} rel="noreferrer" target="_blank">
                      <img
                        alt=""
                        aria-hidden="true"
                        className="size-4"
                        height="16"
                        src={store.logo}
                        width="16"
                      />
                      {store.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck aria-hidden="true" className="size-4 shrink-0" />
          Install only from the official browser extension stores listed above.
        </p>
      </div>
    </section>
  )
}
