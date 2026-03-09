import { nextServer } from "@/lib/api/api";
import { User } from "@/types/user";
import { CheckSessionRequest } from "./serverApi";
import type { Note } from '@/types/note'
import type { PostNote } from '@/types/note'

export type RegisterRequest = {
  email: string;
  password: string;
};

    
export const register = async (data: RegisterRequest): Promise<User> => { 
    const response = await nextServer.post<User>("/auth/register", data);
    return response.data;
}

export const getMe = async ( ): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

interface HTTPResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(query: string, page: number, tag?: string) {
  const response = await nextServer.get<HTTPResponse>(
    '/notes',
    {
      params: {
        search: query,
        page,
        perPage: 12,
        tag,
      },
    }
  );
  return response.data;
}

export async function createNote(note: PostNote): Promise<Note> {
  const response = await nextServer.post<Note>(
    '/notes', note,
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(
    `/notes/${id}`,
  );
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(
    `/notes/${id}`
  );
  return response.data;
}

export async function updateMe(email: string, password: string): Promise<User> {
  const response = await nextServer.patch<User>(
    '/users/me', { email, password },
  );
  return response.data;
}

export async function login(email: string, password: string): Promise<User> {
  const response = await nextServer.post<User>(
    '/auth/login', { email, password },
  );
  return response.data;
}

export async function logout() {
  await nextServer.post('/auth/logout');
}