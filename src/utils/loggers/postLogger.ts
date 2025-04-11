/**
 * 디버그 로그 출력 함수
 */

type LogMethod = 'log' | 'error' | 'warn' | 'info';

const createPostLogger = (method: LogMethod) => (...args: any[]): void => {
	if (process.env.NODE_ENV === "development") {
		console[method]("[Post Loader]", ...args);
	}
};

export const PostLog = createPostLogger('log');
export const PostError = createPostLogger('error');
export const PostWarn = createPostLogger('warn');
export const PostInfo = createPostLogger('info');





