import { create } from "zustand";


const MIN_WIDTH = 200;
const MAX_WIDTH = 600;
const DEFAULT_WIDTH = 250;
interface SidebarStore {
  isSidebarOpen: boolean;
  currentPostPath: string | null;
  width: number;
  onToggle: () => void;
  setCurrentPostPath: (path: string) => void;
  setWidth: (width: number) => void;
}


const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: true,
  currentPostPath: null,
  width: DEFAULT_WIDTH,
  onToggle: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen, width: DEFAULT_WIDTH })),
  setCurrentPostPath: (path) => set({ currentPostPath: path }),
  setWidth: (width) => set({ width: Math.min(Math.max(width, MIN_WIDTH), MAX_WIDTH) }),
}));

export default useSidebarStore;
