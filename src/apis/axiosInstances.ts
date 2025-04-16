import { GitHubConfig } from "config/github";
import axios, { AxiosInstance } from "axios";
import { handleAPIErrors } from "./handleAPIErrors";
// GitHub API URL
const { API_BASE, RAW_CONTENT } = GitHubConfig;

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
/**
 * GitHub API 요청을 위한 axios 인스턴스
 */
export const githubAPI: AxiosInstance = axios.create({
	baseURL: API_BASE,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/vnd.github.v3+json",
		Authorization: `${GITHUB_TOKEN}`,
	},
});

/**
 * GitHub Raw Content 요청을 위한 axios 인스턴스
 */
export const githubRawAPI: AxiosInstance = axios.create({
	baseURL: RAW_CONTENT,
	timeout: 10000,
	// 모든 헤더 제거 - raw 콘텐츠는 보통 인증 없이도 접근 가능
});

// 공통 에러 처리 인터셉터 추가
const addErrorInterceptor = (instance: AxiosInstance) => {
	instance.interceptors.response.use(
		(response) => response,
		(error) => {
			return Promise.reject(handleAPIErrors(error));
		}
	);
};

addErrorInterceptor(githubAPI);
addErrorInterceptor(githubRawAPI);
