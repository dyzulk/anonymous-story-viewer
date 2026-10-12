import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { featureIcons, features } from "@/lib/site-content"

export function SectionFeatures() {
  return (
    <section className="border-y bg-muted/40" id="features">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            BUILT FOR PRIVATE BROWSING
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            A focused tool for story viewing
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            The extension does one thing: block supported story seen-status
            requests while leaving the rest of your browsing experience alone.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = featureIcons[feature.icon]
            return (
              <Card className="h-full" key={feature.title}>
                <CardHeader>
                  <Icon
                    aria-hidden="true"
                    className="mb-2 size-5 text-muted-foreground"
                  />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
