import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';
import { GRAPH_URL, URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Create new note',
  description: 'Creating a personal new note',
  openGraph: {
    title: 'Create new note',
    description: 'Creating a personal new note',
    url: `${URL}/notes/action/create`,
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

const CreateNote = () => (
  <main className={css.main}>
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  </main>
);
export default CreateNote;
