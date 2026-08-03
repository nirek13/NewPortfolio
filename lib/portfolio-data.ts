export type NavSection =
  | 'about'
  | 'experiences'
  | 'philosophy'
  | 'books'
  | 'photos';

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
  { id: 'experiences', label: 'experiences' },
  { id: 'philosophy', label: 'my philosophy' },
  { id: 'books', label: 'books' },
  { id: 'photos', label: 'photos' },
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
    category: ['everything', 'projects'],
    fit: 'cover',
  },
];

export const EXPERIENCES = [
  {
    org: 'Penseum',
    role: 'Product Engineer',
    period: 'present',
    detail:
      'building learning tools used by 1M+ people. shipping product, talking to users, and moving fast.',
  },
  {
    org: 'Hackathons Canada',
    role: 'Founder & VP',
    period: 'ongoing',
    detail:
      'grew a national student builder community with google/microsoft partners, 25M views, and 5k members.',
  },
  {
    org: 'Contractual',
    role: 'Founder',
    period: 'ongoing',
    detail: 'ai contract management — making dense legal docs actually usable.',
  },
  {
    org: 'Voyager-0',
    role: 'Builder',
    period: 'shipped',
    detail: 'satellite campus production with a cosmic visual identity and real product behind it.',
  },
];

export const PHILOSOPHY = [
  "this is a rat race. but i'm no rat — i'm a fucking turtle. ninja turtle.",
  'build in public when it helps. stay quiet when it compounds.',
  'ship something every week. even small. especially small.',
  "don't wait until you're \"ready.\" readiness is a trap.",
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
