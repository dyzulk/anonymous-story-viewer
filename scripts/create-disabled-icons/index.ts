import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const ROOT_DIR = process.cwd();
const ICON_DIR = path.join(ROOT_DIR, "public", "icon");
const OUT_DIR = path.join(ROOT_DIR, "public", "icon-disabled");
const SIZES = [16, 32, 48, 64, 96, 128];

async function main() {
  console.log("🔇 Generating disabled (greyed-out) icons...");

  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const size of SIZES) {
    const inputPath = path.join(ICON_DIR, `${size}.png`);
    const outputPath = path.join(OUT_DIR, `${size}.png`);

    await sharp(inputPath)
      .greyscale()
      .modulate({ brightness: 1.1 })
      .linear(0.5, 80)
      .png({ compressionLevel: 9 })
      .toFile(outputPath);

    console.log(`  └─ Generated disabled icon: ${size}x${size}`);
  }

  console.log("\n✅ All disabled icons generated.");
}

main().catch((err) => {
  console.error("❌ Failed to generate disabled icons:", err);
  process.exit(1);
});
