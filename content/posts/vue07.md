---
title: Vue.js API 참조 - Options vs Composition API
summary: Vue 2의 Options API와 Vue 3 Composition API의 주요 기능을 대조하여 한눈에 파악하는 기술 참조 문서
date: 2026-05-09
tags:
  - Vue
---

## 📒 개요

Vue의 `Options API`와 `Composition API`의 대응 관계를 정리한 문서이다.

`Composition API`는 클로저(Closure)를 활용하여 `this` 컨텍스트 의존성을 제거하고, 로직 재사용성과 타입 추론을 강화한 방식이다.

<br><br>

## 1. 반응성 API (Reactivity API)

가장 핵심적인 변화로, `data`, `computed`, `watch` 등 상태와 관련된 옵션들이 개별 함수로 분리되었다.

| 기능                   | Options API <br> (Vue 2) | Composition API <br> (Vue 3) | 핵심 차이점                        |
| :--------------------- | :----------------------- | :--------------------------- | :--------------------------------- |
| **인스턴스 <br> 접근** | `this` 사용              | **불필요**                   | 변수 직접 참조를 통한 클로저 활용  |
| **반응형 <br> 상태**   | `data()` 반환 객체       | `ref()`, `reactive()`        | 데이터 정의와 즉시 반응성 주입     |
| **계산된 <br> 속성**   | `computed` 옵션          | `computed()` 함수            | 의존성 추적을 통한 자동 캐싱       |
| **메서드 <br> (함수)** | `methods` 옵션           | 일반 JavaScript 함수         | `setup` 내 단순 함수 선언으로 대체 |
| **데이터 <br> 감시**   | `watch` 옵션             | `watch()`, `watchEffect()`   | 명시적 타겟 감시 및 효과 실행      |
| **의존성 <br> 주입**   | `provide`, `inject` 옵션 | `provide()`, `inject()`      | 컴포넌트 트리 깊이와 관계없는 주입 |

<br>

### 📚 반응성 API (Reactivity API) 상세

| 기능                   | Options API (Vue 2) | Composition API (Vue 3)        | 특징 및 권장사항                    |
| :--------------------- | :------------------ | :----------------------------- | :---------------------------------- |
| **원시형 반응성**      | `data()` 내 선언    | `ref()`                        | String, Number, Boolean 등 단일값   |
| **객체형 반응성**      | `data()` 내 선언    | `reactive()`                   | Object, Array, Map 등 복합 객체     |
| **언래핑(Unwrapping)** | 템플릿 내 직접 접근 | `ref`는 템플릿에서 자동 언래핑 | `.value` 생략 가능                  |
| **구조 분해 주의**     | -                   | `toRefs()` 필요                | `reactive` 분해 시 반응성 유실 방지 |

<br><br>

## 2. 생명주기 훅 (Lifecycle Hooks)

Composition API의 `setup()` 함수는 인스턴스 초기화 과정을 겸하므로, 기존의 `beforeCreate`와 `created`는 생략되거나 `setup()` 내부의 일반 코드로 대체된다.

| Options API     | Composition API     | 실행 시점 (Trigger)              |
| :-------------- | :------------------ | :------------------------------- |
| `beforeCreate`  | `setup()`           | 컴포넌트 인스턴스 초기화 직전    |
| `created`       | `setup()`           | 컴포넌트 인스턴스 초기화 직후    |
| `beforeMount`   | `onBeforeMount()`   | DOM 노드 부착 전                 |
| `mounted`       | `onMounted()`       | DOM 노드 부착 직후               |
| `beforeUpdate`  | `onBeforeUpdate()`  | 데이터 변경으로 인한 재렌더링 전 |
| `updated`       | `onUpdated()`       | 재렌더링 및 DOM 업데이트 완료 후 |
| `beforeUnmount` | `onBeforeUnmount()` | 컴포넌트 인스턴스 해제 전        |
| `unmounted`     | `onUnmounted()`     | 컴포넌트 인스턴스 해제 후        |

<br><br>

## 3. 컴포넌트 통신 및 매크로 (Component Macros)

Composition API(`script setup`)에서 컴포넌트 설정을 위해 사용하는 주요 매크로이다. 이들은 별도의 `import` 없이 즉시 사용 가능하다.

| 기능                   | Options API           | Composition API | 설명                                    |
| :--------------------- | :-------------------- | :-------------- | :-------------------------------------- |
| **Props 선언**         | `props: { ... }`      | `defineProps()` | 자식 컴포넌트 속성 정의                 |
| **Emit 선언**          | `emits: [ ... ]`      | `defineEmits()` | 부모 컴포넌트 이벤트 정의               |
| **컴포넌트 <br> 노출** | `components: { ... }` | 자동 등록 (SFC) | `<script setup>` 내 임포트 시 자동 등록 |

<br><br>

## 4. 기타 사항들

- **ref vs reactive:**
  - 대부분의 경우 `ref` 사용을 권장한다.
  - 객체일지라도 `ref`로 감싸는 것이 일관성 측면에서 유리하다.

- **watch vs watchEffect:**
  - `watch`: 특정 반응형 값을 명시적으로 추적 (lazy, 필요 시 실행)
  - `watchEffect`: 내부에서 사용된 모든 의존성을 자동 추적 (즉시 실행)

  👉 권장 기준
  - 명확한 대상이 있을 때 → `watch`
  - 빠르게 반응형 효과를 만들 때 → `watchEffect`

- **setup() 제약사항:**
  - `this` 사용 불가
  - 생명주기 훅(onMounted 등)은 반드시 setup 내부에서 호출해야 함
  - 비동기 setup 사용 시 Suspense 고려 필요

- **Composable 작성 규칙:**
  - `useXxx` 형태로 네이밍
  - 상태 + 로직을 함께 반환
  - 여러 컴포넌트에서 재사용 가능
