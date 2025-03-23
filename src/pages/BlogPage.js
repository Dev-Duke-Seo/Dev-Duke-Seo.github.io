import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';
import { getAllPosts } from '../data/blog-data';
import '../styles/BlogPage.css';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { search } = useLocation();
  
  useEffect(() => {
    // 모든 포스트 데이터 가져오기
    const allPosts = getAllPosts();
    setPosts(allPosts);
    
    // URL에서 태그 검색어 추출
    const params = new URLSearchParams(search);
    const tag = params.get('tag');
    
    if (tag) {
      setSearchTerm(tag);
      filterPosts(allPosts, tag);
    } else {
      setFilteredPosts(allPosts);
    }
  }, [search]);
  
  const filterPosts = (postList, term) => {
    if (!term.trim()) {
      setFilteredPosts(postList);
      return;
    }
    
    const filtered = postList.filter(post => {
      const termLower = term.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(termLower);
      const tagMatch = post.tags && post.tags.some(tag => tag.toLowerCase().includes(termLower));
      const contentMatch = post.content && post.content.toLowerCase().includes(termLower);
      return titleMatch || tagMatch || contentMatch;
    });
    
    setFilteredPosts(filtered);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    filterPosts(posts, searchTerm);
  };
  
  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>블로그 포스트</h1>
        <form className="blog-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="포스트 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">검색</button>
        </form>
      </div>
      
      <PostList 
        posts={filteredPosts} 
        title={searchTerm ? `"${searchTerm}" 검색 결과` : "모든 포스트"} 
      />
    </div>
  );
};

export default BlogPage; 