import { nextServer } from "@/lib/api/api";
import { cookies } from "next/headers";

import { User } from "@/types/user";
import type { Note, PostNote } from "@/types/note";

export type CheckSessionRequest = {
  success: boolean;
};

function getCookieHeader() {
  const cookieStore = cookies();
  return cookieStore.toString();
}

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>(
    "/auth/session",
    {
      headers: {
        Cookie: getCookieHeader(),
      },
    }
  );

  return res;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>(
    "/users/me",
    {
      headers: {
        Cookie: getCookieHeader(),
      },
    }
  );

  return data;
};

interface HTTPResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(query: string, page: number, tag?: string) {
  const response = await nextServer.get<HTTPResponse>(
    "/notes",
    {
      headers: {
        Cookie: getCookieHeader(),
      },
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
    "/notes",
    note,
    {
      headers: {
        Cookie: getCookieHeader(),
      },
    }
  );

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(
    `/notes/${id}`,
    {
      headers: {
        Cookie: getCookieHeader(),
      },
    }
  );

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(
    `/notes/${id}`,
    {
      headers: {
        Cookie: getCookieHeader(),
      },
    }
  );

  return response.data;
}