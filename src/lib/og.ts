/**
 * Open Graph image renderers. Builds Satori element trees and rasterizes
 * them via Resvg at build time. Two flavors:
 *
 *  - `renderHomeOG()`   for the landing page in each locale.
 *  - `renderProjectOG()` for each project detail page.
 *
 * Output: 1200x630 PNG (Twitter summary_large_image / OG default).
 * Typography: Inter Regular + Bold via @fontsource/inter (WOFF format;
 * Satori does not support WOFF2).
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

const WIDTH = 1200;
const HEIGHT = 630;

async function rasterize(tree: unknown): Promise<Uint8Array> {
  const svg = await satori(tree as never, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } })
    .render()
    .asPng();
}

function divider() {
  return {
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
  };
}

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
      },
      children: [
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
              divider(),
              {
                type: 'div',
                key: 'summary',
                props: {
                  style: {
                    fontSize: 30,
                    lineHeight: 1.3,
                    color: 'rgba(255, 255, 255, 0.92)',
                  },
                  children: summary,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          key: 'footer',
          props: {
            style: {
              display: 'flex',
              fontSize: 22,
              color: 'rgba(255, 255, 255, 0.78)',
              letterSpacing: '0.02em',
            },
            children: `${SITE_OWNER.shortName} · ${SITE_OWNER.githubUsername}`,
          },
        },
      ],
    },
  };

  return rasterize(tree);
}

export interface HomeOGOptions {
  name: string;
  tagline: string;
  site: string;
  badgeLabel: string;
}

export async function renderHomeOG(opts: HomeOGOptions): Promise<Uint8Array> {
  const { name, tagline, site, badgeLabel } = opts;
  const initials = getInitials(name);

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
        background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        color: '#FFFFFF',
        fontFamily: 'Inter',
      },
      children: [
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
                    display: 'flex',
                    fontSize: 42,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'rgba(255, 255, 255, 0.95)',
                  },
                  children: `${initials}.`,
                },
              },
              {
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
                  children: badgeLabel,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          key: 'main',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              maxWidth: '92%',
            },
            children: [
              {
                type: 'div',
                key: 'name',
                props: {
                  style: {
                    fontSize: 78,
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.025em',
                  },
                  children: name,
                },
              },
              divider(),
              {
                type: 'div',
                key: 'tagline',
                props: {
                  style: {
                    fontSize: 30,
                    lineHeight: 1.3,
                    color: 'rgba(255, 255, 255, 0.92)',
                  },
                  children: tagline,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          key: 'footer',
          props: {
            style: {
              display: 'flex',
              fontSize: 24,
              color: 'rgba(255, 255, 255, 0.85)',
              letterSpacing: '0.02em',
            },
            children: site,
          },
        },
      ],
    },
  };

  return rasterize(tree);
}
