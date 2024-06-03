---
title: "[OS] File System - Management of Data Blocks"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-file-system2/

toc: true
toc_sticky: true

date: 2024-05-31
last_modified_at: 2024-05-31
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 Data Blocks

파일 시스템의 구성 요소 중 `실제 데이터가 저장되는` 블록인 data block이 있다. <br>

파일을 저장하기 위해서는 이러한 데이터 블록에 공간을 할당해야 하며, 파일 시스템은 할당 가능한 공간을 <br>

추적하고 관리해야 한다. 데이터 블록의 할당 방법에는 다양한 방식이 존재한다. 

<br>

## 💡 연속 할당 (Contiguous allocation)

파일 생성 시, 파일의 전체 크기에 맞는 `연속된` 공간을 배정하는 방법이다. <br>

`FCB` 또는 `File allocation table`에 파일의 시작 블록 번호와 파일의 길이가 저장되며, <br>

이 정보를 통해 파일의 내용을 읽고 쓸 때 필요한 블록 위치를 확인한다. <br>

**장점**

- 임의의 블록에 `직접 접근이 가능`하다.

    + 연속된 블록에 저장하므로 파일 내 특정 블록의 접근이 가능하며, 이는 `데이터 접근 속도를 높인다.`

- 파일이 연속된 블록에 저장되어 손상 가능성이 줄어들고, 복구 및 백업 시에도 유리할 수 있다. (안전성 ↑)

**단점**

- 하지만, 연속적인 공간을 사용하므로, `파일 크기 증가가 어렵다.`

- 또한, 파일의 생성 및 삭제가 반복되면 연속된 빈 공간이 부족해져 `외부 단편화`를 초래한다. <br>
  즉, `공간 활용도가 떨어지며`, 외부 단편화 해결을 위한 디스크 압축 등의 오버헤드가 발생한다.

**정리**

연속 할당은 데이터 접근 속도가 빠르고, 구조가 단순하지만, 파일 크기의 동적 증가와 <br>

외부 단편화 문제로 인해 현대 파일 시스템에서는 자주 사용되지 않는다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/c8f9ea49-a65f-432e-804c-5baec357a485"></center>
  
<br>

## 💡 연결 할당 (Linked allocation = Chained allocation)

연결 할당은 블록들을 개별적으로 할당하고, 각 블록이 다음 블록을 가리키는 포인터를 포함하는 구조이다. <br>

자료구조의 `Linked List`와 유사하게 동작하며, `non-contiguous` 할당 방법 중 하나이다. <br>

파일의 각 데이터 블록이 개별적으로 할당되며, 연속 할당처럼 `FCB` 또는 `File allocation table`에 <br>

시작 블록 번호와 파일의 길이를 기록한다.

**장점**

- 파일의 크기를 동적으로 증가시키는 데 문제가 없다.

- 블록들이 개별적으로 할당되므로, 연속된 빈 공간을 필요로 하지 않아 `외부 단편화가 발생하지 않는다.`

**단점**

- 포인터를 따라가야 하므로, 특정 블록으로의 `직접 접근이 불가능`하다.

- 블록들이 디스크 상에 흩어져 있을 수 있어, `디스크 접근 속도가 느리다.`

- 각 블록들이 포인터로 연결되어 있어, 포인터 손상 시 전체 파일 접근이 어려워진다. (안전성 ↓)

**정리**

연결 할당은 파일 크기 변경이 빈번하고, 외부 단편화를 피하고자 할 때 유용하지만, <br>

데이터 접근 속도와 안전성 문제로 인해 제한적인 환경에서 사용된다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/e5dfd1a3-bb45-4aa3-ac88-402dca5affb4"></center>

<br>








