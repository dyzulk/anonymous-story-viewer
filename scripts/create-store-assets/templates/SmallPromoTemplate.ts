import type { AssetTarget } from "../config";
import { BaseTemplate } from "./BaseTemplate";
import { themeTokens } from "../theme/tokens";
import { Icon } from "../components/Icon";
import { Badge } from "../components/Badge";

export class SmallPromoTemplate extends BaseTemplate {
  public render(target: AssetTarget): string {
    const { colors, typography, radii } = themeTokens;
    const font = typography.fontFamily;

    const content = `
      <!-- Container border box -->
      <rect x="8" y="8" width="${target.width - 16}" height="${target.height - 16}" rx="${radii.lg}" fill="${colors.card}" stroke="${colors.cardBorder}" stroke-width="1.5" />

      <!-- Top Header Row -->
      <g transform="translate(28, 28)">
        <!-- Logo Icon -->
        <rect width="44" height="44" rx="${radii.md}" fill="${colors.primary}" />
        ${Icon.render({
          name: "eyeOff",
          size: 22,
          color: colors.primaryForeground,
          x: 11,
          y: 11,
        })}
      </g>

      <!-- Incognito Status Badge -->
      ${Badge.render({
        label: "INCOGNITO",
        variant: "success",
        icon: { name: "shieldCheck", size: 10, color: colors.success },
        x: 295,
        y: 36,
        height: 24,
        fontSize: 9.5,
        paddingX: 10,
      })}

      <!-- Main Headline -->
      <g transform="translate(28, 108)">
        <text x="0" y="0" fill="${colors.foreground}" font-family="${font}" font-size="20" font-weight="800" letter-spacing="-0.5">
          Anonymous Story
        </text>
        <text x="0" y="24" fill="${colors.primary}" font-family="${font}" font-size="18" font-weight="800">
          Viewer
        </text>
        <text x="0" y="50" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5" font-weight="400">
          Watch Instagram &amp; Facebook stories
        </text>
        <text x="0" y="66" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5" font-weight="400">
          without leaving a single seen receipt.
        </text>
      </g>

      <!-- Bottom Platform Badges -->
      <g transform="translate(28, 220)">
        <!-- Instagram Pill -->
        <g transform="translate(0, 0)">
          <rect width="105" height="28" rx="${radii.sm}" fill="${colors.backgroundSubtle}" stroke="${colors.cardBorder}" stroke-width="1" />
          ${Icon.render({
            name: "instagram",
            type: "simple",
            size: 13,
            color: colors.instagram,
            x: 8,
            y: 7.5,
          })}
          <text x="27" y="18" fill="${colors.foreground}" font-family="${font}" font-size="11" font-weight="600">Instagram</text>
        </g>

        <!-- Facebook Pill -->
        <g transform="translate(115, 0)">
          <rect width="105" height="28" rx="${radii.sm}" fill="${colors.backgroundSubtle}" stroke="${colors.cardBorder}" stroke-width="1" />
          ${Icon.render({
            name: "facebook",
            type: "simple",
            size: 13,
            color: colors.facebook,
            x: 8,
            y: 7.5,
          })}
          <text x="27" y="18" fill="${colors.foreground}" font-family="${font}" font-size="11" font-weight="600">Facebook</text>
        </g>
      </g>
    `;

    return this.renderCanvas(target, content, false);
  }
}
