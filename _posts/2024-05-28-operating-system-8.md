---
title: "[OS] File System"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - Operating System
tags:
  - [Operating System]

permalink: /operating-system/os-file-system1/

toc: true
toc_sticky: true

date: 2024-05-28
last_modified_at: 2024-05-31
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 File

`파일 (File)`은 데이터나 정보를 저장하는 기본 단위로 비슷한 유형의 자료들의 집합이다. <br>

하나의 단일 엔티티로 취급되며, 각 파일은 고유한 이름을 가진다. <br><br>

파일의 정보는 `파일 속성 (file attribute)`에 저장되며, `FCB (File Control Block)`라 불리는 <br>

자료 구조에 의해 관리된다. 파일 속성에는 파일 이름, 크기, 생성 날짜, 수정 날짜, 접근 권한 등의 <br>

파일에 대한 전반적인 정보가 포함된다.

<br>

## 💡 FCB : File Control Block

`FCB` 는 파일에 대한 모든 메타 데이터를 저장하고 관리하는 데이터 구조이다. <br>

파일의 속성, 위치, 상태 등 여러 중요한 정보를 포함하여 `OS`가 파일을 효율적으로 관리하고 접근할 <br>

수 있도록 도와주는 역할을 한다. <br>

**FCB에 포함되는 정보**

- 파일 이름

- 파일 타입

- 파일 위치

- 파일 크기

- 소유자 정보

- 접근 권한

- etc..

`FCB`는 운영체제마다 구체적인 구현 방식이 다를 수 있으며, 유닉스 계열 `OS`에서는 <br>

`inode`로 구현되며, Windows NT에서는 `Master File Table(MFT)`로 구현된다.

<br>

## 💡 Device File

`Device File` 또는 `Special File`은 유닉스 계열 운영 체제에서의 `device driver`와의 <br>

인터페이스를 제공하는 특수한 파일이다. 파일 시스템의 일부로서, 일반 파일처럼 보이지만 <br>

실제로는 장치 드라이버와 상호 작용하는데 사용된다. <br><br>

**Device File은 크게 두 가지로 나뉜다.**

- `Block Device File`

    + 데이터가 블록 단위로 읽고 쓰여지는 디바이스를 나타낸다.

    + 주로 SSD, 플래시 메모리, CD-ROM 등이 `Block Device File`을 사용한다.

- `Character Device File`

    + 데이터가 문자(바이트) 단위로 연속적으로 읽고 쓰여지는 디바이스를 나타낸다.

    + 주로 키보드, 마우스 등이 `Character Device File`을 사용한다.

<br>

**Device File은 일반 파일과는 다른 속성들을 가지고 있다.**

- `Major number`

    + 디바이스 드라이버를 식별하는 번호로, `OS`가 이 번호를 통해 어떤 드라이버가 <br>
      디바이스 파일과 연관되는지를 결정한다.
    
- `Minor number`

    + 드라이버 내에서 특정 디바이스를 식별하는 번호로, 동일한 드라이버를 사용하는 <br>
      여러 디바이스를 구분하는 데 사용된다.

<br>

**Device File은 mknod 명령어를 사용하여 생성할 수 있다.**

```sh
mknod /dev/file_name [b/c] major_number minor_number
```

<br>

# 👑 Directory

`디렉토리 (Directory)`는 파일 시스템에서 파일을 체계적으로 관리하고 조직하는 파일의 <br>

정보를 담고 있는 구조이다. 디렉토리는 파일과 다른 디렉토리(서브 디렉토리)를 포함할 수 <br>

있으며, 디렉토리 역시 파일로 간주된다. <br>

**디렉토리의 주요 기능**

- 파일 조직

    + 파일을 그룹화하여 체계적으로 관리할 수 있게 해준다.

- 계층 구조

    + 디렉토리는 트리 구조를 형성하여, 루트 디렉토리에서 시작하여 여러 서브 디렉토리를 통해 <br>
     파일을 정리할 수 있다. <br>
     (유닉스 계열에서 루트 디렉토리는 `/` 로 표시되며, 루트 디렉토리의 `inode number = 2`)

- 파일 이름 관리

    + 디렉토리는 동일한 이름을 가진 파일이 다른 디렉토리 내에 존재할 수 있도록 한다.

- 메타데이터 관리

    + 파일의 메타데이터를 관리한다.

<br>

# 👑 File System

운영체제의 `파일 시스템 (File System)`은 데이터 저장, 검색, 관리, 및 조직화 방법을 정의하는 <br>

중요한 구성 요소이다. 파일 시스템은 하드 드라이브, SSD, USB 드라이브, CD/DVD 등 다양한 저장 <br>

장치에서 작동하며, 사용자가 데이터를 효율적으로 저장하고 접근할 수 있도록 도와준다. <br>

파일 시스템은 주로 2차 저장 장치(디스크)에 위치하며, 다음의 구성 요소를 포함한다. <br>

- **Boot block**

  + `OS` 부팅 시 필요한 정보를 저장하는 블록으로, 시스템이 시작할 때, 처음으로 읽어오는 부분이다.

- **Partition control block (super block)**

  + 파일 시스템에 관한 정보를 담고 있는 블록으로, 파일 시스템의 전체적인 구조와 상태 정보를 포함한다.

    * **파일 시스템의 크기(블록 수)**
    * **파일 시스템 내의 빈 데이터 블록 수**
    * **빈 데이터 블록의 목록**
    * **파일 시스템에 있는 전체 inode의 개수**
    * **빈 inode의 수**
    * **빈 inode의 목록**

- **Directory structure**

  + 파일 시스템 내에서 파일과 디렉토리를 조직화하여 계층적으로 배치한다.

- **File control blocks (Inode list)**

  + 각 파일에 대한 `FCB`를 포함한다.

  + `Unix/Linux` 에서 하나의 `inode`의 크기는 128 bytes

  + 즉, `Inode list`는 하나당 128 bytes의 크기를 갖는 `inode`들의 배열이다.

  <center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/b762ff22-fed1-4fd6-9d9d-c9a327e9aae3" width="500"></center>

- **Data blocks**

  + 실제 데이터가 저장되는 블록이다.

<br>

## 💡 주요 운영체제의 파일 시스템 구조

<img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/32afa3d2-86f1-4419-8dea-0e2c1650ba5b">





