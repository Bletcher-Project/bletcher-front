![GitHub contributors](https://img.shields.io/github/contributors/Bletcher-Project/bletcher-front?style=for-the-badge) [![GitHub issues](https://img.shields.io/github/issues/Bletcher-Project/bletcher-front?style=for-the-badge)](https://github.com/Bletcher-Project/bletcher-front/issues) [![GitHub license](https://img.shields.io/github/license/Bletcher-Project/bletcher-front?style=for-the-badge)](https://github.com/Bletcher-Project/bletcher-front/blob/main/LICENSE)

# Bletcher-front

![realfinalversion2](https://user-images.githubusercontent.com/22493971/110480555-f6d92400-8129-11eb-8388-acb605aea2a4.jpg)

인공지능 예술 웹 서비스 [Bletcher Project](https://github.com/Bletcher-Project/Bletcher)의 **Web Front-End Repository** 입니다. React.js를 통하여 구현되어 있습니다.

> 라이센스에 관련된 내용은 [License](#license)를 참조해주세요.

_👏 우리는 [issue](https://github.com/Bletcher-Project/bletcher-front/issues)를 통한 개발 기능 관리, [branch](https://github.com/Bletcher-Project/bletcher-front/branches)를 통한 독립적인 작업 흐름 관리, [pull request 및 코드 리뷰](https://github.com/Bletcher-Project/bletcher-front/pulls)를 통한 협업을 진행하고 있습니다!!_

---

## Technology

- React.js
- Redux (redux-thunk)
- JavaScript
- SCSS
- prop-types
- reactstrap
- material-ui

![](https://i.imgur.com/DCR4E07.jpg)

## 프로젝트 설계

- 팀 리빌딩 이후 전체적 코드 리팩토링 ([▶︎ Issue](https://github.com/Bletcher-Project/bletcher-front/issues/5))
- npm to yarn ([▶︎ Issue](https://github.com/Bletcher-Project/bletcher-front/issues/7))
- CRA/Webpack,Babel Config
    - [about CRA](https://github.com/Bletcher-Project/bletcher-front/issues/16)
    - [about Webpack & Babel](https://github.com/Bletcher-Project/bletcher-front/issues/13)
- Component 구조 설계 ([▶︎ Issue](https://github.com/Bletcher-Project/bletcher-front/issues/17))
- Redux
    - [Learn](https://github.com/Bletcher-Project/bletcher-front/issues/8)
    - [Design](https://github.com/Bletcher-Project/bletcher-front/issues/12)
    - [Middleware](https://github.com/Bletcher-Project/bletcher-front/issues/21)

![](https://i.imgur.com/QsZSC6c.jpg)

## 핵심 기능

- 사용자 관리
    - 회원가입 및 로그인, 로그아웃
    - localStorage를 사용하여 유저별 token 발급 및 로그인 상태 유지
    - 회원 정보 수정 기능
- Post
    - UserPage에서 새로운 Post 업로드 가능
    - 페이지별 Post View 차별화
        - hover : Mix 버튼, Favorite 버튼, Share 버튼 등
        - onClick : Post Detail 페이지 이동
- Mix
    - MainPage와 UserPage에서 Post 합성 요청
    - 합성 요청 후 완료될 때까지 페이지 간 이동 가능
    - 완료 시 MixComplete 모달을 통해 합성 결과 확인 가능
- Funding
    - 합성된 작품에 대해 사용자들은 펀딩 가능
    - 일정 펀딩 수를 달성한 작품은 Bletcher Shop으로 출품 가능 _(Shop : in version 2)_
- Favorite
    - 특정 게시물 즐겨찾기 기능

## About Bletcher


#### Sign Up / In

<img width="1280" alt="signin_out" src="https://user-images.githubusercontent.com/22493971/113881838-c1daf280-97f7-11eb-84ad-49dba5c2fe93.png">


---


#### Main Page

![mainpage](https://user-images.githubusercontent.com/22493971/113881927-d61eef80-97f7-11eb-9d80-c8a33fdf224f.jpg)



---


#### New Page

<img width="1280" alt="new" src="https://user-images.githubusercontent.com/22493971/113881939-d8814980-97f7-11eb-9726-cce3cd9b8e15.png">


---

#### Funding Page
![funding_page](https://user-images.githubusercontent.com/22493971/113881961-dcad6700-97f7-11eb-9523-f24d577ff75f.jpg)


---

#### FavoritePage

<img width="1280" alt="favorite" src="https://user-images.githubusercontent.com/22493971/113881972-e040ee00-97f7-11eb-9c86-8c441a023710.png">

---

#### UserPage
![userpage(madebyme)](https://user-images.githubusercontent.com/22493971/113881993-e46d0b80-97f7-11eb-828e-bb029f25d8ba.jpg)

---

#### Profile Update
![user_profile_edit](https://user-images.githubusercontent.com/22493971/113882010-e8009280-97f7-11eb-9a61-18f965b6b3db.jpg)


---

#### Upload Post

<img width="1280" alt="upload_1" src="https://user-images.githubusercontent.com/22493971/113882029-ecc54680-97f7-11eb-9635-d8a51a042589.png">
<img width="1280" alt="upload_2" src="https://user-images.githubusercontent.com/22493971/113882190-0f575f80-97f8-11eb-8617-37ab8839b0b7.png">



---

#### Mix

<img width="1280" alt="mix_table" src="https://user-images.githubusercontent.com/22493971/113882218-13837d00-97f8-11eb-8825-4742e399a114.png">
<img width="1280" alt="mix_palette" src="https://user-images.githubusercontent.com/22493971/113882230-167e6d80-97f8-11eb-8481-90cd3a8baa30.png">


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

## License<a id="license"></a>

프로젝트의 모든 라이센스는 [MIT License](http://opensource.org/licenses/MIT)를 따릅니다. 상세 라이센스 정보는 [Bletcher License](./LICENSE)를 참조해주세요.

---

## Bletcher Team

- 권혁진 - [@KimKwon](https://github.com/KimKwon) - khj9709@icloud.com
- 김동규 - [@kimdg1105](https://github.com/kimdg1105) - kimss7334@naver.com
- 서그림 - [@Seogeurim](https://github.com/Seogeurim) - geulims@naver.com
- 윤가영 - [@yoongoing](https://github.com/yoongoing) - rkdud0925@hanyang.ac.kr
