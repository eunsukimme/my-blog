---
title: Git 워크플로우(Workflow) 이해하기
description: 가장 인기있는 버전 관리 시스템(Version Control System) 중 하나인 Git을 활용하여 작업하는 방법에 대해서 알아봅시다.
date: '2019-09-16T02:00:00.000Z'
layout: post
category: Git
tags:
  - Git
  - Git workflow
comments: true
---

Git 은 개발자들이 프로젝트를 진행하면서 만드는 변화들을 추적할 수 있게 도와주는 소프트웨어입니다. Git 은 당신의 프로젝트의 변화들을 기록하고, 이러한 변화들을 저장하며, 추후 필요하면 이를 다시 참조할 수 있게 만들어줍니다. 이번 시리즈에서는 Git 을 다루는 기본적인 방법 및 워크플로우에 대해서 알아보도록 하겠습니다. 먼저, 바탕화면에서 git_test 라는 폴더를 만들고 그 디렉터리로 이동한 다음 시작하도록 합시다.

```
> mkdir git_test
> cd git_test
```

# git init

Git 을 프로젝트에 사용하려면 터미널에서 프로젝트 디렉터리상에서 git init 커맨드를 입력해야 합니다. 이 커맨드는 Git 이 당신의 프로젝트의 변화들을 추적할 수 있게 도와주는 필요한 툴들과 설정들을 셋업 시켜줍니다. 방금 생성한 git_test 폴더에서 다음 명령을 실행해봅시다.

```
> git init
Initialized empty Git repository in /Users/eunsu/git_test/.git/
```

커맨드를 입력하면 위와 같이 .git 폴더를 생성하고 Initailized 됐다고 알려줍니다.

# Git Workflow

자, 방금 우리는 Git 프로젝트를 생성하였습니다. Git 프로젝트는 다음과 같은 세 가지 파트로 구분됩니다.

<figure>
  <img src="https://k.kakaocdn.net/dn/PkEr5/btqugqCEfT2/JnGtB7TI7UwIIEFQBuVA51/img.png" alt="" />
  <figcaption style="text-align: center; color: grey;" >Basic Git Workflow(출처: codecademy.com)</figcaption>
</figure>

1. Working Directory - 당신이 행하는 모든 작업들이 이뤄지는 디렉터리입니다. 파일을 만들고, 수정하고, 삭제하는 등의 작업들이 수행되는 공간입니다.

2. Staging Area - Working Directory 에서 만든 파일들의 변화들을 저장하는 곳으로, Repository 에 저장될 준비가 된 변화들의 집합입니다.

3. Repository - Git 이 Staging Area 로부터 파일의 변화들을 영구적으로 저장하는 곳으로, 각 변화들은 각자 다른 버전을 나타냅니다.

Git 의 기본적인 workflow 는 Working Directory 에서 파일들은 편집한 후 Staging Area 에 추가한 뒤, 마지막으로 변화들을 Repository 에 저장하는 방식으로 흘러갑니다. Git 에서는 Repository 에 저장된 변화들을 Commit(커밋)이라고 하는데, 커밋에 대해선 나중에 더 자세히 알아보도록 합시다.

# git status

git status 는 현재 Git 프로젝트의 상태를 확인할 수 있는 커맨드입니다. 터미널에서 다음과 같이 입력해봅시다.

```
> git status
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

출력된 내용은 현재 커밋된 것도 없고, 커밋할 것도 없다는 내용입니다. 우리는 지금부터 간단한 소설을 쓰는 프로젝트를 진행한다고 가정하고, 원하는 소설의 제목으로 텍스트 파일을 생성하고 그 내용을 채워봅시다. 필자의 경우는 hello.txt 라는 텍스트 파일을 만들고, 그 내용을 "hello world!"로 작성하였습니다.

```
> vim hello.txt   // hello.txt 작성
> cat hello.txt
hello world!
```

자, 이제 다시 커맨드 창에서 git status 명령을 입력해봅시다.

```
> git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        hello.txt

nothing added to commit but untracked files present (use "git add" to track)
```

아까 와는 다르게 Untracked files: 아래에 빨간 글씨로 hello.txt 가 적힌 걸 확인할 수 있습니다. Untracked 는 Git 이 프로젝트 내 파일을 감지하였지만 변화를 추적하지 못하고 있다는 것입니다.

# git add

Git 이 파일의 변화를 추적할 수 있게 하려면 해당 파일을 Staging Area 에 추가해야합니다. git add 명령어는 파라미터로 파일 이름을 받으며, Working Directory 내 해당 이름의 파일을 Staging Area 에 추가해줍니다.

```
> git add hello.txt
```

자, 이제 다시 한번 git status 명령으로 Git 프로젝트 상태를 확인해봅시다.

```
> git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

        new file:   hello.txt
```

출력 결과를 보면 초록색 글씨로 new file: hello.txt 라고 나옵니다. Git 이 파일의 변화를 추적하고 있고, 커밋할 준비가 됐다는 것입니다.

# git diff

자, 우리는 방금 파일을 Working Directory 에서 Staging Area 에 추가하는 방법을 알아보았습니다. Git 이 파일의 변화를 추적할 수 있게 됐다고 말했는데, 과연 진짜로 그런지 확인해 보도록 합시다. hello.txt 에 다음과 같은 줄을 추가해봅시다.

```
> vim hello.txt   // hello.txt 작성
> cat hello.txt
hello world!
I'm second line!
```

현재 상황을 한 번 짚고 넘어가자면 Working Directory 에서의 hello.txt 는 방 금 추가한 "I'm second line!" 문장을 포함하여 총 두 줄이고, Staging Area 에서의 hello.txt 는 한 줄입니다. Working Directory 와 Staging Area 와의 차이를 확인하기 위해선 git diff 커맨드를 사용합니다. git diff 커맨드는 파라미터로 파일의 이름을 받고, 해당 파일의 Working Directory 와 Staging Area 에서의 차이를 보여줍니다.

```
> git diff hello.txt
diff --git a/hello.txt b/hello.txt
index a042389..999fd2e 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1 +1,2 @@
 hello world!
+I'm second line!
```

출력 결과를 보면 흰색 글씨로 hello world! 다음에 초록색 글씨로 +I'm second line! 를 확인할 수 있습니다. Working Directory 에서의 파일의 변화를 "+" 기호와 초록색 글씨로 표현했음을 알 수 있고, Git 이 파일의 변화를 제대로 추적하고 있음을 확인할 수 있습니다. 이제 이를 다시 git add 하여 Staging Area 에 올리도록 합시다.

```
> git add hello.txt
```

# git commit

Commit(커밋)은 우리 Git Workflow 에서의 마지막 단계입니다. Commit 은 Staging Area 의 변화를 Repository 에 영구적으로 저장합니다. git commit 커맨드가 바로 그 역할을 하는데, "-m" 옵션으로 커밋에 메시지를 남길 수 있습니다. 커밋 메시지의 기본적인 Convention 들은 다음과 같습니다.

- 반드시 quotation(따옴표) 마크로 감싸야합니다

- 현재형(명령형)으로 쓰여야 합니다

- 50 자 이내로 간략하고 깔끔하게 작성합니다

자, 이제 우리의 첫 번째 커밋을 만들어보도록 합시다.

```
> git commit -m "Add first commit"
[master (root-commit) d9e17f2] Add first commit
 1 file changed, 2 insertions(+)
 create mode 100644 hello.txt
```

# git log

git log 는 커밋 이력을 확인할 수 있게 해주는 명령입니다. 터미널에서 이 명령을 치고 나온 출력을 확인해봅시다.

```
> git log
commit d9e17f2638100c8f50866c811efda95909973c5c (HEAD -> master)
Author: eunsukimme <eunsu.dev@gmail.com>
Date:   Mon Apr 8 22:12:06 2019 +0900

    Add first commit
```

출력 결과에서 다음을 확인할 수 있습니다.

- 40 자의 SHA 해쉬값 - 각 커밋을 식별하는 식별자 역할을 한다

- commit 의 author - 커밋을 생성한 사람으로 여기서는 필자를 나타내고 있다

- 커밋 날짜 및 시각

- commit 메시지

# Git Workflow Review & Generalization

지금까지 Git 의 기본적인 워크플로우를 알아보았습니다. 많은 것을 설명했는데, 이 과정들을 일반화시켜보도록 합시다.

- Git 은 파일의 변화를 추적하는 다음과 같은 명령어를 제공합니다.

  - `git init` - Git 프로젝트를 생성한다

  - `git status` - Git 프로젝트의 현재 상태를 보여준다

  - `git add` - Working Directory 의 파일들을 Staging Area 에 추가한다

  - `git diff` - Working Directory 와 Staging Area 의 차이를 보여준다

  - `git commit` - Staging Area 에 저장된 변화들을 Repository 에 영구적으로 저장한다

  - `git log` - 커밋 이력을 보여준다

오늘은 Git 에서 가장 기본적이지만 가장 중요한 내용들을 다뤄보았습니다. 다음 포스팅에서는 Git 버전을 관리하는 방법, 즉, Backtracking 에 대해서 알아보도록 합시다.

# References

- [Codecademy](http://www.codecademy.com)
