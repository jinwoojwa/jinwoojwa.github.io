---
title: "[OS] Paging"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-paging/

toc: true
toc_sticky: true
use_math: true

date: 2024-06-12
last_modified_at: 2024-06-12
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 Paging

`Paging`은 `OS`가 메모리를 할당 및 관리하는 방법 중 하나이다. <br>

페이징의 목적은 `physical memory`와 `virtual memory` 간의 매핑을 통해 메모리 사용의 <br>

효율을 극대화하고, 메모리 공간을 잘 관리하도록 하기 위한 것이다. <br><br>

**Page**

- `virtual memory`를 `고정된 크기`의 블록으로 나눈 단위이다.

- 프로세스의 조각이라고 볼 수 있다.

**Frame**

- `physical memory`를 페이지와 동일한 크기로 나눈 단위이다.

- 메인 메모리의 조각이라고 볼 수 있다.

<br>

**Paging의 특징**

- 한 프로세스의 `page`는 불연속적으로 메인 메모리에 로드될 수 있다.

- 따라서, 프로세스의 특정 `page`가 메인 메모리의 어떤 `frame`에 위치하는지에 대한 정보가 필요하다.

- `OS`가 `프로세스마다 존재하는 Page Table`을 통해 관리한다.

- `Page Table`은 각 프로세스에 대해 가상 메모리 주소와 물리 메모리 주소 간의 매핑 정보를 <br>
  저장하는 데이터 구조로 `PCB`에 저장되어 있다.

- 외부 단편화가 발생하지 않지만, 프로그램의 `마지막 조각에서 내부 단편화가 발생할 수 있다.`

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/52b5a0ce-34fe-473c-abf8-a02594f9d788"></center>

<br>

## 💡 Address Translation in Paging

`Paging` 방법에서는 `page number`와 `offset`을 사용하여 `logical address`를 <br>

`physical address`로 변환하는 `translation`을 수행한다. <br><br>

**가정**

- 페이지 크기 = 1 KB

- `logical address` 크기 = 16 bits

- 사용자 프로세스의 크기 = 2700 bytes

- 프로세스의 `relative address` = 1502

<br>

**풀이**

사용자 프로세스는 2700 bytes이며, 페이지 크기는 1024 bytes이므로 3개의 page에 저장된다. <br>

상대 주소가 1502로 1024보다 크고, 2048보다 작으므로, 2번째 페이지에 위치할 것이다. <br><br>

1502를 이진수로 변환하면 $ 1502_{10} = 0000010111011110_2 $ 이고, <br>

논리 주소는 `page number`와 `offset`으로 나뉘는데, 페이지 크기가 1 KB이므로, 10비트는 <br>

`offset`을, 나머지 6비트는 페이지 번호를 나타낸다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/ecf2d7bc-1b01-4ef0-9ef0-43bf55495b5d"></center>

