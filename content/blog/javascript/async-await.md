---
title: "JavaScript의 비동기 처리: async/await 완전 정복"
description: "JavaScript에서 비동기 코드를 쉽게 작성하는 방법"
createdAt: "2023-03-23"
tags: ["javascript", "async", "promises"]
---

# JavaScript의 비동기 처리: async/await 완전 정복

JavaScript에서 비동기 작업을 처리하는 여러 방법 중 가장 현대적인 접근법인 async/await에 대해 알아보겠습니다.

## Promise의 진화

비동기 처리 방식은 다음과 같이 진화해왔습니다:

1. 콜백 함수 (Callback Hell)
2. Promise 체이닝
3. async/await

## async/await 기본 문법

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
  }
}
```

## 병렬 처리하기

여러 비동기 작업을 병렬로 처리하려면 `Promise.all`을 사용합니다:

```javascript
async function fetchMultipleData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('https://api.example.com/users').then(res => res.json()),
      fetch('https://api.example.com/posts').then(res => res.json()),
      fetch('https://api.example.com/comments').then(res => res.json())
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
  }
}
``` 