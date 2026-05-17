export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  site: {
    url: 'https://jinwoojwa.github.io',
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/fonts',
  ],

  components: [
    {
      path: '~/components/content',
      global: true,
      pathPrefix: false,
    },
    '~/components',
  ],

  fonts: {
    families: [
      { name: 'JetBrains Mono', provider: 'google', weight: [400, 700] },
      { name: 'Nanum Gothic Coding', provider: 'google', weight: [400, 700] },
    ],
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',

          preload: [
            'javascript',
            'typescript',
            'vue',
            'css',
            'html',
            'python',
            'json',
            'java',
            'yaml',
          ],
        },
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {},
        },
      },
    },
  },
});
