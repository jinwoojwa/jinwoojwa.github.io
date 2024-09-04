---
title: "연결 리스트 (Linked List)"
excerpt: "[C++]자료구조 - 연결 리스트"

categories:
  - 자료구조
tags:
  - [Data Structure]

permalink: /data-structure/linked-list/

toc: true
toc_sticky: true

date: 2024-03-28
last_modified_at: 2024-03-28
published: true
---


# 👑 연결 리스트(Linked List)란?

`Linked List`는 각 노드가 데이터와 포인터를 가지고 연결되어 있는 방식으로 데이터를 저장하는 자료구조이다. <br>

연결 리스트는 `노드(node)`로 이루어져 있는데, 노드는 데이터와 다음 노드를 가리키는 주소를 담고 있다. <br>

연결 리스트의 종류에는 `단일 연결 리스트(Singly Linked List)`, `이중 연결 리스트(Doubly Linked List)`, `원형 연결 리스트(Circular Linked List)` 가 있다. <br>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/fcfe7a43-6414-4cb0-88f6-1572962aa292" width="500" height="400"></center>



## 💡 연결 리스트의 성질

* 특정 위치의 데이터를 검색하는 데 `O(n)` 시간이 걸린다. <br>

    메모리 공간에 연속하게 데이터가 존재하는 배열과는 다르게, 연결 리스트는 메모리 상에 데이터가 연속해서 위치하지 않는다. <br>

* 임의의 위치에 원소의 추가/삭제가 `O(1)` 시간에 가능하다. <br>

    추가/삭제하려는 노드의 **주소를 알고 있을 경우** `O(1)` 시간에 가능하고, 그 경우가 아니라면 탐색의 과정을 거쳐야 하기에 `O(1)` 시간이 걸린다고 할 수 없다.

* 추가적인 메모리 공간이 필요하다. <br>

    각 노드가 다음 노드, 혹은 이전 노드의 주소값을 가지고 있어야 하기에, 추가적인 메모리 공간이 필요하다. <br>


## 💡 연결 리스트 VS 배열

배열과 연결 리스트는 둘 다 선형 자료구조이지만, 장단점이 분명해 적절히 사용되어야 한다. <br>


||Linked List|Array|
|---|---|---|
|n번째 원소에 접근|O(n)|O(1)|
|임의 위치에 원소 삽입/삭제|O(1)|O(N)|
|메모리 사용 <br> (Overhead)|O|X|