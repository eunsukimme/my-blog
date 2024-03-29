---
title: Naive Bayse(나이브 베이즈) 개념 정리
description: "베이즈 정리를 바탕으로 임의의 데이터 포인트가 주어졌을 때 특정 클래스로 예측될 확률을 계산하는 나이브 베이즈 모델에 대해서 알아봅시다"
date: '2019-12-03T02:00:00.000Z'
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

Naive Bayes는 베이즈 정리를 활용한 지도 학습 분류 모델입니다. 베이즈 정리는 [데이터 과학을 위한 확률 한 번에 이해하기](https://eunsukimme.github.io/data%20science/2019/09/16/Data-anlysis-probability/)에서 언급한 적이 있습니다. 베이즈 정리를 다시 짚고 넘어가면, 특정 사건 B가 $B_1, B_2, ..., B_n$로 분할되고 $B$가 주어졌을 때 사건 $A$ 가 발생할 확률을 다음과 같이 나타낼 수 있습니다.

$$P(A|B) = \cfrac{P(B|A) \cdot P(A)}{P(B)}$$

위 식에서 $B$를 임의의 데이터 포인트로, $A$ 를 클래스로 생각해보면 임의의 데이터 포인트가 주어졌을 때 특정 클래스로 예측될 확률로 이해할 수 있습니다. 예를 들어, 주어진 이메일이 스팸인지 아닌지를 예측한다고 가정해봅시다. 그러면 `P(스팸|이메일)` 과 `P(not 스팸|이메일)` 인 확률을 계산하여 더 높은 값이 나타나는 클래스로 예측할 수 있습니다.

이러한 원리로 나이브 베이즈 모델은 베이즈 정리를 바탕으로 임의의 데이터가 특정 클래스에 속할 확률을 계산합니다. 나이브 베이즈 모델은 주로 텍스트 분류 모델로 자주 활용됩니다. 그런데 왜 나이브 베이즈가 지도 학습 모델에 속하는 것일까요? 베이즈 정리를 활용하여 확률을 계산하기 위해선 먼저 라벨링된 데이터가 필요합니다. 즉, 스팸 필터를 예로 들면 `P(스팸)` 을 계산해야 하는 것입니다. 이는 전체 이메일 수신함에서 스팸 메일이 무엇인지 일일이 라벨링된 데이터셋을 필요로 합니다.

이번 포스팅에서는 나이브 베이즈 분류 모델에 대해서 알아보도록 합시다. 이 때 사용할 데이터는 [Amazone product review](http://jmcauley.ucsd.edu/data/amazon/)를 활용할 것입니다. 위 리뷰 데이터를 나이브 베이즈 모델에 전달한 뒤 얼마나 많은 리뷰가 긍정적이고, 부정적인지를 분석해봅시다.

# Investigate the Data

아마존 리뷰 중에서도 baby product의 리뷰를 활용하도록 하겠습니다. 위 사이트에 들어가서 Baby 데이터셋을 다운로드 받아서 압축을 풀면 다음과 같은 key-value들로 구성된 json파일을 얻을 수 있습니다.

```json
{
  "reviewerID": "A1HK2FQW6KXQB2",
  "asin": "097293751X",
  "reviewerName": "Amanda Johnsen \"Amanda E. Johnsen\"",
  "helpful": [0, 0],
  "reviewText": "Perfect for new parents. We were able to keep track of baby's feeding, sleep and diaper change schedule for the first two and a half months of her life. Made life easier when the doctor would ask questions about habits because we had it all right there!",
  "overall": 5.0,
  "summary": "Awesine",
  "unixReviewTime": 1373932800,
  "reviewTime": "07 16, 2013"
}
...
```

위에서부터 리뷰 작성자 ID, 품목 ID, 리뷰 작성자 이름, 리뷰 추천/비추천 수, 리뷰 내용, 별점, 리뷰 요약, 리뷰를 작성한 시각(unixtime), 리뷰 작성 시각을 나타냅니다.

## Import & Sample Data

위 데이터는 약 16만개로, 상당히 큰 데이터이므로 연산량을 간단히하기 위해 긍정/부정 리뷰를 `1000`개 씩 총 `2000`개의 데이터를 추출하도록 하겠습니다. 이 때 `overall` 이 `4`보다 작은 것은 모두 부정, `4`보다 큰 것은 모두 긍정으로 분류하도록 합니다.

```python
import pandas as pd
import numpy as np
# 저장한 Amazone Baby Product Reviews 데이터를 불러옵니다
df = pd.read_json('reviews_Baby_5.json', lines=True, encoding='utf-8')
print(len(df))	# 160792
# 부정/긍정 데이터를 분리합니다
negative_reviews = df[ df['overall'] < 4 ]
positive_reviews = df[ df['overall'] >= 4 ]
# 부정/긍정 데이터를 각 1000개씩 추출합니다
neg_samples = negative_reviews.sample(n=1000, replace=False)
pos_samples = positive_reviews.sample(n=1000, replace=False)
```

## Count Word Frequency

다음으로 추출한 데이터에서 필요로하는 부분은 바로 실제 리뷰 내용이므로 `reviewText` 컬럼만 추출하여 `neg_list`, `pos_list` 에 저장하도록 하겠습니다.

```python
neg_list = neg_samples['reviewText'].values.tolist()
pos_list = pos_samples['reviewText'].values.tolist()
```

또 부정/긍정 리뷰에 포함되는 데이터의 빈도수를 저장하는 Counter 객체를 생성하도록 하겠습니다. 먼저 긍정 리뷰에 포함된 단어의 빈도수를 저장하는 Counter 객체를 생성하고 `pos_counter` 에 저장합니다. 아래 코드는 `pos_counter` 만 생성하는 것이며 같은 방법으로 `neg_counter` 를 생성하면 됩니다.

```python
# 각 리뷰를 word 별로 split합니다
temp = []
temp.extend([sentence.split(' ') for sentence in pos_list])
# split된 각 리뷰를 flatten하게 만듭니다
pos_words = []
for sublist in temp:
    for item in sublist:
        pos_words.append(item)
# flatten 한 words 배열을 Counter 객체에 전달하여 단어별 빈도수를 저장합니다
pos_counter = Counter(pos_words)
```

이론적으로 긍정적인 리뷰보다 부정적인 리뷰에 `no` 키워드가 더 많이 포함될 것이라고 예상할 수 있습니다. 실제로 그런지 다음과 같이 테스트할 수 있습니다.

```python
print(pos_counter['no'])	# 161
print(neg_counter['no'])	# 188
```

# Bayes Theorem

지금부터는 `This crib was amazing` 이란 리뷰의 긍정/부정을 분류하는 나이브 베이즈 모델을 만들어보도록 하겠습니다. 계산해야 하는 확률은 `P(positive | review)` 과 `P(negative | review)` 이며 둘 중 어느것이 더 큰지 비교해야합니다. 이를 위해 먼저 `P(positive | review)` 에 베이즈 정리를 적용한 수식을 보면 다음과 같습니다.

$$P(positive | review) = \cfrac{ {P(review | positive)} \cdot P(positive) }{P(review)}$$

## Positive & Negative Rate

제일 먼저 계산할 것은 `P(positive)` 입니다. 우리는 위에서 긍정/부정 리뷰를 각 1000개씩 추출하였으니 이는 `0.5` 가 됩니다. 마찬가지로 `P(negative)` 도 `0.5` 가 됩니다.

```python
percent_pos, percent_neg = 0.5, 0.5
```

## Probability of Review Given Positive

다음으로 계산할 것은 `P(review | positive)` 입니다. 이 값은 주어진 리뷰가 긍정적일 때, `This`, `crib`, `was`, 그리고 `amazing` 총 4가지 단어들만이 존재할 확률을 의미합니다. 이 값을 계산하기 위해선 각 단어들이 모두 독립적이라는 가정이 필요합니다. 이는 하나의 단어가 다음 단어가 나타나는 사건에 대해 영향을 미치지 않는다는 것입니다. 이러한 가정을 하게 되면 각 단어들이 나타나는 사건은 독립 사건이므로 확률을 다음과 같이 계산할 수 있습니다.

$$P("This~crib~was~amazing" | positive) = P("This" | positive) \cdot P("crib" | positive) \cdot P("was" | positive) \cdot P("amazing" | positive)$$

이 때 `P("This" | positive)` 는 `This` 가 긍정적인 리뷰에 나타날 확률을 의미합니다. 이를 계산하기 위해선 전체 긍정적인 리뷰에서 `This` 가 나타난 빈도수를 구하고, 이를 긍정적인 리뷰에 포함된 전체 단어 수로 나누어주면 됩니다. 결국 `This` 단어가 긍정적인 리뷰에서 나타날 확률은 다음과 같이 구할 수 있습니다.

$$P("This" | positive) = \cfrac{number~of~"This"~in~positive}{number~of~words~in~positive}$$

각 단어에 대해 위 확률을 계산하고 모두 곱해주면 `P(review | positive)` 를 계산할 수 있습니다. 이 때 단어가 기존의 리뷰에 존재하지 않을 수 있습니다. 이 경우 분자가 `0` 이 되버려서 다른 모든 확률과 곱해질 때 영향을 미치기 때문에 이를 방지하고자 분자에 `1` 을 더해줄 수 있습니다. 또한 분모에는 전체 부정/긍정 리뷰 데이터셋에서 나타는 unique한 단어의 수 `N` 을 더해줍니다. 이러한 방법을 _Smoothing_ 이라고 합니다.

```python
review = "This crib was amazing"
total_pos = sum(pos_counter.values())	# 긍정 리뷰에 포함된 전체 단어 수
total_neg = sum(neg_counter.values())	# 부정 리뷰에 포함된 전체 단어 수
review_appear_in_pos_prob = 1	# P(review | positive)
review_appear_in_neg_prob = 1 # P(review | negative)
# 각 단어가 부정/긍정 리뷰에 나타날 확률을 계산하고 연속적으로 곱해줍니다
for word in review.split(' '):
    review_appear_in_pos_prob *= (pos_counter[word] + 1) / (total_pos + len(pos_counter))
    review_appear_in_neg_prob *= (neg_counter[word] + 1) / (total_neg + len(neg_counter))

print(review_appear_in_pos_prob)	# 5.895825521028269e-13
print(review_appear_in_neg_prob)	# 1.0430004646192789e-13
```

# Classify

이제 남은 것은 `P(review)` 뿐입니다. 이 값은 `This`, `crib`, `was`, 그리고 `amazing` 총 4개의 단어들만 리뷰에서 나타날 확률을 의미합니다. 이는 위에서 계산한 `P(review | positive)` 와 매우 유사하지만 주어진 리뷰가 긍정적이라고 가정하지 않는다는 차이점을 갖습니다.

그런데 `P(review)` 를 계산하기 전에 잠깐 생각해봅시다. 우리의 궁극적인 목표는 임의의 리뷰가 주어졌을 때 해당 리뷰가 긍정적인지 부정적인지를 알고싶다는 것입니다. 즉, `P(positive | review)` 와 `P(negative | review)` 둘 중에 어느 값이 더 큰지 확인하고 싶다는 것입니다. 두 확률을 계산하는 수식을 풀어쓰면 다음과 같습니다.

$$P(positive | review) = \cfrac{P(review | positive) \cdot P(positive)}{P(review)}$$

$$P(negative | review) = \cfrac{P(review | negative) \cdot P(negative)}{P(review)}$$

비교하고자 하는 두 값의 분모가 `P(review)` 로 동일합니다. 즉, 똑같은 값 `P(review)` 를 계산해서 나누어줄 필요 없이 그냥 무시해버리면 되는 것입니다. 그러므로 `P(review)` 를 계산해서 나누어주는 부분을 생략할 수 있으며, 지금까지 계산 정보를 바탕으로 주어진 리뷰가 긍정적인지 부정적인지를 판단할 수 있게 됩니다.

```python
final_pos = review_appear_in_pos_prob * percent_pos
final_neg = review_appear_in_neg_prob * percent_neg
print(final_pos)	# 2.9479127605141343e-13
print(final_neg)	# 5.2150023230963945e-14
```

최종 확률을 계산한 결과 `final_pos` 가 더 크므로 `This crib was amazing` 이란 리뷰는 긍정적인 것으로 예측되었습니다. 다른 여러 문장을 입력해서 결과를 비교해보면 은근히 재밌습니다..😅

# Formatting Data for scikit-learn

지금까지 순수하게 수식을 활용하여 나이브 베이즈 분류 모델을 구현하였습니다. 그러나 Scikit-learn 라이브러리를 활용하면 코드의 양을 훨씬 줄일 수 있습니다. Scikit-learn의 나이브 베이즈 모델을 활용하기 위해선 먼저 데이터를 scikit-learn이 활용할 수 있는 형태로 transform해주어야 합니다. 이를 위해 scikit-learn에서 제공하는 `CountVectorizer` 객체를 사용할 것입니다.

먼저 `CountVectorizer` 객체를 생성하고 training set으로 vocabulary를 학습시킵니다. 다른 모델들과 마찬가지로 `.fit()` 메서드를 활용하여 학습시킵니다.

```python
from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer()
vectorizer.fit(neg_list + pos_list)
```

Vectorizer를 학습시킨 뒤 `.transform()` 메서드를 호출할 수 있습니다. `.transform()` 메서드는 문자열의 배열을 받아서 학습된 단어들의 갯수로 변환합니다.

```python
training_counts = vectorizer.transform(neg_list + pos_list)
print(training_counts.shape)	# (2000, 9031)
```

위 코드를 실행하면 `training_counts`는 `[0, 0, 0, ... 0, 0, 0]` 으로 구성된 2차원 배열을 저장하게 됩니다. 이는 학습된 단어들을 바탕으로 training set에서 나타난 단어들의 빈도수를 저장한 배열입니다. `training_counts` 의 shape이 `2000 x 9031` 인 것으로보아 학습된 단어는 총 `9031`개인것을 알 수 있습니다. `training_counts` 의 index는 학습 단어들과 관계가 있으며, index에 해당하는 값은 해당 단어의 빈도수를 나타냅니다. 이는 `vectorizer.vocabulary_` 를 출력함으로써 확인할 수 있습니다. 다음과 같이 특정 단어와 해당 단어의 index를 key-value로 갖는 오브젝트를 나타냅니다.

```python
{'we': 8733, 'have': 3681, 'the': 7966, 'twig': 8329, 'accessory': 239, ... }
```

이제 이렇게 생성한 `counts` 를 나이브 베이즈 모델의 입력으로 전달함으로써 scikit-learn 에서 제공하는 모델을 사용할 수 있습니다!

# Using scikit-learn

위에서 vectorizer로 데이터를 올바르게 변형하였으니 이제 scikit-learn에서 제공하는 `MultinomialNB`를 활용할 수 있습니다. 역시 `.fit()` 메서드로 학습시킬 수 있으며 파라미터로 데이터 포인트 배열(위에서 만든 `counts` 객체)과 각 데이터의 라벨을 전달해야 합니다.

모델이 학습된 후 `.predict()` 메서드에 임의의 데이터 포인트 배열을 전달하여 클래스를 예측할 수 있습니다. 또한 `.predict_proba()` 함수는 주어진 데이터가 특정 클래스에 속할 확률을 리턴합니다. 이제 나이브 베이즈 분류 모델을 생성해서 주어진 리뷰가 긍정인지 부정인지 예측해봅시다.

```python
review_counts = vectorizer.transform([review])
# MultinomialNB 분류 모델을 생성합니다
classifier = MultinomialNB()
# 위에서 fit, transform 해줄 때 neg_list + pos_list로 연결해주었으므로
# 앞의 1000개는 0(부정), 두의 1000개는 1(긍정)으로 라벨링합니다
training_labels = [0] * 1000 + [1] * 1000
# 학습을 시키고 결과를 확인합니다
classifier.fit(training_counts, training_labels)
print(classifier.predict(review_counts))	# [1]
print(classifier.predict_proba(review_counts))	# [[0.23763542 0.76236458]]
```

`This crib was amazing` 이란 리뷰는 약 `0.76` 의 확률로 1(긍정적)으로 예측되었습니다! training_set이 많은 것도 아니지만 꽤나 정확히 에측하고 있단 걸 확인할 수 있습니다.

# Review

지금까지 베이즈 정리에 기반한 나이브 베이즈 분류 모델에 대해서 알아보았습니다. 위 모델에서는 training set에 구두점과 문장부호가 포함되는데 이를 제거하고 case를 통일시켜 줌으로써 성능을 더욱 향상시킬 수 있습니다. 또한 하나의 단어들을 사용하는 것이 아닌 두 가지(bigram) 또는 세 가지(trigram) 연속된 단어를 사용함으로써(i.e. `This crib`, `crib is`, `is amazing`) 단어 간의 독립성이 존재한다는 가정을 더 합리적으로 만들 수 있습니다. 이러한 기법들은 NLP(Natural Language Processing)분야에서 주로 다루는 기법들입니다. 이번 포스팅에서 배운 내용을 정리하면 다음과 같습니다.

- A tagged dataset is necessary to calculate the probabilities used in Bayes’ Theorem.
- In this example, the features of our dataset are the words used in a product review. In order to apply Bayes’ Theorem, we assume that these features are independent.
- Using Bayes’ Theorem, we can find `P(class|data point)` for every possible class. In this example, there were two classes — positive and negative. The class with the highest probability will be the algorithm’s prediction.

# References

- [Codecademy](http://www.codecademy.com)
