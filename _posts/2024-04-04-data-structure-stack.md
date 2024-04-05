---
title: "스택 (Stack)"
excerpt: "[C++]자료구조 - 스택"

categories:
  - Data Structure
tags:
  - [Data Structure]

permalink: /data-structure/stack/

toc: true
toc_sticky: true

date: 2024-04-04
last_modified_at: 2024-04-05
published: true
---


# 👑 스택(Stack)이란?

`Stack`이란 한쪽 끝에서만 데이터를 넣고 뺄 수 있는 `LIFO(Last In First Out)` 형태의 선형 자료구조이다. <br>

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/3a03839f-0d9c-419c-b0f4-a69849b34bdf" width="400" height="300"></center>

<br>

## 💡 스택의 성질

* 원소의 추가/제거가 모두 `O(1)` 시간에 이루어진다. <br>

    스택의 상단에서만 데이터를 추가/제거할 수 있지만, **상수 시간** 안에 처리할 수 있다.

* 상단이 아닌 나머지 데이터들의 접근/변경이 불가능하다. <br>

<br>

## 💡 스택의 중요 연산

* `push()` : 스택의 상단에 데이터를 추가 <br>

* `pop()` : 스택의 상단에서 데이터 삭제 후 반환 <br>

* `top()` : 스택 상단의 데이터 반환 <br>

<br>

## 💡 스택의 활용

* 수식의 괄호 쌍 검사

* 전위/중위/후위 표기법

* 실행취소(undo)

* 함수 호출