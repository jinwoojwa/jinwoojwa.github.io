---
title: "큐 (Queue)"
excerpt: "[C++]자료구조 - 큐"

categories:
  - 자료구조
tags:
  - [Data Structure]

permalink: /data-structure/queue/

toc: true
toc_sticky: true

date: 2024-05-05
last_modified_at: 2024-05-05
published: true
---

# 👑 큐(Queue)란?

한쪽 끝에서 원소를 넣고 반대쪽 끝에서 원소를 뺄 수 있는 자료구조이다. <br>

먼저 넣은 원소가 먼저 나오는 `FIFO(First In First Out)` 구조이며, 먼저 들어간 원소가 나중에 <br>

나오는 스택과는 반대되는 개념의 자료구조이다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/bfe92b98-a577-44d5-adf6-226b9f336329"></center>

<br>

## 💡 큐의 성질

- 원소의 추가/제거가 `O(1)` 시간이 걸린다.

- `rear`, `front` 의 원소 확인에 `O(1)` 시간이 걸린다.

- `rear`, `front` 가 아닌 중간 원소들에 접근/갱신이 원칙적으로 불가능

<br>

## 💡 구현 [C++]

큐는 배열과 연결 리스트 둘 다로 구현할 수 있는데, 여기서는 배열로 구현하였다. <br>

또한 큐를 구현할 때, 선형 큐와 원형 큐로 나눌 수 있는데, 다음은 선형 큐를 구현한 것이다. <br>

```c++
#include <iostream>

using namespace std;

const int QUEUE_SIZE = 10;
int queue[QUEUE_SIZE];
int head = 0, tail = 0;

void push(int x) {
  queue[tail++] = x;
}

void pop() {
  head++;
}

int front() {
  return queue[head];
}

int back() {
  return queue[tail - 1];
}
```
