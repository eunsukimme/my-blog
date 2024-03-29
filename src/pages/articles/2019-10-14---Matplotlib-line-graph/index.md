---
title: Matplotlib로 선 그래프 그리기 완벽 정리
description: Matplotlib로 선 그래프를 그리는 방법에 대해서 알아봅시다
date: '2019-10-14T00:00:00.000Z'
layout: post
category: Data Visualization
tags:
  - TIL
  - Python
  - Matplotlib
  - Data Visualization
comments: true
---

Matplotlib 는 차트와 그래프를 그리는데 사용하는 Python 라이브러리입니다. Matplotlib 를 활용하여 간단한 2 차원 선 그래프 그려보는 방법에 대해서 알아보도록 합시다.

# Basic Line Plot

선 그래프는 다음과 같이 시간의 따른 데이터의 변화를 시각화하는데 유용하게 사용됩니다.

- 지난 10 년 간 경유 가격의 평균값
- 지난 두 달간 몸무게 변화

Matplotlib 의 `.plot()` 함수와 `.show()` 함수를 활용하여 간단한 선 그래프를 그릴 수 있습니다.

```python
from matplotlib import pyplot as plt

x_values = [0, 1, 2, 3, 4]	# x축 지점의 값들
y_values = [0, 1, 4, 9, 16]	# y축 지점의 값들
plt.plot(x_values, y_values)	# line 그래프를 그립니다
plt.show()	# 그래프를 화면에 보여줍니다
```

위 코드는 아래와 같은 그래프를 그립니다.

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/parabola.png" />

또한 하나의 그래프 뿐만 아니라 여러개의 그래프를 그릴 수 있습니다. 같은 scale 과 axis 를 사용하는 서로 다른 데이터를 보여줄 때 유용합니다. `.plot()` 함수를 반복적으로 호출하면 자동으로 여러 그래프를 같은 축에 그려줍니다.

```python
# 한 주의 요일(0: 일, 1: 월 ~ 6: 토)
days = [0, 1, 2, 3, 4, 5, 6]
# 내가 사용한 돈(천원)
money_spent = [10, 12, 12, 10, 14, 22, 24]
# 친구가 사용한 돈(천원)
money_spent_2 = [11, 14, 15, 15, 22, 21, 12]
# 내가 사용한 돈을 그래프로 그립니다
plt.plot(days, money_spent)
# 같은 그림에 친구가 사용한 돈도 그래프로 그립니다
plt.plot(days, money_spent_2)
# 화면에 그래프를 보여줍니다
plt.show()
```

위 코드는 다음과 같은 그래프를 그립니다.

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/money_spent_2.png" />

디폴트로 제일 처음 그려지는 그래프가 blue, 두번째가 orange 색깔입니다. 이는 사용자가 커스텀할 수 있습니다.

# Linestyles

`.plot()` 함수의 옵션으로 `color` 을 부여하면 선의 색을 지정할 수 있습니다. 옵션으로 줄 수 있는 값은 HTML 의 색 이름(`green`, `yellow` 등)이나 HEX 코드가 있습니다.

```python
plt.plot(days, money_spent, color='green')	# HTML color name
plt.plot(days, money_spent_2, color='#AAAAAA')	# HEX code
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/money_colors.png" />

또한 `linestyle` 옵션을 부여함으로써 선의 형태를 커스터마이징할 수 있습니다.

```python
# 파선(Dashed)
plt.plot(x_values, y_values, linestyle='--')
# 점선(Dotted)
plt.plot(x_values, y_values, linestyle=':')
# 실선(No line)
plt.plot(x_values, y_values, linestyle='')
```

그리고 각 데이터 포인트에 `marker` 를 지정할 수 있습니다.

```python
# 원(A circle)
plt.plot(x_values, y_values, marker='o')
# 정사각형(A square)
plt.plot(x_values, y_values, marker='s')
# 별(A star)
plt.plot(x_values, y_values, marker='*')
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/linestyles.png" />

# Axis and Labels

종종 그래프의 특정 영역을 확대하거나 강조하고 싶을 수 있습니다. 이 때 보여줄 축의 범위를 `.axis()` 함수로 지정할 수 있습니다. `.axis()` 함수는 [ x_min, x_max, y_min, y_max ] 를 파라미터로 전달받습니다.

```python
x = [0, 1, 2, 3, 4]
y = [0, 1, 4, 9, 16]
plt.plot(x, y)
plt.axis([0, 3, 2, 5])	# x축은 0~3 까지, y축은 2~5 까지 보여줍니다
plt.show()
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/axis_zoom.png" />

그런데 그래프의 x 와 y 축이 의미하는 바가 무엇인지 알 수 없으니 그래프를 이해하기가 쉽지 않습니다. 그래프의 각 축에 라벨을 달아주려면 `.xlabel()` 과 `.ylabel()` 함수를 활용합니다. 또한 그래프의 제목은 `.title()` 로 설정할 수 있습니다. 위 함수는 모두 인자로 string 을 받습니다.

```python
hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
happiness = [9.8, 9.9, 9.2, 8.6, 8.3, 9.0, 8.7, 9.1, 7.0, 6.4, 6.9, 7.5]
plt.plot(hours, happiness)
plt.xlabel('Time of day')
plt.ylabel('Happiness Rating (out of 10)')
plt.title('My Self-Reported Happiness While Awake')
plt.show()
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/axis_labels.png" />

# Subplots

떄로는 두 데이터를 비교할 때 같은 x-axes 나 y-axes 가 아닌 다른 axes 을 사용하게 하여 여러 그래프를 그리고 싶을 수 있습니다. 이러한 **여러 axes 의 집합을 _subplot_ 이라고 합니다**. 이러한 **_subplot_ 을 모두 포함하는 오브젝트를 _figure_ 라고 합니다**.

하나의 *figure*에 여러 *subplot*들이 포함될 수 있습니다. 만약, 2 행 3 열의 총 6 개의 _subplot_ 을 포함하는 다음과 같은 figure 를 그릴 수 있습니다.

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/six_subplots.svg" />

*subplot*은 `.subplot()` 함수를 호출하여 생성할 수 있습니다. `.subplot()` 함수는 다음 세 파라미터를 받습니다.

- 행의 수
- 열의 수
- 만들고자 하는 *subplot*의 index

예를 들어 `plt.subplot(2, 3, 4)` 는 위 그림에서 "Subplot4" 를 생성합니다. `plt.subplot()` 뒤에 오는 모든 `plt.plot()` 은 해당 _subplot_ 에서 그래프를 그립니다.

```python
# 데이터 셋
x = [1, 2, 3, 4]
y = [1, 2, 3, 4]
# 1행 2열에서 1 번째 subplot
plt.subplot(1, 2, 1)
plt.plot(x, y, color='green')
plt.title('First Subplot')
# 1행 2열에서 2 번째 subplot
plt.subplot(1, 2, 2)
plt.plot(x, y, color='steelblue')
plt.title('Second Subplot')
# 그래프를 화면에 그립니다
plt.show()
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/learn-pandas/two_subplots.svg" />

그런데 subplot 을 띄우다 보면 다음과 같은 문제가 발생할 때가 있습니다.

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/overlapping_subplots.png" />

위 그림처럼 label 이 옆 subplot 과 곂치게 되는 경우가 있는데, 이러한 경우 subplot 의 margin 을 조정해주어야 합니다. Matplotlib 는 `plt.subplots_adjust()` 함수를 제공해줍니다. `.subplots_adjust()` 함수는 다음과 같은 keyword arguments 를 가집니다.

- `left` - 왼쪽 margin. 디폴트는 0.125
- `right` - 오른쪽 margin. 디폴트는 0.9
- `bottom` - 아래쪽 margin. 디폴트는 0.1
- `top` - 위쪽 margin. 디폴트는 0.9
- `wspace` - subplots 의 수평 간격. 디폴트는 0.2
- `hspace` - subplots 의 수직 간격. 디폴트는 0.2

예를 들어, 다음과 같이 subplots 의 간격을 조정할 수 있습니다.

```python
# 아래쪽 margin을 0.1 에서 0.2로 늘립니다
plt.subplots_adjust(bottom=0.2)
# 위쪽 margin을 0.95로 늘리고 수직 간격을 0.25로 늘립니다
plt.subplots_adjust(top=0.95, hspace=0.25)
```

이제 위에서 제시한 겹치는 subplot 을 보유한 figure 를 수정해봅시다.

```python
# 첫 번째 subplot
plt.subplot(1, 2, 1)
plt.plot([-2, -1, 0, 1, 2], [4, 1, 0, 1, 4])
# 두 번째 subplot
plt.subplot(1, 2, 2)
plt.plot([-2, -1, 0, 1, 2], [4, 1, 0, 1, 4])
# 수평 간격을 0.2에서 0.35로 늘려줍니다
plt.subplots_adjust(wspace=0.35)
plt.show()
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/fixed_subplots.png" />

# Legends

만약 하나의 subplot 에 여러 그래프를 그리게 된다면 뭐가 뭔지 모릅니다. 이를 위해 그래프 모서리에 작은 모달을 달아주는데, 이것이 바로 legend 입니다. `plt.legend()` 함수에 라벨을 달아줄 값의 배열을 전달하여 legend 를 달아줄 수 있습니다.

```python
plt.plot([0, 1, 2, 3, 4], [0, 1, 4, 9, 16])
plt.plot([0, 1, 2, 3, 4], [0, 1, 8, 27, 64])
plt.legend(['parabola', 'cubic'])
plt.show()
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/legend.png" />

또한 `.legend()` 함수는 `loc` 이란 keyword argument 를 받는데, legend 를 달아줄 위치를 지정할 수 있습니다.

|             |              |
| ----------- | ------------ |
| Number Code | String       |
| 0           | best         |
| 1           | upper right  |
| 2           | upper left   |
| 3           | lower left   |
| 4           | lower right  |
| 5           | right        |
| 6           | center left  |
| 7           | center right |
| 8           | lower center |
| 9           | upper center |
| 10          | center       |

**Note**: 만약 `loc` 값으로 아무것도 주지 않으면, 이는 'best'로 할당됩니다.

예를 들어, `loc` 값으로 6 을 주면 이는 center left 로 가운데 왼쪽에 달립니다.

```python
plt.legend(['parabola', 'cubic'], loc=6)
plt.show()
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/legend_loc.png" />

떄로는 `.legend()` 함수에 배열을 전달하는 것 보다 그냥 `.plot()` 함수에 `label` 옵션을 부여하는게 더 편할 때도 있습니다. 만약 이 방법으로 legend 를 달려면 꼭 `plt.legend()` 를 호출해주어야 합니다.

```python
plt.plot([0, 1, 2, 3, 4], [0, 1, 4, 9, 16],
         label="parabola")
plt.plot([0, 1, 2, 3, 4], [0, 1, 8, 27, 64],
         label="cubic")
plt.legend() # 꼭 호출해 주어야만 legend가 달립니다
plt.show()
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/legend.png" />

# Modify Ticks

지금까지는 모두 `plt` 모듈의 내장함수를 알아보았습니다. 만약 tick 을 수정하고자 한다면 조금 다른 방법으로 시도할 수 있습니다. 먼저 figure 는 여러 subplot 을 보유하기 때문에 tick 을 수정할 subplot 을 명시해야 합니다.

```python
ax = plt.subplot(1, 1, 1)
```

`ax` 는 axes 오브젝트로, 이를 활용해 특정 subplot(여기서는 1 행 1 열 1 번째 subplot)의 axes 를 수정할 수 있습니다. 만약 x-ticks 를 수정하고자 한다면 `ax.set_xticks()` 함수의 인자로 tick 배열을 넘겨주면 됩니다. 그런데 숫자가 아닌 특수한 label(i.e. string)을 달아주려면 `ax.set_xticklabels()` 함수의 인자로 배열을 넘겨주면 됩니다.

만약 x-ticks 를 1, 2, 그리고 4 로 수정하고 싶다면 다음과 같이 코드를 작성할 수 있습니다.

```python
ax = plt.subplot()
plt.plot([0, 1, 2, 3, 4], [0, 1, 4, 9, 16])
plt.plot([0, 1, 2, 3, 4], [0, 1, 8, 27, 64])
ax.set_xticks([1, 2, 4])
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/tick_marks.png" />

또한 y-ticks 도 마찬가지로 수정할 수 있습니다.

```python
ax = plt.subplot()
# 'o' 파라미터를 줌으로써 scatter 그래프를 그립니다
plt.plot([1, 3, 3.5], [0.1, 0.6, 0.8], 'o')
ax.set_yticks([0.1, 0.6, 0.8])
ax.set_yticklabels(['10%', '60%', '80%'])
```

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/y_ticks.png" />

# Figures

가끔은 `.plot()` 으로 그래프를 그려놓고 화면에 보여주지 않을 때가 있습니다. 만약 주의를 기울이지 않으면 해당 그래프는 다음 새로운 plot 에 나타날 수 있게 됩니다. 이를 예방하기 위해 새로운 그래프를 plot 하기 전 `plt.close('all')` 명령을 사용하면 기존에 존재하는 모든 그래프를 지우고 시작할 수 있습니다.

이전에는 하나의 figure 에 대해서 그래프를 그려보았는데, `plt.figure()` 함수로 새로운 figure 를 생성할 수 있습니다. 또한 `figsize` 옵션으로 `(width, height)` 튜플을 옵션으로 주면 figure 의 가로, 세로 길이(인치)를 지정할 수 있습니다.

```python
plt.figure(figsize=(4, 10))
```

위 코드는 아래와 같은 figure 를 생성합니다.

<img src="https://s3.amazonaws.com/codecademy-content/courses/matplotlib/tall_fig.png" />

이렇게 생성한 figure 는 `png`, `svg`, 또는 `pdf` 로 저장할 수 있습니다. `plt.savefig()` 함수는 해당 figure 를 저장할 때 지정할 파일 이름을 파라미터로 받아서 저장합니다.

```python
plt.figure(figsize=(4, 10))
plt.plot(x, parabola)
# 위 figure를 tall_and_narrow.png 로 저장합니다
plt.savefig('tall_and_narrow.png')
```

# Review

지금까지 Matplotlib 에서 제공하는 메서드로 여러 선 그래프를 그려보았습니다. 간단한 명령 몇 줄로 선 그래프를 이쁘게 그릴 수 있는 점이 좋은 것 같습니다. 이번 포스팅에서 배운 내용을 정리하면 다음과 같습니다.

- Creating a line graph from data
- Changing the appearance of the line
- Zooming in on different parts of the axis
- Putting labels on titles and axes
- Creating a more complex figure layout
- Adding legends to graphs
- Changing tick labels and positions
- Saving what you’ve made

다음 포스팅에서는 여러 종류의 그래프를 그리는 방법과 데이터를 시각화할 때 plot 의 종류를 선택하는 방법에 대해서 알아보도록 합시다 😀

# References

- [Codecademy](http://www.codecademy.com)
