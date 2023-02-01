# 0. Rello

## **_개요_**

이 프로젝트는 할 일 목록 보드 웹 애플리케이션으로, Trello에서 영감을 얻어 진행했으며, React.js를 기반으로 개발한 웹 애플리케이션입니다.

Project Deployment : [rello](https://songforthemute.github.io/rello)

Medium Blog : [https://tsrello.netlify.app](https://tsrello.netlify.app)

---

## 목차

1. 기술 스택
2. 구현 기능
3. 프로젝트 상세
4. 프로젝트 개발 환경
5. 프로젝트 스크립트

---

## _1. 기술 스택_

-   Language : `TypeScript`

-   Core Framework/Library : `React.js`

-   State Management : `Recoil`, `localStorage API`

-   Styling : `Styled-components`, `React-beautiful-dnd`

-   Deployment : `Netlify`

-   Others : `React-router-dom`, `React-hook-form`,

---

## _2. 구현 기능_

-   보드 관련
    -   3개의 기본 보드
    -   보드 이름 변경
    -   보드 삭제
    -   보드 내 추가 버튼을 통한 할 일 카드 추가
    -   보드 추가 버튼을 통한 새 보드 추가
    -   드래그 앤 드롭을 통한 보드 간 할 일 카드 이동
    -   드래그 앤 드롭을 통한 할 일 카드 삭제
-   할 일 카드 관련
    -   할 일 카드의 자세한 내용을 모달로 제공
    -   제목 및 세부 내용 수정
    -   최근 수정 일자 갱신

---

## 3. 프로젝트 상세

-   이 프로젝트의 프론트엔드 파트는 `React.js` 라이브러리를 이용해 개발하였습니다.

-   `Recoil`을 이용해 상태를 관리했으며, `localStorage API`를 이용해 웹 페이지에서 벗어난 후 재접속 시에도 데이터가 유지될 수 있도록 하였습니다.

-   스타일링은 `CSS-in-JS` 방식의 `Styled-Components`로 개발하였습니다. 폼 컴포넌트는 `React-hook-form`을, 드래그 앤 드롭은 `React-beautiful-dnd`을 추가로 이용해 개발하였습니다.

-   다양한 기기의 호환성 배려를 위해 미디어 쿼리를 이용해 반응형 디자인으로 개발하였습니다.

---

## 4. 프로젝트 개발 환경

-   Editor : `Visual Studio Code`
-   OS : `Mac OS Monterey 12.6 (w/ Apple M1)`
-   Runtime : `Node.js v16.14.0`
-   Package Manager : `npm`
-   Browser : `Chrome` | `Safari` | `Vivaldi`

---

## 5. 프로젝트 스크립트

```
npm start
```

-   프로젝트를 개발 모드로 실행할 수 있습니다. [http://localhost:3000]("http://localhost:3000") 환경에서 실행되며, 기본 포트 넘버는 3000입니다.

```
npm build
```

-   애플리케이션이 `build` 폴더에 빌드됩니다.

```
npm predeploy
```

-   애플리케이션의 `gh-pages`를 이용한 배포를 하기 위한 사전 빌드 작업입니다. `npm run build`와 같습니다.

```
npm deploy
```

-   `-d 디렉토리명` 폴더의 애플리케이션을 gh-pages를 통해 배포합니다. Github repository에서도 확인할 수 있습니다.

---

<h2 align="center"><i>
Thank you for visit, <br/>
Have a great day! <br/>
  <br/>
<i></h2>
