import MarkdownIt from 'markdown-it';
import texmath from 'markdown-it-texmath';
import katex from 'katex';
import hljs from 'highlight.js';

import 'katex/dist/katex.min.css';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

md.use(texmath, {
  engine: katex,
  delimiters: 'dollars',
  katexOptions: {
    macros: { '\\RR': '\\mathbb{R}' },
    strict: false,
  },
});

export const renderMarkdown = (content) => {
  if (!content) return '';

  const sanitized = content.replace(/\t/g, '\\t');

  return md.render(sanitized);
};
