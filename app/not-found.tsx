import css from './page.module.css';
import { Metadata } from 'next';
import { URL, GRAPH_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'The page you are looking for does not exist',
  openGraph: {
    title: '404 - Page not found',
    description: 'The page you are looking for does not exist',
    url: `${URL}/404`,
    siteName: 'NoteHub',
    images: [
      {
        url: GRAPH_URL,
        width: 1200,
        height: 630,
        alt: 'Page not found',
      },
    ],
  },
};

const NotFound = () => {

  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  );
};

export default NotFound;