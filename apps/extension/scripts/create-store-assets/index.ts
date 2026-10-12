import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { STORE_ASSETS_CONFIG, type AssetTarget } from "./config";
import { TemplateFactory } from "./templates/TemplateFactory";

export class StoreAssetGenerator {
  public static async generateAll(): Promise<void> {
    console.log("🎨 Starting Modular Store Asset Generator (OOP & shadcn design)...");
    console.log(`📁 Output Directory: ${STORE_ASSETS_CONFIG.outputDir}\n`);

    // Ensure output directory exists
    await fs.mkdir(STORE_ASSETS_CONFIG.outputDir, { recursive: true });

    let successCount = 0;
    let errorCount = 0;

    for (const target of STORE_ASSETS_CONFIG.assets) {
      console.log(
        `⏳ Generating [${target.category.toUpperCase()}] ${target.name} (${target.width}x${target.height})...`
      );

      try {
        const template = TemplateFactory.getTemplate(target.id);
        const svgContent = template.render(target);
        const svgBuffer = Buffer.from(svgContent, "utf-8");

        const pngBuffer = await sharp(svgBuffer, { density: 150 })
          .resize(target.width, target.height, {
            fit: "fill",
          })
          .png({
            compressionLevel: 9,
            quality: 100,
          })
          .toBuffer();

        await fs.writeFile(target.outPath, pngBuffer);
        console.log(
          `   └─ ✅ Created: ${path.relative(process.cwd(), target.outPath)}`
        );
        successCount++;
      } catch (err) {
        console.error(`   └─ ❌ Error generating ${target.name}:`, err);
        errorCount++;
      }
    }

    console.log(
      `\n🎉 Asset generation finished: ${successCount} succeeded, ${errorCount} failed.`
    );
  }
}

StoreAssetGenerator.generateAll().catch((err) => {
  console.error("Fatal error during store asset generation:", err);
  process.exit(1);
});
