# Website deployments

The website is a static Vite app in this pnpm workspace. The repository root
must remain the install/build root so the app can resolve the shared
`@workspace/ui` package.

## Build settings

Use these settings for Cloudflare Pages, GitHub Actions, or Vercel:

| Setting | Value |
| --- | --- |
| Repository/root directory | `.` (repository root) |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build:web` |
| Build output directory | `apps/web/dist` |
| Node.js | 22 or later |

Set `VITE_SITE_URL` in the deployment environment to the site's final HTTPS
origin, with no path, query, or hash. For example:

```text
VITE_SITE_URL=https://your-subdomain.js.org
```

Vite uses this value at build time to emit the canonical URL, absolute Open
Graph and Twitter image URLs, `og:url`, and JSON-LD structured data. The Open
Graph image is served from `/og-image.png`. An invalid value (including an
HTTP URL or a URL with a path) fails the build. For preview deployments, either
set `VITE_SITE_URL` to that preview's origin or leave it unset so production
canonical metadata is not embedded in the preview.

The example environment file is [`./.env.example`](./.env.example). Do not
commit production environment files.

## Recommended: Cloudflare Pages

Cloudflare Pages is the recommended fit for this static site. Connect the
GitHub repository and configure the build settings above. Leave the project
root at the repository root; do not set it to `apps/web`, because the build
needs the root pnpm workspace and shared UI package.

After the first deployment:

1. Add the approved `js.org` hostname in the Pages project's **Custom
   domains** settings.
2. Follow the displayed DNS instructions and ensure the `js.org` CNAME points
   to the Pages project hostname.
3. Set the production `VITE_SITE_URL` environment variable to the custom
   hostname and redeploy.

For a subdomain, Cloudflare Pages supports a CNAME hosted by an external DNS
provider; the domain does not have to be a Cloudflare zone. Add the hostname
through the Pages dashboard before creating the DNS record. A manually added
CNAME without associating the hostname with the Pages project may not resolve
correctly.

## GitHub Pages

GitHub Pages is also a good option, especially if keeping deployment within
GitHub is preferred. Use a GitHub Actions workflow to install dependencies
from the repository root, run `pnpm build:web`, and publish
`apps/web/dist` as the Pages artifact. Set `VITE_SITE_URL` as a repository
Actions variable for the production build.

Configure the approved `js.org` hostname in the repository's **Settings >
Pages > Custom domain** and follow GitHub's DNS instructions. When publishing
with a custom Actions workflow, GitHub Pages does not process a `CNAME` file
from the artifact as the custom-domain setting; configure the domain in the
repository settings.

## Vercel

Vercel can deploy the site using the same root directory, install command,
build command, and output directory in the build settings table. Add
`VITE_SITE_URL` as a production environment variable, then redeploy after
setting the custom domain.

Add the approved `js.org` hostname to the Vercel project and follow Vercel's
DNS instructions for an external DNS provider. The DNS record managed for the
`js.org` hostname must match the target Vercel provides.

## Requesting a JS.ORG subdomain

Hosting support does not guarantee that a subdomain will be approved. JS.ORG
requires a substantive site directly related to the JavaScript ecosystem or
community; merely using JavaScript is not sufficient. Explain that Anonymous
Story Viewer is an open-source browser extension/tool, and link to its source,
documentation, releases, and browser-store listings.

Once the site is deployed and contains substantive content:

1. Choose an available subdomain name and configure it with the hosting
   provider.
2. Submit a pull request to the [JS.ORG subdomains list](https://github.com/js-org/js.org/blob/master/cnames_active.js)
   with the hostname and the CNAME target required by the chosen host.
3. Respond to any review feedback and confirm the hostname resolves to the
   deployed site.

Review the current [JS.ORG requirements and instructions](https://github.com/js-org/js.org)
before submitting, since approval and DNS configuration are managed by
JS.ORG.
