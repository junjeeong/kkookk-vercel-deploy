## 프론트엔드 라우트

### 최상위

| Path | 설명             |
| ---- | ---------------- |
| `/`  | 런처 (모드 선택) |

---

### Customer (`/customer`)

| Path                              | 설명             |
| --------------------------------- | ---------------- |
| `/customer`                       | 랜딩             |
| `/customer/login`                 | 로그인           |
| `/customer/signup`                | 회원가입         |
| `/customer/wallet`                | 지갑 (카드 목록) |
| `/customer/wallet/:cardId`        | 카드 상세        |
| `/customer/wallet/:cardId/stamp`  | 적립 요청        |
| `/customer/history`               | 적립/사용 내역   |
| `/customer/redeems`               | 리워드 목록      |
| `/customer/redeems/:redeemId/use` | 리워드 사용      |
| `/customer/migrations`            | 전환 신청 목록   |
| `/customer/migrations/new`        | 전환 신청 작성   |
| `/customer/settings`              | 설정             |

---

### Owner (`/owner`)

| Path                                               | 설명             |
| -------------------------------------------------- | ---------------- |
| `/owner/login`                                     | 로그인           |
| `/owner/stores`                                    | 매장 목록        |
| `/owner/stores/new`                                | 매장 추가        |
| `/owner/stores/:storeId`                           | 매장 상세        |
| `/owner/stores/:storeId/history`                   | 적립/사용 내역   |
| `/owner/stores/:storeId/migrations`                | 전환 신청 관리   |
| `/owner/stores/:storeId/stamp-cards/new`           | 스탬프 카드 생성 |
| `/owner/stores/:storeId/stamp-cards/:cardId/stats` | 카드 통계        |

---

### Terminal (`/terminal`)

| Path                 | 설명     |
| -------------------- | -------- |
| `/terminal/:storeId` | 대시보드 |
