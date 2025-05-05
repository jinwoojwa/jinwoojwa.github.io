---
title: "[OS] Demand Paging"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - CS
tags:
  - [Operating System]

permalink: /cs/operating_system18/

toc: true
toc_sticky: true
use_math: true

date: 2024-06-18
last_modified_at: 2025-05-05
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 Demand Paging

가상메모리는 `segmentation`과 `paging` 기법으로 구현될 수 있지만, 일반적으로 페이징 기법을 통해 <br>

구현된다. 페이징 기법에서 프로세스는 고정된 크기의 페이지로 구성되며, 가상 메모리에 저장된다. <br>

각 페이지는 메인 메모리의 어디에나 위치할 수 있으며, `page table`이 가상(논리) 주소에서 물리 주소로 <br>

변환되는데 사용된다. <br><br>

기존의 `paging` 기법과 같지만, 모든 페이지를 메인 메모리에 로드시키는 것이 아니라, 요구하는 <br>

페이지만을 메모리에 로드하는 방식으로 동작하여 `Demand Paging`이라 한다. `Demand Paging` 역시 <br>

프로세스별 `page table`을 가지지만, 페이지 테이블 항목은 기존 페이징 방식보다 복잡하다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/ab3c2c26-8cde-4128-9100-2670d18e8244"></center>

<br>

## 💡 Page Table Entry

`페이지 테이블 엔트리(Page Table Entry, PTE)`는 가상 메모리 시스템에서 가상 주소를 물리 주소로 <br>

변환하기 위해 사용되는 데이터 구조이다. 각 `PTE`는 페이지 테이블 내의 하나의 항목을 의미한다. <br>

`virtual address`는 페이지 번호와 오프셋으로 구성되며, `PTE`는 프레임 번호와 제어 비트들로 <br>

이루어져 있다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/bba1be72-0ed8-4ba5-b03b-605efaf3cb36" width="400"></center>

<br>

**UNIX PTE의 제어 비트**

운영체제마다 `PTE` 의 구조는 다를 수 있다. 다음은 `UNIX PTE`의 제어비트들의 종류이다.

- `Age`

  + 페이지가 참조되지 않고 얼마나 경과하였는지를 나타낸다.

- `Copy On Write`

  + 두 개 이상의 프로세스가 페이지를 복사하지 않고 원본 페이지를 공유하고 있을 때 설정된다.

- `Modify = dirty`

  + 페이지가 수정되었는지 여부를 나타낸다.

  + 만약 페이지가 변경되지 않았다면 이후 그 페이지가 교체될 때 내용을 디스크에 기록할 필요가 없다.

- `Reference`

  + 페이지가 참조되었는지 여부를 나타낸다.

- `Valid = Present`

  + 페이지가 메인 메모리에 있는지 여부를 나타낸다.

- `Protect`

  + 쓰기 작업이 허용되어 있는지를 나타낸다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/eb06c678-2011-4f3f-9420-c1f7a98b551c" width="600"></center>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/bc9ebf65-82ff-44e9-a760-e33d57270256"></center>

<br>

## 💡 Multi-level (Hierarchical) Page Table

일반적으로 프로세스 당 하나의 `page table`을 가지는데, 각 프로세스가 엄청 큰 크기의 <br>

가상메모리를 가진다면 페이지 테이블이 너무 커질 수 있으며, 페이지 테이블이 메인 메모리의 <br>

너무 많은 부분을 차지할 수 있는 문제점이 발생한다. <br><br>

이를 해결하기 위해 대부분의 가상메모리 기법은 `page table`을 가상 메모리에 저장하며, <br>

`Multi-level page table` 이나 `Inverted page table`을 사용하기도 한다. <br><br>

**Two-Level Paging 예시**

- 가상 주소가 32비트인 시스템에서, 4KB 페이지 크기를 사용한다고 가정한다.

  + 페이지 크기가 4KB이므로, offset은 12 bits를 사용해야한다. $ (2^{12} = 4096 = 4 KB) $

  + 32비트 논리주소에서 12비트를 사용했으므로, `page number`에 20비트가 할당된다.

  + 2단계 기법에서는 이 20비트를 10비트 + 10비트로 나눠 사용한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/d088ceaa-d8fb-4938-8423-be7d511b9214"></center>

- 위의 그림에서 `user page table`은 논리적으로는 연속적이지만, 실제 메모리 상에서는 <br>
  연속적으로 위치하지 않을 수 있다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/19734c39-80d8-4af8-9057-68e76f51a232"></center>

