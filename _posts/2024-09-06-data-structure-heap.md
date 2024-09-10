---
title: "힙 (Heap)"
excerpt: "[C++]자료구조 - Heap"

categories:
  - 자료구조
tags:
  - [Data Structure]

permalink: /data-structure/heap/

toc: true
toc_sticky: true
use_math: true

date: 2024-09-06
last_modified_at: 2024-09-07
published: true
---

# 👑 힙 (Heap)

`힙 (Heap)`은 `완전 이진 트리`의 일종으로, 최댓값 또는 최솟값을 빠르게 찾는 연산을 <br>

하기 위해 고안된 자료구조이다. 각 노드가 따르는 규칙에 따라 다음의 두 가지로 나눌 수 있다. <br>

- `최대 힙 (Max Heap)` : 부모 노드의 값이 자식 노드의 값보다 항상 크거나 같다.

- `최소 힙 (Min Heap)` : 부모 노드의 값이 자식 노드의 값보다 항상 작거나 같다.

힙은 `완전 이진 트리` 형태이므로, 마지막 레벨을 제외한 모든 레벨이 완전히 채워져 있으며, <br>

마지막 레벨의 노드도 왼쪽부터 채워지는 형태이다. 키 값의 대소관계는 `부모-자식` 관계에서만 <br>

성립하며, `형제` 관계에서는 성립하지 않는다. <br><br>

힙에서는 가장 높거나 가장 낮은 우선순위를 가지는 노드가 항상 루트 노드에 위치하는 특징을 <br>

가지고 있으며, `우선순위 큐`를 구현하는 데 사용된다.

<center><img src="https://github.com/user-attachments/assets/bcdd7da0-198e-482c-b201-c4868579f245" width="500"></center>

<center><img src="https://github.com/user-attachments/assets/b294d8db-4a59-42b4-a332-11c2680922ae" width="500"></center>

<br>

## 💡 구현

힙은 주로 `배열`을 사용하여 구현하며, 배열의 인덱스를 통해 부모-자식 간의 관계를 나타낸다. <br>

부모 노드의 인덱스가 `i`라고 할 때, 자식 노드의 인덱스는 왼쪽 자식부터 `2 * i`, `2 * i + 1`이다. <br>

( 완전 이진 트리의 형태이기 때문에 인덱스가 2배가 됨을 확인할 수 있다. ) <br>

또한 `i`의 부모 노드의 인덱스는 `i / 2`이다.

<br>

### 🧩 최소 힙

임의로 힙의 최대 크기를 정하고, 힙의 원소의 개수를 `cnt` 변수로 선언했다. <br>

`heapifyUp` 함수는 최소힙의 조건을 유지시키기 위해 부모와 비교하여 원소가 올바른 위치로 가도록 <br>

하는 함수이다. 그와 비슷하게, `heapifyDown` 함수는 해당 원소의 왼쪽, 오른쪽 자식과 비교하여 <br>

위치를 바꿔주는 함수이다. 두 함수는 `push`, `pop` 함수를 구현하기 위한 보조 함수로 사용된다.

```c++
const int MAX_SIZE = 1000;

class MinHeap {
private:
    int heap[MAX_SIZE + 1];
    int cnt;

    int parent(int i) { return i / 2; } // 인덱스 1부터
    int leftChild(int i) { return 2 * i; }
    int rightChild(int i) { return 2 * i + 1; }

    void heapifyUp(int i);   // 힙 유지를 위한 함수
    void heapifyDown(int i); // 힙 유지를 위한 함수

public:
    MinHeap();
    void push(int val);
    int top();
    void pop();
};

MinHeap::MinHeap() : cnt(0) {}

// heapifyUp 함수 정의
void MinHeap::heapifyUp(int i) {
    while (i > 1 && heap[parent(i)] > heap[i]) {
        swap(heap[i], heap[parent(i)]);
        i = parent(i);
    }
}

// heapifyDown 함수 정의
void MinHeap::heapifyDown(int i) {
    int smallest = i;
    int l = leftChild(i);
    int r = rightChild(i);

    if (l <= cnt && heap[l] < heap[smallest]) {
        smallest = l;
    }
    if (r <= cnt && heap[r] < heap[smallest]) {
        smallest = r;
    }
    if (smallest != i) {
        swap(heap[i], heap[smallest]);
        heapifyDown(smallest);
    }
}
```

<br>

### 🧩 push

트리의 `가장 끝에 원소를 삽입`하고, 추가한 원소와 해당 원소의 부모 노드의 크기를 비교하여 순서를 <br>

바꿔가며 위치를 찾는 방식으로 동작한다. 순서를 바꾸는 로직은 `heapifyUp` 함수를 사용한다.

```c++
void MinHeap::push(int val) {
    cnt++;
    heap[cnt] = val;
    heapifyUp(cnt);
}
```

<br>

### 🧩 top

`top` 함수는 최소힙일 경우 최소값을, 최대힙일 경우 최대값을 리턴하는 함수이다. <br>

단순하게 힙의 루트값을 리턴하면 된다.

```c++
int MinHeap::top() {
    return heap[1];
}
```

<br>

### 🧩 pop

최소힙일 경우 최소값을, 최대힙일 경우 최대값을 제거하는 `pop` 함수이다. <br>

가장 마지막 원소와 루트값을 바꾸고, 제거한 뒤, 힙의 조건을 만족하도록 부모 노드와 크기를 비교하며 <br>

위치를 바꿔주는 방식으로 동작한다. 순서를 바꾸는 로직은 `heapifyDown` 함수를 사용한다.

```c++
// pop 함수 정의
void MinHeap::pop() {
    heap[1] = heap[cnt];
    cnt--;
    heapifyDown(1);
}
```

<br>

### 🧩 전체 코드

```c++
#include <iostream>
using namespace std;

const int MAX_SIZE = 1000;

class MinHeap {
private:
    int heap[MAX_SIZE + 1];
    int cnt;

    int parent(int i) { return i / 2; } // 인덱스 1부터
    int leftChild(int i) { return 2 * i; }
    int rightChild(int i) { return 2 * i + 1; }

    void heapifyUp(int i);   // 힙 유지를 위한 함수
    void heapifyDown(int i); // 힙 유지를 위한 함수

public:
    MinHeap();
    void push(int val);
    int top();
    void pop();
};

MinHeap::MinHeap() : cnt(0) {}

void MinHeap::heapifyUp(int i) {
    while (i > 1 && heap[parent(i)] > heap[i]) {
        swap(heap[i], heap[parent(i)]);
        i = parent(i);
    }
}

void MinHeap::heapifyDown(int i) {
    int smallest = i;
    int l = leftChild(i);
    int r = rightChild(i);

    if (l <= cnt && heap[l] < heap[smallest]) {
        smallest = l;
    }
    if (r <= cnt && heap[r] < heap[smallest]) {
        smallest = r;
    }
    if (smallest != i) {
        swap(heap[i], heap[smallest]);
        heapifyDown(smallest);
    }
}

void MinHeap::push(int val) {
    cnt++;
    heap[cnt] = val;
    heapifyUp(cnt);
}

int MinHeap::top() {
    return heap[1];
}

void MinHeap::pop() {
    heap[1] = heap[cnt];
    cnt--;
    heapifyDown(1);
}

int main() {
    MinHeap heap;

    heap.push(10);
    heap.push(20);
    heap.push(5);
    heap.push(30);
    heap.push(15);

    cout << "Min value: " << heap.top() << endl; // 5

    heap.pop();
    cout << "New min value after pop: " << heap.top() << endl; // 10

    return 0;
}
```

