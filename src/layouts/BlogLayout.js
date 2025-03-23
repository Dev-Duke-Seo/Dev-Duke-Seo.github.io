import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/BlogLayout.css';

const BlogLayout = ({ children, contentTree }) => {
  return (
    <div className="blog-layout">
      <header className="blog-header">
        <div className="blog-brand">
          <Link to="/">
            <h1>개발자의 기록</h1>
          </Link>
        </div>
        <nav className="blog-nav">
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/about">소개</Link></li>
            <li><Link to="/blog">모든 글</Link></li>
          </ul>
        </nav>
      </header>
      
      <div className="blog-container">
        <aside className="blog-sidebar">
          <Navigation contentTree={contentTree} />
        </aside>
        
        <main className="blog-content">
          {children}
        </main>
      </div>
      
      <footer className="blog-footer">
        <p>&copy; {new Date().getFullYear()} 개발자의 기록. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BlogLayout; 