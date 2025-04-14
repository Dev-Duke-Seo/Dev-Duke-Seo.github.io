---
title: Parent는 Child를 리렌더링하지 않는다
description: withFormat'에 대한 나의 생각
release: false
date: 2025-01-17
tags:
  - React
  - rendering
  - component
  - rerendering
---
# Parent는 Child를 리렌더링하지 않는다?

일반적으로 리액트를 학습하며 **Parent 컴포넌트가 상태가 변경되면 Children 컴포넌트도 리렌더링 된다**고 학습한다. 그러나 이는 부분적으로 맞다. 부모 컴포넌트의 상태가 변경이 되더라도 자식 컴포넌트가 리렌더링되지 않는 경우가 있다.

```jsx
import React, { useState } from "react";

const Parent = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<button onClick={() => setCount(count + 1)}>증가</button>
			<Child />
		</div>
	);
};

const Child = () => {
	console.log("Child render");
	return <div>Child</div>;
};
```

이와 같은 코드를 작성하면 부모 컴포넌트인 `Parent` 컴포넌트의 상태가 변경되더라도 자식 컴포넌트는 우리가 아는대로 리렌더링 될 것이다.

그러나 아래와 같이 자식 컴포넌트를 작성하면 부모의 상태가 변경되도 자식 컴포넌트는 리렌더링되지 않는다.

```jsx
//
import React from "react";

const Parent = () => {
	const [count, setCount] = React.useState(0);

	return (
		<div>
			<button onClick={() => setCount(count + 1)}>증가</button>
			<children />
		</div>
	);
};

const Page = () => {
	//코드 중략
	return (
		<div>
			<Parent>
				<Child />
			</Parent>
		</div>
	);
};
```

위와 같이 코드가 작성되었다면, 어떤 이유로 Parent 컴포넌트의 상태가 변경되더라도 Child 컴포넌트는 리렌더링되지 않는다. 말 그대로 Child 컴포넌트를 Children으로 작성했는데, Parent가 리렌더링 되어도 Children은 리렌더링되지 않는다니? 어떻게 된 일일까?

이를 설명하기 위해 우리는 Owner 컴포넌트에 대해 알필요가 있다.

## Owner 컴포넌트란 무엇인가?

Owner 컴포넌트는 React에서 자식 컴포넌트를 포함하고, 그 자식 컴포넌트의 상태와 생명주기를 관리하는 역할을 하는 컴포넌트다. Owner 컴포넌트는 자식 컴포넌트에 필요한 데이터를 props로 전달하고, 자식 컴포넌트가 필요로 하는 상태를 소유하고 있다.

Owner 컴포넌트는 자식 컴포넌트의 렌더링을 제어할 수 있고, 자식 컴포넌트가 자신의 상태를 직접적으로 관리하지 않고, Owner 컴포넌트에 의존하게 된다. 이로 인해, 자식 컴포넌트는 Owner 컴포넌트의 상태 변화에 따라 리렌더링될 수 있다.

우리가 알던 Parent 컴포넌트와 크게 다르지 않고, 다소 헷갈리게 생각될 수 있다.

이는 우리가 Parent 컴포넌트를 상태를 소유한 주체이자 위계질서상 Children 컴포넌트와 위계질서상 상위에 존재하는 컴포넌트로서의 용어로 혼용해서 사용했기 때문인 것 같다.

### 1. 결국 Owner 컴포넌트는 위계질서상은 Parent와 같이 Childe컴포넌트의 상위에 존재하며

### 2. Child 컴포넌트가 의존하는 상태를 알고있고 관리할 수 있는 컴포넌트를 의미한다.

## 함수의 호출 관계로도 생각해 볼 수 있겠다.

우리가 정의하는 컴포넌트는 JSX문법으로 만들었지만 결국 트랜스 파일되어 리액트 렌더링을 호출하는 함수다.
컴포넌트를 호출할때 해당 컴포넌트에서 호출하는 다른 컴포넌트가 있다면 호출된 컴포넌트는 함수로서 실행된다. 

결국 함수가 함수를 연쇄적으로 호출하는 구조기 때문에, 어떤 컴포넌트가 리렌더링이 되어 함수로서 실행이 되면 해당 함수에 포함되어있는 다른 함수(컴포넌트)는 다시 호출될 수 밖에 없는 것이다.

### 하지만 children은 무엇인가? 
dom을 흉내내어 만들긴했지만 리액트 컴포넌트에서의 children은 결국 함수의 props 중 하나일 뿐이다. props는 값으로서 전달될 뿐 어떠한 호출을 발생시키지 않는다. 

### 결국 children으로 전달한 컴포넌트는 상위 컴포넌트가 리렌더링 되도 다시 '호출될 필요가 없기 때문에 리렌더링이 되지 않는다'라고 이해해도 좋을 것 같다.




[[React]] [[Owner]] [[Parent]] [[Children]] [[리액트]] [[오너]] [[부모]] [[자식]]

[]: # (END)
[]: # (2021-04-01T00:00)
[]: # (Parent는 Children을 리렌더링하지 않는다?)
