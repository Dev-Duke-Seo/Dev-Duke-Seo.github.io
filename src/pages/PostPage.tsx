import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getContentTree, getPostWithHtml } from '../data/blog-data';
import BlogLayout from '../layouts/BlogLayout';
import Post from '../components/Post';
import { Post as PostType } from '../types';

const PostPageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

type PostPageParams = {
  category: string;
  slug: string;
};

const PostPage: React.FC = () => {
  const { category, slug } = useParams<PostPageParams>();
  const contentTree = getContentTree();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      try {
        const postData = await getPostWithHtml(category || '', slug || '');
        setPost(postData);
      } catch (error) {
        console.error('포스트를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPost();
  }, [category, slug]);
  
  return (
    <BlogLayout contentTree={contentTree}>
      <PostPageContainer>
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          <Post post={post} />
        )}
      </PostPageContainer>
    </BlogLayout>
  );
};

export default PostPage; 