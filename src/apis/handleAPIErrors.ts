
import { APIError } from "@/utils/loggers/apiLogger";
import { AxiosError, isAxiosError } from "axios";

/**
 * API 에러 처리를 위한 미들웨어
 * @param error Axios 에러 객체
 * @throws 처리된 에러
 */

export function handleAPIErrors(error: AxiosError): never {
	if (isAxiosError(error)) {
		const { response } = error;
		
		if (response) {
			// 상태 코드별 처리
			if (response.status === 404) {
				APIError(`GitHub 리소스를 찾을 수 없습니다: ${response.config.url}`);
				throw new Error(`GitHub 리소스를 찾을 수 없습니다: ${response.config.url}`);
			}
			
			// API 제한 확인
			if (response.status === 403) {
				const rateLimitRemaining = response.headers['x-ratelimit-remaining'];
				const rateLimitReset = response.headers['x-ratelimit-reset'];
				
				if (rateLimitRemaining === "0") {
					const resetDate = new Date(Number(rateLimitReset) * 1000);
					const errorMessage = `GitHub API 제한에 도달했습니다. 제한이 재설정되는 시간: ${resetDate.toLocaleString()}`;
					const customError = new Error(errorMessage);
					// 에러 객체에 추가 정보 저장
					(customError as Error & { rateLimitReset: Date }).rateLimitReset = resetDate;
					APIError(errorMessage);
					throw customError;
				}
			}
			
			throw new Error(`GitHub API 요청 실패: ${response.status} - ${response.statusText}`);
		}
	}
	
	throw error;
}

