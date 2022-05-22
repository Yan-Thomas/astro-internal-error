import { defineConfig } from 'astro/config';
import astroIntegration from './packages/index.js';

// https://astro.build/config
export default defineConfig({
  integrations: [astroIntegration()],
  experimental: {
    integrations: true,
  },
});
