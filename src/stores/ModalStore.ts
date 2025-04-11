import { create } from "zustand";

interface ModalStore {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	isApiLimitModal: boolean;
	openApiLimitModal: (resetTime: number | null) => void;
	resetTimeInSeconds: number | null;
}

const useModalStore = create<ModalStore>((set) => ({
	isOpen: false,
	isApiLimitModal: false,
	resetTimeInSeconds: null,
	openModal: () => set({ isOpen: true }),
	openApiLimitModal: (resetTime: number | null) =>
		set({ isOpen: true, isApiLimitModal: true, resetTimeInSeconds: resetTime }),
	closeModal: () =>
		set({ isOpen: false, isApiLimitModal: false, resetTimeInSeconds: null }),
}));

export default useModalStore;
