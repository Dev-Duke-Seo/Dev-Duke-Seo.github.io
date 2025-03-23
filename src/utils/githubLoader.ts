import { Post } from '../types';
import { GitHubConfig } from '../config/github';

// GitHub API URL
const { API_BASE, RAW_CONTENT, REPO_OWNER, REPO_NAME, BRANCH, CONTENT_PATH, DEFAULT_CATEGORY } = GitHubConfig;

/**
 * GitHub 저장소에서 파일 목록을 가져오는 함수
 * @param path 저장소 내 경로
 * @returns 파일 목록
 */
export async function getFilesFromGitHub(path = ''): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`);
    
    if (!response.ok) {
      throw new Error(`GitHub API 요청 실패: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('GitHub에서 파일 목록을 가져오는데 실패했습니다:', error);
    return [];
  }
}

/**
 * GitHub 저장소에서 마크다운 파일을 가져오는 함수
 * @param path 파일 경로
 * @returns 마크다운 내용
 */
export async function getMarkdownContent(path: string): Promise<string | null> {
  try {
    const response = await fetch(`${RAW_CONTENT}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${path}`);
    
    if (!response.ok) {
      throw new Error(`마크다운 파일 가져오기 실패: ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('마크다운 파일을 가져오는데 실패했습니다:', error);
    return null;
  }
}

/**
 * 마크다운 파일에서 메타데이터와 컨텐츠를 추출하는 함수
 * @param content 마크다운 파일 내용
 * @returns 메타데이터와 컨텐츠
 */
export function parseMarkdown(content: string): { metadata: any, content: string } {
  // 간단한 YAML 프론트매터 파서
  // ---
  // title: 제목
  // description: 설명
  // ---
  // 본문 내용
  
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { 
      metadata: {}, 
      content: content 
    };
  }
  
  const frontMatter = match[1];
  const markdownContent = match[2];
  
  // 간단한 YAML 파싱
  const metadata: Record<string, any> = {};
  frontMatter.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join(':').trim();
      metadata[key] = value;
    }
  });
  
  return {
    metadata,
    content: markdownContent
  };
}

/**
 * GitHub 저장소에서 블로그 포스트 목록을 가져와서 처리하는 함수
 * @returns 처리된 블로그 포스트 배열
 */
export async function loadGitHubPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  
  try {
    // 저장소의 posts 디렉토리에서 파일 목록 가져오기
    const files = await getFilesFromGitHub(CONTENT_PATH);
    
    // 마크다운 파일만 필터링
    const markdownFiles = files.filter(file => 
      file.name.endsWith('.md') && file.type === 'file'
    );
    
    // 각 마크다운 파일 처리
    for (const file of markdownFiles) {
      const content = await getMarkdownContent(file.path);
      
      if (content) {
        const { metadata, content: markdownContent } = parseMarkdown(content);
        
        // 파일 이름에서 slug 추출 (예: hello-world.md -> hello-world)
        const slug = file.name.replace('.md', '');
        
        // 카테고리 추출 (파일 경로에서 추출하거나 메타데이터에서 가져오기)
        const category = metadata.category || DEFAULT_CATEGORY;
        
        // Post 객체 생성
        const post: Post = {
          title: metadata.title || '제목 없음',
          description: metadata.description || '',
          createdAt: metadata.date || new Date().toISOString().split('T')[0],
          tags: metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : [],
          slug,
          category,
          path: `/blog/${category}/${slug}`,
          content: markdownContent
        };
        
        posts.push(post);
      }
    }
    
    // 날짜 기준 내림차순 정렬
    return posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
  } catch (error) {
    console.error('GitHub에서 블로그 포스트를 가져오는데 실패했습니다:', error);
    return [];
  }
} 