import styled from 'styled-components';

export const PostContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

export const PostHeader = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
`;

export const PostTitle = styled.h1`
  font-size: 2.2rem;
  line-height: 1.3;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const PostMeta = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const PostTag = styled.span`
  background-color: #f1f5f9;
  color: #4a5568;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e9f0;
  }
`;

export const PostContent = styled.div`
  line-height: 1.8;
  font-size: 1.05rem;
  color: #333;

  h1 {
    font-size: 3rem;
    margin: 2rem 0 1rem;
  }

  h2 {
    font-size: 2.5rem;
    margin: 1.8rem 0 1rem;
  }

  h3 {
    font-size: 2rem;
    margin: 1.5rem 0 0.8rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  img {
    max-width: 100%;
    border-radius: 4px;
    margin: 1.5rem 0;
  }

  code {
    background-color: ${({ theme }) => theme.colors.backgroundSub};
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1.1em;
    color: ${({ theme }) => theme.colors.text};
  }

  pre {
    background-color: #f8f8f8;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  pre code {
    background-color: transparent;
    padding: 0;
    font-size: 1.1em;
  }

  /* Shiki 스타일링 */
  .shiki {
    border-radius: 8px;
    overflow-x: auto;
    font-size: 1.1em;
    line-height: 1.5;
    tab-size: 2;
    margin: 1.5rem 0;
    border: 1px solid #e0e0e0;
  }

  /* 코드 블록 내 실제 코드 컨테이너 */
  .shiki code {
    background-color: transparent;
    padding: 1rem;
    display: block;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  }

  /* 코드 라인 */
  .shiki [data-line] {
    padding: 0 0.5rem;
  }
  
  /* 코드 블록 테마 */
  body:not(.dark-theme) .shiki {
    background-color: #f6f8fa !important;
    border-color: #e0e0e0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  body.dark-theme .shiki {
    background-color: #2d333b !important;
    border-color: #444;
  }

  /* 토큰별 스타일링은 Shiki의 테마를 사용 */

  ul,
  ol {
    margin: 1rem 0 1.5rem 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #1a73e8;
    text-decoration: underline;
  }

  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1rem;
    margin-left: 0;
    color: #555;
    font-style: italic;
    margin: 1.5rem 0;
  }
`;

export const PostNotFound = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: #666;
  font-style: italic;
`; 