import { loadGitHubPosts } from "../utils/githubLoader";
import { Post, ContentTree } from "../types";

let loadedPosts: Post[] = [];
let contentTree: ContentTree = {};
let isLoaded = false;

/**
 * GitHub에서 포스트 데이터를 불러오는 함수
 */
export async function loadPosts(): Promise<Post[]> {
	if (isLoaded) return loadedPosts;

	try {
		// GitHub에서 포스트 가져오기
		const result = await loadGitHubPosts();
		loadedPosts = result.posts;
		contentTree = result.contentTree;
		isLoaded = true;

		return loadedPosts;
	} catch (error) {
		console.error("포스트 로드 중 오류 발생:", error);
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
 * 로드된 콘텐츠 트리 반환
 */
export function getContentTree(): ContentTree {
	return contentTree;
}

/**
 * 로드 상태 확인
 */
export function isPostsLoaded(): boolean {
	return isLoaded;
}
