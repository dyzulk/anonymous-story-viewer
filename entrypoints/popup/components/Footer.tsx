import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="mt-auto">
      <Separator />
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="text-[10px] text-muted-foreground">v1.0.0</span>
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
