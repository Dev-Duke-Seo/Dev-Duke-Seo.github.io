import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const categoryDisplayNames = {
  introduction: '소개',
  react: 'React',
  javascript: 'JavaScript'
};

const Navigation = ({ contentTree }) => {
  const [expandedCategories, setExpandedCategories] = useState(Object.keys(contentTree || {}));

  const toggleCategory = (category) => {
    setExpandedCategories(prevExpanded => {
      if (prevExpanded.includes(category)) {
        return prevExpanded.filter(c => c !== category);
      } else {
        return [...prevExpanded, category];
      }
    });
  };

  if (!contentTree || Object.keys(contentTree).length === 0) {
    return <div className="nav-empty">문서가 없습니다.</div>;
  }

  return (
    <nav className="blog-navigation">
      <h2 className="nav-title">문서 목록</h2>
      <ul className="nav-categories">
        {Object.keys(contentTree).map(category => (
          <li key={category} className="nav-category">
            <div 
              className="nav-category-header"
              onClick={() => toggleCategory(category)}
            >
              <span className={`nav-icon ${expandedCategories.includes(category) ? 'expanded' : ''}`}>
                ▶
              </span>
              <span className="nav-category-name">
                {categoryDisplayNames[category] || category}
              </span>
            </div>
            
            {expandedCategories.includes(category) && (
              <ul className="nav-posts">
                {contentTree[category].map(post => (
                  <li key={post.slug} className="nav-post">
                    <Link to={post.path}>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation; 