import React from 'react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import '../styles/Post.css';

const Post = ({ post }) => {
  if (!post) {
    return <div className="post-not-found">포스트를 찾을 수 없습니다.</div>;
  }
  
  return (
    <article className="post">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        
        {post.createdAt && (
          <div className="post-meta">
            <time dateTime={post.createdAt}>
              {format(parseISO(post.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
            </time>
          </div>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="post-tag">#{tag}</span>
            ))}
          </div>
        )}
      </header>
      
      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
      />
    </article>
  );
};

export default Post; 