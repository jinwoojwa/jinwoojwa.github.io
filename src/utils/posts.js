const modules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const posts = Object.entries(modules)
  .map(([path, rawContent]) => {
    if (!rawContent) {
      console.warn(`파일 로드 실패: ${path}`);
      return null;
    }

    const contentStr =
      typeof rawContent === 'string' ? rawContent : rawContent.default;

    if (!contentStr) {
      console.error(`문자열 데이터를 찾을 수 없음: ${path}`, rawContent);
      return null;
    }

    // frontmatter 추출 로직
    const match = contentStr.match(/---([\s\S]*?)---/);
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

    const markdown = contentStr.replace(/---([\s\S]*?)---/, '').trim();
    const slug = path.split('/').pop().replace('.md', '');

    return {
      ...data,
      slug,
      content: markdown,
    };
  })
  .filter((post) => post !== null);
