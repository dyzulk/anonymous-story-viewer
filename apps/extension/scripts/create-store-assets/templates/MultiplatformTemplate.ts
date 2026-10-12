import type { AssetTarget } from "../config";
import { BaseTemplate } from "./BaseTemplate";
import { themeTokens } from "../theme/tokens";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { Badge } from "../components/Badge";

export class MultiplatformTemplate extends BaseTemplate {
  public render(target: AssetTarget): string {
    const { colors, typography, radii } = themeTokens;
    const font = typography.fontFamily;

    const content = `
      <!-- Header Area -->
      ${this.renderHeader(
        80,
        60,
        "PLATFORM COMPATIBILITY",
        "layers",
        target.title,
        target.subtitle
      )}

      <!-- Platform Cards Container -->
      <g transform="translate(80, 200)">
        <!-- Instagram Card -->
        ${Card.render({
          x: 0,
          y: 0,
          width: 535,
          height: 480,
          rx: radii.lg,
          children: `
            <!-- Top Card Header -->
            <path d="M 0 ${radii.lg} Q 0 0 ${radii.lg} 0 L ${535 - radii.lg} 0 Q 535 0 535 ${radii.lg} L 535 70 L 0 70 Z" fill="${colors.backgroundSubtle}" />
            <line x1="0" y1="70" x2="535" y2="70" stroke="${colors.cardBorder}" stroke-width="1" />
            
            <g transform="translate(24, 18)">
              <rect width="36" height="36" rx="${radii.md}" fill="${colors.instagramMuted}" />
              ${Icon.render({
                name: "instagram",
                type: "simple",
                size: 20,
                color: colors.instagram,
                x: 8,
                y: 8,
              })}
              <text x="48" y="17" fill="${colors.foreground}" font-family="${font}" font-size="16" font-weight="800">Instagram Stories</text>
              <text x="48" y="32" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">instagram.com/stories/*</text>
            </g>

            ${Badge.render({
              label: "VERIFIED",
              variant: "success",
              icon: { name: "check", size: 10, color: colors.success },
              x: 430,
              y: 23,
              height: 24,
            })}

            <!-- Features List -->
            <g transform="translate(24, 98)">
              <g transform="translate(0, 0)">
                <rect width="26" height="26" rx="${radii.sm}" fill="${colors.primaryMuted}" />
                ${Icon.render({
                  name: "check",
                  size: 14,
                  color: colors.primary,
                  x: 6,
                  y: 6,
                })}
                <text x="38" y="14" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">PolarisStoriesSeenMutation Interceptor</text>
                <text x="38" y="30" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Blocks automatic seen receipt mutations on web reels</text>
              </g>

              <g transform="translate(0, 68)">
                <rect width="26" height="26" rx="${radii.sm}" fill="${colors.primaryMuted}" />
                ${Icon.render({
                  name: "check",
                  size: 14,
                  color: colors.primary,
                  x: 6,
                  y: 6,
                })}
                <text x="38" y="14" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">Full Audio &amp; Video Playback</text>
                <text x="38" y="30" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">High-definition story streams with zero buffering delay</text>
              </g>

              <g transform="translate(0, 136)">
                <rect width="26" height="26" rx="${radii.sm}" fill="${colors.primaryMuted}" />
                ${Icon.render({
                  name: "check",
                  size: 14,
                  color: colors.primary,
                  x: 6,
                  y: 6,
                })}
                <text x="38" y="14" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">Highlights &amp; Close Friends Support</text>
                <text x="38" y="30" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Protected on feed stories, user profiles, and archive reels</text>
              </g>

              <g transform="translate(0, 204)">
                <rect width="26" height="26" rx="${radii.sm}" fill="${colors.primaryMuted}" />
                ${Icon.render({
                  name: "check",
                  size: 14,
                  color: colors.primary,
                  x: 6,
                  y: 6,
                })}
                <text x="38" y="14" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">Seamless Keyboard Navigation</text>
                <text x="38" y="30" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Supports arrow keys, spacebar pause, and story skipping</text>
              </g>
            </g>

            <!-- Bottom Status Row -->
            <g transform="translate(24, 400)">
              <rect width="487" height="46" rx="${radii.sm}" fill="${colors.backgroundSubtle}" stroke="${colors.cardBorder}" stroke-width="1" />
              <g transform="translate(16, 15)">
                ${Icon.render({
                  name: "shieldCheck",
                  size: 16,
                  color: colors.success,
                  x: 0,
                  y: 0,
                })}
                <text x="24" y="12" fill="${colors.foreground}" font-family="${font}" font-size="11.5" font-weight="600">Network Interceptor Active • Zero Leaks</text>
              </g>
            </g>
          `,
        })}

        <!-- Facebook Card -->
        ${Card.render({
          x: 585,
          y: 0,
          width: 535,
          height: 480,
          rx: radii.lg,
          children: `
            <!-- Top Card Header -->
            <path d="M 0 ${radii.lg} Q 0 0 ${radii.lg} 0 L ${535 - radii.lg} 0 Q 535 0 535 ${radii.lg} L 535 70 L 0 70 Z" fill="${colors.backgroundSubtle}" />
            <line x1="0" y1="70" x2="535" y2="70" stroke="${colors.cardBorder}" stroke-width="1" />
            
            <g transform="translate(24, 18)">
              <rect width="36" height="36" rx="${radii.md}" fill="${colors.facebookMuted}" />
              ${Icon.render({
                name: "facebook",
                type: "simple",
                size: 20,
                color: colors.facebook,
                x: 8,
                y: 8,
              })}
              <text x="48" y="17" fill="${colors.foreground}" font-family="${font}" font-size="16" font-weight="800">Facebook Stories</text>
              <text x="48" y="32" fill="${colors.mutedForeground}" font-family="${font}" font-size="11.5">facebook.com/stories/*</text>
            </g>

            ${Badge.render({
              label: "VERIFIED",
              variant: "success",
              icon: { name: "check", size: 10, color: colors.success },
              x: 430,
              y: 23,
              height: 24,
            })}

            <!-- Features List -->
            <g transform="translate(24, 98)">
              <g transform="translate(0, 0)">
                <rect width="26" height="26" rx="${radii.sm}" fill="${colors.infoMuted}" />
                ${Icon.render({
                  name: "check",
                  size: 14,
                  color: colors.info,
                  x: 6,
                  y: 6,
                })}
                <text x="38" y="14" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">GraphQL Seen Mutation Filter</text>
                <text x="38" y="30" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Blocks backend mutation payloads on story change</text>
              </g>

              <g transform="translate(0, 68)">
                <rect width="26" height="26" rx="${radii.sm}" fill="${colors.infoMuted}" />
                ${Icon.render({
                  name: "check",
                  size: 14,
                  color: colors.info,
                  x: 6,
                  y: 6,
                })}
                <text x="38" y="14" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">Multi-Story Queue Carousel</text>
                <text x="38" y="30" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Cycle through entire friend queues completely incognito</text>
              </g>

              <g transform="translate(0, 136)">
                <rect width="26" height="26" rx="${radii.sm}" fill="${colors.infoMuted}" />
                ${Icon.render({
                  name: "check",
                  size: 14,
                  color: colors.info,
                  x: 6,
                  y: 6,
                })}
                <text x="38" y="14" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">Messenger &amp; Feed Story Support</text>
                <text x="38" y="30" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Compatible with both desktop web interface variants</text>
              </g>

              <g transform="translate(0, 204)">
                <rect width="26" height="26" rx="${radii.sm}" fill="${colors.infoMuted}" />
                ${Icon.render({
                  name: "check",
                  size: 14,
                  color: colors.info,
                  x: 6,
                  y: 6,
                })}
                <text x="38" y="14" fill="${colors.foreground}" font-family="${font}" font-size="13.5" font-weight="600">Cross-Browser Engine</text>
                <text x="38" y="30" fill="${colors.mutedForeground}" font-family="${font}" font-size="11">Works seamlessly on Google Chrome, Edge, and Firefox</text>
              </g>
            </g>

            <!-- Bottom Status Row -->
            <g transform="translate(24, 400)">
              <rect width="487" height="46" rx="${radii.sm}" fill="${colors.backgroundSubtle}" stroke="${colors.cardBorder}" stroke-width="1" />
              <g transform="translate(16, 15)">
                ${Icon.render({
                  name: "shieldCheck",
                  size: 16,
                  color: colors.success,
                  x: 0,
                  y: 0,
                })}
                <text x="24" y="12" fill="${colors.foreground}" font-family="${font}" font-size="11.5" font-weight="600">Network Interceptor Active • Zero Leaks</text>
              </g>
            </g>
          `,
        })}
      </g>
    `;

    return this.renderCanvas(target, content);
  }
}
