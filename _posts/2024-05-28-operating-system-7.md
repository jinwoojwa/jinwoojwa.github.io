---
title: "[OS] Deadlock"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - CS
tags:
  - [Operating System]

permalink: /cs/operating_system07/

toc: true
toc_sticky: true

date: 2024-05-28
last_modified_at: 2025-05-05
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 Deadlock

`Deadlock(데드락)` 이란 여러 프로세스나 스레드가 서로 자원을 기다리며 무한정 멈춰 <br>

있는 상태이다. 예를 들어, 두 프로세스 `p1, p2` 가 있을 때, 두 프로세스는 자원 `r1, r2`를 <br>

모두 필요로 한다고 가정한다. 만약 `p1은 r1`을, `p2는 r2`를 얻은 상태라고 할 때, 두 프로세스 모두 <br>

`p1은 r2를, p2는 r1`을 얻기 위해 대기할 것이다. 하지만 서로 원하는 자원이 상대방에게 할당되어 <br>

무한정 기다리게 되는데 이를 `Deadlock`이라 하는 것이다.

<br>

## 💡 데드락의 발생 조건

데드락이 발생하기 위해서는 다음의 네 가지 조건이 `모두` 만족되어야 한다.

- **Mutual exclusion**

    + 한 번에 오직 하나의 프로세스만 자원을 사용할 수 있다.

- **Hold and Wait**

    + 자원을 점유하고 있는 프로세스가 다른 자원을 요청하며 대기하고 있는 상태

- **No preemption**

    + 자원은 강제로 회수될 수 없고, 사용 중인 자원은 점유하고 있는 프로세스에 의해서만 해제가 가능

- **Circular wait**

    + 순환 형태로 자원을 대기하는 프로세스의 집합이 존재

<br>

## 💡 데드락 처리 방법

1. **데드락 예방 (Deadlock Prevention)** <br>

    + 데드락 발생 조건 네 가지 중 하나를 제거하여 데드락을 예방하는 방법이다.

    + `Mutual exclusion` 제거

        * 모든 자원을 동시에 여러 프로세스가 사용할 수 있도록 하는 방법으로, 불가능한 방법이다.

    + `Hold and Wait` 제거

        * 프로세스가 자원 요청 시 한 번에 모든 자원을 할당하는 방법, 가능하지만 자원 낭비가 심함.

    + `No preemption` 제거

        * 자원이 점유된 상태에서 다른 자원이 필요할 경우 점유하고 있는 자원을 강제로 반환하게 함. <br>
          가능하지만 자원 낭비가 심하다.

    + `Circular wait` 제거

        * 자원에 순서를 부여하여 프로세스가 자원을 요청할 경우 순서대로 요청하게 한다. <br>
          가능하나 불편함

2. **데드락 회피 (Deadlock Avoidance)**

    + 데드락이 발생할 가능성이 있는 상태를 회피하는 방법으로, `Banker's Algorithm`이 대표적.

3. **데드락 검출 및 복구 (Deadlock Detection and Recovery)**

    + 데드락 발생을 허용하되, 주기적으로 시스템 상태를 검사하여 데드락을 검출하고 복구하는 방법.

    + 자원 할당 그래프를 사용하여 교착 상태를 탐지하며, 탐지 알고리즘을 사용하므로 오버헤드가 발생

    + 교착 상태를 일으킨 프로세스를 종료시키거나, 할당된 자원을 선점하여 회복시킨다.

<br>

### 🚩 Banker's Algorithm

`Banker's Algorithm` 은 데드락을 회피하기 위한 방법 중 하나로, 프로세스가 자원을 요청할 때 <br>

시스템이 `안전 상태`인지 확인하여 자원을 할당하는 알고리즘이다. 데드락을 회피하기 위해 <br>

각 프로세스의 최대 자원 요구량을 사전에 알고 있어야만 한다. <br><br>

`Banker's Algorithm`의 기본 아이디어는 은행에서 모든 고객이 요구하는 금액을 요청하더라도 은행이 <br>

파산하지 않도록 자금을 할당하는 방식에서 유래되었으며, 시스템이 프로세스에게 자원을 할당하기 전 <br>

자원을 할당하더라도 여전히 시스템이 안전한 상태에 있을 것인지를 확인한다. 만약 안전한 상태라면 <br>

자원을 할당하고, 그렇지 않다면 요청을 거절한다. <br>

[✔ 참고 자료](https://en.wikipedia.org/wiki/Banker%27s_algorithm)


