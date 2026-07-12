---
title: 3장. 애그리거트
---

## 애그리거트(Aggregate)

- 관련된 객체를 하나의 단위로 묶은 것

> **NOTE**
>
> **애그리거트는 일관성을 유지하기 위한 경계(Boundary)** 이며, 경계는 도메인 규칙과 요구사항에 따라 결정됨.

### 특징

- 관련 객체를 하나의 군으로 관리
- 모델을 개별 객체와 상위 수준에서 모두 이해 가능
- 동일하거나 유사한 라이프 사이클 가짐
- 도메인 규칙과 요구사항에 따라 경계 설정

```text
Order (Aggregate)
├── Order
├── OrderItem
├── ShippingInfo
└── PaymentInfo
```

---

## 애그리거트 루트(Aggregate Root)

- 애그리거트의 대표 객체
- 모든 내부 객체는 **애그리거트 루트**를 통해서만 변경

> **NOTE**
>
> **애그리거트 외부에서는 내부 객체를 직접 변경하지 않음.**
>
> 모든 상태 변경은 **Aggregate Root**를 통해 수행하여 일관성을 유지함.

### 역할

- 애그리거트의 일관성 유지
- 도메인 기능 제공
- 내부 객체 관리

```text
        외부
         │
         ▼
Order (Root)
 │
 ├── OrderItem
 ├── Delivery
 └── Payment

✔ Root를 통해서만 접근
✖ 내부 객체 직접 변경
```

### 특징

- `public setter` 지양
- Value Object는 불변 객체 권장
- 내부 상태 변경은 Root를 통해서만 수행

### 트랜잭션

- 한 트랜잭션에서는 하나의 애그리거트만 수정 권장

```text
O  Application Service
      ├── Order 수정
      └── Member 수정

X  Order → Member 직접 수정
```

> **NOTE**
>
> 여러 애그리거트를 함께 수정해야 한다면,
> **애그리거트가 아닌 응용 계층(Application Service)** 에서 조율하도록 구현.

- 두 개 이상의 애그리거트 변경이 필요하면 응용 계층에서 처리

---

## 리포지토리와 애그리거트

- 리포지토리는 애그리거트 단위로 존재

### 역할

- 애그리거트 조회
- 애그리거트 저장
- 변경 사항 원자적 반영

```text
Application
     │
     ▼
OrderRepository
     │
     ▼
Order Aggregate
```

---

## ID를 이용한 애그리거트 참조

### 객체 참조

```java
class Order {
    private Member member;
}
```

### 문제점

- 애그리거트 간 결합도 증가
- 즉시 로딩 / 지연 로딩 고민 발생
- 구현 기술 변경 어려움

↓

### ID 참조

```java
class Order {
    private MemberId memberId;
}
```

### 장점

- 애그리거트 간 의존 제거
- 응집도 향상
- 애그리거트별 다른 저장소 사용 가능

### 단점

관련 객체 조회 시 추가 조회 발생

```text
Order 조회
    │
    ▼
memberId 획득
    │
    ▼
Member 조회
```

### 해결 방법

- 조회 전용 쿼리(JPQL, MyBatis 등)
- 캐시 사용
- 조회 전용 저장소 구성

---

## 애그리거트 간 집합 연관

### 1:N 연관

- 개념적인 연관을 반드시 객체 연관으로 구현할 필요 없음
- 예)

```text
Category
    │
    └── Product 목록
```

- 상품 목록 조회는 조회 쿼리로 처리하는 것이 더 효율적인 경우 존재

### M:N 연관

- RDBMS에서는 조인 테이블 사용

```text
Product
    │
Product_Category
    │
Category
```
