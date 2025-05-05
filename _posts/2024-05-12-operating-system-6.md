---
title: "[OS] Concurrency : Critical Section Problem"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - CS
tags:
  - [Operating System]

permalink: /cs/operating_system06/

toc: true
toc_sticky: true

date: 2024-05-12
last_modified_at: 2025-05-05
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

`Test and Set` 명령어는 동기화 명령어 중 하나로, 하드웨어의 도움을 받아 `mutual exclusion`을 <br>

수행하기 위한 `기계어(machine instruction)` 이다. `test-and-set` 명령어는 `atomically` 하게 <br>

동작하여 명령어 실행 도중에 인터럽트 될 수 없다. [Test-and-set 참고자료](https://en.wikipedia.org/wiki/Test-and-set) <br><br>

하드웨어에서 지원하는 원자적 연산으로, 동기화 문제를 간단하게 해결할 수 있다. <br>

하지만, `busy waiting` 이 발생하여 CPU 자원을 낭비하게 되며, `bounded waiting` 이 발생할 <br>

수도 있고, 데드락 역시 발생할 수 있다.

<br>

## 💡 Semaphores

`Semaphore` 란 다중 스레드가 공통 자원에 접근하는 것을 제어하고, 동시성 시스템에서 <br>

`critical section` 문제를 피하기 위해 사용하는 변수 또는 추상 데이터 타입이다. <br>

`semaphore`는 주로 `Counting Semaphore`와 `Binary Semaphore or Mutex` 의 두 가지 형태로 <br>

나눌 수 있다. 일반적으로 `semaphore`는 정수형 변수로 P 연산이라고도 불리는 `wait()` 와 <br>

V 연산이라고도 불리는 `signal()` 을 통해 조작된다. <br>

- `wait()` 연산 

  + `semaphore`의 값을 감소시킴
  + `semaphore`의 값이 음수가 되면, 해당 프로세스는 대기 상태로 전환시킨다.
<br>

- `signal()` 연산

  + `semaphore`의 값을 증가시킴
  + 대기 중인 프로세스가 있으면, 그 프로세스를 깨운다.

`Counting Semaphore`는 주로 특정 자원의 가용 수를 관리하는 데 사용되며, 초기 세마포어 값은 <br>

자원의 개수를 나타낸다. `Mutex` 라고도 불리는 `Binary Semaphore` 는 값을 0 또는 1로만 가질 수 <br>

있으며, 단일 자원의 `mutual exclusion`을 보장하는 데 사용된다. <br><br>

`Semaphore`는 비교적 간단하게 동기화를 구현하게 해주며, 다양한 형태로 다양한 상황에서 사용할 수 있다. <br>

하지만, 잘못된 사용 시에 `Deadlock` 등의 문제를 초래할 수 있어 올바르게 사용해야 한다.







