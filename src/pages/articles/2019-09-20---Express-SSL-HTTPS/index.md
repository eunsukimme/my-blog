---
title: SSL 인증서를 활용하여 Express 서버 HTTPS 연결하기
description: 상용 SSL 인증서를 활용하여 Express 서버를 HTTPS 로 접속해보도록 합시다
date: '2019-09-20T00:00:00.000Z'
layout: post
category: Nodejs
tags:
  - Nodejs
  - Express
  - SSL
  - TLS
  - HTTPS
comments: true
---

SW 마에스트로 프로젝트를 진행하면서 사용자 회원가입 시 사용자의 개인정보(Email, 비밀번호 등)을 안전하게 서버로 전달하기 위해 암호화할 필요가 생겼습니다. 그리하여 우리 팀은 SecureSign 에서 가장 저렴한 SSL 인증서를 구입하여 Express 서버에 이를 연동하였고, 이러한 과정을 정리해보고자 합니다.

# SSL 인증서 구입

저는 SSL 인증서를 다음 사이트에서 구매하였습니다. https://www.securesign.kr/ 구입한 인증서는 1 년짜리 Positive SSL 이며 가격은 12,000 원 입니다. PositiveSSL 은 저가형 인증서 브랜드, 발급기관 중에 하나입니다. 최대 \$10,000 배상이 가능하며, 주로 소규모 웹사이트 및 스타트업 또는 네트워크 보호가 필요한 곳 등에 적합합니다.

<figure>
  <img width="800" alt="Screen Shot 2019-09-20 at 6 23 44 PM" src="https://user-images.githubusercontent.com/31213226/65315889-dafb5e80-dbd3-11e9-9d92-146c99ae2065.png">
</figure>

위 화면에서 1 Year 짜리의 신청하기 버튼을 누르면 다음과 같은 대시보드 화면으로 넘어갑니다.

<figure>
  <img width="800" alt="Screen Shot 2019-09-20 at 6 22 46 PM" src="https://user-images.githubusercontent.com/31213226/65315817-bbfccc80-dbd3-11e9-945d-b0e3d3e0f499.png">
</figure>

위 화면에서 인증서 상품/기간 그리고 인증서 담당자를 선택합니다. 맨 처음 등록 시 인증서 담당자를 등록해야 하는데, 그 절차는 홈페이지에 잘 나와 있으니 쉽게 따라할 수 있습니다. 다음 다계로 넘어가면 CSR 을 설정해 주어야 합니다.

<figure>
  <img width="800" alt="Screen Shot 2019-09-20 at 6 53 03 PM" src="https://user-images.githubusercontent.com/31213226/65318018-e9e41000-dbd7-11e9-81e0-6ca7123257ee.png">
</figure>

CSR 이란 Certificate Signing Request(인증서 서명 요청)이란 뜻으로, 인증서 발급을 위한 필요한 정보를 담고 있는 인증서 신청 형식 데이터입니다. CSR 에 포함되는 내용으로는 개인키 생성 단계에서 만들어진 개인키(Private Key)와 공개키(Public Key)의 키쌍 중에서 공개키가 포함되며, 인증서가 적용되는 도메인에 대한 정보 등이 포함됩니다.\
먼저 도메인 이름을 입력하고, 웹 서버 종류를 선택해야 합니다. 웹 서버 종류는 Apache, Nginx 등 여러가지가 존재하고 본인의 웹 서버에 맞는 걸 선택하면 됩니다. 그리고 아래 기관명, 부서명 등의 내용을 채워주고 다음 단계로 넘어가면 됩니다.

<figure>
  <img width="800" alt="Screen Shot 2019-09-20 at 6 57 52 PM" src="https://user-images.githubusercontent.com/31213226/65318456-9625f680-dbd8-11e9-8f5c-59e31a5af8f3.png">
</figure>

다음으로 도메인 권한 인증(DCV) 방법을 선택해야 합니다. DCV(Domain Control Validation)란 신청한 도메인에 대한 SSL 인증서의 부정 / 위조 발급을 방지하기 위해서, 인증기관 CA 에서 도메인 관리 권한을 확인하는 필수 절차 입니다. 도메인 인증 방법으로는 HTTP, CNAME, Email 등의 방법이 있는데 DCV 인증 방법 예제 보기 버튼을 눌러 상세한 내용을 확인할 수 있습니다.\
도메인 권한을 인증한 이후 결제까지 완료하면 인증서를 발급받게 되고 다음과 같이 확인할 수 있습니다.

<figure>
  <img width="800" alt="Screen Shot 2019-09-20 at 10 39 32 PM" src="https://user-images.githubusercontent.com/31213226/65331408-bf09b400-dbf7-11e9-8916-2a71eec78a5a.png">
</figure>

위 화면에서 서버의 개인키, 인증서 그리고 루트 CA 의 인증서 및 그 중간과정의 체인 인증서를 모두 확인할 수 있습니다.

# Express 서버 SSL 인증서 연동

이제 발급받은 SSL 인증서를 활용하여 Express 서버에 SSL 을 적용할 수 있습니다. 먼저 인증서 파일과 개인키 파일 그리고 루트/체인 인증서를 서버의 특정 경로로 옮겨줍니다. 그런 다음 아래 코드를 작성합니다.

```javascript
const app = require('express')();
const https = require('https');
const fs = require('fs');
const PORT = process.env.PORT || 443;   // HTTPS 는 443 포트를 사용합니다
const options = {
  key: fs.readFileSync(__dirname + '/인증서경로/domain_xxxxx.key.pem')
  cert: fs.readFileSync(__dirname + '/인증서경로/domain_xxxxx.crt.pem')
  ca: fs.readFileSync(__dirname + '/인증서경로/ca-chain-bundle.pem')
};
// https 서버를 만들고 실행시킵니다
https.createServer(options, app).listen(PORT);
```

단, 실제로 production 모드에서는 SSL 을 정상적으로 적용해 주기 위해선 PORT 를 443 으로 설정해 주어야 합니다. 또한 production 모드에서는 ssl 옵션을 제대로 부여해주어야 하지만 개발 단계에서는 443 포트를 사용할 수 없을 수도 있습니다. 이를 위해 다음과 같은 트릭을 사용합니다.

```javascript
/* SSL option */
// production 모드에서는 option 이 truthy한 값이고
// development 모드에서는 option 이 falsy한 값입니다
const option =
  process.env.NODE_ENV === 'production'
    ? {
        key: fs.readFileSync(__dirname + '/인증서경로/domain_xxxxx.key.pem'),
        cert: fs.readFileSync(
          __dirname + '/인증서경로/인증서경로/domain_xxxxx.crt.pem'
        ),
        ca: fs.readFileSync(__dirname + '/인증서경로/ca-chain-bundle.pem'),
      }
    : undefined

// production 모드에서는 https 서버를
// development 모드에서는 http 서버를 사용합니다
option
  ? https.createServer(option, app).listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`)
    })
  : http.createServer(app).listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`)
    })
```

그러면 이제 정상적으로 HTTPS 연결이 되는 것을 확인할 수 있습니다.

<figure>
  <img width="550" alt="Screen Shot 2019-09-20 at 10 57 04 PM" src="https://user-images.githubusercontent.com/31213226/65332635-0729d600-dbfa-11e9-8a17-4537c367fe65.png">
</figure>

위 코드에서는 일일이 `https://`로 입력을 해야만 https 연결이 가능합니다. http 로 접속할 때 자동으로 https 로 변환해주는 트릭을 추가해 봅시다. 이를 위해 우리는 http 서버와 https 서버를 동시에 구동하여 http 로 접속하는 모든 첫 요청을 https 로 전달해 줍시다. 만약 SSL option 이 존재하지 않는다면 HTTP 서버만 돌아가도록 합시다.

```javascript
// HTTPS 서버
option
  ? https.createServer(option, app).listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`)
    })
  : undefined

// HTTPS 서버로 요청을 전달하여 자동으로 SSL 연결을 해주는 HTTP 서버
// SSL option 이 존재하지 않는 development 단계에서는 그냥 HTTP 서버만이 존재하게 됩니다.
option
  ? http
      .createServer(function(req, res) {
        res.writeHead(301, {
          Location: 'https://' + req.headers['host'] + req.url,
        })
        res.end()
      })
      .listen(80)
  : http.createServer(app).listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`)
    })
```

# Review

지금까지 SSL 인증서를 구입하여 발급받는 과정과 이를 Express 서버에 적용하는 방법에 대해서 알아보았습니다. 만약 Express 서버가 EC2 상에서 돌아가고 있다면 해당 인스턴스의 443 번 포트를 열어주어야 하며, 서버 개인키는 유출되지 않도록 관리하여야 합니다. 또한 PM2 와 같은 Node 인스턴스 관리 도구를 사용한다면 authbind 를 통해 443 번 포트를 sudo 권한 없이 사용할 수 있도록 설정해 주어야 합니다.
