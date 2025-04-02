import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DARK_THEME, LIGHT_THEME, Theme } from "styles/THEME";

interface ThemeStore {
	theme: Theme;
	isDarkMode:  boolean;
	toggleTheme: () => void;
}

export const initialTheme: Theme = DARK_THEME;

const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			theme: initialTheme,
			isDarkMode: initialTheme.darkMode,

			toggleTheme: () => {
				set((state) => ({ theme: state.theme.darkMode ? LIGHT_THEME : DARK_THEME,
					isDarkMode: !state.theme.darkMode,
				}));
			},
		}),
		{
			name: "theme-storage",
		}
	)
);

export default useThemeStore;
