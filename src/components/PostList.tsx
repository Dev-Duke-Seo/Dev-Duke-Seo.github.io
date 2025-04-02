import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { PostListProps } from '../types';
import * as S from '../styles/components/PostListStyles';

const PostList: React.FC<PostListProps> = ({ posts, title = "최근 포스트" }) => {
  if (!posts || posts.length === 0) {
    return (
      <S.EmptyMessage>
        <h2>{title}</h2>
        <p>포스트가 없습니다.</p>
      </S.EmptyMessage>
    );
  }

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.List>
        {posts.map(post => (
          <S.Item key={`${post.category}-${post.slug}`}>
            <Link to={post.path} style={{ textDecoration: 'none' }}>
              <S.Card>
                <S.CardTitle>{post.title}</S.CardTitle>
                {post.description && (
                  <S.CardDescription>{post.description}</S.CardDescription>
                )}
                
                <S.CardMeta>
                  {post.createdAt && (
                    <S.CardDate dateTime={post.createdAt}>
                      {format(parseISO(post.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
                    </S.CardDate>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <S.CardTags>
                      {post.tags.map(tag => (
                        <S.CardTag key={tag}>#{tag}</S.CardTag>
                      ))}
                    </S.CardTags>
                  )}
                </S.CardMeta>
              </S.Card>
            </Link>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
};

export default PostList; 