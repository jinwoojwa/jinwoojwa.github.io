---
title: Java Stream API Docs (1) - Stream 생성
summary: Java의 Stream을 생성하는 모든 방법을 정리
date: 2026-05-01
slug: java-stream-creation
tags: Java
---

## Stream 생성하기

스트림 파이프라인은 데이터 소스로부터 스트림 인스턴스를 생성하는 것으로 시작한다.

자바는 단순한 리스트나 배열뿐만 아니라 숫자 범위, 무한 시퀀스, 파일 I/O 등 다양한 소스로부터 스트림을 생성할 수 있는 유연한 API를 제공한다.

모든 생성 메서드는 최종적으로 `Stream<T>` 혹은 기본형 스트림인 `IntStream`, `LongStream`, `DoubleStream`을 반환한다.

생성된 스트림은 데이터 자체가 아니라 데이터를 처리하기 위한 흐름을 표현하며, 스트림 연산은 원본 데이터를 직접 변경하지 않는다.

(단, 내부 요소의 상태를 변경하는 경우에는 원본에 영향을 줄 수 있다.)

<br><br>

## 1. Stream Interface

`Stream Interface`에서 제공하는 정적 메서드로, 특정 값이나 로직을 통해 스트림을 직접 생성한다.

<br>

### 1.1 `of()`

<br>

**시그니처:** `static <T> Stream<T> of(T... values)`

**설명:**

- 가변 인자를 사용하여 나열된 값들로 구성된 스트림을 생성한다.
- 소량의 고정 데이터를 빠르게 만들 때 유용하다.

**예시:**

```java
Stream<String> stream = Stream.of("Java", "Stream", "API");
```

<br>

### 1.2 `generate()`

<br>

**시그니처:** `static <T> Stream<T> generate(Supplier<T> s)`

**설명:**

- `Supplier`에 정의된 로직에 따라 값을 생성하며 **무한 스트림** 을 반환한다.
- 이전 값과 무관하게 매번 새로운 값을 생성한다.

**예시:**

```java
// "Echo"라는 문자열을 무한히 생성하는 스트림
Stream<String> generatedStream = Stream.generate(() -> "Echo").limit(5);
```

<br>

### 1.3 `iterate()`

<br>

**시그니처:** `static <T> Stream<T> iterate(T seed, UnaryOperator<T> f)`

**설명:**

- 초기값(`seed`)과 함수를 사용하여 순차적으로 요소를 생성하는 **무한 스트림** 을 반환한다.
- `generate()` 와는 다르게 이전 값을 기반으로 다음 값을 생성한다. (수열 생성 등에 적합)

**예시:**

```java
Stream<Integer> iterStream = Stream.iterate(0, n -> n + 2).limit(5);
```

<br>

### 1.4 `builder()`

<br>

**시그니처:** `static <T> Stream.Builder<T> builder()`

**설명:**

- 빌더 패턴을 사용하여 요소를 직접 추가하며 스트림을 생성한다.

**예시:**

```java
Stream<String> builderStream = Stream.<String>builder()
    .add("A").add("B").build();
```

<br>

### 1.5 `empty()`

**시그니처:** `static <T> Stream<T> empty()`

**설명:**

- 요소가 비어있는 빈 스트림을 반환한다.
- `null` 대신 안전하게 스트림을 반환할 때 사용한다.

**예시:**

```java
Stream<String> emptyStream = Stream.empty();
```

<br><br>

## 2. Collection Interface

자바 컬렉션 프레임워크(`List`, `Set` 등)을 소스로 하여 스트림을 생성한다.

<br>

### 2.1 `stream()`

<br>

**시그니처:** `default Stream<E> stream()` (Collection Interface)

**설명:**

- Collection 인터페이스에서 제공하는 디폴트 메서드로 컬렉션을 소스로 하는 순차 스트림을 생성한다.
- Collection 인터페이스를 구현한 모든 클래스(List, Set 등)에서 호출이 가능하다.

**예시:**

```java
List<Product> productList = List.of(
    new Product("Laptop", 1200, "Electronics"),
    new Product("Mouse", 50, "Electronics"),
    new Product("Apple", 2, "Food")
    );
Stream<Product> productStream = productList.stream();
```

<br>

### 2.2 `parallelStream()`

<br>

**시그니처:** `default Stream<E> parallelStream()` (Collection Interface)

**설명:**

- Collection 인터페이스에서 제공하는 디폴트 메서드로 컬렉션으로부터 **병렬 스트림** 을 생성한다.
- 여러 스레드에서 연산을 나누어 처리하며 대용량 데이터 처리 시 성능 이점을 가질 수 있다.
- 데이터 소스가 `ArrayList`가 아닌 `LinkedList`일 때 성능이 저하될 수 있다.

**주의:**

- 데이터가 충분히 클 경우 효과적이다.
- 공유 상태(side effect)가 있으면 위험하다.
- 순서가 중요한 연산에서는 주의가 필요하다.

**예시:**

```java
List<Product> productList = List.of(
    new Product("Laptop", 1200, "Electronics"),
    new Product("Mouse", 50, "Electronics"),
    new Product("Apple", 2, "Food")
    );
Stream<Product> parallelStream = productList.parallelStream();
```

<br><br>

## 3. Primitive Stream Interfaces (Int/LongStream)

- 기본 타입(`int`, `long`, `double`) 처리에 특화된 스트림이다.
- 일반 `Stream<T>`에서 발생하는 오토박싱/언박싱 비용이 없어 성능상 유리하다.
- `range()`와 같은 전용 메서드 외에도, `of()`, `iterate()`, `generate()`, `builder()`, `empty()` 등 앞서 살펴본 `Stream` 인터페이스의 정적 메서드들을 동일하게 (단, 각 타입에 맞춰) 제공한다.

<br>

### 3.1 `range() / rangeClosed()`

<br>

**시그니처:**

- `static IntStream range(int startInclusive, int endExclusive)`
- `static IntStream rangeClosed(int startInclusive, int endInclusive)`
- `static LongStream range(long startInclusive, long endExclusive)`
- `static LongStream rangeClosed(long startInclusive, long endInclusive)`

**설명:**

- 특정 범위의 정수 시퀀스를 생성한다.
- `IntStream`과 `LongStream` 인터페이스에서만 제공된다. (`DoubleStream`은 지원하지 않는다)
- `range` 종료 지점(End)을 **포함하지 않음**
- `rangeClosed` 종료 지점(End)을 **포함함**

**예시:**

```java
// 1, 2, 3, 4 생성
IntStream.range(1, 5).forEach(System.out::print);

// 1, 2, 3, 4, 5 생성
IntStream.rangeClosed(1, 5).forEach(System.out::print);
```

<br>

### 3.2 그 외 정적 메서드

**예시:**

```java
IntStream.of(1, 2, 3);

LongStream.iterate(0, n -> n + 1).limit(10);

DoubleStream.generate(Math::random).limit(5);
```

<br><br>

## 4. Other Classes (Arrays, Files, Random)

자바 표준 라이브러리의 다른 클래스들을 통해 스트림을 생성하는 방법이다.

<br>

### 4.1 `Arrays.stream()`

<br>

**시그니처:** `static <T> Stream<T> Arrays.stream(T[] array)` (Arrays Class)

**설명:**

- 배열을 소스로 하는 스트림을 생성한다.
- 기본 타입 배열 (`int[]`, `long[]`, `double[]`)을 넣으면, 각각 `IntStream`, `LongStream`, `DoubleStream`을 반환한다.

**예시:**

```java
String[] arr = new String[]{"a", "b", "c"};
Stream<String> stream = Arrays.stream(arr);

int[] intArr = {1, 2, 3};
IntStream intStream = Arrays.stream(intArr);
```

<br>

### 4.2 `Files.lines()`

<br>

**시그니처:** `static Stream<String> lines(Path path)` (Files Class)

**설명:**

- 지정한 경로의 파일 내용을 **행(line) 단위** 로 읽어 스트림을 반환한다.
- 파일을 한 번에 메모리에 올리지 않고, 한 줄씩 `lazy`하게 읽는다.
- 반드시 스트림을 닫아야 하므로 `try-with-resources` 사용이 권장된다.

**예시:**

```java
try (Stream<String> fileStream = Files.lines(Paths.get("data.txt"))) {
    fileStream.forEach(System.out::println);
} catch (IOException e) {
    e.printStackTrace();
}
```

<br>

### 4.3 `Random.ints() / longs() / doubles()` (Random Class)

<br>

**시그니처:**

- `IntStream ints()`
- `IntStream ints(int randomNumberOrigin, int randomNumberBound)`
- `IntStream ints(long streamSize)`
- `IntStream ints(long streamSize, int randomNumberOrigin, int randomNumberBound)`

(`LongStream`과 `DoubleStream`에 대해서도 동일한 오버로딩 제공)

**설명:**

- 난수로 이루어진 스트림을 생성한다.
- `streamSize`가 지정되지 않으면 무한 스트림을 반환하므로, `limit()`과 함께 사용하거나 사이즈를 지정해야 한다.
- `origin`은 포함, `bound`는 포함하지 않음이다.

**예시:**

```java
// 1~100 사이의 난수 5개를 생성
IntStream randomStream = new Random().ints(5, 1, 101);
```
