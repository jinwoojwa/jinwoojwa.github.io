---
title: "정렬 (Sorting)"
excerpt: "[C++]Sorting"

categories:
  - Algorithm
tags:
  - [algorithm]

permalink: /algorithm/algorithm-sorting/

toc: true
toc_sticky: true
use_math: true

date: 2024-06-28
last_modified_at: 2024-06-28
---

# 👑 선택 정렬 (Selection Sort)

정렬 알고리즘 중 하나인 `선택 정렬`은 다음과 같은 알고리즘으로 이루어진다.

    1. 주어진 리스트에서 최소값을 찾는다.

    2. 최소값을 맨 앞의 값과 바꾼다.

    3. 처음 위치를 뺀 나머지 리스트에 대해 1~2를 반복한다.

- index = k 에서 `k+1 ~ n`까지의 원소 중 최소값을 찾아 k와 바꾸고, index = k+1 에서 <br>
  `k+2 ~ n`까지의 원소 중 최소값을 찾아 바꾸는 일련의 과정을 수행한다.

- n개의 원소를 가진 리스트를 정렬하는데 $ O(n^2) $ 의 시간이 걸린다.

```c++
void selection_sort(int list[], int n) { 
    for (int i = 0; i < n-1; ++i) {
        int min = i;
        for (int j = i+1; j < n; ++j) {
            if (list[min] > list[j]) min = j;
        }
        if (min != i) {
            int temp = list[i];
            list[i] = list[min];
            list[min] = temp;
        }
    }
}
```

<br>

# 👑 버블 정렬 (Bubble Sort)

원소의 이동이 거품이 수면으로 올라오는 모습처럼 보이기 때문에 이름 붙여진 버블 정렬은 <br>

선택 정렬, 삽입 정렬과 함께 대표적인 $ O(n^2) $ 시간 알고리즘이다.

    1. 리스트의 처음부터 끝까지 인접한 두 원소를 비교하여, 앞의 원소가 뒤의 원소보다
       크면 두 원소를 교환한다.

    2. 첫번째 과정이 끝났다면, 리스트의 가장 큰 원소가 리스트의 끝에 위치할 것이다.

    3. 각 과정이 끝날때마다 비교할 범위가 줄어든다. 즉, 두 번째에서는 리스트의 끝에서
       두 번째 원소까지만 비교하며, 세 번째에서는 리스트의 끝에서 세 번째 원소까지만
       비교한다.

```c++
void bubble_sort(int list[], int n) {
    for (int i = 0; i < n-1; ++i) {
        for (int j = 0; j < n-i-1; ++j) {
            if (list[j] > list[j+1]) {
                int temp = list[j];
                list[j] = list[j+1];
                list[j+1] = temp;
            }
        }
    }
}
```

<br>

# 👑 삽입 정렬 (Insertion Sort)

배열을 정렬된 부분과 정렬되지 않은 부분으로 나누어 생각하여, 정렬되지 않은 부분의 <br>

원소를 하나씩 정렬된 부분의 적절한 위치에 삽입하여 정렬하는 정렬 알고리즘이다.

    1. 배열의 첫 번째 원소를 이미 정렬된 것으로 간주하며, 두 번째 원소부터 정렬을 시작한다.

    2. 정렬되지 않은 부분의 첫 번째 원소를 선택하여, 정렬된 부분의 마지막 원소와 비교한다.
       정렬된 부분에서 적절한 위치를 찾을 때까지 비교하며, 원소를 오른쪽으로 한 칸씩 이동시킨다.

    3. 적절한 위치를 찾으면 현재 원소를 그 위치에 삽입한다.

    4. 배열의 마지막 원소까지 1~3을 반복한다.

- 평균과 최악의 경우 시간 복잡도가 $ O(n^2) $ 이지만, 최선의 경우 $ O(n) $ 이 걸린다.

```c++
void insertion_sort(int list[], int n) {
    for (int i = 1; i < n; ++i) {
        int key = list[i];
        int j = i - 1;
        
        while (j >= 0 && list[j] > key) {
            list[j+1] = list[j];
            j = j - 1;
        }
        // list[j] <= key 또는 j = -1 이기 때문에 j+1에 저장해야 함.
        list[j+1] = key;
    }
}
```

<br>

# 👑 합병 정렬 (Merge Sort)

`Merge Sort`는 $ O(n log n) $ 의 시간 복잡도를 가지는 정렬 알고리즘이다. <br>

대표적인 비교 기반 정렬 알고리즘이며, `분할 정복(divide and conquer) 알고리즘`을 사용하여 <br>

리스트를 정렬한다. 합병 정렬이 수행되는 과정은 다음과 같다.

    1. 리스트를 절반으로 나눈다. 리스트의 크기가 1이 될 때까지 반복한다.

    2. 리스트의 크기가 1이 되면, 이미 정렬된 상태로 간주한다.

    3. 두 개의 정렬된 리스트를 합쳐 하나의 정렬된 리스트로 만든다. 

- 합병 정렬의 `분할 단계`에서 리스트를 절반으로 나누어 1이 될 때까지 반복하는 작업은 <br>
  총 $ log_2 n $ 단계가 필요하다. (n은 리스트의 크기)

- `합병 단계`에서 각 `depth`에서 리스트를 합병하는 데 걸리는 시간은 리스트의 길이에 비례한다. <br>
  즉, 각 단계마다 리스트의 모든 요소를 한 번씩 처리해야 하므로 $ O(n) $ 시간이 소요된다.

- 결국 각 단계마다 단계의 요소만큼의 비교 연산을 수행해야 하므로, 총 시간 복잡도는 $ O(n log n) $ 이다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/6a104aa2-0add-4062-903d-e017cf817b93"></center>

<br>

# 👑 퀵 정렬 (Quick Sort)


