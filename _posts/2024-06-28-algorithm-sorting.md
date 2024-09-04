---
title: "정렬 알고리즘 (Sorting)"
excerpt: "[C++]Sorting"

categories:
  - 알고리즘
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

- n개의 원소를 가진 리스트를 정렬하는데 $ O(N^2) $ 의 시간이 걸린다.

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

선택 정렬, 삽입 정렬과 함께 대표적인 $ O(N^2) $ 시간 알고리즘이다.

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

- 평균과 최악의 경우 시간 복잡도가 $ O(N^2) $ 이지만, 최선의 경우 $ O(N) $ 이 걸린다.

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

`Merge Sort`는 $ O(N log N) $ 의 시간 복잡도를 가지는 정렬 알고리즘이다. <br>

대표적인 비교 기반 정렬 알고리즘이며, `분할 정복(divide and conquer) 알고리즘`을 사용하여 <br>

리스트를 정렬한다. 합병 정렬이 수행되는 과정은 다음과 같다.

    1. 리스트를 절반으로 나눈다. 리스트의 크기가 1이 될 때까지 반복한다.

    2. 리스트의 크기가 1이 되면, 이미 정렬된 상태로 간주한다.

    3. 두 개의 정렬된 리스트를 합쳐 하나의 정렬된 리스트로 만든다. 

- 합병 정렬의 `분할 단계`에서 리스트를 절반으로 나누어 1이 될 때까지 반복하는 작업은 <br>
  총 $ log_2 N $ 단계가 필요하다. (n은 리스트의 크기)

- `합병 단계`에서 각 `depth`에서 리스트를 합병하는 데 걸리는 시간은 리스트의 길이에 비례한다. <br>
  즉, 각 단계마다 리스트의 모든 요소를 한 번씩 처리해야 하므로 $ O(N) $ 시간이 소요된다.

- 결국 각 단계마다 단계의 요소만큼의 비교 연산을 수행해야 하므로, 총 시간 복잡도는 $ O(N log N) $ 이다.

- `Merge Sort`는 정렬 시에 중복된 값들의 순서가 변하지 않는 `Stable Sort`이다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/6a104aa2-0add-4062-903d-e017cf817b93"></center>

```c++
void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    std::vector<int> leftArr(n1), rightArr(n2);

    for (int i = 0; i < n1; ++i) leftArr[i] = arr[left + i];
    for (int i = 0; i < n2; ++i) rightArr[i] = arr[mid + 1 + i];

    // 병합
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            ++i;
        }
        else {
            arr[k] = rightArr[j];
            ++j;
        }
        ++k;
    }

    // 남은 요소 복사
    while (i < n1) {
        arr[k] = leftArr[i];
        ++i;
        ++K;
    }
    while (j < n2) {
        arr[k] = rightArr[j];
        ++j;
        ++k;
    }
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        // 분할
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        // 병합
        merge(arr, left, mid, right);
    }
}
```

<br>

# 👑 퀵 정렬 (Quick Sort)

`퀵 정렬(Quick Sort)`은 분할 정복 알고리즘의 하나로, 대부분의 정렬 알고리즘보다 빠른 속도를 <br>

특징으로 한다. 대부분 라이브러리의 정렬들이 퀵 정렬을 기반으로 만들어져 있으며, 다음과 같은 <br>

과정에 따라 정렬을 수행한다.

    1. 배열에서 pivot을 선택하고, pivot보다 작은 원소들은 pivot의 왼쪽에, 큰 원소들은
       오른쪽에 위치시킨다.

    2. pivot을 제외한 왼쪽, 오른쪽 배열에 대해 재귀적으로 퀵 정렬을 적용한다.

- 정렬을 위한 추가적인 공간을 차지하지 않는 `In-Place Sort`에 속한다.

- 평균적으로 $ O(N log N) $ 시간이 걸리지만, 최악의 경우 $ O(N^2) $ 의 시간이 걸린다.

- 최악의 경우 합병 정렬보다 성능이 좋지 않지만, 대부분의 라이브러리에서는 피벗 선택에 있어 <br>
  적절한 방법을 택하여 시간복잡도를 줄인다.

<center><img src="https://github.com/jinwoojwa/jinwoo.github.io/assets/112393728/6239c6f9-73a5-4bc9-b786-568fca338ec1"></center>

```c++
// 배열을 분할하고 pivot의 최종 위치를 반환하는 함수
int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // 마지막 요소를 pivot으로 선택
    int i = low - 1;

    for (int j = low; j < high; ++j) {
        if (arr[j] < pivot) {
            ++i;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

// 퀵 정렬 함수
void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high); // 분할 인덱스

        // 분할 인덱스를 기준으로 왼쪽과 오른쪽 부분 배열에 대해 재귀 호출
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```

<br>

# 👑 계수 정렬 (Counting Sort)

`계수 정렬 (Counting Sort)`은 입력값의 범위가 제한적일 때 효과적인 방법으로 <br>

각 원소의 등장 횟수를 세어 정렬하는 `non-comparison-based` 정렬 알고리즘이다. <br>

알고리즘의 동작 원리는 다음과 같다.

    1. 값의 범위 결정 (배열에서 최소값과 최대값 찾기)

    2. 각 값의 등장 횟수를 세는 카운트 배열 생성

    3. 배열을 순회하면서 카운트 배열에 기록

    4. 카운트 배열을 누적하여 앞에 몇 개의 원소들이 있는지를 기록

    5. 출력 배열 채우고, 원본 배열에 복사

- 배열의 크기가 `N`, 수의 범위가 `K` 라고 할 때, $ O(N+K) $ 의 시간 복잡도를 가진다.

- `stable algorithm`이며, `comparison-based sorting algorithm` 들에 비해 빠르게 동작한다.

- 수의 범위가 클 경우 사용하기 어렵다.

- `In-Place sorting algorithm`이 아니며, 따라서 정렬을 위한 오버헤드가 발생한다.

```c++
void countingSort(std::vector<int>& arr) {
    int maxVal = *std::max_element(arr.begin(), arr.end());

    // 0부터 maxVal 까지의 수의 범위를 가지는 카운트 배열 생성
    std::vector<int> count(maxVal+1, 0);

    for (int num : arr) count[num]++;

    // 누적합 계산
    for (int i = 1; i <= maxVal; ++i) count[i] += count[i-1];

    std::vector<int> output(arr.size());

    // 입력 배열을 역순으로 순회하면서 출력 배열 채우기
    for (int i = arr.size() - 1; i >= 0; --i) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    // 원본 배열에 정렬된 값 복사
    for (int i = 0; i < arr.size(); ++i) arr[i] = output[i];
}
```