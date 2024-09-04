---
title: "이진 탐색 트리 (Binary Search Tree)"
excerpt: "[C++]자료구조 - BST"

categories:
  - 자료구조
tags:
  - [Data Structure]

permalink: /data-structure/bst/

toc: true
toc_sticky: true
use_math: true

date: 2024-09-04
last_modified_at: 2024-09-04
published: true
---

# 👑 이진 탐색 트리 (Binary Search Tree)

`이진 탐색 트리`는 이진 트리의 특수한 형태로, 왼쪽 서브트리의 모든 값은 부모 노드의 값보다 작고, <br>

오른쪽 서브트리의 모든 값은 부모 노드의 값보다 큰 이진트리이다. 아래의 그림을 보면, 루트 노드인 7의 <br>

왼쪽 서브트리의 값은 모두 7보다 작고, 오른쪽 서브트리의 값은 모두 7보다 큰 것을 볼 수 있다. 또한 <br>

어떠한 노드에 대해 위의 정의를 대입해봐도 성립하는 것을 볼 수 있다.

<center><img src="https://github.com/user-attachments/assets/5f82b95b-54cf-4850-93dd-c5c9a46f44d8"></center>

이진 탐색 트리에서는 `탐색, 삽입, 삭제`를 모두 $ O(log N) $ 시간에 처리할 수 있다. 또한 해시와는 다르게 <br>

**원소가 크기순으로 정렬되어** 있어 관련 연산을 수행하기에 훨씬 수월하다. 또한 이진 탐색 트리를 `중위 순회` <br>

하면, 정렬된 데이터를 얻을 수 있다.

<br>

## 💡 BST에서의 연산의 시간 복잡도

이진 탐색 트리에서의 연산의 시간 복잡도가 $ O(log N) $ 인 이유는 연산이 `트리의 높이에 비례하여 수행되기` <br>

때문이다. 이진 탐색 트리의 이상적인 구성은 `완전 이진 트리`, 또는 `포화 이진 트리`의 모습을 하고 있을 때 <br>

이다. 이 경우 노드의 수를 $ n $ 이라고 할 때, 높이 $ h $ 는  다음과 같이 계산된다. <br>

$ h = log_2(n + 1) - 1 $ <br>

삽입, 삭제, 탐색 등의 연산이 트리의 높이에 비례하여 수행된다고 했으므로, `BST`에서의 연산의 시간 <br>

복잡도는 $ O(log N) $ 가 되는 것이다. <br><br>

<center><img src="https://github.com/user-attachments/assets/87d0c418-e4ab-4a22-aca7-2cc24e89691c"></center>

하지만, 최악의 경우 트리가 한쪽으로 치우친 선형 구조가 될 수 있다. (이미 정렬된 데이터를 삽입하는 경우) <br>

이 때, 트리의 높이 $ h $ 는 노드의 수 $ n $ 에 가까워지고, 시간복잡도가 $ O(N) $ 이 된다. <br>

<center><img src="https://github.com/user-attachments/assets/4c0faef0-5727-4615-871b-c1d51eb53d74" width="350"></center>

따라서, 이진 탐색 트리가 항상 $ O(log N) $ 의 성능을 유지하기 위해서는 트리가 균형 잡혀 있어야 한다. <br><br>

이를 해결하기 위해 AVL 트리나 레드-블랙 트리와 같은 자가 균형 이진 검색 트리가 사용되며, 이들은 삽입 <br>

및 삭제 시 트리의 균형을 유지하여 항상 $ O(log N) $ 의 시간 복잡도를 보장한다.

<br>

## 💡 구현

다음은 `C++`로 구현한 간단한 `이진 탐색 트리`이다. <br><br>

<script src="https://gist.github.com/jinwoojwa/dfcfb941e2c7895b0c27600b9d5c2855.js"></script>





