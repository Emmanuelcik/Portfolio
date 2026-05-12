/**
 * UI string dictionary. Add keys here as we build sections.
 * Use `useTranslations(lang)` from ./utils.ts to consume.
 */

export const defaultLang = "en" as const;
export const languages = { en: "English", es: "Español" } as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    "site.title": "Jesús Emmanuel López Full-Stack Developer",
    "site.description":
      "Full-stack developer with 4 years of experience in JavaScript/TypeScript, React, Node.js and Python. I build reliable web platforms and developer tooling.",

    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.awards": "Awards",
    "nav.community": "Community",
    "nav.contact": "Contact",

    "cta.contact": "Get in touch",
    "cta.cv": "Download CV",
    "cta.viewSource": "View on GitHub",

    "lang.switch": "Español",
    "footer.rights": "All rights reserved.",

    "a11y.skipToContent": "Skip to content",
    "a11y.themeToggle": "Toggle theme",

    "nav.menu": "Menu",
    "nav.close": "Close menu",
    "nav.primary": "Primary navigation",

    "hero.status": "Backend Developer at Vierge Group Mexico",
    "hero.greeting": "Hi, I'm",
    "hero.tagline":
      "Full-stack engineer with a backend tilt. I build reliable APIs, configurable platforms, and the occasional LLM integration.",
    "hero.intro":
      "4 years shipping production code in JavaScript, TypeScript, Python, and PHP. Currently focused on backend systems for retail point of sale.",

    "skills.title": "Tech Stack",
    "skills.intro":
      "The tools I reach for to ship reliable, maintainable software. Pragmatic over trendy.",
    "skills.group.languages": "Languages",
    "skills.group.frontend": "Frontend",
    "skills.group.backend": "Backend",
    "skills.group.data": "Data",
    "skills.group.tools": "Cloud and Tools",

    "experience.title": "Experience",
    "experience.intro":
      "Where I have shipped real products to real users. Most recent first.",
    "experience.present": "Present",

    "projects.title": "Projects",
    "projects.intro":
      "Things I have built outside of work, and a few that became work.",
    "projects.viewSource": "Source",
    "projects.viewDemo": "Live demo",
    "projects.featured": "Featured",
    "projects.empty": "Projects coming soon.",

    "awards.title": "Awards",
    "awards.intro":
      "Recognition for work I am proud of.",
    "awards.type.international": "International",
    "awards.type.national": "National",
    "awards.type.regional": "Regional",
    "awards.type.local": "Local",
    "awards.readMore": "Read more",

    "contact.title": "Let's build something together.",
    "contact.intro":
      "Open to full-stack roles, freelance contracts, and interesting LLM work. I usually reply within a day.",
    "contact.copyEmail": "Copy email to clipboard",
    "contact.copied": "Copied",
    "contact.sendEmail": "Send email",

    "footer.builtWith": "Built with",

    "404.title": "Page not found",
    "404.body": "This page does not exist.",
    "404.cta": "Back to home",
  },
  es: {
    "site.title": "Jesús Emmanuel López Desarrollador Full-Stack",
    "site.description":
      "Desarrollador full-stack con 4 años de experiencia en JavaScript/TypeScript, React, Node.js y Python. Construyo plataformas web confiables y herramientas para devs.",

    "nav.about": "Acerca",
    "nav.skills": "Stack",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.awards": "Logros",
    "nav.community": "Comunidad",
    "nav.contact": "Contacto",

    "cta.contact": "Contáctame",
    "cta.cv": "Descargar CV",
    "cta.viewSource": "Ver en GitHub",

    "lang.switch": "English",
    "footer.rights": "Todos los derechos reservados.",

    "a11y.skipToContent": "Saltar al contenido",
    "a11y.themeToggle": "Cambiar tema",

    "nav.menu": "Menú",
    "nav.close": "Cerrar menú",
    "nav.primary": "Navegación principal",

    "hero.status": "Backend Developer en Vierge Group México",
    "hero.greeting": "Hola, soy",
    "hero.tagline":
      "Ingeniero full-stack con sesgo a backend. Construyo APIs confiables, plataformas configurables y, de vez en cuando, integraciones con LLMs.",
    "hero.intro":
      "4 años entregando código en producción con JavaScript, TypeScript, Python y PHP. Actualmente enfocado en sistemas backend para puntos de venta retail.",

    "skills.title": "Mi Stack",
    "skills.intro":
      "Las herramientas con las que entrego software confiable y mantenible. Pragmatismo antes que tendencia.",
    "skills.group.languages": "Lenguajes",
    "skills.group.frontend": "Frontend",
    "skills.group.backend": "Backend",
    "skills.group.data": "Datos",
    "skills.group.tools": "Cloud y Herramientas",

    "experience.title": "Experiencia",
    "experience.intro":
      "Donde he entregado productos reales a usuarios reales. El más reciente arriba.",
    "experience.present": "Presente",

    "projects.title": "Proyectos",
    "projects.intro":
      "Cosas que he construido fuera del trabajo, y algunas que se volvieron trabajo.",
    "projects.viewSource": "Código",
    "projects.viewDemo": "Demo en vivo",
    "projects.featured": "Destacado",
    "projects.empty": "Pronto agrego proyectos.",

    "awards.title": "Reconocimientos",
    "awards.intro":
      "Reconocimiento por trabajo del que me siento orgulloso.",
    "awards.type.international": "Internacional",
    "awards.type.national": "Nacional",
    "awards.type.regional": "Regional",
    "awards.type.local": "Local",
    "awards.readMore": "Leer más",

    "contact.title": "Construyamos algo juntos.",
    "contact.intro":
      "Abierto a roles full-stack, contratos freelance y trabajo interesante con LLMs. Suelo responder en menos de un día.",
    "contact.copyEmail": "Copiar correo al portapapeles",
    "contact.copied": "Copiado",
    "contact.sendEmail": "Enviar correo",

    "footer.builtWith": "Hecho con",

    "404.title": "Página no encontrada",
    "404.body": "Esta página no existe.",
    "404.cta": "Volver al inicio",
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
