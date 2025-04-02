// GitHub 설정
export const GitHubConfig = {
  // GitHub API URL
  API_BASE: 'https://api.github.com',
  RAW_CONTENT: 'https://raw.githubusercontent.com',
  
  // 저장소 정보 (API 응답 기준으로 업데이트)
  REPO_OWNER: 'Dev-Duke-Seo', // GitHub 사용자 이름
  REPO_NAME: 'Dev-Duke-Seo.github.io', // 블로그 콘텐츠 저장소 이름
  BRANCH: 'main', // 저장소 브랜치
  
  // 콘텐츠 경로
  CONTENT_PATH: 'content', // 포스트가 저장된 경로
  
  // 대체 경로 (기본 경로에 콘텐츠가 없을 경우 시도할 경로)
  ALTERNATIVE_PATHS: [
    'content',
    'posts',
    '_posts',
    'blog',
    '' // 루트 경로
  ],
  
  // 포스트 메타데이터 설정
  DEFAULT_CATEGORY: 'uncategorized',
  DATE_FORMAT: 'YYYY-MM-DD', // 날짜 형식
  
  // 디버그 모드
  DEBUG: true // 개발 환경에서는 true, 프로덕션에서는 false로 설정
}; 