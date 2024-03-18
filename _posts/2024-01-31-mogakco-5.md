---
title: "[모각코] 모각코 5회"
excerpt: "2024-01-31 5차 모각코"

categories:
  - Mogakco
tags:
  - [mogakco]

permalink: /mogakco/mogakco-5/

toc: true
toc_sticky: true

date: 2024-01-31
last_modified_at: 2024-01-31
---

## 모각코 5회

1. [목표](#목표)
2. [[C++] 백준 2798번 - 블랙잭](#백준-2798번)
3. [[C++] 백준 2309번 - 일곱 난쟁이](#백준-2309번)
4. [느낀점](#느낀점)

---

## 목표

1. 백준 2798번 - "블랙잭" 해결
2. 백준 2309번 - "일곱 난쟁이" 해결
3. 시간복잡도 생각하면서 문제 풀기


## 백준 2798번

[https://www.acmicpc.net/problem/2798](https://www.acmicpc.net/problem/2798)


### **접근 방식**

시간 제한이 1초이고, 카드의 개수는 3에서 100 사이의 정수이며, <br>

N개의 카드 중 3장을 뽑는 계산을 수행하므로, 모든 경우의 수를 <br>

전부 탐색하는 `브루트 포스 알고리즘` 문제라고 생각했다. <br>

N개의 카드 중 3장을 뽑는 `조합 (Combination)` 을 어떻게 구현하면 좋을지 <br>

생각해보았다.

### **코드**

<script src="https://gist.github.com/jinwoojwa/c68eddeaeb39d42a8ef067ecd223660d.js"></script>


## 백준 2309번

[https://www.acmicpc.net/problem/2309](https://www.acmicpc.net/problem/2309)


### **접근 방식**

시간 제한이 2초이며, 9명 중 7명을 뽑는 문제였다. <br>

이 역시 위의 문제와 같이 `브루트 포스 알고리즘` 문제라고 생각했고, <br>

9명의 키를 모두 조합해도 `9 C 7 = 9 C 2` 이므로 경우의 수가 크지 않았다. <br>

### **코드**

<script src="https://gist.github.com/jinwoojwa/2d8c14d43708d1d88b70d97644ad3d0b.js"></script>


## **느낀점**

모각코에서 진행하는 알고리즘 풀이와 더불어 `C++` 에 대한 공부도 병행하고 있는데, <br>

변수 선언이나, 그 외 다른 기본적인 부분에서도 좀 더 신경써서 코딩해야겠다고 생각했다. <br>

또한 이번에 풀었던 두 문제가 모두 `조합 (Combination)` 에 관한 문제였는데, <br>

다음에는 중첩 반복문이 아닌, 직접 조합 알고리즘을 구현해서 풀어봐야겠다고 생각했다.