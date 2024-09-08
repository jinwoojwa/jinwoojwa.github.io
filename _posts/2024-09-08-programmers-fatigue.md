---
title: "[C++] 프로그래머스 - 피로도"
excerpt: "프로그래머스 - 피로도"

categories:
  - Programmers
tags:
  - [programmers]

permalink: /programmers/programmers_fatigue/

toc: true
toc_sticky: true
use_math: true

date: 2024-09-08
last_modified_at: 2024-09-08
---

# 🔐 프로그래머스 - 피로도

[https://school.programmers.co.kr/learn/courses/30/lessons/87946](https://school.programmers.co.kr/learn/courses/30/lessons/87946)

<br>

## 🔑 풀이

문제에서 탐험 가능한 총 던전의 수는 `1 이상 8 이하`이므로, 모든 가짓 수를 고려해봐도 <br>

경우의 수가 작다. 따라서 모든 경우의 수를 탐색하는 `완전탐색`으로 충분히 해결할 수 있다. <br><br>

모든 경우의 수를 탐색하면서 탐험한 던전의 수를 저장하는 `cnt`을 정답과 비교하여 계속 갱신하도록 <br>

하였고, 그 과정에서 최소 필요 피로도와 소모 피로도를 적절히 현재 피로도와 비교하여 빼고 더해주어야 <br>

한다.

<br>

## 🧩 코드

<script src="https://gist.github.com/jinwoojwa/5226321d3289106181f8d98908746200.js"></script>