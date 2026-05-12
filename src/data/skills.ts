/**
 * Tech stack groups rendered by `Skills.astro`. Edit this file to add,
 * remove, or reorder items — the section re-renders automatically.
 *
 * `labelKey` must exist in `src/i18n/ui.ts` (skills.group.*).
 * `items` are plain strings; ordering matters and is preserved as-is.
 */

import type { UiKey } from "~/i18n/ui";

export interface SkillGroup {
  id: string;
  labelKey: UiKey;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    labelKey: "skills.group.languages",
    items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL"],
  },
  {
    id: "frontend",
    labelKey: "skills.group.frontend",
    items: [
      "React",
      "Vue",
      "Astro",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Zustand",
      "TanStack Query",
      "WebSockets",
    ],
  },
  {
    id: "backend",
    labelKey: "skills.group.backend",
    items: ["Node.js", "Express", "NestJS", "Django", "Laravel", "REST APIs"],
  },
  {
    id: "data",
    labelKey: "skills.group.data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    id: "tools",
    labelKey: "skills.group.tools",
    items: ["Docker", "Linux", "Git", "GitHub Actions", "AWS", "Vercel"],
  },
];
