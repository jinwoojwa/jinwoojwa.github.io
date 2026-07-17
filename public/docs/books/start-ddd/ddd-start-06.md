---
title: 6장. 응용 서비스와 표현 영역
---

> 『도메인 주도 개발 시작하기 - DDD 핵심 개념 정리부터 구현까지』를 읽고 정리한 내용

## 표현 영역과 응용 영역

표현 영역과 응용 영역은 사용자와 도메인을 연결하는 역할 담당

```text
사용자
   │
   ▼
표현 영역
(Request 해석)
   │
   ▼
응용 서비스
(유스케이스 수행)
   │
   ▼
도메인
(비즈니스 로직)
```

### 표현 영역

- 사용자 요청 해석
- 요청 객체 생성
- 응용 서비스 호출
- 처리 결과 반환

### 응용 서비스

- 유스케이스 구현
- 트랜잭션 관리
- 도메인 객체 생성 및 조회
- 도메인 로직 수행 위임

> **NOTE**
>
> 응용 서비스는 **표현 기술(HTTP, REST, CLI 등)** 을 알 필요가 없음.

---

## 응용 서비스

응용 서비스는 **사용자가 원하는 기능(유스케이스)** 을 구현

### 역할

- 요청 처리
- 트랜잭션 관리
- 도메인 객체 조회
- 도메인 객체에 기능 수행 위임
- 결과 반환

> **NOTE**
>
> 응용 서비스가 복잡하다면
> **도메인 로직이 응용 서비스에 들어가 있는지 먼저 확인**.

---

## 도메인 로직은 도메인에

응용 서비스는 흐름만 제어

비즈니스 규칙은 도메인에 구현

### 잘못된 예

```text
Application Service
 ├─ 비즈니스 규칙
 ├─ 검증
 ├─ 계산
 └─ Repository
```

### 권장

```text
Application Service
        │
        ▼
     Domain
 (비즈니스 로직)
```

### 장점

- 응집도 향상
- 코드 중복 감소
- 유지보수 용이

> **NOTE**
>
> **도메인 로직은 한 곳(도메인)에 모아야 함.**
>
> 응용 서비스는 흐름만 제어.

---

## 응용 서비스 구현

### 하나의 서비스 클래스

장점

- 공통 코드 관리 쉬움

단점

- 클래스가 커짐
- 관련 없는 기능이 함께 위치

### 기능별 서비스 클래스

장점

- 역할이 명확
- 필요한 의존성만 포함
- 유지보수 용이

단점

- 클래스 수 증가
- 공통 코드 중복 가능

공통 로직은 별도 클래스로 분리

---

## 표현 영역에 의존하지 않기

응용 서비스는 Servlet, HTTP 등을 몰라야 함.

### 잘못된 예

```java
@PostMapping("/members/password")
public void changePassword(HttpServletRequest request) {
    changePasswordService.changePassword(request);
}
```

### 권장

```java
@PostMapping("/members/password")
public void changePassword(ChangePasswordRequest request) {
    changePasswordService.changePassword(
        request.getMemberId(),
        request.getCurrentPassword(),
        request.getNewPassword()
    );
}
```

### 이유

- 응용 서비스 단독 테스트 가능
- 표현 기술 변경 영향 최소화
- 계층 간 결합도 감소

> **NOTE**
>
> 응용 서비스는
> **HttpServletRequest, HttpSession, MultipartFile** 등
> 표현 계층 객체를 직접 사용하지 않음.

---

## 표현 영역

### 역할

- 사용자 요청 처리
- 요청 객체 생성
- 응용 서비스 호출
- 응답 생성
- 세션 관리
- 예외 처리

---

## 권한 검사

권한 검사는 계층마다 담당 역할이 다름.

### 표현 영역

- 로그인 여부 확인
- 인증(Authentication)
- 인증되지 않은 요청 차단

예)

- Servlet Filter
- Spring Security Filter

---

### 응용 서비스

메서드 단위 권한 검사

예)

- 자신의 글만 수정 가능
- 관리자만 회원 삭제 가능

사용 기술

- `@PreAuthorize`
- AOP 기반 권한 검사

---

### 도메인

도메인 규칙에 따른 권한 검사

예)

- 주문 작성자만 주문 취소 가능
- 관리자만 상품 가격 변경 가능

> **NOTE**
>
> **인증(Authentication)** 과
> **권한(Authorization)** 은 다름.
>
> - 인증 → 사용자가 누구인지 확인
> - 권한 → 해당 기능을 수행할 수 있는지 확인
