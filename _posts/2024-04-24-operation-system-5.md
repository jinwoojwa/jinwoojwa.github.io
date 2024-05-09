---
title: "[OS] Concurrency : Mutual Exclusion and Synchronization"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-concurrency/

toc: true
toc_sticky: true

date: 2024-04-24
last_modified_at: 2024-04-24
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 Concurrency란?

`동시성(concurrency)`이란 여러 작업이 동시에 진행되는 것처럼 보이도록 하는 개념을 의미한다. <br>

`Multi programming`과 `Multi processing` 을 통해 동시성을 구현할 수 있는데, OS는 <br>

CPU를 여러 프로세스에 분배하여 동시에 여러 프로세스가 실행되는 것처럼 보이게 한다. <br>

하지만, 이렇게 여러 프로세스나 쓰레드가 공유 자원에 접근할 때 문제가 발생할 수 있다.

<br>

# 👑 Race Condition

> `Race Condition`이란, 다수의 프로세스, 쓰레드가 공유 자원에 동시에 접근할 때 실행 순서에 따라 결과값이 달라질 수 있는 현상이다.

<br>

## 💡 Race Condition 예시

`Race Condition`을 이해하기 위한 예시로 `Producer/Consumer Problem`을 들 수 있다. <br>

다수의 생산자 프로세스와 한 명의 소비자 프로세스가 프로세서에서 동작하고 있다고 가정하자. <br>

생산자는 데이터를 생산하고 이를 buffer에 집어넣으며, 소비자는 buffer에서 값을 꺼내어 <br>

오며, 생산자든 소비자든 한 번에 오직 한 명만이 buffer에 접근할 수 있다. <br>

```c
#define BUFFER_SIZE 10
typedef struct {
    ...
} item;

item b[BUFFER_SIZE];
int in = 0;
int out = 0;
int counter = 0;

// PRODUCER
item v;

while (1) {
    while (counter == BUFFER_SIZE);
    /* produce item */
    b[in] = v;
    in = (in + 1) % BUFFER_SIZE;
    counter++;
}

// CONSUMER
item w;

while (1) {
    while (counter == 0);
    w = b[out];
    out = (out + 1) % BUFFER_SIZE;
    counter--;
    /* consume item w */
}
```

위의 예시의 `counter`를 증감시키는 부분에서 `Race Condition`이 일어날 수 있다. <br>

`counter++` 는 한 줄의 코드처럼 보이지만, `assembly language` 로 변환하면 <br>

```
load register, counter  (register <- counter)
increment register      (register <- register + 1)
store register, counter (counter <- register)
```

이렇게 변환된다. 만약 위의 문장이 `atomically` 하게 수행된다면 괜찮지만, <br>

그렇지 않다면 코드 수행 중 `context switch`가 일어나 `race condition`이 발생할 수 있다. <br>

> `Atomic Operation` 이란 : 작업 수행 중 다른 쓰레드나 프로세스에 의해 간섭받지 않는 것으로, 작업 수행 중 Interrupt가 발생할 수 없다는 것을 의미한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/4961971f-8728-4332-b361-d989e521148a" width="500"></center>

<br>

## 💡 Critical Section Problem

여러 개의 프로세스, 쓰레드들이 공유 자원에 접근해도 공유 데이터는 일관성을 유지해야 한다. <br>

이를 위해서는 `critical section problem`을 해결해야 한다. <br>

`critical section` 이란 공유 데이터의 일관성을 보장하기 위해 동기화 매커니즘을 적용하는 <br>
 
**코드 영역**를 말한다. 각 프로세스나 쓰레드들은 각자 공유 데이터를 변경하기 위한 특정 코드를 <br>

실행하는데, 만약 공유 데이터가 동기화되지 않는다면 `race condition`이 발생할 수 있다. <br>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/abf76e96-f18d-47d1-b0cc-f4a24fc4ba48" width="500"></center>

`critical section problem`을 해결하기 위해서는 다음의 3가지 조건을 모두 만족해야 한다.

- **Mutual Exclusion**

  + 한 번에 하나의 프로세스나 쓰레드만 `critical section`에 진입할 수 있다.

- **Progress**

  + `critical section`에 접근하는 프로세스가 없고, 어떤 프로세스나 쓰레드가 접근을 원한다면, <br>
    접근할 수 있어야 한다. (아무도 쓰고 있지 않다면, 쓸 수 있어야 한다.)

- **Bounded Waiting**

  + 어떤 프로세스나 쓰레드가 무한정 `critical section`에 들어가지 못하고 기다리면 안된다.

<br>

## 💡 Critical Section Problem 해결 방법

프로그램의 안정성과 신뢰성을 유지하기 위해 동기화는 매우 중요하기 때문에 과거부터 <br>

수많은 해결 방안과 알고리즘들이 등장하였다. `Software solution`과 `Hardware solution`로 <br>

나눌 수 있으며 다양한 알고리즘들이 존재한다.

<br>

### 🚩 Peterson's Algorithm (SW Solution)

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

### 🚩 Bakery Algorithm (SW Solution)

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

### 🚩 Test and Set Instruction (HW Solution)

하드웨어적 방법으로는



