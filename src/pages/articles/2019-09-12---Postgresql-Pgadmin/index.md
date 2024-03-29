---
title: Postegresql 그리고 Pgadmin4 설치 및 사용법
description: '오픈소스 RDB Postgresql와 GUI 클라이언트 어플리케이션인 Pgadmin4을 설치하고 사용해 봅시다'
date: '2019-09-12T00:00:00.000Z'
layout: post
draft: false
path: '/posts/postgresql-pgamdin/'
category: 'Database'
tags:
  - 'Database'
  - 'PostgreSQL'
  - 'Pgadmin4'
comments: true
---

이번 포스팅에서는 Express 와 Postgresql 을 연동하는 법을 알아보도록 하겠습니다. AWS RDS 와 같은 클라우드상에서 진행해도 되지만 이번 포스팅에서는 로컬 머신에 DB 환경을 구축해 보도록 하겠습니다.

# Postgresql 설치

먼저, Postgresql 을 설치해 줍시다. Postgresql 은 [공식 홈페이지](https://www.postgresql.org/download/)에서 다운로드 할 수 있습니다. 각자의 OS 에 맞는 installer 를 설치하면 됩니다. 필자는 MacOS 환경이므로 MacOS 패키지를 설치하였습니다. Mac 사용자들은 brew 를 사용해서 설치할 수도 있습니다.
한 가지 명심해야 할 것은 설치 중간에 Password 를 입력하라고 나옵니다. 이는 데이터베이스 superuser(postgres) 비밀번호 이므로 꼭 기업해 둡시다.
설치가 되었다면 터미널에서 다음과 같은 명령을 입력해봅시다.

```
❯ postgres --version
postgres (PostgreSQL) 11.5
```

버전이 잘 나온다면 설치가 잘 된 것 입니다. 한가지 더 짚고 넘어가자면, Postgresql 을 설치하면 postresql, psql 이란 두 가지 커맨드를 입력할 수 있게 됩니다.

```
> postresql --help
postgres is the PostgreSQL server.

Usage:
  postgres [OPTION]...
(...생략)
```

먼저 postresql 명령은 설명에 나와있는것처럼 Postresql server 서버를 실행시키고 관리하는 명령입니다.
옵션으로 data 를 저장하는 경로를 설정할 수도 있고(-D 옵션), SSL 연결이나(-l 옵션) connections 갯수(-N) 등을 설정할 수 있습니다.

```
❯ psql --help
psql is the PostgreSQL interactive terminal.

Usage:
  psql [OPTION]... [DBNAME [USERNAME]]
```

다음으로 qsql 명령은 터미널에서 데이터베이스에 접속하고 SQL 문을 실행할 수 있는 클라이언트 명령어이다. 두 명령 모두 자세한 옵션은 --help 옵션을 통해 확인할 수 있습니다. 다음 명령을 통해 Postgresql server 를 실행시켜봅시다.

```
❯ postgres -D /usr/local/var/postgres
2019-09-12 23:34:40.267 KST [62217] LOG:  listening on IPv6 address "::1", port 5432
2019-09-12 23:34:40.267 KST [62217] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2019-09-12 23:34:40.268 KST [62217] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2019-09-12 23:34:40.289 KST [62248] LOG:  database system was shut down at 2019-07-26 18:32:38 KST
2019-09-12 23:34:40.310 KST [62217] LOG:  database system is ready to accept connections
```

host 는 localhost 이고, port 는 5432 에서 server 가 돌아가고 있는 것을 확인할 수 있습니다. 이제 우리는 DB 에 연결할 수 있습니다.

# Pgadmin4 설치

Pgadmin 은 psql 과 같은 클라이언트 어플리케이션이지만 Postgresql 을 관리하기 쉽게 GUI 환경을 제공하는 툴입니다. 현재 최신버전은 Pgadmin4 이므로 [공식 홈페이지](https://www.pgadmin.org/download/)에서해당 버전을 설치해봅시다. 마찬가지로 각자의 OS 에 맞는 걸로 설치해 줍니다. Pgadmin4 을 설치한 뒤 실행하면 브라우저에서 다음과 같은 화면을 볼 수 있습니다.

<img width="1680" alt="Screen Shot 2019-09-12 at 11 09 52 PM" src="https://user-images.githubusercontent.com/31213226/64791393-9f004200-d5b2-11e9-8e17-9d8b5e78e28c.png">

여기서 Add new Server 버튼을 눌러 현재 돌아가고 있는 서버를 등록해 보도록 하자. 이름은 LocalDev 라고 아무렇게나 정했습니다.

<img width="501" alt="Screen Shot 2019-09-12 at 11 22 13 PM" src="https://user-images.githubusercontent.com/31213226/64795088-7c712780-d5b8-11e9-852a-0778e7c51554.png">

그런 다음 Host 와 Username 을 정해줍시다. username 은 따로 추가하지 않았다면 현재 PC 를 사용하고 있는 사용자의 이름을 입력해 줍시다. 잘 기억나지 않는다면 psql --help 명령을 통해 확인할 수 있다. 필자의 username 은 eusnu 이므로 이를 입력해주었습니다. 또는 postgres 를 username 으로 입력하고 Postgresql 을 설치할 때 설정한 password 를 입력해 줄 수 있습니다.

<img width="503" alt="Screen Shot 2019-09-12 at 11 43 04 PM" src="https://user-images.githubusercontent.com/31213226/64795644-62841480-d5b9-11e9-86ad-7de1ae34f999.png">

이렇게 하고 SAVE 버튼을 누르면 다음과 같이 왼쪽 배너의 Servers 에 추가된 것을 확인할 수 있습니다.

<img width="353" alt="Screen Shot 2019-09-13 at 12 02 09 AM" src="https://user-images.githubusercontent.com/31213226/64795884-c6a6d880-d5b9-11e9-8862-ff9bbe95c5ec.png">

해당 서버를 클릭하고 Databases 를 누르면 기본적으로 postgres 라는 데이터베이스가 존재하고 있습니다.

<img width="355" alt="Screen Shot 2019-09-13 at 12 04 50 AM" src="https://user-images.githubusercontent.com/31213226/64796160-3ddc6c80-d5ba-11e9-8bea-aabcec0046e8.png">

# Query Tool 사용하기

이제 Pgadmin 에서 제공하는 Query Tool 을 사용해서 간단한 테이블을 만들고, 컬럼을 insert 하고, update 한 뒤 delete 해보도록 합시다.
먼저, postgres 데이터베이스를 클린한 상태에서 상단의 Tools 버튼을 누른 뒤 Query Tool 을 클릭해줍니다.

<img width="460" alt="Screen Shot 2019-09-13 at 12 09 20 AM" src="https://user-images.githubusercontent.com/31213226/64796514-c529e000-d5ba-11e9-8470-88324a64bf19.png">

그러면 오른쪽에 Query 를 입력할 수 있는 창이 나타날 것입니다. 먼저, 간단한 테이블을 만들어 보도록 합시다.

```sql
create table "users"(
  "name" varchar,
  "age" int
);
```

이렇게 입력한 후 F5 번 혹은 상단의 번개 모양 아이콘을 누르면 테이블이 만들어졌다고 나옵니다. 다음으로 user 를 추가해 보도록 합시다.

```sql
insert into users values('eunsu', '23');
```

F5 키를 눌러 Query 를 실행시키고, 확인해 보기 위해 다음과 같은 쿼리를 날려줘 봅시다.

```sql
select * from users;
```

여기까지 잘 따라오셨다면 table 에 1 개의 컬럼이 잘 추가된 것을 확인할 수 있습니다.

<img width="348" alt="Screen Shot 2019-09-13 at 12 27 16 AM" src="https://user-images.githubusercontent.com/31213226/64798017-43878180-d5bd-11e9-875c-7334cfd359dd.png">

이제 name 이 eunsu 인 컬럼의 age 를 30 으로 변경해 봅시다.

```sql
update users set age=30 where name='eunsu';
```

마찬가지로 select 로 확인해보면 잘 변경되 있는 것을 확인할 수 있습니다.

<img width="410" alt="Screen Shot 2019-09-13 at 12 29 07 AM" src="https://user-images.githubusercontent.com/31213226/64798157-834e6900-d5bd-11e9-8e92-475a9023e954.png">

마지막으로 추가한 컬럼을 삭제해봅시다.

```sql
delete from users;
```

위 명령을 실행하면 users 테이블의 모든 컬럼이 삭제됩니다.

<img width="340" alt="Screen Shot 2019-09-13 at 12 31 13 AM" src="https://user-images.githubusercontent.com/31213226/64798344-d1636c80-d5bd-11e9-9d29-aa1cd2bb27cf.png">

# Review

지금까지 Postgresql 과 Pgadmin4 를 설치하고 간단하게 데이터베이스 server 를 설정한 후 Pgadmin4 로 접속하여 Query Tool 을 사용하는 방법에 대해서 알아보았습니다.
필자는 원래 MongoDB 를 자주 사용하였는데, 그 이유는 JSON 과 같은 비정형 데이터를 쉽게 저장할 수 있었기 떄문이었습니다. 그런데 Postgresql 과 mysql 이 JSON 형태의 데이터의 저장을 지원하게 되고, MongoDB 에서는 컬렉션의 join 이 힘들었단 점에서 관계형 데이터베이스(RDB)에 다시 눈을 돌리게 되었습니다. 그 중에서도 Postgresql 이 오픈소스 진영에서 인기몰이 중이라는 걸 듣고 진행중인 프로젝트에서 도입하여 사용하게 되었습니다. 이번 포스팅은 그런 Postgresql 을 처음 설정하는 방법을 조금이나마 정리해 보고자 준비하였습니다.
