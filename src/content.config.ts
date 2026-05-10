/**
 * Content Collections  type-safe content via Zod.
 * Bilingual fields are stored as { en, es } so a single Markdown file
 * powers both locales. The body of the Markdown is treated as default-locale
 * content; long-form bilingual bodies can be split across `*.en.md` / `*.es.md`
 * if/when needed.
 */

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const i18nString = z.object({ en: z.string(), es: z.string() });
const i18nStringArray = z.object({
  en: z.array(z.string()),
  es: z.array(z.string()),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: i18nString,
      bullets: i18nStringArray.optional(),
      tech: z.array(z.string()),
      github: z.url().optional(),
      demo: z.url().optional(),
      cover: image().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      publishedAt: z.coerce.date(),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: i18nString,
    location: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    current: z.boolean().default(false),
    bullets: i18nStringArray,
    tech: z.array(z.string()).default([]),
    url: z.url().optional(),
    order: z.number().default(0),
  }),
});

const awards = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/awards' }),
  schema: z.object({
    name: i18nString,
    issuer: z.string(),
    date: z.coerce.date(),
    position: z.string().optional(),
    type: z
      .enum(['International', 'National', 'Regional', 'Local'])
      .default('Local'),
    url: z.url().optional(),
  }),
});

export const collections = { projects, experience, awards };
