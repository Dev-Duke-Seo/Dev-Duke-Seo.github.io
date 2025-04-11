import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import MainLayout from './layouts/MainLayout';
import GlobalStyle from './styles/GlobalStyle';
import PageRouter from 'PageRouter';
import Loading from './components/Loading';
import useThemeStore from 'stores/ThemeStore';
import useModalStore from '@/stores/ModalStore';
import { initContent } from './data/initContent';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useThemeStore();

  useEffect(() => {
    // 앱 시작 시 GitHub에서 포스트 로드
    async function loadContent() {
      try {
        await initContent();
        // await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error('콘텐츠 로드 중 오류:', error);

        const rateLimitResetAt = (error as Error & { rateLimitReset: Date }).rateLimitReset;


        if (rateLimitResetAt) {
          const remainingTimeInSeconds = Math.floor((rateLimitResetAt.getTime() - Date.now()) / 1000);
          console.log(remainingTimeInSeconds);
          useModalStore.getState().openApiLimitModal(remainingTimeInSeconds);
        }
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
}