---
title: "구간 합 알고리즘"
excerpt: "구간 합 알고리즘 (Prefix Sum)"

categories:
  - 알고리즘
tags:
  - [algorithm]

permalink: /algorithm/algorithm-prefix_sum/

toc: true
toc_sticky: true

date: 2024-03-03
last_modified_at: 2024-03-03
---

## Prefix sum (구간 합)

**구간 합 (Prefix sum)** 알고리즘은 합 배열을 통해서 구간 합을 `O(1)` 의 <br>

시간 복잡도로 구할 수 있는 알고리즘이다. <br>

수들의 배열 `A`가 있을 때, 합 배열 `S`는 다음과 같이 정의한다. <br>

`S[i] = A[0] + A[1] + ... + A[i] // A[0] 부터 A[i] 까지의 합 ` <br>

<br>

### 구간 합이 필요한 이유

`N` 개의 원소를 가진 배열 `A` 가 주어졌을 때, `A[i] ~ A[j]` 까지의 <br>

합을 구하는 경우를 생각해보면, 최악의 경우 시간 복잡도가 `O(N)` 이 걸린다. <br>

`N` 의 값이 크고, 시간 제한이 주어진 경우 정해진 시간 내에 해결이 불가능하다. <br>

하지만 합 배열을 사용하면 `O(1)` 시간 안에 답을 구할 수 있게 된다. <br>


<br>

### 구간 합 구하는 공식

수들의 배열이 주어질 때, 그 수들의 합을 저장할 목적의 합 배열을 하나 더 <br>

만들어 현재 인덱스까지의 값의 합을 저장하는 배열로 사용한다. <br>

우선 합 배열 `S` 는 다음의 공식으로 만들 수 있다. <br>

`S[i] = S[i - 1] + A[i]` <br>

합 배열 `S` 를 이용하여 `i` 부터 `j` 까지의 구간 합을 구하는 공식은 <br>

`S[j] - S[i - 1]` 이다. <br>

<br>

### 구간 합 예시 문제

* [백준 11659번](https://www.acmicpc.net/problem/11659)
    + [풀이](https://jinwoojwa.github.io/jinwoo.github.io/algorithm/baekjoon_No_11659/)
* [백준 11660번](https://www.acmicpc.net/problem/11660)
    + [풀이](https://jinwoojwa.github.io/jinwoo.github.io/algorithm/baekjoon_No_11660/)
* [백준 10986번](https://www.acmicpc.net/problem/10986)
    + [풀이](https://jinwoojwa.github.io/jinwoo.github.io/algorithm/baekjoon_No_10986/)




