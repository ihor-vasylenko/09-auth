import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const baseURL = 'https://notehub-api.goit.study';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});