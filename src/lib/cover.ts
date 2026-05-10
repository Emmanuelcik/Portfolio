/**
 * Generated project cover helpers. When a project doesn't ship a real
 * screenshot, we render a deterministic gradient + initials fallback so
 * every card has visual weight without bloating the bundle with stock art.
 *
 * The seed (project title) maps to one of N on-brand palettes so colors
 * are consistent across rebuilds and varied enough across projects.
 */

type Palette = readonly [from: string, to: string];

const PALETTES: readonly Palette[] = [
  ['var(--color-primary)', 'var(--color-accent)'],
  ['var(--color-primary-strong)', 'var(--color-primary-soft)'],
  ['var(--color-accent)', 'var(--color-highlight)'],
  ['var(--color-primary)', 'var(--color-highlight)'],
  ['var(--color-primary-soft)', 'var(--color-accent-soft)'],
];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function pickPalette(seed: string): Palette {
  return PALETTES[hash(seed) % PALETTES.length];
}

export function getInitials(title: string): string {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
