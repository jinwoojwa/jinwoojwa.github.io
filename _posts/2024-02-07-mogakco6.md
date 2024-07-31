---
title: "[모각코] 모각코 6회"
excerpt: "2024-02-07 6차 모각코"

categories:
  - Mogakco
tags:
  - [mogakco]

permalink: /mogakco/mogakco-6/

toc: true
toc_sticky: true

date: 2024-02-07
last_modified_at: 2024-02-07
---

## 모각코 6회

1. [목표](#목표)
2. [[C++] 백준 3649번 - 로봇 프로젝트](#백준-3649번)
3. [느낀점](#느낀점)

---

## 목표

1. 백준 3649번 - "로봇 프로젝트" 해결
2. 백준 1700번 - "멀티탭 스케줄링" 해결


## 백준 3649번

[https://www.acmicpc.net/problem/3649](https://www.acmicpc.net/problem/3649)


### **접근 방식**

입력이 여러 개의 테스트 케이스로 이루어진다는 것과 <br>

입력 받은 길이의 단위가 서로 다른 것을 확인하였다. <br>

모든 입력을 벡터 자료구조에 저장하여, 한 조합씩 합을 계산하여 <br>

비교해보는 방식으로 풀어야겠다고 생각했다.


### **코드**

<script src="https://gist.github.com/jinwoojwa/65cf44a00e096b8f66adc0231ef04e37.js"></script>


## **느낀점**

"로봇 프로젝트" 문제를 풀 때, 문제의 조건을 제대로 읽지 않고 풀어서 <br>

꽤 많은 고생을 했다. 문제를 꼼꼼히 읽고 조건을 확인한 후 코드를 짜야겠다고 <br>

생각했다. 또한 코드를 짤 때, 변수 선언같은 기본적인 부분부터 신경써야겠다고 생각했다.