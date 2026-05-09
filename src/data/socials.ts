export type SocialLink = {
  label: string;
  href: string;
  username: string;
  icon: 'github' | 'linkedin' | 'mail';
};

export const SOCIALS: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Emmanuelcik',
    username: '@Emmanuelcik',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jes%C3%BAs-emmanuel-l%C3%B3pez-guerrero',
    username: 'in/jesús-emmanuel-lópez-guerrero',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:jesusemmcik@gmail.com',
    username: 'jesusemmcik@gmail.com',
    icon: 'mail',
  },
];

export const SITE_OWNER = {
  name: 'Jesús Emmanuel López Guerrero',
  shortName: 'Emmanuel López',
  jobTitle: 'Full-Stack Developer',
  location: 'Mexico',
  email: 'jesusemmcik@gmail.com',
  githubUsername: 'Emmanuelcik',
} as const;
