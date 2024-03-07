---
title: "투 포인터 알고리즘"
excerpt: "Two-Pointer Algorithm"

categories:
  - Algorithm
tags:
  - [algorithm]

permalink: /algorithm/algorithm-two_pointer/

toc: true
toc_sticky: true

date: 2024-03-07
last_modified_at: 2024-03-07
---

## Two-Pointer Algorithm (투 포인터)

**Two Pointer Algorithm**은 배열이나 리스트와 같은 순차적인 데이터 구조에서 <br>

`두 개의 포인터를 이용`하여 **`선형 시간에`** 결과를 도출하는 알고리즘이다. <br>

주로 정렬된 배열이나 리스트에서 특정 조건을 만족하는 부분을 찾거나 최적화 문제에 활용된다. <br>

<br>

### 활용 예시

6개의 숫자로 이루어진 배열에서 연속된 수의 합이 4가 되는 경우의 수를 구하는 문제가 있다고 하자. <br>

연속된 수의 합을 `sum` 이라 하고, 두 포인터를 각각 `start`, `end` 라 하자. <br>

다음과 같은 알고리즘으로 이 문제를 해결할 수 있다. <br>

``` c++
1. sum > 4  → sum = sum - start; start++;
2. sum < 4  → end++; sum = sum + end;
3. sum == 4 → end++; sum = sum + end; count++;
```

이를 실제 `c++`로 구현해보면,

```c++
#include <iostream>

using namespace std;

int main() {
    int arr[6] = {1, 3, 2, 1, 2, 2};
    int length = 6;
    int targetSum = 4;

    int start = 0, end = 0;
    int currentSum = arr[0];
    int count = 0;

    while (start < length && end < length) {
        if (currentSum > targetSum) {
            currentSum -= arr[start];
            start++;
        } 
        else if (currentSum < targetSum) {
            end++;
            currentSum += arr[end];
        } 
        else {  // currentSum == targetSum
            end++;
            currentSum += arr[end];
            count++;
        }
    }

    std::cout << "Number of subarrays with sum 4: " << count << std::endl;

    return 0;
}
```

<br>

## Sliding window Algorithm (슬라이딩 윈도우)

2개의 포인터를 사용한다는 점에서 투 포인터 알고리즘과 매우 유사하며, <br>

비슷한 원리를 공유하는 알고리즘이다. <br>

하지만 슬라이딩 윈도우 알고리즘의 경우 어느 순간에도 `범위(window)`를 유지한 채로 <br>

이동하며 문제를 해결한다는 점에서 차이가 있다.