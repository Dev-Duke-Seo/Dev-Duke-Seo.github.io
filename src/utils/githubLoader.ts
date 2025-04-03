import { Post } from '../types';
import { GitHubConfig } from '../config/github';

// GitHub API URL
const { 
  API_BASE, 
  RAW_CONTENT, 
  REPO_OWNER, 
  REPO_NAME, 
  BRANCH, 
  CONTENT_PATH, 
  DEFAULT_CATEGORY,
  ALTERNATIVE_PATHS,
  DEBUG 
} = GitHubConfig;

/**
 * 디버그 로그 출력 함수
 */
function debugLog(...args: any[]): void {
  if (DEBUG) {
    console.log('[GitHub Loader]', ...args);
  }
}

/**
 * GitHub 저장소에서 파일 목록을 가져오는 함수
 * @param path 저장소 내 경로
 * @returns 파일 목록
 */
export async function getFilesFromGitHub(path = ''): Promise<any[]> {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`;
  debugLog(`API 요청: ${url}`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      // 응답 상태에 따른 처리
      if (response.status === 404) {
        console.error(`GitHub 경로를 찾을 수 없습니다: ${path}`);
        debugLog(`경로가 존재하는지 확인하세요: ${REPO_OWNER}/${REPO_NAME}의 ${path} 경로`);
        return [];
      }
      
      // API 제한 확인
      if (response.status === 403) {
        const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        
        if (rateLimitRemaining === '0') {
          const resetDate = new Date(Number(rateLimitReset) * 1000);
          console.error(`GitHub API 제한에 도달했습니다. 제한이 재설정되는 시간: ${resetDate.toLocaleString()}`);
        }
      }
      
      throw new Error(`GitHub API 요청 실패: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    debugLog(`${path} 경로에서 ${Array.isArray(data) ? data.length : 1}개 항목을 찾았습니다.`);
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('GitHub에서 파일 목록을 가져오는데 실패했습니다:', error);
    return [];
  }
}

/**
 * 여러 경로에서 파일 찾기를 시도하는 함수
 * @returns 파일 목록과 성공한 경로
 */
export async function tryMultiplePaths(): Promise<{files: any[], successPath: string}> {
  // 기본 경로 먼저 시도
  let files = await getFilesFromGitHub(CONTENT_PATH);
  
  if (files.length > 0) {
    debugLog(`기본 경로 ${CONTENT_PATH}에서 파일을 찾았습니다.`);
    return { files, successPath: CONTENT_PATH };
  }
  
  debugLog(`기본 경로 ${CONTENT_PATH}에 파일이 없어 대체 경로를 시도합니다.`);
  
  // 대체 경로 시도
  for (const path of ALTERNATIVE_PATHS) {
    files = await getFilesFromGitHub(path);
    
    if (files.length > 0) {
      debugLog(`대체 경로 ${path}에서 파일을 찾았습니다.`);
      return { files, successPath: path };
    }
  }
  
  console.warn('모든 경로에서 파일을 찾을 수 없었습니다.');
  return { files: [], successPath: '' };
}

/**
 * GitHub 저장소에서 마크다운 파일을 가져오는 함수
 * @param path 파일 경로
 * @returns 마크다운 내용
 */
export async function getMarkdownContent(path: string): Promise<string | null> {
  debugLog(`path: ${path}`);
  const url = `${RAW_CONTENT}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${path}`;
  debugLog(`마크다운 파일 요청: ${url}`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`마크다운 파일을 찾을 수 없습니다: ${path}`);
        return null;
      }
      
      throw new Error(`마크다운 파일 가져오기 실패: ${response.status} - ${response.statusText}`);
    }
    
    const content = await response.text();
    debugLog(`${path} 파일 (${content.length} 바이트) 로드 완료`);
    return content;
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
    debugLog('YAML 프론트매터를 찾을 수 없습니다. 일반 마크다운으로 처리합니다.');
    return { 
      metadata: {
        title: '제목 없음',
        description: '설명 없음'
      }, 
      content: content 
    };
  }
  
  const frontMatter = match[1];
  const markdownContent = match[2];
  
  // 간단한 YAML 파싱
  const metadata: Record<string, any> = {};
  frontMatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      
      // 배열 형태 처리 (tags: [tag1, tag2])
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        metadata[key] = arrayContent.split(',').map(item => item.trim());
      } else {
        metadata[key] = value;
      }
    }
  });
  
  debugLog('메타데이터 파싱 완료:', metadata);
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
  debugLog(`GitHub에서 블로그 포스트 로드 시작 - 저장소: ${REPO_OWNER}/${REPO_NAME}`);
  
  try {
    // 여러 경로 시도
    const { files, successPath } = await tryMultiplePaths();
    
    if (files.length === 0) {
      console.warn('모든 경로에서 파일을 찾을 수 없었습니다.');
      return [];
    }
    
    debugLog(`${successPath} 경로에서 ${files.length}개의 파일을 찾았습니다.`);
    
    // 마크다운 파일만 필터링
    const markdownFiles = files.filter(file => 
      file.name.endsWith('.md') && file.type === 'file'
    );
    
    debugLog(`${markdownFiles.length}개의 마크다운 파일을 찾았습니다.`);
    
    if (markdownFiles.length === 0) {
      // 디렉토리 내부 탐색
      for (const file of files) {
        if (file.type === 'dir') {
          debugLog(`${file.path} 디렉토리 내부 탐색 중...`);
          const dirFiles = await getFilesFromGitHub(file.path);
          
          const dirMarkdownFiles = dirFiles.filter(f => 
            f.name.endsWith('.md') && f.type === 'file'
          );
          
          if (dirMarkdownFiles.length > 0) {
            debugLog(`${file.path} 디렉토리에서 ${dirMarkdownFiles.length}개의 마크다운 파일을 찾았습니다.`);
            markdownFiles.push(...dirMarkdownFiles);
          }
        }
      }
    }
    
    if (markdownFiles.length === 0) {
      console.warn('마크다운 파일을 찾을 수 없었습니다.');
      return [];
    }
    
    // 각 마크다운 파일 처리
    for (const file of markdownFiles) {
      debugLog(`처리 중: ${file.path}`);
      const content = await getMarkdownContent(file.path);
      debugLog(`content: ${content}`);
      
      if (content) {
        const { metadata, content: markdownContent } = parseMarkdown(content);
        
        // 파일 이름에서 slug 추출 (예: hello-world.md -> hello-world)
        const slug = file.name.replace('.md', '');
        
        // 카테고리 추출 (파일 경로에서 추출하거나 메타데이터에서 가져오기)
        let category = metadata.category || DEFAULT_CATEGORY;
        
        // 경로에서 카테고리 추출 시도 (예: content/javascript/file.md -> javascript)
        if (!metadata.category && file.path.includes('/')) {
          const pathParts = file.path.split('/');
          if (pathParts.length > 2) {
            // 경로의 중간 부분을 카테고리로 사용
            category = pathParts[pathParts.length - 2];
          }
        }
        
        // Post 객체 생성
        const post: Post = {
          title: metadata.title || file.name.replace('.md', ''),
          description: metadata.description || '',
          createdAt: metadata.date || new Date().toISOString().split('T')[0],
          tags: Array.isArray(metadata.tags) 
            ? metadata.tags 
            : (metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : []),
          slug,
          category,
          path: `/blog/${category}/${slug}`,
          content: markdownContent
        };
        
        debugLog(`포스트 처리 완료: ${post.title}`);
        posts.push(post);
      }
    }
    
    // 날짜 기준 내림차순 정렬
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    debugLog(`총 ${sortedPosts.length}개의 포스트가 로드되었습니다.`);
    return sortedPosts;
    
  } catch (error) {
    console.error('GitHub에서 블로그 포스트를 가져오는데 실패했습니다:', error);
    return [];
  }
} 