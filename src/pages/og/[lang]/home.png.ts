import type { APIRoute } from 'astro';
import { renderHomeOG } from '~/lib/og';
import { ui, type Lang } from '~/i18n/ui';
import { SITE_OWNER } from '~/data/socials';

const LOCALES: Lang[] = ['en', 'es'];

export async function getStaticPaths() {
  return LOCALES.map((lang) => ({
    params: { lang },
    props: { lang },
  }));
}

interface RouteProps {
  lang: Lang;
}

export const GET: APIRoute = async ({ props, site }) => {
  const { lang } = props as unknown as RouteProps;
  const host = site ? new URL(site).host : 'emmanuelcik.dev';

  const png = await renderHomeOG({
    name: SITE_OWNER.shortName,
    tagline: ui[lang]['hero.tagline'],
    site: host,
    badgeLabel: SITE_OWNER.jobTitle,
  });

  return new Response(png as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
