---
title: Rolling: 리팩터링 구조개선기
description: 무한 스크롤 로직을 훅으로 통합하기 전후 코드를 함께 보여주며 문제 인식, 대안 검토, 선택 이유를 기록한다.
release: true
date: 2024-04-28
tags: [refactoring, hooks, infinite-scroll]
---

## 문제 인식_1: 반복에서 벗어나기

초기 List와 Post 상세 페이지에서는 매번 다음과 같은 코드를 복붙했다.컴포넌트가 UI 렌더링 이외에 스크롤 감지 · fetch 호출 · cleanup까지 책임지고 있어 코드가 복잡해졌다.

```tsx
// Before
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) fetchNextPage();
  });
  observer.observe(loadMoreRef.current!);
  return () => observer.disconnect();
}, [fetchNextPage]);
```

## 고려한 대안

- Utility 함수로 추출하기
- HOC(Higher-order Component)로 감싸기
- Custom Hook으로 재구성하기

-> HOC는 JSX 구조 복잡화, Utility는 cleanup 관리 번거로움.
-> Custom Hook은 React 패턴에 자연스럽고, cleanup도 useEffect로 깔끔히 구현 가능했다.

## 선택 후 구현

```tsx
// After: hooks/common/useInfiniteScroll.ts
import { useEffect, RefObject } from 'react';

export function useInfiniteScroll(
  ref: RefObject<HTMLElement>,
  onReachEnd: () => void
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onReachEnd();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, onReachEnd]);
}
```

## 적용 결과

```tsx
// 호출부 예시 (List 페이지)
const loadMoreRef = useRef<HTMLDivElement>(null);
const { data, fetchNextPage } = useRecipientsListInfinite('recent');

useInfiniteScroll(loadMoreRef, fetchNextPage);
```

호출부가 한 줄로 줄었으며, 페이지 컴포넌트는 오로지 UI만 담당하게 되었다.

## 문제 인식_2: 데이터 페칭 로직 훅으로 추출

여러 페이지에 useInfiniteQuery 호출이 중복되었고, 페이지마다 옵션이나 키가 달라 일관성 유지가 어려웠다.

```tsx
// Before
const { data, fetchNextPage } = useInfiniteQuery(
  ['recipients', sort],
  ({ pageParam = 0 }) => api.getRecipients({ sort, offset: pageParam }),
  {
    getNextPageParam: last => last.nextOffset,
    staleTime: 300000,
  }
);  
```

## 고려한 대안

- 공통 함수에 옵션 전달
- 페이지별 별도 훅 유지
- 범용 훅 하나로 통합

-> 별도 훅 유지 시 관리 포인트 증가, 공통 함수는 옵션 확장 번거로움.
-> 범용 훅은 옵션 전달로 유연성과 일관성 동시 확보 가능.

## 선택 후 구현

```tsx
// After: queries/useRecipientsListInfinite.ts
import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { api } from '@/apis/axios';

export function useRecipientsListInfinite(
  sort: 'popular' | 'recent',
  options?: UseInfiniteQueryOptions
) {
  return useInfiniteQuery(
    ['recipients', sort],
    ({ pageParam = 0 }) => api.getRecipients({ sort, offset: pageParam }),
    {
      getNextPageParam: last => last.nextOffset,
      ...options,
    }
  );
}
```

## 적용 결과

```tsx
// 호출부 예시 (Post 상세 페이지)
const { data, fetchNextPage } = useRecipientsListInfinite('popular', {
  staleTime: 100000,
});

```
options로 개별 페이지 요구사항도 유연하게 처리하며, 기본 로직은 하나로 통합되었다.

## 문제 인식_3:  컴포넌트 단일 책임

MessageCardListWithModal 컴포넌트가 리스트 렌더링, 클릭 핸들링, 모달 상태 관리, 모달 렌더링을 모두 수행하여 복합 책임이 되었다.

```tsx
// Before
export function MessageCardListWithModal({ messages }) {
  const [selected, setSelected] = useState<Message | null>(null);

  function handleClick(msg: Message) { setSelected(msg); }
  function handleClose() { setSelected(null); }

  return (
    <>
      <ul>
        {messages.map(msg => (
          <MessageCard key={msg.id} message={msg} onClick={() => handleClick(msg)} />
        ))}
      </ul>
      {selected && <Modal onClose={handleClose}><CardModal message={selected} /></Modal>}
    </>
  );
}
```

## 고려한 대안

- props로 상태·핸들러 내려주기
- Context로 전역 상태 관리
- 리스트·모달 컴포넌트 분리

-> Context는 오버헤드가 크고, props 방식은 충분히 단순하여 컴포넌트를 분리하기로 결정.

##  선택 후 구현

```tsx
// After: MessageList.tsx
export function MessageList({ messages, onSelect }) {
  return (
    <ul>
      {messages.map(msg => (
        <MessageCard key={msg.id} message={msg} onClick={() => onSelect(msg)} />
      ))}
    </ul>
  );
}

// After: MessageModalContainer.tsx
export function MessageModalContainer({ selected, onClose }) {
  if (!selected) return null;
  return (
    <Modal onClose={onClose}>
      <CardModal message={selected} />
    </Modal>
  );
}
```

## 적용 결과

MessageList는 순수 렌더링만 담당
MessageModalContainer는 모달 상태 관리 및 렌더링만 담당

단일 책임 원칙이 준수되었다.


## 문제 인식_4: 공통 유틸·폼 훅 도입
다음 로직이 여러 컴포넌트에 중복되었다.

```tsx
// Before: 메시지 파싱
let content;
try { content = JSON.parse(rawText); }
catch { content = [{ type: 'paragraph', children: [{ text: rawText }] }]; }

// Before: 날짜 포맷팅
const date = new Date(dateStr);
const formatted = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
```

## 고려한 대안

- 컴포넌트마다 유틸 함수 임포트
- 공통 라이브러리 도입
- 유틸 함수·커스텀 훅으로 분리

-> 라이브러리 도입은 무거워 보였으며, 훅과 유틸 함수로 분리하는 방법이 가장 합리적이라고 판단했다.
공통 라이브러리 도입

```tsx
// After: utils/messageUtils.ts
export function parseMessageContent(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return [{ type: 'paragraph', children: [{ text: raw }] }];
  }
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}

// After: hooks/pages/useNewRecipientForm.ts
import { useForm } from 'react-hook-form';
import { useTab } from '@/hooks/common/useTab';

export function useNewRecipientForm() {
  const { register, handleSubmit, formState } = useForm();
  const [tab, setTab] = useTab('color');

  const onSubmit = handleSubmit(async data => {
    await postRecipient({ ...data, type: tab });
  });

  return { register, formState, tab, setTab, onSubmit };
}
```

## 적용 결과

중복 파싱·포맷팅 로직이 하나의 모듈로 중앙화됨
폼 관련 로직이 훅으로 이동하여 페이지 컴포넌트가 가볍게 유지되었다.
