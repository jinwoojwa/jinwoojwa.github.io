---
title: "[C++] 참조자 (Reference)"
excerpt: "[C++] Reference"

categories:
  - C++
tags:
  - [C++]

permalink: /cplusplus/reference/

toc: true
toc_sticky: true
use_math: true

date: 2024-08-01
last_modified_at: 2024-08-01
---

# 👑 참조자(Reference)란?

`C 언어`에서는 어떠한 변수를 참조하기 위해 `포인터`라는 개념을 사용하였다. 물론 `C++`에서도 <br>

포인터를 사용할 수 있지만, `C`와는 다르게 `참조자 (reference)`를 사용하여 변수를 가리킬 수 있다. <br><br>

`C 언어`에서의 두 수의 값을 교환하는 것을 예로 들면, 아래와 같이 포인터를 사용하여 `swap` 함수의 <br>

인자로 x, y의 주소값을 전달하여 참조하고, 값을 바꿀 수 있었다. `C++`에서는 이와 다른 방법을 제공하는데 <br>

그것이 바로 `참조자`이다. <br>

```c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *b;
    *b = *a;
    *a = temp;
}

int main() {
    int x = 2;
    int y = 4;
    
    printf("x: %d, y: %d\n", x, y); // x: 2, y: 4
    
    swap(&x, &y);
    
    printf("x: %d, y: %d", x, y);   // x: 4, y: 2

    return 0;
}
```

<br>

`참조자`는 쉽게 말하면 변수의 **별명**이라고 할 수 있다. <br>

아래처럼 어떠한 변수의 참조자를 `&` 연산자를 통해 정의할 수 있다. <br>

```c++
int x = 66;
int& ref = x; // x의 참조자 ref를 정의

// ❗ 다음과 같은 상수 참조는 X
int& ref2 = 10; // 오류
```

이제 참조자 `ref`는 `x`의 다른 이름으로써 `x를 사용하는 것과 동일한 효과를 같는다.` 즉, `ref`에 <br>

어떠한 연산을 수행해도 `x`에 수행하는 것과 마찬가지의 결과를 낳는다. <br>

```c++
ref = 7;
std::cout << "x: " << x << " ref: " << ref; // x: 7 ref: 7
```

<br>

또한, 참조자는 `메모리에서 독립적인 주소를 가지지 않으며,` 참조자가 가리키는 변수의 메모리 주소를 <br>

공유한다. 컴파일러는 참조자에 대한 메모리 주소를 할당하지 않고, 참조자가 가리키는 변수의 주소를 <br>

사용한다. 이는 성능상의 오버헤드를 줄이는 효과를 가져다 줄 수 있다.

<br>

## 💡 포인터 vs 참조자

참조자와 포인터 모두 어떤 다른 변수의 주소값을 통해 해당 변수의 값에 접근하여 연산을 수행할 수 있다. <br>

둘은 비슷한 역할을 수행하며 상당히 유사하게 동작한다. 하지만, 둘 사이에는 몇 가지 중요한 차이점이 <br>

존재하며, 이는 참조자와 포인터를 적절히 사용하는 데 중요한 역할을 한다. <br><br>

- `초기화`

    + `참조자`의 경우 선언 시 `반드시 초기화되어야` 하며, 이후에 다른 객체를 참조할 수 없다.

    + `포인터`의 경우 선언 시 반드시 초기화할 필요는 없으며, 나중에 다른 주소를 가리킬 수 있다.

    + 즉, 참조자는 포인터에 비해 더 안전하다고 볼 수 있다.

```c++
int x = 5;
int& ref = x; // 가능
int& ref2;    // 오류: 정의 시에 반드시 초기화 되어야 함.

int y = 3;
int* ptr;
ptr = &y;     // 가능: 선언 시 반드시 초기화할 필요 없음.
```

- `NULL 값`

    + `참조자`의 경우 NULL 값을 가리킬 수 없으며, 항상 유효한 객체를 참조해야 한다.

    + `포인터`는 NULL 값을 가질 수 있다.

```c++
int& ref = nullptr;  // 오류: 참조자는 NULL을 가리킬 수 없음

int* ptr = nullptr;  // 가능
```

- `재할당`

    + 한 번 초기화된 `참조자`는 다른 객체를 참조하도록 변경할 수 없다.

    + `포인터`의 경우 다른 주소를 가리키도록 변경할 수 있다.

```c++
int x = 5;
int y = 10;
int& ref = x;
ref = y;  // 'ref'는 여전히 'x'를 참조하며, 'x'의 값이 'y'의 값으로 변경됨

int x = 5;
int y = 10;
int* ptr = &x;
ptr = &y;  // 이제 'ptr'은 'b'를 가리킴
```

- 이외에도 `참조자`의 경우 `*` 연산자의 사용 없이 간단하게 사용할 수 있다는 장점을 가지고 있다.

<br>

## 💡 참조자의 사용

`참조자`는 포인터에 비해 쉽고 간결하게 사용할 수 있음을 알게 되었다. 위의 `swap` 함수를 참조자를 <br>

사용하여 아래와 같이 구현할 수 있다.

```c++
#include <iostream>

void swap(int& a, int& b) {
    int temp = b;
    b = a;
    a = temp;
}

int main() {
    int x = 2;
    int y = 4;

    std::cout << "x: " << x << " y: " << y << '\n';   // x: 2 y: 4

    swap(x, y);
    
    std::cout << "x: " << x << " y: " << y << '\n';   // x: 4 y: 2
}
```

<br>

위에서 아래와 같이 상수를 참조하는 것은 불가능하다고 했다. <br>

```c++
int& ref = 10;
```

하지만, `const`를 사용하여 리터럴을 참조할 수 있으며, 다음과 같이 사용할 수 있다.

```c++
const int &ref = 66;
int x = ref;   // x = 66; 과 동일함.
```

<br>

또한, 함수 인수로 참조자를 사용하면 값을 복사하지 않고도 큰 객체를 다룰 수 있어 오버헤드를 줄일 <br>

수 있는 효과를 준다. 아래의 경우를 예로 들면, 참조자를 사용하지 않고 함수의 인자로 `str`을 전달하면 <br>

원본 문자열의 복사본을 생성하게 된다. `(PrintStr의 경우 = Call by Value)` <br>

하지만, 참조자를 사용한 인자의 전달은 원본 문자열을 복사하는 것이 아니라 참조만 하여 추가적인 메모리를 <br>

사용하지 않게 된다. `(PrintStrRef의 경우 = Call by Reference)` 만약, 아래와 같은 단순한 문자열이 <br>

아니라 큰 객체를 전달할 경우 둘의 성능 차이는 더욱 클 것이다. 따라서, 불필요한 복사를 피하기 위해 <br>

참조자를 이용하는 방식이 바람직하다.

```c++
#include <iostream>
#include <string>

void PrintStr(const std::string str) { // Call by Value
    std::cout << str << '\n';
}

void PrintStrRef(const std::string& str) { // Call by Reference
    std::cout << str << '\n';
}

int main() {
    std::string str = "Hello World!";
    
    PrintStr(str);
    PrintStrRef(str);
    
    return 0;
}
```