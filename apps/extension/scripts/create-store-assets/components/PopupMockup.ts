import { themeTokens } from "../theme/tokens";
import { Icon } from "./Icon";
import { Badge } from "./Badge";
import { Switch } from "./Switch";

export interface PopupMockupOptions {
  x: number;
  y: number;
  width?: number;
  height?: number;
  isActive?: boolean;
  themeMode?: "dark" | "light" | "system";
}

export class PopupMockup {
  public static render(options: PopupMockupOptions): string {
    const {
      x,
      y,
      width = 340,
      height = 430,
      isActive = true,
      themeMode = "dark",
    } = options;

    const font = themeTokens.typography.fontFamily;

    return `
    <g transform="translate(${x}, ${y})">
      <!-- Outer Drop Shadow Box -->
      <rect width="${width}" height="${height}" rx="${themeTokens.radii.lg}" fill="${themeTokens.colors.card}" stroke="${themeTokens.colors.cardBorder}" stroke-width="1.5" />
      
      <!-- Top Header -->
      <path d="M 0 ${themeTokens.radii.lg} Q 0 0 ${themeTokens.radii.lg} 0 L ${width - themeTokens.radii.lg} 0 Q ${width} 0 ${width} ${themeTokens.radii.lg} L ${width} 58 L 0 58 Z" fill="${themeTokens.colors.backgroundSubtle}" />
      <line x1="0" y1="58" x2="${width}" y2="58" stroke="${themeTokens.colors.cardBorder}" stroke-width="1" />
      
      <!-- Logo Icon (Square with primary color and EyeOff) -->
      <rect x="16" y="14" width="30" height="30" rx="${themeTokens.radii.sm}" fill="${themeTokens.colors.primary}" />
      ${Icon.render({
        name: "eyeOff",
        size: 16,
        color: themeTokens.colors.primaryForeground,
        x: 23,
        y: 21,
      })}
      
      <text x="56" y="28" fill="${themeTokens.colors.foreground}" font-family="${font}" font-size="13" font-weight="700">Anonymous Story</text>
      <text x="56" y="42" fill="${themeTokens.colors.mutedForeground}" font-family="${font}" font-size="10.5">Browse stories privately</text>

      <!-- Theme Switcher Button -->
      <rect x="${width - 44}" y="14" width="30" height="30" rx="${themeTokens.radii.sm}" fill="${themeTokens.colors.secondary}" stroke="${themeTokens.colors.cardBorder}" stroke-width="1" />
      ${Icon.render({
        name: themeMode === "dark" ? "moon" : themeMode === "light" ? "sun" : "monitor",
        size: 14,
        color: themeTokens.colors.mutedForeground,
        x: width - 36,
        y: 22,
      })}

      <!-- Body / Master Toggle Card -->
      <g transform="translate(14, 72)">
        <rect width="${width - 28}" height="64" rx="${themeTokens.radii.md}" fill="${themeTokens.colors.popover}" stroke="${themeTokens.colors.cardBorderActive}" stroke-width="1" />
        <text x="14" y="27" fill="${themeTokens.colors.foreground}" font-family="${font}" font-size="13" font-weight="600">Block Story Seen</text>
        <text x="14" y="45" fill="${themeTokens.colors.mutedForeground}" font-family="${font}" font-size="10.5">Hide your story views</text>
        
        <!-- Active Badge -->
        ${Badge.render({
          label: isActive ? "ACTIVE" : "OFF",
          variant: isActive ? "success" : "secondary",
          height: 20,
          paddingX: 8,
          fontSize: 9.5,
          x: width - 118,
          y: 22,
        })}
        
        <!-- Master Switch -->
        ${Switch.render({
          checked: isActive,
          x: width - 72,
          y: 20,
        })}
      </g>

      <!-- Separator -->
      <line x1="14" y1="150" x2="${width - 14}" y2="150" stroke="${themeTokens.colors.cardBorder}" stroke-width="1" />

      <!-- Platforms Header -->
      <text x="16" y="172" fill="${themeTokens.colors.mutedForeground}" font-family="${font}" font-size="10" font-weight="700" letter-spacing="1">PLATFORMS</text>

      <!-- Instagram Toggle Row -->
      <g transform="translate(14, 184)">
        <rect width="${width - 28}" height="50" rx="${themeTokens.radii.md}" fill="${themeTokens.colors.popover}" stroke="${themeTokens.colors.cardBorder}" stroke-width="1" />
        
        <!-- Instagram Brand Icon -->
        <rect x="12" y="13" width="24" height="24" rx="${themeTokens.radii.sm}" fill="${themeTokens.colors.instagramMuted}" />
        ${Icon.render({
          name: "instagram",
          type: "simple",
          size: 14,
          color: themeTokens.colors.instagram,
          x: 17,
          y: 18,
        })}
        
        <text x="46" y="30" fill="${themeTokens.colors.foreground}" font-family="${font}" font-size="12.5" font-weight="600">Instagram</text>
        
        ${Switch.render({
          checked: true,
          x: width - 72,
          y: 13,
        })}
      </g>

      <!-- Facebook Toggle Row -->
      <g transform="translate(14, 242)">
        <rect width="${width - 28}" height="50" rx="${themeTokens.radii.md}" fill="${themeTokens.colors.popover}" stroke="${themeTokens.colors.cardBorder}" stroke-width="1" />
        
        <!-- Facebook Brand Icon -->
        <rect x="12" y="13" width="24" height="24" rx="${themeTokens.radii.sm}" fill="${themeTokens.colors.facebookMuted}" />
        ${Icon.render({
          name: "facebook",
          type: "simple",
          size: 14,
          color: themeTokens.colors.facebook,
          x: 17,
          y: 18,
        })}
        
        <text x="46" y="30" fill="${themeTokens.colors.foreground}" font-family="${font}" font-size="12.5" font-weight="600">Facebook</text>
        
        ${Switch.render({
          checked: true,
          x: width - 72,
          y: 13,
        })}
      </g>

      <!-- Bottom Info Callout -->
      <g transform="translate(14, 304)">
        <rect width="${width - 28}" height="66" rx="${themeTokens.radii.sm}" fill="${themeTokens.colors.secondary}" stroke="${themeTokens.colors.cardBorder}" stroke-width="1" />
        ${Icon.render({
          name: "shieldCheck",
          size: 16,
          color: themeTokens.colors.primary,
          x: 12,
          y: 16,
        })}
        <text x="36" y="24" fill="${themeTokens.colors.foreground}" font-family="${font}" font-size="10.5" font-weight="600">Stealth Mode Protection Active</text>
        <text x="36" y="40" fill="${themeTokens.colors.mutedForeground}" font-family="${font}" font-size="9.5">When active, "seen" receipts are blocked.</text>
        <text x="36" y="52" fill="${themeTokens.colors.mutedForeground}" font-family="${font}" font-size="9.5">Story owners will never know you viewed them.</text>
      </g>

      <!-- Bottom Status Bar -->
      <line x1="0" y1="384" x2="${width}" y2="384" stroke="${themeTokens.colors.cardBorder}" stroke-width="1" />
      <circle cx="24" cy="406" r="3.5" fill="${themeTokens.colors.success}" />
      <text x="36" y="410" fill="${themeTokens.colors.mutedForeground}" font-family="${font}" font-size="10">Local Interceptor Running • 0 Traces</text>
    </g>
    `;
  }
}
