---
title: "[C++] 프로그래머스 - 전화번호 목록"
excerpt: "프로그래머스 - 전화번호 목록"

categories:
  - Programmers
tags:
  - [programmers]

permalink: /programmers/programmers_phone_book/

toc: true
toc_sticky: true
use_math: true

date: 2024-09-03
last_modified_at: 2024-09-03
---

# 🔐 프로그래머스 - 전화번호 목록

[https://school.programmers.co.kr/learn/courses/30/lessons/42577](https://school.programmers.co.kr/learn/courses/30/lessons/42577)

<br>

## 🔑 풀이

전화번호를 담고 있는 배열이 주어졌을 때, 한 번호가 다른 번호의 접두어인 경우가 <br>

있는지를 확인하는 문제이다. 전화번호는 `string` 자료형으로 담겨 있으며, 여러 가지 <br>

방법으로 해결할 수 있지만, 정렬 후 바로 옆 인덱스를 확인하는 방식으로 풀었다. <br><br>

우선 `C++`에서 문자열로 표현된 수의 정렬이 어떻게 되는가는 다음과 같다. <br>

    1. 두 문자열의 길이가 같은 경우 큰 수가 더 크다.
        ( "123" > "121" )
    2. 길이가 다를 경우 앞의 자리수부터 대소 비교를 한다.
        ( "8" > "16" )
    3. 길이가 다르지만, 동일한 앞의 문자가 동일할 경우 길이가 긴 문자열이 더 크다.
        ( "423" > "42" )

즉, 전화번호부를 오름차순 정렬하면, 한 번호가 다른 번호의 접두어인지 확인하기 위해 <br>

`i번째` 번호와 `i+1번째` 번호만을 비교하면 된다. 만약 `i번째` 번호가 `i+3번째` 번호의 <br>

접두어라면, `i+1번째` 번호 역시 그 관계가 성립하게 된다. 즉, 접두어 관계가 있는지만을 <br>

판단하면 되기에, 바로 앞 인덱스와 접두어 관계인지만을 탐색해주면 문제를 해결할 수 있다. <br><br>

※ `unordered_map`과 `substr()` 함수를 사용한 `해시` 풀이도 가능하다. ※

<br>

## 🧩 코드

<script src="https://gist.github.com/jinwoojwa/497feb8e3f7171221724306d65f39ea3.js"></script>