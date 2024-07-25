---
title: "[C++] C++ STL Vector"
excerpt: "Vector 클래스"

categories:
  - C++
tags:
  - [C++]

permalink: /cplusplus/vector/

toc: true
toc_sticky: true
use_math: true

date: 2024-07-25
last_modified_at: 2024-07-25
---

# 👑 Vector란?

> Vectors are sequence containers representing arrays that can change in size.

[Vector(벡터)](https://cplusplus.com/reference/vector/vector/)란 쉽게 말해 동적으로 크기 조절이 가능한 배열이다. 배열과 같이 벡터 또한 <br>

메모리 상의 연속된 위치에 원소를 저장하여 배열처럼 효율적으로 원소에 접근할 수 있다. <br><br>

크기를 변경할 수 없는 배열과 달리 벡터는 크기를 늘리고 줄일 수 있으며, 새로운 요소 삽입 시에 크기를  <br>

늘리기 위해 재할당을 할 수 있다. 하지만, 재할당이 발생하면 새로운 배열을 생성하고, 모든 요소들을 <br>

해당 배열로 옮기는 작업을 수행하게 된다. 이는 큰 오버헤드를 발생시키므로, 벡터 컨테이너에서는 <br>

여유 저장소를 통해 이를 해결한다. 벡터는 현재 저장 가능한 최대 원소 수인 `capacity`와 현재 저장된 <br>

원소의 수인 `size`의 비교를 통해 재할당을 하게 된다. C++ 표준 라이브러리 구현에서는 보통 재할당 시 <br>

현재 `capacity`의 2배로 용량을 재할당한다. 따라서 배열과 비교했을 때, 벡터는 동적으로 저장소를 <br>

관리할 수 있다는 장점을 가지지만, 더 많은 메모리를 소비하게 된다. <br><br>

다른 `dynamic sequence containers` 와 비교했을 때 벡터는 배열과 마찬가지로 요소에 접근하는 데 <br>

매우 효율적이며, 벡터 끝에서 요소의 추가/삭제에 매우 효율적이다.

<br>

## 💡 Vector의 선언, 초기화

벡터를 사용하기 위해서는 `<vector>`를 include 해야 한다. <br>

다음은 `Vector`의 선언, 초기화 방법이다.

<br>

```c++
#include <vector>

int main() {

    std::vector<int> int_vec; // 정수형 빈 벡터 선언

    std::vector<std::string> string_vec; // 문자열형 빈 벡터 선언

    std::vector<int> vec1(5, 10); // 크기가 5이며, 모든 요소를 10으로 초기화

    std::vector<int> vec2 = {1, 2, 3} // 초기화 리스트를 사용한 벡터 초기화

    std::vector<int> vec3(vec1); // vec1을 복사하여 vec3을 초기화

    std::vector<int> vec4(vec2.begin(), vec2.end() + 2); // vec2의 처음 2개 요소로 초기화

    std::vector<vector<int>> vec5; // 2차원 벡터 생성

    return 0;
}
```

<br>

## 💡 멤버 함수 - Iterators

다음은 벡터의 요소에 접근하는 데 사용되는 멤버 함수들이다.

- `begin()`

    + 벡터의 첫 번째 요소를 가리키는 iterator를 반환한다.
    + 파라미터는 없으며, 반환 타입은 `iterator`이다.

<br>

- `end()`

    + 벡터의 마지막 요소 다음을 가리키는 iterator를 반환한다.
    + 파라미터는 없으며, 반환 타입은 `iterator`이다.

<br>

- 이외에도 역방향 반복자를 반환하는 `rbegin()`, `rend()` 함수가 존재하며,

- 반복자가 가리키는 곳의 값을 변경하지 못하는 `cbegin()`, `cend()` 함수가 존재한다.

- 또한 이 둘을 합친 `crbegin()`, `crend()` 함수도 존재한다.

<br>

```c++
std::vector<int> vec = {1, 2, 3, 4, 5};

// begin, end
std::vector<int>::iterator it = vec.begin();
std::cout << *it; // 출력: 1

it = vec.end(); // it = vec.end() - 1로 두면 *it으로 출력 가능
std::cout << *(it - 1); // 출력: 5


// rbegin, rend
std::vector<int>::reverse_iterator rit = vec.rbegin();
std::cout << *rit // 출력: 5

rit = vec.rend() - 2; // rend() 에서 -- 하면 → 로 이동
std::cout << *rit // 출력: 2
```

<br>

## 💡 멤버 함수 - Element access

다음은 벡터의 요소를 읽거나 수정하는 데 사용되는 멤버 함수들이다.

- `operator[]`

    + 벡터의 특정 인덱스에 있는 요소에 접근하는 함수이다.
    + 배열처럼 인덱스를 통해 요소를 읽거나 수정이 가능하다.

<br>
    
- `at()`

    + 벡터의 특정 인덱스에 있는 요소에 접근하는 함수로 `operator[]`와 비슷하다.
    + `at()`은 인덱스가 벡터의 범위를 벗어나면 std::out_of_range 예외를 던진다.

<br>

- `front()`

    + 벡터의 첫 번째 요소를 반환한다.

<br>

- `back()`

    + 벡터의 마지막 요소를 반환한다.

<br>

- `data()`

    + 벡터의 첫 번째 요소를 가리키는 **포인터**를 반환한다.
    + 배열처럼 접근이 가능하도록 한다.

<br>

```c++
std::vector<int> vec = {10, 20, 30, 40, 50};


// operator[]
std::cout << vec[2]; // 출력: 30
vec[2] = 35; // 3번째 요소를 35로 변경


// at()
std::cout << vec.at(2); // 출력: 30
std::cout << vec.at(6); // 'std::out_of_range' 예외 발생


// front()
std::cout << vec.front(); // 출력: 10
vec.front() = 15; // 첫 번째 요소를 15로 변경


// back()
std::cout << vec.back(); // 출력: 50
vec.back() = 55; // 첫 번째 요소를 55로 변경
```

<br>

## 💡 멤버 함수 - Capacity

다음은 컨테이너의 용량을 관리하고 조작하는 멤버 함수들이다.

- `size()`

    + 벡터에 저장된 요소의 개수를 반환한다.
    + 파라미터는 없으며, 반환 타입은 `size_t` 이다.

<br>

- `resize()`

    + 벡터의 크기를 변경한다.
    + 새로운 크기가 현재 크기보다 크면 기본값으로 초기화된 요소가 추가되며, 작으면 요소가 제거된다.

<br>

- `capacity()`

    + 현재 벡터에게 할당된 저장 공간의 크기를 반환한다.
    + 벡터의 `size()` 와 같을 필요는 없으며, 같거나 큰 값을 갖는다.

<br>

- `empty()`

    + 벡터가 비어있는지 여부를 반환한다.
    + 반환 타입은 `bool`이며, 비어 있으면 `true`, 그렇지 않으면 `false`를 반환한다.

<br>

- `reserve()`

    + `void reserve (size_t n)`
    + 벡터의 `capacity`를 최소 `n` 이상으로 요청한다.
    + 재할당을 줄이기 위해 사용된다.
    + 벡터의 `resize()`와는 다르게 `size`를 변경하지 않고, `capacity`만 증가시킨다.

<br>

- `max_size()`

    + 벡터가 저장할 수 있는 최대 요소 수를 반환한다.
    + 시스템과 구현에 따라 달라지는 값이다.

<br>

- `shrink_to_fit()`

    + 벡터의 현재 `capacity`를 현재 `size` 크기로 줄이도록 시도한다.
    + 구현에 따라 무시될 수도 있다.

<br>

```c++
std::vector<int> vec = {1, 2, 3, 4, 5};


// size()
std::cout << "Size: " << vec.size(); // 출력: Size: 5


// resize()
std::vector<int> v = {1, 2, 3};
v.resize(5); // {1, 2, 3, 0, 0} - 두 개의 요소 추가 (기본값 0)
v.resize(2); // {1, 2} - 마지막 3 요소 제거


// capacity()
std::cout << "Capacity: " << vec.capacity();


// empty()
std::vector<int> empty_vec;
std::cout << "Is empty? : " << empty_vec.empty(); // 출력: Is empty? : 1


// reserve()
std::vector<int> r_vec;
r_vec.reserve(10);
std::cout << "After: " << r_vec.capacity(); // 출력: After: 10
```

<br>

## 💡 멤버 함수 - Modifiers

다음은 벡터의 요소를 추가, 제거, 수정하는 멤버 함수들이다.

- `assign()`

    + 벡터의 내용을 새로운 값들로 교체하는 데 사용된다.
    + 여러 오버로드를 제공하며, 다양한 방식으로 벡터를 채울 수 있다.

<br>

- `push_back()`

    + 벡터의 끝에 요소를 추가한다.
    + `size`를 1 증가시키며, `capacity`와 비교하여 자동으로 재할당을 수행한다.

<br>

- `pop_back()`

    + 벡터의 마지막 요소를 제거한다.

<br>

- `insert()`

    + 벡터의 지정된 위치에 요소를 삽입한다.
    + `std::vector` 클래스의 `insert` 함수는 여러 오버로드를 제공한다.

<br>

- `erase()`

    + 벡터의 지정된 위치 or 범위 요소를 제거한다.

<br>

- `swap()`

    + 두 벡터의 내용을 교환한다.
    + `size, capacity`가 0인 컨테이너 객체와 `capacity`를 0으로 만들고자 하는 <br>
      컨테이너를 `swap` 하여 `capacity`를 0으로 만드는 데 사용하기도 한다.

<br>

- `clear()`

    + 벡터의 모든 요소를 제거한다.
    + `capacity`를 0으로 만들어주진 않는다. (`swap` 함수를 통해 0으로 만들 수 O)

<br>

- `emplace()`

    + 지정된 위치에 새 요소를 직접 생성하여 삽입한다.

<br>

- `emplace_back()`

    + 벡터의 끝에 새 요소를 직접 생성하여 삽입한다.

<br>

```c++
// assign()
std::vector<int> vec = {1, 2, 3};
vec.assign(5, 10); // vec: {10, 10, 10, 10, 10}

std::vector<int> source = {1, 2, 3, 4, 5};
std::vector<int> vec;
vec.assign(source.begin() + 1, source.end() - 1); // vec: {2, 3, 4}

std::vector<int> vec = {1, 2, 3};
vec.assign({4, 5, 6}); // vec: {4, 5, 6}


// push_back()
std::vector<int> vec;
vec.push_back(1); // vec: {1}


// pop_back()
std::vector<int> vec = {1, 2, 3};
vec.pop_back(); // vec: {1, 2}


// insert()
std::vector<int> vec = {1, 2, 3};
vec.insert(vec.begin() + 1, 4); // vec: {1, 4, 2, 3}

std::vector<int> vec = {1, 2, 3};
vec.insert(vec.begin() + 1, 3, 4); // vec: {1, 4, 4, 4, 2, 3}

std::vector<int> vec1 = {1, 2, 3};
std::vector<int> vec2 = {4, 5, 6};
vec1.insert(vec1.begin() + 1, vec2.begin(), vec2.end()); // vec1: {1, 4, 5, 6, 2, 3}


// erase()
std::vector<int> vec = {1, 2, 3, 4};
vec.erase(vec.begin() + 2); // vec: {1, 2, 4}
vec.erase(vec.begin(), vec.begin() + 3); // vec: {4}


// swap()
std::vector<int> vec1 = {1, 2, 3};
std::vector<int> vec2 = {4, 5, 6};
vec1.swap(vec2); // vec1: {4, 5, 6}, vec2: {1, 2, 3}

std::vector<int>().swap(vec1); // → vec1의 capacity = 0


// clear()
std::vector<int> vec = {1, 2, 3};
vec.clear(); // vec is now empty


// emplace()
std::vector<std::pair<int, int>> vec;
vec.emplace(vec.begin(), 1, 2); // vec: {(1, 2)}


// emplace_back()
std::vector<std::pair<int, int>> vec;
vec.emplace_back(3, 4); // vec: {(3, 4)}
```

<br>

### ✔ emplace_back vs push_back

- `push_back`의 경우 이미 존재하는 객체를 벡터의 끝에 추가한다.

- 반면 `emplace_back`은 벡터의 끝에 요소를 직접 생성한다.

<br>

```c++
// push_back
std::vector<std::string> vec;
std::string s = "hello";
vec.push_back(s); // 복사
vec.push_back("world"); // 이동

// emplace_back
std::vector<std::string> vec;
vec.emplace_back("hello"); // "hello"를 직접 생성
vec.emplace_back(5, 'a');  // "aaaaa"를 직접 생성


// e.g.
⁝
class MyClass {
public:
    MyClass(int a, double b) {
        std::cout << "Call constructor " << a << " and " << b; 
    }
};

int main() {
    std::vector<MyClass> vec;

    // push_back 사용
    MyClass obj(1, 2.0); // 객체가 먼저 생성됨
    vec.push_back(obj);  // 이미 생성된 객체가 벡터에 삽입됨

    // emplace_back 사용
    vec.emplace_back(3, 4.0); // 벡터의 끝에 직접 객체가 생성됨

    return 0;
}
```

