---
title: 5장. 스프링 데이터 JPA를 이용한 조회 기능
---

> 『도메인 주도 개발 시작하기 - DDD 핵심 개념 정리부터 구현까지』를 읽고 정리한 내용

## CQRS

- 명령(Command)과 조회(Query)를 분리하는 패턴

```text
Command
 └─ 상태 변경

Query
 └─ 데이터 조회
```

### 특징

- 명령 모델 → 상태 변경
- 조회 모델 → 데이터 조회
- 각각의 목적에 맞게 최적화 가능

> **NOTE**
>
> 조회 기능은 상태 변경이 목적이 아니므로,
> **별도의 조회 모델을 사용하는 것이 더 효율적일 수 있음.**

---

## 검색과 스펙(Specification)

검색 조건을 객체로 표현하는 패턴

### 사용 이유

검색 조건이 늘어날수록 Repository 메서드가 계속 증가

```text
findByName()
findByCategory()
findByPrice()
findByCategoryAndPrice()
findByCategoryAndPriceAndBrand()
...
```

↓

Specification으로 검색 조건 조합

```java
Specification<Product>
```

### 특징

- 검색 조건 객체화
- 조건 조합 가능
- 기술(JPA 등)에 맞게 구현

---

## 스프링 데이터 JPA의 Specification

JPA에서는 `Specification<T>` 제공

```java
Specification<Product>
```

검색 조건을 `Predicate`로 생성

```text
Specification
        │
        ▼
 Predicate
        │
        ▼
 WHERE 조건
```

### 스펙 구현

- 구현 클래스로 작성 가능
- 별도의 Factory(또는 Specs 클래스)에서 생성 가능

---

## 스펙 조합

스프링 데이터 JPA에서 제공

- `and()`
- `or()`
- `not()`
- `where()`

```text
Category
    AND
Price
    OR
Brand
```

### 스펙 빌더

조건이 많아질 경우 Builder 사용

장점

- `if`문 감소
- 가독성 향상
- 조건 조합 단순화

---

## 정렬(Sort)

### 방법

- 메서드 이름에 `OrderBy`
- `Sort` 객체 전달

```java
Sort.by("price").descending()
```

`Sort`를 사용하는 방식이 더 유연함.

---

## 페이징(Page)

`Pageable` 사용

```java
PageRequest.of(page, size)
```

### 반환 타입

- `Page` → COUNT 쿼리 실행
- `List` → COUNT 쿼리 실행하지 않음

> **NOTE**
>
> `Specification + Pageable`을 함께 사용하면
> **반환 타입이 List여도 COUNT 쿼리가 실행됨.**

COUNT 쿼리가 불필요하면 커스텀 Repository 구현

### Top / First

일부 데이터만 조회

```text
findTop10By...
findFirst5By...
```

---

## @Subselect

조회 결과를 Entity처럼 사용하는 기능

```text
SELECT ...
      │
      ▼
 @Subselect Entity
```

### 특징

- 조회 전용
- DB View와 유사
- 수정 불가

`@Immutable` 사용 시 변경 감지 무시

> **NOTE**
>
> `@Subselect` Entity는 조회 전용으로 사용.
> 수정 대상이 아님.

---

## @Synchronize

`@Subselect`와 함께 사용

### 역할

- 관련 테이블 지정
- Entity 조회 전 `flush()` 수행
- 최신 데이터 조회 보장
