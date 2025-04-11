import { log } from "console";

const DEFAULT_METADATA = {
	title: "Untitled",
	category: "",
	tags: [],
	date: null,
	description: "",
} as const;

// 날짜 검증을 위한 유틸리티 함수 추가
function isValidDateFormat(dateStr: string): boolean {
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	if (!regex.test(dateStr)) return false;

	const [year, month, day] = dateStr.split("-").map(Number);
	const date = new Date(year, month - 1, day);

	return (
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day
	);
}

// 프론트매터 추출 함수 (실제 구현에서는 gray-matter 같은 라이브러리 사용 권장)
export function extractFrontMatter(content: string) {
	const frontMatterRegex = /---\n([\s\S]*?)\n---/;
	const match = content.match(frontMatterRegex);

	let metadata: Record<string, any> = { ...DEFAULT_METADATA };
	let contentBody = content;

	if (match) {
		const frontMatter = match[1];
		metadata = { ...DEFAULT_METADATA };
		
		let currentKey: string | null = null;
		let isInArray = false;
		const lines = frontMatter.split("\n");

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (!line) continue;

			// 새로운 키 확인
			if (!line.startsWith("-") && line.includes(":")) {
				const [key, ...valueParts] = line.split(":");
				currentKey = key.trim();
				const value = valueParts.join(":").trim();
				
				if (value) {
					metadata[currentKey] = value;
				} else {
					// 값이 없으면 다음 라인부터 배열 시작
					isInArray = true;
					metadata[currentKey] = [];
				}
			} 
			// 배열 항목 처리
			else if (line.startsWith("-") && isInArray && currentKey) {
				const value = line.slice(1).trim();
				metadata[currentKey].push(value);
			}
		}

		// 프론트매터 제거하고 실제 컨텐츠만 추출
		contentBody = content.replace(match[0], "").trim();
	}

	// 날짜 처리
	if (metadata.date) {
		if (isValidDateFormat(metadata.date)) {
			metadata.date = new Date(metadata.date);
		} else {
			console.warn(`Invalid date format: ${metadata.date}. Expected format: YYYY-MM-DD`);
			metadata.date = null;
		}
	}

	return {
		metadata,
		content: contentBody,
	};
}
