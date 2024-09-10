---
title: "[C++] 프로그래머스 - 구명보트"
excerpt: "프로그래머스 - 구명보트"

categories:
  - Programmers
tags:
  - [programmers]

permalink: /programmers/programmers_lifeboat/

toc: true
toc_sticky: true
use_math: true

date: 2024-09-10
last_modified_at: 2024-09-10
---

# 🔐 프로그래머스 - 구명보트

[https://school.programmers.co.kr/learn/courses/30/lessons/42885](https://school.programmers.co.kr/learn/courses/30/lessons/42885)

<br>

## 🔑 풀이

구명보트에는 `최대 2명까지만` 탈 수 있으며, 주어지는 무게 제한 또한 존재한다. <br>

그렇다면 어떻게 사람들을 구성했을 때 필요한 구명보트의 개수를 최소로 할 수 있는지가 <br>

중요하다. <br><br>

`가장 무거운 사람 + 가장 가벼운 사람`을 조합하여 그 둘의 몸무게가 제한을 넘지 않는다면 <br>

그 둘을 하나의 보트에 태우는 것이 가장 최소의 보트로 모두를 태우는 경우일 것이다. <br><br>

따라서, 주어지는 사람들의 몸무게 배열을 정렬하고, `무거운 사람 + 가벼운 사람`을 조합하여 <br>

가능한지 확인하고, 결과에 추가하는 방식으로 답을 도출해 낼 수 있다.

<br>

## 🧩 코드

<script src="https://gist.github.com/jinwoojwa/c32e6c20441a9f392dec6c2cb44b563b.js"></script>