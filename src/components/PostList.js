import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import '../styles/PostList.css';

const PostList = ({ posts, title = "최근 포스트" }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="posts-empty">
        <h2>{title}</h2>
        <p>포스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="posts-list">
      <h2 className="posts-title">{title}</h2>
      <ul className="posts">
        {posts.map(post => (
          <li key={`${post.category}-${post.slug}`} className="post-item">
            <Link to={post.path} className="post-link">
              <article className="post-card">
                <h3 className="post-card-title">{post.title}</h3>
                {post.description && (
                  <p className="post-card-description">{post.description}</p>
                )}
                
                <div className="post-card-meta">
                  {post.createdAt && (
                    <time className="post-card-date" dateTime={post.createdAt}>
                      {format(parseISO(post.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
                    </time>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-card-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="post-card-tag">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList; 