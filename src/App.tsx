import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import GlobalStyle from './styles/GlobalStyle';
import { loadPosts } from './data/postLoader';
import { GitHubConfig } from './config/github';

// 테마 정의
const theme = {
  colors: {
    primary: '#4a6bff',
    secondary: '#f8f9fa',
    text: '#333',
    textLight: '#666',
    border: '#e9e9e9',
    background: '#ffffff',
  },
  breakpoints: {
    small: '576px',
    medium: '768px',
    large: '992px',
    xlarge: '1200px',
  },
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 앱 시작 시 GitHub에서 포스트 로드
    async function loadContent() {
      try {
        await loadPosts();
      } catch (error) {
        console.error('콘텐츠 로드 중 오류:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, []);

  if (isLoading) {
    // 로딩 화면 표시
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        fontSize: '1.2rem',
        color: '#333'
      }}>
        <div>블로그 포스트를 불러오는 중입니다...</div>
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          {GitHubConfig.REPO_OWNER}/{GitHubConfig.REPO_NAME} 저장소에서 
          <br />콘텐츠를 가져오고 있습니다.
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:category/:slug" element={<PostPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 