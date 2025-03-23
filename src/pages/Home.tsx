import React from 'react';
import styled from 'styled-components';
import { getAllPosts, getContentTree } from '../data/blog-data';
import BlogLayout from '../layouts/BlogLayout';
import PostList from '../components/PostList';

const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const HomeHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
`;

const Home: React.FC = () => {
  // 최근 포스트 5개만 가져오기
  const recentPosts = getAllPosts().slice(0, 5);
  // 콘텐츠 트리 가져오기
  const contentTree = getContentTree();
  
  return (
    <BlogLayout contentTree={contentTree}>
      <HomeContainer>
        <HomeHeader>
          <Title>프론트엔드 개발 블로그에 오신 것을 환영합니다</Title>
          <Subtitle>
            React, TypeScript, JavaScript와 웹 개발에 관한 글을 공유합니다.
          </Subtitle>
        </HomeHeader>
        
        <PostList posts={recentPosts} title="최근 포스트" />
      </HomeContainer>
    </BlogLayout>
  );
};

export default Home; 