---
title: "최소 신장 트리 (Minimum Spanning Tree)"
excerpt: "Kruskal’s algorithm & Prim’s Algorithm"

categories:
  - 알고리즘
tags:
  - [algorithm]

permalink: /algorithm/algorithm-mst/

toc: true
toc_sticky: true
use_math: true

date: 2024-10-29
last_modified_at: 2024-10-30
---

# 👑 신장 트리 (Spanning Tree)

`신장 트리`란 `연결 그래프(Connected Graph)`에서 모든 정점을 포함하면서, 사이클이 없는 <br>

트리를 말한다. 다시 말해, 그래프 내의 모든 정점을 포함하지만, 최소한의 간선만을 사용하여 <br>

그래프를 구성하는 트리이다. 하나의 그래프에는 여러 가지 신장 트리가 존재할 수 있다.

<center><img src="https://github.com/user-attachments/assets/ee73172f-a15f-4008-a773-e25ce68808fa"></center>

<br><br>

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

<br><br>

# 👑 크루스칼 알고리즘 (Kruskal’s algorithm)

크루스칼 알고리즘은 가중치 그래프가 주어졌을 때, **MST**를 찾기 위한 **그리디 알고리즘** 중 하나로 <br>

MST를 구하기 위해 간선을 오름차순으로 정렬하고, 트리 구조를 유지하며 간선을 선택해 나간다. <br>

크루스칼 알고리즘은 **Disjoint Set** 자료구조를 사용해 사이클 유무를 효율적으로 검사하는 것이 특징이다.

<br>

크루스칼 알고리즘은 다음과 같이 동작한다.

1. 모든 간선들의 가중치를 오름차순으로 정렬한다.

2. 가중치가 가장 작은 간선부터 순서대로 선택한다.

3. 간선을 선택할 때 사이클이 형성되지 않도록 검사한다.

4. 트리의 간선 개수가 `노드 개수 - 1`개가 될 때까지 반복한다.

<br><br>

## 💡 동작 과정

<center><img src="https://github.com/user-attachments/assets/c09d61ab-2fb2-4d6d-be69-f284ce051b5c" width="500"></center>

위 그래프는 7개의 정점과 9개의 간선들을 가지고 있으며, **MST**는 `7-1 = 6`개의 간선들을 가져야 한다. <br>

먼저 간선들을 오름차순 정렬하면: <br>

<center><img src="https://github.com/user-attachments/assets/d5e6002f-826f-477b-a37f-24adecf812ce" width="200"></center>

이제 정렬된 간선들을 순서대록 선택하여, 현재 MST에 추가해도 사이클이 생기지 않는지를 확인한다.

- 사이클이 발생 O: 해당 간선 건너뜀

- 사이클이 발생 X: 해당 간선 MST에 추가

<br>

**Step 1**

간선 `0-1`을 선택, 사이클이 형성되지 않으므로 MST에 추가

<center><img src="https://github.com/user-attachments/assets/04c792e7-d7cf-4be4-85c3-e85bd5957a41" width="200"></center>

<br>

**Step 2**

간선 `1-6`을 선택, 사이클이 형성되지 않으므로 MST에 추가

<center><img src="https://github.com/user-attachments/assets/dc875cdc-afa7-48ca-aba2-9540099173db" width="250"></center>

<br>

**Step 3**

간선 `0-5`을 선택, 사이클이 형성되지 않으므로 MST에 추가

<center><img src="https://github.com/user-attachments/assets/6fdbf1dc-8b9c-45e7-9d9e-93c663ba25d3" width="250"></center>

<br>

**Step 4**

간선 `5-4`을 선택, 사이클이 형성되지 않으므로 MST에 추가

<center><img src="https://github.com/user-attachments/assets/6aa55e7e-4ec4-40a4-989f-cbb2bbc714c7" width="300"></center>

<br>

**Step 5**

간선 `2-4`을 선택, 사이클이 형성되지 않으므로 MST에 추가

<center><img src="https://github.com/user-attachments/assets/19315dc4-4da0-4322-8003-46ce25a4e0a0" width="300"></center>

<br>

**Step 6**

간선 `5-6`을 선택, 사이클이 형성되므로, 간선을 추가하지 않고 건너뛴다.

<center><img src="https://github.com/user-attachments/assets/15f6c1fd-c2b7-41c6-9bd8-555665a2b2be" width="300"></center>

<br>

**Step 7**

간선 `6-3`을 선택, 사이클이 형성되지 않으므로 MST에 추가 <br>

MST의 간선의 개수가 `노드 개수 - 1 = 6`개가 되었으므로, 알고리즘을 종료한다.

<center><img src="https://github.com/user-attachments/assets/491e668e-e98d-4bb0-bb0f-8380abd5a01a" width="400"></center>

<br><br>

## 💡 구현[C++, Java]

<script src="https://gist.github.com/jinwoojwa/e45050098edd90c07cbd468bfced1794.js"></script>

<br>

<script src="https://gist.github.com/jinwoojwa/6438058e191dd8a5493e8593bce8338f.js"></script>

<br><br>

# 👑 프림 알고리즘 (Prim's algorithm)

**프림(Prim) 알고리즘은** MST를 찾는 방법 중 하나로, 가중치가 있는 연결 그래프에서 모든 정점을 <br>

포함하면서 가중치의 합이 최소가 되는 트리를 만드는 방법이다. 크루스칼 알고리즘이 간선을 중심으로 <br>

MST를 만드는 반면, 프림 알고리즘은 정점을 중심으로 MST를 확장해 나간다.

<br>

프림 알고리즘은 다음과 같이 동작한다.

1. 임의의 정점을 선택하여 MST에 추가하고 시작한다.

2. 현재 MST에 포함된 정점에서 인접한 정점 중 **가장 작은 가중치**를 가진 간선을 선택한다.

3. 선택한 간선에 연결된 새로운 정점을 MST에 추가한다.

4. 모든 정점이 MST에 포함될 때까지 2~3 단계를 반복한다.

이 과정에서, 이미 MST에 포함된 정점 집합과 아직 포함되지 않은 정점 집합 간의 최소 가중치 간선을 <br>

선택하는 방식으로 트리를 확장해 나간다.

<br><br>

## 💡 동작 과정

<center><img src="https://github.com/user-attachments/assets/c09d61ab-2fb2-4d6d-be69-f284ce051b5c" width="500"></center>

위 그래프에서 `프림 알고리즘`을 통해 MST를 구하는 과정은 다음과 같다.

<br>

**Step 1**

임의의 점을 선택하여 시작한다. (정점 0을 선택)

<center><img src="https://github.com/user-attachments/assets/9c1769e4-af15-4e7d-97aa-ac60b2c87235" width="500"></center>

<br>

**Step 2**

현재 MST에 포함된 정점(0)에서 인접한 간선 `0-1`, `0-5` 중 가중치가 가장 작은 `0-1`을 선택하고, <br>

간선과 정점 `1`을 MST에 포함한다.

<center><img src="https://github.com/user-attachments/assets/bd525627-f9d2-432c-b8d8-b5c405b29cc2" width="500"></center>

<br>

**Step 3**

현재 MST에 포함된 정점(0, 1)에서 인접한 간선 `0-5`, `1-6`, `1-2` 중 가중치가 가장 작은 `1-6`을 <br>

선택하고, 간선과 정점 `6`을 MST에 포함한다.

<center><img src="https://github.com/user-attachments/assets/5fc63e13-8b1f-4eb9-928c-2fe4ff13309b" width="500"></center>

<br>

**Step 4**

현재 MST에 포함된 정점(0, 1, 6)에서 인접한 간선 `0-5`, `1-2`, `5-6`, `6-3` 중 가중치가 가장 작은 <br>

`0-5`을 선택하고, 간선과 정점 `5`을 MST에 포함한다.

<center><img src="https://github.com/user-attachments/assets/a369bfd5-ceac-4c9a-b6d3-d376bfaba1b0" width="500"></center>

<br>

**Step 5**

현재 MST에 포함된 정점(0, 1, 5, 6)에서 인접한 간선 `5-6`, `1-2`, `6-3`, `5-4` 중 가중치가 가장 작은 <br>

`5-4`을 선택하고, 간선과 정점 `4`을 MST에 포함한다.

<center><img src="https://github.com/user-attachments/assets/9e0e0b46-e7ab-4eca-9a4c-9b20eb400a6c" width="500"></center>

<br>

**Step 6**

현재 MST에 포함된 정점(0, 1, 4, 5, 6)에서 인접한 간선 `1-2`, `6-3`, `4-2`, `4-3` 중 가중치가 가장 작은 <br>

`4-2`을 선택하고, 간선과 정점 `2`을 MST에 포함한다.

<center><img src="https://github.com/user-attachments/assets/0160c52b-1441-4559-9788-ced692deebb0" width="500"></center>

<br>

**Step 7**

현재 MST에 포함된 정점(0, 1, 2, 4, 5, 6)에서 인접한 간선 `6-3`, `4-3` 중 가중치가 가장 작은 <br>

`6-3`을 선택하고, 간선과 정점 `3`을 MST에 포함한다.

<center><img src="https://github.com/user-attachments/assets/66ff92cd-e03f-4842-97be-c6a029b5c93a" width="500"></center>

<br>

**결과**

<center><img src="https://github.com/user-attachments/assets/caf3ed93-6952-45a0-9398-ff8e32e22036" width="500"></center>

<br><br>

## 💡 구현[C++, Java]

<script src="https://gist.github.com/jinwoojwa/c43fd0ca2416dab0b77ff61ce10fec92.js"></script>

<br>

<script src="https://gist.github.com/jinwoojwa/8053499103894e225c1514288fe3c07f.js"></script>

