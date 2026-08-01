---
title: 헥사고날 아키텍처 (Hexagonal Architecture)
---

# 헥사고날 아키텍처 (Hexagonal Architecture)

> [Alistair Cockburn의 블로그 글](https://alistair.cockburn.us/hexagonal-architecture) 을 참고해서 작성한 내용

## 1. 헥사고날 아키텍처란

헥사고날 아키텍처(`Hexagonal Architecture`)는 **애플리케이션의 핵심 비즈니스 로직을 UI, 데이터베이스, 메시지 브로커와 같은 외부 기술로부터 독립시키기 위한 아키텍처이다.** <br>
**Ports & Adapters Architecture**라고도 불리며, 애플리케이션을 중심에 두고 모든 외부 시스템을 포트(Port)와 어댑터(Adapter)를 통해 연결하는 것이 핵심이다.

이 아키텍처의 가장 중요한 목표는 비즈니스 로직이 특정 기술에 의존하지 않도록 만드는 것이다.
즉, 웹 프레임워크나 데이터베이스가 변경되더라도 애플리케이션의 핵심 로직은 영향을 받지 않아야 한다.

<img src="/assets/images/hexagonal_architecture.webp" width="400" alt="Hexagonal Architecture">

---

## 2. 등장 배경

### 2.1 기존 Layered Architecture의 한계

전통적인 계층형 아키텍처는 일반적으로 다음과 같은 구조를 가진다.

```
Presentation
    ↓
Application
    ↓
Domain
    ↓
Infrastructure(Database)
```

이 구조는 관심사를 분리하기 위한 좋은 출발점이지만, 프로젝트가 커질수록 다음과 같은 문제가 발생하게 된다.

- Service가 JPA, SQL 등 데이터 접근 기술에 의존한다.
- 비즈니스 로직이 Spring MVC, ORM과 강하게 결합된다.
- 테스트를 위해 웹 서버와 데이터베이스를 함께 실행해야 한다.
- UI나 DB 변경이 애플리케이션 로직까지 영향을 미치게 된다.

결국 계층은 존재하지만 실제 의존성은 외부 기술을 향하게 되고, 핵심 비즈니스 로직은 점점 프레임워크 중심으로 작성된다.

### 2.2 해결하고자 했던 문제

- 애플리케이션의 핵심은 웹, DB가 아니라 비즈니스 로직이다.
- 웹은 단지 사용자가 애플리케이션을 사용하는 방법 중 하나이며, 데이터베이스 역시 데이터를 저장하는 수단일 뿐이다.
- 따라서 애플리케이션은 이러한 외부 요소 없이도 독립적으로 실행되고 테스트될 수 있어야 한다.

---

## 3. 핵심 개념

### 3.1 Application Core

- Application Core는 비즈니스 규칙이 존재하는 영역
- 회원가입, 주문 생성, 재고 차감과 같은 핵심 로직이 이곳에 위치하며, 외부 기술을 알지 못함
- Application Core는 오직 **Port**를 통해 외부와 통신함

### 3.2 Port

- Port는 애플리케이션이 외부와 상호작용하기 위한 인터페이스
- 입력을 받기 위한 Input Port와 외부 시스템을 사용하기 위한 Output Port로 구분할 수 있음

예를 들어 회원을 저장해야 한다면 애플리케이션은 다음과 같은 인터페이스만 알고 있다.

```java
public interface MemberRepository {
    Member save(Member member);
}
```

애플리케이션은 "회원을 저장할 수 있다"는 규칙만 알고 있을 뿐, 실제 저장 방식은 알 필요가 없다.

### 3.3 Adapter

- Adapter는 Port를 실제 기술로 구현한 객체
- Adapter는 외부 기술과 애플리케이션 사이를 연결해 주는 역할을 수행함

예를 들어 Output Port를 JPA로 구현하면 다음과 같다.

```java
public class JpaMemberRepository implements MemberRepository {
    // ...
}
```

또는 MongoDB, Redis, 외부 API 등 어떤 기술이라도 같은 Port를 구현하면 애플리케이션은 변경되지 않는다.

### 3.4 Driving Adapter & Driven Adapter

헥사고날 아키텍처에서는 Adapter를 두 종류로 구분한다.

| Adapter             | 설명                                                                                                             | 예시                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Driving Adapter** | 애플리케이션을 호출하는 주체<br>사용자의 요청을 받아 `Input Port`를 호출하는 역할을 수행함                       | REST Controller, CLI,<br> Batch, Kafka Consumer |
| **Driven Adapter**  | 애플리케이션이 사용하는 외부 시스템<br>Application은 Output Port를 호출하고, 실제 작업은 Driven Adapter가 수행함 | Database, Redis, 외부 API, Message Broker       |

---

## 4. 요청 처리 흐름

회원가입 API를 예로 들면 다음과 같이 동작하게 된다.

```
REST Controller
    ↓
Input Adapter
    ↓
RegisterMemberUseCase
    ↓
MemberService
    ↓
MemberRepository(Output Port)
    ↓
JpaMemberRepository(Adapter)
    ↓
MySQL

```

- 핵심은 MemberService가 JPA나 MySQL을 전혀 알지 못한다는 것
- 서비스는 단지 `MemberRepository` 인터페이스만 의존하며, 실제 구현체는 런타임에 주입됨

---

## 5. 헥사고날 아키텍처의 장점

- **비즈니스 로직의 독립성**
  - 비즈니스 로직이 프레임워크나 데이터베이스에 의존하지 않음

- **테스트 용이성**
  - Mock Adapter를 사용하면 데이터베이스 없이도 핵심 로직을 테스트할 수 있음

- **기술 변경에 유연함**
  - MySQL을 PostgreSQL로 변경하거나 JPA를 다른 기술로 교체하더라도 Application Core는 수정할 필요가 없음

- **유지보수성이 높음**
  - 관심사가 명확하게 분리되어 코드의 변경 범위가 줄어듦

---

## 6. 적용 시 고려할 점

- 헥사고날 아키텍처가 항상 정답은 아님
- 프로젝트 규모가 작은 경우에는 Port와 Adapter를 분리하는 과정에서 오히려 구조가 복잡해질 수 있음
- 또한 모든 기능을 지나치게 추상화하면 인터페이스만 많아지고 실질적인 이점은 줄어들 수 있음
- 따라서 프로젝트의 규모와 요구사항을 고려하여 적절한 수준에서 적용하는 것이 중요

---

## 7. 정리

헥사고날 아키텍처는 단순히 육각형 모양의 다이어그램을 의미하는 것이 아니다. 중요한 것은 도형의 형태가 아니라 **애플리케이션의 핵심 로직을 외부 환경으로부터 보호하는 설계 방식**이라는 점이다.

웹 프레임워크, 데이터베이스, 메시지 브로커와 같은 외부 기술은 요구사항이나 환경에 따라 변경될 수 있다. 하지만 주문 생성, 재고 관리, 결제 처리와 같은 비즈니스 규칙은 상대적으로 오랜 시간 유지되어야 하는 핵심 영역이다. 따라서 외부 기술이 내부 비즈니스 로직을 결정하는 구조가 아니라, 애플리케이션 내부의 로직이 중심이 되고 외부 요소가 이를 지원하는 형태로 의존성의 방향을 설계해야 한다.

헥사고날 아키텍처에서는 이를 위해 Port와 Adapter라는 개념을 사용한다. 애플리케이션은 Port라는 인터페이스를 통해 외부와 소통하고, 실제 기술적인 구현은 Adapter가 담당한다. 이를 통해 데이터베이스가 변경되거나 새로운 입력 방식이 추가되더라도 핵심 비즈니스 로직은 영향을 받지 않는다.

육각형으로 표현한 이유 역시 6이라는 숫자 자체에 의미가 있기 때문이 아니다. 기존의 계층형 구조처럼 위에서 아래로 흐르는 단방향적인 표현 방식에서 벗어나, 애플리케이션을 중심에 두고 필요한 위치에 다양한 Port와 Adapter를 자유롭게 배치하기 위한 시각적인 표현일 뿐이다.

레이어드 아키텍처는 Presentation, Business, Data Access와 같이 계층을 나누면서 자연스럽게 "위에서 아래로 호출하는 흐름"을 강조한다. 반면 헥사고날 아키텍처는 애플리케이션 내부와 외부라는 경계를 더 중요하게 바라본다. REST API, CLI, Batch, 데이터베이스, 외부 API 등은 애플리케이션 관점에서는 모두 외부에 존재하는 요소이며, Port와 Adapter를 통해 연결되는 대상일 뿐이다.

결국 헥사고날 아키텍처의 핵심은 **어떤 기술을 사용하는가보다 비즈니스 로직을 어디에 위치시키고, 어떤 방향으로 의존성을 관리하는가**에 있다. 외부 변화로부터 핵심 로직을 보호하고, 더 유연하고 테스트 가능한 애플리케이션을 만들기 위한 설계 원칙이라고 할 수 있다.
