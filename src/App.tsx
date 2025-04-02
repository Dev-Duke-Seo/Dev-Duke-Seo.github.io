import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import MainLayout from './layouts/MainLayout';
import GlobalStyle from './styles/GlobalStyle';
import { loadPosts } from './data/postLoader';
import PageRouter from 'PageRouter';
import Loading from './components/Loading';
import useThemeStore from 'stores/ThemeStore';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useThemeStore();

  useEffect(() => {
    // 앱 시작 시 GitHub에서 포스트 로드
    async function loadContent() {
      try {
        await loadPosts();
        // await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error('콘텐츠 로드 중 오류:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isLoading ? (
        <Loading />
      ) : (
        <Router>
          <MainLayout>
            <PageRouter />
          </MainLayout>
        </Router>
      )}
    </ThemeProvider>
  );
};

export default App; 