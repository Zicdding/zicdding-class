import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/zicdding-ui-storybook',
  plugins: [],
  resolve: {
    alias: [
      { find: '@ui', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
});
