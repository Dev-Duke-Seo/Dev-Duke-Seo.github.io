import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { PostListProps } from '../types';
import {
  PostListContainer,
  ListTitle,
  PostItems,
  Item,
  PostLink,
  Card,
  CardTitle,
  CardDescription,
  CardMeta,
  CardDate,
  CardTags,
  CardTag,
  EmptyMessage
} from '../styles/components/PostListStyles';

const PostList: React.FC<PostListProps> = ({ posts, title = "최근 포스트" }) => {
  if (!posts || posts.length === 0) {
    return (
      <EmptyMessage>
        <h2>{title}</h2>
        <p>포스트가 없습니다.</p>
      </EmptyMessage>
    );
  }

  return (
    <PostListContainer>
      <ListTitle>{title}</ListTitle>
      <PostItems>
        {posts.map(post => (
          <Item key={`${post.category}-${post.slug}`}>
            <Link to={post.path} style={{ textDecoration: 'none' }}>
              <Card>
                <CardTitle>{post.title}</CardTitle>
                {post.description && (
                  <CardDescription>{post.description}</CardDescription>
                )}
                
                <CardMeta>
                  {post.createdAt && (
                    <CardDate dateTime={post.createdAt}>
                      {format(parseISO(post.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
                    </CardDate>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <CardTags>
                      {post.tags.map(tag => (
                        <CardTag key={tag}>#{tag}</CardTag>
                      ))}
                    </CardTags>
                  )}
                </CardMeta>
              </Card>
            </Link>
          </Item>
        ))}
      </PostItems>
    </PostListContainer>
  );
};

export default PostList; 