import { create } from 'zustand';
import type { MenuSlotId } from '../data/menuSlots';

interface HudState {
  activeMenuId: MenuSlotId | null; // null = mundo (grid) sem painel aberto
  isEventActive: boolean;
  toggleMenu: (menuId: MenuSlotId) => void;
  closeMenu: () => void;
  setEventActive: (isActive: boolean) => void;
}

export const useHudStore = create<HudState>((set) => ({
  activeMenuId: null,
  isEventActive: false,

  toggleMenu: (menuId) =>
    set((state) => ({ activeMenuId: state.activeMenuId === menuId ? null : menuId })),

  closeMenu: () => set({ activeMenuId: null }),

  setEventActive: (isActive) => set({ isEventActive: isActive }),
}));