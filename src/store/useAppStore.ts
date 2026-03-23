import { create } from "zustand";

interface AppState {
  selectedMood: string | null;
  setSelectedMood: (mood: string) => void;
  draftWish: string;
  setDraftWish: (wish: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  isPrivate: boolean;
  setIsPrivate: (isPrivate: boolean) => void;
  isShared: boolean;
  setIsShared: (isShared: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedMood: null,
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  draftWish: "",
  setDraftWish: (wish) => set({ draftWish: wish }),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  isPrivate: true,
  setIsPrivate: (isPrivate) => set({ isPrivate }),
  isShared: false,
  setIsShared: (isShared) => set({ isShared }),
}));
