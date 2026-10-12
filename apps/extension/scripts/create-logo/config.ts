import path from "path";

export interface PngTarget {
  name: string;
  size: number;
  outPath: string;
}

export interface LogoConfig {
  svgInputPath: string;
  publicDir: string;
  pngTargets: PngTarget[];
  icoOutputPath: string;
  icoSizes: number[];
}

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const ICON_DIR = path.join(PUBLIC_DIR, "icon");

export const LOGO_CONFIG: LogoConfig = {
  svgInputPath: path.join(PUBLIC_DIR, "logo.svg"),
  publicDir: PUBLIC_DIR,
  pngTargets: [
    { name: "16.png", size: 16, outPath: path.join(ICON_DIR, "16.png") },
    { name: "32.png", size: 32, outPath: path.join(ICON_DIR, "32.png") },
    { name: "48.png", size: 48, outPath: path.join(ICON_DIR, "48.png") },
    { name: "64.png", size: 64, outPath: path.join(ICON_DIR, "64.png") },
    { name: "96.png", size: 96, outPath: path.join(ICON_DIR, "96.png") },
    { name: "128.png", size: 128, outPath: path.join(ICON_DIR, "128.png") },
  ],
  icoOutputPath: path.join(PUBLIC_DIR, "favicon.ico"),
  icoSizes: [16, 32, 48],
};
