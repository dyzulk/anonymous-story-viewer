import type { AssetTarget } from "../config";
import { BaseTemplate } from "./BaseTemplate";
import { themeTokens } from "../theme/tokens";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { Badge } from "../components/Badge";

export class PrivacyTemplate extends BaseTemplate {
  public render(target: AssetTarget): string {
    const { colors, typography, radii } = themeTokens;
    const font = typography.fontFamily;

    const content = `
      <!-- Header Area (Centered) -->
      <g transform="translate(640, 60)" text-anchor="middle">
        ${this.renderHeader(
          -480,
          0,
          "SECURITY & COMPLIANCE",
          "shieldCheck",
          target.title,
          target.subtitle
        )}
      </g>

      <!-- 4 Privacy Pillars Grid (2x2) -->
      <g transform="translate(110, 200)">
        <!-- Pillar 1: No Login Required -->
        ${Card.render({
          x: 0,
          y: 0,
          width: 515,
          height: 220,
          rx: radii.lg,
          children: `
            <g transform="translate(24, 24)">
              <rect width="44" height="44" rx="${radii.md}" fill="${colors.successMuted}" />
              ${Icon.render({
                name: "keyRound",
                size: 22,
                color: colors.success,
                x: 11,
                y: 11,
              })}
              
              <text x="60" y="20" fill="${colors.foreground}" font-family="${font}" font-size="16" font-weight="700">No Login or Passwords Required</text>
              <text x="60" y="38" fill="${colors.mutedForeground}" font-family="${font}" font-size="12">Direct in-browser execution</text>

              <text x="0" y="80" fill="${colors.mutedForeground}" font-family="${font}" font-size="12.5" font-weight="400">
                You never need to provide Instagram or Facebook credentials to any third-party. The extension runs directly inside your existing active browser session.
              </text>

              ${Badge.render({
                label: "ZERO CREDENTIALS STORED",
                variant: "success",
                icon: { name: "check", size: 10, color: colors.success },
                x: 0,
                y: 135,
                height: 26,
              })}
            </g>
          `,
        })}

        <!-- Pillar 2: Zero Analytics / Telemetry -->
        ${Card.render({
          x: 545,
          y: 0,
          width: 515,
          height: 220,
          rx: radii.lg,
          children: `
            <g transform="translate(24, 24)">
              <rect width="44" height="44" rx="${radii.md}" fill="${colors.destructiveMuted}" />
              ${Icon.render({
                name: "shieldOff",
                size: 22,
                color: colors.destructive,
                x: 11,
                y: 11,
              })}
              
              <text x="60" y="20" fill="${colors.foreground}" font-family="${font}" font-size="16" font-weight="700">Zero Analytics &amp; Tracking</text>
              <text x="60" y="38" fill="${colors.mutedForeground}" font-family="${font}" font-size="12">No external telemetry servers</text>

              <text x="0" y="80" fill="${colors.mutedForeground}" font-family="${font}" font-size="12.5" font-weight="400">
                No user analytics, crash telemetry pings, tracking cookies, or remote server logging. Nothing you view or browse is ever sent over the network.
              </text>

              ${Badge.render({
                label: "ZERO TELEMETRY",
                variant: "destructive",
                icon: { name: "shieldOff", size: 10, color: colors.destructive },
                x: 0,
                y: 135,
                height: 26,
              })}
            </g>
          `,
        })}

        <!-- Pillar 3: 100% Client-Side Engine -->
        ${Card.render({
          x: 0,
          y: 245,
          width: 515,
          height: 220,
          rx: radii.lg,
          children: `
            <g transform="translate(24, 24)">
              <rect width="44" height="44" rx="${radii.md}" fill="${colors.infoMuted}" />
              ${Icon.render({
                name: "cpu",
                size: 22,
                color: colors.info,
                x: 11,
                y: 11,
              })}
              
              <text x="60" y="20" fill="${colors.foreground}" font-family="${font}" font-size="16" font-weight="700">100% Client-Side Engine</text>
              <text x="60" y="38" fill="${colors.mutedForeground}" font-family="${font}" font-size="12">Executed locally on your device</text>

              <text x="0" y="80" fill="${colors.mutedForeground}" font-family="${font}" font-size="12.5" font-weight="400">
                All interceptor scripts run purely in your Google Chrome JavaScript runtime. Configuration is stored locally using the Chrome Extension Storage API.
              </text>

              ${Badge.render({
                label: "LOCAL EXECUTION ONLY",
                variant: "outline",
                icon: { name: "cpu", size: 10, color: colors.info },
                x: 0,
                y: 135,
                height: 26,
              })}
            </g>
          `,
        })}

        <!-- Pillar 4: Open Source & Transparent -->
        ${Card.render({
          x: 545,
          y: 245,
          width: 515,
          height: 220,
          rx: radii.lg,
          children: `
            <g transform="translate(24, 24)">
              <rect width="44" height="44" rx="${radii.md}" fill="${colors.primaryMuted}" />
              ${Icon.render({
                name: "code2",
                size: 22,
                color: colors.primary,
                x: 11,
                y: 11,
              })}
              
              <text x="60" y="20" fill="${colors.foreground}" font-family="${font}" font-size="16" font-weight="700">Open Source &amp; Auditable</text>
              <text x="60" y="38" fill="${colors.mutedForeground}" font-family="${font}" font-size="12">Publicly available on GitHub</text>

              <text x="0" y="80" fill="${colors.mutedForeground}" font-family="${font}" font-size="12.5" font-weight="400">
                Every line of source code is public and auditable. Built with TypeScript and shadcn/ui adhering strictly to Chrome Web Store Single-Purpose guidelines.
              </text>

              ${Badge.render({
                label: "VERIFIED OPEN SOURCE",
                variant: "default",
                icon: { name: "code2", size: 10, color: colors.primaryForeground },
                x: 0,
                y: 135,
                height: 26,
              })}
            </g>
          `,
        })}
      </g>
    `;

    return this.renderCanvas(target, content);
  }
}
