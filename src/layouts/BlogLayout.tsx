import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { BlogLayoutProps } from '../types';
import {
  BlogLayoutContainer,
  Header,
  Brand,
  Nav,
  Container,
  Sidebar,
  Content,
  Footer
} from '../styles/components/BlogLayoutStyles';

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, contentTree }) => {
  return (
    <BlogLayoutContainer>
      <Header>
        <Brand>
          <Link to="/">
            <h1>개발자의 기록</h1>
          </Link>
        </Brand>
        <Nav>
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/about">소개</Link></li>
            <li><Link to="/blog">모든 글</Link></li>
          </ul>
        </Nav>
      </Header>
      
      <Container>
        <Sidebar>
          <Navigation contentTree={contentTree} />
        </Sidebar>
        
        <Content>
          {children}
        </Content>
      </Container>
      
      <Footer>
        <p>&copy; {new Date().getFullYear()} 개발자의 기록. All rights reserved.</p>
      </Footer>
    </BlogLayoutContainer>
  );
};

export default BlogLayout; 