import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

const base = {
  title: z.string(),
  seoTitle: z.string().max(70),
  description: z.string().max(170),
  summary: z.string(),
  updated: z.coerce.date(),
  photo: z.string().optional(),
  // Tour groups (from src/data/tours.json) shown as cards on the page.
  tours: z.array(z.string()).default([]),
  widget: z.boolean().default(false),
  toursFirst: z.boolean().default(false),
  featured: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  faq,
};

const destSchema = z.object({
      ...base,
      name: z.string(),
      short: z.string(),
      lat: z.number(),
      lng: z.number(),
      timeNeeded: z.string(),
      // Matches the `places` field in tours.json.
      place: z.string(),
    });

// German pages live in src/content/de/, same file names (slugs) as the English ones.
export const collections = {
  guides: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/guides' }), schema: z.object(base) }),
  destinations: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/destinations' }), schema: destSchema }),
  guidesDe: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/de/guides' }), schema: z.object(base) }),
  destinationsDe: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/de/destinations' }), schema: destSchema }),
};
