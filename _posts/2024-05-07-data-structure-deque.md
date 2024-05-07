---
title: "덱 (Deque)"
excerpt: "[C++]자료구조 - 덱"

categories:
  - Data Structure
tags:
  - [Data Structure]

permalink: /data-structure/deque/

toc: true
toc_sticky: true

date: 2024-05-07
last_modified_at: 2024-05-07
published: true
---

# 👑 덱(Deque)이란?

`Deque (Double Ended Queue)` 은 양쪽 끝에서 삽입/삭제가 모두 가능한 자료 구조이다. <br>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/1cd13574-f6a7-4de3-b332-8df1096555df"></center>

<br>

## 💡 덱의 성질

- 원소의 추가/제거가 `O(1)` 시간이 걸린다.

- `rear`, `front` 의 원소 확인에 `O(1)` 시간이 걸린다.

- 앞/뒤가 아닌 원소들의 확인이 원칙적으로 불가능하다.

  + C++ STL의 deque 에서는 인덱스로 원소에 접근이 가능하다.





