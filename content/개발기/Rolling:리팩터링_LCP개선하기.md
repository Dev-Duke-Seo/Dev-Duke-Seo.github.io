---
title: LCP 최적화 리팩토링: 23 초 → 1.3 초
description: 외부 이미지 preconnect·preload, 이미지 설정 개선으로 LCP를 23 초에서 1.3 초까지 단축한 과정.
release: true
date: 2025-05-13
tags:
---

## App Router 기반 Next.js 프로젝트에서 LCP가 23 초까지 지연되는 문제를 발견했다.

<img width="765" alt="Image" src="https://github.com/user-attachments/assets/13895f7d-f8ff-4f85-a4ec-1faef766603a" />

라이트하우스로 기존에 테스트를 하기는했었는데, 데스크탑으로만 실험을 했을때는 80점 이상의 점수라 문제를 못 느꼈다.
살짝 느린감이 있어 백엔드 쿼리 최적화를 염두에 먼저 두고 있었는데, 모바일버전 테스트를 해보고 나서야 그 심각성을 체감하고 문제를 개선해야겠다고 생각했다.


## 1. 외부 이미지 도메인 사전 연결 (bb05921)

`picsum.photos`에서 이미지를 내려받을 때 DNS 조회·TCP 핸드셰이크가 지연을 유발할 수 있다고 생각,
`layout.tsx`의 `<head>`에 사전 연결 링크를 추가해 브라우저가 최초 페인트 이전에 연결을 준비하도록 했다.

```tsx
// app/_document.tsx
<head>
  …
  <link rel="preconnect" href="https://picsum.photos" crossOrigin="" />
  <link rel="dns-prefetch" href="https://picsum.photos" />
</head>
```

## 2. 핵심 카드 이미지 Preload (72b47c6)

App Router 서버 컴포넌트에서 첫 fetch 직후 상위 카드 이미지를 우선 로드하도록 구현했다.
Card에 index prop을 추가하고, 인기 0–3·최근 0–1 카드에 <Image priority>를 적용했다.

```tsx
interface CardProps {
  index: number;
  listType: 'popular' | 'recent';  // 카드 목록 유형 (인기/최근 등)
  // ...그 외 props...
}

const Card: React.FC<CardProps> = ({ index, listType, ...props }) => {
  // 인기 리스트 상위 4개 또는 최근 리스트 상위 2개일 경우 preload
  const isPreload =
    (listType === 'popular' && index < 4) ||
    (listType === 'recent' && index < 2);

  return (
    <div className="card">
      <Image 
        src={props.imageUrl} 
        alt={props.title} 
        priority={isPreload} 
        // ...기타 속성...
      />
      {/* ... 나머지 콘텐츠 ... */}
    </div>
  );
};
```
 Next.js에서 Image priority는 해당 이미지를 중요 리소스로 간주하여 HTML <head>에 프리로드 링크를 생성해주므로, 개발자가 수동으로 <link rel="preload" ...>를 삽입하지 않아도 브라우저가 이미지를 미리 불러오게된다. (* 1번의 사항과 중복된 조치. 둘 중에 하나는 걷어내야한다.)

## 3. Card 컴포넌트 구조 및 스타일 개선 (커밋 5fd6e8c)

 불필요하게 중첩된 요소를 제거하고, 보다 단순한 구조로 변경하여 브라우저가 해당 컴포넌트를 더 효율적으로 렌더링하도록 해보았다.

```tsx
// 개선 전 구조 (예시)
<div className="card-wrapper">
  <div className="card-container">
    <div className="card-image-wrapper">
      <Image src={imageUrl} alt={title} />
    </div>
    <div className="card-content-wrapper">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
</div>
```
위 구조에서는 card-wrapper, card-container 등 불필요하게 계층화된 래퍼가 있어 DOM 구조가 복잡했다. 이러한 중첩은 초기 페인트 시 불필요한 레이아웃 계산을 증가시키고, CSS 선택자 역시 길어져 성능에 불리할 수 있다고 생각. 개선 후에는 구조를 단순화하여 불필요한 래퍼를 제거하고 시맨틱하게 구성했다.

예를 들어 다음과 같이 변경:
```tsx
// 개선 후 구조 (예시)
<div className="card">
  <Image src={imageUrl} alt={title} className="card-image" />
  <div className="card-content">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
</div>
```

## 4. Next.js 이미지 설정 조정 (e96b13c)
- 뷰포트별 최적 크기 이미지만 전송하여 전송 바이트를 감소시켰다.
- minimumCacheTTL로 변환 이미지를 CDN에 캐싱해 재요청 속도를 향상시켰다.
```ts
export default {
  images: {
    deviceSizes: [360, 640, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 60,      // 60 초 캐시
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
```
- deviceSizes: 서비스 레이아웃에 맞춰 자주 쓰이는 뷰포트 너비를 지정했다. Next.js는 이 값을 참고하여 <Image> 컴포넌트에 전달된 이미지가 반응형일 때 (예: layout='responsive' 또는 fill 등) 적절한 크기의 이미지를 자동으로 선택한다. 불필요하게 너무 큰 이미지를 불러오지 않도록 함으로써 초기 로드 시간을 단축할 수 있다. 예를 들어 모바일 기기에서는 작은 이미지로 대체되어 전송 바이트량이 줄어들어 LCP가 개선된다.
- imageSizes: 고정 크기 혹은 아이콘 등에 사용될 작은 이미지 사이즈들을 지정했다. 이것도 Next.js 이미지 로더가 생성하는 추가 사이즈 목록을 최적화하는 설정이다. 필요하지 않은 이미지 크기는 생성/로드하지 않도록 하여 성능을 높입니다.
- minimumCacheTTL: 원격 이미지를 Next.js가 변환하여 캐싱할 때의 **최소 캐시 유효 시간(초)**을 지정. 위 설정에서는 60초로 설정했는데, 이는 이미지 변환 결과를 최소 60초간 재사용하여 잦은 재요청을 피하도록 했다. 운영 환경에서는 이 값을 더 크게 설정해두면 (예를 들어 24시간인 86400초 등) CDN 캐시를 통해 반복 조회 시 이미지 로딩 속도가 매우 빨라지는 효과가 있을 수 있다. 캐시가 효율적으로 동작하면 사용자가 같은 이미지를 볼 때 서버 응답 지연이 거의 없으므로 LCP에도 긍정적인 영향을 준다.


<img width="719" alt="Image" src="https://github.com/user-attachments/assets/84062894-b189-46fe-bf81-30cecbf5e746" />


지표 | 개선 전 | 개선 후
-- | -- | --
LCP | 23 s | 1.3 s

## 결론

preconnect, Image priority, 이미지 크기·캐시 설정만으로 22 초 이상의 LCP 지연을 해소할 수 있었다. 외부 리소스 연결·중요 이미지 선행 로딩·불필요 DOM 단순화가 성능 최적화의 핵심임을 확인했다.  앞으로도 웹 퍼포먼스 최적화를 진행할 때, 네트워크 연결 최적화(preconnect/prefetch), 중요 리소스 우선 로드(priority/preload), 그리고 프레임워크가 제공하는 성능 기능(예: Next.js 이미지 최적화) 등을 적극 활용해야겠다는 교훈을 얻었다.