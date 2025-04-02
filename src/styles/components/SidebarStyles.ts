import styled from 'styled-components';

interface NavigationContainerProps {
  isOpen: boolean;
}

interface IconProps {
  expanded: boolean;
}

export const SidebarContainer = styled.nav<NavigationContainerProps>`
  height: 100vh;
  width: ${props => props.isOpen ? '250px' : '0'};
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.background};
  transition: all 0.3s ease;
  overflow-x: hidden;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${props => props.isOpen ? '1rem' : '0'};
  z-index: 1000;
  box-shadow: ${props => props.isOpen ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

export const ToggleButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  left: ${props => props.isOpen ? '250px' : '0'};
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1001;
  border-radius: 0 8px 8px 0;
  font-size: 1.2rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  &:hover {
    filter: brightness(0.9);
    padding-right: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
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
  color: ${({ theme }) => theme.colors.textLight};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Icon = styled.span<IconProps>`
  font-size: 0.8rem;
  margin-right: 0.5rem;
  transition: transform 0.2s;
  transform: ${props => props.expanded ? 'rotate(90deg)' : 'rotate(0)'};
  color: ${({ theme }) => theme.colors.textLight};
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
    color: ${({ theme }) => theme.colors.textLight};
    transition: color 0.2s;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
    }
  }
`;

export const EmptyMessage = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-style: italic;
  margin-top: 1rem;
`; 