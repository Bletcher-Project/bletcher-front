![GitHub contributors](https://img.shields.io/github/contributors/Bletcher-Project/bletcher-front?style=for-the-badge) [![GitHub issues](https://img.shields.io/github/issues/Bletcher-Project/bletcher-front?style=for-the-badge)](https://github.com/Bletcher-Project/bletcher-front/issues) [![GitHub license](https://img.shields.io/github/license/Bletcher-Project/bletcher-front?style=for-the-badge)](https://github.com/Bletcher-Project/bletcher-front/blob/main/LICENSE)

# Bletcher-front

![realfinalversion2](https://user-images.githubusercontent.com/22493971/110480555-f6d92400-8129-11eb-8388-acb605aea2a4.jpg)

인공지능 예술 웹 서비스 [Bletcher Project](https://github.com/Bletcher-Project/Bletcher)의 **Web Front-End Repository** 입니다. React.js를 통하여 구현되어 있습니다.

> 라이센스에 관련된 내용은 [License](#license)를 참조해주세요.

_👏 우리는 700여개의 commit과 20여개의 branch, 약 30여개의 issue를 통한 긴 개발 과정 끝에 배포되었습니다!!_

---

## Technology

- React.js
- Redux
- JavaScript
- SCSS

## 프로젝트 설계

- 아래와 같은 형식으로
- Node.js 프로젝트 설계 : 3 계층 설계 ([▶︎ Issue](https://github.com/Bletcher-Project/bletcher-back/issues/8))

## 핵심 기능

- 아래와 같은 형식으로
- 사용자 인증 부분
  - 회원가입 및 로그인 기능 구현 (비밀번호 암호화 저장)
  - JsonWebToken을 사용한 사용자 인증
  - 회원정보 수정, 삭제 기능 구현
- 게시글 부분
  - 게시물 (게시글 번호 / 작성자 / 카테고리 별) 조건에 따라 불러오는 라우터 구현

## 트러블 슈팅

- 아래와 같은 형식으로
- Cloudinary Warning - SameSite ([▶︎ Issue](https://github.com/Bletcher-Project/bletcher-back/issues/33))

---

## Getting Started

### Prerequisites

1. node 및 npm 버전을 확인하고 버전에 알맞게 설치해주세요.
   ```
   node v12.14.1
   npm 6.13.4
   ```
2. 실행 전, 루트 경로에 있는 .env 파일의 `REACT_APP_SERVER_URL`을 `https://bletcher-back.herokuapp.com`으로 설정해주세요.

### Run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```bash
yarn install
yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## About Bletcher

여기에 이미지 프리뷰 짜라락
README_image 폴더 생성

## License<a id="license"></a>

프로젝트의 모든 라이센스는 [MIT License](http://opensource.org/licenses/MIT)를 따릅니다. 상세 라이센스 정보는 [Bletcher License](./LICENSE)를 참조해주세요.

---

## Bletcher Team

- 권혁진 - [@KimKwon](https://github.com/KimKwon) - khj9709@icloud.com
- 김동규 - [@kimdg1105](https://github.com/kimdg1105) - kimss7334@naver.com
- 서그림 - [@Seogeurim](https://github.com/Seogeurim) - geulims@naver.com
- 윤가영 - [@yoongoing](https://github.com/yoongoing) - rkdud0925@hanyang.ac.kr
