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

- RAID 3는 `바이트 단위`로 데이터를 스트라이핑하고, 전용 패리티 디스크를 사용한다.

- 모든 디스크가 동기화되어야 하기 때문에, 다중 요청을 동시에 처리하는 것이 어렵다.

- 모든 디스크가 동기화된 상태로 회전해야 한다.

- 즉, 모든 디스크의 스핀들이 동일한 시점에 동일한 위치에 있어야 한다. (설계 어려움)

- 전용 패리티 디스크를 통해 데이터 디스크 중 하나가 고장 나더라도 데이터를 복구할 수 있다.

- RAID 3는 설계의 복잡성과 패리티 디스크의 병목 현상 등으로 인해 빠르게 RAID 5와 같은 <br>
  다른 RAID 레벨로 대체되었다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/2e7acdc4-e02a-4e0f-991c-f1ab1d20037d" width="600"></center>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/9433465c-2b78-43b9-a839-ac1b4bce7bdb" width="600"></center>

<br>

## 💡 RAID 4

- RAID 4는 `블록 수준`에서 데이터를 스트라이핑하고, 전용 패리티 디스크를 사용한다.

- RAID 3와 유사하지만, 데이터 스트라이핑 단위가 블록이라는 점에서 차이가 있다.

- 각 블록은 독립적으로 접근할 수 있기 때문에, RAID 3와 달리 병렬 I/O 작업이 가능하다.

- 데이터 읽기 성능은 좋지만, 단일 패리티 디스크를 사용하기에 쓰기 성능은 좋지 않다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/0a6facaf-9013-4f2f-87f3-52bb01e9a639" width="600"></center>

<br>

## 💡 RAID 5

- RAID 5는 데이터를 블록 단위로 스트라이핑하고, 패리티 정보를 분산 저장하는 방식이다.

- 패리티 정보가 모든 디스크에 분산 저장되며, 각 블록의 패리티는 다른 디스크에 저장되어 <br>
  특정 디스크에 패리티 정보가 집중되지 않는다.

- RAID 5를 구현하려면 `최소 3개의 디스크`가 필요하다.

- 데이터를 읽을 때는 필요한 데이터 블록만 읽으면 되며, 쓸 때는 변경된 블록과 그 블록에 <br>
  대응하는 패리티 블록을 업데이트 한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/626549c0-e20c-469e-a21a-81ba348f4f05" width="600"></center>

<br>

## 💡 RAID 6

- 데이터를 블록 단위로 스트라이핑하고, `이중 패리티 정보`를 분산 저장하는 방식이다.

- 두 개의 독립적인 패리티 정보(P, Q)가 모든 디스크에 분산 저장되며, 두 개의 디스크가 <br>
  고장 나더라도 데이터를 복구할 수 있다.

- RAID 6를 구현하려면 최소 4개의 디스크가 필요하다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/d61ced9f-9f22-4a3e-8f8b-324169f5210e" width="600"></center>

<br>

## 💡 RAID 01, RAID 10

**RAID 01**

- RAID 0과 RAID 1의 장점을 결합한 방식이다.

- 데이터 스트라이핑과 미러링을 동시에 사용하여 성능과 데이터 보호를 제공한다.

- RAID 01을 구현하려면 최소 4개의 디스크가 필요하다.

- 두 개의 디스크는 RAID 0 스트라이프 세트를 구성하고, 나머지 두 개의 디스크는 이 스트라이프 <br>
  세트를 미러링한다.

- 읽기 작업의 병렬 수행과 미러링된 디스크에서 읽기 작업을 분산처리하여 성능이 향상된다.

- 미러링을 통해 데이터 무결성을 보장하고, 하나의 디스크 세트가 고장 나더라도 데이터를 복구할 수 있다.

<br>

**RAID 10**

- RAID 1과 RAID 0의 장점을 결합한 방식이다.

- 동일 데이터를 두 개의 디스크 세트에 복제하여 저장하고, 미러링된 데이터를 블록 단위로 <br>
  여러 디스크에 스트라이핑하여 저장한다.

- RAID 10을 구현하려면 최소 4개의 디스크가 필요하다.

- 두 개의 디스크 세트는 각각 미러링되고, 이 두 개의 미러링 세트는 스트라이핑된다.

- `RAID 01` 보다 성능이 좋다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/c657afa4-0aa5-48f0-9466-30efda814111" width="600"></center>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/913ffd92-65e6-4c3e-94d6-5109b15451ef" width="600"></center>