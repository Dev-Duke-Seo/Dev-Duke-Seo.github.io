import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
  }

  a {
    color: #4a6bff;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #304bae;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    line-height: 1.2;
  }

  p {
    margin-top: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  code {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 0.9em;
    padding: 0.2em 0.4em;
    background-color: #f5f5f5;
    border-radius: 3px;
  }

  pre {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    
    code {
      padding: 0;
      background-color: transparent;
    }
  }

  blockquote {
    margin-left: 0;
    padding-left: 1rem;
    border-left: 3px solid #e9e9e9;
    color: #666;
  }

  ul, ol {
    padding-left: 1.5rem;
  }
`;

export default GlobalStyle; 