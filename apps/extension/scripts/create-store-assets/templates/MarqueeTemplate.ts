import type { AssetTarget } from "../config";
import { BaseTemplate } from "./BaseTemplate";
import { themeTokens } from "../theme/tokens";
import { Icon } from "../components/Icon";
import { Badge } from "../components/Badge";
import { PopupMockup } from "../components/PopupMockup";

export class MarqueeTemplate extends BaseTemplate {
  public render(target: AssetTarget): string {
    const { colors, typography, radii } = themeTokens;
    const font = typography.fontFamily;

    const content = `
      <!-- Left Content Column -->
      <g transform="translate(100, 70)">
        <!-- Top Badge -->
        ${Badge.render({
          label: "CHROME WEB STORE",
          variant: "outline",
          icon: { name: "googleChrome", type: "simple", size: 13, color: colors.chrome },
          x: 0,
          y: 0,
          height: 28,
          fontSize: 10.5,
          paddingX: 12,
        })}

        <!-- Main Headline -->
        <text x="0" y="74" fill="${colors.foreground}" font-family="${font}" font-size="44" font-weight="800" letter-spacing="-1">
          Anonymous Story Viewer
        </text>

        <!-- Subtitle -->
        <text x="0" y="114" fill="${colors.mutedForeground}" font-family="${font}" font-size="18.5" font-weight="400">
          Browse Instagram &amp; Facebook stories privately without leaving a trace.
        </text>

        <!-- Feature Pills Row -->
        <g transform="translate(0, 160)">
          <!-- Feature 1 -->
          <g transform="translate(0, 0)">
            <rect width="180" height="42" rx="${radii.md}" fill="${colors.card}" stroke="${colors.cardBorder}" stroke-width="1" />
            ${Icon.render({
              name: "shieldCheck",
              size: 16,
              color: colors.success,
              x: 14,
              y: 13,
            })}
            <text x="38" y="26" fill="${colors.foreground}" font-family="${font}" font-size="12" font-weight="700">Zero "Seen" Receipts</text>
          </g>

          <!-- Feature 2 -->
          <g transform="translate(195, 0)">
            <rect width="180" height="42" rx="${radii.md}" fill="${colors.card}" stroke="${colors.cardBorder}" stroke-width="1" />
            ${Icon.render({
              name: "zap",
              size: 16,
              color: colors.primary,
              x: 14,
              y: 13,
            })}
            <text x="38" y="26" fill="${colors.foreground}" font-family="${font}" font-size="12" font-weight="700">1-Click Master Toggle</text>
          </g>

          <!-- Feature 3 -->
          <g transform="translate(390, 0)">
            <rect width="180" height="42" rx="${radii.md}" fill="${colors.card}" stroke="${colors.cardBorder}" stroke-width="1" />
            ${Icon.render({
              name: "lock",
              size: 16,
              color: colors.info,
              x: 14,
              y: 13,
            })}
            <text x="38" y="26" fill="${colors.foreground}" font-family="${font}" font-size="12" font-weight="700">No Login Required</text>
          </g>
        </g>

        <!-- Supported Platforms Row -->
        <g transform="translate(0, 235)">
          <g transform="translate(0, 0)">
            <rect width="150" height="40" rx="${radii.md}" fill="${colors.backgroundSubtle}" stroke="${colors.cardBorder}" stroke-width="1" />
            ${Icon.render({
              name: "instagram",
              type: "simple",
              size: 16,
              color: colors.instagram,
              x: 14,
              y: 12,
            })}
            <text x="40" y="25" fill="${colors.foreground}" font-family="${font}" font-size="12.5" font-weight="700">Instagram</text>
          </g>

          <g transform="translate(165, 0)">
            <rect width="150" height="40" rx="${radii.md}" fill="${colors.backgroundSubtle}" stroke="${colors.cardBorder}" stroke-width="1" />
            ${Icon.render({
              name: "facebook",
              type: "simple",
              size: 16,
              color: colors.facebook,
              x: 14,
              y: 12,
            })}
            <text x="40" y="25" fill="${colors.foreground}" font-family="${font}" font-size="12.5" font-weight="700">Facebook</text>
          </g>
        </g>

        <!-- Footer Policy Badge -->
        <g transform="translate(0, 315)">
          <text x="0" y="0" fill="${colors.subtleForeground}" font-family="${font}" font-size="11.5">
            Manifest V3 Compliant • 100% Client-Side • Open Source
          </text>
        </g>
      </g>

      <!-- Right Mockup Visual (Popup Mockup) -->
      ${PopupMockup.render({
        x: 880,
        y: 65,
        width: 340,
        height: 430,
        isActive: true,
      })}
    `;

    return this.renderCanvas(target, content);
  }
}
