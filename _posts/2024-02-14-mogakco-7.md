---
title: "[모각코] 모각코 7회"
excerpt: "2024-02-14 7차 모각코"

categories:
  - Mogakco
tags:
  - [mogakco]

permalink: /mogakco/mogakco-6/

toc: true
toc_sticky: true

date: 2024-02-16
last_modified_at: 2024-02-16
---

## 모각코 7회

1. [목표](#목표)
2. [[C++] 백준 11399번 - ATM](#백준-11399번)
3. [[C++] 백준 5052번 - 전화번호 목록](#백준-5052번)
4. [느낀점](#느낀점)

---

## 목표

1. 백준 11399번 - "ATM" 해결
2. 백준 5052번 - "전화번호 목록" 해결


## 백준 11399번

[https://www.acmicpc.net/problem/11399](https://www.acmicpc.net/problem/11399)


### **접근 방식**

문제를 읽고 돈을 인출하는데 필요한 시간의 최솟값을 <br>

구하기 위해서는 시간을 오름차순으로 정렬하여 구해야겠다고 생각했다. <br>

사람의 수 N이 1000이하 자연수이기 때문에 1초의 시간 제한에는 <br>

신경을 쓰지 않아도 될 것이라 생각했다.


### **코드**

<script src="https://gist.github.com/jinwoojwa/c2dfa22b6b59b8902da0e907b8ca3eb0.js"></script>


## 백준 5052번

[https://www.acmicpc.net/problem/5052](https://www.acmicpc.net/problem/5052)


### **접근 방식**

한 번호가 다른 번호의 접두어인 경우를 확인하는 문제이다. <br>

한 번호가 다른 번호안에 들어있는 경우가 아닌 그저 접두어만 아니면 <br>

되기 때문에 주어진 번호들을 정렬한다면, <br>

접두어가 있는 경우 두 번호는 서로 붙어있을 것이다. <br>

즉, 번호들을 정렬하여 붙어있는 번호들끼리만 비교해준다면 <br>

쓸데없는 계산을 줄여 시간 복잡도를 낮출 수 있다.


### **코드**

<script src="https://gist.github.com/jinwoojwa/9bce1000e314740f5e4ed8fc4814bde4.js"></script>


## **느낀점**

목표로 했던 문제를 모두 풀어 뿌듯했다. 문제의 난이도가 올라갈수록 <br>

시간 복잡도를 줄여야 하는 문제가 많이 보이는데, 알고리즘과 자료구조에 대한 <br>

공부를 게을리하면 안되겠다는 생각이 들었다.