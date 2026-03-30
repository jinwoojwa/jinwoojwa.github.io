// posts.js
// ✅ import { marked } ... 관련 코드 모두 삭제 (필요 없음)

const modules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const posts = Object.entries(modules).map(([path, content]) => {
  // frontmatter 추출 로직 (기존과 동일)
  const match = content.match(/---([\s\S]*?)---/);
  const frontmatter = match ? match[1] : '';
  const data = {};

  frontmatter.split('\n').forEach((line) => {
    const [key, ...value] = line.split(':');
    if (!key) return;
    const val = value.join(':').trim();
    if (key.trim() === 'tags') {
      data[key.trim()] = val ? val.split(',').map((tag) => tag.trim()) : [];
    } else {
      data[key.trim()] = val;
    }
  });

  // ✅ 중요: HTML로 변환하지 않고, 순수 마크다운 본문만 추출해서 넘깁니다.
  const markdown = content.replace(/---([\s\S]*?)---/, '').trim();
  const slug = path.split('/').pop().replace('.md', '');

  return {
    ...data,
    slug,
    content: markdown, // 👈 여기가 html이 아니라 markdown 원문이어야 함!
  };
});
