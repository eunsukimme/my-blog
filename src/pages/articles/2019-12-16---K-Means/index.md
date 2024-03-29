---
title: K-Means Clustering(K 평균 군집화) 개념 정리
description: "현실 세계에서 만나게 되는 데이터에 항상 label이 주어지는 것은 아닙니다. 이러한 unlabeled 데이터에 숨겨진 패턴을 찾아내고 구조화하는 머신러닝 기법을 비지도학습(Unsupervised Learning)이라고 합니다. 비지도학습 알고리즘 중 가장 널리 알려진 K-Means 클러스터링 알고리즘에 대해서 알아봅시다."
date: '2019-12-16T23:30:00.000Z'
layout: post
category: Machine Learning
tags:
  - TIL
  - Machine Learning
  - Python
  - scikit-learn
use_math: true
comments: true
---

현실 세계에서 만나게 되는 데이터에 항상 label이 주어지는 것은 아닙니다. 이러한 unlabeled 데이터에 숨겨진 패턴을 찾아내고 구조화하는 머신러닝 기법을 비지도학습(Unsupervised Learning)이라고 합니다. **Clustering(클러스터링)** 은 가장 널리 알려진 비지도학습 중 한 가지 기법으로, 비슷한 유형의 데이터를 그룹화함으로써 unlabeled 데이터에 숨겨진 구조를 파악합니다. 클러스터링을 응용하여 다음과 같은 것들을 구현할 수 있습니다.

- **Recommendation Engines(추천 엔진)**: 개인화된 사용자 경험을 제공하기위해 상품들을 그룹화 합니다
- **Search Engines(검색 엔진)**: 뉴스 토픽들과 검색 결과를 그룹화 합니다
- **Market Segmentation(시장 세분화)**: 지역, 인구, 행동 등을 바탕으로 고객을 그룹화 합니다

# K-Means Clustering

K-Means 알고리즘은 가장 유명한 클러스터링 알고리즘입니다. "K"는 주어진 데이터로부터 그룹화 할 그룹, 즉 클러스터의 수를 말합니다. "Means"는 각 클러스터의 중심과 데이터들의 평균 거리를 의미합니다. 이 때 클러스터의 중심을 _centroids_ 라고 합니다.

K-Means 알고리즘은 다음과 같은 과정으로 수행됩니다.

1. 데이터셋에서 `K` 개의 centroids를 임의로 지정합니다.
2. 각 데이터들을 가장 가까운 centroids가 속한 그룹에 할당합니다.
3. 2번 과정에서 할당된 결과를 바탕으로 centroids를 새롭게 지정합니다.
4. 2 ~ 3번 과정을 centroids가 더 이상 변하지 않을 때 까지 반복합니다.

<img width="640" src="https://i.imgur.com/WL1tIZ4.gif" />

위 과정이 완료되면 unlabeled 데이터를 빠른 속도로 적절한 클러스터에 할당할 수 있습니다. 이번 포스팅에서는 K-Means 알고리즘을 Python으로 직접 구현하여 원리를 이해한 후 `sklearn` 라이브러리를 활용하여 구현하는 방법에 대해 알아보도록 하겠습니다.

# Iris Dataset

K-Means 알고리즘을 구현하기 전에 이번 포스팅에서는 `sklearn` 에서 제공하는 데이터셋인 [Iris(붓꽃) Dataset](https://en.wikipedia.org/wiki/Iris_flower_data_set) 을 활용하도록 하겠습니다. 위 데이터셋은 붓꽃의 서로 다른 3가지 종(`setosa`, `versicolor`, `virginica`)의 sepal(꽃받침), petal(꽃잎) feature를 포함하고 있습니다.

<img width="480" src="https://s3.amazonaws.com/codecademy-content/programs/machine-learning/k-means/iris.svg" />

위 데이터는 `sklearn` 에서 제공하고 있습니다. `sklearn` 라이브러리에 포함된 `datasets` 모듈에서 해당 데이터를 불러올 수 있습니다.

```python
from sklearn import datasets
iris = datasets.load_iris()
samples = iris.data
print(samples)
```

데이터셋은 다음과 같은 내용을 포함하고 있습니다.

```python
array([[5.1, 3.5, 1.4, 0.2],
       [4.9, 3. , 1.4, 0.2],
       ...
       [5.9, 3. , 5.1, 1.8]])
```

여기서 각 row는 하나의 데이터 _sample_ 을 나타냅니다. 각 column은 feature를 나타내며 순서대로 `sepal length(꽃받침의 길이)`, `sepal width(꽃받침의 넓이)`, `petal length(꽃잎의 길이)`, `petal width(꽃잎의 넓이)` 를 의미합니다. 이렇게 load한 데이터는 _Bunch_ 라는 객체로 생성됩니다. 이 객체의 속성으로 `.data` 이외에 데이터의 label인 `.target` 과 데이터에 대한 설명인 `.DESCR` 등이 있으며, 자세한 설명은 [공식 Document](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_iris.html#sklearn.datasets.load_iris)를 참조하시기 바랍니다.

이번 포스팅에서는 sepal length와 width 두 가지 feature만을 고려하도록 하겠습니다. 데이터로부터 두 feature만을 뽑아내어 산점도를 그려보도록 하곘습니다. x축이 length를, y축이 width를 나타냅니다.

```python
from matplotlib import pyplot as plt
x = samples[:, 0]
y = samples[:, 1]
plt.scatter(x, y, alpha=0.5)
plt.xlabel('sepal length (cm)')
plt.ylabel('sepal width (cm)')
plt.show()
```

<img width="400" alt="Screen Shot 2019-12-16 at 6 09 15 PM" src="https://user-images.githubusercontent.com/31213226/70893847-3c926400-202f-11ea-8599-54427d2dbb70.png">

Iris Dataset은 원래 label이 제공되지만, label이 없다고 가정하고 K-Mean 알고리즘으로 위 데이터를 그룹화 시켜보도록 하겠습니다.

# Implementing K-Means

지금부터 K-Means 클러스터링 알고리즘으로 비슷한 붓꽃 끼리 그룹화하는 것을 구현해보도록 하겠습니다.

## STEP 1: Place `K` Random Centroids

제일 먼저 `K` 개의 centroids를 임의로 지정하도록 하겠습니다. 이 때 3가지 종이 존재하므로 `K` 는 `3` 으로 설정하겠습니다.

```python
import numpy as np
k = 3
# 랜덤으로 x, y 좌표 3개를 생성합니다
# np.random.uniform은 주어진 최소, 최대값 사이에서 k 개 만큼 실수 난수를 생성합니다.
centroids_x = np.random.uniform(min(x), max(x), k)
centroids_y = np.random.uniform(min(y), max(y), k)
centroids = list(zip(centroids_x, centroids_y))
```

그리하여 `centroids` 는 임의로 생성한 (x, y) 좌표 3개를 갖게 됩니다. `centroids`가 데이터상에서 어디에 위치하고 있는지 확인해보면 다음과 같습니다.

```python
plt.scatter(x, y, alpha=0.5)	# 데이터들은 파란색으로 표시되고
plt.scatter(centroids_x, centroids_y)	# centroids는 주황색으로 표시됩니다
plt.show()
```

<img width="400" alt="Screen Shot 2019-12-16 at 7 49 23 PM" src="https://user-images.githubusercontent.com/31213226/70900947-2e4b4480-203d-11ea-8696-dec0821c7685.png">

## STEP 2: Assign Datas to Nearest Centroid

Centroids를 지정했다면 이제 해당 centroids에 가까운 데이터들을 할당해줍니다. 이 때 '가깝다' 라는 것을 정량적으로 계산하기 위해 각 데이터를 벡터로 간주하여 유클리드 거리를 계산하도록 하겠습니다. 먼저 두 데이터 포인트 사이의 거리를 계산하는 `distance()` 함수를 작성합니다.

$$distance = \sqrt{(a_1 - b_1)^2 + (a_2 - b_2)^2 + \cdots + (a_n - b_n)^2}$$

```python
def distance(a, b):
    return sum([(el_a - el_b)**2 for el_a, el_b in list(zip(a, b))]) ** 0.5
```

이제 각 데이터들 별로 3개의 centroids와의 거리를 측정합니다. 이 때 `labels` 란 배열을 생성하고, 가장 가까운 centroids의 index를 저장하도록 합니다.

```python
# 각 데이터 포인트를 그룹화 할 labels을 생성합니다 (0, 1, 또는 2)
labels = np.zeros(len(samples))
sepal_length_width = np.array(list(zip(x, y)))
# 각 데이터를 순회하면서 centroids와의 거리를 측정합니다
for i in range(len(samples)):
  distances = np.zeros(k)	# 초기 거리는 모두 0으로 초기화 해줍니다
  for j in range(k):
    distances[j] = distance(sepal_length_width[i], centroids[j])
  cluster = np.argmin(distances)	# np.argmin은 가장 작은 값의 index를 반환합니다
  labels[i] = cluster
```

이렇게 생성한 `labels`에는 `0`, `1` 또는 `2` 가 저장되어 각 데이터가 어느 centroid그룹에 속해있는지를 나타내게 됩니다. 각 데이터가 어느 그룹에 속하게 되었는지 눈으로 확인하기 위해 시각화 해봅시다.

```python
plt.scatter(x, y, c=labels, alpha=0.5)
plt.scatter(centroids_x, centroids_y, c='red')	# centroid는 빨간색으로 나타냅니다
plt.show()
```

<img width="400" alt="Screen Shot 2019-12-16 at 7 49 58 PM" src="https://user-images.githubusercontent.com/31213226/70900989-4327d800-203d-11ea-9473-3c5395124480.png">

데이터들이 가까운 centroid에 잘 할당되어있지만, 처음 centroid를 선택할 때 랜덤으로 선택한 탓에 데이터를 잘 그룹화한 것 같지는 않은 듯 합니다.

## STEP 3: Update Centroids

이제 centroids를 새롭게 지정함으로써 데이터를 더 잘 그룹화 할 수 있도록 만들어봅시다. 우선 기존에 지정한 centroids를 복사해두어 `centroids_old` 에 저장하도록 합시다. 이 때 deep copy(깊은 복사)를 하기위해 python 라이브러리인 `copy` 를 임포트하여 활용합니다.

```python
from copy import deepcopy
centroids_old = deepcopy(centroids)
```

이제 각 그룹별로 데이터의 평균을 계산합니다. 즉, 각 데이터들의 평균 x좌표와 평균 y좌표를 계산하여 하나의 좌표를 계산합니다. 이렇게 계산된 좌표는 새로운 centroid로 지정됩니다.

```python
for i in range(k):
  # 각 그룹에 속한 데이터들만 골라 points에 저장합니다
  points = [ sepal_length_width[j] for j in range(len(sepal_length_width)) if labels[j] == i ]
  # points의 각 feature, 즉 각 좌표의 평균 지점을 centroid로 지정합니다
  centroids[i] = np.mean(points, axis=0)
```

새롭게 지정된 centroids는 어디에 위치하는지 확인해봅시다. 기존의 centroid는 파란색, 새롭게 지정된 centroids는 빨간색으로 나타냅니다.

```python
plt.scatter(x, y, c=labels, alpha=0.5)
plt.scatter(centroids_old[:, 0], centroids_old[:, 1], c='blue')
plt.scatter(centroids[:, 0], centroids[:, 1], c='red')
plt.show()
```

<img width="400" alt="Screen Shot 2019-12-16 at 7 50 33 PM" src="https://user-images.githubusercontent.com/31213226/70901031-576bd500-203d-11ea-9d56-345ced79f4af.png">

Centroids가 전체적으로 중앙으로 이동하여 데이터의 중심 지점에 위치한 것을 확인할 수 있습니다.

## STEP 4: Repeat Step 2 ~ 3 Until Convergence

이제 필요한 모든 building blocks를 구현하였습니다. 남은건 2 ~ 3단계를 반복하여 최적의 centroids를 찾는 것입니다. 그런데 언제까지 찾아야 할까요?

STEP 4를 수행하기 전에 `error` 라는 배열을 하나 만들어줍니다. `error`의 각 index는 `centroids_old` 와 새롭게 지정된 `centroids` 의 거리를 저장합니다. 이 거리가 모두 `0` 이 되면 최적해에 수렴(convergence)한 것으로 판단하여 반복을 종료합니다.

```python
centroids_old = np.zeros(centroids.shape)	# 제일 처음 centroids_old는 0으로 초기화 해줍니다
labels = np.zeros(len(samples))
error = np.zeros(k)
# error 도 초기화 해줍니다
for i in range(k):
  error[i] = distance(centroids_old[i], centroids[i])
# STEP 4: error가 0에 수렴할 때 까지 2 ~ 3 단계를 반복합니다
while(error.all() != 0):
  # STEP 2: 가까운 centroids에 데이터를 할당합니다
  for i in range(len(samples)):
    distances = np.zeros(k)	# 초기 거리는 모두 0으로 초기화 해줍니다
    for j in range(k):
      distances[j] = distance(sepal_length_width[i], centroids[j])
    cluster = np.argmin(distances)	# np.argmin은 가장 작은 값의 index를 반환합니다
    labels[i] = cluster
  # Step 3: centroids를 업데이트 시켜줍니다
  centroids_old = deepcopy(centroids)
  for i in range(k):
    # 각 그룹에 속한 데이터들만 골라 points에 저장합니다
    points = [ sepal_length_width[j] for j in range(len(sepal_length_width)) if labels[j] == i ]
    # points의 각 feature, 즉 각 좌표의 평균 지점을 centroid로 지정합니다
    centroids[i] = np.mean(points, axis=0)
  # 새롭게 centroids를 업데이트 했으니 error를 다시 계산합니다
  for i in range(k):
    error[i] = distance(centroids_old[i], centroids[i])
```

자, 이제 최적의 centroids를 찾았으니 이를 시각화하여 확인해봅시다. 직관적으로 알아보기위해 색을 `r`, `g`, `b` 로 설정해줍니다. 또 centroids는 다이아몬드 형태로 마킹해줍시다.

```python
colors = ['r', 'g', 'b']
for i in range(k):
    points = np.array([sepal_length_width[j] for j in range(len(sepal_length_width)) if labels[j] == i])
    plt.scatter(points[:, 0], points[:, 1], c=colors[i], alpha=0.5)

plt.scatter(centroids[:, 0], centroids[:, 1], marker='D', s=150)
plt.xlabel('sepal length (cm)')
plt.ylabel('sepal width (cm)')
plt.show()
```

<img width="400" alt="Screen Shot 2019-12-16 at 7 46 54 PM" src="https://user-images.githubusercontent.com/31213226/70900782-db718d00-203c-11ea-8a69-dd49ba60357f.png">

이렇게 하여 클러스터링이 잘 이뤄진 것을 확인할 수 있습니다.

# Scikit-Learn

지금까지 K-Means 알고리즘을 순수 Python으로 구현하였습니다. 코드의 양이 상당히 많고 복잡한데, 이를 간편하게 구현하는 방법은 scikit-learn 라이브러리를 활용하는 것입니다. `sklearn` 라이브러리의 `cluster` 모듈에는 K-Means를 구현할 수 있는 `KMeans` 를 제공합니다.

```python
from sklearn.cluster import KMeans
```

KMeans로 모델을 생성할 때, 클러스터링 하려는 그룹의 수 `k` 를 지정해줘야 합니다. 이는 `n_clusters` 옵션으로 지정할 수 있습니다.

```python
model = KMenas(n_clusters=k)
```

다음으로 `.fit()` 메서드를 통해 K-Mean 클러스터링을 수행할 수 있습니다.

```python
model.fit(X)
```

K-Means를 수행한 다음, `.predict()` 메서드를 통해 unlabeled 데이터를 그룹에 할당할 수 있습니다.

```python
model.predict(X)
```

그리하여 scikit-learn을 통해 다음과 같이 4가지 feature를 모두 사용하여 iris 데이터를 클러스터링 할 수 있습니다.

```python
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.cluster import KMeans

iris = datasets.load_iris()
samples = iris.data
# 3개의 그룹으로 나누는 K-Means 모델을 생성합니다
model = KMeans(n_clusters = 3)
model.fit(samples)
labels = model.predict(samples)
# 클러스터링 결과를 시각화합니다
x = samples[:, 0]
y = samples[:, 1]
plt.scatter(x, y, c=labels, alpha=0.5)
plt.xlabel('sepal length (cm)')
plt.ylabel('sepal width (cm)')
plt.show()
```

<img width="400" alt="Screen Shot 2019-12-16 at 8 13 31 PM" src="https://user-images.githubusercontent.com/31213226/70902606-8d5e8880-2040-11ea-99ff-56b95360b433.png">

# Evaluation

지금까지 Iris 데이터를 3가지 서로 다른 그룹으로 클러스터링 하는 것을 Python과 `sklearn` 을 활용하여 구현하였습니다. 그런데 과연 실제로 얼마나 많은 데이터를 올바르게 분류한 것일까요? 이를 확인해보도록 합시다.

## Cross Tabulation

Iris 데이터셋은 label이 포함되어 있습니다. 이는 `target` 이라는 내장 속성을 통해 접근할 수 있습니다.

```python
target = iris.target
```

`target` 은 다음과 같이 생겼습니다.

```python
[ 0 0 0 0 0 ... 2 2 2 ]
```

여기서 `0` 은 `setosa`, `1` 은 `versicolor`, 그리고 `2` 는 `virginica` 를 나타냅니다. 이처럼 숫자로 나타낸 값들을 문자열로 변경해 주도록 합시다.

```python
species = np.chararray(target.shape, itemsize=150)
for i in range(len(samples)):
  if target[i] == 0:
    species[i] = 'setosa'
  elif target[i] == 1:
    species[i] = 'versicolor'
  elif target[i] == 2:
    species[i] = 'virginica'
```

다음으로 _cross-tabulation_ 을 통해 결과를 분석해 보도록 하겠습니다. Pandas 라이브러리를 활용하면 이를 쉽게 구현할 수 있습니다.

```python
import pandas as pd

df = pd.DataFrame({'labels': labels, 'species': species})
ct = pd.crosstab(df['labels'], df['species'])
print(ct)
```

```python
species  b'setosa'  b'versicolor'  b'virginica'
labels
0                0             48            14
1               50              0             0
2                0              2            36
```

위 표를 분석한 결과는 다음과 같습니다.

- _Setosa_ 는 100%의 정확도로 분류되었습니다.
- _Versicolor_ 는 96%의 정확도로 분류되었습니다.
- _Virginica_ 는 그다지 잘 분류되지 않았습니다.

## Number of Clusters

이번 포스팅에서 Iris 데이터를 `3` 개의 그룹으로 클러스터링 하였지만, 만약 데이터셋에서 종의 갯수가 주어지지 않는다면 어떻게 해야 할까요? 그런 경우 몇 개의 그룹으로 클러스터링 해야 하는지 어떻게 결정할 수 있을까요?

위 질문에 답변하기 전에 먼저 무엇이 '좋은' 그룹인지 정의해야 합니다. 일단 그룹에 포함된 각 데이터 포인트들이 뭉쳐져 있을 경우 '좋은' 그룹이라고 말할 수 있을 것입니다. 그룹에 포함된 데이터들이 퍼져있는 정도를 _inertia_ 라고 하는데, Inertia는 각 클러스터의 중심인 centroid와 각 데이터들 사이의 거리를 나타냅니다. 즉, Inertia가 낮은 그룹을 '좋은' 그룹이라 할 수 있고, 이러한 그룹을 적게 만들수록 좋은 모델이라고 할 수 있습니다.

`KMeans` 객체는 내부적으로 `.inertia_` 속성을 가지고 있습니다. `KMeans` 모델을 생성할 때 `num_clusters` 옵션을 다르게 부여하면서 inertia를 비교하는 방법은 다음과 같습니다.

```python
num_clusters = list(range(1, 9))	# K는 1 ~ 8사이의 정수입니다
inertias = []
# 각 K별로 모델을 생성하여 inertia를 측정합니다
for i in num_clusters:
    model = KMeans(n_clusters=i)
    model.fit(samples)
    inertias.append(model.inertia_)
# K에 따른 inertia의 변화를 시각화합니다
plt.plot(num_clusters, inertias, '-o')
plt.xlabel('Number of Clusters (k)')
plt.ylabel('Inertia')
plt.show()
```

<img width="400" alt="Screen Shot 2019-12-16 at 10 57 36 PM" src="https://user-images.githubusercontent.com/31213226/70912546-7ecf9b80-2057-11ea-8ee8-8476e7b138d6.png">

일반적으로 클러스터의 수가 증가할 수록 inertia는 감소하게 됩니다. 궁극적으로 클러스터의 수와 inertia간의 trade-off가 발생하게 됩니다. 우리의 목표는 inertia를 최소화 시키면서 동시에 클러스터의 수를 최소화 시키는 것입니다. 이 때 최적의 클러스터 수를 결정하는 한 가지 방법은 'elbow' 메소드 입니다.

Elbow 메소드란 위 그래프를 사람의 팔로 간주하고, 팔꿈치 부분에 해당하는 클러스터 갯수를 선택하는 것을 말합니다. 즉 inertia가 감소하는 정도가 낮아지는 지점을 찾으면 됩니다. 위 그래프에서는 `3` 이 가장 최적의 클러스터의 수 라고 말할 수 있습니다.

# Review

지금까지 K-Means 클러스터링 알고리즘에 대해서 알아보았습니다. 또한 이 알고리즘을 순수 Python으로 구현하여 내용을 이해한 다음 Scikit-Learn을 사용하여 간결한 코드로 구현해보았습니다. 마지막으로 모델의 성능을 평가하기 위해 cross-tabulation을 만들어 분석하고 최적의 클러스터 수를 결정하는 방법에 대해서도 알아보았습니다. 이번 포스팅에서 배운 내용을 바탕으로 다음의 데이터셋도 활용해보는 시간을 가지면 좋을 것 같습니다.

- [Scikit-Learn](https://scikit-learn.org/stable/datasets/index.html) 라이브러리
- [UCI Machine Learning Repo](https://archive.ics.uci.edu/ml/index.php)

# References

- [Codecademy](http://codecademy.com)
