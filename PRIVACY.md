# Privacy Policy for Anonymous Story Viewer

**Last Updated:** October 5, 2026

**Anonymous Story Viewer** ("we", "our", or "the extension") is an open-source browser extension designed to protect your privacy when browsing stories on Instagram and Facebook. We believe privacy is a fundamental right. This Privacy Policy explains our strict zero-data collection practices.

---

## 1. Zero Data Collection

- **No Personal Information Collected:** We do not collect, store, transmit, or monitor your name, email address, IP address, device information, social media account credentials, or passwords.
- **No Browsing History Collected:** We do not log, track, or record the profiles, stories, videos, or photos you view.
- **No Analytics or Telemetry:** We do not use Google Analytics, telemetry trackers, advertising pixels, or third-party tracking scripts.
- **No Remote Servers:** The extension does not communicate with any external backend servers owned or operated by us.

---

## 2. How the Extension Works Locally

All extension operations execute 100% locally on your computer inside your browser runtime (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Opera, and other compatible browsers):

1. **Storage Permission (`chrome.storage.local` / `browser.storage.local`):** Used exclusively on your local device to save your UI preferences (e.g., Master Blocker toggle state, Instagram toggle state, Facebook toggle state, and Theme mode). This data never leaves your browser.
2. **Host Permissions (`instagram.com`, `facebook.com`):** Used strictly to inject a local script on web story pages that intercepts and suppresses outgoing "seen" receipt network mutations (such as `PolarisStoriesV3SeenMutation` on Instagram and GraphQL mutations on Facebook).
3. **No Network Modifications to Other Sites:** The extension never intercepts, inspects, or alters traffic to any other domain.

---

## 3. Third-Party Services and Platforms

When you view stories on Instagram or Facebook, you interact directly with Meta Platforms, Inc. under their respective Terms of Service and Privacy Policies. Anonymous Story Viewer operates as a client-side filter that prevents your browser from transmitting "story seen" signals to Meta.

---

## 4. Multi-Store & Single-Purpose Compliance

In accordance with the Developer Program Policies of the **Google Chrome Web Store**, **Microsoft Edge Add-ons**, and **Mozilla Firefox Add-ons (AMO)**:
- Anonymous Story Viewer has a single, clear purpose: **to allow users to view Instagram and Facebook stories anonymously by preventing seen receipts from being reported.**
- The extension does not collect, sell, or monetize user data under any circumstances.

---

## 5. Open Source and Transparency

The source code for Anonymous Story Viewer is public and open-source under the MIT License. Anyone can inspect, audit, or verify our code and compliance:

- **GitHub Repository:** [https://github.com/dyzulk/anonymous-story-viewer](https://github.com/dyzulk/anonymous-story-viewer)

---

## 6. Contact & Inquiries

If you have questions or concerns regarding this Privacy Policy, feel free to open an issue on our GitHub repository or contact the developer:

- **Developer:** DyzulkDev
- **GitHub Issues:** [https://github.com/dyzulk/anonymous-story-viewer/issues](https://github.com/dyzulk/anonymous-story-viewer/issues)
