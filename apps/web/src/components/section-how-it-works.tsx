import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { howItWorksSteps } from "@/lib/site-content"

export function SectionHowItWorks() {
  return (
    <section id="how-it-works">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            GETTING STARTED
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready in a few steps
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Install from your browser&apos;s official store, choose your
            preferences, and keep using the sites as usual.
          </p>
        </div>
        <div className="flex flex-col">
          {howItWorksSteps.map((step, index) => (
            <div className="grid grid-cols-[2.5rem_1fr] gap-4" key={step.title}>
              <div className="flex flex-col items-center">
                <span className="flex size-9 items-center justify-center rounded-full border bg-background text-sm font-semibold">
                  {index + 1}
                </span>
                {index < howItWorksSteps.length - 1 && (
                  <Separator
                    className="my-2 min-h-8 flex-1"
                    orientation="vertical"
                  />
                )}
              </div>
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
