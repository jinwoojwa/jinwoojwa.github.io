---
title: "운영체제와 운영체제의 발전 과정"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-overview1/

toc: true
toc_sticky: true

date: 2024-03-14
last_modified_at: 2024-04-10
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 운영체제란 무엇인가?

`운영체제(Operating System)`란 응용 프로그램의 실행을 제어하고, 응용 프로그램과 <br>

컴퓨터 하드웨어 사이의 인터페이스 역할을 하는 `시스템 소프트웨어`이다. <br>

`OS`는 다음의 두 가지를 목적으로 한다고 할 수 있다. <br>

- `Efficiency`

- `Convenience`

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/b9f24912-5172-4992-b028-171e726041bc" width="400" height="300"></center>

<br>

## 💡 사용자/컴퓨터 간의 인터페이스로서의 운영체제

사람들은 일반적으로 컴퓨터 하드웨어가 내부적으로 어떻게 동작하는지에 대한 생각을 할 필요가 <br>

없다. 응용 프로그램은 프로그래밍 언어로 쓰이며, 만약 OS가 존재하지 않는다면, 프로그래머는 <br>

프로그램 개발에 있어 기계어를 사용하여 직접 하드웨어를 제어해야만 할 것이다. 하지만 `OS`는 <br>

하드웨어의 디테일을 감추고, 시스템을 사용할 수 있는 편리한 인터페이스를 제공한다. 마치 <br>

응용 프로그램과 하드웨어 사이의 `중개자` 역할을 하는 것이다. <br>

<br>

## 💡 OS가 제공하는 서비스

OS는 `시스템 소프트웨어`로서 다음과 같은 기능들을 제공한다.

- **Program execution** <br>

    프로그램 실행을 위해서는 명령어와 데이터가 메인 메모리로 로드되고, 기타 리소스가 준비되어야 하는 등의 여러 단계의 작업이 수행되어야만 하는데, `OS`가 이러한 작업들을 대신 처리해준다.

- **Access to computer resources** <br>

    각각의 I/O 장치들은 동작을 위해 고유한 명령어 또는 제어 신호가 필요하다. `OS`는 이러한 하드웨어적 디테일을 감추고, 인터페이스를 제공하여 장치들에 쉽게 접근할 수 있도록 한다.

- **Error detection and response** <br>

    컴퓨터 시스템이 작동하는 동안, 메모리 관련 에러 등의 하드웨어의 내부/외부적 에러와 0으로 나누거나, 금지된 메모리 위치에 접근하는 등의 `OS`가 응용 프로그램의 요청을 수락할 수 없는 소프트웨어 에러가 다양하게 발생한다. 운영체제는 이러한 에러들을 감지하고, 적절한 조치를 취할 수 있도록 한다.

- **Accounting** <br>

    `OS`는 컴퓨터의 다양한 자원과 성능에 대한 통계 데이터를 수집한다. 이러한 데이터들은 성능 향상에 도움을 줄 수 있고, 다중 사용자 시스템에서 청구 목적으로 데이터를 이용할 수 있다.

이것들 외에도 `OS`는 다양한 기능들을 제공한다.

<br>

## 💡 커널(Kernel)이란?

소프트웨어가 컴퓨터에서 실행되기 위해서는 `메인 메모리`에 프로그램이 올라가 있어야 한다. `OS` 역시 소프트웨어이기 때문에, 컴퓨터 부팅 시에 보조기억장치에 있던 `OS` 정보가 메인 메모리로 옮겨지게 된다. <br>

이때, `OS` 정보 중 메인 메모리에 항상 상주하는 운영체제의 부분을 `커널(Kernel)`이라고 한다. <br>

운영체제는 커널 뿐만 아니라 시스템 관리, 네트워크 설정, 보안 등의 작업을 수행하는 `시스템 유틸리티(System utilities)`, `GUI`, `CLI`로 구현되는 `사용자 인터페이스(User interface)`, 응용 프로그램이 운영체제 기능에 접근할 수 있도록 하는 `시스템 라이브러리(System libraries)` 등 많은 구성요소로 이루어져 있다. <br>

이렇게 규모가 큰 소프트웨어를 모두 메인 메모리에 올린다면, 메모리 낭비와 성능 저하 등의 문제가 발생할 것이다. 따라서 컴퓨터 부팅 시에 **핵심 부분**만을 메모리에 올리는데, 이것이 바로 `커널`인 것이다. 

<br>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/8d1de035-a715-46e9-9ce7-5e69f5a64c8b" width="500" height="400"></center>

<br>

# 👑 운영체제의 발전 과정

운영체제는 첫 등장 이후로 컴퓨터의 기능/기술이 발달함에 따라 지속해서 발전하고 있다. <br>

초창기 컴퓨터부터 오늘날에 이르기까지의 발전 과정을 설명하려고 한다.

<br>

## 💡 Serial Processing

운영체제가 `존재하지 않았으며`, 프로그래머는 컴퓨터 하드웨어에 직접 접근해야 했다. <br>

컴퓨터는 `display lights`, `toggle switches`, `input device`, `printer`로 이루어진 콘솔을 통해 동작했으며, 에러 발생 시에 빛으로 표시되었고, 프로그램이 정상적으로 끝난 경우 printer를 통해 결과가 보여졌다. <br>

이 초기 시스템은 두 가지의 큰 문제점을 가지고 있었다. <br>

- **Job scheduling** <br>

  당시 컴퓨터는 귀중했기 때문에, 컴퓨터 사용 시에 사람들에게 정해진 시간을 할당해서 사용했다. 사용 시간이 1시간이라고 할 때, 누군가는 1시간을 다 쓰지 않기도 하고, 누군가는 1시간이 모자라 원하는 작업을 다 끝마치지도 못하는 경우가 있어 낭비되는 자원이 많았다. 

- **Setup time** <br>

  프로그램 실행은 컴파일러와 소스 프로그램을 로딩하고, 컴파일된 프로그램을 저장한 후, 로딩하고 연결하는 작업을 거쳐야 했는데, 이 `setup time`에 상당한 시간이 소요되었다.

<br>

## 💡 Simple Batch Systems

초창기 컴퓨터는 매우 비쌌기에, 이용률을 극대화하기 위해 `batch system (일괄 시스템)` 방식이 개발되었다. 일괄 시스템은 `Monitor` 라는 소프트웨어를 사용하여 사용자가 컴퓨터에게 직접 명령을 내리는 것이 아닌 작업 묶음을 `Monitor`에게 전달하는 방식으로 이루어졌다. <br>

모니터는 프로그램을 읽고, 제어를 넘겨주며, 프로그램의 수행이 끝나면 다시 제어가 모니터로 넘어와 다음 프로그램을 실행하는 방식으로 작동하였다. 즉, 모니터는 초기 버전의 운영체제라고 할 수 있다.

<br>

## 💡 Uni-Programming

`Monitor`와 같은 초창기 OS들은 한 번에 하나의 프로그램을 수행하는 방식으로 작동했다. <br>
이러한 `Uni-programming` 방식에는 `I/O`장치가 프로세서보다 느리다는 문제가 있었다. 프로세서는 `I/O` 명령이 수행될 때까지 기다려야만 했고, 프로그램 실행을 기다리는 `wait` 상태가 길어지는 것이 자원의 낭비였기 때문에, `Multi-programming` 방식이 등장하게 되었다.

![Uni-Programming](https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/c7bb6e1d-d5ce-4b7d-8118-0befacb73e92)

<br>

## 💡 Multi-Programming

한 프로그램이 `Wait` 상태일 때, CPU를 다른 프로그램에게 넘겨주는 방식으로 동작한다. <br>

아래의 그림을 보면, 프로그램 A가 `Wait` 상태가 되자 프로그램 B가 `Run`이 되는 것을 볼 수 있다. 이렇게 한 프로그램이 `I/O` 입력 등으로 CPU를 쓰지 않을 때, 다른 프로그램에게 CPU를 넘겨주는 것을 확인할 수 있다. <br>

`Multi-programming`은 `Uni-programming`보다 `CPU Utilization`(활용도)가 높지만, <br>
메모리 크기가 커야만 한다. <br>

`Multi-programming`에서는 CPU가 다음에 어떤 프로그램을 실행할 것인지가 중요한데, 이를 `CPU scheduling` 혹은 `Job scheduling`이라 하며 커널에 의해 수행된다.

![image](https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/10f7dfb5-1992-4617-9a7d-a0ce500d22d0)

<br>

## 💡 Time Sharing System

컴퓨터 하드웨어의 발전에 따라 메인 메모리의 용량이 늘어났고, 많은 프로그램들을 메인 메모리에 넣고 실행시키는 것이 가능해졌다. `Multi-programming`에서는 한 프로그램이 더 이상 CPU를 사용하지 않을 때까지 CPU를 점유하는 방식으로 동작했다. 이로 인해 프로그램 하나가 긴 시간동안 동작한다면, 다른 프로그램들은 해당 프로그램이 `Wait` 상태가 될때까지 기다려야만 했다. <br> 

`Time Sharing System`에서는 CPU가 `time slice(= time quantum)`라 불리는 일정 시간 단위를 프로그램에게 제공하고, 그 시간동안만 실행시킨다. 보통 `time slice`의 길이는 0.1초이며, 이는 1초에 10개의 프로그램이 번갈아 실행된다는 것을 의미한다. 이로 인해 `user`는 CPU를 자신이 **독점하는 것처럼** 생각하게 된다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/015a0c4a-218b-4b63-b02f-c78c6b19a70f" width="600" height="400"></center>

<br>

## 💡 Multi-programming vs Time sharing

두 방식 모두 현대 컴퓨터에서 쓰이는 기술이며, 각자의 장단점을 가지고 있다. <br>

* Multi-programming
  - `batch processing`, `background processing`에서 쓰인다.
  - `time sharing` 보다 `overhead`가 적다.
  - `Throughput`이 좋다. (`Throughput` : 단위 시간 동안 처리한 job의 개수)

* Time sharing
  - `interactive processing`, `foreground processing`에서 쓰인다.
  - `multi-programming` 보다 `overhead`가 많다.
  - `response time`이 짧다. (`response time` : 사용자 요청에 반응하는 데 걸리는 시간)

<br>

## 💡 SMP (Symmetric Multiprocessing)

`대칭적 멀티프로세서(SMP)`는 다수의 프로세서들이 메인 메모리와 I/O를 서로 공유하고, 하나의 운영체제가 모든 프로세서를 관리하는 구조이다. "대칭적"이라는 말의 의미는 모든 프로세서가 동일한 기능을 수행한다는 의미를 가지고 있다. <br>

`SMP` 에서는 동일한 프로세서들의 협력을 통해 병렬처리를 수행하여, 단일 프로세서 시스템보다 좋은 성능을 발휘할 수 있다. <br>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/81425bc1-4953-48d6-8427-464a6eb98f0e" width="500" height="400"></center>


