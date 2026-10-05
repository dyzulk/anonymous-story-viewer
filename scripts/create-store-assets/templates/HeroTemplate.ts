import type { AssetTarget } from "../config";
import { BaseTemplate } from "./BaseTemplate";
import { themeTokens } from "../theme/tokens";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { Badge } from "../components/Badge";
import { PopupMockup } from "../components/PopupMockup";

export class HeroTemplate extends BaseTemplate {
  public render(target: AssetTarget): string {
    const { colors, typography, radii } = themeTokens;
    const font = typography.fontFamily;

    const content = `
      <!-- Header Area -->
      ${this.renderHeader(
        80,
        60,
        "CHROME EXTENSION",
        "shieldCheck",
        target.title,
        target.subtitle
      )}

      <!-- Feature Cards (Left Column) -->
      <g transform="translate(80, 210)">
        <!-- Feature 1 -->
        ${Card.render({
          x: 0,
          y: 0,
          width: 360,
          height: 84,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="46" height="46" rx="${radii.md}" fill="${colors.primaryMuted}" />
              ${Icon.render({
                name: "eyeOff",
                size: 22,
                color: colors.primary,
                x: 12,
                y: 12,
              })}
              <text x="60" y="20" fill="${colors.foreground}" font-family="${font}" font-size="14.5" font-weight="700">Zero "Seen" Receipts</text>
              <text x="60" y="38" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">View Instagram &amp; Facebook stories silently</text>
            </g>
          `,
        })}

        <!-- Feature 2 -->
        ${Card.render({
          x: 0,
          y: 100,
          width: 360,
          height: 84,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="46" height="46" rx="${radii.md}" fill="${colors.instagramMuted}" />
              ${Icon.render({
                name: "instagram",
                type: "simple",
                size: 22,
                color: colors.instagram,
                x: 12,
                y: 12,
              })}
              <text x="60" y="20" fill="${colors.foreground}" font-family="${font}" font-size="14.5" font-weight="700">Multi-Platform Support</text>
              <text x="60" y="38" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Full support for Instagram and Facebook</text>
            </g>
          `,
        })}

        <!-- Feature 3 -->
        ${Card.render({
          x: 0,
          y: 200,
          width: 360,
          height: 84,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="46" height="46" rx="${radii.md}" fill="${colors.successMuted}" />
              ${Icon.render({
                name: "lock",
                size: 22,
                color: colors.success,
                x: 12,
                y: 12,
              })}
              <text x="60" y="20" fill="${colors.foreground}" font-family="${font}" font-size="14.5" font-weight="700">Local Privacy Engine</text>
              <text x="60" y="38" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">No login credentials or external telemetry</text>
            </g>
          `,
        })}

        <!-- Feature 4 -->
        ${Card.render({
          x: 0,
          y: 300,
          width: 360,
          height: 84,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="46" height="46" rx="${radii.md}" fill="${colors.secondary}" />
              ${Icon.render({
                name: "zap",
                size: 22,
                color: colors.foreground,
                x: 12,
                y: 12,
              })}
              <text x="60" y="20" fill="${colors.foreground}" font-family="${font}" font-size="14.5" font-weight="700">One-Click Toggle</text>
              <text x="60" y="38" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Enable or disable blocking with immediate sync</text>
            </g>
          `,
        })}
      </g>

      <!-- Extension Popup Mockup (Middle Column) -->
      ${PopupMockup.render({
        x: 480,
        y: 200,
        width: 340,
        height: 440,
        isActive: true,
      })}

      <!-- Story Viewer Simulation Mockup (Right Column) -->
      <g transform="translate(860, 200)">
        ${Card.render({
          x: 0,
          y: 0,
          width: 340,
          height: 440,
          rx: radii.lg,
          children: `
            <!-- Top Progress Bars -->
            <rect x="20" y="18" width="92" height="3" rx="1.5" fill="${colors.foreground}" />
            <rect x="124" y="18" width="92" height="3" rx="1.5" fill="${colors.mutedForeground}" opacity="0.4" />
            <rect x="228" y="18" width="92" height="3" rx="1.5" fill="${colors.mutedForeground}" opacity="0.4" />

            <!-- User Header -->
            <g transform="translate(20, 36)">
              <rect width="32" height="32" rx="16" fill="${colors.instagramMuted}" stroke="${colors.instagram}" stroke-width="1.5" />
              ${Icon.render({
                name: "instagram",
                type: "simple",
                size: 16,
                color: colors.instagram,
                x: 8,
                y: 8,
              })}
              <text x="42" y="16" fill="${colors.foreground}" font-family="${font}" font-size="12.5" font-weight="700">story_creator</text>
              <text x="42" y="29" fill="${colors.mutedForeground}" font-family="${font}" font-size="10">2h ago • Active Story</text>
            </g>

            <!-- Story Visual Canvas Preview -->
            <rect x="20" y="80" width="300" height="230" rx="${radii.md}" fill="${colors.backgroundSubtle}" stroke="${colors.cardBorder}" stroke-width="1" />
            <circle cx="170" cy="185" r="50" fill="${colors.primaryMuted}" />
            ${Icon.render({
              name: "video",
              size: 36,
              color: colors.primary,
              x: 152,
              y: 167,
            })}

            <!-- Interceptor Status Card -->
            <g transform="translate(36, 326)">
              <rect width="268" height="82" rx="${radii.md}" fill="${colors.popover}" stroke="${colors.successBorder}" stroke-width="1.2" />
              
              <g transform="translate(14, 16)">
                <rect width="32" height="32" rx="${radii.sm}" fill="${colors.successMuted}" />
                ${Icon.render({
                  name: "shieldCheck",
                  size: 18,
                  color: colors.success,
                  x: 7,
                  y: 7,
                })}
                <text x="42" y="14" fill="${colors.success}" font-family="${font}" font-size="11.5" font-weight="700">STEALTH MODE ACTIVE</text>
                <text x="42" y="28" fill="${colors.foreground}" font-family="${font}" font-size="11" font-weight="600">Seen Receipt Blocked</text>
                <text x="42" y="42" fill="${colors.mutedForeground}" font-family="${font}" font-size="9.5">Zero requests transmitted to Meta API</text>
              </g>
            </g>
          `,
        })}
      </g>
    `;

    return this.renderCanvas(target, content);
  }
}
