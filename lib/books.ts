export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  /** short label printed on the spine */
  spineLabel: string;
  /** spine accent color */
  spine: string;
}

export const BOOKS: Book[] = [
  {
    id: 'zero-to-one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    cover: '/books/zero-to-one.png',
    spineLabel: 'ZERO TO ONE',
    spine: '#3d6f9c',
  },
  {
    id: 'steve-jobs',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    cover: '/books/steve-jobs.png',
    spineLabel: 'STEVE JOBS',
    spine: '#111111',
  },
  {
    id: 'benjamin-franklin',
    title: 'Benjamin Franklin',
    author: 'Walter Isaacson',
    cover: '/books/benjamin-franklin.png',
    spineLabel: 'FRANKLIN',
    spine: '#1a3352',
  },
  {
    id: 'moneyball',
    title: 'Moneyball',
    author: 'Michael Lewis',
    cover: '/books/moneyball.png',
    spineLabel: 'MONEYBALL',
    spine: '#b91c1c',
  },
  {
    id: 'devils',
    title: 'Devils',
    author: 'Fyodor Dostoevsky',
    cover: '/books/devils.png',
    spineLabel: 'DEVILS',
    spine: '#8f122f',
  },
  {
    id: 'dream-ridiculous-man',
    title: 'The Dream of a Ridiculous Man',
    author: 'Fyodor Dostoyevsky',
    cover: '/books/dream-ridiculous-man.png',
    spineLabel: 'DREAM',
    spine: '#0d0d0d',
  },
  {
    id: 'confessions',
    title: 'Confessions',
    author: 'Saint Augustine',
    cover: '/books/confessions.png',
    spineLabel: 'CONFESSIONS',
    spine: '#0a1624',
  },
];
