import type { AssetTarget } from "../config";

export interface IAssetTemplate {
  render(target: AssetTarget): string;
}
