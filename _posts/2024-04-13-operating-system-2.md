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

프로세스가 실행될지 알 수 있을까? <br>

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




