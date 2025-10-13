# Deokive FE

React + TypeScript + Vite 기반 프론트엔드 초기 세팅입니다.

## Scripts

- `npm run dev`: 개발 서버 실행
- `npm run build`: 타입체크 후 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기
- `npm run lint`: ESLint 검사

## Tech Stack

- React 19, Vite 7, TypeScript 5.9
- 라우팅: react-router-dom
- 서버 캐시: @tanstack/react-query (+ devtools)
- 전역 상태: zustand
- Lint: ESLint v9 Flat Config, Type-Checked 룰
- Format: Prettier

## 폴더 구조

```
src/
  api/
  assets/
  components/
  constants/
  hooks/
  pages/
    Home.tsx
    NotFound.tsx
  router/
    index.tsx
  store/
    counter.ts
  types/
  style/
  App.tsx
  main.tsx
  index.css
```

## 설정 메모

- `index.html`의 언어는 `lang="ko"`로 설정됨
- React Query Devtools는 개발 중에만 열어 사용하세요
- ESLint는 타입 인지 룰(`recommendedTypeChecked`)을 사용

## 시작하기

1. 의존성 설치: `npm i`
2. 개발 서버: `npm run dev`
3. 프로덕션 빌드: `npm run build`
