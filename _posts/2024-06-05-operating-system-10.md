---
title: "[OS] UNIX/Linux File System"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - CS
tags:
  - [Operating System]

permalink: /cs/operating_system10/

toc: true
toc_sticky: true
use_math: true

date: 2024-06-05
last_modified_at: 2025-05-05
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 UNIX File System

`UNIX File System`에서는 다음의 여섯 가지 종류로 파일을 구분한다.

- **Regular (or Ordinary) file**

- **Directory**

- **Special file**

- **Named pipes**

- **Links**

- **Symbolic links**

<br>

## 💡 Inode

UNIX 및 UNIX 계열 운영 체제에서 `inode(인덱스 노드)`는 파일에 대한 메타데이터를 저장하는 데이터 <br>

구조이다. 파일 시스템의 각 파일은 inode과 연결되어 있으며, 해당 파일에 대한 중요한 정보를 포함한다. <br>

`inode`에 대한 주요 내용은 다음과 같다.

- **고유 식별자**

    + 각 `inode`는 파일 시스템 내에서 `inode 번호(인덱스 번호)`로 고유하게 식별된다. <br>
      이 번호는 운영 체제가 inode와 연결된 파일을 찾고 관리하는 데 사용된다.

- **메타데이터**

    inode은 파일에 대한 메타데이터를 저장하며, 이는 다음을 포함한다.

    + 파일 유형 (일반 파일, 디렉토리, 심볼릭 링크 등을 구분)

    + 파일 소유자, 그룹 및 기타 사용자에 대한 권한(읽기, 쓰기, 실행)

    + 타임스탬프(생성 시간, 최근 접근 시간, 최근 수정 시간)

    + 파일 크기(바이트 단위)

    + 파일의 실제 내용을 저장하는 디스크의 데이터 블록에 대한 포인터

    + `Link Count` : 해당 `inode`에 대한 링크의 수를 나타내는 값 <br>
      쉽게 말하면, `몇 개의 디렉토리에서 이 파일을 가리키고 있는지`를 알려줌

- **데이터 블록에 대한 포인터**

    + inode에는 일반적으로 파일 내용이 저장된 디스크의 데이터 블록에 대한 포인터가 포함되어 있다.

    + 이러한 포인터는 파일 크기 및 파일을 저장하는 데 필요한 데이터 블록의 양에 따라 <br>
      직접 포인터, 단일 간접 포인터, 이중 간접 포인터 또는 삼중 간접 포인터일 수 있다.

- **Inode 테이블**

    + 파일 시스템은 파일 시스템 내 모든 파일의 inode를 포함하는 `inode table (or list)`을 <br>
      가지며, 파일에 액세스할 때 해당하는 inode가 메모리로 로드되어 파일 작업에 사용된다.

<br>

## 💡 UNIX File Allocation

 UNIX 시스템은 `Indexed allocation` 방식을 사용하여, 파일을 블록 단위로 할당한다. <br>
 
 파일의 블록은 연속적이지 않을 수 있으며, 파일 할당 방식은 각 파일의 `inode`에 저장되어 있다. <br><br>

 일반적으로 UNIX 시스템에서는 다음과 같은 방식으로 파일 할당이 이루어진다.

 - **Direct Pointers**

    + 모든 UNIX 시스템 구현에서는 inode에 `직접 포인터(direct pointers)`가 포함되어 있다. <br>
    
    + 직접 포인터는 파일의 처음 몇 개 블록을 직접 가리키는 포인터로, 일반적으로 12개이다. <br>
    
    + 이는 작은 파일의 경우에는 파일 데이터 블록을 직접 가리키는 데 사용된다.

- **Indirect Pointers**

    파일이 더 많은 블록을 필요로 하는 경우, inode에는 `간접 포인터(indirect pointers)`가 <br>
    포함된다. 간접 포인터는 추가적인 블록을 가리키는 포인터로, 세 가지 유형이 있다. <br><br>
      
    + **Single Indirect Pointer**

        * `Inode`의 포인터가 `Single Indirect Pointer`을 가리키며, 해당 블록은 <br>
          데이터 블록을 가리킨다.

    + **Double Indirect Pointer**

        * `Inode`의 포인터가 `Double Indirect Pointer`를 가리키며, 해당 블록은 다시 <br>
          `Single Indirect Pointer`를 가리키고, 이는 데이터 블록을 가리킨다.

    + **Triple Indirect Pointer**

        * `Inode`의 포인터가 `Triple Indirect Pointer`를 가리키며, 해당 블록은 <br>
          `Double Indirect Pointer -> Single Indirect Pointer -> data` 의 경로를 가진다.
          
<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/0b66d117-fee9-4615-af97-3f0fdbc29ec4" width="600"></center>

<br>

# 👑 Linux Virtual File System

`Virtual File System(VFS)`은 사용자가 파일 시스템에 관계 없이 공통된 인터페이스로 <br>

파일 시스템에 접근할 수 있도록 하는 계층을 의미한다. 디스크마다 다른 파일 시스템을 가지고 <br>

있더라도 `VFS`가 세부 사항을 추상화하여 `open, read, write, close`과 같은 `system call`을 <br>

통해 똑같이 처리할 수 있도록 한다. 이러한 `VFS`의 역할 덕분에 Linux는 다양한 파일 시스템을 지원하며, <br>

사용자와 응용 프로그램이 파일 시스템의 차이를 신경 쓰지 않고 파일 작업을 수행할 수 있게 된다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/7c14ef2e-8686-418b-bf06-7536f6608f93" width="500"></center>



