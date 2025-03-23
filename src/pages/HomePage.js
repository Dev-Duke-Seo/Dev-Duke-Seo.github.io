import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import { getAllPosts } from '../data/blog-data';
import '../styles/HomePage.css';

const HomePage = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  
  useEffect(() => {
    // 모든 포스트 데이터 가져오기
    const posts = getAllPosts();
    // 최근 5개 포스트만 필터링
    setRecentPosts(posts.slice(0, 5));
  }, []);
  
  return (
    <div className="home-page">
      <section className="hero">
        <h1>개발자의 기록</h1>
        <p>프론트엔드 개발과 기술에 관한 블로그입니다.</p>
      </section>
      
      <section className="recent-posts">
        <PostList posts={recentPosts} title="최근 작성한 글" />
      </section>
    </div>
  );
};

export default HomePage; 