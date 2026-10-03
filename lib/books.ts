export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  /** short label printed on the spine */
  spineLabel: string;
  /** spine shade (grayscale) */
  spine: string;
}

export const BOOKS: Book[] = [
  {
    id: 'zero-to-one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    cover: '/books/zero-to-one.png',
    spineLabel: 'ZERO TO ONE',
    spine: '#2e2e2e',
  },
  {
    id: 'steve-jobs',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    cover: '/books/steve-jobs.png',
    spineLabel: 'STEVE JOBS',
    spine: '#0f0f0f',
  },
  {
    id: 'benjamin-franklin',
    title: 'Benjamin Franklin',
    author: 'Walter Isaacson',
    cover: '/books/benjamin-franklin.png',
    spineLabel: 'FRANKLIN',
    spine: '#3b3b3b',
  },
  {
    id: 'moneyball',
    title: 'Moneyball',
    author: 'Michael Lewis',
    cover: '/books/moneyball.png',
    spineLabel: 'MONEYBALL',
    spine: '#5a5a5a',
  },
  {
    id: 'devils',
    title: 'Devils',
    author: 'Fyodor Dostoevsky',
    cover: '/books/devils.png',
    spineLabel: 'DEVILS',
    spine: '#1f1f1f',
  },
  {
    id: 'dream-ridiculous-man',
    title: 'The Dream of a Ridiculous Man',
    author: 'Fyodor Dostoyevsky',
    cover: '/books/dream-ridiculous-man.png',
    spineLabel: 'DREAM',
    spine: '#474747',
  },
  {
    id: 'confessions',
    title: 'Confessions',
    author: 'Saint Augustine',
    cover: '/books/confessions.png',
    spineLabel: 'CONFESSIONS',
    spine: '#262626',
  },
];
