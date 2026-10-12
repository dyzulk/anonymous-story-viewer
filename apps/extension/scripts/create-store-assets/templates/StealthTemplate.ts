import type { AssetTarget } from "../config";
import { BaseTemplate } from "./BaseTemplate";
import { themeTokens } from "../theme/tokens";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";

export class StealthTemplate extends BaseTemplate {
  public render(target: AssetTarget): string {
    const { colors, typography, radii } = themeTokens;
    const font = typography.fontFamily;

    const content = `
      <!-- Header Area -->
      ${this.renderHeader(
        80,
        60,
        "INTERCEPTOR ARCHITECTURE",
        "shield",
        target.title,
        target.subtitle
      )}

      <!-- Side-by-side Comparative Cards -->
      <g transform="translate(80, 200)">
        <!-- Card 1: Default Browsing (Without Extension) -->
        ${Card.render({
          x: 0,
          y: 0,
          width: 535,
          height: 480,
          rx: radii.lg,
          borderColor: colors.destructiveBorder,
          children: `
            <!-- Top Header Banner -->
            <path d="M 0 ${radii.lg} Q 0 0 ${radii.lg} 0 L ${535 - radii.lg} 0 Q 535 0 535 ${radii.lg} L 535 60 L 0 60 Z" fill="${colors.destructiveMuted}" />
            <line x1="0" y1="60" x2="535" y2="60" stroke="${colors.destructiveBorder}" stroke-width="1" />
            
            <g transform="translate(24, 18)">
              ${Icon.render({
                name: "xCircle",
                size: 24,
                color: colors.destructive,
                x: 0,
                y: 0,
              })}
              <text x="34" y="17" fill="${colors.destructive}" font-family="${font}" font-size="14.5" font-weight="800">WITHOUT EXTENSION</text>
              <text x="487" y="17" fill="${colors.destructive}" font-family="${font}" font-size="11.5" font-weight="700" text-anchor="end">EXPOSED</text>
            </g>

            <!-- Step 1 -->
            <g transform="translate(24, 88)">
              <rect width="32" height="32" rx="${radii.sm}" fill="${colors.secondary}" />
              <text x="16" y="20" fill="${colors.mutedForeground}" font-family="${font}" font-size="12" font-weight="700" text-anchor="middle">01</text>
              <text x="44" y="15" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">You open an Instagram or Facebook story</text>
              <text x="44" y="32" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Browser requests media assets from CDN</text>
            </g>

            <!-- Step 2 -->
            <g transform="translate(24, 160)">
              <rect width="32" height="32" rx="${radii.sm}" fill="${colors.destructiveMuted}" />
              <text x="16" y="20" fill="${colors.destructive}" font-family="${font}" font-size="12" font-weight="700" text-anchor="middle">02</text>
              <text x="44" y="15" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">Browser automatically sends "seen" ping</text>
              <text x="44" y="32" fill="${colors.destructive}" font-family="${font}" font-size="11">POST /api/v1/stories/reel/seen (Sends your Account ID)</text>
            </g>

            <!-- Step 3 -->
            <g transform="translate(24, 232)">
              <rect width="32" height="32" rx="${radii.sm}" fill="${colors.secondary}" />
              <text x="16" y="20" fill="${colors.mutedForeground}" font-family="${font}" font-size="12" font-weight="700" text-anchor="middle">03</text>
              <text x="44" y="15" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">Your profile is added to the viewers list</text>
              <text x="44" y="32" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Story author receives real-time view notification</text>
            </g>

            <!-- Alert Box -->
            <g transform="translate(24, 320)">
              <rect width="487" height="110" rx="${radii.md}" fill="${colors.backgroundSubtle}" stroke="${colors.destructiveBorder}" stroke-width="1" />
              <g transform="translate(18, 20)">
                ${Icon.render({
                  name: "shieldAlert",
                  size: 22,
                  color: colors.destructive,
                  x: 0,
                  y: 0,
                })}
                <text x="32" y="16" fill="${colors.destructive}" font-family="${font}" font-size="13.5" font-weight="700">Result: Zero Privacy</text>
                <text x="32" y="38" fill="${colors.foreground}" font-family="${font}" font-size="11.5">Every viewed story is permanently logged on Meta servers.</text>
                <text x="32" y="56" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">There is no native incognito option in the official web interface.</text>
              </g>
            </g>
          `,
        })}

        <!-- Card 2: Anonymous Story Viewer (With Extension) -->
        ${Card.render({
          x: 585,
          y: 0,
          width: 535,
          height: 480,
          rx: radii.lg,
          borderColor: colors.successBorder,
          children: `
            <!-- Top Header Banner -->
            <path d="M 0 ${radii.lg} Q 0 0 ${radii.lg} 0 L ${535 - radii.lg} 0 Q 535 0 535 ${radii.lg} L 535 60 L 0 60 Z" fill="${colors.successMuted}" />
            <line x1="0" y1="60" x2="535" y2="60" stroke="${colors.successBorder}" stroke-width="1" />
            
            <g transform="translate(24, 18)">
              ${Icon.render({
                name: "checkCircle2",
                size: 24,
                color: colors.success,
                x: 0,
                y: 0,
              })}
              <text x="34" y="17" fill="${colors.success}" font-family="${font}" font-size="14.5" font-weight="800">WITH ANONYMOUS STORY VIEWER</text>
              <text x="487" y="17" fill="${colors.success}" font-family="${font}" font-size="11.5" font-weight="700" text-anchor="end">100% INVISIBLE</text>
            </g>

            <!-- Step 1 -->
            <g transform="translate(24, 88)">
              <rect width="32" height="32" rx="${radii.sm}" fill="${colors.secondary}" />
              <text x="16" y="20" fill="${colors.mutedForeground}" font-family="${font}" font-size="12" font-weight="700" text-anchor="middle">01</text>
              <text x="44" y="15" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">You view any story normally in your browser</text>
              <text x="44" y="32" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Flawless full HD media and audio playback</text>
            </g>

            <!-- Step 2 -->
            <g transform="translate(24, 160)">
              <rect width="32" height="32" rx="${radii.sm}" fill="${colors.successMuted}" />
              <text x="16" y="20" fill="${colors.success}" font-family="${font}" font-size="12" font-weight="700" text-anchor="middle">02</text>
              <text x="44" y="15" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">Seen request intercepted at network level</text>
              <text x="44" y="32" fill="${colors.success}" font-family="${font}" font-size="11">XHR &amp; Fetch hooks silently block outgoing tracking pings</text>
            </g>

            <!-- Step 3 -->
            <g transform="translate(24, 232)">
              <rect width="32" height="32" rx="${radii.sm}" fill="${colors.secondary}" />
              <text x="16" y="20" fill="${colors.mutedForeground}" font-family="${font}" font-size="12" font-weight="700" text-anchor="middle">03</text>
              <text x="44" y="15" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">You remain completely anonymous</text>
              <text x="44" y="32" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Your profile never appears on the viewer list</text>
            </g>

            <!-- Alert Box -->
            <g transform="translate(24, 320)">
              <rect width="487" height="110" rx="${radii.md}" fill="${colors.backgroundSubtle}" stroke="${colors.successBorder}" stroke-width="1" />
              <g transform="translate(18, 20)">
                ${Icon.render({
                  name: "shieldCheck",
                  size: 22,
                  color: colors.success,
                  x: 0,
                  y: 0,
                })}
                <text x="32" y="16" fill="${colors.success}" font-family="${font}" font-size="13.5" font-weight="700">Result: Complete Anonymity</text>
                <text x="32" y="38" fill="${colors.foreground}" font-family="${font}" font-size="11.5">Browse friends and public stories without anxiety.</text>
                <text x="32" y="56" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">No third-party login or credentials ever required.</text>
              </g>
            </g>
          `,
        })}
      </g>
    `;

    return this.renderCanvas(target, content);
  }
}
