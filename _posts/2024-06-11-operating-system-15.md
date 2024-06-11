---
title: "[OS] Memory Management"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-memory-partitioning/

toc: true
toc_sticky: true
use_math: true

date: 2024-06-11
last_modified_at: 2024-06-11
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 Memory Management

오늘날의 `Multiprogramming system`에서는 여러 프로세스를 이용하기 위해 메인 메모리를 나누어 <br>

사용해야 할 필요가 있다. 적은 프로세스만이 메모리에 로드되어 있다면, `CPU`의 자원이 낭비되는 <br>

시간이 길어져 자원을 효율적으로 활용할 수 없다. 따라서 `OS`는 여러 프로세스를 메모리에 수용하기 <br>

위해 동적으로 메모리를 세분화하는 작업을 수행하며, 이를 `Memory Management`라 부른다.

<br>

운영 체제가 메모리를 어떻게 관리하는지를 알기 위해서는 다음의 개념들에 대해 알아야 할 필요가 있다.


**Relocation**

- `Multiprogramming` 환경에서는 수많은 프로세스들이 한정된 메모리 공간을 사용한다.

- 사용자는 어떤 프로그램이 메모리의 어떤 위치에 로드되는지를 알 수 없으며, 메모리 공간이 부족할 경우 <br>
  `swap` 역시 빈번하게 일어나기에 특정 위치에 특정 프로그램을 로드할 수는 없다.

- 따라서, 프로그램이 메모리의 어느 위치에서든 올바르게 실행될 수 있도록 보장해야 하며, 프로세스의 <br>
  주소를 옮기는 작업을 `relocation`이라 한다.
  
**Protection**

- `Protection`이란 시스템 내에서 프로세스 간의 상호 간섭을 방지하기 위한 메커니즘이다.

- 각 프로세스는 자신의 메모리 주소에만 접근해야 하며, 특정 프로세스가 다른 프로세스의 메모리 영역을 <br>
  손상시키지 못하도록 보장되어야만 한다.

**Sharing**

- `Sharing`은 여러 프로세스가 동일한 메모리 영역을 공유하는 것을 의미한다.

- 만약 여러 개의 프로세스가 같은 프로그램을 실행시킨다면, 프로세스의 수만큼 메모리 공간을 차지하는 <br>
  것은 효율적이지 못하다.

- 따라서, 리소스 사용의 효율성을 높이기 위해 `shared memory`를 사용하는 것이 바람직하다.

<br>

# 👑 Memory Partitioning

`Memory Partitioning`은 컴퓨터 시스템에서 사용 가능한 메모리를 여러 영역(파티션)으로 분할하는 <br>

것을 말한다. `Memory Partitioning`은 시스템의 리소스를 최적으로 활용하고 효율적으로 관리하기 <br>

위해 사용되며 여러 가지 방법이 존재한다.

<br>

## 💡 Fixed Partitioning

- 메모리를 사전에 정의된 크기의 고정된 파티션으로 분할하는 메모리 관리 기법이다.

- 파티션의 개수가 정해져 있기 때문에 실행 가능한 프로세스의 개수 역시 제한된다.

- `내부 단편화 (Internal Fragmentation)` 문제가 발생할 수 있다.

    * 파티션의 크기보다 작은 프로그램이 해당 파티션에 할당될 경우, 남은 공간을 활용할 수 없다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/ba9d729b-a18f-4d77-b4b4-5380c1615f62" width="400"></center>

<br>

## 💡 Dynamic Partitioning

- 동적 파티셔닝은 메모리를 프로세스의 크기에 따라 동적으로 나누는 메모리 관리 기법이다.

- 프로세스가 요청하는 메모리 크기에 따라 새로운 파티션이 생성되거나 기존의 파티션이 확장될 수 있다.

- 내부 단편화는 발생하지 않지만, `외부 단편화 (External Fragmentation)` 문제가 발생할 수 있다.

- 이를 해결하기 위해, 적절하게 `memory compaction`을 해주어야 한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/23f9ae90-9fe8-4a46-ab95-9849aa0d0ad9" width="600"></center>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/0618f1f4-b8c3-4367-9470-74de6153783b" width="600"></center>

<br>

동적 파티셔닝에서 빈 메모리 공간을 할당하는 방법에는 여러 가지가 있다.

**First-fit Algorithm**

- 가용한 파티션 중에서 가장 처음으로 발견되는 충분한 크기의 파티션을 선택하여 할당하는 방법이다.

- 가장 간단하고 빠르게 작동하지만, 메모리 파티션을 순회하면서 첫 번째로 맞는 파티션을 찾기 <br>
  때문에 외부 단편화 문제를 유발할 수 있다.

**Best-fit Algorithm**

- 가장 작은 크기의 충분한 파티션을 선택하여 할당하는 방법이다.

- 파티션을 찾는 데 오래걸리기 때문에 성능이 가장 안좋다.

- `memory compaction`이 자주 발생하게 된다.

**Worst-fit Algorithm**

- 사용 가능한 공간들 중에서 가장 큰 것을 선택하여 할당하는 방법이다.

- best-fit 방법만큼이나 성능이 좋지 않다.

**Next-fit Algorithm**

- 최근에 할당된 위치에서부터 시작하여, 다음 충분한 크기의 파티션을 선택하여 할당하는 방법이다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/30d0b6b1-a104-47d7-b9db-743a99db1aef" width="400"></center>

<br>

## 💡 Buddy System

- 동적 파티셔닝의 일종으로, 메모리를 크기가 2의 거듭제곱인 블록으로 나누어 관리하는 방법이다.

- 메모리는 크기가 2의 거듭제곱인 블록으로 분할된다. <br>
  예를 들어, 1024KB의 메모리는 512KB, 256KB, 128KB 등의 블록으로 나누어진다.

- 크기가 `s`인 요청이 들어오면, $ 2^{U-1} < s \leq 2^{U} $ 와 같은 방법으로 블록을 결정한다.

- 각 블록은 두 개의 `buddy` 블록으로 나뉜다. (256KB -> 128KB + 128KB)

- 메모리 블록이 해제되면, 해당 블록의 버디 블록이 비어 있는지 확인하고, 버디 블록이 <br>
  비어 있다면, 두 블록을 다시 병합한다.

- 메모리 블록 크기가 2의 거듭제곱이기 때문에, 요청된 크기보다 큰 블록이 할당될 경우 <br>
  `내부 단편화 (Internal Fragmentation)`가 발생할 수 있다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/ca69354d-74e0-47e2-8559-2da1d128a290"></center>

<br>

# 👑 Memory Address

메모리 주소에는 여러 종류가 있으며, 컴퓨터 시스템에서 각기 다른 목적을 위해 사용된다. <br>

주로 사용되는 메모리 주소의 종류는 다음과 같다.

**Physical Address = Absolute Address**

- 실제 하드웨어 메모리(RAM)에서의 위치를 나타내는 주소이다.

- CPU가 메모리에 접근할 때 사용하는 실제 주소이다.

- 물리적 주소는 메모리 관리 장치(MMU, Memory Management Unit)에 의해 <br>
  가상 주소로 변환된다.

**Logical Address**

- 프로그램이 생성되는 동안 컴파일러나 어셈블러에 의해 생성된 주소이다.

- 즉, 응용 프로그램 관점에서의 주소라고 볼 수 있다.

- `logical address`를 `physical address`로 바꾸는 과정이 필요하다.

**Virtual Address**

- 가상 메모리 시스템에서 프로세스가 사용하는 주소 공간이다.

- `Virtual Memory`에서 사용하는 `Logical Address`이다.

**Relative Address**

- 기준점(base address)으로부터의 상대적인 위치를 나타내는 주소이다.

- 프로그램 코드에서 종종 사용되며, 기준점은 프로그램의 시작 주소가 될 수 있다.

<br>

## 💡 Address Binding

`Address Binding`이란 프로그램의 논리적 주소를 물리적 주소로 변환하는 과정이다. <br>

프로그램이 메모리에 로드되어 실행될 때, 논리적 주소(코드에서 사용하는 주소)는 <br>

물리적 주소(실제 메모리의 주소)로 변환되어야 한다.

주소 바인딩은 프로그램의 생애 주기 동안 다양한 시점에 발생할 수 있으며, 이를 크게 <br>

세 가지로 나눌 수 있다. (`Compile time`, `Load time`, `Execution time`)

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/ef162dd7-8d36-4e38-83a4-19f05ae304b9"></center>

<br>

### 🚩 Compile time binding

- 주소 바인딩이 컴파일 시점에 이루어진다.

- 즉, 프로그램이 컴파일될 때 모든 변수와 명령어에 대해 실제 물리적 주소가 할당된다.

- 프로그램이 항상 같은 메모리 위치에 로드되어야 하는 문제점이 있다.

- 물리적 메모리 위치를 변경하려면 컴파일을 다시 해야한다.

<br>

### 🚩 Load time binding

- 프로그램이 메모리에 로드될 때 주소 바인딩이 이루어진다.

- 컴파일된 프로그램은 `relocatable` 형태로 저장되며, 실제 메모리 위치는 프로그램이 <br>
  실행될 때 결정된다.

- 프로그램이 종료될 때까지 물리적 메모리 상의 위치가 고정된다.

<br>

### 🚩 Execution time binding

- 프로그램이 실행되는 동안 주소 바인딩이 이루어진다.

- 즉, 실행 중에 동적으로 주소 변환이 이루어진다.

- `base register`, `limit register`, `MMU` 등의 하드웨어가 필요하다.

<br>

**Base Register**

- 프로세스의 시작 주소를 가지고 있다.

- 베이스 레지스터의 값은 각 프로세스가 실제 물리 메모리에서 어느 위치에 로드되었는지를 나타내므로, <br>
  논리 주소를 물리 주소로 변환할 때 사용한다.

**Limit Registe = Bound register**

- 프로세스가 사용할 수 있는 메모리 범위를 지정한다.

- 프로세스가 접근할 수 있는 메모리의 최대 크기를 정의하여, 프로세스가 할당된 메모리 범위를 <br>
  벗어나지 않도록 한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/d8cb82ab-c60e-43e5-a3fd-ca06c5a31a39" width="600"></center>


