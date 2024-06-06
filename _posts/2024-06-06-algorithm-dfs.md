---
title: "DFS 알고리즘"
excerpt: "[C++]DFS : Depth-First Search"

categories:
  - Algorithm
tags:
  - [algorithm]

permalink: /algorithm/algorithm-dfs/

toc: true
toc_sticky: true

date: 2024-06-06
last_modified_at: 2024-06-06
---

# 👑 DFS (Depth First Search)

`깊이 우선 탐색(DFS)` 이란 맹목적 탐색 방법의 하나로 `백트래킹`에 사용되는 대표적인 <br>

탐색 알고리즘이다. 특정 노드에서 시작해서 다음 분기로 넘어가기 전 완벽하게 탐색한 후 <br>

다음 분기로 넘어가는 방식이다. 일반적으로 `재귀호출`이나 `스택`으로 구현한다. <br>

단순 검색 속도는 `BFS`에 비해 느리지만 구현이 간단하다는 장점이 있다.

<br>

# 💡 DFS 과정

- 한 루트로 탐색을 시작하면 최대한 깊숙이 탐색한다.

- `넓게` 탐색하는 `BFS`와는 다르게 `깊게` 탐색한다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/90383424-da5e-45bc-aba9-6f5567ee6511" width="500"></center>

<br>

# 🧩 구현 (C++)

- **재귀 사용**

```c++
/* 재귀 사용 */

DFS (graph, start)
    visited[start] = true

    for each v ∈ graph.Adj[start]
        if visited[v] == false
            DFS(graph, v) 

/* 시작 노드 start를 방문상태로 놓고 start의 인접 노드 v들에 대해 각각
   방문 여부를 확인하고, 방문하지 않았다면 각각에 대해 DFS를 실행한다. */
```

- **스택 사용**

```c++
/* 스택 사용 */

DFS (graph, start)
    visited[start] = true
    stack.push(start)

    while (stack is not empty)
        v = stack.pop()

        if visited[v] == false
            visited[v] = true
            for each w ∈ graph.Adj[v]
                if (not visited)
                    stack.push(w)

/* 시작 노드를 스택에 넣고 스택이 빌 때까지 pop하며 실행한다.
   먼저 스택에서 꺼낸 후 방문 여부를 확인하고, 각각의 인접 노드들에 대해
   방문한 노드가 아니라면 스택에 넣는다. */
```






