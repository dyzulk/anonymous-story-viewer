import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

function getSiteUrl(value: string | undefined) {
  if (!value) {
    return undefined
  }

  let siteUrl: URL
  try {
    siteUrl = new URL(value)
  } catch {
    throw new Error("VITE_SITE_URL must be a valid absolute HTTPS URL.")
  }

  if (
    siteUrl.protocol !== "https:" ||
    siteUrl.pathname !== "/" ||
    siteUrl.search ||
    siteUrl.hash
  ) {
    throw new Error(
      "VITE_SITE_URL must be an HTTPS origin without a path, query, or hash."
    )
  }

  return siteUrl.origin
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "VITE_")
  const siteUrl = getSiteUrl(env.VITE_SITE_URL)

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "web-seo",
        transformIndexHtml(html) {
          if (!siteUrl) {
            return html
          }

          const imageUrl = `${siteUrl}/og-image.png`
          const structuredData = {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "Anonymous Story Viewer",
                url: siteUrl,
              },
              {
                "@type": "SoftwareApplication",
                name: "Anonymous Story Viewer",
                applicationCategory: "BrowserApplication",
                operatingSystem: "Chrome, Microsoft Edge, Mozilla Firefox",
                description:
                  "A free browser extension that blocks supported Instagram and Facebook story seen confirmations locally.",
                url: siteUrl,
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                sameAs: [
                  "https://github.com/dyzulk/anonymous-story-viewer",
                  "https://chromewebstore.google.com/detail/anonymous-story-viewer/ehgnmpihpelidmmblpamihdaajbbeehf",
                  "https://microsoftedge.microsoft.com/addons/detail/anonymous-story-viewer/cfieebihkobiagnhmodjpljpdkjnbhbm",
                  "https://addons.mozilla.org/en-US/firefox/addon/anon-story-viewer/",
                ],
              },
            ],
          }
          const metadata = [
            `<link rel="canonical" href="${siteUrl}/" />`,
            `<meta property="og:url" content="${siteUrl}/" />`,
            `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
          ].join("\n    ")

          return html
            .replaceAll('content="/og-image.png"', `content="${imageUrl}"`)
            .replace("</head>", `    ${metadata}\n  </head>`)
        },
      },
    ],
    resolve: {
      alias: {
        "@": resolve(import.meta.dirname, "./src"),
      },
    },
  }
})
