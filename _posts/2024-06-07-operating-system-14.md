---
title: "[OS] RAID"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-raid/

toc: true
toc_sticky: true
use_math: true

date: 2024-06-07
last_modified_at: 2024-06-07
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 RAID

`RAID (Redundant Array of Independent (Inexpensive) Disks)`란 여러 개의 하드 디스크에 <br>

일부 중복된 데이터를 나눠서 저장하는 기술이다. 데이터를 나누는 다양한 방법이 존재하며, <br>

이 방법들을 레벨이라 하며, 레벨에 따라 다양한 수준의 데이터 보호와 성능 개선을 제공한다.

<br>

`RAID`는 여러 개의 디스크를 하나로 묶어 하나의 논리적 디스크로 작동하게 하는데, 하드웨어적인 방법과 <br>

소프트웨어적인 방법이 있다. 하드웨어적인 방법은 운영 체제에 이 디스크가 하나의 디스크처럼 보이게 <br>

한다. 소프트웨어적인 방법은 주로 운영체제 안에서 구현되며, 사용자에게 디스크를 하나의 디스크처럼 <br>

보이게 한다.

<br>

## 💡 RAID 0

- 데이터를 여러 디스크에 스트라이핑(분산)하여 저장하는 방식이다.

- 데이터가 여러 디스크에 나뉘어 저장되며, 성능이 크게 향상되는 효과가 있다.

- 데이터 중복성이 없기 때문에 디스크 중 하나라도 고장 나면 데이터 손실이 발생한다.

- `RAID 0`은 오류 검출 기능을 제공하지 않아 어떠한 오류도 복구하지 못한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/6c86ffa6-894e-4910-bcd2-f3eb6fdce2fc" width="400"></center>

<br>

## 💡 RAID 1 (mirrored)

- 동일한 데이터를 두 개 이상의 디스크에 복제하여 저장하는 방식이다.

- 모든 데이터가 동일하게 두 개 이상의 디스크에 저장된다.

- 한 디스크가 고장 나더라도 다른 디스크에 동일한 데이터가 있기 때문에 데이터 복구가 가능하다.

- 읽기 성능은 향상되지만, 쓰기 성능은 성능 저하가 따를 수 있다.

- 저장 용량의 50%를 활용한다. (두 배의 디스크가 필요)

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/d2100eb8-f141-4fd2-bac2-44b9fed8ca33"></center>

<br>

## 💡 RAID 2

- RAID 2는 `Hamming code`와 같은 오류 수정 코드를 사용하여 데이터 오류를 감지하고 수정한다.

- 데이터가 비트 단위로 여러 디스크에 분산되어 저장된다.

- 오류 수정 코드 비트는 별도의 디스크에 저장된다.

- 즉, RAID 2는 여러 개의 데이터 디스크와 여러 개의 오류 수정 코드 디스크로 구성된다.

- 여러 디스크에 데이터와 오류 수정 코드를 분산 저장함으로써 데이터 보호 수준이 높다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/ecdaebff-948a-4881-9318-5cfec8324e03" width="600"></center>

<br>

## 💡 RAID 3

- RAID 3는 바이트 단위로 데이터를 스트라이핑하고, 전용 패리티 디스크를 사용한다.

- 모든 디스크가 동기화되어야 하기 때문에, 다중 요청을 동시에 처리하는 것이 어렵다.

- 모든 디스크가 동기화된 상태로 회전해야 한다.

- 즉, 모든 디스크의 스핀들이 동일한 시점에 동일한 위치에 있어야 한다. (설계 어려움)

- 전용 패리티 디스크를 통해 데이터 디스크 중 하나가 고장 나더라도 데이터를 복구할 수 있다.

- RAID 3는 설계의 복잡성과 패리티 디스크의 병목 현상 등으로 인해 빠르게 RAID 5와 같은 <br>
  다른 RAID 레벨로 대체되었다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/26bcb3d5-e423-43c0-8071-26a1ca82437d" width="600"></center>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/9433465c-2b78-43b9-a839-ac1b4bce7bdb" width="600"></center>

