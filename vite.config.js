import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { generateMenu, DOCS_DIR } from './scripts/generate-menu.mjs';

// public/docs 아래 .md 파일 목록을 기반으로 menu.json을 자동 생성/갱신하는 플러그인
function menuGeneratorPlugin() {
  const regenerate = (file) => {
    if (file.startsWith(DOCS_DIR)) generateMenu();
  };

  return {
    name: 'menu-generator',
    buildStart() {
      generateMenu();
    },
    configureServer(server) {
      server.watcher.on('add', regenerate);
      server.watcher.on('unlink', regenerate);
      server.watcher.on('addDir', regenerate);
      server.watcher.on('unlinkDir', regenerate);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), menuGeneratorPlugin()],
  base: '/',
});
