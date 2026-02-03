# 현재 라우팅 구조의 문제점

## 현재 방식: `useState` + `switch` 기반 뷰 전환

```tsx
const [viewMode, setViewMode] = useState<ViewMode>('launcher');

switch (viewMode) {
  case 'customer': return <CustomerApp />;
  case 'store': return <TerminalDashboardPage />;
  // ...
}
```

---

## 핵심 문제점

### 1. URL이 변하지 않음
- 어떤 화면이든 URL은 항상 `http://localhost:5173/`
- **북마크 불가** → 사용자가 특정 페이지 저장 못함
- **공유 불가** → 링크 보내도 항상 런처 페이지로 이동
- **딥링크 불가** → `/customer/wallet/123` 같은 직접 접근 불가

### 2. 브라우저 내비게이션 무력화
- **뒤로가기/앞으로가기 버튼** 작동 안함
- 사용자가 뒤로가기 누르면 앱을 벗어남 (이전 사이트로 이동)
- 모바일 PWA에서 치명적인 UX 문제

### 3. 새로고침 = 상태 초기화
- F5 누르면 무조건 `launcher`로 돌아감
- 진행 중이던 작업 모두 소실
- `requests`, `stampCard` 등 모든 상태 리셋

### 4. Prop Drilling 지옥
```tsx
<CustomerApp
  requests={requests}
  addRequest={addRequest}
  updateRequestStatus={updateRequestStatus}
  stampCard={stampCard}
  allCards={allCards}
  goBack={goBack}
/>
```
- App.tsx가 모든 상태의 허브가 됨
- 깊은 컴포넌트까지 props 계속 전달해야 함
- 컴포넌트 간 결합도 높아짐

### 5. 코드 스플리팅 제한
- React Router의 `lazy()` 활용 불가
- 모든 앱 코드가 초기 번들에 포함
- 초기 로딩 시간 증가

### 6. 테스트 어려움
- 특정 페이지만 독립적으로 테스트하기 어려움
- URL 기반 테스트 시나리오 작성 불가

---

## 권장 구조: React Router

```tsx
// src/app/router/index.tsx
const router = createBrowserRouter([
  { path: '/', element: <LauncherPage /> },
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { path: 'wallet', element: <WalletPage /> },
      { path: 'stamp/:id', element: <StampDetailPage /> },
    ]
  },
  { path: '/terminal', element: <TerminalDashboardPage /> },
  { path: '/admin/*', element: <AdminApp /> },
]);
```

### 해결되는 것들
| 문제 | React Router 사용 시 |
|------|---------------------|
| URL 불변 | 페이지마다 고유 URL |
| 뒤로가기 | 브라우저 히스토리 연동 |
| 새로고침 | URL 기반 상태 복원 가능 |
| Prop Drilling | Context/Outlet으로 분리 |
| 코드 스플리팅 | `lazy()` + `Suspense` |

---

## 마이그레이션 우선순위

1. **React Router 설치 및 기본 경로 설정**
2. **공유 상태를 Context 또는 TanStack Query로 분리**
3. **각 모드별 nested routes 구성**
4. **lazy loading 적용**
