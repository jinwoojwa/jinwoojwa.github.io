// scripts/sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDirectory = path.resolve(process.cwd(), 'src/posts');
const distDirectory = path.resolve(process.cwd(), 'dist');

console.log('🔍 Looking for posts in:', postsDirectory);

// 1. 포스트 슬러그 수집
const getPostSlugs = () => {
  try {
    const files = fs.readdirSync(postsDirectory);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => `/post/${file.replace(/\.md$/, '')}`);
  } catch (e) {
    console.warn('⚠️ 포스트 폴더를 찾을 수 없습니다.');
    return [];
  }
};

const hostname = 'https://jinwoojwa.github.io';
const routes = ['/', ...getPostSlugs()];

// 2. XML 생성
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
    <url>
      <loc>${hostname}${route}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    </url>`,
    )
    .join('')}
</urlset>`;

// 3. dist 폴더가 있는지 확인 후 파일 쓰기
if (!fs.existsSync(distDirectory)) {
  fs.mkdirSync(distDirectory, { recursive: true });
}

fs.writeFileSync(path.join(distDirectory, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml이 성공적으로 생성되었습니다!');
