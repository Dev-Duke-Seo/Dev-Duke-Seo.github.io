import { githubRawAPI } from "./axiosInstances";
import { GitHubConfig } from "config/github";
const { REPO_OWNER, REPO_NAME, BRANCH, CONTENT_ROOT } = GitHubConfig;

export async function downloadMarkdown(path: string) {
	const URL = `${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${path}`;
    const encodedPath = encodeURIComponent(URL);
	const response = await githubRawAPI.get(encodedPath);

	return response;
}
