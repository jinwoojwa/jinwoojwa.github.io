---
title: "[OS] Paging & Segmentation"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - CS
tags:
  - [Operating System]

permalink: /cs/operating_system16/

toc: true
toc_sticky: true
use_math: true

date: 2024-06-12
last_modified_at: 2025-05-05
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

<br>

# 👑 Segmentation

`Segmentation`은 OS가 메모리를 관리하는 방법 중 하나로, 프로그램과 데이터의 논리적 구조를 <br>

반영하여 메모리를 다루는 기법이다. 프로그램을 `Segment`라는 단위로 나눠 관리한다. <br>

**Segment**

- 세그먼트는 프로그램과 데이터가 논리적으로 구분된 블록이다. 예를 들어, 코드 세그먼트, 데이터 <br>
  세그먼트, 스택 세그먼트 등이 있다.
  
- 각 세그먼트는 동일한 유형의 데이터를 포함하며, `크기가 서로 다를 수 있다.`

**Segment Table**

- 각 세그먼트는 세그먼트 테이블에 의해 관리된다.

- 세그먼트 테이블에는 각 세그먼트의 `시작 주소(base address)`와 `길이(limit)`가 저장된다.

- 이를 통해 특정 세그먼트에 접근할 때 물리적 메모리 주소를 계산할 수 있다.

<br>

**Segmentation의 특징**

- `dynamic partitioning` 방법과 유사하다. (segment이 곧 파티션)

- 동적 할당과의 차이점은 `segmentation`의 경우 프로그램이 하나 이상의 파티션을 차지할 수 <br>
  있고, 파티션들이 연속적일 필요는 없다는 것이다.

- 내부 단편화가 없지만, 외부 단편화가 존재한다. (외부 단편화가 상대적으로 적긴 함)

- 페이징 기법에서와 같이 `logical address`를 `segment number`와 `offset`으로 나눈다.

- 사용자 프로그램의 전체 크기는 모든 세그먼트 크기의 합과 같다. <br>
  e.g. 코드 세그먼트 = 10KB, 데이터 세그먼트 = 5KB, 스택 세그먼트 = 2KB라면, <br>
  전체 프로그램 = 17KB

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/d7a9efd9-4c66-45ac-821c-386ce2f34b37"></center>

<br>

## 💡 Address Translation in Segmentation

`Paging` 방법처럼 `logical address`를 두 영역 `segment number`와 `offset`로 나눠 <br>

`physical address`로 변환하는 `translation`을 수행한다. <br><br>

**가정**

- Segment의 최대 크기 = 4 KB

- `logical address` 크기 = 16 bits

- 사용자 프로세스의 크기 = 2700 bytes

- segment 0의 크기 = 750 bytes

- segment 1의 크기 = 1950 bytes

- 프로세스의 `relative address` = 1502

<br>

**풀이**

우선 `segment`의 최대 크기가 4 KB = $ 2^{12} $ 이므로, `offset`을 나타내기 위해서는 <br>

12 bits 가 필요하다. 따라서, 16 bits 논리 주소에서 4 bits를 segment number에 사용한다. <br><br>

`segment 0`의 크기가 750 bytes이므로, 상대 주소 1502는 `segment 1`에 위치할 것이다. <br>

또한, `segment 1`에서 752(1502 - 750)만큼 떨어진 위치에 존재할 것이므로, `offset`은 752이다. <br><br>

$ 752_{10} = 001011110000_2 $ -> `offset`

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/1ce4b399-e31a-4852-aa06-cb59bc3e65bd"></center>

<br>

# 👑 요약

메모리 관리는 `OS`의 가장 중요하고 복잡한 일 중 하나로 여러 장치들을 효율적으로 사용하기 <br>

위해서는 가능한 한 많은 프로세스들을 메인 메모리에 유지하는 것이 바람직하다. <br>

메모리 관리의 기본적인 방법인 `paging`과 `segmentation`이 있다. <br>

`paging`은 프로세스를 고정된 크기의 `page`로 나누며, `segmentation`은 크기가 동일하지 않은 <br>

`segment`로 나눠 사용한다. 하나의 메모리 관리 기법 안에서 둘을 결합하여 사용하는 것도 가능하다.