import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  author: z.string().default('Feliks Mamczur')
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: baseSchema.extend({
    readingTime: z.string().optional(),
    image: z.string().optional(),
    imageWidth: z.number().int().positive().optional(),
    imageHeight: z.number().int().positive().optional(),
    imageType: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    socialImage: z.string().optional(),
    socialImageWidth: z.number().int().positive().optional(),
    socialImageHeight: z.number().int().positive().optional(),
    socialImageType: z.string().optional(),
    doi: z.string().optional(),
    doiUrl: z.string().url().optional(),
    version: z.string().optional(),
    relatedDoi: z.string().optional(),
    relatedDoiUrl: z.string().url().optional(),
    relatedVersion: z.string().optional(),
    relatedDoiLabel: z.string().optional(),
    licenseName: z.string().optional(),
    licenseUrl: z.string().url().optional(),
    audioUrl: z.string().optional(),
    inBrief: z.array(z.string()).optional(),
    lang: z.enum(['en', 'pl']).default('en'),
    translationKey: z.string().optional()
  })
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: baseSchema.extend({
    context: z.string().optional(),
    lang: z.enum(['en', 'pl']).default('en'),
    translationKey: z.string().optional()
  })
});

const concepts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/concepts' }),
  schema: baseSchema.extend({
    area: z.string().optional(),
    lang: z.enum(['en', 'pl']).default('en'),
    translationKey: z.string().optional(),
    routeSlug: z.string().optional()
  })
});

const practice = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/practice' }),
  schema: baseSchema.extend({
    readingTime: z.string().optional(),
    lang: z.enum(['en', 'pl']).default('en'),
    translationKey: z.string(),
    type: z.literal('practice').default('practice'),
    category: z.string().default('Practice')
  })
});

export const collections = { articles, notes, concepts, practice };
