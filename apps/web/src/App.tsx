import { BackToTopButton } from "@/components/back-to-top-button"
import { SectionDownload } from "@/components/section-download"
import { SectionDeveloperGuide } from "@/components/section-developer-guide"
import { SectionFaq } from "@/components/section-faq"
import { SectionFeatures } from "@/components/section-features"
import { SectionHero } from "@/components/section-hero"
import { SectionHowItWorks } from "@/components/section-how-it-works"
import { SectionPrivacy } from "@/components/section-privacy"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { useHashlessSmoothScroll } from "@/hooks/use-hashless-smooth-scroll"

export function App() {
  useHashlessSmoothScroll()

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-ring"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <SectionHero />
        <SectionFeatures />
        <SectionHowItWorks />
        <SectionDeveloperGuide />
        <SectionPrivacy />
        <SectionFaq />
        <SectionDownload />
      </main>
      <SiteFooter />
      <BackToTopButton />
    </>
  )
}
