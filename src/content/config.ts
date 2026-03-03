import { defineCollection, z } from 'astro:content';

const cities = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    region: z.string(),
    hook: z.string(),
    description: z.string(),
    population: z.string(),
    airport: z.string(),
    bestMonths: z.string(),
    avgTemp: z.string(),
    gradient: z.string(),
    highlights: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    order: z.number(),
  }),
});

export const collections = { cities };
