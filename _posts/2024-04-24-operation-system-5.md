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

> `Race Condition`이란, 다수의 프로세스가 공유 자원에 동시에 접근할 때 실행 순서에 따라 결과값이 달라질 수 있는 현상이다.

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

> `Atomic Operation` 이란 : 작업 수행 중 다른 쓰레드나 프로세스에 의해 간섭받지 않는 것을 말하는데, 즉 Interrupt가 발생할 수 없다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/4961971f-8728-4332-b361-d989e521148a" width="500"></center>

<br>

## 💡 Race condition 예방

어떻게 `Race condition`을 예방할 수 있을까? <br>




