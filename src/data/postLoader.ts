import { loadGitHubPosts } from '../utils/githubLoader';
import { Post } from '../types';

let loadedPosts: Post[] = [];
let isLoaded = false;

/**
 * GitHub에서 포스트 데이터를 불러오는 함수
 */
export async function loadPosts(): Promise<Post[]> {
  if (isLoaded) return loadedPosts;
  
  try {
    // GitHub에서 포스트 가져오기
    loadedPosts = await loadGitHubPosts();
    isLoaded = true;

    return loadedPosts;
  } catch (error) {
    console.error('포스트 로드 중 오류 발생:', error);
    return [];
  }
}

/**
 * 로드된 포스트 데이터 반환
 */
export function getLoadedPosts(): Post[] {
  return loadedPosts;
}

/**
 * 로드 상태 확인
 */
export function isPostsLoaded(): boolean {
  return isLoaded;
} 