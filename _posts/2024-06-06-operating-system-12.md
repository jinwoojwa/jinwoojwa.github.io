---
title: "[OS] I/O Management"
excerpt: "Operating Systems, Internals and Design Principles 정리"

categories:
  - 운영체제
tags:
  - [Operating System]

permalink: /operating-system/os-io-management/

toc: true
toc_sticky: true
use_math: true

date: 2024-06-06
last_modified_at: 2024-06-06
published: true
---

> William Stallings의 『Operating Systems, Internals and Design Principles (9th Ed.)』 을 토대로 작성하였음. <br>

<br>

# 👑 I/O Devices

컴퓨터 시스템에서 `I/O` 장치는 대략 세 가지로 분류할 수 있다.

- **Human readable**

    + 사용자와 컴퓨터 간의 의사소통에 적합한 장치로 프린터, 키보드, 마우스 등이 속한다.

- **Machine readable**

    + 전자 장비와 의사소통하기에 적합한 장치로 디스크, 센서, 컨트롤러 등이 속한다.

- **Communication**

    + 원격 장치와 의사소통하기에 적합한 장치로 Digital line driver와 모뎀 등이 속한다.

<br>

각 분류 별 장치들은 컴퓨터 시스템의 다양한 요구를 충족시키기 위해 설계되었으며, 분류 별로 <br>

몇 가지 차이를 보인다. 이러한 많은 차이들로 인해 `I/O`에 대한 일관된 접근법이 만들어졌다.

- **Data rate**

    + 용도와 기능에 따라 장치들 사이에 전송 속도는 큰 차이가 날 수 있다.

    + 예를 들어, 하드 디스크는 초당 수백 메가바이트(MBps)의 데이터를 전송할 수 있는 반면, <br>
      키보드는 훨씬 더 낮은 데이터 전송 속도를 가지고 있다.

- **Application**

    + 장치마다 다른 소프트웨어와 OS의 지원을 필요로 한다.

- **Complexity of control**

- **Unit of transfer**

- **Data representation**

    + 장치마다 서로 다른 `data encoding schemes`을 사용한다.

- **Error conditions**

<br>

# 👑 I/O Management

`I/O system`은 `I/O Management (= kernel I/O subsystem)`, `device-driver interface`, <br>

특정 하드웨어 장치를 위한 `device-driver`로 이루어진다. <br><br>

`device driver`란 특정 하드웨어나 장치의 입출력을 제어하기 위해 커널의 일부분으로 동작하는 <br>

컴퓨터 소프트웨어이다. 컴퓨터를 구성하는 다양한 입출력 장치마다 각각 존재하여 운영체제와 <br>

디바이스가 통신할 수 있도록 한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/b94707f0-83d9-4c4c-9949-b03516a95478" width="600"></center>

`kernel I/O subsystem`은 입출력 장치와의 상호 작용을 관리하고 효율적으로 처리하기 위한 <br>

다양한 기능들을 제공한다. 주요 기능들은 다음과 같다.

- **I/O System Call Interface**

    + 사용자 프로그램이 I/O 작업을 요청할 수 있도록 `System Call Interface`를 제공한다. <br>
    
    + 이를 통해 파일에 대해 `open, read, write, close` 등의 작업을 수행할 수 있다.

- **Device Reservation**

    + 장치를 독점적으로 사용하기 위해 예약할 수 있는 기능을 제공한다. (장치 간 충돌 방지)

    + `system call`을 통해 장치를 할당, 해제 한다. (`데드락 발생에 주의해야` 함)

- **Device Scheduling**

    + 여러 I/O 요청을 효율적으로 처리하기 위해 스케줄링 알고리즘을 사용한다.

    + 각 장치별로 `큐(queue)`를 만들어 스케줄링한다.

- **Buffering**

    + `Buffer`를 사용하여 `데이터 전송 속도 차이를 완화`하고 시스템 성능을 향상시킨다.
    
    + `Buffering`은 메모리의 일부를 임시 저장소로 사용하여 데이터의 원활한 이동을 지원한다.

- **Caching**

    + 자주 사용되는 데이터나 파일을 `cache`에 저장하여 빠른 접근을 가능하게 한다.
    
    + 이를 통해 I/O 작업의 속도를 높이고 시스템 성능을 개선한다.

- **Spooling**

    + 특정 장치(예: 프린터)에 여러 작업이 동시에 접근할 때, 이를 조정하여 순차적으로 처리할 수 <br>
      있도록 하는 기능이다.
    
    + 이를 통해 자원 관리와 작업 흐름을 원활하게 유지할 수 있다.

- **Error Handling**

    + I/O 작업 중 발생할 수 있는 다양한 오류를 처리하는 기능을 제공한다.

    + **오류 복구(Error Recovery)**
        
        * 디스크 읽기 오류, 장치 사용 불가, 일시적 쓰기 실패 등 다양한 오류로부터 시스템이 <br>
          복구될 수 있도록 한다.

    + **오류 코드 반환(Return Error Codes)**

        * I/O 요청이 실패하면 적절한 오류 번호나 코드를 반환하여 문제를 알린다.

    + **시스템 오류 로그(System Error Logs)**

        * 문제 발생 시 시스템 오류 로그에 문제 보고서를 저장하여 이후 문제 해결에 도움이 되도록 한다.

<br>

# 👑 I/O Control

컴퓨터 시스템에서 입출력을 제어하는 주요 방법에는 다음의 세 가지가 있다.

- **Programmed I/O (= Polling)**

- **Interrupt-driven I/O**

- **Direct Memory Access (DMA)**

<br>

**일반적인 I/O port의 구성**

- **상태 레지스터 (Status register)**

    + 장치의 현재 상태를 나타낸다.

- **제어 레지스터 (Control register or Command register)**

    + 장치에 명령을 보내기 위해 사용된다.

- **데이터 입력 레지스터 (Data-in register)**

    + 장치로부터의 입력 데이터를 보유한다.

- **데이터 출력 레지스터 (Data-out register)**

    + 장치로 출력할 데이터를 보유한다.

<br>

**장치의 state**

- **Command-ready**

    + 장치가 호스트로부터 명령을 수행할 준비가 되어있는 상태

- **Busy**

    + 장치가 현재 작업 중인 상태

- **Error**

    + 장치가 작업을 수행하는 동안 오류가 발생했거나, 장치 자체에서 문제가 발생했을 때의 상태

<br>

## 💡 Programmed I/O (= Polling)

프로그램이 명령을 내림으로써 I/O 작업을 직접 제어한다. <br>

예를 들어, 데이터를 디스크에 쓰거나 읽거나, 네트워크로 데이터를 보내는 등의 작업을 수행할 때, <br>

프로그램은 해당 I/O 장치와의 통신을 위해 명령을 실행한다. 프로그램은 I/O 작업이 완료될 때까지 <br>

해당 장치로부터 상태를 지속적으로 확인하여 작업이 완료될 때까지 대기한다. `(busy-waiting)`

<br>

즉, `CPU`가 `polling instruction`을 실행하여 입출력(I/O) 장치의 상태를 반복적으로 확인하고, <br>

해당 비트가 해제될 때까지 기다리는 방식이다. <br><br>

단순하고, 구현이 간단하다는 장점이 있지만, `busy waiting`이라는 단점이 존재한다. (성능 ↓)

<br>

## 💡 Interrupt-Driven I/O

프로세서가 다른 작업을 수행하다가 입출력 장치로부터 인터럽트 신호를 받아 작업을 처리하는 방식이다. <br>

**동작 과정**

- **사용자 프로세스의 system call을 통한 I/O request**

    + 사용자 프로세스는 커널에게 입출력 작업을 시작하도록 요청한다.

- **커널이 장치 드라이버에게 장치를 시작하도록 허용**

    + 커널은 해당 장치에 대한 제어를 담당하는 장치 드라이버에게 명령을 내려 장치를 시작하도록 한다.

- **프로세스는 I/O를 수행하는 동안 block 상태로 대기**

- **CPU는 다른 프로세스에게 할당됨 (context switch)**

- **장치가 I/O를 완료하면, CPU에게 IRQ(Interrupt Request)를 발생**

    + 장치가 I/O 작업을 완료하면, CPU에게 인터럽트를 보내 해당 작업이 완료되었음을 알린다.

- **IRQ를 통해 ISR(Interrupt Service Routine) 실행**

    + 인터럽트를 받은 CPU는 해당 인터럽트를 처리하기 위해 인터럽트 서비스 루틴(ISR)을 실행한다.

- **커널이 프로세스의 상태를 block -> ready로 변경**

    + 커널이 I/O 작업의 완료를 인식하면, 프로세스를 `block -> ready` 상태로 변경하여 다시 CPU에 <br>
      할당될 수 있도록 한다.

<br>

**장점**

- `polling` 방식과는 달리 `CPU`가 반복적으로 장치의 상태를 확인할 필요가 없어 `CPU` 부하가 적다.

- `I/O` 수행 시 다른 프로세스에게 `CPU`가 할당되므로, `busy waiting이 없다.`

<br>

**단점**

- 인터럽트 발생 시에 일부 오버헤드가 발생할 수 있다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/d2ef50e0-878b-460e-b135-7a1a0c92120f"></center>

<br>

## 💡 DMA (Direct Memory Access)

위의 `Programmed I/O`과 `Interrupt-Driven I/O` 방식은 I/O 수행에서 `CPU`가 관여한다는 <br>

공통점을 가지고 있다. 하지만, `직접 메모리 접근(Direct Memory Access, DMA)`은 `CPU의 개입 없이` <br>

메모리와 장치 간의 I/O를 수행할 수 있게 해준다. <br><br>

프로세서의 관여를 없애고, `DMA` 전송을 수행하는 장치를 `DMA Controller`라 하고, 이 장치는 <br>

CPU와 메모리, 그리고 입출력 장치 간의 데이터를 직접 전송하며 `bus`를 제어한다.

<br>

**작동 방식**

- **DMA Request**

    + 입출력 장치가 `DMA Controller`에 DMA 요청 신호를 보낸다.

- **Bus 제어**

    + `DMA Controller`는 데이터 전송을 위해 시스템 버스를 사용해야 하므로 `CPU`에게 버스 제어권을 요청하고, 승인을 받는 과정을 거친다.

- **데이터 전송**

    + DMA 컨트롤러가 데이터를 메모리와 입출력 장치 간에 전송한다.
    
    + 이때, 데이터 전송은 CPU의 개입 없이 이루어진다.

    + DMA 컨트롤러는 메모리 버스를 직접 제어하여 데이터를 이동시킨다.

- **완료**

    + 데이터 전송이 완료되면, DMA 컨트롤러는 CPU에게 `인터럽트를 발생시켜` 전송이 완료되었음을 알린다.

<br>

**장점**

- `CPU의 개입 없이` 대량의 데이터를 고속으로 전송할 수 있어 시스템의 전체적인 효율성이 높아진다.

- CPU가 데이터를 직접 전송할 필요가 없으므로, CPU가 다른 작업을 수행할 수 있게 된다.


