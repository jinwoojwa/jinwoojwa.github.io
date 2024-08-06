---
title: "그래프 (Graph)"
excerpt: "[C++]자료구조 - graph"

categories:
  - Data Structure
tags:
  - [Data Structure]

permalink: /data-structure/graph/

toc: true
toc_sticky: true
use_math: true

date: 2024-08-06
last_modified_at: 2024-08-06
published: true
---

# 👑 그래프 (Graph)

`그래프`는 `노드(node)`와 `간선(edge)`으로 이루어진 자료구조이다.그래프의 간선에는 <br>

방향성이 있을 수도, 없을 수도 있으며, 간선에 방향이 없는 그래프를 `무방향 그래프(Undirected Graph)`, <br>

간선에 방향이 있는 그래프를 `방향 그래프(Directed Graph)`라고 한다. 그래프는 여러 문제를 <br>

모델링하고 해결하는 데 유용하며, 특히 네트워크, 경로 탐색 등에서 많이 사용된다.

<center><img src="https://github.com/user-attachments/assets/1c09ef03-fd00-432f-ad5b-eafd42f95ff8"></center>

<br>

## 💡 주요 용어

- `노드(node) = 정점(vertex)`

<br>

- `간선(edge)`

    + 두 노드를 연결하는 선으로, 가중치가 존재할 수도 있다.

<center><img src="https://github.com/user-attachments/assets/2136c413-5da3-4711-a46a-4fffb640b540" width="400"></center>

<br>

- `차수(degree)`

    + 각 정점에 대해 인접한 정점의 개수

    + `진입차수(in-degree)` : 어떤 노드로 들어오는 간선의 개수

    + `진출차수(out-degree)` : 어떤 노드에서 나가는 간선의 개수

<br>

- `사이클(cycle)`

    + 그래프의 임의의 한 점에서 출발하여 자기 자신으로 돌아오는 경로를 의미한다.

    + 사이클 경로는 각 간선을 한번만 지나야 하며, 노드가 중복되지 않아야 한다. (시작 노드 제외)

    + 그래프에 사이클이 존재하면 `순환 그래프(Cyclic graph)`, 하나도 없으면 `비순환 그래프(Acyclic graph)`라 한다.

<center><img src="https://github.com/user-attachments/assets/8cb06259-6af6-4ee5-9d7f-665e556f6356"></center>

<br>

- `완전 그래프(Complete Graph)`

    + 그래프의 모든 노드가 서로 직접 연결된 그래프

- `연결 그래프(Connected Graph)`

    + 임의의 두 노드 사이에 항상 경로가 존재하는 그래프

<center><img src="https://github.com/user-attachments/assets/ba7b434c-d0a4-4cf7-a6e2-1d2f406f5531"></center>

<br>

- `단순 그래프(Simple Graph)`

    + 두 노드를 연결하는 간선이 최대 하나이며, 루프가 없는 그래프

<br>

## 💡 그래프의 표현 방법

<br>

### ✔ 인접 행렬 (Adjacency Matrix)

- 그래프를 2차원 배열로 표현하는 방법이다.

- 노드가 `N`개일 때, $ N \times N $ 행렬을 사용하며, 공간 복잡도는 $ O(N^2) $ 이다.

<center><img src="https://github.com/user-attachments/assets/20aeb0a2-d3a7-4dff-833f-fdfa088df5ce"></center>

```c++
// 무방향 그래프
int adj_matrix[6][6] = {};

adj_matrix[1][2] = 1;   adj_matrix[1][3] = 1;
adj_matrix[2][1] = 1;   adj_matrix[3][1] = 1;

adj_matrix[1][4] = 1;   adj_matrix[2][5] = 1;
adj_matrix[4][1] = 1;   adj_matrix[5][2] = 1;

adj_matrix[3][4] = 1;   adj_matrix[4][5] = 1;
adj_matrix[4][3] = 1;   adj_matrix[5][4] = 1;


// 방향 그래프
int adj_matrix[6][6] = {};

adj_matrix[1][2] = 1;     adj_matrix[1][3] = 1;
adj_matrix[1][4] = 1;     adj_matrix[3][4] = 1;
adj_matrix[4][5] = 1;     adj_matrix[5][2] = 1;
```

<br>

### ✔ 인접 리스트 (Adjacency List)

- 그래프를 노드의 리스트로 표현하는 방법이다.

- 각 노드는 연결된 노드들의 리스트를 가지며, 공간 복잡도는 $ O(N + E) $ 이다.

<center><img src="https://github.com/user-attachments/assets/90db613a-3633-4a6a-a604-c8e4c01af417"></center>

```c++
// 무방향 그래프
vector<int> adj[6];

adj[1].push_back(2);
adj[1].push_back(3);
adj[1].push_back(4);

adj[2].push_back(1);
adj[2].push_back(5);

adj[3].push_back(1);
adj[3].push_back(4);

adj[4].push_back(1);
adj[4].push_back(5);

adj[5].push_back(2);
adj[5].push_back(4);

// 방향 그래프
vector<int> adj[6];

adj[1].push_back(2);
adj[1].push_back(3);
adj[1].push_back(4);

adj[3].push_back(4);

adj[4].push_back(5);

adj[5].push_back(2);
```

<br>

## 💡 그래프의 탐색

그래프 내의 노드들을 방문하는 방법으로, 주요 탐색 알고리즘에는 `BFS`, `DFS`가 존재한다. <br>

- `DFS`

    + 깊이 우선 탐색, 스택을 사용하거나 재귀적으로 구현한다.

    + 한 노드에서 출발하여 다음 분기로 넘어가기 전 해당 분기를 완벽하게 탐색하는 방법이다.

    + $ O(N + E) $ 의 시간 복잡도를 가진다.

- `BFS`

    + 너비 우선 탐색, 큐를 사용하여 구현한다.

    + 시작 노드에서 가까운 노드부터 차례대로 탐색한다.

    + $ O(N + E) $ 의 시간 복잡도를 가진다.

<br>

## 💡 관련 주요 알고리즘

- `최단 경로 알고리즘`

    + 다익스트라(Dijkstra), 벨만-포드(Bellman-Ford), 플로이드-워셜(Floyd-Warshall) 등

- `최소 신장 트리(MST) 알고리즘`

    + 크루스칼(Kruskal), 프림(Prim)

- `사이클 탐지`

    + DFS 기반 탐색

