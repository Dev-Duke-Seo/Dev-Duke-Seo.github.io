import React from "react";
import { GitHubConfig } from "../config/github";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(0.8); opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 1.5rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const OuterSpinner = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 3px solid transparent;
  border-top: 3px solid ${({ theme }) => theme.colors.text};
  border-right: 3px solid ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;

const InnerSpinner = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-top: 3px solid ${({ theme }) => theme.colors.textLight};
  border-left: 3px solid ${({ theme }) => theme.colors.textLight};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite reverse;
`;

const SubMessage = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  white-space: pre-line;
`;

interface LoadingProps {
  message?: string;
  subMessage?: string;
}

const Loading: React.FC<LoadingProps> = ({
  message = "블로그 포스트를 불러오는 중입니다...",
  subMessage = `${GitHubConfig.REPO_OWNER}/${GitHubConfig.REPO_NAME} 저장소에서\n콘텐츠를 가져오고 있습니다.`,
}) => (
  <LoadingContainer>
    <SpinnerWrapper>
      <OuterSpinner />
      <InnerSpinner />
    </SpinnerWrapper>
    <div>{message}</div>
    <SubMessage>{subMessage}</SubMessage>
  </LoadingContainer>
);

export default Loading;