import { Eye, Monitor, ShieldCheck, SlidersHorizontal } from "lucide-react"
import type { Feature, FaqEntry, HowItWorksStep } from "@/types/browser-store"

export const features: Feature[] = [
  {
    title: "Keep story views private",
    description:
      "Blocks supported story seen-status requests while you browse Instagram and Facebook normally.",
    icon: "eye",
  },
  {
    title: "Runs in your browser",
    description:
      "Request filtering happens locally in the extension. No proxy or companion server is involved.",
    icon: "shield",
  },
  {
    title: "Choose what to protect",
    description:
      "Use the master switch or control Instagram and Facebook independently from the popup.",
    icon: "sliders",
  },
  {
    title: "Available across browsers",
    description:
      "Install from the Chrome Web Store, Microsoft Edge Add-ons, or Firefox Add-ons.",
    icon: "monitor",
  },
]

export const featureIcons = {
  eye: Eye,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  monitor: Monitor,
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: "Install the extension",
    description:
      "Choose your browser's official add-on store and add Anonymous Story Viewer.",
  },
  {
    title: "Set your preferences",
    description:
      "Open the popup to enable protection and select which supported platforms to cover.",
  },
  {
    title: "Browse as usual",
    description:
      "The extension filters supported seen-status requests in your browser while stories load.",
  },
]

export const faqEntries: FaqEntry[] = [
  {
    question: "What does Anonymous Story Viewer do?",
    answer:
      "It is a browser extension for Instagram and Facebook. When enabled, it intercepts supported story seen-status requests in the browser so those requests are not sent as usual.",
  },
  {
    question: "Does it need my Instagram or Facebook password?",
    answer:
      "No. The extension does not ask for or store your account password. You continue to use Instagram or Facebook in your own browser session.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "The extension is available for Chrome, Microsoft Edge, and Firefox through their official extension stores. The project also supports Chromium-based browsers using the Chrome extension package, subject to each browser's compatibility.",
  },
  {
    question: "Does it send my browsing data to a server?",
    answer:
      "The extension's story-request filtering runs locally. It does not use a proxy or a companion service to process your browsing activity. Instagram and Facebook still receive the ordinary requests needed to load their sites.",
  },
]
