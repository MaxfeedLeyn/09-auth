import { api } from "@/app/api/api";
import { User } from "@/types/user";
import type { Note } from '@/types/note'
import type { PostNote } from '@/types/note'

export type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get('/auth/session');
  return res.data.success;
};

export const getMe = async ( ): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
}

interface HTTPResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(query: string, page: number, tag?: string) {
  const response = await api.get<HTTPResponse>(
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
  const response = await api.post<Note>(
    '/notes', note,
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(
    `/notes/${id}`,
  );
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(
    `/notes/${id}`
  );
  return response.data;
}