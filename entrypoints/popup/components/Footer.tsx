import { Separator } from '@/components/ui/separator';
import packageJson from '@/package.json';

export function Footer() {
  let version = packageJson.version;

  try {
    if (typeof browser !== 'undefined' && browser.runtime?.getManifest) {
      const manifestVersion = browser.runtime.getManifest()?.version;
      if (manifestVersion) {
        version = manifestVersion;
      }
    }
  } catch {
    // Keep the package version when the runtime manifest is unavailable.
  }

  return (
    <footer className="mt-auto">
      <Separator />
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="text-[10px] text-muted-foreground">v{version}</span>
        <a
          href="https://github.com/dyzulk/anonymous-story-viewer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
