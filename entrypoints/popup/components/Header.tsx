import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.svg';

export function Header() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const ThemeIcon =
    theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border">
      <div className="flex items-center gap-2.5">
        <img
          src={logo}
          alt="Anonymous Story Viewer"
          className="size-7 rounded-md"
        />
        <div>
          <h1 className="text-sm font-semibold leading-tight">
            Anonymous Story Viewer
          </h1>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Browse stories privately
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={cycleTheme}
        aria-label={`Current theme: ${theme}`}
        className="shrink-0"
      >
        <ThemeIcon className="size-4" />
      </Button>
    </header>
  );
}
