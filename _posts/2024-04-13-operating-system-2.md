---
title: "[OS] 프로세스 (Process)"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-process/

toc: true
toc_sticky: true

date: 2024-04-13
last_modified_at: 2024-04-13
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 프로세스란?

`Process` 란 **실행 중인 프로그램**을 말한다. <br>

프로그램이 실행되면, 메인 메모리에 실행할 데이터가 올라가고, CPU가 한 줄씩 실행시키는데, <br>

이 때 메모리에 올려진 상태이면 프로세스라고 할 수 있는 것이다. <br>

프로세스는 운영체제로부터 여러 자원을 할당받으며, 여러가지 상태를 가진다. <br>

<br>

## 💡 Process States

보통 메인 메모리에는 수 많은 프로세스들이 올라가 있다. 그렇다면 컴퓨터는 어떤 <br>

프로세스가 실행될 것인지 알 수 있을까? <br>

운영체제는 이를 위해 `Dispatcher` 라는 커널 함수를 제공하는데, `dispatcher`는 <br>

실행될 프로세스에게 CPU를 할당하고, 프로세스가 실행되도록 준비해주는 역할을 한다. <br>

![process_states](https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/278020f1-cc41-4615-9889-203bbf8a238e)

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/4882292b-c600-4bc5-b4f9-174ce6d2fd14" width="400" height="300"></center>

<br>

## 💡 프로세스의 생성/종료

프로세스의 생성

  * 서비스 제공을 위한 OS로부터의 생성
  
  * 부모 프로세스로부터의 생성

    부모 프로세스가 OS에게 자식 프로세스를 만들어달라는 요청을 할 수 있고, 이를 통해 프로세스가 생성된다.

  * 사용자의 `command`에 의한 생성

    OS에게 요청을 하여 `foreground / background` 상태로 프로그램을 실행시킬 수 있다.

<br>

프로세스의 종료

  * Normal completion

    프로세스는 OS system call인 `exit`을 호출하여 실행이 끝났음을 알릴 수 있다.

  * Parent request

    부모 프로세스가 OS에게 자식 프로세스를 종료시켜달라고 요청할 수 있다.

  * Protection error

    프로세스가 허용되지 않은 파일 리소스에 접근하거나, 허용되지 않은 메모리 공간에 접근할 경우 `비정상적으로` 종료된다.

  * Arithmetic error, I/O failure, Invalid instruction 등

    0으로 나누는 등의 금지된 계산이나, 입출력 실패 등의 경우에 `비정상적으로` 종료된다.

<br>

## 💡 Process Model

![image](https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/d327c622-4a72-4d05-a247-e163efe1d221)

프로세스의 상태는 크게 5가지로 나눌 수 있다. ( + two suspended state) <br>

- **New** <br>

  + 프로그램이 실행되면, 프로세스는 `job queue(= process list)`에 놓여진다.

- **Ready** <br>

  + 실행을 기다리는 상태, 프로세스가 `ready queue`로 들어간다. <br>
  + 프로세서의 `dispatch`가 `CPU를 할당해주기를 기다리는` 상태이다. <br>
  + 이 때, `ready queue` 에 있던 프로세스들은 단지 `queue`에 가장 오래 있었다는 <br>
    이유로, `dispatcher`에게 선택받지 않는다. <br>

- **Block** <br>

  + 어떠한 event가 발생하기를 기다리는 상태이다. (e.g. `I/O completion) <br>
  + `wait state`, `sleep state` 라고도 불린다.
  + `ready` 와 마찬가지로 `block queue` 라는 것이 존재하며, 각 `event 마다의 queue`가 존재한다.

![image](https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/6b285ff4-d527-4141-81af-8a5e66dc3e1e)

- **Suspended process** <br><br>

  `suspended process` 란 main memory에 존재하다가 보조 기억 장치로 옮겨진 프로세스를 말한다. <br>

  프로세스는 다양한 이유로 `suspended state` 가 될 수 있다. <br>

    + **자원 절약** <br>

      main memory의 공간은 한정되어 있으며, OS는 실행할 준비가 된 프로세스를 위해 <br>
      충분한 메모리 공간을 확보해야 한다. `suspended` 상태의 프로세스는 시스템 리소스를 <br>
      소비하지 않기 때문에 자원을 확보할 수 있다.

    + **Timing** <br>

      주기적으로 실행되는 프로세스의 경우 다음 실행까지 메모리에 위치하게 된다면 <br>
      메모리 공간 확보에 있어 비효율적일 것이다. 따라서 해당 프로세스가 실행될 <br>
      타이밍이 아닌 경우 `suspended` 상태로 만들어 메모리 공간을 관리한다.

    + **User request** <br>

      사용자는 프로그램의 실행을 멈춰 `debugging`과 분석 목적으로 `suspended` 상태를 사용할 수 있다. <br>

  이 외에도 `suspended state` 가 되는 다양한 이유들이 존재한다. <br><br>

  **Two suspended state**

    + **suspended block** : 보조 기억 장치에서의 `block state`
    + **suspended ready** : 보조 기억 장치에서의 `ready state`

<br>

# 👑 PCB (Process Control Block)

`PCB (Process Control Block)` 이란 process의 정보를 담고 있는, OS가 <br>

프로세스를 제어하기 위해 사용되는 자료구조이다. 각각의 프로세스와 자원들의 <br>

현재 상태에 대한 정보를 담고 있으며, **process 마다 하나의 PCB**를 가지고, <br>

각각은 OS에 의해 생성/관리 된다. <br><br>


<figure style="width: 200px; margin-top: 0; margin-bottom: 0" class="align-right">
  <img src = "https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/89e4f900-050a-49f1-a627-d4b22937623f">
</figure>

`PCB` 가 담고 있는 정보들은 다음과 같다. <br>

  - Identifier
  - State
  - Priority
  - Program counter(PC)
  - Memory pointers
  - Context data
  - I/O status information
  - Accounting information
  - ···

<br><br><br><br>

위에서 프로그램이 실행되면 프로세스는 `process list`에 들어간다고 했다. <br>

`process list`는 `double linked list` 로 프로세스들을 연결하고 있으며, <br>

리스트 안에서 `ready` 상태인 리스트들을 연결함으로써 `Ready queue`가 만들어진다. <br>

<p align="center">
  <img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/8f3a48b9-a7cb-471a-9594-68930c7550df">
  <figcaption align="center">&lt;Linux process list&gt;</figcaption>
</p>

<br>

- **Process Identifier** <br>

  프로세스 자신의 식별자와 부모 프로세스의 식별자, 사용자 식별자를 저장한다. <br>

- **Processor State Information** <br>

  프로세스의 상태 (e.g. ready, running ...)를 담고 있다. <br>

  범용 레지스터, stack pointer, PC와 같은 `CPU Register` 정보를 가지고 있다. <br>

- **Process Control Information** <br>

  + **Scheduling**

    OS의 `scheduling function`을 수행하기 위해 `priority` 정보가 필요하다. <br>
    process의 `wait` 시간, CPU 점유 시간 등의 정보를 담고 있다. <br>

<br>

# 👑 Process Context

`Process Context` 란 프로세스가 실행되는 데 필요한 정보와 구성요소들의 집합을 의미한다. <br>

`Context`는 `User context`와 `System context`로 구분된다.

  - **User Context** <br>

    + code : 사용자에 의한 프로그램 코드
    + data : 프로세스의 전역 변수 (global variable)
    + User stack : 지역 변수, 함수 인자 등

  - **System Context** <br>

    + Kernel stack (system stack) : 커널 함수의 인자, 레지스터, 지역 변수 등을 저장 <br>
    + PCB (Process Control Block) : 프로세스의 정보를 저장하는 자료구조

<br>




