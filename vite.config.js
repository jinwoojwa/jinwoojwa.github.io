import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { posts } from './src/utils/posts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    sitemap({
      hostname: 'https://jinwoojwa.github.io',
      // 동적으로 생성되는 포스트 주소들이 있다면 여기에 추가하거나
      // 빌드 시 스크립트를 통해 주입할 수 있습니다.
      dynamicRoutes: posts.map((p) => `/post/${p.slug}`),
    }),
  ],
});
