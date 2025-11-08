'use client';

import { Note } from '@/types/note';
import { User } from '@/types/user';
import { API_ENDPOINTS, noteService } from './api';

export const PER_PAGE = 12;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
  total: number;
}

export const cleanParams = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null && v !== '')
  ) as Partial<T>;

export const fetchNotes = async (
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
      params,
    }
  );
  return data;
};

export const createNote = async (
  newNote: Pick<Note, 'title' | 'content' | 'tag'>
) => {
  const { data } = await noteService.post<Note>(
    `${API_ENDPOINTS.NOTES_CREATE}`,
    newNote
  );
  return data;
};

export const deleteNote = async (noteId: Note['id']) => {
  const { data } = await noteService.delete<Note>(
    `${API_ENDPOINTS.NOTE_DELETE}${noteId}`
  );
  return data;
};

export const fetchNoteById = async (noteId: Note['id']) => {
  const { data } = await noteService.get<Note>(
    `${API_ENDPOINTS.NOTE_GET}${noteId}`
  );
  return data;
};

export interface LogRegRequest {
  email: string;
  password: string;
}

export const register = async (userData: LogRegRequest) => {
  const { data } = await noteService.post<User>(
    `${API_ENDPOINTS.REGISTER}`,
    userData
  );
  return data;
};

export const login = async (userData: LogRegRequest) => {
  const { data } = await noteService.post<User>(
    `${API_ENDPOINTS.LOGIN}`,
    userData
  );
  return data;
};

export const logout = async (): Promise<void> => {
  await noteService.post(`${API_ENDPOINTS.LOGOUT}`);
};

interface CheckSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const { data } = await noteService.get<CheckSessionRequest>(
    `${API_ENDPOINTS.SESSION}`
  );
  return data.success;
};

export const getMe = async () => {
  const { data } = await noteService.get<User>(`${API_ENDPOINTS.PROFILE_GET}`);
  return data;
};

interface UpdateProfile {
  email?: string;
  username?: string;
}

export const updateMe = async (userData: UpdateProfile) => {
  const { data } = await noteService.patch<User>(
    `${API_ENDPOINTS.PROFILE_UPDATE}`,
    userData
  );
  return data;
};
