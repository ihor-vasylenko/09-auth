import { cookies } from 'next/headers';
import { API_ENDPOINTS, noteService } from './api';
import { User } from '@/types/user';
import { cleanParams, NotesResponse, PER_PAGE } from './clientApi';
import { Note } from '@/types/note';

interface CookieConfig {
  headers: {
    Cookie: string;
  };
}

const cookieConfig = async (): Promise<CookieConfig> => {
  const cookieStore = await cookies();

  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

export const checkServerSession = async () => {
  const res = await noteService.get<User | null>(
    `${API_ENDPOINTS.SESSION}`,
    await cookieConfig()
  );
  return res;
};

export const getServerMe = async () => {
  const { data } = await noteService.get<User>(
    `${API_ENDPOINTS.PROFILE_GET}`,
    await cookieConfig()
  );

  return data;
};

export const fetchServerNotes = async (
  search: string,
  tag?: string | undefined,
  page: number = 1,
  perPage: number = PER_PAGE
): Promise<NotesResponse> => {
  const params = cleanParams({
    search,
    tag,
    page,
    perPage,
  });

  const { data } = await noteService.get<NotesResponse>(
    `${API_ENDPOINTS.NOTES_SEARCH}`,
    {
      ...params,
      ...(await cookieConfig()),
    }
  );
  return data;
};

export const fetchServerNoteById = async (noteId: Note['id']) => {
  const { data } = await noteService.get<Note>(
    `${API_ENDPOINTS.NOTE_GET}${noteId}`,
    await cookieConfig()
  );
  return data;
};