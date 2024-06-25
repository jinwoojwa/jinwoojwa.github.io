---
title: "재귀 (Recursion)"
excerpt: "[C++]Recursion"

categories:
  - Algorithm
tags:
  - [algorithm]

permalink: /algorithm/algorithm-recursion/

toc: true
toc_sticky: true

date: 2024-06-25
last_modified_at: 2024-06-25
---

# 👑 재귀 (Recursion)

`재귀`란 어떠한 것을 정의하는데 있어 자기 자신을 참조하는 것을 말한다. 다양한 분야에서 사용되는 <br>

개념이며, 컴퓨터 과학에서 재귀는 함수가 자기 자신을 호출하는 프로그래밍 기법을 의미한다. <br><br>

재귀는 복잡한 문제를 더 작은 `하위 문제`로 나누어 해결하는 데 유용하며, 주로 두 가지 구성 요소인 <br>

`base case` 와 `recursive case`로 이루어져 있다. <br><br>

**Base case**

- `base case`에서는 재귀 함수가 종료되는 조건을 정의한다. 만약 `base case`가 존재하지 않는다면, <br>
  함수는 무한히 자기 자신을 호출하게 될 것이다.

**Recursive case**

- `base case`가 아닌 경우 함수는 자기 자신을 호출하며, 문제를 더 작은 하위 문제로 나눈다.

<br><br>

재귀를 사용하면 복잡한 문제를 간단하고 직관적인 코드로 구현할 수 있다는 장점을 가지고 있다. <br>

하지만, 함수 호출 시 스택 영역에 계속해서 함수의 정보가 누적되기 때문에, 방대한 메모리를 사용하게 <br>

된다. 모든 재귀 함수는 반복문을 사용하여 동일하게 동작하게 할 수 있기 때문에 반복문과 재귀 중 <br>

어떤 방법을 사용하여 코드를 짤 것인지를 잘 생각해야 한다. <br><br>

예를 들어, 다음의 피보나치 수열 예시를 통해 재귀에 대해 알아볼 수 있다.

```c++
int fibonacci(int n) {
    // base case
    if (n == 0) return 0;
    else if (n == 1) return 1;

    // recursive case
    else fibonacci(n-1) + fibonacci(n-2);
}
```

위의 피보나치 함수는 재귀를 설명하는 대표적인 함수이다. <br>

위의 코드는 간결하며, 직관적으로 피보나치 수열을 구현했지만, 어마어마한 연산 횟수를 사용하게 된다. <br>

만약 5에 대한 피보나치 수를 구한다고 가정해보면, fibonacci(5)는 fibonacci(4) + fibonacci(3)이 <br>

되며, fibonacci(4)는 다시 fibonacci(3) + fibonacci(2)가 되는 등, 이미 계산했던 값을 다시 <br>

계산하는 일이 빈번하게 일어나게 된다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/8dbbf325-da69-4651-8793-45e7911316e1" width="500"></center>

이러한 문제를 해결하기 위해 `DP(Dynamic Programming)`이라는 방법을 활용할 수 있다.

<br>

## 💡 정리

`재귀 (Recursion)`는 프로그래밍 기법 중 하나로, 함수 내에서 자기 자신을 호출하는 방식으로 <br>

이루어진다. 재귀는 문제를 더 작은 하위 문제로 나누어 해결하는 데 유용하며, 재귀를 사용할 때는 <br>

`base case`를 명확히 설정하여 무한 루프를 방지하고, `Tail Recursion`이나, `Memoization`과 <br>

같은 최적화 기법을 사용하여 성능 문제를 해결하는 것이 필요하다.






