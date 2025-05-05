---
title: "[OS] 프로세스 (Process)"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - ComputerScience
tags:
  - [Operating System]

permalink: /cs/operating_system02/

toc: true
toc_sticky: true

date: 2024-04-13
last_modified_at: 2025-05-05
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

현대의 `Time sharing system` 에서는 여러 프로세스가 짧은 `time slice` 동안 CPU를 <br>

점유하고, 다른 프로세스에게 CPU 를 넘기며 실행된다. 그러다 다시 CPU를 점유하게 <br>

되었을 때, 이전에 어느 부분까지 명령을 실행했는지에 대한 정보와 관련 구성 요소들을 <br>

파악해야만 한다. 이때의 정보와 관련 구성 요소들을 `process context`라 한다. <br>

`Process Context` 란 프로세스가 실행되는 데 필요한 정보와 구성요소들의 집합을 의미하며, <br>

`User context`와 `System context`로 구분된다. <br>

  - **User Context** <br>

    + code : 사용자에 의한 프로그램 코드
    + data : 프로세스의 전역 변수 (global variable)
    + User stack : 지역 변수, 함수 인자 등

  - **System Context** <br>

    + Kernel stack (system stack) : 커널 함수의 인자, 레지스터, 지역 변수 등을 저장 <br>
    + PCB (Process Control Block) : 프로세스의 정보를 저장하는 자료구조

<br>

# 👑 Execution mode

CPU는 운영 체제의 지시에 따라 `user mode` 와 `system mode` 간을 전환하여, <br>

프로세스 간의 안전한 실행과 시스템 자원의 효율적 관리를 가능하게 한다. <br>

- **User mode** <br>

  + `Less-privileged mode`
  + 일반 응용 프로그램이나 사용자 작업이 실행되는 모드

- **System mode** (= kernel mode, supervisor mode) <br>

  + `More-privileged mode`
  + 커널 또는 OS의 핵심 기능들이 실행되는 모드
  + 시스템 자원에 직접 접근할 수 있으며, 시스템 전반의 제어를 담당한다.

<br>

**Mode change** <br>

`Mode change` 란 프로세서가 현재 실행 중인 모드를 변경하는 것을 의미한다. <br>

`mode change`는 일반적으로 두 가지 상황에서 발생한다. <br>

- **System call** <br>

  사용자 모드에서 실행 중인 프로세스가 운영 체제의 서비스를 요청할 때 발생한다. <br>

  사용자 프로세스가 운영 체제의 기능을 사용하기 위해서 `system call`을 사용하는데, <br>

  이때 CPU는 `user mode` 에서 `system mode`로 전환된다.

- **Interrupt** <br>

  하드웨어 이벤트 혹은 소프트웨어에서 발생하는 예외 등이 발생할 때 일어난다. <br>

  예를 들어, `time sharing` 에서의 `clock interrupt`, `I/O` 등이 있다. <br>

  이러한 인터럽트는 OS에게 특정 이벤트가 발생함을 알리고, 처리를 요구한다. <br>

  CPU는 현재 실행 중인 작업을 일시 중단하고, `ISR (Interrupt Service Routine)` <br>

  을 실행하기 위해 `system mode`로 전환한다. 

<br>

# 👑 Process Creation

OS는 부모 프로세스, 사용자, 혹은 OS의 요청으로 인해 새로운 프로세스를 <br>

생성할 수 있다. 프로세스 생성은 다음과 같은 단계로 이루어진다. <br>

1. 새 프로세스를 위한 `PCB` 생성

2. 자식 프로세스에게 고유 프로세스 식별자(`PID`) 할당

3. `PCB` 값 설정

4. 새로운 프로세스를 부모, 형제 프로세스와 연결하는 적절한 링크 설정

5. 기타 데이터 구조 생성 또는 확장

6. 부모 프로세스의 `user context`를 복사하여 `user context` 생성

7. 프로세스를 `ready state`로 설정 및 `ready queue`에 삽입

8. 부모 프로세스에게 자식 프로세스의 `PID` 반환, 자식 프로세스에게는 0 반환

<br>

## 💡 COW (Copy and Write)

- `COW mechanism` 은 메모리를 공유하는 프로세스들 사이에서 발생하는 <br>

  데이터 복사를 최소화하기 위한 기술이다. <br>

- 프로세스 생성 시에 새로운 프로세스는 부모 프로세스와 메모리를 공유한다. <br>

  `fork() system call`을 통해 생성된 자식 프로세스는 처음에는 부모 프로세스와 <br>

  같은 물리적인 메모리 페이지를 공유한다. (실제 데이터의 복사 X) <br>

- 같은 메모리 페이지를 공유하다가 자식 프로세스가 메모리 페이지를 수정하려 할 때, <br>

  해당 페이지를 복사하여 새로운 페이지를 할당하고, 메모리 공간이 분리되어 <br>

  서로에게 영향을 주지 않게 된다. <br>

<br>

# 👑 Context Switch

`Context switch`는 OS가 여러 프로세스를 동시에 실행하는 다중 작업 환경에서 <br>

발생하는 중요한 개념이다. 현재 실행 중인 프로세스의 상태를 저장하고, 다음에 <br>

실행할 프로세스의 상태를 로드하여 CPU의 제어를 전환하는 과정을 의미한다. <br>

<br>

## 💡 When to switch a process

- **프로세스의 종료** <br>

  에러나 예외가 발생하여 비정상적으로 종료되거나, 정상적으로 종료될 때 발생한다. <br>
  이 경우 해당 프로세스는 `terminated` 상태로 전환되고, 새 프로세스가 `dispatch` 된다.

- **블로킹 시스템 호출** <br>

  `I/O request` 등과 같은 system call과 `page fault` 로 인해 발생 가능하다.

- **Time slice** <br>

   `Time sharing` 방식으로 인한 `clock interrupt` 발생으로 인해 `context switch`가 발생한다.

- **I/O Interrupt** <br>

  입출력 작업 완료 시 프로세스는 `block` 상태에서 `ready` 상태로 전환된다. <br>
  이후에 `ready` 상태가 된 프로세스는 CPU를 할당받을 수 있다.

<br>

## 💡 Step of Context Switch

1. **현재 프로세스 상태 저장** <br>

  현재 실행 중인 프로세스의 레지스터 상태, `PCB` 정보, 스택 및 메모리 상태 등의 <br>

  정보를 저장한다. 이 정보는 이전 상태로 복원될 때 계속 실행될 수 있도록 보존된다.

2. **다음 프로세스 선택** <br>

  `scheduler`가 다음에 실행할 프로세스를 선택한다.

3. **다음 프로세스 상태 로드** <br>

  선택된 다음 프로세스의 레지스터 상태, `PCB` 정보, 스택 및 메모리 상태 등을 <br>

  CPU에 로드함으로써 다음 프로세스가 실행될 준비가 되도록 한다.

4. **다음 프로세스 실행** <br>

  CPU가 선택된 다음 프로세스의 코드를 실행한다.

<br>

## 💡 Mode Change VS Context Switch

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/0a91f336-715c-4006-917a-18ba6352893f"></center>