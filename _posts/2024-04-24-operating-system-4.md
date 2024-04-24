---
title: "[OS] 쓰레드 (Threads)"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-threads/

toc: true
toc_sticky: true

date: 2024-04-24
last_modified_at: 2024-04-24
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 Threads

`쓰레드 (Threads)` 란 프로세스 내에서 실행 및 스케줄링되는 실행 단위이다. <br>

프로세스에 속하는 코드, 데이터 및 스택과 같은 메모리 공간을 공유하며, 각 쓰레드는 <br>

`ready`, `running` 등의 실행 상태를 가진다. 쓰레드는 실행 중인 함수 호출 및 <br>

지역 변수 등을 저장하기 위한 스택과, `Program counter`, 레지스터 등을 저장하기 위한 <br>

메모리인 `Thread control block` 으로 구성된다. 쓰레드는 자신의 프로세스의 메모리 및 <br>

리소스에 접근할 수 있으며, 같은 프로세스의 모든 쓰레드는 이를 공유한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/675af0bc-d966-4f91-ac0f-c7e4490493a9" width="500"></center>

<br>

## 💡 쓰레드의 장점

- **프로세스 생성/종료보다 적은 시간** <br>

  쓰레드를 생성/종료하는 데 걸리는 시간이 프로세스를 생성/종료하는 것보다 작다. <br>
  따라서 쓰레드를 사용하여 작업을 병렬로 처리하고, 작업을 완료한 쓰레드를 종료하여 <br>
  자원을 빠르게 회수할 수 있어 효율적이다.

- **프로세스 간 전환/통신보다 쓰레드 간 전환/통신 소요 시간이 적다** <br>

  동일한 프로세스 내의 쓰레드는 프로세스 내의 자원과 메모리 및 파일을 공유하기 때문에 <br>
  프로세스 간 전환/통신보다 적은 시간이 소요된다.

- **커널 호출이 필요없다.** <br>

  `프로세스 간 통신(IPC)`은 커널을 호출하기 때문에 `overhead`가 많이 발생하지만, <br>
  쓰레드는 동일한 프로세스 내에서 실행되므로 커널 호출 없이 통신이 가능하다.

<br>

## User-Level Threads vs Kernel-Level Thread

- **User-Level Threads** <br>

  + 커널이 아닌 응용 프로그램 내에서 관리한다. 즉, 쓰레드 관리 및 스케줄링이 <br>
    응용 프로그램의 코드에 의해 이루어진다.

  + 운영 체제는 해당 쓰레드의 존재를 알지 못하며, 응용 프로그램이 요청하는 시스템 호출에 <br>
    응답할 뿐이다.

  + `Kernel-Level Thread` 보다 `overhead`가 적다.

  + 커널이 쓰레드의 존재를 알지 못하며, 응용 프로그램이 요청하는 `system call`에 응답할 뿐이다.

  + 커널 개입 없이 응용 프로그램에서 관리하므로, 쓰레드 간 전환 및 스케줄링 등이 <br>
    비교적 빠르게 이루어진다.

  + 운영 체제에 의존적이지 않다.

- **Kernel-Level Threads** <br>

  + 커널에서 직접 관리하기 때문에 쓰레드 관리 및 스케줄링이 커널에 의해 이루어진다.

  + OS의 기능을 이용하기 때문에 OS 의존적이지만 안정적이고 강력한 쓰레드 관리를 제공한다.

  <center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/6d46418e-c1a8-46b8-aa90-55b3f89f814b" width="500"></center>
