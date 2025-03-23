import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import { getPostWithHtml } from '../data/blog-data';
import '../styles/PostPage.css';

const PostPage = () => {
  const { category, slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadPost = async () => {
      try {
        if (category && slug) {
          const postData = await getPostWithHtml(category, slug);
          if (postData) {
            setPost(postData);
          } else {
            setError('포스트를 찾을 수 없습니다.');
          }
        }
      } catch (err) {
        console.error('포스트를 불러오는데 실패했습니다:', err);
        setError('포스트를 불러오는데 실패했습니다.');
      }
    };
    
    loadPost();
  }, [category, slug]);
  
  if (error) {
    return (
      <div className="post-error">
        <h2>에러</h2>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>뒤로 가기</button>
      </div>
    );
  }
  
  if (!post) {
    return <div className="post-loading">로딩 중...</div>;
  }
  
  return (
    <div className="post-page">
      <Post post={post} />
      <div className="post-navigation">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← 뒤로 가기
        </button>
      </div>
    </div>
  );
};

export default PostPage; 