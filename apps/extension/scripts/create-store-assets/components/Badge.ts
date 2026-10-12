import { themeTokens } from "../theme/tokens";
import { Icon, type IconOptions } from "./Icon";

export interface BadgeOptions {
  label: string;
  variant?: "default" | "secondary" | "outline" | "destructive" | "success";
  icon?: IconOptions;
  x?: number;
  y?: number;
  height?: number;
  paddingX?: number;
  fontSize?: number;
}

export class Badge {
  public static render(options: BadgeOptions): string {
    const {
      label,
      variant = "default",
      icon,
      x = 0,
      y = 0,
      height = 24,
      paddingX = 10,
      fontSize = 11,
    } = options;

    let bgColor: string = themeTokens.colors.primary;
    let textColor: string = themeTokens.colors.primaryForeground;
    let borderColor: string = "transparent";

    switch (variant) {
      case "secondary":
        bgColor = themeTokens.colors.secondary;
        textColor = themeTokens.colors.secondaryForeground;
        break;
      case "outline":
        bgColor = "transparent";
        textColor = themeTokens.colors.foreground;
        borderColor = themeTokens.colors.cardBorder;
        break;
      case "destructive":
        bgColor = themeTokens.colors.destructiveMuted;
        textColor = themeTokens.colors.destructive;
        borderColor = themeTokens.colors.destructiveBorder;
        break;
      case "success":
        bgColor = themeTokens.colors.successMuted;
        textColor = themeTokens.colors.success;
        borderColor = themeTokens.colors.successBorder;
        break;
      case "default":
      default:
        bgColor = themeTokens.colors.primary;
        textColor = themeTokens.colors.primaryForeground;
        break;
    }

    const approxCharWidth = fontSize * 0.62;
    const iconWidth = icon ? (icon.size || 14) + 6 : 0;
    const textWidth = label.length * approxCharWidth;
    const badgeWidth = paddingX * 2 + iconWidth + textWidth;
    const rx = height / 2;

    const iconSvg = icon
      ? Icon.render({
          ...icon,
          size: icon.size || 13,
          color: icon.color || textColor,
          x: paddingX,
          y: (height - (icon.size || 13)) / 2,
        })
      : "";

    const textX = paddingX + iconWidth;
    const textY = height / 2 + fontSize / 3;

    const escapedLabel = label
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

    return `
      <g transform="translate(${x}, ${y})">
        <rect width="${badgeWidth}" height="${height}" rx="${rx}" fill="${bgColor}" stroke="${borderColor}" stroke-width="1" />
        ${iconSvg}
        <text x="${textX}" y="${textY}" fill="${textColor}" font-family="${themeTokens.typography.fontFamily}" font-size="${fontSize}" font-weight="600" letter-spacing="0.3">
          ${escapedLabel}
        </text>
      </g>
    `;
  }
}
