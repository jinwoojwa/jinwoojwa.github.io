import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.resolve(__dirname, 'src/posts');

const getPostSlugs = () => {
  try {
    // 폴더 내의 파일 목록을 읽어옵니다.
    const files = fs.readdirSync(postsDirectory);

    // 파일명에서 확장자를 제외하고 '/post/slug' 형태로 만듭니다.
    // 예: 'vue-blog-1.md' -> '/post/vue-blog-1'
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => `/#/post/${file.replace(/\.md$/, '')}`);
  } catch (e) {
    console.warn('⚠️ 포스트 폴더를 찾을 수 없어 빈 사이트맵을 생성합니다.');
    return [];
  }
};

const dynamicRoutes = getPostSlugs();

export default defineConfig({
  plugins: [
    vue(),
    sitemap({
      hostname: 'https://jinwoojwa.github.io',
      dynamicRoutes: dynamicRoutes,
    }),
  ],
});
