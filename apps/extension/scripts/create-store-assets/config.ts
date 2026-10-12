import path from "path";

export interface AssetTarget {
  id: string;
  name: string;
  width: number;
  height: number;
  outPath: string;
  title: string;
  subtitle: string;
  category: "screenshot" | "promo";
}

const ROOT_DIR = process.cwd();
const STORE_ASSETS_DIR = path.join(ROOT_DIR, "assets", "store-assets");

export const STORE_ASSETS_CONFIG: {
  outputDir: string;
  assets: AssetTarget[];
} = {
  outputDir: STORE_ASSETS_DIR,
  assets: [
    {
      id: "screenshot-1-hero",
      name: "screenshot-1-hero.png",
      width: 1280,
      height: 800,
      outPath: path.join(STORE_ASSETS_DIR, "screenshot-1-hero.png"),
      title: "View Stories 100% Anonymously",
      subtitle: "Watch Instagram & Facebook stories secretly without sending seen receipts or leaving any trace.",
      category: "screenshot",
    },
    {
      id: "screenshot-2-stealth",
      name: "screenshot-2-stealth.png",
      width: 1280,
      height: 800,
      outPath: path.join(STORE_ASSETS_DIR, "screenshot-2-stealth.png"),
      title: "Zero Traces, Full Stealth Mode",
      subtitle: "Automatic real-time interceptor stops story view confirmation requests from reaching servers.",
      category: "screenshot",
    },
    {
      id: "screenshot-3-popup-ui",
      name: "screenshot-3-popup-ui.png",
      width: 1280,
      height: 800,
      outPath: path.join(STORE_ASSETS_DIR, "screenshot-3-popup-ui.png"),
      title: "Clean, Modern & Intuitive Popup",
      subtitle: "One-click master switch, individual platform toggles, and seamless dark / light theme support.",
      category: "screenshot",
    },
    {
      id: "screenshot-4-multiplatform",
      name: "screenshot-4-multiplatform.png",
      width: 1280,
      height: 800,
      outPath: path.join(STORE_ASSETS_DIR, "screenshot-4-multiplatform.png"),
      title: "Full Instagram & Facebook Support",
      subtitle: "Unified privacy shield that works seamlessly across all your favorite web stories.",
      category: "screenshot",
    },
    {
      id: "screenshot-5-privacy",
      name: "screenshot-5-privacy.png",
      width: 1280,
      height: 800,
      outPath: path.join(STORE_ASSETS_DIR, "screenshot-5-privacy.png"),
      title: "Privacy First & Zero Data Collection",
      subtitle: "No login or password needed. 100% client-side, open-source, and strictly respects your privacy.",
      category: "screenshot",
    },
    {
      id: "promo-tile-small",
      name: "promo-tile-small-440x280.png",
      width: 440,
      height: 280,
      outPath: path.join(STORE_ASSETS_DIR, "promo-tile-small-440x280.png"),
      title: "Anonymous Story Viewer",
      subtitle: "Watch IG & FB Stories Secretly",
      category: "promo",
    },
    {
      id: "promo-marquee",
      name: "promo-marquee-1400x560.png",
      width: 1400,
      height: 560,
      outPath: path.join(STORE_ASSETS_DIR, "promo-marquee-1400x560.png"),
      title: "Anonymous Story Viewer",
      subtitle: "Browse Instagram & Facebook Stories privately without leaving a single trace.",
      category: "promo",
    },
  ],
};
