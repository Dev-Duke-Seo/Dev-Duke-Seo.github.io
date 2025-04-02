export type Theme = typeof LIGHT_THEME & typeof DARK_THEME;

const BREAKPOINT = {
  small: '576px',
  medium: '768px',
  large: '992px',
  xlarge: '1200px',
}

export const LIGHT_THEME = {
  darkMode: false,
  colors: {
    primary: '#4a6bff',
    secondary: '#f8f9fa',
    text: '#333',
    textLight: '#666',
    border: '#e9e9e9',
    background: '#ffffff',
    backgroundSub: '#f5f5f5',
  },
  breakpoints: BREAKPOINT,
  maxWidth: '1200px',
};

export const DARK_THEME = {
  darkMode: true,
  colors: {
    // primary: '#6b8bff',
    primary: '#33ff04',
    secondary: '#1a1a1a',
    text: '#ffffff',
    textLight: '#b3b3b3',
    border: '#333333',
    background: '#121212',
    backgroundSub: '#3e3434',
  },
  breakpoints: BREAKPOINT,
  maxWidth: '1200px',
};