import type { AssetTarget } from "../config";
import { BaseTemplate } from "./BaseTemplate";
import { themeTokens } from "../theme/tokens";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { PopupMockup } from "../components/PopupMockup";

export class PopupUiTemplate extends BaseTemplate {
  public render(target: AssetTarget): string {
    const { colors, typography, radii } = themeTokens;
    const font = typography.fontFamily;

    const content = `
      <!-- Header Area (Centered) -->
      <g transform="translate(640, 60)" text-anchor="middle">
        ${this.renderHeader(
          -480,
          0,
          "SHADCN DESIGN SYSTEM",
          "slidersHorizontal",
          target.title,
          target.subtitle
        )}
      </g>

      <!-- Left Feature Cards -->
      <g transform="translate(80, 200)">
        <!-- Card 1 -->
        ${Card.render({
          x: 0,
          y: 0,
          width: 320,
          height: 120,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="36" height="36" rx="${radii.sm}" fill="${colors.primaryMuted}" />
              ${Icon.render({
                name: "zap",
                size: 18,
                color: colors.primary,
                x: 9,
                y: 9,
              })}
              <text x="48" y="22" fill="${colors.foreground}" font-family="${font}" font-size="14" font-weight="700">Master Switch</text>
              <text x="0" y="58" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Enable or disable blocking globally with a single click.</text>
              <text x="0" y="74" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Instant real-time state synchronization.</text>
            </g>
          `,
        })}

        <!-- Card 2 -->
        ${Card.render({
          x: 0,
          y: 140,
          width: 320,
          height: 120,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="36" height="36" rx="${radii.sm}" fill="${colors.infoMuted}" />
              ${Icon.render({
                name: "slidersHorizontal",
                size: 18,
                color: colors.info,
                x: 9,
                y: 9,
              })}
              <text x="48" y="22" fill="${colors.foreground}" font-family="${font}" font-size="14" font-weight="700">Granular Controls</text>
              <text x="0" y="58" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Independent toggles for Instagram and Facebook.</text>
              <text x="0" y="74" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Choose exactly where blocking runs.</text>
            </g>
          `,
        })}

        <!-- Card 3 -->
        ${Card.render({
          x: 0,
          y: 280,
          width: 320,
          height: 120,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="36" height="36" rx="${radii.sm}" fill="${colors.secondary}" />
              ${Icon.render({
                name: "sunMoon",
                size: 18,
                color: colors.foreground,
                x: 9,
                y: 9,
              })}
              <text x="48" y="22" fill="${colors.foreground}" font-family="${font}" font-size="14" font-weight="700">Theme Switcher</text>
              <text x="0" y="58" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Dark, Light, or System automatic theme.</text>
              <text x="0" y="74" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Matches your browser aesthetics.</text>
            </g>
          `,
        })}
      </g>

      <!-- Center Popup Mockup -->
      ${PopupMockup.render({
        x: 470,
        y: 190,
        width: 340,
        height: 440,
        isActive: true,
      })}

      <!-- Right Feature Cards -->
      <g transform="translate(880, 200)">
        <!-- Card 4 -->
        ${Card.render({
          x: 0,
          y: 0,
          width: 320,
          height: 120,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="36" height="36" rx="${radii.sm}" fill="${colors.successMuted}" />
              ${Icon.render({
                name: "activity",
                size: 18,
                color: colors.success,
                x: 9,
                y: 9,
              })}
              <text x="48" y="22" fill="${colors.foreground}" font-family="${font}" font-size="14" font-weight="700">Live Status Indicator</text>
              <text x="0" y="58" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Instantly check if story protection is actively running</text>
              <text x="0" y="74" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">without opening developer tools.</text>
            </g>
          `,
        })}

        <!-- Card 5 -->
        ${Card.render({
          x: 0,
          y: 140,
          width: 320,
          height: 120,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="36" height="36" rx="${radii.sm}" fill="${colors.warningMuted}" />
              ${Icon.render({
                name: "feather",
                size: 18,
                color: colors.warning,
                x: 9,
                y: 9,
              })}
              <text x="48" y="22" fill="${colors.foreground}" font-family="${font}" font-size="14" font-weight="700">Zero Overhead</text>
              <text x="0" y="58" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Ultra-lightweight footprint with zero background battery</text>
              <text x="0" y="74" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">or CPU drain while idle.</text>
            </g>
          `,
        })}

        <!-- Card 6 -->
        ${Card.render({
          x: 0,
          y: 280,
          width: 320,
          height: 120,
          rx: radii.lg,
          children: `
            <g transform="translate(18, 18)">
              <rect width="36" height="36" rx="${radii.sm}" fill="${colors.primaryMuted}" />
              ${Icon.render({
                name: "shieldCheck",
                size: 18,
                color: colors.primary,
                x: 9,
                y: 9,
              })}
              <text x="48" y="22" fill="${colors.foreground}" font-family="${font}" font-size="14" font-weight="700">Manifest V3 Secure</text>
              <text x="0" y="58" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Fully compliant with the latest Google Chrome and</text>
              <text x="0" y="74" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">Edge security specifications.</text>
            </g>
          `,
        })}
      </g>
    `;

    return this.renderCanvas(target, content);
  }
}
