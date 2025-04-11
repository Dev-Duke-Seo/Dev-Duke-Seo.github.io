/**
 * 디버그 로그 출력 함수
 */

type LogMethod = 'log' | 'error' | 'warn' | 'info';

const createGithubLogger = (method: LogMethod) => (...args: any[]): void => {
	if (process.env.NODE_ENV === "development") {
		console[method]("[GitHub API]", ...args);
	}
};

export const APILog = createGithubLogger('log');
export const APIError = createGithubLogger('error');
export const APIWarn = createGithubLogger('warn');
export const APIInfo = createGithubLogger('info');





