import styled from 'styled-components';

export const BlogLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const Brand = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }

  a {
    color: #333;
    text-decoration: none;
  }
`;

export const Nav = styled.nav`
  ul {
    display: flex;
    gap: 1.5rem;

    @media (max-width: 768px) {
      gap: 1rem;
    }
  }

  a {
    color: #555;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #1a73e8;
      text-decoration: none;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 250px;
  padding: 2rem 1rem;
  background-color: #fff;
  border-right: 1px solid #eee;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee;
    padding: 1rem;
  }
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Footer = styled.footer`
  background-color: #f5f5f5;
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid #eee;
`; 