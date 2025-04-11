import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '@/stores/ContentStore';

const TagsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: ${props => props.theme.textPrimary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: ${props => props.theme.primary};
    border-radius: 2px;
  }
`;

const TagList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const TagItem = styled(Link)`
  background: ${props => props.theme.backgroundSecondary};
  color: ${props => props.theme.textSecondary};
  padding: 1rem 1.2rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.theme.borderColor || 'rgba(255,255,255,0.1)'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background: ${props => props.theme.primary};
    color: ${props => props.theme.textLight};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-color: transparent;
  }

  .tag-name {
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    &::before {
      content: '#';
      opacity: 0.7;
    }
  }

  .post-count {
    background: ${props => `${props.theme.primary}33`};
    color: ${props => props.theme.primary};
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  &:hover .post-count {
    background: ${props => `${props.theme.textLight}22`};
    color: ${props => props.theme.textLight};
  }
`;

export default function TagsPage() {
  const { allTags } = useContentStore();

  // 포스트 수에 따라 태그 정렬
  const sortedTags = [...allTags].sort((a, b) => b.posts.length - a.posts.length);

  return (
    <TagsContainer>
      <Title>태그 목록</Title>
      <TagList>
        {sortedTags.map(tag => (
          <TagItem key={tag.name} to={`/tags/${tag.name}`}>
            <span className="tag-name">{tag.name}</span>
            <span className="post-count">{tag.posts.length}</span>
          </TagItem>
        ))}
      </TagList>
    </TagsContainer>
  );
} 