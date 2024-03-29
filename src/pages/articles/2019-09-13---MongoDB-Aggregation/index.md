---
title: MongoDB Aggregation이란
description: 'MongoDB Aggregation에 대해서 알아봅시다'
date: '2019-09-13T00:00:00.000Z'
layout: post
draft: false
category: 'Database'
tags:
  - Database
  - MongoDB
  - Aggregation
---

이번 포스팅은 MongoDB 의 Aggregation 에 대해서 알아봅시다. **MongoDB Aggregation 은 여러 document 들을 grouping 하여 연산을 수행한 후 하나의 result 를 반환하는 연산입니다.** MongoDB 는 다음과 같은 세가지 방법의 Aggregation 을 제공합니다.

1. Aggregation Pipeline

2. Map-Reduce function

3. single purpose aggregation method

처음부터 차근차근 살펴봅시다.

# Aggregation pipeline

MongoDB 의 Aggregation framework 는 data processing pipeline 에 기반하여 모델링 되었습니다. Linux 의 "|" 연산처럼 파이프라이닝 한다고 이해하면 쉽습니다. document 들이 여러 단계의 pipeline 을 거쳐 하나의 aggregationed result 가 만들어집니다.

가장 기본적인 파이프라인 단계는 filter 로, document 들을 query 한 후 특정 필드를 기준으로 grouping 하거나 sorting 하는 것입니다. 각 파이프라인 단계에서 operater 를 활용하여 평균값 계산이나 스트링 연결과 같은 연산을 수행할 수 있습니다.

<img width="600" src="https://k.kakaocdn.net/dn/cSwl5T/btqtZNkK1AR/F6uJpC6kTSjQRQ1nRs7hG0/tfile.svg" alt="" />

위 사진은 Aggregation pipeline 의 예시를 보여준 것입니다. 차근차근 살펴보도록 합시다.

먼저, $match 연산자로 status 가 'A' 인 document 들을 filtering 하였습니다. 그런 다음 $group 연산자로 그룹핑할 document 를 정의하였는데, \_id 필드는 "\$cust_id"로 filtering 된 document 들 중에서 cust_id 필드가 같은 document 들을 그룹핑 하였고, total 필드는 그룹핑 한 document 들의 amout 필드의 합으로 주어졌습니다. 즉, cust_id 가 "A123", "B212"인 것들로 묶이고, 그 안에서 amount 가 합해진 결과가 반환됩니다.

# Map-Reduce function

Map-Reduce function 은 두 가지 단계로 구성되는데, map 단계에서 주어진 각 document 를 프로세싱 하고, reduce 단계에서 map 연산의 결과를 combine 합니다. 또한 부가적으로 finalize 단계가 존재하는데, 마지막으로 result 를 modification 하는 단계입니다. 다른 aggregation 과 마찬가지로, document 들을 filtering 하여 선택적으로 input document 를 줄 수 있습니다.

Map-Reduce function 은 사용자가 정의한 Javascript 함수를 사용할 수 있기 때문에 Aggregation pipeline 보다 더 유연한 반면 보다 덜 효율적이고 복잡합니다.

<img width="600" src="https://k.kakaocdn.net/dn/dqfMrx/btqt0TR7yRi/kd8q2x4zo2yRVIsAKTLWVK/tfile.svg" alt="" />

위 사진은 Map-Reduce function 을 활용한 aggregation 예제입니다. 차근차근 살펴봅시다.

mapReduce 안에 먼저 query 필드가 주어졌는데, status 가 "A" 인 document 들을 filtering 합니다. 그 다음 map 단계에서 cust_id 가 같은 것들끼리 묶이고, 같은 cust_id 별로 amount 가 추가됩니다. 다음은 reduce 단계로 map 연산의 결과의 각 document 의 추가된 amout 들을 합치는 연산을 수행합니다. 마지막으로 out 필드의 값인 order_totals 라는 이름으로 aggregated result 가 반환됩니다.

# Single Purpose Aggregation Operations

MongoDB 는  db.collection.estimatedDocumentCount(), db.collection.count(), db.collection.distinct() 와   같은 메서드를 제공하는데, 이는 하나의 collection 에서 aggregation 하는 것으로 간단한 반면 aggregation pipeline 이나 map-reduce function 보다는 성능이다 유연성 측면에서 뒤떨어집니다.

<img width="600" src="https://k.kakaocdn.net/dn/m9mxQ/btqtYZssFsw/KZm9nNsQYGkkXfYXbOp0K1/tfile.svg" alt="" />

위 사진은 Single Purpose Aggregation Operation 을 설명한 사진입니다. 위에서 제시한 두 가지 방법보다 확실히 이해가 쉽지만, 강력한 연산 기능은 제공하지 않다는 걸 알 수 있습니다.

지금까지 MongoDB 에서 제공하는 Aggregation 의 정의와 세 가지 방법들 그리고 각 방법에 대해 간단히 알아보았습니다. 세 가지 방법에 대해서 MongoDB Manual 에서 제공하는 더 자세한 정보를 알고 싶다면  [Aggregation Commands Comparison](https://docs.mongodb.com/manual/reference/aggregation-commands-comparison/)  를 참고하시기 바랍니다.

참고 자료: MongoDB Manual
