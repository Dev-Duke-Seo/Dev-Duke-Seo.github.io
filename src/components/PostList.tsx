import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import * as S from './PostListStyles';
import { Post } from 'types/Post';

export interface PostListProps {
  posts: Post[];
  title?: string;
} 

export default function PostList({ posts, title = "최근 포스트" }: PostListProps) {
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
          <S.Item key={`${post.category}-${post.title}`}>
            <Link to={`/${post.path}`} style={{ textDecoration: 'none' }}>
              <S.Card>
                <S.CardTitle>{post.title}</S.CardTitle>
                {post.description && (
                  <S.CardDescription>{post.description}</S.CardDescription>
                )}
                
                  <S.CardMeta>
                    {post.date ? (
                    <S.CardDate dateTime={post.date.toISOString()}>
                      {format(post.date, 'yyyy년 MM월 dd일', { locale: ko })}
                    </S.CardDate>
                  ) : (
                    <S.CardDate>작성일 미상</S.CardDate>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <S.CardTags>
                      {post.tags.map(tag => (
                        <S.CardTag key={tag.name}>#{tag.name}</S.CardTag>
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
}