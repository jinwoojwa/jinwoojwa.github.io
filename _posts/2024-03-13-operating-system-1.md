---
title: "운영체제 개요"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-overview/

toc: true
toc_sticky: true

date: 2024-03-14
last_modified_at: 2024-03-14
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





