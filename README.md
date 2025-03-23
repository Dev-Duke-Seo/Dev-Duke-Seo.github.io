# 개발자의 기록 - React 블로그

이 프로젝트는 React를 사용하여 구현한 마크다운 기반 블로그입니다.

## 주요 기능

- 마크다운으로 작성된 문서 렌더링
- 폴더 구조 기반 카테고리/네비게이션 자동 생성
- 생성일 기준 최신 글 정렬
- 태그 기반 검색 기능
- 모바일 반응형 디자인

## 기술 스택

- React
- React Router
- gray-matter (마크다운 메타데이터 파싱)
- remark (마크다운 HTML 변환)
- date-fns (날짜 처리)

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

## 블로그 포스트 작성법

`content/blog/카테고리/파일명.md` 형식으로 마크다운 파일을 생성합니다.

각 마크다운 파일은 다음 형식의 메타데이터가 필요합니다:

```md
---
title: "포스트 제목"
description: "포스트 설명"
createdAt: "YYYY-MM-DD"
tags: ["태그1", "태그2"]
---

# 본문 내용
```

## 라이센스

MIT
