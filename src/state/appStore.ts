import { create } from 'zustand';
import type { Character } from '../game/entities/types';
import type { ClassId } from '../data/classes';
import type { ColorId } from '../data/palette';
import { loginAccount, registerAccount } from './save';

type Screen = 'auth' | 'game';

interface AppState {
  screen: Screen;
  character: Character | null;
  // retornam a mensagem de erro, ou null se deu certo
  login: (username: string, password: string) => Promise<string | null>;
  register: (username: string, password: string, classId: ClassId, colorId: ColorId) => Promise<string | null>;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  screen: 'auth',
  character: null,

  login: async (username, password) => {
    const r = await loginAccount(username, password);
    if (!r.ok) return r.error;
    set({ character: r.value, screen: 'game' });
    return null;
  },

  register: async (username, password, classId, colorId) => {
    const r = await registerAccount(username, password, classId, colorId);
    if (!r.ok) return r.error;
    set({ character: r.value, screen: 'game' });
    return null;
  },

  logout: () => set({ character: null, screen: 'auth' }),
}));