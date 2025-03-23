import React from 'react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { PostProps } from '../types';
import {
  PostContainer,
  PostHeader,
  PostTitle,
  PostMeta,
  PostTags,
  PostTag,
  PostContent,
  PostNotFound
} from '../styles/components/PostStyles';

const Post: React.FC<PostProps> = ({ post }) => {
  if (!post) {
    return <PostNotFound>포스트를 찾을 수 없습니다.</PostNotFound>;
  }
  
  return (
    <PostContainer>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        
        {post.createdAt && (
          <PostMeta>
            <time dateTime={post.createdAt}>
              {format(parseISO(post.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
            </time>
          </PostMeta>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <PostTags>
            {post.tags.map(tag => (
              <PostTag key={tag}>#{tag}</PostTag>
            ))}
          </PostTags>
        )}
      </PostHeader>
      
      <PostContent>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </PostContent>
    </PostContainer>
  );
};

export default Post; 