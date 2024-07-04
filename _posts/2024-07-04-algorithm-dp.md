---
title: "동적 계획법 (Dynamic Programming)"
excerpt: "[C++]Dynamic Programming"

categories:
  - Algorithm
tags:
  - [algorithm]

permalink: /algorithm/algorithm-dp/

toc: true
toc_sticky: true
use_math: true

date: 2024-07-04
last_modified_at: 2024-07-04
---

# 👑 동적 계획법 (Dynamic Programming)

`동적 계획법 (Dynamic Programming)`이란 복잡한 문제에 대해 간단한 여러 개의 문제로 <br>

나누어 푸는 방법을 뜻한다. 어떠한 문제가 주어지면 그 문제를 해결하기 위해 문제를 여러 <br>

개의 하위 문제로 나누어 푼 다음 그것을 결합하여 원래의 문제를 해결하는 알고리즘이다. <br><br>

`DP`는 일반적으로 다음의 두 가지 종류의 문제를 해결하는 데 사용된다.

- **최적 부분 구조 (Obtimal Substructure)**

  + 문제의 최적 해결 방법이 그 하위 문제들의 최적 해결 방법으로 만들어질 수 있을 때, <br>
    그 문제는 최적 부분 구조를 가진다고 한다.

  + 예를 들어, 최단 경로 문제에서 한 경로의 최단 경로는 그 하위 경로들의 최단 경로로 구성된다.

- **중복 하위 문제 (Overlapping Subproblems)**

  + 동일한 작은 문제들이 반복적으로 해결될 필요가 있을 때, 그 문제는 중복된 하위 문제를 <br>
    가진다고 한다.

  + 예를 들어, 피보나치 수열을 재귀적으로 계산할 때, 같은 피보나치 수가 여러 번 계산 된다.

<br>

동적 계획법은 일반적으로 `배열을 사용`하여 동일한 계산을 반복해야 할 때, 이전의 값을 저장해 <br>

놓음으로써 다시 해당 계산을 하지 않도록 하는 `메모이제이션` 기법을 사용한다. 이는 메모리 공간을 <br>

사용하여 중복 계산을 방지하고, 계산 속도를 향상시키는 이점을 가져다 준다.

<br>

## 💡 DP 사용 예시

`DP`는 일반적으로 `상향식(Bottom-Up)` 접근법과 `하향식(Top-Down)` 접근법으로 구현된다. <br>

`Bottom-Up` 방식은 작은 하위 문제부터 해결해 나가면서 점진적으로 원래 문제를 해결하는 방식이고, <br>

`Top-Down` 방식은 큰 문제를 하위 문제들로 나누고, 각 하위 문제의 해답을 재귀적으로 해결하는 방식이다.

<br>

`피보나치 수열`, `최장 공통 부분 수열`, `배낭 문제(Knapsack Problem)` 등이 대표적인 `DP` 문제이다.

```c++
// 1부터 50까지의 수들에 대한 피보나치 수를 구하는 함수
// fibo[] 배열을 통해 문제를 해결한다.

int fibo(int n) {
    int fibo[50] = {0, };
    fibo[0] = fibo[1] = 1;
    
    for (int i = 2; i <= n; ++i) {
        fibo[i] = fibo[i-1] + fibo[i-2];
    }
    return fibo[n];
}
```

