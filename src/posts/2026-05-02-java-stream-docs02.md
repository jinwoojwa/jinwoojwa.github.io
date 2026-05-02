---
title: Java Stream API Docs (2) - Stream의 중간 연산
summary: 스트림의 데이터를 가공하고 변환하는 중간 연산 메서드들을 정리
date: 2026-05-02
slug: java-stream-intermediate-operations
tags: Java
---

중간 연산은 스트림 파이프라인에서 데이터를 필터링, 매핑, 정렬하는 등 실제적인 가공을 담당한다.

중간 연산의 가장 큰 특징은 **연산 결과로 스트림을 반환** 한다는 것이며, 이 덕분에 여러 연산을 연결(Chaining)할 수 있다.

또한, **지연(Lazy) 연산** 특성을 가지므로 최종 연산이 호출되기 전까지는 아무런 연산도 수행하지 않는다.

<br><br>

## ⚙️ 예시 클래스 및 데이터

중간 연산의 다양한 활용법(필터링, 매핑, 정렬 등)을 보여주기 위해 아래의 `Member` 클래스를 공통으로 사용한다.

```java
public class Member {
    private String name;
    private int score;
    private List<String> skills;

    public Member(String name, int score, List<String> skills) {
        this.name = name;
        this.score = score;
        this.skills = skills;
    }
    // getter 생략

    public boolean isGradeA() {
        return score >= 90;
    }
}

List<Member> members = Arrays.asList(
    new Member("Alice", 85, List.of("Java", "Spring")),
    new Member("Bob", 92, List.of("Python", "Django")),
    new Member("Charlie", 78, List.of("Java", "Kotlin")),
    new Member("David", 92, List.of("Go", "Docker"))
);
```

<br><br>

## 1. 필터링 및 중복 제거

데이터 소스에서 필요한 요소만 걸러내는 연산이다.

<br>

### 1.1 `filter()`

<br>

**시그니처:** `Stream<T> filter(Predicate<? super T> predicate)`

**설명:**

- `Predicate (boolean을 반환하는 함수)`를 인수로 받아 Predicate와 일치하는 모든 요소를 포함하는 새 스트림을 반환한다.

**예시:**

```java
// isGradeA 메서드 참조를 통해 90점 이상만 필터링
members.stream()
    .filter(Member::isGradeA)
    .forEach(m -> System.out.println(m.getName())); // Bob, David

// Java 스킬을 보유한 사람만 필터링
members.stream()
    .filter(m -> m.getSkills().contains("Java"))
    .forEach(m -> System.out.println(m.getName())); // Alice, Charlie
```

<br>

### 1.2 `distinct()`

<br>

**시그니처:** `Stream<T> distinct()`

**설명:**

- 중복된 요소를 제거한다.
- 객체의 경우 `equals()`와 `hashCode()`를 기반으로 판단한다.
- 따라서 올바른 동작을 위해서는 `equals/hashCode` 두 메서드가 일관되게 재정의되어야 한다.

**예시:**

```java
members.stream() // 85, 92, 78, 92
    .map(Member::getScore)
    .distinct()
    .forEach(System.out::println); // 85, 92, 78
```

<br><br>

## 2. 매핑 (Mapping)

스트림의 요소를 다른 형태의 요소로 변환하는 연산이다.

<br>

### 2.1 `map()`

<br>

**시그니처:** `<R> Stream<R> map(Function<? super T, ? extends R> mapper)`

**설명:**

- 각 요소에 주어진 함수를 적용하여 새로운 형태의 스트림으로 변환한다.

**예시:**

```java
// 멤버 객체에서 이름 문자열만 추출
members.stream()
    // Stream<Member> -> Stream<String>
    .map(Member::getName)
    .forEach(System.out::println); // Alice, Bob, Charlie, David

Stream<String> stream = Stream.of("apple", "banana", "cherry");
// Stream<String>을 Stream<Integer>로 변환
stream.map(String::length)
      .forEach(System.out::println); // 5, 6, 6
```

<br>

### 2.2 `flatMap()`

<br>

**시그니처:** `<R> Stream<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper)`

**설명:**

- 중첩 구조(예: 리스트 안의 리스트)를 **한 단계 평탄화하여** 하나의 스트림으로 변환한다.
- `map()`이 1:1 변환이라면, `flatMap()`은 1:N 구조를 펼치는 연산이다.

**예시:**

```java
// 모든 멤버가 가진 기술을 하나의 스트림으로 합치기
members.stream()
    .flatMap(m -> m.getSkills().stream())
    .distinct() // 중복 기술 제거
    .forEach(System.out::println); // Java, Spring, Python, Django, Kotlin, Go, Docker

List<List<String>> list = List.of(List.of("A", "B"), List.of("C", "D"));
// [[A, B], [C, D]] -> [A, B, C, D]
list.stream()
    .flatMap(Collection::stream)
    .forEach(System.out::print); // ABCD
```

<br>

### 2.3 `mapToInt() / mapToLong() / mapToDouble()`

<br>

**시그니처:**

- `IntStream mapToInt(ToIntFunction<? super T> mapper)`
- `LongStream mapToLong(ToLongFunction<? super T> mapper)`
- `DoubleStream mapToDouble(ToDoubleFunction<? super T> mapper)`

**설명:**

- 일반 객체 스트림을 기본형 스트림(`IntStream`, `LongStream`, `DoubleStream`)으로 변환한다.
- 이후 합계(`sum()`), 평균(`average()`) 등의 숫자 전용 연산이 가능해진다.

**예시:**

```java
double avg = members.stream()
    .mapToInt(Member::getScore)
    .average()
    .orElse(0.0);
```

<br>

### 2.4 `flatMapToInt() / flatMapToLong() / flatMapToDouble()`

<br>

**시그니처:**

- `IntStream flatMapToInt(Function<? super T, ? extends IntStream> mapper)`
- `LongStream flatMapToLong(Function<? super T, ? extends LongStream> mapper)`
- `DoubleStream flatMapToDouble(Function<? super T, ? extends DoubleStream> mapper)`

**설명:**

- 중첩된 구조를 평면화함과 동시에 결과 요소를 기본형 스트림(Primitive Stream)으로 변환한다.
- `flatMap -> mapToInt`를 호출하는 것보다 효율적이며, 연속적인 숫자 관련 종료 연산을 바로 적용할 수 있다.

**예시: (※ 예제를 위해 별도의 Member 클래스를 사용)**

```java
// 각 멤버가 수행한 과제 점수 리스트를 하나의 IntStream으로 합산 처리
public class Member {
    private String name;
    private List<Integer> testScores; // [80, 90, 75] 처럼 과제 점수가 여러 개

    public Member(String name, List<Integer> testScores) {
        this.name = name;
        this.testScores = testScores;
    }
    public List<Integer> getTestScores() { return testScores; }
}

List<Member> members = Arrays.asList(
    new Member("Alice", List.of(80, 90)),
    new Member("Bob", List.of(70, 85, 95))
);

// 모든 멤버의 모든 과제 점수 평균 구하기
double totalAvg = members.stream()
    .flatMapToInt(m -> m.getTestScores().stream().mapToInt(Integer::intValue))
    .average()
    .orElse(0.0);

System.out.println("전체 과제 평균: " + totalAvg); // 84.0
```

<br>

### 2.5 `mapMulti()` (Stream Interface / Java 16+)

<br>

**시그니처:** `default <R> Stream<R> mapMulti(BiConsumer<? super T,? super Consumer<R>> mapper)`

**설명:**

- `flatMap()`과 유사하게 요소 하나를 여러 개로 변환할 때 사용하지만, 내부적으로 스트림 객체를 새로 생성하지 않고, `Consumer`를 통해 직접 요소를 전달한다.
- 따라서 객체 생성 비용을 줄일 수 있어 성능상 이점이 있다.

**💡 참고:**

- `mapMulti()` 역시 기본형 스트림으로의 변환을 지원하는 `mapMultiToInt()`, `mapMultiToLong()`, `mapMultiToDouble()` 메서드를 제공한다.

**예시:**

```java
// 숫자 리스트에서 짝수만 추출하여 두 번씩 복제
List<Integer> numbers = List.of(1, 2, 3, 4);
numbers.stream()
    .mapMulti((n, consumer) -> {
        if (n % 2 == 0) {
            consumer.accept(n);
            consumer.accept(n);
        }
    })
    .forEach(System.out::print); // 2244
```

<br>

### 2.6 `boxed()` (Int/Long/DoubleStream Interface)

<br>

**시그니처:**

- `Stream<Integer> boxed()`
- `Stream<Long> boxed()`
- `Stream<Double> boxed()`

**설명:**

- 기본형 스트림(`IntStream` 등)의 요소를 래퍼 객체 스트림(`Stream<Integer>` 등)으로 변환(박싱)한다.
- 숫자 전용 스트림에서 다시 일반 객체 스트림의 기능을 사용해야 할 때 유용하다.

**예시:**

```java
IntStream.rangeClosed(1, 3)
    .boxed() // IntStream -> Stream<Integer>
    .collect(Collectors.toList());
```

<br><br>

## 3. 정렬 및 제한

스트림을 정렬하거나 크기를 조절하는 연산이다.

<br>

### 3.1 `sorted()`

<br>

**시그니처:**

- `Stream<T> sorted()`
- `Stream<T> sorted(Comparator<? super T> comparator)`

**설명:**

- 요소를 정렬한다.
- 인자가 없으면 자연 순서(Natural Order)로 정렬하며, `Comparator`를 전달하여 커스텀 정렬이 가능하다.

**예시:**

```java
// 점수 내림차순, 점수가 같으면 이름 오름차순으로 정렬
members.stream()
    .sorted(Comparator.comparing(Member::getScore).reversed() // 주의: reversed()는 앞 comparator 전체를 뒤집음
                      .thenComparing(Member::getName))
    .forEach(m -> System.out.println(m.getName() + ": " + m.getScore()));

// 위와 동일한 결과
members.stream()
    .sorted(Comparator.comparing(Member::getScore, Comparator.reverseOrder())
                      .thenComparing(Member::getName))
    .forEach(m -> System.out.println(m.getName() + ": " + m.getScore()));

Stream.of(3, 1, 4, 2)
      .sorted()
      .forEach(System.out::print); // 1234
```

<br>

### 3.2 `limit()`

<br>

**시그니처:** `Stream<T> limit(long maxSize)`

**설명:**

- 스트림의 앞에서부터 지정된 개수(`maxSize`)만큼의 요소만 포함하는 새 스트림을 반환한다.

**예시:**

```java
members.stream()
    .sorted(Comparator.comparing(Member::getScore).reversed())
    .skip(1) // 1위 제외
    .limit(2) // 2위, 3위만 선택
    .forEach(m -> System.out.println(m.getName()));

Stream.iterate(1, n -> n + 1)
      .limit(3)
      .forEach(System.out::print); // 123
```

<br>

### 3.3 `skip()`

<br>

**시그니처:** `Stream<T> skip(long n)`

**설명:**

- 스트림의 앞에서부터 지정된 개수(`n`)만큼의 요소를 건너뛰고 나머지 요소를 포함하는 새 스트림을 반환한다.

**예시:**

```java
members.stream()
    .sorted(Comparator.comparing(Member::getScore).reversed()
                      .thenComparing(Member::getName))
    .skip(1) // 1위 제외
    .forEach(m -> System.out.println(m.getName()));

Stream.of(1, 2, 3, 4, 5)
      .skip(3)
      .forEach(System.out::print); // 45
```

<br>

### 3.4 `takeWhile()` (Stream Interface / Java 9+)

<br>

**시그니처:** `default Stream<T> takeWhile(Predicate<? super T> predicate)`

**설명:**

- 스트림의 요소가 **주어진 조건을 만족하는 동안만** 요소를 취하고, 조건을 만족하지 않는 요소를 만나는 즉시 나머지 모든 요소를 버린다.
- `Predicate`가 `false`가 될 때까지 요소를 선택한다.
- 주로 정렬된 데이터에서 특정 구간을 잘라낼 때 의미가 있다.
- 중간에 조건이 깨지면 이후 요소는 검사하지 않기 때문에 `filter()`와는 동작 방식이 다르다.

**예시:**

```java
// 정렬된 데이터에서 특정 기준까지만 가져오기
Stream.of(10, 20, 30, 40, 25, 10)
      .takeWhile(n -> n < 35)
      .forEach(System.out::print); // 10, 20, 30 (40을 만나는 순간 종료)
```

<br>

### 3.5 `dropWhile()` (Stream Interface / Java 9+)

**시그니처:** `default Stream<T> dropWhile(Predicate<? super T> predicate)`

**설명:**

- `takeWhile()`과 반대로, 조건에 만족하는 동안의 요소들을 전부 버리고 그 이후의 나머지 요소를 포함하는 스트림을 반환한다.
- 또한 `takeWhile()`처럼 정렬된 데이터에서 의미가 있다.

**예시:**

```java
Stream.of(10, 20, 30, 40, 25, 10)
      .dropWhile(n -> n < 35)
      .forEach(System.out::print); // 40, 25, 10 (40을 만나는 순간부터 끝까지 유지)
```

<br><br>

## 4. 기타 연산

<br>

### 4.1 `peek()`

<br>

**시그니처:** `Stream<T> peek(Consumer<? super T> action)`

**설명:**

- 스트림의 각 요소를 소모하지 않고 지정된 동작을 수행한다.
- 주로 **디버깅 용도** 로 사용된다. (최종 연산인 `forEach`와 달리 스트림을 계속 유지함)
- 디버깅 외의 용도로 사용하는 것은 권장하지 않으며, 특히 상태 변경(side effect)을 수행하면 예기치 않은 동작을 유발할 수 있다.

**예시:**

```java
Stream.of("A", "B", "C")
      .filter(s -> s.startsWith("A"))
      .peek(s -> System.out.println("Filtered: " + s)) // 디버깅 출력
      .map(String::toLowerCase)
      .forEach(System.out::println);
```

<br><br>

## ⚠️ 중간 연산 시 주의 사항

- **상태 유지 연산:**
  - `sorted()`, `distinct()` 같은 연산은 이전의 모든 요소가 처리되어야 다음 단계로 진행될 수 있으므로, 무한 스트림에 사용할 때는 반드시 `limit()` 등을 통해 범위를 제한해야 한다.

- **지연 실행:**
  - 최종 연산이 호출되지 않으면 중간 연산은 절대 실행되지 않는다.

- **Stateful vs Stateless**
  - `Stateless` 연산: `filter`, `map` 등 (각 요소를 독립적으로 처리)
  - `Stateful` 연산: `sorted`, `distinct` 등 (이전 요소 상태를 필요로 함)
