---
title: [알고리즘] 구간 합 (Prefix Sum) 알고리즘
summary: 배열의 특정 구간 합을 O(1)로 조회하는 구간 합 알고리즘의 원리와 Java 구현법 정리
date: 2026-03-31
slug: algorithm-prefix-sum
tags: Algorithm, Java
---

## 구간 합 (Prefix Sum) 알고리즘이란?

구간 합(Prefix Sum) 알고리즘은 **배열의 특정 구간($i$ ~ $j$)에 속한 요소들의 합을 빠르게 구하기 위해 사용하는 기법**이다.

수들의 배열 $A$가 있을 때, 합 배열 $S$는 다음과 같이 정의한다.

$S[i] = A[0] + A[1] + \dots + A[i]$ (즉, $A[0]$부터 $A[i]$까지의 누적 합)

<br>

핵심 아이디어는 간단하다.

> **"매번 합을 계산하지 않고, 미리 계산해둔 값을 재활용한다."**

<br><br>

## 왜 구간 합이 필요할까?

만약 크기가 $N$ 인 배열에서 $M$ 개의 구간 합 계산 쿼리를 처리해야 한다면,

- **일반적인 방식:** 매번 `for` 문을 돌려 합을 구함 → $O(N \times M)$
- **구간 합 알고리즘:** 미리 합 배열을 생성 후 산술 연산 → $O(N + M)$

데이터가 10만 개($N=10^5$)이고 쿼리가 10만 개($M=10^5$)라면, 일반적인 방식은 **100억 번**의 연산이 필요하지만, 구간 합을 사용하면 단 **20만 번** 내외로 끝난다.

<br><br>

## 구간 합 계산 방법

합 배열 $S$를 미리 만들어 두면, 특정 구간($i$ ~ $j$)의 합은 다음과 같이 계산할 수 있다.

$$구간 합 = S[j] - S[i - 1]$$

전체 합($S[j]$)에서 구간에 포함되지 않는 앞부분($S[i-1]$)을 빼는 원리이다.

이를 통해 단 한 번의 뺄셈 연산으로 구간 합을 구할 수 있다.

<br><br>

## 예시로 이해하기

배열 `A = [5, 4, 3, 2, 1]` 이 있다고 가정한다.

합 배열 `S`는 다음과 같이 만들어진다.

```
S[0] = 5
S[1] = 5 + 4 = 9
S[2] = 9 + 3 = 12
S[3] = 12 + 2 = 14
S[4] = 14 + 1 = 15

=> S = [5, 9, 12, 14, 15]
```

이제 **인덱스 1부터 3까지의 합**을 구한다면?

공식에 따라 $S[3] - S[0]$을 계산하면 된다.

- $14 - 5 = 9$
- 실제 값 확인: $A[1] + A[2] + A[3] = 4 + 3 + 2 = 9$ (일치!)

<br><br>

## Java로 실전 문제 풀어보기

[백준 11659번: 구간 합 구하기 4](https://www.acmicpc.net/problem/11659)를 통해 실제 코드로 구현해본다.

**1️⃣ 문제 분석:**

- 제한 시간: 1초

- 데이터 개수 ($N$): 최대 100,000개

- 질의 개수 ($M$): 최대 100,000개

- 분석: 매번 `for`문으로 합을 구하면 최악의 경우 $10^5 \times 10^5 = 10^{10}$ 번의 연산이 필요하다. 1초 내에 해결하기 위해서는 $O(N+M)$의 구간 합 알고리즘을 사용해야 한다.

<br>

**2️⃣ Java 문제 풀이 코드**

```java
import java.io.*;
import java.util.StringTokenizer;

public class B11659_구간_합_구하기_4 {

    static int N, M;
    static int[] prefixSum;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        // N: 수의 개수, M: 합을 구해야 하는 횟수
        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        // 합 배열 prefixSum 선언 (1-based index를 위해 N + 1 크기 지정)
        // prefixSum[0]은 자동으로 0으로 초기화됨
        prefixSum = new int[N + 1];

        st = new StringTokenizer(br.readLine());
        for (int i = 1; i <= N; ++i) {
            // prefixSum[i]는 A[1]부터 A[i]까지의 합을 의미
            prefixSum[i] = prefixSum[i - 1] + Integer.parseInt(st.nextToken());
        }

        // M번의 구간 합 쿼리 처리
        for (int i = 0; i < M; ++i) {
            st = new StringTokenizer(br.readLine());
            int from = Integer.parseInt(st.nextToken()); // 시작 인덱스
            int to = Integer.parseInt(st.nextToken());   // 끝 인덱스

            // 구간 합 공식 적용: S[to] - S[from - 1]
            bw.write(String.valueOf(prefixSum[to] - prefixSum[from - 1]));
            bw.newLine();
        }
        br.close();
        bw.flush();
        bw.close();
    }
}
```

<br><br>

## 정리

- 구간 합 알고리즘을 통해 $O(N \times M)$ 의 반복 연산을 $O(N + M)$ 으로 줄일 수 있다.
- 누적 합 배열 $S$를 미리 생성하고, 구간 합은 $S[j] - S[i - 1]$ 단 한 번의 연산으로 구한다.
