/**
 * Chrome Web Store Publisher
 *
 * Uses the Chrome Web Store Publish API v1.1 via OAuth2.
 * Docs: https://developer.chrome.com/docs/webstore/using-api
 *
 * Required env vars:
 *   CHROME_EXTENSION_ID, CHROME_CLIENT_ID, CHROME_CLIENT_SECRET, CHROME_REFRESH_TOKEN
 */

import fs from 'node:fs';
import { BaseStorePublisher, type PublisherConfig, type PublishResult } from './base-publisher.ts';

interface ChromeCredentials {
  extensionId: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export class ChromeStorePublisher extends BaseStorePublisher {
  private credentials!: ChromeCredentials;

  constructor(config: PublisherConfig) {
    super(config);
  }

  get storeName(): string {
    return 'Chrome Web Store';
  }

  validateCredentials(): void {
    this.credentials = {
      extensionId: this.requireEnv('CHROME_EXTENSION_ID'),
      clientId: this.requireEnv('CHROME_CLIENT_ID'),
      clientSecret: this.requireEnv('CHROME_CLIENT_SECRET'),
      refreshToken: this.requireEnv('CHROME_REFRESH_TOKEN'),
    };
  }

  private async getAccessToken(): Promise<string> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.credentials.clientId,
        client_secret: this.credentials.clientSecret,
        refresh_token: this.credentials.refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to get access token: HTTP ${response.status} - ${errorBody}`);
    }

    const data = (await response.json()) as { access_token: string };
    return data.access_token;
  }

  async uploadPackage(): Promise<string> {
    const accessToken = await this.getAccessToken();
    const zipBuffer = fs.readFileSync(this.config.zipFilePath);

    const response = await fetch(
      `https://www.googleapis.com/upload/chromewebstore/v1.1/items/${this.credentials.extensionId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-goog-api-version': '2',
        },
        body: zipBuffer,
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Upload failed: HTTP ${response.status} - ${errorBody}`);
    }

    const data = (await response.json()) as { uploadState: string; id: string; itemError?: { error_detail: string }[] };

    if (data.uploadState === 'FAILURE') {
      const errors = data.itemError?.map((e) => e.error_detail).join(', ') || 'Unknown error';
      throw new Error(`Upload rejected by Chrome Web Store: ${errors}`);
    }

    this.log(`Upload state: ${data.uploadState}`);
    return accessToken; // Pass token to publish step
  }

  async publish(accessToken: string): Promise<PublishResult> {
    const response = await fetch(
      `https://www.googleapis.com/chromewebstore/v1.1/items/${this.credentials.extensionId}/publish`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-goog-api-version': '2',
          'Content-Length': '0',
        },
      }
    );

    const data = (await response.json()) as { status: string[]; statusDetail: string[] };

    const status = data.status?.[0] || 'UNKNOWN';
    const detail = data.statusDetail?.[0] || '';
    const success = status === 'OK' || status === 'PUBLISHED_WITH_FRICTION_WARNING';

    return {
      storeName: this.storeName,
      success,
      version: this.config.version,
      message: `${status}: ${detail}`,
      itemUrl: `https://chromewebstore.google.com/detail/${this.credentials.extensionId}`,
    };
  }
}
