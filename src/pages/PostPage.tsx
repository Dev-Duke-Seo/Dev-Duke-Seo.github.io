import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getPostWithHtml } from '../data/blog-data';
import Post from '../components/Post';
import { Post as PostType } from '../types';

const PostPageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

type PostPageParams = {
  category: string;
  '*': string;
};

const PostPage: React.FC = () => {
  const { category, '*': pathMatch } = useParams<PostPageParams>();
  const location = useLocation();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      try {
        const pathParts = pathMatch ? pathMatch.split('/') : [];
        let slug = '';
        
        if (pathParts.length > 0) {
          slug = pathParts[pathParts.length - 1];
        }
        
        const postData = await getPostWithHtml(category || '', slug || '');
        setPost(postData);
        
        if (!postData) {
          console.error('포스트를 찾을 수 없습니다:', location.pathname);
        }
      } catch (error) {
        console.error('포스트를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPost();
  }, [category, pathMatch, location.pathname]);
  
  return (
    <PostPageContainer>
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <Post post={post} />
      )}
    </PostPageContainer>
  );
};

export default PostPage; 