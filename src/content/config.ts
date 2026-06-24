import { defineCollection, z } from 'astro:content';

const aktualnosci = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { aktualnosci };
