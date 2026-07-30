# Design Updates - To-Be UI 반영 사항

## 📋 개요

제공하신 "to-be" Shipment Overview 디자인 이미지를 분석하여 프로젝트 규칙과 구현을 업데이트했습니다.

**디자인 이미지 특징:**
- 마젠타/분홍색 헤더 (ONE CHORUS TEST 브랜드)
- 좌측 네비게이션 사이드바
- 필터 & 검색 섹션 (Date Type, Status, Cargo Nature)
- 다중 열 테이블 뷰 (Booking No., SHPR, CNEE, VVD, Dates, Status)
- 상태 배지 (Firm, Waiting, Advanced, Cancelled)

---

## ✅ 업데이트된 규칙 문서

### 1. Rule 01: Domain-Driven Design & Architecture

#### 변경사항
```markdown
Before:
- 단일 뷰: "Single A/N Unified Workspace"

After:
- 듀얼 뷰 아키텍처:
  1. List View (Shipment Overview Dashboard)
  2. Detail View (Single B/L Review & Approval)
```

#### 추가된 내용
- **List View 목적**: 모든 북킹의 개요 + 필터링 + 검색
- **Detail View 목적**: 단일 B/L의 완전한 정보 + 승인 워크플로우
- **승인 워크플로우**: 상태 진행(Pending → Sending → Dispatched)
- **데이터 도메인 모델**: BookingRecord aggregate root와 모든 엔티티 정의

### 2. Rule 02: UI/UX & Data Field Specifications

#### 변경사항 - 필드 매핑 대폭 확대

**테이블 뷰 컬럼 (List View)**
```
Issue | Booking No. | SHPR Code | SHPR | CNEE | T/VVD | 1st VVD | 
Sail Date | CY Cut Off | ERD | Vol | Status
```

**상세 뷰 필드 (Detail View)**
```
Shipper Section:
- Shipper Code
- Shipper Name
- Shipper Address

Schedule Section:
- B/L No., VVD, T/VVD
- POD, POL, Place of Delivery
- Sail Date, POD ETA
- Available Date, Last Free Date
- CY Cut Off, ERD

Container Section:
- Container Type
- Volume
- Pickup CY/CFS, Return CY
```

#### 새로운 UI 레이아웃

**5-Section 구조:**
1. **Top Navigation Bar**: Logo, Breadcrumb, User Menu
2. **Left Sidebar Menu**: 모듈 네비게이션
3. **Filter & Controls**: Date, Status, Cargo Nature 필터
4. **Table View**: 정렬 가능한 다중 열 테이블
5. **Detail View**: 선택된 B/L의 상세 정보 (모달 또는 새 페이지)

#### 색상 & 상태 코딩

| 상태 | 컬러 | 설명 |
|------|------|------|
| Firm | 파란색 | 확정 북킹 |
| Waiting | 파란색 | 승인 대기 |
| Advanced | 파란색 | 조기 출하 |
| Cancelled | 빨간색 | 취소됨 |
| Pending Review | 파란색 | 검토 대기 (신규) |
| Sending... | 주황색 | 전송 중 (신규) |
| Dispatched | 초록색 | 완료 (신규) |

### 3. Rule 03: Language & Labeling Mandate

#### 완전히 재작성됨 - 포괄적인 라벨 표준

**추가된 섹션:**
- **Navigation & Menu**: Booking Management, Shipment Overview
- **List View Headers**: Issue, Booking No., SHPR, CNEE, etc.
- **Filter Section**: Date Type, Date Period, Booking Status, Cargo Nature
- **Detail View Fields**: 모든 필드의 표준 영어 라벨
- **Action Buttons**: Search, Reset, Download, Approve, View in OPUS
- **Status & Badges**: Firm, Waiting, Advanced, Cancelled, Pending, Dispatched
- **Typography Standards**: 폰트 크기, 굵기 명시
- **Component Spacing**: 마진, 패딩 표준화
- **Tone of Voice**: 지시적, 직접적, 동사 중심

---

## 🔄 코드 업데이트

### TypeScript 인터페이스 확장

```typescript
// Before: 12개 필드
interface ArrivalNoticeRecord {
  vvd, blNo, deliveryTerm, cntrType, del, podEta, 
  availableDate, lastFreeDate, pickupYard, returnYard, formType, remark
}

// After: 26개 필드 (모든 테이블 + 상세 뷰 필드 포함)
interface ArrivalNoticeRecord {
  // Booking & Document
  bookingNo, vvd, tVvd, blNo, formType, volume, cargoNature
  
  // Shipper
  shipperCode, shipperName, shipperAddress
  
  // Consignee
  consigneeName, consigneeAddress
  
  // Location
  pod, pol, del, cyYard, pickupYard, returnYard
  
  // Dates
  sailDate, podEta, availableDate, lastFreeDate
  
  // Approval
  deliveryTerm, status, confidenceScore, matchStatus, remark
  
  // Contact
  customerCode, customerName, customerAddress, 
  contactEmail, contactFax
}
```

### Mock 데이터 강화

```typescript
// Before: 기본 정보만
{
  vvd: 'OOCL001/0725N',
  blNo: 'OOCL202400001234',
  ...
}

// After: 실제 to-be 디자인 기반 데이터
{
  bookingNo: 'SELBK3645303',     // 테이블에 표시되는 정보
  shipperCode: 'SE JUNG SHIPPING CO., LTD',
  shipperName: 'SE JUNG SHIPPING CO., LTD',
  shipperAddress: '123 Port Road, Shanghai, China',
  consigneeName: 'Shanghai Trading Co., Ltd',
  consigneeAddress: '123 Zhongshan Road, Shanghai, China',
  cargoNature: 'General Cargo',
  ...
}
```

### 컴포넌트 업데이트

#### RightPanel.tsx
- **Before**: 플랫한 필드 그리드
- **After**: 논리적 섹션 구조
  - Vessel Information
  - Booking Details
  - Port & Location
  - Critical Dates
  - Container & Cargo

```tsx
// 새로운 섹션 기반 구조
<div className="space-y-6">
  <Section title="Vessel Information">
    <Field label="VVD" />
    <Field label="T/VVD" />
  </Section>
  <Section title="Port & Location">
    <Field label="POD" />
    <Field label="POL" />
    <Field label="Place of Delivery" />
  </Section>
  ...
</div>
```

#### LeftPanel.tsx
- **Before**: 고객 정보만
- **After**: Shipper + Consignee 구분

```tsx
// 듀얼 섹션 표시
<Section title="Shipper (SHPR)">
  <Field label="Shipper Code" />
  <Field label="Shipper Name" />
  <Field label="Address" />
</Section>

<Section title="Consignee (CNEE) / Notify">
  <Field label="Consignee Name" />
  <Field label="Address" />
</Section>
```

---

## 📊 디자인 비교표

| 항목 | 이전 | 현재 (To-Be 반영) |
|------|------|-------------------|
| **뷰 수** | 1 (Detail Only) | 2 (List + Detail) |
| **테이블** | 없음 | 다중 열 정렬 가능 |
| **필터** | 없음 | Date, Status, Cargo, Office |
| **필드 수** | 12 | 26+ |
| **Shipper 정보** | 없음 | 별도 섹션 |
| **배경색** | 흰색 | 마젠타 헤더 |
| **상태 배지** | 3가지 | 7가지 |
| **리스트 뷰** | 우측바 간단 목록 | 풀 테이블 |
| **Navigation** | 없음 | 좌측 사이드바 |

---

## 🎯 구현 로드맵

### Phase 1 (현재)
✅ 규칙 문서 업데이트 (01, 02, 03)  
✅ 타입 확장 (26개 필드)  
✅ Mock 데이터 강화  
✅ 컴포넌트 구조 개선  
✅ 필드 조직 재편성  

### Phase 2 (예정)
🔜 List View 컴포넌트 구현
  - TableView.tsx (정렬, 페이지네이션)
  - FilterPanel.tsx (Date, Status, Cargo 필터)
  - SearchBar.tsx (Booking No., VVD, POD, POL)

🔜 Header & Navigation
  - TopNavBar.tsx (브랜드, 사용자 메뉴)
  - Sidebar.tsx (모듈 네비게이션)

🔜 레이아웃 통합
  - DualViewLayout.tsx (List ↔ Detail 전환)

### Phase 3 (향후)
🔜 실제 API 연동
🔜 Kafka 스트림 통합
🔜 Database 아카이브
🔜 다중 사용자 워크플로우

---

## 📝 다음 단계

### 개발자 체크리스트
- [ ] 브라우저에서 업데이트된 Detail View 테스트 (Shipper 섹션 확인)
- [ ] Mock 데이터의 추가 필드 렌더링 확인
- [ ] 필드 섹션 구분이 시각적으로 명확한지 검증
- [ ] RightPanel의 새로운 섹션 레이아웃 확인
- [ ] LeftPanel의 Shipper 섹션 표시 확인
- [ ] 콘솔 로그에서 확장된 데이터 구조 검증

### 다음 큰 작업
1. **List View 컴포넌트** (TableView, FilterPanel)
2. **Top Navigation** (Header, Sidebar)
3. **레이아웃 통합** (List ↔ Detail 네비게이션)
4. **반응형 디자인** (Tablet, Mobile)

---

## 📚 참고 자료

- 제공된 To-Be 디자인: ONE CHORUS TEST Shipment Overview
- 마젠타 색상: `#d91e63` (Material Design Pink)
- 브레이크포인트: Desktop (1920px+), Tablet (768-1200px), Mobile (<768px)

---

**업데이트 날짜**: 2026-07-30  
**상태**: Design Alignment Complete  
**다음 검토**: List View 구현 시작 전
