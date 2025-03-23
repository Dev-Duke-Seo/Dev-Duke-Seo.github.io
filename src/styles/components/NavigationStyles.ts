import styled from 'styled-components';

export const NavigationContainer = styled.nav`
  height: 100%;
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
  color: #333;
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CategoryItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  font-weight: 500;
  color: #555;
  transition: color 0.2s;

  &:hover {
    color: #1a73e8;
  }
`;

interface IconProps {
  expanded: boolean;
}

export const Icon = styled.span<IconProps>`
  font-size: 0.8rem;
  margin-right: 0.5rem;
  transition: transform 0.2s;
  transform: ${props => props.expanded ? 'rotate(90deg)' : 'rotate(0)'};
`;

export const CategoryName = styled.span`
  font-size: 0.95rem;
`;

export const PostList = styled.ul`
  padding-left: 1.2rem;
  margin-top: 0.3rem;
  margin-bottom: 0.8rem;
`;

export const PostItem = styled.li`
  padding: 0.25rem 0;
  font-size: 0.9rem;

  a {
    color: #666;
    transition: color 0.2s;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;

    &:hover {
      color: #1a73e8;
      text-decoration: none;
    }
  }
`;

export const EmptyMessage = styled.div`
  color: #888;
  font-style: italic;
  margin-top: 1rem;
`; 