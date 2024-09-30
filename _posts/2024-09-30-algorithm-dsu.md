---
title: "Union-Find 알고리즘"
excerpt: "[C++]Union-Find (Disjoint Set Union, DSU)"

categories:
  - 알고리즘
tags:
  - [algorithm]

permalink: /algorithm/algorithm-dsu/

toc: true
toc_sticky: true
use_math: true

date: 2024-09-30
last_modified_at: 2024-09-30
---

# 👑 Union-Find 알고리즘

`Union-Find 알고리즘(또는 Disjoint Set Union, DSU)`은 여러 개의 상호 배타적인 집합을 <br>

효율적으로 관리하고, 집합 간의 합치기(Union)와 원소 찾기(Find) 연산을 빠르게 수행할 수 있게 <br> 

하는 알고리즘이다. 주로 그래프에서 사이클 탐지, 최소 신장 트리(MST) 알고리즘(예: 크루스칼 알고리즘) <br>

등에서 많이 사용된다. <br><br>

우선 Union-Find 알고리즘을 이해하기 위해서는 `Disjoint Set`에 대한 개념을 알아야 한다. <br>

`Disjoint Set`은 서로 공통된 원소를 가지고 있지 않은 집합들을 말한다. `Disjoint Set 자료구조`를 <br>

활용하면, 원소들이 같은 집합에 속해있는지 여부를 판별할 수 있다.

<br>

## 💡 Union-Find의 주요 연산

Union-Find 알고리즘은 `Find`와, `Union`의 두 가지 주요 연산으로 구성된다. <br>

우선 각 노드의 부모 노드를 저장할 `parent` 배열을 생성한다.

```c++
class UnionFind() {
private:
    vector<int> parent;

public:
    // n개의 원소를 가짐
    UnionFind(int n) {
        parent.resize(n);
        for (int i = 0; i < n; ++i) {
            parent[i] = i; // 각 원소는 처음에 자기 자신을 가리킴
        }
    }   
}
```

<center><img src="https://github.com/user-attachments/assets/016a4f24-b7f8-41a1-a2f0-12a0f8880d7a" width="500"></center>

- **Find**

    + 주어진 원소가 속한 집합의 `루트 노드`를 찾는다.

    + 초기에 find 연산의 결과는 자기 자신을 가리킬 것이다.

```c++
int find(int x) {
    // x 자신이 루트 노드라면
    if (parent[x] == x) {
        // x 는 이 서로소 집합의 대표(루트)이다.
        return x;
    }
    // x가 이 집합의 루트 노드가 아니므로,
    // 재귀를 통해 부모 노드를 거슬러 올라간다.
    return find(parent[x]);
}
```

<br>

- **Union**

    + 두 개의 집합을 하나의 집합으로 합친다.

```c++
void union(int x, int y) {
    // x를 포함하는 집합의 대표 노드를 찾는다.
    int root_x = find(x);

    // j를 포함하는 집합의 대표 노드를 찾는다.
    int root_y = find(y);

    // 두 집합을 합친다.
    parent[root_y] = root_x;
}
```

<center><img src="https://github.com/user-attachments/assets/8bd30b3e-be93-4b5d-9099-468b6de9d329"></center>

<center><img src="https://github.com/user-attachments/assets/c2d08985-8fb8-4f05-a33c-02af758561ed"></center>

<br>

`union`과 `find` 연산의 성능은 트리의 높이에 의존하므로, 성능을 향상시키기 위해 트리의 <br>

높이를 최소화할 필요가 있다. 하지만 위의 방법으로 `Union`을 할 경우, 트리가 깊어질 수 있어 <br>

`Find` 연산이 최악의 경우 $ O(n) $ 의 시간복잡도로 느려질 수 있다. (일종의 연결리스트처럼 동작할 경우)

<center><img src="https://github.com/user-attachments/assets/caf27ff6-12af-499f-b128-d5cb329bd4fb" width="600"></center>

따라서, 연산의 성능을 높이기 위해 `경로 압축(Path Compression)`과 `Union by Rank`를 사용한다. <br>

<br>

## 💡 개선된 Union-Find

- **경로 압축(Path Compression)**

    + `Find` 연산을 수행할 때, 탐색하는 모든 경로의 노드를 루트 노드와 **직접** 연결하여 <br>
      트리의 깊이를 줄인다.

<center><img src="https://github.com/user-attachments/assets/cdfbd015-483e-40ef-85db-7eec36fdca5d"></center>

<center><img src="https://github.com/user-attachments/assets/93130321-a8cc-43c2-ba12-e3d30726fb69"></center>

<br>

- **Union by Rank**

    + 두 집합을 합칠 때, 더 낮은 랭크(즉, 트리의 깊이가 더 작은 집합)를 더 높은 랭크의 <br>
      집합 아래에 붙여 트리의 깊이가 불필요하게 커지는 것을 방지한다. (rank 배열 사용)

<center><img src="https://github.com/user-attachments/assets/541faea8-a2a0-400c-a393-59397645c784"></center>

<br>

```c++
class UnionFind {
private:
    vector<int> parent;
    vector<int> rank; // 트리의 사이즈(랭크)를 저장하는 배열 (높이나 사이즈 중 선택)

public:
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 1); // 초기 각 트리의 높이를 1로 둔다.
        for (int i = 0; i < n; ++i) {
            parent[i] = i;
        }
    }

    // Find 연산 : 경로 압축 사용
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // 경로 압축
        }
        return parent[x];
    }

    // Union 연산 : 랭크에 따른 합치기
    void union(int x, int y) {
        int root_x = find(x);
        int root_y = find(y);

        if (root_x == root_y) return;

        if (rank[root_x] > rank[root_y]) {
            parent[root_y] = root_x; // root_y를 root_x 밑에 붙인다.
            rank[root_x] += rank[root_y];
        }
        else {
            parent[root_x] = root_y;
            rank[root_y] += rank[root_x];
        }
    }
};
```

<br>

## 💡 정리

- **Union-Find**는 서로소 집합들을 효율적으로 관리해주는 알고리즘이다.

- **Find** 연산은 주어진 원소가 속한 집합의 `루트 노드를 반환`한다. 

- **Union** 연산은 두 서로소 집합을 합치는 작업을 수행한다.

- **경로 압축(Path Compression)**은 find 연산 중 부모 노드를 직접 루트로 연결해 트리의 높이를 <br>
  줄이는 최적화 기법이다.

- **Union by Rank**는 트리를 합칠 때 작은 트리를 큰 트리 밑에 붙여 트리의 높이를 최소화하는 기법이다.

- 두 최적화 기법을 적용하면 `find`와 `union` 연산은 평균적으로 상수 시간에 가깝게 수행된다.

- 시간 복잡도는 매우 느리게 증가하는 $ 𝑂(𝛼(𝑛)) $ 로, 거의 상수 시간에 가까운 성능을 보인다. [👇🏼 참고](https://en.wikipedia.org/wiki/Ackermann_function#Inverse)

- **Union-Find 알고리즘**은 네트워크 연결, 최소 스패닝 트리(MST) 등의 알고리즘에서 많이 사용된다.

