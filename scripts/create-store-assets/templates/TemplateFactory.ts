import type { IAssetTemplate } from "./IAssetTemplate";
import { HeroTemplate } from "./HeroTemplate";
import { StealthTemplate } from "./StealthTemplate";
import { PopupUiTemplate } from "./PopupUiTemplate";
import { MultiplatformTemplate } from "./MultiplatformTemplate";
import { PrivacyTemplate } from "./PrivacyTemplate";
import { SmallPromoTemplate } from "./SmallPromoTemplate";
import { MarqueeTemplate } from "./MarqueeTemplate";

export class TemplateFactory {
  private static templates: Map<string, IAssetTemplate> = new Map([
    ["screenshot-1-hero", new HeroTemplate()],
    ["screenshot-2-stealth", new StealthTemplate()],
    ["screenshot-3-popup-ui", new PopupUiTemplate()],
    ["screenshot-4-multiplatform", new MultiplatformTemplate()],
    ["screenshot-5-privacy", new PrivacyTemplate()],
    ["promo-tile-small", new SmallPromoTemplate()],
    ["promo-marquee", new MarqueeTemplate()],
  ]);

  public static getTemplate(targetId: string): IAssetTemplate {
    const template = this.templates.get(targetId);
    if (!template) {
      throw new Error(`[TemplateFactory] No template registered for id: "${targetId}"`);
    }
    return template;
  }
}
