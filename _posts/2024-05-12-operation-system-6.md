---
title: "[OS] Concurrency : Critical Section Problem"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-critical-section/

toc: true
toc_sticky: true

date: 2024-05-12
last_modified_at: 2024-05-12
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 Critical Section Problem 해결 방법

여러 개의 프로세스나 쓰레드들이 공유 자원에 접근하더라도 공유 데이터는 일관성을 <br>

유지해야만 한다. 프로그램의 안정성과 신뢰성을 유지하기 위해 동기화는 매우 중요하기 때문에 과거부터 <br>

수많은 해결 방안과 알고리즘들이 등장하였다. 크게 `Software solution`과 `Hardware solution`로 <br>

나눌 수 있으며 다양한 알고리즘들이 존재한다.

    Critical Section Problem 해결을 위한 3가지 조건

    1. Mutual Exclusion
    
    2. Progres

    3. Bounded Waiting

<br>

## 💡 Peterson's Algorithm (SW Solution)

수학자 Gary Peterson이 발표한 이 알고리즘은 프로세스가 2개인 경우에만 적용이 가능하다. <br>
(이후에 3개 이상의 경우에도 적용 가능한 방법이 논의되었음.) <br>

`Peterson's Algorithm`은 `Critical Section Problem`을 해결하기 위한 간단하고 효율적인 <br>

방법으로 `Mutual Exclusion`, `Progress`, `Bounded Waiting` 을 모두 만족하지만, <br>

`Busy waiting`이라는 단점이 존재한다. <br>

    Busy Waiting이란 : 어떤 조건을 만족하지 않을 경우, 만족할 때까지 다른 작업을 수행하지 않고,
                      계속 조건을 검사하며 대기하는 것을 말한다. 이는 CPU 자원을 낭비하게 하여
                      좋지 않은 동기화 방식이다.

```c
bool flag[2]; // critical section 사용을 뜻함
int turn;     // 0, 1을 통해 프로세스를 가리킴

// P0
do {
  flag [0] = true;
  turn = 1;

  // P1이 임계 구역을 사용중인지를 계속 확인
  while (flag [1] and turn == 1) ;
  
    // critical section

  // critical section을 빠져나온 후 임계 구역을 사용하고 있지 않음을 알림
  flag [0] = false;

  // remainder section
} while (true);

//P1
do {
  flag [1] = true;
  turn = 0;

  while (flag [0] and turn == 0) ;

    // critical section

  flag [1] = false;

  // remainder section
} while (true);
```

<br>

## 💡 Bakery Algorithm (SW Solution)

`Leslie Lamport` 가 고안한 알고리즘으로 각 고객이 입장 시에 고유의 번호표를 받는 빵집을 구상하였다. <br>

고객이 빵집에 들어오면 번호는 1씩 늘어나며, 고객들은 현재 고객의 서비스가 끝나고, 다음 번호가 표시될 <br>

때까지 기다린다. 번호를 통해 우선순위를 결정하여 프로세스의 할당을 결정한다. <br>

`Bakery Algorithm` 역시 `busy waiting`의 문제는 해결하지 못했으며, `overhead`가 크다.

```c
Choosing : array [1 .. NUM_THREADS] of bool = {false};
Number : array [1 .. NUM_THREADS] of integer = {0};

do {
  Choosing[i] = true;
  number[i] = 1 + max(Number[1], ... Number[NUM_THREADS]);
  Choosing[i] = false;

  for (integer j = 1; j <= NUM_THREADS; ++j) {
    // thread j가 번호표를 받을 때까지 wait
    while (Choosing[j]);
    // 자신보다 작은 번호를 가지거나, 같은 번호이지만 더 높은 우선순위를 가진
    // 프로세스들이 자원을 사용하고 있는지 확인
    while ((Number[j] != 0) && (Number[j], j) < (Number[i], j)); 
  }
  
    // critical section
  
  Number[i] = 0;

    // remainder section

} while (true);
```

<br>

## 💡 Test and Set Instruction (HW Solution)
