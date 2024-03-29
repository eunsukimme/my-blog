---
title: Linear Regression(선형 회귀) 개념 정리
description: Supervised Learning에서 연속적인 값을 예측하는 Linear Regression에 대해서 알아봅시다
date: '2019-10-15T00:00:00.000Z'
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

ML 을 공부하는 목적은 현실 세계의 데이터를 해석하여 다음번에 어떤 일이 발생할지 예측하기 위함입니다. 이 때 활용할 수 있는 가장 간단한 모델은 바로 직선입니다. 데이터를 가장 잘 대표하는 하나의 직선을 찾는 것이 바로 **Linear Regression** 입니다.

다음과 같이 야구 선수의 키에 따른 몸무게 데이터가 있다고 생각해봅시다.

<img width="400" src="https://s3.amazonaws.com/codecademy-content/programs/data-science-path/linear_regression/weight_height.png" />

위 데이터를 가로지르는 가장 '적절한' 직선을 그리면 다음과 같습니다.

<img width="400" src='https://s3.amazonaws.com/codecademy-content/programs/data-science-path/linear_regression/weight_height_line.png' />

이 때 키가 73 인치인 새로운 선수가 들어올 때 몸무게가 대략 143 파운드에 가까울 것이라는 것을 예측할 수 있습니다. 물론 이러한 직선은 러프한 근사치를 제공할 뿐이지만, 선형적인 관계가 있는 데이터에 대해서는 다음에 나타날 데이터를 예측하는데에 도움이 될 수 있습니다.

# Points and Lines

하나의 직선은 *slope*와 *intercept*에 의해 정의될 수 있습니다.

$$y = mx + b$$

여기서 `m` 이 slope 고, `b` 가 intercept 입니다. Linera Regression 을 수행할 떄, 최종 목표는 바로 데이터를 가장 '잘' 나타내는 `m` 과 `b` 를 찾는 것입니다. 가장 '잘' 나타낸다는 의미는 바로 다음 섹션에서 설명하겠습니다.

# Loss

데이터를 가장 잘 나타내는 slope 와 intercept 를 찾기 위해선 가장 '잘' 나타낸다는 것이 무엇인지 정의할 필요가 있습니다.

각각의 데이터 포인트에 대해서, 우리는 model 이 예측한 값이 얼마나 잘 못 되었는지를 나타내는 **loss** 라는 것을 계산할 수 있습니다. 여기에서 loss 는 점과 model 이 제공한 직선 사이의 거리의 제곱으로 생각해 볼 수 있습니다. 제곱을 해주는 이유는 부호가 달라서 거리의 합이 상쇄되는 것을 예방하기 위함입니다.

이렇게 각각의 점과 직선 사이의 거리를 계산해서 평균을 낸 값을 최소화 한다면, 그 때 그려지는 직선은 데이터를 가로지르는 직선들 중 데이터를 가장 '잘' 나타냈다고 볼 수 있습니다. 다음과 같은 데이터와 직선이 있다고 생각해봅시다.

<img width="700" alt="Screen Shot 2019-10-15 at 2 41 24 AM" src="https://user-images.githubusercontent.com/31213226/66771498-59a69b80-eef5-11e9-9f52-3e79752a560e.png">

현재 slope 가 -0.04, intercept 가 -0.02 인 직선의 loss 는 32.12 입니다. 눈으로만 봐도 위 직선은 데이터를 잘 나타내고 있다고 말하기 어려울 것 같습니다.

<img width="700" alt="Screen Shot 2019-10-15 at 2 43 52 AM" src="https://user-images.githubusercontent.com/31213226/66771651-d0439900-eef5-11e9-9b35-e081be6c9fbb.png">

위 직선은 slope 가 -0.75, intercept 가 4.62 인데 loss 가 2.39 로 전보다 더 낮아진걸 확인할 수 있습니다. 그림상으로도 데이터를 잘 나타내고 있는 것 같습니다.

사람이 직접 직선의 slope 와 intercept 를 조정할 수 있지만, 이는 과학적이지도 않고 시간도 오래 걸립니다. 어떻게 하면 과학적으로 최적의 `m` 과 `b` 를 찾을 수 있을까요?

# Gradient Descent

최적의 `m` 과 `b` 는 loss 가 가장 크게 감소하는 방향으로 `m` 과 `b` 를 이동시키는 **gradient Descent** 라는 방법을 통해서 찾을 수 있습니다. 여기서 gradient 는 특정 지점에서의 기울기(미분)을 뜻합니다.

먼저 loss 를 수식으로 정의한 뒤, loss 를 각 파라미터 `m` 과 `b` 에 대해서 미분한 값을 계산함으로써 loss 가 감소시키는 파라미터의 방향을 구한 뒤 `m` 과 `b` 를 업데이트 시켜주면 됩니다.

## Gradient descent for Intercept

하나의 데이터에 대한 gradient 를 구하고 이를 전체 데이터에 대해 일반화 하도록 합시다. 먼저 데이터를 대표할 직선 a 을 다음과 같이 정의할 수 있습니다. 이 떄 \i 기호는 하나의 데이터 포인트, 즉 training example 을 뜻합니다.

$$ a_i = mx_i + b$$

그러면 각 training example 에 대한 loss $L$ 을 다음과 같이 계산할 수 있습니다.

$$L_i = (y_i - a_i)^2$$

그리고 모든 N 개의 training example 에 대한 loss 는 다음과 같이 정의할 수 있습니다. 각 loss 의 총 합을 구한 뒤 N 으로 나누어주면 됩니다.

$$L = {1 \over N } \displaystyle\sum_{i=1}^n(y_i - a_i)^2$$

이제 loss 를 intercept 에 대해서 미분한 gradient $dL \over db$를 계산해봅시다. 그러기 위해선 먼저 $L$를 $a$에 대해서 미분한 $dL \over da$ 을 계산해야 합니다.

$$ {dL \over da} = {2 \over N} \displaystyle\sum_{i=1}^n (a_i - y_i)$$

그리고 $a$를 $b$에 대해서 미분한 gradient $da \over db$ 를 계산합니다.

$${da \over db} = 1$$

그러면 이제 gradient chain rule 에 따라 $dL \over db$ 를 계산할 수 있습니다.

$${dL \over db} = {da \over db} * {dL \over da} = {2 \over N} \displaystyle\sum_{i=1}^n (a_i - y_i)$$

이렇게 해서 loss 를 intercept 에 대해서 미분한 gradient 를 계산하였습니다. $a_i$를 맨 처음에 정의한 수식으로 대입하고 순서를 조금 변경하면 최종적으로 다음과 같은 수식을 얻을 수 있습니다.

$${dL \over db} = {2 \over N} \displaystyle\sum_{i=1}^N -(y_i - (mx_i + b))$$

## Gradient descent for slope

마찬가지로 loss 를 slope 에 대해서 미분한 gradient $dL \over dm$ 을 계산할 수 있습니다. $da \over dm$ 만 계산하면 위에서 구한 값들을 그대로 적용할 수 있습니다.

${da \over dm} = x_i$

즉 gradient chain rule 에 따라 $dL \over dm$ 를 계산할 수 있습니다.

$${dL \over dm} = {da \over dm} _ {dL \over da} = {2 \over N} \displaystyle\sum_{i=1}^n x_i * (a_i - y_i)$$

이렇게 해서 loss 를 slope 에 대해서 미분한 gradient 를 계산하였습니다. $a_i$ 에 처음 수식을 대임하고 순서를 조금 변경하면 최종적으로 다음 수식을 얻을 수 있습니다.

$${dL \over dm} = {2 \over N} \displaystyle\sum_{i=1}^N -x_i * (y_i - (mx_i + b))$$

## Python code

위 수식을 그대로 코드로 옮기면 바로 gradient descent 를 적용할 수 있습니다. 먼저, intercept 의 gradient 를 계산하는 `get_gradient_at_b()` 함수를 작성합시다. 이 함수는 파라미터로 x-axis 값 배열 `x`, y-axis 값 배열 `y`, slope `m`, intercept `b` 를 받습니다.

```python
def get_gradient_at_b(x, y, m, b):
  diff = sum([y_i - (m * x_i + b) for x_i, y_i in zip(x, y)])
  b_gradient = diff * (-2 / len(x))

  return b_gradient
```

또 slope 의 gradient 를 계산하는 `get_gradient_at_m()` 함수를 작성합시다. 이 함수도 `get_gradient_at_b()` 와 동일한 파라미터를 받습니다.

```python
def get_gradient_at_m(x, y, m, b):
  diff = sum([x_i * (y_i - (m * x_i + b)) for x_i, y_i in zip(x, y)])
  m_gradient = diff * (-2 / len(x))

  return m_gradient
```

이제 계산한 gradient 를 통해 `b` 와 `m` 을 업데이트 해주는 함수 `step_gradient()` 를 작성해봅시다. 이 함수는 loss 를 감소시키는 방향으로 한 step 나아갔을 때 업데이트 된 새로운 `b` 와 `m` 을 반환해줍니다. 이 때, 한 step 의 크기가 너무 크거나 작으면 문제가되니 이를 스케일링 할 수 있도록 learning_rate 라는 하이퍼 파라미터를 추가로 받아 각 gradient 와 곱해줍시다.

```python
def step_gradient(x, y, m_current, b_current, learning_rate):
  b_gradient = get_gradient_at_b(x, y, m_current, b_current)
  m_gradient = get_gradient_at_m(x, y, m_current, b_current)
  b = b_current - (learning_rate * b_gradient)
  m = m_current - (learning_rate * m_gradient)

  return [b, m]
```

자, 이제 gradient 를 계산하는 방법을 알았으니, 실제로 잘 작동하는 건지 테스트를 해봅시다. 먼저 예를 들어, 월별 수익(달러)을 나타내는 데이터가 있다고 생각해봅시다.

```python
from matplotlib import pyplot as plt

months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
revenue = [52, 74, 79, 95, 115, 110, 129, 126, 147, 146, 156, 184]
# 월별 수익 그래프를 산점도로 나타낸다
plt.plot(months, revenue, 'o')
plt.show()
```

<img width="400" alt="Screen Shot 2019-10-15 at 3 56 52 AM" src="https://user-images.githubusercontent.com/31213226/66775797-d9396800-eeff-11e9-910d-c7aa03e28bb5.png">

먼저 `b` 와 `m` 모두 0 으로 초기화 시키고, loss 를 감소시키는 방향으로 한 step 나아갔을 떄 어떻게 변화하는지 확인해 봅시다. 처음 그리는 직선이 오랜지색, 한 step 이후에 그리는 직선이 초록색 입니다.

```python
# b와 m을 0으로 초기화합니다
b1, m1 = 0, 0
y1 = [m1 * month + b1 for month in months]
plt.plot(months, y1)
# learning_rate를 0.001로 설정한 후 한 step 나아갑니다
b2, m2 = step_gradient(months, revenue, b1, m1, 0.001)
y2 = [m2 * month + b2 for month in months]
plt.plot(months, y2)

plt.show()
```

<img width="400" alt="Screen Shot 2019-10-15 at 4 17 05 AM" src="https://user-images.githubusercontent.com/31213226/66776973-b066a200-ef02-11e9-9c10-6cda88c80483.png">

초록색 직선이 살짝 위로 올라간것을 확인할 수 있습니다! 몇 step 을 더 거치면 데이터를 잘 표현할 수 있을 것 같습니다. 그런데 이 step 은 얼마나 가야할 지 어떻게 알 수 있을까요?

# Convergence

파라미터 `m` 과 `b` 를 언제까지 변화시켜줘야 할까요? 얼마나 학습을 시켜야 충분히 학습했다고 말할 수 있을까요?

이를 위해선 반드시 convergence 를 알아야합니다. **convergence** 란 파라미터가 변화하더라도 loss 가 더이상 잘 변화하지 않는 텀을 말합니다. 아래 그래프는 약 800 iterations 부터 거의 변화가 없는데, 이시기가 바로 convergence 입니다. 즉, 아래의 경우 800 iterations 정도면 충분히 학습했다고 볼 수 있습니다.

<img width="400" alt="Screen Shot 2019-10-15 at 4 25 41 AM" src="https://user-images.githubusercontent.com/31213226/66777382-de98b180-ef03-11e9-8a38-af35d54e4db4.png">

# Learning rate

데이터를 가장 '잘' 나타내는 직선을 찾기 위해선 `m` 과 `b` 를 loss 가 감소하는 방향으로 나아가게 해야 한다고 앞에서 설명하였습니다. 그런데 '얼마나' 나아가야 적절하게 나아가는 걸까요?

그래서 우리는 **learning rate** 를 선택해야 합니다. 즉, 한 step 에서 gradient 가 변화하는 양을 정해주어야 합니다. 너무 작은 learning rate 는 converge 하기까지 많은 시간이 걸립니다. 너무 큰 learning rate 는 가장 적은 loss 값을 지나칠 수 있습니다. 오히려 발산하게 되는 경우가 생길 수 있습니다.

절대적으로 모든 모델에 적합한 learning rate 는 존재하지 않습니다. 다만 필요한 만큼으로 효율적이고 converge 하게 되는 충분히 큰 learning rate 를 찾아야 합니다. 너무 걱정하진 마세요. 일반적으로 적절하다고 판단된는 learning rate 들 몇 개만 적용해보면 금방 찾을 수 있습니다 :)

# Put it Together

이제 우리의 model 을 마저 학습시켜 봅시다. 필요한 것은 모두 준비되었습니다. 다만 하나의 step 만 나아가는 함수 밖에 없으니, 주어진 num_iterations 만큼 step 을 반복하는 `gradient_descent()` 함수를 만듭시다.

```python
def gradient_descent(x, y, learning_rate, num_iterations):
  m, b = 0, 0	# 0으로 초기화
  for i in range(num_iterations):
    # num_iterations 만큼 step을 진행합니다
    b, m = step_gradient(b, m, x, y, learning_rate)

  return [b, m]
```

이제 learning_rate 는 0.01, num_iteration 은 1000 으로 학습을 진행해봅시다.

```python
b, m = gradient_descent(months, revenue, 0.01, 1000)
y = [m*x + b for x in months]

plt.plot(months, revenue, "o")
plt.plot(months, y)
plt.show()
```

<img width="400" alt="Screen Shot 2019-10-15 at 4 42 37 AM" src="https://user-images.githubusercontent.com/31213226/66778311-3afcd080-ef06-11e9-9e19-f583a1813ab9.png">

직선이 데이터를 아주 잘 대표하는 듯 합니다! 학습이 잘 이뤄진 것 같습니다 👍

# Scikit-Learn

지금까지 구현한 모든 함수를 매번 regression 할 때마다 다시 작성해야 한다면 너무 손가락이 아프겠죠? 다행히도, Scikit-Learn 이라는 Python 라이브러리에서 ML 과 관련된 모듈들을 제공하고 있습니다. Linear regression 의 경우 scikit-learn 의 `linear_model` 모듈에서 `LinearRegression()` 함수를 활용할 수 있습니다.

```python
from sklearn.linear_model import LinearRegression
```

그리하여 Linear Regression 모델을 생성한 뒤 데이터를 fitting 할 수 있습니다.

```python
line_fitter = LinearRegression()
line_fitter.fit(X, y)
```

`.fit()` 함수는 모델에게 다음 두 변수를 제공합니다. 이는 우리가 나중에 유용하게 접근할 수 있습니다.

1. `line_fitter.coef_` - slope 를 저장합니다.
2. `line_fitter.intercept_` - intercept 를 저장합니다.

또한 우리는 `.predict()` 함수에 x-values 를 전달하여 예측된 y-values 를 얻을 수 있습니다.

```python
y_predicted = line_fitter.predict(X)
```

**Note**: `num_iterations` 와 `learning_rate` 는 scikit-learn 에서 dafault value 로 가지고 있으니 이에 대해선 따로 명시해 주지 않아도 됩니다.

자, 그럼 우리가 열심히 짠 코드를 scikit-learn 으로 implement 해봅시다.

```python
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
import numpy as np

months = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
months = months.reshape(-1, 1)
revenue = np.array([52, 74, 79, 95, 115, 110, 129, 126, 147, 146, 156, 184])

line_fitter = LinearRegression()
line_fitter.fit(months, revenue)
revenue_predict = line_fitter.predict(months)

plt.plot(months, revenue, 'o')
plt.plot(months, revenue_predict)
plt.show()
```

<img width="400" alt="Screen Shot 2019-10-15 at 4 54 11 AM" src="https://user-images.githubusercontent.com/31213226/66778869-d9d5fc80-ef07-11e9-9651-518f98a37853.png">

코드가 훨씬 간결해 진 것과 동일한 결과를 확인할 수 있습니다 😚

# Review

지금까지 linear Regression 을 Python 과 scikit-learn 라이브러리를 활용하여 어떻게 구현하는지 알아보았습니다. 이번 포스팅에서 배운 내용을 정리하면 다음과 같습니다.

- We can measure how well a line fits by measuring _loss_.
- The goal of linear regression is to minimize loss.
- To find the line of best fit, we try to find the `b` value (intercept) and the `m` value (slope) that minimize loss.
- _Convergence_ refers to when the parameters stop changing with each iteration.
- _Learning rate_ refers to how much the parameters are changed on each iteration.
- We can use Scikit-learn’s `LinearRegression()` model to perform linear regression on a set of points.

이제 배운 내용을 써먹으러 가봐야겠죠? Kaggle 이나 scikit-learn 에서 제공하는 예시 데이터를 가지고 한번 놀아보는 시간을 가져봅시다 😋

# References

- [Codecademy](http://www.codecademy.com)
