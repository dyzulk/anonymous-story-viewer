import { ChevronDown, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Button } from "@workspace/ui/components/button"
import { browserStores, getAlternativeStores } from "@/lib/browser-stores"
import { useBrowserStore } from "@/hooks/use-browser-store"

export function DownloadActions() {
  const browserStoreId = useBrowserStore()
  const primaryStore = browserStores[browserStoreId]
  const alternativeStores = getAlternativeStores(browserStoreId)

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row">
      <Button asChild className="w-full sm:flex-1" size="lg">
        <a href={primaryStore.url} rel="noreferrer" target="_blank">
          <img
            alt=""
            aria-hidden="true"
            className="size-5"
            height="20"
            src={primaryStore.logo}
            width="20"
          />
          {primaryStore.action}
          <ExternalLink aria-hidden="true" />
        </a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full sm:flex-1">
          <Button
            aria-label="Other browser stores"
            className="w-full justify-between"
            size="lg"
            variant="outline"
          >
            Other browsers
            <ChevronDown aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {alternativeStores.map((store) => (
            <DropdownMenuItem className="w-full" key={store.id} asChild>
              <a href={store.url} rel="noreferrer" target="_blank">
                <img
                  alt=""
                  aria-hidden="true"
                  className="size-4"
                  height="16"
                  src={store.logo}
                  width="16"
                />
                <span className="min-w-0 flex-1 whitespace-normal">
                  {store.name}
                </span>
                <ExternalLink aria-hidden="true" />
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
