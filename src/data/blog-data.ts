import { Post, ContentTree } from '../types';
import { getLoadedPosts } from './postLoader';

// 카테고리별 트리 구조 생성
export function getContentTree(): ContentTree {
  const tree: ContentTree = {};
  const allPosts = getLoadedPosts();
  
  allPosts.forEach(post => {
    const { category } = post;
    
    if (!tree[category]) {
      tree[category] = [];
    }
    
    tree[category].push(post);
  });
  
  return tree;
}

// 모든 포스트 반환 (날짜순 정렬)
export function getAllPosts(): Post[] {
  const allPosts = getLoadedPosts();
  return [...allPosts].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

// 특정 포스트 반환
export function getPost(category: string, slug: string): Post | undefined {
  const allPosts = getLoadedPosts();
  return allPosts.find(post => post.category === category && post.slug === slug);
}

// HTML로 변환된 콘텐츠 반환
export async function getPostWithHtml(category: string, slug: string): Promise<Post | null> {
  const post = getPost(category, slug);
  if (!post) return null;
  
  // 마크다운 -> HTML 변환 (프로덕션에서는 remark 사용)
  // 여기서는 간단하게 줄바꿈만 처리
  const htmlContent = post.content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />')
    .replace(/`{3}jsx([\s\S]*?)`{3}/g, '<pre><code class="language-jsx">$1</code></pre>')
    .replace(/`{3}javascript([\s\S]*?)`{3}/g, '<pre><code class="language-javascript">$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  
  return {
    ...post,
    htmlContent: `<p>${htmlContent}</p>`
  };
} 