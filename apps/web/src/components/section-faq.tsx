import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { faqEntries } from "@/lib/site-content"

export function SectionFaq() {
  return (
    <section id="faq">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-muted-foreground">QUESTIONS</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked
          </h2>
          <p className="text-muted-foreground">
            Details about how the extension works and what it supports.
          </p>
        </div>
        <Accordion className="w-full" collapsible type="single">
          {faqEntries.map((entry, index) => (
            <AccordionItem key={entry.question} value={`faq-${index}`}>
              <AccordionTrigger>{entry.question}</AccordionTrigger>
              <AccordionContent>{entry.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
