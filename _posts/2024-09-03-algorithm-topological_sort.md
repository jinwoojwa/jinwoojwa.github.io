---
title: "위상 정렬 (Topological Sort)"
excerpt: "[C++]Topological Sort"

categories:
  - Algorithm
tags:
  - [algorithm]

permalink: /algorithm/algorithm-topological-sort/

toc: true
toc_sticky: true
use_math: true

date: 2024-09-03
last_modified_at: 2024-09-03
---

# 👑 위상 정렬 (Topological Sort)

`위상 정렬`이란 `방향 비순환 그래프(DAG)`에서 모든 간선 $ u → v $ 에 대해 정점 $ u $ 가 정점 $ v $ 보다 <br>

먼저 오도록 정점들을 일렬로 나열하는 것을 말한다. 즉, `사이클이 없는`, `방향 그래프`에서 간선의 방향을 <br>

거스르지 않도록 정점들을 정렬하는 것을 의미한다. <br><br>

먼저 `방향 비순환 그래프(DAG = Directed Acyclic Graph)`란 이름 그대로 `방향 그래프`이면서 <br>

`순환하지 않는` 즉, `사이클이 없는` 그래프이다.

<center><img src="https://github.com/user-attachments/assets/ada2045f-a22a-4d74-9345-afc9e0d85b15" width="400"></center>

위상정렬의 예시로 가장 많이 사용되는 것으로 `선수과목`을 들 수 있다. <br>

아래와 같이 `컴파일러`, `운영체제`, `컴퓨터 구조`의 3가지 과목이 있다고 가정하자.

<center><img src="https://github.com/user-attachments/assets/f411ed2f-06bb-421d-9bf1-ef52065eeb24" width="400"></center>

`컴파일러` 과목을 수강하기 위해서는 `운영체제` 과목을 수강해야 하며, `운영체제` 과목을 수강하기 위해서는 <br>

`컴퓨터 구조` 과목을 수강해야 한다. 앞의 두 과목을 수강하지 않고 `컴파일러` 과목을 수강하지 못하는 것처럼 <br>

위상정렬에서는 `사이클이 없으며`, `방향성을 거스르지 않는 것`이 필수적이다.

<br>

## 💡 위상정렬 알고리즘의 동작 과정

위상정렬을 구현하기 위해서는 먼저 제일 앞에 올 수 있는 원소의 조건을 살펴보아야 한다. 위의 예시에서 <br>

`컴퓨터 구조` 과목이 첫 원소가 될 수 있었던 이유는 `다른 선수과목이 없었기 때문`이다. 이는 자신에게로 <br>

들어오는 간선, 즉, 진입차수가 0인 정점이었기 때문에 가능했다고 볼 수 있다. <br><br>

위상정렬을 수행하는 대표적인 알고리즘은 다음과 같다. <br>

    1. 그래프의 각 정점에 대한 진입 차수(in-degree)를 계산한다.
    2. in-degree == 0인 정점들을 모두 큐에 넣는다.
    3. 큐에서 정점을 하나씩 꺼내어 정렬한다.
        - 해당 정점과 연결된 간선을 제거하고, 그에 따른 인접 정점들의
          진입 차수를 감소시킨다.

        - 진입 차수가 0이 된 정점들을 큐에 추가한다.
    4. 큐가 빌 때까지 3단계를 반복한다.

만약 모든 정점들이 정렬 결과에 포함된다면, 위상정렬이 성공한 것이며, 그렇지 않다면 그래프에 <br>

`사이클이 존재함`을 의미한다. <br><br>

아래의 예시를 통해 위상정렬의 동작 과정을 이해할 수 있다.

<center><img src="https://github.com/user-attachments/assets/1b53b2e4-e0f9-4b14-b398-09f9edb9e8cc" width="500"></center>

먼저 진입 차수가 0인 `A, E, C, F` 정점을 큐에 넣는다. (네 가지 정점들을 큐에 넣는 순서는 상관 없음)

<center><img src="https://github.com/user-attachments/assets/3af907b9-a80a-44a5-a77e-dcce1638de5f" width="500"></center>

큐에서 정점 `A`를 꺼내며, 연결된 간선을 제거한다. (B의 진입차수는 3에서 2가 된다.)

<center><img src="https://github.com/user-attachments/assets/91093169-f885-4f09-9dbf-795cd55ed8e3" width="500"></center>

위와 같이 정점 `E`를 꺼내어, 간선을 제거한다. (B의 진입차수 = 1)

<center><img src="https://github.com/user-attachments/assets/682755e8-5e93-4e8d-8d8d-8accd67a7eff" width="500"></center>

`C, F`까지 모두 큐에서 제거하고 나면, `D`의 진입차수가 0이 되어, 큐에 추가해준다. <br>

그리고 위의 과정을 반복하면 결과는 다음과 같다.

<center><img src="https://github.com/user-attachments/assets/c129a85c-8dcf-4cbd-9245-2c98c42af040" width="500"></center>

<br>

위의 예시를 통해 볼수 있듯이, 진입 차수가 0인 정점들을 큐에 넣는 순서에 따라 위상 정렬의 <br>

결과는 달라질 수 있다. 또한 만약 그래프에 사이클이 존재한다면, 사이클에 포함된 정점은 절대로 큐에 <br>

들어가지 않는다. 따라서 큐가 모두 비어 알고리즘이 종료되었을 때, 정렬 결과에 그래프의 모든 정점이 <br>

포함되어 있지 않다면, 그래프에 사이클이 있다고 판단할 수 있는 것이다.

<br>

## 💡 위상정렬 알고리즘의 구현

다음과 같이 위상정렬을 `C++`로 간단하게 구현할 수 있다.

```c++
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> topologicalSort(int vertices, vector<int> adj[]) {
    vector<int> indegree(vertices, 0);
    vector<int> result; // 위상 정렬 결과를 저장할 벡터
    queue<int> q;
    
    // 각 노드의 진입 차수를 계산
    for (int i = 0; i < vertices; ++i) {
        for (int j : adj[i]) {
            indegree[j]++;
        }
    }
    
    // 진입 차수가 0인 모든 노드를 큐에 추가
    for (int i = 0; i < vertices; i++) {
        if (indegree[i] == 0) {
            q.push(i);
        }
    }
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);
        
        // 해당 노드와 연결된 모든 노드의 진입 차수를 1 감소
        for (int neighbor : adj[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    
    return result;
}

int main() {
    int vertices = 6;
    vector<int> adj[vertices];

    adj[0].push_back(1);
    adj[0].push_back(3);
    adj[1].push_back(2);
    adj[3].push_back(4);
    adj[5].push_back(4);
    
    vector<int> answer = topologicalSort(vertices, adj);
    
    if (answer.size() != vertices) {
        cout << "Cycle Exists!!\n";
    }
    else {
        for (auto x : answer) cout << x << ' '; // 
    }
    
    return 0;
}
// 결과 : 0 5 1 3 2 4
```

<br>

## 💡 정리

- 위상 정렬은 `DAG`에서 정점들을 간선 방향에 위배되지 않게 나열하는 알고리즘

- 위상 정렬의 결과는 유일하지 않을 수 있다.

- 알고리즘의 시간 복잡도는 $ O(V + E) $ 이다. ( $ V $ 는 정점의 수, $ E $ 는 간선의 수)

- 선후 관계가 주어진 상황에서 순서를 정해야 하는 상황에 해당 알고리즘을 사용할 수 있다.

- 그래프 내의 사이클 유무 확인이 가능하다.