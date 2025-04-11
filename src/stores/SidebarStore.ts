import { create } from "zustand";


interface SidebarStore {
  isSidebarOpen: boolean;
  currentPostPath: string | null;
  onToggle: () => void;
  setCurrentPostPath: (path: string) => void;
}



const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: true,
  currentPostPath: null,
  onToggle: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setCurrentPostPath: (path) => set({ currentPostPath: path }),
}));

export default useSidebarStore;
