---
title: JWT (JSON Web Token)
---

## 토큰 방식의 인증

토큰 기반의 인증 시스템에서는 클라이언트가 서버에 접속할 때 서버에서 클라이언트에게 인증의 의미로 **토큰**을 발급한다.
발급받은 토큰은 클라이언트를 식별할 수 있는 유일한 값이며, 클라이언트는 이후 서버에 요청을 보낼 때 요청 헤더에 토큰을 포함하여 전달한다.

서버는 클라이언트가 전달한 토큰이 서버에서 발급한 유효한 토큰인지 검증하고, 검증에 성공하면 해당 요청을 인증된 사용자로 처리한다.
기존의 세션 기반 인증 방식과 달리 서버가 클라이언트의 인증 상태를 저장하지 않는 **Stateless 구조**를 가진다.

```
Client                         Server
  │                              │
  │ ① ID/PW Login Request        │
  ├─────────────────────────────▶│
  │                              │
  │                              │ ② User Authentication
  │                              │    (DB User Check)
  │                              │
  │                              │ ③ Create JWT
  │                              │    Header.Payload.Signature
  │                              │
  │ ④ Receive JWT                │
  │◀─────────────────────────────┤
  │                              │
  │ ⑤ Store JWT                  │
  │    (Cookie / Storage)        │
  │                              │
  │ ⑥ Request API                │
  │    Authorization: Bearer JWT │
  ├─────────────────────────────▶│
  │                              │
  │                              │ ⑦ JWT Validation
  │                              │    - Signature 검증
  │                              │    - Expiration 확인
  │                              │    - Claim 확인
  │                              │
  │ ⑧ Return Response            │
  │◀─────────────────────────────┤
```

토큰 기반 인증 방식은 서버가 세션 저장소에 사용자의 인증 정보를 저장하지 않기 때문에 서버 확장에 유리하다.

예를 들어 여러 대의 서버를 운영하는 Scale Out 환경에서는 어떤 서버로 요청이 전달되더라도 클라이언트가 전달한 토큰 자체만 검증하면 되므로 별도의 세션 공유 작업이 필요하지 않다.

### 토큰 방식의 단점

- 쿠키/세션 방식에 비해 토큰의 데이터 크기가 크기 때문에 인증 요청이 많아질수록 네트워크 부하가 증가할 수 있다.
- 토큰 내부의 `Payload` 정보는 Base64Url 방식으로 인코딩된 값일 뿐 암호화된 값이 아니다. 따라서 비밀번호와 같은 민감한 정보를 저장하면 안 된다.
- 토큰이 탈취되면 만료 전까지 공격자가 정상 사용자처럼 요청을 보낼 수 있다.
  - 이를 방지하기 위해 짧은 만료 시간을 설정하거나 Refresh Token 방식을 사용한다.

---

## JWT (JSON Web Token)

**JSON 웹 토큰(JWT)** 이란 온라인 네트워크에서 정보를 안전하게 전송하기 위해 사용하는 개방형 표준(RFC 7519) 기반의 토큰이다.

JWT는 인증을 포함하여 다양한 용도로 사용되며, 주고 받는 정보를 **클레임(Claim)** 이라 한다.

JWT는 JSON 형태의 데이터를 포함하고 있으며, 서버와 클라이언트 간에 정보를 안전하게 전달하기 위해 **전자 서명(Signature)** 을 사용한다.

JWT는 단순히 사용자를 식별하기 위한 인증 토큰으로 사용할 수 있으며, 필요에 따라 사용자 정보나 권한 정보 등의 Claim을 포함할 수도 있다.
다만 JWT의 Payload는 암호화되지 않기 때문에 누구나 내용을 확인할 수 있으며, 위변조 방지를 위한 **무결성 검증**이 JWT의 핵심 역할이다.

### JWT의 두 가지 유형

JWT는 내부적으로 어떤 방식으로 데이터를 보호하느냐에 따라 크게 **JWS(JSON Web Signature)** 와 **JWE(JSON Web Encryption)** 로 나눌 수 있다.

대부분의 웹 서비스에서 사용하는 JWT는 JWS 방식이며, JWE는 Payload 자체를 암호화해야 하는 특수한 상황에서 사용된다.

**1️⃣ JWS (JSON Web Signature)**

- JSON 데이터를 **전자 서명(Signature)** 하여 데이터의 무결성을 검증하는 방식
- 일반적으로 JWT라고 부르는 형태는 대부분 JWS를 의미
- 데이터의 기밀성을 제공하진 않지만, 데이터의 무결성과 인증을 제공

**2️⃣ JWE (JSON Web Encryption)**

- JWT의 **Payload** 자체를 암호화하는 방식
- JWS와 달리 Payload의 내용을 암호화하기 때문에, 암호화 키를 가지고 있는 사용자만 실제 데이터를 확인할 수 있음
- 일반적인 인증 시스템에서는 JWT Payload에 민감한 정보를 저장하지 않고, HTTPS를 통해 통신을 보호하기 때문에 대부분 JWS 방식을 사용함

---

## JWT의 구성 요소

JWS, JWE 둘 다 `헤더 (Header)`와 `페이로드 (Payload)`, `서명 (Signature)`으로 구성되며, 각 구성은 `마침표(.)`를 구분자로 사용한다.

```
xxxxx.yyyyy.zzzzz

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJpc3MiOiJteS1zZXJ2aWNlIiwic3ViIjoiMTIzNDU2Nzg5Iiwicm9sZSI6IlVTRVIifQ
.
TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

### 헤더 (Header)

- 일반적으로 토큰의 유형(JWS, JWE)과 서명 알고리즘을 명시
- JSON으로 표현된 헤더를 Base64로 인코딩한 것이 JWT 헤더

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 페이로드 (Payload)

- 보통 JSON 형식으로 표현된 사용자의 정보나 클레임이 키-값(key-value)으로 포함된 부분
- `RFC 7519`에 정의된 `iss (issuer)`, `sub (subject)`, `aud (audience)`, `exp (expiration time)`, `iat (issued at)` 등 키를 사용할 수 있음
- 새로운 클레임 추가도 가능
- `JWS` 방식에서는 페이로드도 Base64로 인코딩
- 누구나 디코딩이 가능하기 때문에 JWS 페이로드에는 민감한 정보를 넣으면 안됨

```
{
  "iss": "my-service",
  "sub": "123456789",
  "aud": "my-client",
  "exp": 1754016000,
  "iat": 1754012400,
  "role": "USER"
}
```

### 서명 (Signature)

- 헤더와 페이로드를 결합한 후 지정된 알고리즘과 비밀 키 또는 공개 키로 서명한 값
- 서명은 JWT의 무결성을 보장하며 데이터가 변경되지 않았음을 확인할 수 있음
- 인코딩한 헤더와 페이로드를 헤더에 정의한 알고리즘에 따라 서명 생성
- 서명은 키로만 복호화할 수 있기 때문에 토큰의 전송자와 내용의 무결성을 보장

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

---

## JWT의 장단점

JWT는 서버가 사용자의 인증 상태를 저장하지 않는 **Stateless 인증 방식**이다.

### 장점

- **서버 확장성**
  - 서버가 세션 정보를 저장하지 않기 때문에 Scale Out 환경에서 별도의 세션 공유 작업이 필요 없다.

- **다양한 환경에서 사용 가능**
  - 웹, 모바일, MSA 환경 등 다양한 클라이언트와 서비스 간 인증 방식으로 사용할 수 있다.

### 단점

- **네트워크 부담**
  - 세션 ID보다 토큰의 크기가 크기 때문에 요청마다 JWT를 전달할 경우 네트워크 부하가 증가할 수 있다.

- **Payload 노출**
  - Payload는 암호화되지 않고 Base64Url로 인코딩된 값이므로 누구나 확인할 수 있다.
  - 따라서 비밀번호와 같은 민감한 정보는 저장하면 안 된다.

- **토큰 탈취 대응의 어려움**
  - Stateless 구조이기 때문에 이미 발급된 토큰을 서버에서 즉시 폐기하기 어렵다.
  - 이를 보완하기 위해 짧은 만료 시간을 설정하고 Refresh Token을 활용한다.

---

## Access Token과 Refresh Token

JWT 기반 인증에서는 일반적으로 **Access Token**과 **Refresh Token**을 함께 사용한다.

### Access Token

Access Token은 실제 API 요청을 인증하기 위한 토큰이다.

```
Authorization: Bearer {Access Token}
```

특징:

- API 요청마다 전달
- 짧은 만료 시간 설정
- 탈취 시 피해 시간을 줄이는 목적

---

### Refresh Token

Refresh Token은 만료된 Access Token을 재발급받기 위한 토큰이다.

특징:

- Access Token보다 긴 만료 시간 사용
- API 요청 인증에는 직접 사용하지 않음
- 새로운 Access Token 발급 용도로 사용

Access Token의 만료 시간을 짧게 유지하면서도 사용자가 계속 로그인 상태를 유지할 수 있도록 하기 위해 사용한다.

```
Access Token
→ API 요청 인증

Refresh Token
→ Access Token 재발급
```

Refresh Token은 탈취 시 새로운 토큰 발급이 가능하기 때문에 HttpOnly Cookie, 서버 저장소 관리, Rotation 등의 방식으로 보호한다.

---

## 정리

- JWT는 서버가 인증 상태를 저장하지 않는 **Stateless 인증 방식**으로, 서버 확장성이 중요한 환경에서 많이 사용된다.
- JWT는 `Header, Payload, Signature`로 구성되며, Signature를 통해 토큰의 위변조 여부를 검증할 수 있다. 하지만 Payload는 암호화되지 않기 때문에 민감한 정보를 저장해서는 안 된다.
- 또한 JWT는 탈취 시 서버에서 즉시 폐기하기 어렵다는 한계가 있기 때문에, 일반적으로 짧은 만료 시간을 가진 **Access Token**과 재발급을 담당하는 **Refresh Token** 을 함께 사용한다.
