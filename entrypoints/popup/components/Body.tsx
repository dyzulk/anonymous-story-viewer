import { SiInstagram, SiFacebook } from '@icons-pack/react-simple-icons';
import { useStorage } from '@/hooks/use-storage';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function Body() {
  const { isActive, platforms, loading, setActive, setPlatform } = useStorage();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col gap-4 p-4">
      {/* Master Toggle */}
      <div className="flex items-center justify-between rounded-lg bg-card border border-border p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Block Story Seen</span>
            <span className="text-xs text-muted-foreground">
              Hide your story views
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Badge
            variant={isActive ? 'default' : 'secondary'}
            className="text-[10px] px-1.5 py-0 h-5 transition-colors"
          >
            {isActive ? 'Active' : 'Off'}
          </Badge>
          <Switch
            id="master-toggle"
            checked={isActive}
            onCheckedChange={setActive}
            aria-label="Toggle story seen blocker"
          />
        </div>
      </div>

      <Separator />

      {/* Platform Toggles */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-0.5 mb-1">
          Platforms
        </h2>

        <div
          className="flex flex-col gap-2 transition-opacity duration-200"
          style={{ opacity: isActive ? 1 : 0.45 }}
        >
          {/* Instagram */}
          <label
            htmlFor="instagram-toggle"
            className="flex items-center justify-between rounded-lg bg-card border border-border p-3 cursor-pointer hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <SiInstagram className="size-4 text-muted-foreground" />
              <span className="text-sm">Instagram</span>
            </div>
            <Switch
              id="instagram-toggle"
              checked={platforms.instagram}
              onCheckedChange={(v) => setPlatform('instagram', v)}
              disabled={!isActive}
              aria-label="Toggle Instagram blocking"
            />
          </label>

          {/* Facebook */}
          <label
            htmlFor="facebook-toggle"
            className="flex items-center justify-between rounded-lg bg-card border border-border p-3 cursor-pointer hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <SiFacebook className="size-4 text-muted-foreground" />
              <span className="text-sm">Facebook</span>
            </div>
            <Switch
              id="facebook-toggle"
              checked={platforms.facebook}
              onCheckedChange={(v) => setPlatform('facebook', v)}
              disabled={!isActive}
              aria-label="Toggle Facebook blocking"
            />
          </label>
        </div>
      </div>

      {/* Info */}
      <p className="text-[11px] text-muted-foreground leading-relaxed px-0.5">
        When active, this extension blocks "seen" receipts so story owners won't
        know you viewed their stories.
      </p>
    </main>
  );
}
