---
title: "이분 탐색 (Binary Search)"
excerpt: "[C++]Binary Search Algorithm"

categories:
  - 알고리즘
tags:
  - [algorithm]

permalink: /algorithm/algorithm-binary-search/

toc: true
toc_sticky: true
use_math: true

date: 2024-07-23
last_modified_at: 2024-07-23
---

# 👑 이분 탐색 (Binary Search)

`이분 탐색`은 **정렬된 리스트에서** 특정 항목을 찾기 위한 효율적인 탐색 알고리즘이다. <br>

반드시 `정렬된` 상태의 리스트에서 진행해야 올바른 탐색이 가능하다. 

<br>

    - 두 개의 포인터를 사용하여 첫 요소와 마지막 요소를 가리키게 한다.
      (left, right)
    
    - 현재 리스트 구간의 중간점을 계산한다.
      mid = (left + right) / 2

    - 중간 요소와 타겟 값을 비교한다.

        1. 같음 → 항목을 찾은 것

        2. mid보다 작음 → 검색 범위를 왼쪽 절반으로 줄임 (left ~ mid)

        3. mid보다 큼 → 검색 범위를 오른쪽 절반으로 줄임 (mid ~ right)

    - left가 right 보다 커지면, 리스트에 찾고자 하는 값이 없다는 뜻.

<br>

- $ O(log n) $ 시간이 걸리며 $ O(n) $ 의 선형 탐색보다 훨씬 빠르게 동작한다.

- 정렬된 리스트에서만 작동하며, 정렬을 위한 $ O(n log n) $ 의 시간 복잡도를 소모한다.

<br>

## 💡 구현 (C++)

```c++
#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = (left + right) / 2;

        // 중간 요소와 타겟 값이 같은 경우 리턴
        if (arr[mid] == target) return mid;

        // 타겟 값이 중간값보다 큰 경우
        if (arr[mid] < target) left = mid + 1;
        
        // 타겟 값이 중간값보다 작은 경우
        else right = mid - 1;
    }

    // while 문을 통과했다면 타겟이 배열에 없다는 뜻
    return -1;
}

int main() {
    std::vector<int> arr = {2, 3, 4, 10, 40};
    int target = 10;
    int result = binarySearch(arr, target);

    cout << result;

    return 0;
}
```

<br>

## 💡 Binary Search in C++ STL

C++에서는 `<algorithm>` 헤더를 include 할 경우 `binary_search`를 쉽게 사용할 수 있도록 한다. <br>

범위와 타겟 값을 인자로 주면 범위 내 타겟이 들어있는지 여부를 부울 값으로 리턴해준다. 물론 범위 <br>

내의 값들은 반드시 `오름차순으로 정렬되어 있어야 한다.`

```c++
#include <iostream>
#include <algorithm>
#include <vector>

int main() {
    std::vector<int> arr = {2, 3, 4, 10, 40};
    int target = 10;
    bool result = binary_search(arr.begin(), arr.end(), 10);

    cout << result;

    return 0;
}
```





