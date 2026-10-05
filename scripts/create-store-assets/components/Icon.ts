import { lucideIconPaths } from "../icons/lucide";
import { simpleIconPaths } from "../icons/simple-icons";
import { themeTokens } from "../theme/tokens";

export interface IconOptions {
  name: string;
  type?: "lucide" | "simple";
  size?: number;
  color?: string;
  strokeWidth?: number;
  x?: number;
  y?: number;
  className?: string;
}

export class Icon {
  public static render(options: IconOptions): string {
    const {
      name,
      type = "lucide",
      size = 20,
      color = themeTokens.colors.foreground,
      strokeWidth = 2,
      x = 0,
      y = 0,
    } = options;

    if (type === "simple") {
      const pathData = simpleIconPaths[name];
      if (!pathData) {
        console.warn(`[Icon] Simple Icon not found: ${name}`);
        return "";
      }
      return `
        <g transform="translate(${x}, ${y}) scale(${size / 24})">
          <g fill="${color}">
            ${pathData}
          </g>
        </g>
      `;
    }

    const pathData = lucideIconPaths[name];
    if (!pathData) {
      console.warn(`[Icon] Lucide Icon not found: ${name}`);
      return "";
    }

    return `
      <g transform="translate(${x}, ${y}) scale(${size / 24})">
        <g fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
          ${pathData}
        </g>
      </g>
    `;
  }
}
