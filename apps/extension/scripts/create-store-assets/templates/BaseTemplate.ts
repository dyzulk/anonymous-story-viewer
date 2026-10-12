import type { AssetTarget } from "../config";
import type { IAssetTemplate } from "./IAssetTemplate";
import { themeTokens } from "../theme/tokens";
import { Badge } from "../components/Badge";

export abstract class BaseTemplate implements IAssetTemplate {
  public abstract render(target: AssetTarget): string;

  protected renderCanvas(
    target: AssetTarget,
    content: string,
    showGrid: boolean = true
  ): string {
    const { width, height } = target;
    const { colors } = themeTokens;

    const gridPattern = showGrid
      ? `
      <defs>
        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1" />
        </pattern>
        <linearGradient id="canvasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors.background}" />
          <stop offset="100%" stop-color="${colors.backgroundSubtle}" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#canvasGradient)" />
      <rect width="${width}" height="${height}" fill="url(#gridPattern)" />
    `
      : `
      <rect width="${width}" height="${height}" fill="${colors.background}" />
    `;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        ${gridPattern}
        ${content}
      </svg>
    `;
  }

  protected renderHeader(
    x: number,
    y: number,
    badgeLabel: string,
    badgeIconName: string,
    title: string,
    subtitle: string
  ): string {
    const font = themeTokens.typography.fontFamily;
    const colors = themeTokens.colors;

    const badgeSvg = Badge.render({
      label: badgeLabel,
      variant: "outline",
      icon: { name: badgeIconName, size: 12, color: colors.primary },
      x: 0,
      y: 0,
      height: 28,
      fontSize: 10.5,
      paddingX: 12,
    });

    const escapedTitle = BaseTemplate.escapeXml(title);
    const escapedSubtitle = BaseTemplate.escapeXml(subtitle);

    return `
      <g transform="translate(${x}, ${y})">
        <!-- Category Badge -->
        ${badgeSvg}

        <!-- Main Title -->
        <text x="0" y="64" fill="${colors.foreground}" font-family="${font}" font-size="38" font-weight="800" letter-spacing="-0.8">
          ${escapedTitle}
        </text>

        <!-- Subtitle -->
        <text x="0" y="98" fill="${colors.mutedForeground}" font-family="${font}" font-size="17" font-weight="400">
          ${escapedSubtitle}
        </text>
      </g>
    `;
  }

  public static escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }
}
