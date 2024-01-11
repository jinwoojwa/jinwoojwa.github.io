---
title: "[모각코] 모각코 2회"
excerpt: "2024-01-10 2차 모각코"

categories:
  - Mogakco
tags:
  - [mogakco]

permalink: /mogakco/mogakco-2/

toc: true
toc_sticky: true

date: 2024-01-10
last_modified_at: 2024-01-11
---

## 모각코 2회

1. [목표](#목표)
2. [[C++] 백준 1449번 - 수리공 항승](#백준-1449번)
3. [[C++] 백준 1764번 - 듣보잡](#백준-1764번)
4. [느낀점](#느낀점)

---

## 목표

1. 백준 1449번 - "수리공 항승" 풀기
2. 백준 1764번 - "듣보잡" 풀기
3. 시간 복잡도와 메모리 생각하면서 코딩하기


## 백준 1449번

[https://www.acmicpc.net/problem/1449](https://www.acmicpc.net/problem/1449)


### **접근 방식**

물이 새는 위치를 저장하는 방식을 무엇으로 할지 고민하였고, 위치의 개수가 사용자의 입력에 따라 바뀌므로, `vector` 를 사용하기로 하였다.
<br>

주어지는 위치가 정렬되어 있지 않으므로 `vector` 안에 위치를 넣어놓고 우선 오름차순 정렬을 해야겠다고 생각했다.
<br>

그 후, 테이프의 길이가 고정되어 있으므로 노드를 이용하여 답을 구해야겠다고 생각했다.

<br>

### **코드**

<script src="https://gist.github.com/jinwoojwa/2f7d5c00b1d4e892990d38adeb8d264a.js"></script>


## 백준 1764번

[https://www.acmicpc.net/problem/1764](https://www.acmicpc.net/problem/1764)


### **접근 방식**

처음에는 배열을 통해 각 명단을 저장한 후 서로 비교하여 답을 구하려고 하였으나 N,M의 범위가 50만 이하의 자연수이므로 
<br>

시간 제한에 걸릴것이라는 생각을 하였다. 그래서 set, map 등의 자료 구조를 생각하게 되었다.
<br>

### **코드**

<script src="https://gist.github.com/jinwoojwa/7b0d561abb49a2794b6e7f0c4bfdbb32.js"></script>


## **느낀점**

문제를 풀 때마다 느끼지만 아직 언어에 대한 완벽한 이해도 선행되지 않은 것 같다는 생각이 든다. <br>

언어에 대한 숙달과 자료 구조와 알고리즘에 대한 공부를 꾸준히 해야겠다는 생각을 하게된다. <br>

또한, 같은 문제를 풀고 서로 자신의 문제 풀이 방법을 공유하면서 새로운 시각으로 문제를 바라볼 수 있게 되는 것이 좋은것 같다.
