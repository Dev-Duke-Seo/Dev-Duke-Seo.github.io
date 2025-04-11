import { APILog } from "@/utils/loggers/apiLogger";
import { GitHubConfig } from "config/github";
import { githubAPI } from "./axiosInstances";
const { REPO_OWNER, REPO_NAME, BRANCH } = GitHubConfig;

/**
 * GitHub 저장소에서 파일 목록을 가져오는 함수
 * @param path 저장소 내 경로
 * @returns 파일 목록
 */


export async function searchContents(path = ""): Promise<any[]> {
	const url = `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`;
	// 캐시에서 먼저 확인

	APILog(`API 요청: ${url}`);

	const response = await githubAPI.get(url);
	const result = Array.isArray(response.data) ? response.data : [response.data];

	APILog(`${path} 경로에서 ${result.length}개 항목을 찾았습니다.`);

	return result;
}
