import { themeTokens } from "../theme/tokens";

export interface CardOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  fill?: string;
  borderColor?: string;
  borderWidth?: number;
  children?: string;
}

export class Card {
  public static render(options: CardOptions): string {
    const {
      x,
      y,
      width,
      height,
      rx = themeTokens.radii.lg,
      fill = themeTokens.colors.card,
      borderColor = themeTokens.colors.cardBorder,
      borderWidth = 1,
      children = "",
    } = options;

    return `
      <g transform="translate(${x}, ${y})">
        <rect width="${width}" height="${height}" rx="${rx}" fill="${fill}" stroke="${borderColor}" stroke-width="${borderWidth}" />
        ${children}
      </g>
    `;
  }
}
