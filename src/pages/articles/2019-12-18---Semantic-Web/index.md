---
title: Semantic HTML(시맨틱 HTML) 이란?
description: '웹 페이지의 접근성과 SEO(Search Engine Optimization)을 향상시켜주고 코드의 가독성을 높여주는 Semantic HTML에 대해서 알아보고, semantic 태그들에는 어떤 것들이 있는지 알아봅시다.'
date: '2019-12-18T00:30:00.000Z'
layout: post
category: Front-end
tags:
  - TIL
  - WEB
  - HTML
use_math: true
comments: true
---

_Semantic HTML_ 에서 semantic(시맨틱)이란 "의미적으로 연관이 있는" 것을 의미합니다. 즉 semantic HTML 은 각 HTML 태그가 포함하는 내용에 대한 정보를 제공한다는 것을 의미합니다.

예를 들어 `div` 태그와 `span` 태그는 포함되는 내용에 대한 어떠한 정보도 제공하지 못 하기 때문에 시맨틱 태그가 아닙니다. 그러나 `header` 태그와 `footer` 태그는 그 안에 포함될 내용을 어느정도 예측할 수 있기 때문에 시맨틱 태그에 해당됩니다. 이렇게 시맨틱 태그를 사용하여 웹을 구성하는 것은 다음과 같은 장점이 있습니다.

- **Accessibility**: Semantic HTML 은 모바일 사용자나 장애가 있는 사용자의 접근성을 더 향상시켜 줍니다. 브라우저나 스크린 리더가 코드를 더 쉽게 interpret 할 수 있기 때문입니다.
- **SEO**: Semantic HTML 은 SEO(*Search Engine Optimization)*을 향상시킴으로써 웹 페이지의 방문자 수를 늘릴 수 있습니다. SEO 가 좋을 수록 검색 엔진이 웹 사이트를 빠르게 식별할 수 있고 중요한 정보에 적절한 가중치를 부여할 수 있습니다.
- **Easy to Understand**: Semantic HTML 은 또한 웹 사이트 소스코드의 가독성을 향상시켜 줍니다.

아래 그림은 Non-Semantic 태그와 Semantic 태그를 사용하여 구성된 페이지를 비교하고 있습니다.

<figure>
  <img width="480" src="https://codecademy-content.s3.amazonaws.com/courses/Semantic+HTML/SemanticVSNonSemantic-Diagram.svg" />
  <figcaption style="text-align: center; color: grey;">Non-Semantic 태그와 Semantic 태그 비교</figcaption>
</figure>

# Semantic Tags

Semantic HTML 태그로는 다음과 같은 것들이 있습니다.

## Header and Nav

웹 페이지 상단 혹은 측면에 링크들이 한데 모여있는 곳을 구성하는 데 사용하는 태그로 `header` 와 `nav` 가 있습니다.

```HTML
<header>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
</header>
```

`header` 태그와 `nav` 태그를 사용함으로써 가독성을 향상시킬 수 있습니다. `nav` 태그는 `header` 태그 안에서 사용될 수도 있고 홀로 사용될 수도 있습니다.

## Main and Footer

`main` 태그는 `header` , `footer` 태그와 분리되어 웹 페이지의 가장 핵심적인 내용을 포함합니다. `div` 대신 `main` 을 사용함으로써 브라우저가 중요한 부분을 빠르게 파악하도록 만듭니다.

`footer` 태그는 웹 페이지 하단에 contact, corpyright, terms of use 등의 정보를 포함합니다.

```HTML
<main>
  <article>
    <h3>Baseball</h3>
    <p>
      The first game of baseball was played in Cooperstown, New York in the summer of 1839.
    </p>
  </article>
</main>
<footer>
  <p>Email me at example@gmail.com</p>
</footer>
```

## Article and Section

`section` 태그는 소설의 챕터와 같이 서로 관계 있는 문서를 분리하거나 동일한 테마를 적용할 수 있는 내용을 포함합니다. `article` 태그는 독립적으로 설 수 있는 내용을 포함합니다. `section` 안에 `article` 이 포함되는 것이 일반적이지만 맥락에 따라 `article` 안에 `section` 이 포함될 수도 있습니다.

```HTML
<section>
  <h2>Fun Facts About Cricket</h2>
  <article>
    <p>A single match of cricket can last up to 15 days.</p>
  </article>
</section>
```

## Aside

`aside` 태그는 내용을 이해하는데 꼭 필요하진 않지만 부가적인 정보를 전달할 떄 사용됩니다. `aside` 태그는 `article` 과 `section` 태그와 함께 주로 사용됩니다. `aside` 태그는 참고 문헌, 미주, 인용문 등을 포함합니다.

```HTML
<article>
  <p>The first World Series was played between Pittsburgh and Boston in 1903 and was a nine-game series.</p>
</article>
<aside>
  <p>
   Babe Ruth once stated, “Heroes get remembered, but legends never die.”
  </p>
</aside>
```

## Figure and Figcaption

`figure` 태그는 이미지나 비디오, 코드 스니펫 등과 같은 미디어를 포함할 수 있습니다. 이 때 캡션을 달아주기 위해 `figcaption` 태그를 사용할 수 있습니다. 일반적으로 `figcaption` 태그는 `figure` 태그 안에 포함됩니다.

```HTML
<figure>
  <img src="overwatch.jpg">
  <figcaption>This picture shows characters from Overwatch.</figcaption>
</figure>
```

## Audio

`audio` 태그는 웹 페이지에 오디오 콘텐츠를 포함할 때 사용할 수 있습니다.

```HTML
<audio controls autoplay>
  <source src="iAmAnAudioFile.mp3" type="audio/mp3" >
</audio>
```

`audio` 태그 안에 `source` 태그를 추가하여 `src` 와 `type` 을 명시해주었습니다. `type` 은 꼭 명시해주지 않아도 되지만 브라우저가 지원할 수 있는지 빠르게 인식할 수 있어서 권장되고 있습니다.

`audio` 태그에 `controls`, `autoplay` 속성이 부여되었는데, 각 속성은 다음과 같은 기능을 합니다.

- `controls` : 오디오의 재생, 중지, 볼륨 조절 등의 기능이 포함된 컨트롤러를 화면에 제공합니다.
- `autoplay` : 자동적으로 재생합니다.

더 많은 속성들은 [Mozila Web Document](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#Attributes) 에서 확인하실 수 있습니다.

## Video and Embed

`video` 태그를 사용하면 웹 페이지에 비디오를 첨부할 수 있습니다.

```HTML
<video src="coding.mp4" controls>
	Video not supported
</video>
```

`video` 태그에 텍스트를 포함 함으로써 브라우저가 동영상을 재생할 수 없을 경우를 처리할 수 있습니다.

또 `embed` 태그는 비디오, 오디오, GIF 등 어떤 미디어 콘텐츠도 포함할 수 있습니다. `embed` 태그는 스스로 닫느 태그(self-closing tag)입니다.

```HTML
<embed src="download.gif"/>
```

# Review

지금까지 semantic HTML 이 무엇이고 어떤 태그들이 있는지 간단히 살펴보았습니다. Semantic HTML 을 사용함으로써 코드의 가독성을 향상시키고 사용자 접근성 또한 높일 수 있습니다.

# References

- [[html5] article vs section 차이](https://aboooks.tistory.com/346)
- [Codecademy](http://www.codecademy.com)
