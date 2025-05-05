---
title: "[OS] 프로세스 - 2 (Process)"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - CS
tags:
  - [Operating System]

permalink: /cs/operating_system03/

toc: true
toc_sticky: true

date: 2024-04-24
last_modified_at: 2025-05-05
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 프로세스의 종료

- **프로세스의 종료 상황**

  프로세스는 생성되고 `running` 상태를 거치면서 여러 상황에 따라 종료될 수 있다. <br><br>

  + **프로세스가 exit() system call 을 호출할 때** <br>

    프로세스가 자발적으로 종료하기 위해서는 `exit() system call`을 호출해야 한다. <br>
    이때 프로세스는 `terminated` 상태로 전환된다.

  + **프로세스가 처리할 수 없는 signal을 수신할 때** <br>

    프로세스가 처리할 수 없는 `signal`을 수신하면 종료되는데, 이는 비정상적인 종료를 의미한다.

  + **커널 모드에서 실행 중 복구할 수 없는 CPU exception이 발생할 때** <br>

  + **부모 프로세스가 자식 프로세스를 종료시킬 때** <br>

    부모 프로세스가 자식 프로세스를 필요로 하지 않는 경우 종료시킬 수 있다.

<br>

프로세스가 종료되면 다음과 같은 단계를 따르게 된다. <br>

- OS가 프로세스의 자원을 해제하고, 부모 프로세스에게 `signal(death of child signal)`을 보낸다.

- OS는 프로세스를 종료 상태로 전환하고, 부모 프로세스가 자식 프로세스의 데이터를 수집하기 위해 `wait() system call`을 호출할 때까지 기다린다.

- 부모 프로세스가 `wait()`을 호출하면, OS는 종료된 프로세스의 `PCB`를 해제한다.

> UNIX와 Linux에서는 만약 자식 프로세스를 가지고 있는 부모 프로세스가 종료된다면, `init process`가 새로운 부모 프로세스가 된다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/ae1a7269-1505-4d61-b327-ed5055faf492"></center>

<br>

# 👑 Inter-Process Communication (IPC)

`Interprocess Communication`이란 다른 프로세스들 간에 데이터를 교환하고 정보를 공유하는 <br>

매커니즘이다. 동시에 실행되는 여러 프로세스가 서로 통신하여 데이터를 공유할 수 있도록 한다. <br>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/ea02d427-82bd-437d-89a9-4cf2566f7d04"></center>


- **Process Cooperation**의 장점 <br>

  + **Information sharing** <br>

    프로세스 간 통신을 위해 데이터를 교환하고 정보를 공유할 수 있다.

  + **Computation speed-up** <br>

    여러 프로세스가 협력하여 작업을 분산하고 병렬로 실행함으로써 계산 속도를 향상시킬 수 있다.

  + **Reliability/Availability**

<br>

`cooperation process`들이 `concurrent`하게 실행될 때 동기화 매커니즘이 필요하다. <br>

동기화 매커니즘에는 `signal`, `semaphore`, `lock` 등이 있다. <br>

- **Signal** <br>

  한 프로세스가 다른 프로세스에게 이벤트의 발생을 알리는 매커니즘이다. <br>

  프로세스가 종료되거나 중단되었을 때 등의 다양한 이벤트에 대한 신호를 보낼 수 있다. <br>

  이러한 신호를 받은 프로세스는 종료, 중단, 무시, 사용자 정의 처리 함수 실행 등을 할 수 있다.

<br>

# 👑 Signal vs Interrupt vs System call

- **Signal** <br>

  `한 프로세스가 다른 프로세스에게` 이벤트의 발생을 알리는 매커니즘 <br>
  **프로세스 간 통신을 위해** 사용한다.

- **Interrupt** <br>

  `운영 체제가 프로세스에게` 이벤트의 발생을 알리는 매커니즘 <br>
  주로 하드웨어나 소프트웨어적인 이벤트에 의해 발생한다.

- **System call** <br>

  `프로세스가 운영 체제에게` 서비스를 요청하는 매커니즘 <br>
  프로세스가 운영 체제에게 특정 작업을 수행해달라고 요청할 때 사용된다.

