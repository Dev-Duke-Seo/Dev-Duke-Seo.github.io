import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { compareDesc, parseISO } from 'date-fns';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllContentSlugs() {
  // 모든 블로그 디렉토리 경로 (최대 2단계 깊이까지)
  const blogDirectories = [];
  const topLevelDirs = fs.readdirSync(path.join(contentDirectory, 'blog'), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // 폴더 구조에 따라 슬러그 생성
  topLevelDirs.forEach(dir => {
    const dirPath = path.join(contentDirectory, 'blog', dir);
    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.md'));
    
    files.forEach(file => {
      const slug = file.replace(/\.md$/, '');
      blogDirectories.push({ 
        params: { 
          slug,
          category: dir 
        }
      });
    });
  });

  return blogDirectories;
}

export function getContentData(category, slug) {
  const filePath = path.join(contentDirectory, 'blog', category, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // gray-matter로 메타데이터와 콘텐츠 분리
  const { data, content } = matter(fileContents);
  
  // 메타데이터에 슬러그 추가
  const contentData = {
    ...data,
    slug,
    category,
    path: `/blog/${category}/${slug}`
  };
  
  return {
    contentData,
    content
  };
}

export async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html, { sanitize: false })
    .process(markdown);
  
  return result.toString();
}

export function getAllContentData() {
  const slugs = getAllContentSlugs();
  const allContent = slugs.map(({ params }) => {
    const { contentData, content } = getContentData(params.category, params.slug);
    return {
      ...contentData,
      content
    };
  });
  
  // 생성일 기준으로 정렬
  return allContent.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
    }
    return 0;
  });
}

export function getContentTree() {
  const allContent = getAllContentData();
  const tree = {};
  
  allContent.forEach(content => {
    const { category } = content;
    
    if (!tree[category]) {
      tree[category] = [];
    }
    
    tree[category].push(content);
  });
  
  // 각 카테고리 내에서도 생성일 기준 정렬
  Object.keys(tree).forEach(category => {
    tree[category].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
      }
      return 0;
    });
  });
  
  return tree;
} 