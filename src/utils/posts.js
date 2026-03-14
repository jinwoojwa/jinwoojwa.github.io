const modules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const posts = Object.entries(modules).map(([path, content]) => {
  const match = content.match(/---([\s\S]*?)---/);
  const frontmatter = match ? match[1] : '';

  const data = {};

  frontmatter.split('\n').forEach((line) => {
    const [key, ...value] = line.split(':');
    if (!key) return;
    data[key.trim()] = value.join(':').trim();
  });

  const markdown = content.replace(/---([\s\S]*?)---/, '');

  const slug = path.split('/').pop().replace('.md', '');

  return {
    ...data,
    content: markdown,
  };
});
