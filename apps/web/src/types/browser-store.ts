export type BrowserStoreId = "chrome" | "edge" | "firefox"

export type BrowserStore = {
  id: BrowserStoreId
  name: string
  action: string
  logo: string
  url: string
}

export type Feature = {
  title: string
  description: string
  icon: "shield" | "sliders" | "monitor" | "eye"
}

export type HowItWorksStep = {
  title: string
  description: string
}

export type FaqEntry = {
  question: string
  answer: string
}
