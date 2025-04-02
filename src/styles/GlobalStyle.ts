import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* 10px = 1rem */
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    line-height: 1.2;
  }

  h1 { font-size: 3.2rem; } /* 32px */
  h2 { font-size: 2.8rem; } /* 28px */
  h3 { font-size: 2.4rem; } /* 24px */
  h4 { font-size: 2rem; }   /* 20px */
  h5 { font-size: 1.8rem; } /* 18px */
  h6 { font-size: 1.6rem; } /* 16px */

  p {
    margin-top: 0;
    font-size: 1.6rem; /* 16px */
  }

  img {
    max-width: 100%;
    height: auto;
  }

  code {
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  pre {
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
  }

  blockquote {
    margin-left: 0;
    padding-left: 1rem;
    border-left: 3px solid #e9e9e9;
    color: #666;
    font-size: 1.6rem; /* 16px */
  }

  ul, ol {
    padding-left: 1.5rem;
    font-size: 1.6rem; /* 16px */
  }
`;

export default GlobalStyle; 