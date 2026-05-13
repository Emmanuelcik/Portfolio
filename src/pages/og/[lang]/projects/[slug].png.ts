import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { renderProjectOG } from '~/lib/og';
import { ui, type Lang } from '~/i18n/ui';

const LOCALES: Lang[] = ['en', 'es'];

export async function getStaticPaths() {
  const entries = await getCollection('projects');
  return LOCALES.flatMap((lang) =>
    entries.map((entry) => ({
      params: { lang, slug: entry.id.replace(/^\d+-/, '') },
      props: { entry, lang },
    })),
  );
}

interface RouteProps {
  entry: CollectionEntry<'projects'>;
  lang: Lang;
}

export const GET: APIRoute = async ({ props }) => {
  const { entry, lang } = props as unknown as RouteProps;
  const { title, summary, featured } = entry.data;

  const png = await renderProjectOG({
    title,
    summary: summary[lang],
    featured,
    featuredLabel: ui[lang]['projects.featured'],
  });

  return new Response(png as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
