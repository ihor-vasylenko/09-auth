import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  SESSION: '/auth/session',
  NOTES_SEARCH: '/notes',
  NOTES_CREATE: '/notes',
  NOTE_GET: '/notes/',
  NOTE_EDIT: '/notes/',
  NOTE_DELETE: '/notes/',
  PROFILE_GET: '/users/me',
  PROFILE_UPDATE: '/users/me',
};

export const noteService = axios.create({
  baseURL,
  withCredentials: true,
});