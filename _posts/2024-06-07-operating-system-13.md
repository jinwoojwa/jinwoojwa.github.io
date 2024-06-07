---
title: "[OS] Disk Scheduling"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-disk-scheduling/

toc: true
toc_sticky: true
use_math: true

date: 2024-06-07
last_modified_at: 2024-06-07
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 Disk Structure

`하드 디스크 드라이브 (HDD)`는 여러 개의 플래터(Platter)가 회전축인 스핀들(Spindle)에 장착되어 <br>

플래터가 회전하면서 헤드가 데이터를 읽고 쓰는 방식으로 작동한다. <br>

각 플래터마다 두 개의 헤드(상단, 하단)가 있으며 헤드가 이동하여 데이터를 처리한다. <br>

디스크에서 데이터를 읽고 쓰기 위해서는 디스크 헤드가 목표 트랙으로 위치해야만 한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/3364dc0b-0abb-4aa0-afcc-a8e5550a02b7"></center>

<br>

하드 디스크 드라이브(HDD)에서 데이터를 읽고 쓰는 과정을 다음과 같이 나눌 수 있다.

- **Seek Time**

    + 헤드가 현재 위치에서 목표 트랙으로 이동하는 데 걸리는 시간이다.

    + HDD의 기계적 성능을 나타내는 지표이다.

- **Rotational Delay(Latency)**

    + 목표 데이터 `섹터가` 읽기/쓰기 `헤드 아래로` 도달할 때까지 디스크가 회전하는 데 걸리는 시간이다.

- **Data Transfer Time**

    + 디스크와 컴퓨터 간에 데이터를 전송하는 데 걸리는 시간이다.

- **Access Time**

    + 데이터 요청 시점부터 데이터를 읽기 시작할 때까지의 전체 시간이다.

    + `Access Time = Seek Time + Rotational Delay + Data Transfer Time`

<br>

# 👑 Disk Scheduling

`Disk Scheduling`은 하드 디스크 드라이브(HDD)에서 입출력(I/O) 요청을 처리하는 순서를 결정하는 <br>

알고리즘이다. 이 알고리즘은 디스크 성능을 최적화하고 응답 시간을 줄이기 위해 사용된다. <br>

각 알고리즘의 특성과 성능은 요청의 패턴과 디스크 사용 상황에 따라 달라질 수 있다. <br>

FIFO는 공평성을, SSTF는 성능 최적화를, SCAN은 균형 있는 처리를 중시하는 특징을 가진다.

<br>

## 💡 FIFO (First-In, First-Out)

- FIFO 알고리즘은 요청이 들어온 순서대로 처리하는 가장 간단한 디스크 스케줄링 방식이다.

- 요청이 큐에 들어오는 순서대로 처리되며, 헤드는 요청 순서에 따라 움직인다.

- 구현이 쉽고 공평하며 요청이 처리되는 순서가 예측 가능하다.

- 하지만, 헤드 이동이 비효율적일 수 있으며, `Seek Time`이 길어질 수 있다.

**요청 순서** : 98, 183, 37, 122, 14, 124, 65, 67 <br>
**현재 헤드 위치** : 53 <br>
**헤드 이동 거리** : 45(53-98) + 85(98-183) + 146(183-37) + 85(37-122) + 108(122-14) + 110(14-124) + 59(124-65) + 2(65-67) = 640

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/16c59306-5e08-4931-975b-991a975ed413"></center>

<br>

## 💡  SSTF (Shortest Seek Time First)

- SSTF 알고리즘은 `현재 헤드 위치에서 가장 가까운` 요청을 먼저 처리하는 방식이다.

- 현재 헤드 위치에서 가장 짧은 `Seek Time`을 필요로 하는 요청을 선택하여 처리한다.

- 특정 요청이 계속해서 뒤로 밀릴 수 있어, `Starvation` 현상이 발생할 수 있다.

**요청 순서** : 98, 183, 37, 122, 14, 124, 65, 67 <br>
**현재 헤드 위치** : 53 <br>
**헤드 이동 거리** : 12(53-65) + 2(65-67) + 30(67-37) + 23(37-14) + 84(14-98) + 24(98-122) + 2(122-124) + 59(124-183) = 236

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/5436bc13-9b60-4ca0-a636-626f8a31de77"></center>

<br>

## 💡 SCAN (Elevator Algorithm == Look policy)

- SCAN 알고리즘은 엘리베이터의 움직임과 유사하게, 헤드가 디스크의 한쪽 끝에서 다른 쪽 끝까지 <br>
  이동하면서 모든 요청을 처리하는 방식

- 끝에 도달하면 반대 방향으로 이동하면서 다시 요청을 처리한다.

- 디스크 arm이 한 방향으로만 움직인다.

**요청 순서** : 98, 183, 37, 122, 14, 124, 65, 67 <br>
**현재 헤드 위치** : 53 <br>
**헤드 이동 거리** : 16(53-37) + 23(37-14) + 14(14-0) + 65(0-65) + 2(65-67) + 31(67-98) + 24(98-122) + 2(122-124) + 59(124-183) = 236

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/bcdd5066-adc9-4b5c-a8a1-99c70b2dc6a8"></center>

<br>

# 👑 Disk Cache

컴퓨터 시스템에서는 디스크 I/O 성능을 향상시키기 위해 고속 메모리인 `disk cache`를 사용한다. <br>

즉, 메인 메모리의 `Buffer`의 한 종류이며, `page cahce` 또는 `buffer cache`라고도 불린다. <br>

디스크 캐시는 데이터를 디스크와 메인 메모리 사이에서 일시적으로 저장함으로써 디스크 접근 시간을 <br>

줄이고 데이터 전송 속도를 높인다. 캐시 관리 알고리즘으로는 다음과 같은 것들이 있다.

<br>

## 💡 LRU (Least Recently Used)

- 가장 오랫동안 사용되지 않은 데이터를 교체하는 알고리즘이다.

- 캐시에 데이터를 유지하는 시간에 따라 교체 여부를 결정한다.

- 데이터 항목을 스택에 저장하며, 항목에 접근할 때마다 해당 항목을 제거하고, <br>
  스택의 맨 위에 다시 삽입한다.

- 캐시가 가득 차면 스택의 맨 아래 항목을 제거한다.

<br>

## 💡 LFU (Least Frequently Used)

- 사용 빈도가 가장 낮은 데이터를 교체하는 알고리즘이다.

- 데이터 사용 빈도에 따라 교체 여부를 결정한다.

- 우선순위 큐를 사용하여 항목에 접근할 때마다 해당 항목의 빈도수를 업데이트하고, <br>
  큐에서의 위치를 조정한다.

- 캐시가 가득 차면 큐의 가장 낮은 우선순위 항목을 제거한다.

- 자주 사용되는 데이터가 캐시에 오래 남아 있을 가능성이 높다.

- 빈도 카운터를 유지하는 데 추가적인 메모리와 연산이 필요하다.

- 최근에 급격히 사용 빈도가 증가한 항목이 적절히 반영되지 않을 수 있다.
