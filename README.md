# 0. Rello

이 프로젝트는 To Do List 애플리케이션으로, 트렐로(Trello)에서 인스퍼레이션을 받아서 진행했으며, 모바일, 태블릿, 데스크톱 3종류의 반응형 디자인으로 구현했습니다.

프로젝트 링크 : [https://songforthemute.github.io/rello]("https://songforthemute.github.io/rello")

미디엄 블로그 링크 : [https://tsrello.netlify.app]("https://tsrello.netlify.app")

---

## 목차

1. 기술 스택
2. 프로젝트 기능
3. 프로젝트 스크립트

---

## 1. 기술 스택

-   Language : `TypeScript`

-   Frontend : `ReactJS`, `Styled-component`, `Recoil`, `React-hook-form`, `React-beautiful-dnd`

-   Distribution : `netlify`

---

## 2. 프로젝트 기능

-   메인 페이지에 기본 3개 보드

-   모바일(~425px), 태블릿(~768px), 데스크톱 3종류의 반응형 디자인 구현

-   보드의 추가 폼과 제거 버튼, 이름 수정 기능 구현

-   To Do 카드의 추가와 제거 버튼 구현

-   To Do 카드의 세부 내용 모달 폼과 제목 및 세부 내용 수정 모드 기능 구현

-   React-beautiful-dnd 라이브러리의 드래그-드롭을 이용한 카드의 위치 변경과 삭제 기능 구현

-   Recoil을 통한 상태 관리와 localStorage에 데이터 저장

---

## 3. 프로젝트 스크립트

### `npm start`

프로젝트를 개발 모드로 실행할 수 있습니다. [http://localhost:3000]("http://localhost:3000") 환경에서 실행되며, 기본 포트 넘버는 3000입니다.

### `npm build`

애플리케이션이 `build` 폴더에 빌드됩니다.

### `npm predeploy`

애플리케이션의 `gh-pages`를 이용한 배포를 하기 위한 사전 빌드 작업입니다. `npm run build`와 같습니다.

### `npm deploy`

`-d 디렉토리명` 폴더의 애플리케이션을 gh-pages를 통해 배포합니다. Github repository에서도 확인할 수 있습니다.

---

# 봐주셔서 감사합니다!
