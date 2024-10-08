---
title: "배열 (Array)"
excerpt: "[C++]자료구조 - 배열"

categories:
  - 자료구조
tags:
  - [Data Structure]

permalink: /data-structure/array/

toc: true
toc_sticky: true

date: 2024-03-16
last_modified_at: 2024-03-16
published: true
---


# 👑 배열이란?

배열은 메모리 상에 원소를 연속하도록 배치한 자료구조이다. <br>

동일한 타입의 데이터를 저장할 수 있으며, 선언할 때 길이를 정하면 그 후 길이를 변경하는 것이 일반적으로 불가능하다. <br>

배열의 각각의 값들을 `element`라 하고, 배열에서 각각의 `element`들의 위치를 `index`라 한다. <br>

```c++
int array[5] = {0, 1, 2, 3, 4};

char array2[3] = {'a', 'b', 'c'};

int array3[2];
// 위와 같이 선언시에는 전역변수이면 0으로 초기화되고, 지역변수이면 임의의 값으로 할당된다.
// 즉, 지역 변수로 배열 선언시에는 반드시 초기화를 해주어야 한다.
```

<br>

## 💡 배열의 성질

* O(1) 시간에 `i` 번째 원소를 확인 및 변경이 가능하다. <br>

    배열은 메모리 상에 원소를 순차적으로 배치한 자료구조이기 때문에 `k`번째 위치의 원소를 바로 계산 가능하다. <br>

* 임의의 인덱스에 원소를 삽입/삭제하는 데 O(N) 시간이 걸린다. <br>

    배열에서 임의의 위치에 삽입/삭제를 하려면 기존의 데이터들을 한 칸씩 `shift` 해줘야 하기 때문에 O(N)의 시간이 소요된다. <br>

* 메모리 상에 순차적으로 데이터를 할당해야 하므로, 배열의 크기가 매우 클 경우 할당이 불가능할 수 있다. <br>

* 추가적으로 발생하는 메모리 양이 거의 없다. <br>

    배열을 사용하는 경우 배열의 크기를 지정하고, 해당 크기에 따라 메모리가 할당되므로, 추가적인 메모리 소모가 거의 발생하지 않는다. <br>

<br>

## 💡 배열이 사용되면 좋은 경우

* 데이터를 순차적으로 저장하는 경우

* 데이터에 빠르게 접근해야 할 경우

* 다차원 데이터를 다뤄야 할 경우

* 데이터 크기가 자주 바뀌지 않고, 요소의 삽입/삭제가 적은 경우









