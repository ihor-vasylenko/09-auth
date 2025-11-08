import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { PER_PAGE } from '@/lib/api/clientApi';
import NotesClient from './Notes.client';
import { NOTES_FILTER_ALL, URL, GRAPH_URL } from '@/lib/constants';
import { Metadata } from 'next';
import { fetchServerNotes } from '@/lib/api/serverApi';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;

  const descCategory = slug[0] === NOTES_FILTER_ALL ? 'All notes' : `${slug[0]} category`;
  return {
    title: descCategory,
    description: `Notes filter: ${descCategory}`,
    openGraph: {
      title: descCategory,
      description: `Notes filter: ${descCategory}`,
      url: `${URL}/notes/filter/${slug[0]}`,
      siteName: 'NoteHub',
      images: [
        {
          url: GRAPH_URL,
          width: 1200,
          height: 630,
          alt: 'Notebook image',
        },
      ],
    },
  };
};

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const category = slug[0] === NOTES_FILTER_ALL ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', tag: category, page: 1, perPage: PER_PAGE }],
    queryFn: () => fetchServerNotes('', category, 1, PER_PAGE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesPage;
