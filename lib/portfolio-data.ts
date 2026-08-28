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
    badge: '2M+ users',
    badgeStyle: 'penseum',
    description:
      'your 1-1 AI tutor. upload notes, it explains out loud, draws on your screen, and quizzes you until it sticks. 2 million users worldwide.',
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
      'the most comprehensive hackathon list anywhere. track applications, get deadline reminders, and discover events from MLH, Devpost, Luma, and Eventbrite. built by a 5,000+ community.',
    image: '/projects/hackathons-canada.png',
    href: 'https://hna.dev',
    category: ['everything', 'communities'],
    fit: 'cover',
  },
  {
    id: 'contractual',
    title: 'Contractual',
    badge: 'tenders',
    badgeStyle: 'contractual',
    description:
      'canadian public tender search. browse CanadaBuys and SEAO in one place, inspect closing dates and buyers, then verify and continue at the official portal.',
    image: '/projects/contractual.png',
    href: 'https://contractual.ca',
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
    badge: 'hackathon',
    badgeStyle: 'muted',
    description:
      "canada's premier hackathon. real canadian challenges, then a 30-day build with 1-on-1 sponsor access and funding to turn prototypes into lasting projects.",
    image: '/projects/hack-canada.png',
    href: 'https://hackcanada.org',
    category: ['everything', 'communities'],
    fit: 'cover',
  },
  {
    id: 'ioai',
    title: 'IOAI',
    badge: 'silver medalist',
    badgeStyle: 'ioai',
    description: 'IOAI Canada silver medalist.',
    image: '/projects/ioai.png',
    href: 'https://ioai-official.org',
    category: ['everything', 'projects'],
    fit: 'cover',
  },
];

export const EXPERIENCES = [
  { org: 'Penseum', role: 'Product Engineer', period: 'prev', href: 'https://penseum.com' },
  {
    org: 'Hackathons Canada',
    role: 'Founder',
    period: 'ongoing',
    href: 'https://hna.dev',
  },
  { org: 'Contractual', role: 'Founder', period: 'ongoing', href: 'https://contractual.ca' },
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
