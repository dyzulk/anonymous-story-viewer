import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Anonymous Story Viewer',
    short_name: 'AnonStory',
    description: 'View Instagram and Facebook stories anonymously.',
    version: '1.0.0',
    permissions: ['storage'],
    host_permissions: [
      '*://*.instagram.com/*',
      '*://*.facebook.com/*',
    ],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
