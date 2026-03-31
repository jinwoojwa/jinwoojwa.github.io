// utils/markdown.js
import MarkdownIt from 'markdown-it';
import katex from '@traptitech/markdown-it-katex';
import hljs from 'highlight.js';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        );
      } catch (__) {}
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  },
});

md.use(katex, {
  strict: false,
  throwOnError: false,
  output: 'html',
});

export const renderMarkdown = (content) => {
  return md.render(content);
};
