export type NavSection = 'about' | 'work' | 'experiences' | 'github' | 'books';

export type ProjectFilter = 'everything' | 'projects' | 'communities';

export interface PortfolioItem {
  id: string;
  title: string;
  badge: string;
  badgeStyle?: 'muted' | 'hackathons' | 'penseum' | 'contractual' | 'ioai' | 'nasa' | 'voyager';
  description: string;
  image: string;
  href?: string;
  category: ProjectFilter[];
  /** how the image sits in the 16:10 frame */
  fit?: 'cover' | 'contain';
  /** optional frame background when fit is contain */
  frame?: string;
}

export const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: 'about', label: 'about' },
  { id: 'work', label: 'work' },
  { id: 'experiences', label: 'experience' },
  { id: 'github', label: 'code' },
  { id: 'books', label: 'books' },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'penseum',
    title: 'Penseum',
    badge: '1M+ users',
    badgeStyle: 'penseum',
    description:
      'product engineer at an edtech startup serving over a million users. shipping features, obsessing over product, learning how real software gets built.',
    image: '/penseum-logo.avif',
    href: 'https://penseum.com',
    category: ['everything', 'projects'],
    fit: 'contain',
    frame: '#0b1220',
  },
  {
    id: 'hackathons-canada',
    title: 'Hackathons Canada',
    badge: '5k members',
    badgeStyle: 'hackathons',
    description:
      'founded and scaled a national hackathon community. partnered with google and microsoft, hit 25 million social views, and grew to 5,000 members.',
    image: '/projects/hackathons-canada.png',
    href: 'https://hackathonscanada.com',
    category: ['everything', 'communities'],
    fit: 'cover',
  },
  {
    id: 'contractual',
    title: 'Contractual',
    badge: 'project',
    badgeStyle: 'contractual',
    description:
      'ai-powered contract management platform. helping people actually understand and manage the agreements they sign.',
    image: '/projects/contractual.png',
    category: ['everything', 'projects'],
    fit: 'contain',
    frame: '#ffffff',
  },
  {
    id: 'voyager-0',
    title: 'Voyager-0',
    badge: 'satellite campus',
    badgeStyle: 'voyager',
    description:
      'a satellite campus production — dark-mode energy, particle spirals, and shipping something that feels like space.',
    image: '/projects/voyager-0.png',
    category: ['everything', 'projects'],
    fit: 'cover',
  },
  {
    id: 'hack-canada',
    title: 'Hack Canada',
    badge: 'community',
    badgeStyle: 'muted',
    description:
      'canadian winter energy for builders. igloos, beavers, campfires — and a whole lot of shipping under the northern lights.',
    image: '/projects/hack-canada.png',
    category: ['everything', 'communities'],
    fit: 'cover',
  },
  {
    id: 'ioai',
    title: 'IOAI',
    badge: 'silver medalist · national finalist',
    badgeStyle: 'ioai',
    description:
      'silver medalist and national finalist at the international olympiad in artificial intelligence — burgas, bulgaria 2024.',
    image: '/projects/ioai.png',
    href: 'https://ioai-official.org',
    category: ['everything', 'projects'],
    fit: 'cover',
  },
];

export const FEATURED_REPOS = [
  {
    name: 'AGEile',
    lang: 'Swift',
    blurb: 'all-in-one app for seniors. Ingenious+ Ontario winner.',
    href: 'https://github.com/nirek13/AGEile',
  },
  {
    name: '.Summa',
    lang: 'JS',
    blurb: 'connecting founders to VCs. Gen AI Genesis winner.',
    href: 'https://github.com/nirek13/.Summa',
  },
  {
    name: 'HaarCascadeClasifier',
    lang: 'Python',
    blurb: 'detects smiles, eyes, hands, mouths.',
    href: 'https://github.com/nirek13/HaarCascadeClasifier',
  },
  {
    name: 'Resume',
    lang: 'TeX',
    blurb: 'open-source LaTeX resume.',
    href: 'https://github.com/nirek13/Resume',
  },
] as const;

export const EXPERIENCES = [
  { org: 'Penseum', role: 'Product Engineer', period: 'now', href: 'https://penseum.com' },
  {
    org: 'Hackathons Canada',
    role: 'Founder',
    period: 'ongoing',
    href: 'https://hackathonscanada.com',
  },
  { org: 'Contractual', role: 'Founder', period: 'ongoing' },
  { org: 'Voyager-0', role: 'shipped', period: '2024' },
  {
    org: 'IOAI',
    role: 'Silver · national finalist',
    period: '2024',
    href: 'https://ioai-official.org',
  },
];

export { BOOKS } from './books';
export type { Book } from './books';

export const BADGE_CLASS: Record<string, string> = {
  muted: 'text-sm text-muted-foreground ml-2 shrink-0',
  penseum: 'link-badge link-penseum ml-2 shrink-0',
  hackathons: 'link-badge link-hackathons ml-2 shrink-0',
  contractual: 'link-badge link-contractual ml-2 shrink-0',
  ioai: 'link-badge link-ioai ml-2 shrink-0',
  nasa: 'link-badge link-nasa ml-2 shrink-0',
  voyager: 'link-badge link-voyager ml-2 shrink-0',
};
