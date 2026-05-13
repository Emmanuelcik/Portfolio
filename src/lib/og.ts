/**
 * Open Graph image renderer. Builds a satori element tree for a project
 * detail card and rasterizes it via resvg at build time. Used by the
 * `og/[lang]/projects/[slug].png.ts` endpoint.
 *
 * The output is a 1200x630 PNG (Twitter summary_large_image / OG default).
 * Typography uses Inter via the @fontsource/inter package (WOFF, since
 * satori does not support WOFF2). Loaded from node_modules at build time.
 */

import fs from 'node:fs';
import path from 'node:path';
import satori, { type SatoriOptions } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { pickPaletteHex, getInitials } from '~/lib/cover';
import { SITE_OWNER } from '~/data/socials';

const FONT_DIR = path.join(
  process.cwd(),
  'node_modules/@fontsource/inter/files',
);
const fontRegular = fs.readFileSync(
  path.join(FONT_DIR, 'inter-latin-400-normal.woff'),
);
const fontBold = fs.readFileSync(
  path.join(FONT_DIR, 'inter-latin-700-normal.woff'),
);

const fonts: SatoriOptions['fonts'] = [
  { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
  { name: 'Inter', data: fontBold, weight: 700, style: 'normal' },
];

export interface ProjectOGOptions {
  title: string;
  summary: string;
  featured?: boolean;
  featuredLabel?: string;
}

export async function renderProjectOG(
  opts: ProjectOGOptions,
): Promise<Uint8Array> {
  const { title, summary, featured = false, featuredLabel = 'Featured' } = opts;
  const [from, to] = pickPaletteHex(title);
  const initials = getInitials(title);

  const tree = {
    type: 'div',
    key: null,
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '72px 80px',
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        color: '#FFFFFF',
        fontFamily: 'Inter',
        position: 'relative',
      },
      children: [
        // Top row: initials mark + featured badge
        {
          type: 'div',
          key: 'top',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            },
            children: [
              {
                type: 'div',
                key: 'mark',
                props: {
                  style: {
                    fontSize: 42,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'rgba(255, 255, 255, 0.85)',
                  },
                  children: initials,
                },
              },
              featured
                ? {
                    type: 'div',
                    key: 'badge',
                    props: {
                      style: {
                        display: 'flex',
                        fontSize: 18,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        padding: '8px 18px',
                        borderRadius: 999,
                        backgroundColor: 'rgba(0, 0, 0, 0.32)',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                      },
                      children: featuredLabel,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        // Main: title + divider + summary
        {
          type: 'div',
          key: 'main',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              maxWidth: '90%',
            },
            children: [
              {
                type: 'div',
                key: 'title',
                props: {
                  style: {
                    fontSize: 84,
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.025em',
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                key: 'divider',
                props: {
                  style: {
                    width: 96,
                    height: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.55)',
                    borderRadius: 2,
                  },
                  children: '',
                },
              },
              {
                type: 'div',
                key: 'summary',
                props: {
                  style: {
                    fontSize: 30,
                    lineHeight: 1.3,
                    color: 'rgba(255, 255, 255, 0.92)',
                    fontWeight: 400,
                  },
                  children: summary,
                },
              },
            ],
          },
        },
        // Footer: author / site
        {
          type: 'div',
          key: 'footer',
          props: {
            style: {
              display: 'flex',
              fontSize: 22,
              color: 'rgba(255, 255, 255, 0.78)',
              fontWeight: 400,
              letterSpacing: '0.02em',
            },
            children: `${SITE_OWNER.shortName} · ${SITE_OWNER.githubUsername}`,
          },
        },
      ],
    },
  };

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts,
  });

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
    .render()
    .asPng();
  return png;
}
