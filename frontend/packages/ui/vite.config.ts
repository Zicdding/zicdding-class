import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  base: '/zicdding-ui-storybook',
  plugins: [viteSingleFile()],
  resolve: {
    alias: [
      { find: '@ui', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
});
