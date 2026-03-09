// app/lib/stores/noteStore.ts

import { create } from 'zustand';
// 1. Імпортуємо функцію
import { persist } from 'zustand/middleware';
import { PostNote } from '@/types/note';
import { User } from '@/types/user';

type PostNoteDraftStore = {
  draft: PostNote;
  setDraft: (note: PostNote) => void;
  clearDraft: () => void;
};

type AuthStore = {
  user: User ;
  isAuthenticated: boolean;
  setUser: (value: User) => void;
  clearIsAuthenticated: () => void;
}

const initialDraft: PostNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<PostNoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);

const initialUser: User = {
  username: '',
  email: '',
  avatar: ''
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: initialUser,
      isAuthenticated: false,
      setUser: (user) => set(() => ({ user, isAuthenticated: true })),
      clearIsAuthenticated: () => set(() => ({ user: initialUser, isAuthenticated: false })),
    }),
    {
      name: 'auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
);
