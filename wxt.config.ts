import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import packageJson from './package.json';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
  }),
  manifest: ({ browser }) => ({
    name: 'Anonymous Story Viewer',
    short_name: 'AnonStory',
    description: 'View Instagram and Facebook stories anonymously.',
    version: packageJson.version,
    permissions: ['storage'],
    host_permissions: [
      '*://*.instagram.com/*',
      '*://*.facebook.com/*',
    ],
    ...(browser === 'firefox' && {
      browser_specific_settings: {
        gecko: {
          id: 'anonymous-story-viewer@dyzulk.com',
          strict_min_version: '109.0',
          data_collection_permissions: {
            required: ['none'],
          },
        },
      },
    }),
  }),
});
