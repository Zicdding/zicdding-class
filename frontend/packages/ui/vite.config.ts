import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  base: '/zicdding-ui-storybook',
  // NOTE: 너무 많은 파일을 업로드하면 github pages 가 특정 리소스를 404로 내려주는 이슈가 있어서 하나의 파일로 번들
  plugins: [viteSingleFile()],
  resolve: {
    alias: [
      { find: '@ui', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
});
