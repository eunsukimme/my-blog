---
title: Sass 개념 정리 및 사용 방법
description: "Sass(Syntactically Awesome StyleSheets)를 활용하면 간결하고 재사용이 용이한 CSS 코드를 작성할 수 있으며 코드의 중복을 피할 수 있습니다. 전통적인 CSS의 문제점을 개선한 Sass에 대해서 알아봅시다."
date: '2019-12-19T03:00:00.000Z'
layout: post
category: CSS/SCSS
tags:
  - TIL
  - WEB
  - CSS
  - SCSS
use_math: true
comments: true
---

Sass는 *Syntactically Awesome StyleSheets*의 약자로, CSS를 확장한 언어입니다. Sass를 활용하면 간결하고 재사용이 용이한 CSS코드를 작성할 수 있으며, 코드의 중복을 피할 수 있습니다. CSS에 익숙한 개발자라면 문법적으로 유사한 Sass도 쉽게 배울 수 있습니다.

Sass는 SASS 표기법(`.sass`)과 SCSS(`.scss`) 표기법이 존재하는데, 이번 포스팅에서는 Sass 3.0 부터 기본 표기법으로 채택된 SCSS (Sassy CSS)를 다루도록 하겠습니다.

<figure>
  <img width="280" src="https://images.velog.io/post-images/smooth97/3e23b6b0-cb9e-11e9-a260-ab77074e2d8e/logo-sass.png" />
</figure>

# Install Sass

Sass를 설치하기 위해선 먼저 Ruby를 설치해야 합니다.

## Windows

Windows에서는 [Ruby Installer](https://rubyinstaller.org/downloads/) 를 다운받아 설치할 수 있습니다. Ruby를 설치하는 과정에서 PATH를 추가하면 설치 후 따로 환경 변수를 설정하지 않아도 됩니다. 설치가 완료되고 PATH도 추가하였다면 터미널에서 다음 명령을 실행합니다.

```
> gem install sass
```

## Mac

Mac은 기본적으로 Ruby가 설치되어있기 때문에 바로 위 명령을 실행하면 됩니다.

```
$ gem install sass
```

## Nodejs

Nodejs 환경에서 sass를 사용하려면 node-sass를 설치하면 됩니다.

```
$ npm install -g node-sass
```

# Compiling Sass

Sass는 브라우저에의해 직접적으로 컴파일되지 않습니다. 그리하여 Sass는 브라우저가 렌더링하기 전 반드시 CSS로 컴파일되어야 합니다. `.scss` 파일을 `.css` 파일로 컴파일하는 방법은 다음과 같습니다.

```
sass main.scss main.css
```

`sass` 명령은 다음과 같이 두 가지 파라미터를 받습니다.

- Input 파일 (`main.scss`)
- Ouput을 출력할 location (`main.css`)

자, 이제 Sass를 사용하여 코드를 얼마나 간결하고 읽기 쉽게 작성할 수 있는지 알아보도록 합시다.

# Sass Overview

이번 포스팅에서는 다음 두 가지의 개념에 대해서 알아보도록 하겠습니다.

- Nests
- Variables

## Nests

### Nesting Selectors

첫 번째로 알아볼 개념은 _nesting_ 입니다. Nesting이란 특정 CSS selector(선택자)를 다른 selector의 스코프에 포함시키는 것을 말합니다. 일반적으로 변수의 스코프는 변수가 정의되고 사용 가능한 context를 지칭합니다. Sass에서 selector의 스코프를 `{` 와 `}` 사이에 위치한 영역으로 생각하면 쉽습니다.

다른 selector의 스코프에 포함된 selector를 _children_ 이라고 부릅니다. 반대로 다른 selector를 포함하는 selector를 _parent_ 라고 부릅니다. 이러한 관계는 HTML 태그와 비슷합니다.

```scss
.parent {
  color: blue;
  .child {
    font-size: 12px;
  }
}
```

위 코드에서 `.child` 가 child selector이고 `.parent` 가 parent selector가 됩니다. 위 SCSS를 컴파일하면 다음과 같은 CSS 파일이 생성됩니다.

```css
.parent {
  color: blue;
}
.parent .child {
  font-size: 12px;
}
```

Nesting을 사용함으로써 CSS에서 나타나는 코드의 중복을 제거하고 두 selector간의 명확한 DOM 관계를 파악할 수 있습니다. SCSS가 코드의 가독성을 높이는 이유는 바로 여기에 있습니다.

### Nesting Properties

SCSS에서는 selector만 nesting 시키는 것 뿐만 아니라 property(속성) 이름 뒤에 `:` 문자를 추가함으로써 CSS 속성도 nesting 할 수 있습니다.

```scss
.parent {
  font : {
    family: Roboto, sans-serif;
    size: 12px;
    decoration: none;
  }
}
```

위 코드를 컴파일하면 다음과 같은 CSS 파일이 생성됩니다.

```css
.parent {
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-decoration: none;
}
```

## Variables

SCSS는 variables(변수)를 활용할 수 있습니다. 여러 selector에서 같은 값들을 포함하고 있다면, 이를 변수로 정의하여 참조함으로써 이후 코드의 수정을 최소화 시킬 수 있습니다. 변수를 정의하고 참조할 때 `$` 문자를 사용합니다.

```scss
$transparent-white: rgba(255, 255, 255, 0.3);
```

**Note**: 변수를 사용할 때 하나의 네이밍 규칙을 정의해서 따르는 것이 좋습니다. 그러면 나중에 변수를 쉽게 기억하고 참조할 수 있습니다.

### Sass(y) Types

SCSS 변수에 저장할 수 있는 데이터 타입은 다음과 같습니다.

- Color - `rgb(100, 39, 153)`, `hsl(0, 30%, 100%)`
- Number - `8.11`, `12`, `10px`
- String - `"potato"`, `"tomato"`, `span`
- Boolean - `true`, `false`
- null

**Note**: number 타입에 `px` 과 같은 단위가 포함되어도 string이 아닌 number로 간주합니다.

**Note**: string 타입의 경우 따옴표(`""`) 로 감싸지는 여부는 상관없습니다.

### Map & List

위에서 언급한 데이터 타입 외에 *list*와 *map*이라는 데이터 타입이 존재합니다.

List는 space(공백)이나 comma(`,`)로 구분되는 데이터 타입입니다. List 타입은 다음과 같은 것들이 있을 수 있습니다.

```
1.5em Hevetica bold;

Helvetica, Arial, sans-serif;
```

**Note**: list 데이터는 `()` 로 감쌀 수 있으며, list안에 또 list가 올 수 있습니다.

Map은 list와 비슷한데 각 원소들은 key:value 쌍입니다. Map 타입은 다음과 같을 수 있습니다.

```scss
(key1: value1, key2: value2);
```

# Review

지금까지 Sass에 대한 소개와 설치 방법, 그리고 두 가지 핵심 개념에 대해서 알아보았습니다. Sass를 사용하면 nesting을 통해 selector의 DOM 관계를 명확하게 이해할 수 있을 뿐만 아니라 변수를 활용함으로써 코드의 중복을 피할 수 있습니다.

# References

- [Codecademy](http://www.codecademy.com)
- [Sass의 소개, 설치와 간단한 명령어 사용법](https://poiemaweb.com/sass-basics)
- [TutorialsTeacher](https://www.tutorialsteacher.com/sass/sass-data-types)
