import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationProps } from '../types';
import {
  NavigationContainer,
  Title,
  CategoryList,
  CategoryItem,
  CategoryHeader,
  Icon,
  CategoryName,
  PostList,
  PostItem,
  EmptyMessage
} from '../styles/components/NavigationStyles';

const categoryDisplayNames: Record<string, string> = {
  introduction: '소개',
  react: 'React',
  javascript: 'JavaScript'
};

const Navigation: React.FC<NavigationProps> = ({ contentTree }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    Object.keys(contentTree || {})
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prevExpanded => {
      if (prevExpanded.includes(category)) {
        return prevExpanded.filter(c => c !== category);
      } else {
        return [...prevExpanded, category];
      }
    });
  };

  if (!contentTree || Object.keys(contentTree).length === 0) {
    return <EmptyMessage>문서가 없습니다.</EmptyMessage>;
  }

  return (
    <NavigationContainer>
      <Title>문서 목록</Title>
      <CategoryList>
        {Object.keys(contentTree).map(category => (
          <CategoryItem key={category}>
            <CategoryHeader onClick={() => toggleCategory(category)}>
              <Icon expanded={expandedCategories.includes(category)}>
                ▶
              </Icon>
              <CategoryName>
                {categoryDisplayNames[category] || category}
              </CategoryName>
            </CategoryHeader>
            
            {expandedCategories.includes(category) && (
              <PostList>
                {contentTree[category].map(post => (
                  <PostItem key={post.slug}>
                    <Link to={post.path}>
                      {post.title}
                    </Link>
                  </PostItem>
                ))}
              </PostList>
            )}
          </CategoryItem>
        ))}
      </CategoryList>
    </NavigationContainer>
  );
};

export default Navigation; 