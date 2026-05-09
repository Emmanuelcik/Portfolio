/**
 * UI string dictionary. Add keys here as we build sections.
 * Use `useTranslations(lang)` from ./utils.ts to consume.
 */

export const defaultLang = 'en' as const;
export const languages = { en: 'English', es: 'Español' } as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'site.title': 'Jesús Emmanuel López  Full-Stack Developer',
    'site.description':
      'Full-stack developer with 4 years of experience in JavaScript/TypeScript, React, Node.js and Python. I build reliable web platforms and developer tooling.',

    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.community': 'Community',
    'nav.contact': 'Contact',

    'cta.contact': 'Get in touch',
    'cta.cv': 'Download CV',
    'cta.viewSource': 'View on GitHub',

    'lang.switch': 'Español',
    'footer.rights': 'All rights reserved.',

    'a11y.skipToContent': 'Skip to content',
    'a11y.themeToggle': 'Toggle theme',

    '404.title': 'Page not found',
    '404.body': 'This page does not exist.',
    '404.cta': 'Back to home',
  },
  es: {
    'site.title': 'Jesús Emmanuel López  Desarrollador Full-Stack',
    'site.description':
      'Desarrollador full-stack con 4 años de experiencia en JavaScript/TypeScript, React, Node.js y Python. Construyo plataformas web confiables y herramientas para devs.',

    'nav.about': 'Acerca',
    'nav.skills': 'Stack',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.community': 'Comunidad',
    'nav.contact': 'Contacto',

    'cta.contact': 'Contáctame',
    'cta.cv': 'Descargar CV',
    'cta.viewSource': 'Ver en GitHub',

    'lang.switch': 'English',
    'footer.rights': 'Todos los derechos reservados.',

    'a11y.skipToContent': 'Saltar al contenido',
    'a11y.themeToggle': 'Cambiar tema',

    '404.title': 'Página no encontrada',
    '404.body': 'Esta página no existe.',
    '404.cta': 'Volver al inicio',
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
