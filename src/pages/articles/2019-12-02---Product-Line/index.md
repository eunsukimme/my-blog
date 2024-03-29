---
title: Production Line Analysis(생산 라인 분석) 개념 정리
description: "생산구성요소를 공정 순서에 따라 연속적으로 배치하는것을 생산 라인이라고 합니다. 이러한 생산 라인에 대한 개념과 생산 라인을 효율적으로 구성하는 절차에 대해서 알아봅시다."
date: '2019-12-02T02:40:00.000Z'
layout: post
category: System Management Engineering
tags:
  - TIL
  - Python
  - System Management Engineering
use_math: true
comments: true
---

# 생산 라인

생산 라인이란 생산구성요소를 공정순서에 따라 연속적으로 배치하는 것을 말합니다. 적은 비용으로 대량의 표준화 제품을 생산하는 것을 목표로 생산 라인을 선정하게 됩니다. 생산 라인의 성립 조건은 다음과 같습니다.

- 기본조건
  - 제품 등 대상물을 이동시킬 수 있음
  - 분업에 따라 공정이 몇 개로 분할 됨
- 경제조건
  - 라인편성 비용을 보상하는 충분한 수요/생산량
  - 안정적인 수요
  - 각 공정의 소요시간이 거의 같도록 편성(작업부하 균형)
- 충분조건
  - 라인이 정지하지 않도록 자재를 원활히 공급할 수 있음
  - 제품 표준화
  - 부품 호환성(Interchangeability)

이러한 생산 라인은 고정 경로로 작업의 흐름이 일정하다는 것과 분업으로 인한 대량 생산이 가능하다는 특징이 있습니다. 생산 라인의 장, 단점은 다음과 같습니다.

- 장점
  - 분업화로 인한 빠른 숙련; 전용 공구, 지그 채택; 미숙련자 채용 용이
  - 운반거리 단축
  - 동기화에 의한 낮은 WIP(LT)
  - 생산능력 파악, 공정관리 용이
- 단점
  - 라인별 기계설치로 인한 고 설비비
  - 기계 고장, 결근, 설변에 대한 융통성이 적음
  - 단조로운 업무로 인한 작업의욕 저하

생산라인은 I-line, L-line, U-line, S-line 등 여러가지 모양이 있습니다.

# 흐름 생산 라인

다음과 같은 생산 라인이 존재한다고 가정해 봅시다.

<img width="460" alt="Screen Shot 2019-12-01 at 10 58 41 PM" src="https://user-images.githubusercontent.com/31213226/69917655-992c4580-14ab-11ea-9b24-fcb6e87bce86.png">

위 그림에서 각 동그라미는 하나의 공정을 나타내고 있으며, 각 공정은 1명의 작업자가 담당한다고 가정해봅시다. 즉 여기서 작업자는 총 `6`명 입니다. 공정 아래의 숫자는 해당 공정을 처리하는데 걸리는 시간을 나타내고 있습니다. 이 생산 라인은 하루(평일)에 `8`시간 씩 돌아간다고하면 1주일에 `40`시간이 돌아가게 됩니다. 만약, 한 작업자가 여러 공정을 담당할 수 있고, 일주일간의 제품 수요가 4개라면 작업자는 총 몇 명이 필요할까요?

이를 알기 위해선 먼저 CT(Cycle Time)을 계산해야 합니다. Cycle Time은 Takt time이라고도 불리며, 생산 라인을 가동할 수 있는 가용시간을 제품 수요로 나눈 값을 나타냅니다. 즉, 주간 수요가 4개인 생산라인에서 가용 시간은 40이므로 CT를 다음과 같이 계산할 수 있습니다.

$$CT = \cfrac{가용시간}{수요} = \cfrac{40 hr}{4 units} = 10 hr$$

즉, 10시간마다 제품 1개를 만들어야 수요인 4개를 일주일만에 생산할 수 있습니다.

## 단위당(유효) 생산시간

한 작업장에서 작업하는 시간이 CT를 넘으면 위 수요를 충족하기 어렵습니다. 그러므로 수요를 충족하기 위해선 필요한 최소 작업장 수를 계산해야 합니다. 이는 총 생산시간을 CT로 나눈 값으로 손쉽게 구할 수 있습니다. 위 예에서 총 생산시간은 $5+3+3+6+5+5 = 27hr$이며, 이를 CT로 나눠주면 $\frac{27hr}{10hr} = 2.7$ 로 1명이 1작업장을 담당한다면 필요한 최소 작업장(자)는 약 `3`명으로 계산됩니다. 즉 `AB`, `CD`, `EF` 로 작업장을 구성할 수 있습니다.

## 편성 효율

<img width="460" alt="Screen Shot 2019-12-01 at 11 21 19 PM" src="https://user-images.githubusercontent.com/31213226/69917661-ad704280-14ab-11ea-965b-7c1a7a755b27.png">

위 그림과 같이 작업장을 3단위로 구성하였을 경우, 각 작업장별로 `8`, `9`, `10`시간이 들게 됩니다. 이를 Pitch TIme이라고도 부르며, 이를 다이어그램으로 나타내면 다음과 같습니다.

<img width="300" alt="Screen Shot 2019-12-01 at 11 21 29 PM" src="https://user-images.githubusercontent.com/31213226/69917664-ba8d3180-14ab-11ea-875a-622c37484717.png">

빨간색 부분은 Idle로 작업장이 작업장이 돌아가지 않고 쉬게 되는 시간을 나타냅니다. 이러한 시간이 적을 수록 생산 라인이 효율적일 것 입니다. 이렇게 구성한 생산라인이 얼마나 효율적인지를 판단하기 위한 척도로 line balance(라인 편성 효율)를 측정할 수 있습니다. 라인 편성 효율은 다음과 같이 나타낼 수 있습니다.

$$Line Balance = \cfrac{총 생산시간}{실제 CT \cdot 작업자 수} = \cfrac{27}{10 \cdot 3} = 0.9$$

위 생산 라인의 라인 편성 효율은 `0.9`로 나쁘지 않은 성능을 나타내고 있습니다. 그런데 다음과 같은 라인이 있다고 생각해 봅시다.

<img width="600" alt="Screen Shot 2019-12-01 at 11 32 12 PM" src="https://user-images.githubusercontent.com/31213226/69917670-caa51100-14ab-11ea-91ba-97b102455996.png">

위 그림에서 `작업장1`의 소요시간은 `5`분인 반면 `작업장 2`의 소요시간이 `25`분으로 큰 차이가 발생하고 있습니다. 라인 편성 효율은 `55%`로 매우 낮은 상태입니다. 이를 개선하려면 각 작업장별로 소요 시간을 고르게 분포시켜야 합니다.

<img width="600" alt="Screen Shot 2019-12-01 at 11 33 55 PM" src="https://user-images.githubusercontent.com/31213226/69917671-caa51100-14ab-11ea-9595-5c6ab47bcba8.png">

위 그림처럼 각 작업장별 소요 시간을 `15분`, `10분`으로 보다 균등하게 설정함으로써 라인 편성 효율을 약 `92%`까지 향상시킬 수 있습니다. 이처럼 생산 라인 편성의 목적은 라인 편성 효율을 높여서 생산성을 향상시키는데 있으며, 이를 위해서 여러가지 알고리즘을 접목시킬 수 있습니다.

## 생산 라인 편성 절차

생산 라인을 편성하는 절차를 다음과 같이 정리할 수 있습니다.

1. 조립작업 데이터 준비
   - 요소 작업 분할, 작업 시간, 작업별 선후관계, 수요량
2. 이론적 Cycle Time 및 최소 작업장 수 계산
   - 이론적 Cycle Time $CT_t = \cfrac{가용시간}{수요}$
   - 이론적 최소작업장 수 $N_t = \cfrac{T}{CT_t}$ ($T$ = 모든 작업 시간의 합)
3. 작업장에 작업 할당(라인 편성 알고리즘 적용)
4. Line Balance 효율 계산
   - LB 효율 = $\cfrac{T}{N_a \cdot CT_a}$ ($N_a$ = 실제 작업장 수, $CT_a$ = 실제 CT)
5. 3 ~ 4 단계 반복, 최고의 LB 효율 편성을 채택

# 라인 편성 문제

위에서 제시한 절차에 따라 생산 라인을 편성할 때 주어지는 데이터로는 다음과 같은 것들이 존재할 수 있습니다.

- `작업 내용`: 작업 시간을 알고 있는 요소 작업
- `Cycle Time`: 수요를 대응하기 위한 CT
- `작업 순서`: 각 요소작업의 선후 관계

위 데이터를 가지고 작업 내용을 작업자에게 편성해야 합니다. 이 때 최소의 작업자로 편성 효율을 최대화 하는 목적을 달성해야 합니다. 그런데 작업 편성 시 2가지 제약조건이 따르게 됩니다.

- `Cycle Time 제약`
- `작업의 선후관계(선후관계도, Precedence Diagram)`

## 선후관계도

선후 관계란 작업의 수행 순서에 따른 관계를 말합니다. 다음과 같은 선후 관계가 있다고 생각해봅시다.

<img width="460" alt="Screen Shot 2019-12-02 at 1 01 30 AM" src="https://user-images.githubusercontent.com/31213226/69917675-e4465880-14ab-11ea-8056-4e1ef0b5c3d4.png">

위 그림에서 선후 관계를 해석하면, C작업은 A작업 완료 후에 가능하고, D는 A작업과 B작업이 모두 완료되어야 작업이 가능합니다. C와 D는 선후관계가 없어 어느 것이 먼저 수행되어도 관계가 없습니다. 또한 A와 B는 가장 먼저 수행되어야 합니다. 이렇게 작업 간의 선후 관계를 나타내는 선후 관계도를 작성하면 작업 간의 순서를 한 눈에 파악할 수 있으며 이후의 조립 라인 밸런싱 작업을 수월하게 진행할 수 있습니다.

## 조립 라인 밸런싱

이제 위에서 작성한 선후 관계도와 Cycle Time을 바탕으로 작업장을 설계해야 합니다. 예를 들어 다음과 같은 선후 관계의 라인이 있다고 생각해봅시다.

<img width="400" alt="Screen Shot 2019-12-02 at 1 05 31 AM" src="https://user-images.githubusercontent.com/31213226/69917676-e4deef00-14ab-11ea-81b3-5f1383b998ac.png">

위 생산라인의 일일 가동 시간은 `400`분이고, 제품의 일일 수요량은 `80`개라고 하면 CT는 `400분/80개 = 5분/개` 로 계산할 수 있습니다. 최소 작업장 수는 총 생산시간을 CT로 나눈 값이므로 `13.1분/5분 = 2.6` 으로 반올림하여 최소 3개의 작업장이 필요하단것을 알 수 있습니다. 이렇게 필요한 정보를 모두 계산했고, 이제 효율을 최대화 시키는 생산 라인을 구성하면 됩니다. 위 생산 라인을 구성한 예로 다음과 같은 것들이 있을 수 있습니다.

<img width="720" alt="Screen Shot 2019-12-02 at 1 12 03 AM" src="https://user-images.githubusercontent.com/31213226/69917677-e4deef00-14ab-11ea-97be-e2a80e257636.png">

첫 번째 구성의 경우 `작업장1` 의 생산시간은 `5.7`, `작업장2` 는 `2.7`, `작업장3` 은 `4.7` 로 각 작업장 별 소요시간이 그다지 고르지 못한 구성입니다. 두 번째 구성의 경우도 그다지 좋은 구성은 아닙니다. 맨 오른쪽의 구성이 각 작업장 별 소요시간이 `4.2`, `4.2`, `4.7` 로 가장 고르게 구성되어 높은 효율을 나타내는 구성입니다.

그런데 이처럼 사람이 직접 일일이 그려가면서 가장 높은 효율을 나타내는 것을 찾는 일은 매우 비효율적입니다. 높은 효율의 라인 밸런싱을 구성하기위해 여러가지 알고리즘을 접목할 수 있습니다.

# 라인 밸런싱 알고리즘

라인 밸런싱 알고리즘을 간단히 나타내면 다음과 같습니다.

1. 새로운 작업장(자)를 추가한다
2. 모든 선행 작업이 충족된 작업들 중 CT를 만족하는 것들을 candidate로 갖는 List를 생성한다
3. List에 작업이 존재하면 아래의 LB 알고리즘을 적용하여 하나의 작업을 선택한 후 2 단계로 되돌아가고, List에 작업이 존재하지 않으면 4 단계로 넘어간다
   - `Largest Candidate(LC) Rule`: 생산 시간 큰 작업을 우선 배정
   - `Ranked Positional Weight(RPW) Rule`: RPW값이 큰 요소작업을 우선 배정. RPW는 자신 및 후행 작업의 작업 시간 합을 말함
   - `COMSOAL`(COmputer Method of Sequencing Operations for Assembly Line): 랜덤배정
4. 모든 작업이 배정될 때 까지 1 ~ 3 단계를 반복한다

이번 포스팅에서는 COMSOAL 알고리즘을 적용하여 직접 라인 밸런싱을 수행해보도록 하겠습니다. COMSOAL의 경우 최적해(최소작업자, 높은 효율)을 기억하고, 종료 조건을 만족할 때 까지 1 ~ 4 단계를 반복합니다. 종료 조건은 반복 획수 혹은 개선 없이 진행된 반복 횟수로 설정할 수 있으며 반복 종료 후 지금까지의 최적해를 선택합니다.

지금부터 COMSOAL 알고리즘으로 주어진 데이터를 바탕으로 효율적인 생산 라인을 구성해보도록 하겠습니다. 먼저 다음과 같은 선후 관계의 작업들이 존재한다고 가정해봅시다.

<img width="500" alt="Screen Shot 2019-12-02 at 1 26 54 AM" src="https://user-images.githubusercontent.com/31213226/69917678-e4deef00-14ab-11ea-9bce-674137c3f7ee.png">

위 작업들의 선후 관계를 선후 관게도로 나타내면 다음과 같습니다.

<img width="520" alt="Screen Shot 2019-12-02 at 1 28 13 AM" src="https://user-images.githubusercontent.com/31213226/69917679-e4deef00-14ab-11ea-9903-e669f6565bc4.png">

위 선후 관계를 바탕으로 COMSOAL 알고리즘으로 라인 밸런싱을 수행하면, 제일 먼저 난수를 생성합니다. 생성된 난수의 값에 따라서 후보 작업들(candidates)로부터 작업을 랜덤하게 선택합니다. 이러한 과정을 반복 수행하여 여러 solution, 즉 생산 라인들을 구성하고, 그 중에서 가장 좋은 해(높은 효율)를 갖는 구성을 선택합니다.

<img width="620" alt="Screen Shot 2019-12-02 at 1 35 07 AM" src="https://user-images.githubusercontent.com/31213226/69917680-e5778580-14ab-11ea-809f-41c4704c03bd.png">

## Python Implement

라인밸런싱 알고리즘을 Python 코드로 구현해봅시다. 먼저 다음과 같은 데이터(data.xlsx)가 존재한다고 가정해봅시다.

| index | 작업이름 | 선후관계표 | 작업시간 |
| :---- | :------- | :--------- | :------- |
| 0     | 1        | NaN        | 7        |
| 1     | 2        | NaN        | 5        |
| 2     | 3        | NaN        | 8        |
| 3     | 4        | 1          | 10       |
| 4     | 5        | 1          | 7        |
| 5     | 6        | 2          | 4        |
| 6     | 7        | 3          | 3        |
| 7     | 8        | 3          | 6        |
| 8     | 9        | 4          | 10       |
| 9     | 10       | 5,6        | 7        |
| 10    | 11       | 8          | 6        |
| 11    | 12       | 7,10       | 5        |
| 12    | 13       | 12         | 5        |
| 13    | 14       | 13         | 4        |
| 14    | 15       | 9,11,14    | 12       |
| 15    | 16       | 15         | 10       |
| 16    | 17       | 16         | 5        |
| 17    | 18       | 16         | 15       |
| 18    | 19       | 16         | 10       |
| 19    | 20       | 17         | 5        |
| 20    | 21       | 18,19,20   | 6        |

작업 수는 총 21개이며 총 작업 시간은 150분 입니다. 월 수요량은 320개이며 월 작업 가능 시간은 160시간(20일 \* 8시간)이라고 가정합시다. 위 정보들을 바탕으로 시간 당 수요량, CT, 최소 작업장 수를 계산하면 다음과 같습니다.

- 대당 총 작업 시간 $T_wc = 150min$
- 시간 당 생산 수요량 $R_p=\cfrac{320}{160hr}=2units/hr$
- CT $T_c=60/2=30$
- 최소 작업장 수 $w∗=\cfrac{150min}{30}=5$

### 데이터 불러오기

Pandas를 활용하여 위 데이터를 데이터 프레임으로 가져옵니다.

```python
df = pd.read_excel('data.xlsx')
```

### 선후 관계 파악

선후 관계를 만족하는 데이터들만 추출하도록 불리언 마스크를 생성하는 함수 `get_relation_boolean_mask()`를 작성합니다. 이 때 선후 관계가 NaN인 것들은 무조건 True를 반환하도록 해줍니다. 이 함수는 파라미터로 현재까지 완료된 작업을 저장하는 `successful_candidates` 와 작업장 별 누적 작업 시간인 `cumulative_time` 을 전달받습니다.

```python
def get_relation_boolean_mask(successful_candidates, cumulative_time):
    # 제일 먼저 선후 관계를 만족한 데이터들을 추출합니다
    # 각 행을 조사해서 선후관계표에 포함된 번호들이 모두 succsesful_candidate에 포함되었는지 확인합니다
    # 만약 그렇다면 True를, 아니면 False를 리턴한다
    candidates_satisfy_relation = df.iloc[3:].apply(lambda row: True if
        all([ int(num) in successful_candidates for num in str(row['선후관계표']).split(',') ])
        else False, axis=1 )
    # 선후관계가 존재하지 않는 작업은 무조건 True이므로 3개의 True 값을 포함하는 Series를 결합해줍니다
    candidates_satisfy_relation = pd.concat([pd.Series([True, True, True]), candidates_satisfy_relation], axis=0)

    return candidates_satisfy_relation
```

### 조건을 만족하는 작업 목록 추출

위에서 선후 관계를 파악하여 얻은 불리언 마스크와 함께 이미 수행된 작업은 아닌지, 누적 작업 시간이 CT를 초과하진 않는지를 체크하는 함수 `make_candidates()`를 작성합니다. 이 함수도 `get_relation_boolean_mask()` 와 동일한 파라미터를 갖습니다.

```python
def make_candidates(successful_candidates, cumulative_time):
    candidates = df[
        # 이미 수행된 작업이 아니고(작업 이름이 successful_candidates에 존재하지 않고)
        [ name not in successful_candidates for name in df['작업이름'] ]
        # 누적 작업 시간이 CT를 넘지 않으며
        & (cumulative_time + df['요소작업시간'].values <= CT_a)
        # 선후관계를 만족하는 데이터들을 모두 가져옵니다
        & get_relation_boolean_mask(successful_candidates, cumulative_time)
    ]

    return candidates
```

### 랜덤으로 작업 선정

조건을 만족하는 작업들 중에서 하나의 작업을 선정하기 위해 `0 ~ 작업 수` 사이에서 균일한 분포 정수형 난수를 하나 생성하고, 그 난수를 index로 사용하여 특정 작업을 선택하는 함수 `select_candidate()` 함수를 작성합니다. 이 함수는 파라미터로 `make_candidate()` 함수의 리턴값인 조건을 만족하는 작업으로 구성된 `candidates` 와 현재 작업장에 배치된 작업을 저장하는 배열인 `stations` 를 받습니다.

```python
def select_candidate(candidates, stations):
    global total_candidates, successful_candidates, cumulative_time
    # 이 난수는 주어진 값을 동일한 분포로 랜덤하게 생성합니다
    # 생성된 난수는 선택할 작업의 이름을 나타냅니다
    r = np.random.randint(1, len(candidates)+1, 1)[0]

    successful_candidates.append(candidates.iloc[r-1]['작업이름'])
    cumulative_time += candidates.iloc[r-1]['요소작업시간']

    total_candidates.append(candidates.iloc[r-1]['작업이름'])
    stations.append(candidates.iloc[r-1]['작업이름'])
```

### 라인밸런싱 반복 수행

위에서 작성한 함수들을 반복적으로 호출하여 여러 생산 라인을 구성하고, 효율을 비교하는 반복문을 작성합니다.

```python
print('-'*20 + ' COMSOAL LINE BALANCING ' + '-'*20)
# COMSOAL 알고리즘을 5번 반복합니다
for test in range(5):
    # 현재까지 완료된 작업들을 저장하는 빈 배열을 만듭니다
    successful_candidates = []
    # 완료된 작업들을 모두 저장하는 배열을 만듭니다
    total_candidates = []
    # 실제 CT는 0으로 초기화합니다
    CT_a = 0
    print('-'*64)
    print(f'test#{test}')
    # 모든 작업장에 작업이 배치될 때 까지 반복한다
    # 즉, total_candidates의 길이와 df의 길이가 동일해질 때 까지 반복합니다
    i = 1
    while len(total_candidates) < len(df):
        # 작업 시간 누산기를 생성합니다. 작업장 별 누적 작업 시간을 저장하고 CT와 비교합니다
        cumulative_time = 0
        # 조건을 만족하는 작업 목록을 추출하여 candidates에 저장합니다
        candidates = make_candidates(successful_candidates, cumulative_time)
        # 해당 작업장 별 작업을 저장하는 배열을 생성합니다
        stations = []
        # 조건을 만족하는 작업들 중에서 랜덤하게 작업을 선택해나가고,
        # 더이상 조건을 만족하는 작업이 존재하지 않을 때 까지 반복합니다
        while len(candidates) > 0:
            # 난수를 생성하여 candidates들 중에서 하나의 작업을 랜덤하게 선정합니다
            select_candidate(candidates, stations)
						# 선택된 작업을 완료하면, 선행 관계가 새롭게 구성되므로
            # 조건을 만족하는 작업들을 새롭게 candidates에 저장합니다
            candidates = make_candidates(successful_candidates, cumulative_time)
        CT_a = max(CT_a, cumulative_time)
        print(f'station {i} = {stations}, time = {cumulative_time}')
        i += 1
    print(f'편성 효율: {150/((i-1) * CT_a)}')
```

위 코드를 수행한 결과는 다음과 같습니다.

```python
'''
-------------------- COMSOAL LINE BALANCING --------------------
----------------------------------------------------------------
test#0
station 1 = [2, 3, 6, 7, 8], time = 26
station 2 = [1, 4, 11, 5], time = 30
station 3 = [10, 12, 9, 13], time = 27
station 4 = [14, 15, 16], time = 26
station 5 = [19, 17, 18], time = 30
station 6 = [20, 21], time = 11
편성 효율: 0.8333333333333334
----------------------------------------------------------------
test#1
station 1 = [3, 1, 7, 8, 2], time = 29
station 2 = [4, 6, 5, 10], time = 28
station 3 = [9, 12, 11, 13, 14], time = 30
station 4 = [15, 16, 17], time = 27
station 5 = [20, 18, 19], time = 30
station 6 = [21], time = 6
편성 효율: 0.8333333333333334
----------------------------------------------------------------
test#2
station 1 = [1, 4, 3, 7], time = 28
station 2 = [2, 5, 8, 9], time = 28
station 3 = [11, 6, 10, 12, 13], time = 27
station 4 = [14, 15, 16], time = 26
station 5 = [17, 20, 19], time = 20
station 6 = [18, 21], time = 21
편성 효율: 0.8928571428571429
----------------------------------------------------------------
test#3
station 1 = [2, 1, 5, 3, 7], time = 30
station 2 = [6, 4, 8, 10], time = 27
station 3 = [9, 12, 13, 11, 14], time = 30
station 4 = [15, 16, 17], time = 27
station 5 = [18, 20, 19], time = 30
station 6 = [21], time = 6
편성 효율: 0.8333333333333334
----------------------------------------------------------------
test#4
station 1 = [1, 2, 4, 3], time = 30
station 2 = [9, 7, 5, 8, 6], time = 30
station 3 = [11, 10, 12, 13, 14], time = 27
station 4 = [15, 16, 17], time = 27
station 5 = [20, 18, 19], time = 30
station 6 = [21], time = 6
편성 효율: 0.8333333333333334
'''
```

test#2 일 때 편성 효율이 약 `0.9` 로 가장 높게 나온 것을 확인할 수 있습니다.

# Review

지금까지 생산 라인이 무엇이고 편성 과정은 어떠하며 밸런싱을 맞추기 위한 방법들에는 어떤 것들이 있는지 알아보았습니다. 또 이번 포스팅에서는 COMSOAL알고리즘으로 실제 동작하는 라인 밸런싱 코드를 작성해보았습니다. 그리하여 라인 밸런싱을 통해 높은 효율의 생산 라인을 구성할 수 있었습니다. 그런데 사실 100% 효율의 라인밸런싱을 맞추기는 매우 어렵습니다. 작업은 무한히 분할되지 않으며, 각 자원은 고유의 작업이 있고 작업 시간 또한 상이하기 때문입니다. 특히 가공 라인에서는 고장, PM, 가동률, 로트 등 여러 특성이 다른 것과 제품 조함(Product Mix)가 수시로 변하기 때문에 100%에 가까운 라인밸런싱을 구성하기는 매우 어렵습니다. 모쪼록 산업경영분야에서 소프트웨어를 도입하는 부분도 참 재미있는 것 같습니다.

# Reference

- Work Systems and the Methods, Measurement, and Management of Work by Mikell P. Groover
