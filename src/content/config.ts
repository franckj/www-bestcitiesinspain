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
    image: z.string().optional(),
    highlights: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    order: z.number(),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datePublished: z.string(),
    dateModified: z.string(),
    author: z.string().default('Franck'),
  }),
});

export const collections = { cities, guides };
