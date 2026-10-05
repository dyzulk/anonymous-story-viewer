import { themeTokens } from "../theme/tokens";

export interface SwitchOptions {
  checked: boolean;
  disabled?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export class Switch {
  public static render(options: SwitchOptions): string {
    const {
      checked,
      disabled = false,
      x = 0,
      y = 0,
      width = 44,
      height = 24,
    } = options;

    const rx = height / 2;
    const thumbRadius = (height - 6) / 2;
    const thumbX = checked ? width - thumbRadius - 3 : thumbRadius + 3;
    const thumbY = height / 2;

    const trackColor = disabled
      ? themeTokens.colors.muted
      : checked
      ? themeTokens.colors.primary
      : themeTokens.colors.secondary;

    const thumbColor = disabled
      ? themeTokens.colors.mutedForeground
      : themeTokens.colors.primaryForeground;

    return `
      <g transform="translate(${x}, ${y})">
        <rect width="${width}" height="${height}" rx="${rx}" fill="${trackColor}" stroke="${themeTokens.colors.cardBorder}" stroke-width="1" />
        <circle cx="${thumbX}" cy="${thumbY}" r="${thumbRadius}" fill="${thumbColor}" />
      </g>
    `;
  }
}
