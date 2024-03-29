---
title: Pandas에서 column다루기
description: Pandas에서 컬럼을 추가하고, 컬럼 상에서 연산하고, 컬럼에 lambda함수를 적용하며 이름을 변경하는 방법에 대해서 알아봅시다
date: '2019-09-26T00:00:00.000Z'
layout: post
category: Data Science
tags:
  - TIL
  - Python
  - Data Science
  - Pandas
comments: true
---

# 컬럼 추가하기(Adding a Column)

기존에 존재하는 *DataFrame*에 column 을 추가할 수도 있습니다. 예를 들어 다음과 같은 *DataFrame*이 있다고 가정해 봅시다.

| Product ID | Product Description | Cost to Manufacture | Price |
| ---------- | ------------------- | ------------------- | ----- |
| 1          | 3 inch screw        | 0.50                | 0.75  |
| 2          | 2 inch nail         | 0.10                | 0.25  |
| 3          | hammer              | 3.00                | 5.50  |
| 4          | screwdriver         | 2.50                | 3.00  |

위 *DataFrame*에 수량을 나타내는 Quantity 필드를 추가하고 싶다면 다음과 같이 코드를 작성할 수 있습니다. 추가하고 싶은 필드를 *DataFrame*의 key 로 하여 같은 길이의 배열을 할당해 주면 됩니다.

```python
df['Quantity'] = [100, 150, 50, 35]	# 순서대로 100, 150, 50, 35가 할당됩니다.
```

모든 값을 동일하게 할당해도 된다면 다음과 같이 간단하게 작성할 수도 있습니다.

```python
df['In Stock?'] = True	# 모두 True로 할당됩니다.
```

또한 기존에 존재하는 column 을 활용하여 연산한 결과를 할당할 수도 있습니다.

```python
df['Sales Tax'] = df.Price * 0.075	# 각 Price에 0.075를 곱한 값이 할당됩니다.
```

# 컬럼 상에서 연산하기(Performing Column Operations)

곱셈과 같은 단순한 연산 외에도 기존에 존재하는 column 을 활용하여 여러가지 연산을 수행할 수도 있습니다. 다음과 같은 *DataFrame*이 있다고 가정해봅시다.

| Name       | Email                                               |
| ---------- | --------------------------------------------------- |
| JOHN SMITH | [john.smith@gmail.com](mailto:john.smith@gmail.com) |
| Jane Doe   | [jdoe@yahoo.com](mailto:jdoe@yahoo.com)             |
| joe schmo  | [joeschmo@hotmail.com](mailto:joeschmo@hotmail.com) |

위 *DataFrame*에서 Name 속성의 값의 case 가 제각각이라 조금 annoying 합니다. `apply` 함수를 사용하면 특정 컬럼의 값에 함수를 적용할 수 있습니다.

```python
df['Name'] = df.Name.apply(lambda name: name.upper())
```

결과는 다음과 같습니다.

| Name       | Email                                               |
| ---------- | --------------------------------------------------- |
| JOHN SMITH | [john.smith@gmail.com](mailto:john.smith@gmail.com) |
| JANE DOE   | [jdoe@yahoo.com](mailto:jdoe@yahoo.com)             |
| JOE SCHMO  | [joeschmo@hotmail.com](mailto:joeschmo@hotmail.com) |

# 컬럼에 Lambda 함수 적용하기(Applying a Lambda to a Column)

Pandas 를 활용할 때 column 에 대한 연산을 수행할 때 Lambda 를 많이 활용하게 됩니다. 다음과 같은 *DataFrame*이 있다고 가정해 봅시다.

| Name       | Email                                               |
| ---------- | --------------------------------------------------- |
| JOHN SMITH | [john.smith@gmail.com](mailto:john.smith@gmail.com) |
| Jane Doe   | [jdoe@yahoo.com](mailto:jdoe@yahoo.com)             |
| joe schmo  | [joeschmo@hotmail.com](mailto:joeschmo@hotmail.com) |

우리는 사용자의 Email 의 Provider 를 추출하기 위해 다음과 같은 코드를 작성할 수 있습니다.

```python
df['Email Provider'] = df.Email.apply(
    lambda x: x.split('@')[-1]
  )
```

결과는 다음과 같습니다.

| Name       | Email                                               | Email Provider |
| ---------- | --------------------------------------------------- | -------------- |
| JOHN SMITH | [john.smith@gmail.com](mailto:john.smith@gmail.com) | gmail.com      |
| Jane Doe   | [jdoe@yahoo.com](mailto:jdoe@yahoo.com)             | yahoo.com      |
| joe schmo  | [joeschmo@hotmail.com](mailto:joeschmo@hotmail.com) | hotmail.com    |

# 여러 컬럼에 Lambda 함수 적용하기(Applying a Lambda to a Row)

지금까진 `df.columnName.apply`로 특정 column 에 대해 연산을 수행했는데, column 을 명시하지 않고 `apply` 함수를 호출하고 `axis=1` 옵션을 부여함으로써 lambda 함수의 input 을 전체 row 로 줄 수 있습니다. 다음과 같은 *DataFrame*이 있다고 가정해 봅시다.

| Item         | Price | Is taxed? |
| ------------ | ----- | --------- |
| Apple        | 1.00  | No        |
| Milk         | 4.20  | No        |
| Paper Towels | 5.00  | Yes       |
| Light Bulbs  | 3.75  | Yes       |

Is taxed? 필드의 값이 'Yes'인 row 에 대해서 7.5% 를 더한 가격을 새 컬럼 'Price with Tax'에 추가하고 싶다고 생각해 봅시다. 코드는 다음과 같이 작성할 수 있습니다.

```python
df['Price with Tax'] = df.apply(lambda row:
     row['Price'] * 1.075
     if row['Is taxed?'] == 'Yes'
     else row['Price'],
     axis=1
)
```

# 컬럼 이름 변경하기(Renaming Columns)

Column 의 이름을 변경하고 싶다면 *DataFrame*의 `.columns` 속성을 참조하여 변경할 수 있습니다. 코드는 다음과 같이 작성할 수 있습니다.

```python
df = pd.DataFrame({
    'name': ['John', 'Jane', 'Sue', 'Fred'],
    'age': [23, 29, 21, 18]
})
df.columns = ['First Name', 'Age']
```

위 방법은 모든 column 의 이름을 새로 설정할 때 유용합니다. 그러나 특정 column 의 이름만 변경하고 싶다면 위 방법은 실수를 유발하기 쉬우므로 다음과 같이 `.rename` 함수를 사용합니다.

```python
df = pd.DataFrame({
    'name': ['John', 'Jane', 'Sue', 'Fred'],
    'age': [23, 29, 21, 18]
})
df.rename(columns={
    'name': 'First Name',
    'age': 'Age'},
    inplace=True)
```

`rename` 함수는 원본 *DataFrame*을 그대로 둔 채 새로운 *DataFrame*을 반환하기에, `inplace=True` 옵션을 부여함으로써 새로운 *DataFrame*을 만들지 않고 원본 *DataFrame*을 수정할 수 있습니다.

# Review

이번 포스팅에서는 기존에 존재하는 *DataFrame*을 수정하는 방법에 대해서 알아보았습니다. 배운 내용을 정리하면 다음과 같습니다.

- Adding columns to a DataFrame
- Using lambda functions to calculate complex quantities
- Renaming columns

계속해서 공부를 합시다!🔥

# References

- [Codecademy](http://www.codecademy.com)
