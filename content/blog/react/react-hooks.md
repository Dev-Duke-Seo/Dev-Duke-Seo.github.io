---
title: "React Hooks 완벽 가이드"
description: "React Hooks의 개념과 활용법을 알아봅니다"
createdAt: "2023-03-22"
tags: ["react", "hooks", "frontend"]
---

# React Hooks 완벽 가이드

React Hooks는 함수형 컴포넌트에서 상태 관리와 생명주기 기능을 사용할 수 있게 해주는 기능입니다.
이 포스트에서는 주요 Hooks의 사용법과 활용 예시를 살펴보겠습니다.

## 기본 Hooks

### useState

```jsx
const [count, setCount] = useState(0);
```

상태를 관리하는 가장 기본적인 Hook입니다.

### useEffect

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

컴포넌트의 생명주기와 관련된 side effect를 처리합니다.

## 커스텀 Hooks 만들기

자신만의 Hook을 만들어 로직을 재사용할 수 있습니다.

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    
    window.addEventListener('resize', updateSize);
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return size;
}
``` 