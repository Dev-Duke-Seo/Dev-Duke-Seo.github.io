import { Post, FileNode, ContentTree } from '../types';
import { GitHubConfig } from '../config/github';
import { getFromCache, saveToCache } from '../services/CacheService';

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
  const cacheKey = `github_files_${REPO_OWNER}_${REPO_NAME}_${path}`;
  
  // 캐시에서 먼저 확인
  const cachedData = await getFromCache<any[]>(cacheKey);
  if (cachedData) {
    debugLog(`캐시에서 파일 목록 로드: ${path}`);
    return cachedData;
  }
  
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
    const result = Array.isArray(data) ? data : [data];
    
    // 결과 캐싱
    await saveToCache(cacheKey, result);
    
    debugLog(`${path} 경로에서 ${result.length}개 항목을 찾았습니다.`);
    return result;
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
  const cacheKey = `github_content_${REPO_OWNER}_${REPO_NAME}_${path}`;
  
  // 캐시에서 먼저 확인
  const cachedContent = await getFromCache<string>(cacheKey);
  if (cachedContent) {
    debugLog(`캐시에서 내용 로드: ${path}`);
    return cachedContent;
  }
  
  debugLog(`path: ${path}`);
  const url = `${RAW_CONTENT}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${CONTENT_PATH}/${path}`;
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
    
    // 결과 캐싱
    await saveToCache(cacheKey, content);
    
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
      let value = line.slice(colonIndex + 1).trim();
      
      // 쉼표로 끝나는 값 정리
      if (value.endsWith(',')) {
        value = value.slice(0, -1);
      }
      
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
 * 파일 경로에서 카테고리와 폴더 경로를 추출하는 함수
 * @param path 파일 경로
 * @param basePath 기본 경로
 * @param defaultCategory 기본 카테고리
 * @returns 카테고리와 폴더 경로
 */
function extractCategoryAndFolderPath(path: string, basePath: string, defaultCategory: string): { category: string, folderPath: string[] } {
  // 기본 경로를 제거한 상대 경로 구하기
  const relativePath = path.startsWith(basePath) 
    ? path.substring(basePath.length) 
    : path;
  
  // 상대 경로를 폴더로 분리
  const pathParts = relativePath.split('/').filter(p => p.length > 0);
  
  // 첫 번째 부분을 카테고리로, 나머지를 폴더 경로로 사용
  if (pathParts.length > 0) {
    return {
      category: pathParts[0],
      folderPath: pathParts.slice(1, -1) // 마지막 부분(파일명)을 제외한 경로
    };
  }
  
  return {
    category: defaultCategory,
    folderPath: []
  };
}

/**
 * 재귀적으로 디렉토리를 탐색하여 파일 노드를 구성하는 함수
 * @param rootPath 기본 경로
 * @param currentPath 현재 탐색 경로
 * @returns 파일 노드 배열
 */
async function buildFileTree(rootPath: string, currentPath: string): Promise<FileNode[]> {
  const files = await getFilesFromGitHub(currentPath);
  const nodes: FileNode[] = [];
  
  for (const file of files) {
    const node: FileNode = {
      name: file.name,
      path: file.path,
      type: file.type === 'dir' ? 'directory' : 'file'
    };
    
    if (file.type === 'dir') {
      // 재귀적으로 하위 디렉토리 탐색
      node.children = await buildFileTree(rootPath, file.path);
    } else if (file.name.endsWith('.md')) {
      // 마크다운 파일 처리 - 실제 내용은 로드하지 않음
      const slug = file.name.replace('.md', '');
      
      // 경로에서 카테고리 추출
      const { category, folderPath } = extractCategoryAndFolderPath(file.path, rootPath, DEFAULT_CATEGORY);
      
      // Post 객체 생성 (content 없이 메타데이터만)
      const post: Post = {
        title: slug, // 기본값으로 파일명 사용
        description: '',
        createdAt: new Date().toISOString().split('T')[0], // 기본 날짜
        tags: [],
        slug,
        category,
        path: `/blog/${category}/${folderPath.join('/')}/${slug}`.replace(/\/+/g, '/'),
        content: '', // 내용은 비워둠
        contentLoaded: false // 내용이 로드되지 않았음을 표시
      };
      
      node.post = post;
    }
    
    nodes.push(node);
  }
  
  return nodes;
}

/**
 * 파일 노드를 카테고리별로 분류하는 함수
 * @param nodes 파일 노드 배열
 * @param contentTree 컨텐츠 트리
 * @param basePath 기본 경로
 */
function categorizeNodes(nodes: FileNode[], contentTree: ContentTree, basePath: string): void {
  for (const node of nodes) {
    if (node.type === 'directory') {
      // 디렉토리인 경우 하위 노드 처리
      if (node.children && node.children.length > 0) {
        categorizeNodes(node.children, contentTree, basePath);
      }
    } else if (node.post) {
      // 파일에 연결된 포스트가 있는 경우
      const { category } = extractCategoryAndFolderPath(node.path, basePath, DEFAULT_CATEGORY);
      
      if (!contentTree[category]) {
        contentTree[category] = [];
      }
      
      // 현재 파일 노드 경로를 기반으로 트리 구성
      let currentNodes = contentTree[category];
      const { folderPath } = extractCategoryAndFolderPath(node.path, basePath, DEFAULT_CATEGORY);
      
      // 폴더 경로를 따라 노드 탐색 및 생성
      let currentPath = basePath;
      for (const folder of folderPath) {
        currentPath = `${currentPath}/${folder}`;
        
        // 폴더 노드 찾기 또는 생성
        let folderNode = currentNodes.find(n => n.name === folder && n.type === 'directory');
        if (!folderNode) {
          folderNode = {
            name: folder,
            path: currentPath,
            type: 'directory',
            children: []
          };
          currentNodes.push(folderNode);
        }
        
        if (!folderNode.children) {
          folderNode.children = [];
        }
        
        currentNodes = folderNode.children;
      }
      
      // 파일 노드 추가
      currentNodes.push(node);
    }
  }
}

/**
 * 재귀적으로 파일 노드 배열에서 모든 포스트를 수집하는 함수
 * @param nodes 파일 노드 배열
 * @param postsArray 수집할 포스트 배열
 */
function collectPosts(nodes: FileNode[], postsArray: Post[]): void {
  for (const node of nodes) {
    if (node.post) {
      postsArray.push(node.post);
    }
    
    if (node.children && node.children.length > 0) {
      collectPosts(node.children, postsArray);
    }
  }
}

/**
 * GitHub 저장소에서 블로그 포스트 목록을 가져와서 처리하는 함수
 * @returns 처리된 콘텐츠 트리와 포스트 배열
 */
export async function loadGitHubPosts(): Promise<{ contentTree: ContentTree, posts: Post[] }> {
  const posts: Post[] = [];
  const contentTree: ContentTree = {};
  
  debugLog(`GitHub에서 블로그 포스트 로드 시작 - 저장소: ${REPO_OWNER}/${REPO_NAME}`);
  
  try {
    // 여러 경로 시도
    const { successPath } = await tryMultiplePaths();
    
    if (!successPath) {
      console.warn('모든 경로에서 파일을 찾을 수 없었습니다.');
      return { contentTree, posts };
    }
    
    // 파일 트리 구성
    const fileNodes = await buildFileTree(successPath, successPath);
    
    // 노드를 카테고리별로 분류
    categorizeNodes(fileNodes, contentTree, successPath);
    
    // 모든 카테고리의 노드에서 포스트 수집
    Object.values(contentTree).forEach(nodes => {
      collectPosts(nodes, posts);
    });
    
    // 날짜 기준 내림차순 정렬
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    debugLog(`총 ${sortedPosts.length}개의 포스트가 로드되었습니다.`);
    return { contentTree, posts: sortedPosts };
    
  } catch (error) {
    console.error('GitHub에서 블로그 포스트를 가져오는데 실패했습니다:', error);
    return { contentTree, posts };
  }
} 