---
title: 2장. 아키텍처 개요
---

## 네 개의 영역

애플리케이션은 크게 **표현, 응용, 도메인, 인프라** 영역으로 구성

```text
사용자
  │
  ▼
표현(UI)
  │
  ▼
응용(Application)
  │
  ▼
도메인(Domain)
  │
  ▼
인프라(Infrastructure)
```

### 표현(UI) 영역

- 사용자 요청 수신
- Request DTO(Command) 변환
- 응용 계층 호출
- 처리 결과를 사용자에게 반환

```text
HTTP Request
      │
      ▼
Controller
      │
      ▼
Request DTO(Command)
      │
      ▼
Application Service

------------------------

Application Service
      │
      ▼
Response DTO
      │
      ▼
JSON
      │
      ▼
HTTP Response
```

### 응용 (Application) 영역

- 유스케이스 구현
- 트랜잭션 관리
- 도메인 객체 생성 및 조회
- 비즈니스 로직을 도메인에 위임

### 도메인 (Domain) 영역

- 핵심 비즈니스 로직 구현
- 도메인 모델 관리

### 인프라 (Infrastructure) 영역

- 구현 기술 담당
- DB, Redis, Kafka, 외부 API 등

---

## 계층 구조 아키텍처

각 계층은 자신의 역할만 수행하며 상위 계층은 하위 계층에 의존

```text
표현
 │
 ▼
응용
 │
 ▼
도메인
 │
 ▼
인프라
```

### 특징

- 상위 계층 → 하위 계층 의존
- 하위 계층은 상위 계층을 모름

### 문제점

응용/도메인 계층이 인프라 구현체에 직접 의존하면 구현 기술 변경 시 영향 발생

```text
OrderService
      │
      ▼
JpaOrderRepository
```

- 구현 기술 변경 시 영향 발생
- 테스트 어려움
- ==> `DIP` 적용

---

## DIP (Dependency Inversion Principle)

고수준 모듈이 저수준 모듈에 직접 의존하지 않고 **추상화(인터페이스)** 에 의존하도록 만드는 원칙

### DIP 적용 전

```text
OrderService
      │
      ▼
JpaOrderRepository
```

### DIP 적용 후

```text
                OrderRepository
                 (Interface)
                      ▲
                      │
      ┌───────────────┴───────────────┐
      │                               │
      │ implements                    │ implements
      ▼                               ▼
JpaOrderRepository          MongoOrderRepository
      ▲                               ▲
      └───────────────┬───────────────┘
                      │
                 OrderService
```

### 장점

- 구현체 변경 용이
- 테스트 용이
- 결합도 감소

---

## 도메인 영역의 주요 구성 요소

| 구성 요소      | 설명                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------ |
| Entity         | • 고유한 식별자를 갖는 객체<br>• 도메인의 고유한 개념 표현<br>• 데이터와 비즈니스 로직 함께 관리 |
| Value Object   | • 고유 식별자를 갖지 않는 객체<br>• 주로 개념적인 값을 표현하기 위해 사용                        |
| Aggregate      | 관련된 Entity와 Value를 하나의 단위로 관리                                                       |
| Repository     | Aggregate 영속성 관리                                                                            |
| Domain Service | 특정 Entity에 속하지 않는 도메인 로직 담당                                                       |

---

## 요청 처리 흐름

![요청 처리 흐름](/public/assets/images/request_flow.png)
