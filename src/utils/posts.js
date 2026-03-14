import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

// 1. highlight.js 플러그인 적용
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      // 입력된 언어(js, python 등)를 지원하는지 확인 후 하이라이팅 적용
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  }),
);

marked.setOptions({
  breaks: true, // 엔터 줄바꿈을 <br>로 변환
});

const modules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const posts = Object.entries(modules).map(([path, content]) => {
  // frontmatter 추출
  const match = content.match(/---([\s\S]*?)---/);
  const frontmatter = match ? match[1] : '';

  const data = {};

  frontmatter.split('\n').forEach((line) => {
    const [key, ...value] = line.split(':');
    if (!key) return;
    data[key.trim()] = value.join(':').trim();
  });

  // markdown 본문 추출
  const markdown = content.replace(/---([\s\S]*?)---/, '').trim();

  // Markdown → HTML 변환
  const html = marked(markdown);

  // slug 생성
  const slug = path.split('/').pop().replace('.md', '');

  return {
    ...data,
    slug,
    content: html,
  };
});
