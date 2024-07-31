---
title: "Hash Function"
excerpt: "[C++]자료구조 - Hash"

categories:
  - Data Structure
tags:
  - [Data Structure]

permalink: /data-structure/hash/

toc: true
toc_sticky: true
use_math: true

date: 2024-07-31
last_modified_at: 2024-07-31
published: true
---

# 👑 해시 함수 (Hash Function)와 해시 테이블 (Hash Table)

해시 함수는 `임의의 길이의 데이터를 고정된 길이의 데이터로 매핑`하는 함수이다. <br>

해시 함수는 입력 데이터를 해시 값(hash value) 또는 해시 코드(hash code)로 변환한다. <br>

바로 이 해시 함수를 이용하여 키를 값에 매핑하는 자료구조를 `해시 테이블`이라 한다. <br>

즉, `key-value` 쌍으로 이루어진 자료구조라고 볼 수 있다. <br>

<center><img src="https://github.com/user-attachments/assets/11cc1a8c-90db-44af-9914-217411a48791" width="500"></center>

해시 함수를 사용하는 이유 중 하나는 데이터의 효율적인 저장, 검색, 관리라고 볼 수 있다. <br>

해시 함수는 어떠한 데이터를 `고정된 크기의 해시 값`으로 변환하여 인덱스로 사용한다. <br>

key-value가 일대일 매칭이 되어 있어 `데이터의 삽입, 삭제, 검색`을 $ O(1) $ 의 시간 복잡도로 <br>

수행할 수 있다. 하지만, 임의 길이 데이터를 고정된 길이의 데이터로 변환하므로, 다른 입력 데이터임에도 <br>

동일한 해시 값을 가질 수 있다. 이를 `충돌(Collision)`이라 하며, 해시 함수는 충돌을 최소화해야 한다.

<br>

## 💡 충돌 해결 기법

우선 해시 함수를 사용하면서 충돌이 발생하지 않는 경우는 존재하지 않는다. <br>

해시 함수로의 입력이 무한하다고 할 때, 해시 함수는 유한한 수의 해시 값을 출력으로 내놓아야 한다. <br>

따라서 해시 테이블에서는 충돌이 일어날 수 밖에 없을 것이며, 충돌의 발생을 막는 것이 아닌 <br>

충돌이 발생했을 경우 완화하는 대책을 생각해야만 한다. <br><br>

충돌 해결 기법으로는 크게 `Chaining`과 `Open Addressing` 기법으로 나뉜다. <br><br>

### ✔ Chaining

동일한 해시 값을 갖는 모든 요소를 연결 리스트로 저장하는 방법이다. <br>

이상적인 경우 $ O(1) $ 의 시간복잡도를 갖지만, 모든 키의 해시 값이 같아지는 상황이 발생한다면, <br>

삭제, 갱신, 검색 등에서 연결 리스트의 요소들을 순회해야 하므로, $ O(N) $ 의 시간복잡도가 된다. <br>

물론 이와 같은 특성은 아래의 `Open Addressing` 기법에서도 나타난다. 따라서 각 키의 해시 값이 <br>

균등하게 배분되어야 성능이 향상된다.

<center><img src="https://github.com/user-attachments/assets/06f6a84f-53e3-4773-9ea1-71a65d1e8acb" width="600"></center>

<br>

### ✔ Open Addressing

충돌이 발생하면 다른 빈 슬롯을 찾는 방법이다. 대표적으로 선형 탐사(Linear Probing), <br>

이차 탐사(Quadratic Probing), 이중 해싱(Double Hashing) 등이 있다. <br><br>

쉽게 말하면, 해시 값에 해당하는 인덱스에 다른 값이 이미 저장되어 있다면, 해당 값에서 정해진 간격을 <br>

이동하여 다른 슬롯에 값을 저장하는 것이다.

<center><img src="https://github.com/user-attachments/assets/4930fc1a-8721-436d-8c4b-ec046ee2a39c" width="500"></center>

- `선형 탐사(Linear Probing)`

    + 고정된 간격으로 순차적으로 이동하며 다음 빈 슬롯을 찾으며 일반적인 이동 간격은 1이다.

    + 구현이 간단하며, 연속적인 메모리 접근으로 인한 `Cache hit rate`가 높다.

    + `Clustering` 문제가 발생할 수 있다. <br>
      (연속된 슬롯이 차지되는 경향이 있어 충돌이 빈번해질 수 있음)

<br>

- `이차 탐사(Quadratic Probing)`

    + 충돌이 발생했을 때, 탐색 간격이 `제곱수`로 증가하는 방법이다.

    + 선형 탐사보다 `Clustering` 문제를 줄여줄 수 있지만 여전히 발생하긴 한다.

<br>

- `이중 해싱(Double Hashing)`

    + 두 개의 서로 다른 해시 함수를 이용하는 방법으로 충돌이 발생할 때, 두 번째 해시 함수를 <br>
      이용하여 탐색 간격을 설정한다.

    + `Clustering` 문제를 해결할 수 있다.

    + 하지만, `Cache hit rate`가 낮아지며 구현의 복잡성이 증가한다.

<br>

# 👑 정리

해시 함수는 데이터베이스, 보안, 데이터 무결성 등 다양한 분야에서 사용되는 중요한 개념이다. <br>

`map`이나 `set`등의 자료구조 역시 내부적으로 해시 테이블을 사용하여 구현되었으며, 이를 통해 <br>

효율적이고 빠른 데이터의 삽입, 삭제, 검색 등을 지원한다. <br><br>

해시 함수의 사용에는 필연적으로 충돌 문제가 뒤따르며, 이를 해결하기 위한 방법으로 `Chaining`과 <br>

`Open Addressing` 방법이 존재한다. 각 방법에는 장단점이 존재하며, 최적의 해시 함수를 사용하는 것이 <br>

중요하다.

