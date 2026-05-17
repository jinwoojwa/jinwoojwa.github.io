import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        summary: z.string(),
        date: z.string(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
});
