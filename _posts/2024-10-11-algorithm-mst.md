---
title: "최소 신장 트리 (Minimum Spanning Tree)"
excerpt: "[C++]Minimum Spanning Tree"

categories:
  - 알고리즘
tags:
  - [algorithm]

permalink: /algorithm/algorithm-mst/

toc: true
toc_sticky: true
use_math: true

date: 2024-10-11
last_modified_at: 2024-10-14
---

# 👑 신장 트리 (Spanning Tree)

`신장 트리`란 `연결 그래프(Connected Graph)`에서 모든 정점을 포함하면서, 사이클이 없는 <br>

트리를 말한다. 다시 말해, 그래프 내의 모든 정점을 포함하지만, 최소한의 간선만을 사용하여 <br>

그래프를 구성하는 트리이다. 하나의 그래프에는 여러 가지 신장 트리가 존재할 수 있다.

<center><img src="https://github.com/user-attachments/assets/ee73172f-a15f-4008-a773-e25ce68808fa"></center>

<br>

# 👑 최소 신장 트리 (Minimum Spanning Tree)

`최소 신장 트리 (Minimum Spanning Tree, MST)`는 주어진 그래프에서 모든 정점을 연결하는 트리 <br>

중에서, 간선의 가중치 합이 최소가 되는 트리이다. `MST`는 네트워크 설계, 클러스터링, 지도 제작 등의 <br>

다양한 분야에서 활용된다. <br><br>

**최소 신장 트리의 특징**

- **사이클이 없음**

    + 트리는 본래 사이클을 포함하지 않으므로, `MST` 또한 사이클을 포함하지 않는다.

- **연결성**

    + `MST`는 주어진 그래프에서 모든 정점을 연결해야 한다.

- **최소 가중치**

    + 가능한 모든 `신장 트리` 중에서 간선들의 가중치 합이 가장 작은 것을 말한다.

<br>

<center><img src="https://github.com/user-attachments/assets/cff6fe81-f1e3-41af-83cb-ef6f305c94e5"></center>

위의 그림에서 `최소 신장 트리`는 간선의 합이 10인 신장 트리이다. 위 그림 외에도 여러 개의 신장 트리가 <br>

존재할 수 있지만, 그들 중에서 최소 신장 트리는 간선의 합이 최소인 10이 되어야 한다. 또한, 간선의 <br>

가중치가 동일한 간선이 존재할 수 있으며, 최소 신장 트리는 `한 그래프에서 하나만 존재하는 것이 아닌` <br>

여러 개가 있을 수 있다.

<br>

`최소 신장 트리`를 구하는 대표적인 알고리즘으로는 `크루스칼 알고리즘 (Kruskal's Algorithm)`과 <br>

`프림 알고리즘 (Prim's Algorithm)` 이 있다. 







