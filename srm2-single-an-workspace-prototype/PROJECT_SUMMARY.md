# SRM2 Single A/N Workspace - 프로젝트 완성 요약

## 📊 프로젝트 상태

| 항목 | 상태 | 파일 수 | 설명 |
|------|------|--------|------|
| **프로젝트 설정** | ✅ 완료 | 1 | package.json, tsconfig.json, 빌드 설정 |
| **컴포넌트** | ✅ 완료 | 5 | HeaderNav, LeftPanel, RightPanel, Badges |
| **상태 관리** | ✅ 완료 | 1 | Zustand store (approval, Kafka, archive) |
| **타입/인터페이스** | ✅ 완료 | 1 | ArrivalNoticeRecord, Kafka 타입 |
| **Mock 데이터** | ✅ 완료 | 1 | 3개 B/L 샘플 (신뢰도 등급 포함) |
| **스타일링** | ✅ 완료 | 3 | Tailwind, globals.css, PostCSS |
| **라이브러리** | ⏳ 대기 | - | npm install 필요 |

## 🎯 구현된 주요 기능

### 1. 1-Click 승인 워크플로우
```
Button Click
  ↓
Status: Pending → Sending... (1초 지연, 스피너 표시)
  ↓
Kafka CDC 이벤트 발행 시뮬레이션 (1.5초)
  ↓
Status: Dispatched (성공 메시지 표시)
  ↓
레코드 아카이빙 (pending에서 제거)
```

### 2. AI 신뢰도 배지 (시각적 표시)
- **초록색 배지**: confidenceScore > 95% (높은 신뢰도)
- **황색 배지**: confidenceScore ≤ 95% (주의 필요)
- **동적 아이콘**: ✓ (녹색) 또는 ! (황색)

### 3. OPUS 화면 링크
- `View in OPUS` 버튼 클릭 시 깊은 링크 생성
- URL 형식: `https://opus.internal/esm_bkg_1054?bl_no=[B/L_NO]`
- 콘솔에 로깅되며, 실제 OPUS 시스템과 연동 가능

### 4. 3-패널 UI 레이아웃

#### 헤더 (HeaderNav.tsx)
- B/L 검색 입력 필드
- 실시간 상태 뱃지 (Pending Review / Sending / Dispatched)
- View in OPUS 버튼 (파란 배경)

#### 왼쪽 패널 (LeftPanel.tsx) - 고객 정보
- 고객명, 주소
- 신뢰도 뱃지 (AI Suggested / Matched / Unmatched)
- 검증된 고객 코드 또는 AI 제안 코드
- 통지 연락처 (이메일, 팩스)

#### 오른쪽 패널 (RightPanel.tsx) - 스케줄 & 승인
**필수 표시 필드 (12개)**:
- VVD, B/L No., Delivery Term
- Container Type, Place of Delivery, POD ETA
- Available Date, Last Free Date
- Pickup CY/CFS, Return CY, Form Type
- Remark (텍스트 입력)

**제외된 필드** (SRM2 전략):
- ❌ HUB
- ❌ DEL ETA
- ❌ POD FIRMS
- ❌ P/Up FIRMS
- ❌ Agent

**액션 영역**:
- `Approve & Send Arrival Notice` 버튼 (파란색)
- 상태별 메시지 표시 (성공/보관됨)

#### 우측바 (Sidebar)
- 대기 중인 B/L 목록 (클릭 시 선택)
- 처리 완료된 레코드 (보관됨)

## 💾 상태 관리 (Zustand Store)

```typescript
// 메인 액션 메서드
approveAndSendArrivalNotice()   // 3단계 워크플로우 실행
  ├─ simulateKafkaCDCSync()    // Kafka 이벤트 발행 (1.5초)
  └─ archiveRecord()            // 아카이빙 처리

updateRemark()                   // 비고 텍스트 업데이트
openOpusScreen()                 // OPUS 깊은 링크 생성
selectRecord()                   // B/L 선택
setRecords()                     // 레코드 리스트 설정
```

## 📊 Mock 데이터 (3개 샘플)

### 1. OOCL202400001234
- 신뢰도: **98%** (초록 배지) ✓
- 상태: Matched
- 고객: Shanghai Trading Co., Ltd
- 미니 VVD: OOCL001/0725N

### 2. MSC202400005678
- 신뢰도: **87%** (황색 배지) !
- 상태: AI_Suggested (AI 제안 코드 포함)
- 고객: Ningbo Electronics Import
- 추가 정보: 제안된 대안 코드

### 3. EVERGREEN2024009999
- 신뢰도: **65%** (황색 배지) !
- 상태: Unmatched (매칭 안 됨)
- 고객: Xiamen Import-Export Co.
- 수정 필요

## 🔧 기술 스택

| 계층 | 기술 | 버전 | 용도 |
|------|------|------|------|
| **Framework** | Next.js (App Router) | ^14.0.0 | 풀스택 React 프레임워크 |
| **UI Library** | React | ^18.2.0 | UI 컴포넌트 |
| **Styling** | Tailwind CSS | ^3.3.0 | 유틸리티 CSS |
| **Icons** | Lucide React | ^0.263.1 | 아이콘 라이브러리 |
| **State Mgmt** | Zustand | ^4.4.0 | 가벼운 상태 관리 |
| **Language** | TypeScript | ^5.0.0 | 타입 안정성 |

## 📁 파일 구조

```
srm2-single-an-workspace-prototype/
├── .claude/
│   ├── settings.json                    # 프로젝트 설정
│   ├── rules/
│   │   ├── 01-domain-and-architecture.md
│   │   ├── 02-ui-ux-field-rules.md
│   │   ├── 03-language-and-style.md
│   │   └── 04-mock-data-and-api.md
│
├── app/
│   ├── layout.tsx                       # 루트 레이아웃
│   ├── page.tsx                         # 메인 워크스페이스 페이지
│   └── globals.css                      # 전역 스타일
│
├── components/
│   ├── HeaderNav.tsx                    # 헤더 (검색 + 상태 + OPUS 버튼)
│   ├── LeftPanel.tsx                    # 왼쪽 패널 (고객 정보)
│   ├── RightPanel.tsx                   # 오른쪽 패널 (스케줄 + 승인)
│   ├── ConfidenceBadge.tsx              # AI 신뢰도 배지
│   └── StatusBadge.tsx                  # 상태 배지
│
├── store/
│   └── arrival-notice-store.ts          # Zustand 상태 관리
│
├── types/
│   └── arrival-notice.ts                # TypeScript 인터페이스
│
├── lib/
│   └── mock-data.ts                     # Mock B/L 데이터 (3개 샘플)
│
├── package.json                         # 프로젝트 메타데이터 & 의존성
├── tsconfig.json                        # TypeScript 설정
├── tailwind.config.ts                   # Tailwind 설정
├── next.config.js                       # Next.js 설정
├── postcss.config.js                    # PostCSS 설정
├── .gitignore                           # Git 무시 규칙
├── README.md                            # 프로젝트 문서
├── SETUP.md                             # 셋업 가이드
└── PROJECT_SUMMARY.md                   # 이 파일
```

## 🚀 실행 방법

### 1단계: npm 설치 (최초 1회)
```bash
# Windows PowerShell
cd "C:\Users\2016116\my-workspace\srm2-single-an-workspace-prototype"
npm install
```

### 2단계: 개발 서버 실행
```bash
npm run dev
```

### 3단계: 브라우저 접속
```
http://localhost:3000
```

## ✨ 사용자 상호작용 시나리오

### 시나리오 1: B/L 검색 및 선택
1. 헤더의 "Search by B/L No..." 입력 필드에 `OOCL202400001234` 입력
2. Enter 키 누르기
3. 자동으로 해당 B/L 선택되고 좌측/우측 패널 업데이트

### 시나리오 2: 신뢰도 배지 확인
1. 좌측 패널의 "Code Validation" 섹션 확인
2. OOCL B/L: 98% (초록색 ✓ 배지) → 높은 신뢰도
3. MSC B/L: 87% (황색 ! 배지) → AI 제안 코드 표시
4. EVERGREEN B/L: 65% (황색 배지) → 수정 필요

### 시나리오 3: 승인 워크플로우
1. 우측 패널에서 `Approve & Send Arrival Notice` 버튼 클릭
2. **상태 변화**:
   - 초기: "Pending Review" (파란 배지)
   - 클릭 후: "Sending..." (주황색 배지 + 스피너)
   - 1.5초 후: "Dispatched" (초록 배지 + 체크마크)
3. **콘솔 로그**:
   ```
   [Kafka CDC Event] {
     eventType: "APPROVAL",
     blNo: "OOCL202400001234",
     timestamp: "2026-07-30T15:30:00Z",
     payload: { status: "DISPATCHED" }
   }
   ```
4. 우측바에서 레코드가 "Pending Records" → "Processed" 으로 이동

### 시나리오 4: OPUS 화면 열기
1. "View in OPUS" 버튼 클릭
2. 시뮬레이션 alert 표시 (실제 구현 시 새 창 열기)
3. **콘솔 로그**:
   ```
   [OPUS Screen] Opening: https://opus.internal/esm_bkg_1054?bl_no=OOCL202400001234
   ```

### 시나리오 5: 비고 수정
1. 우측 패널의 "Remark" 텍스트 영역 클릭
2. 텍스트 입력 (예: "Fragile goods - handle with care")
3. 저장 자동 (상태 업데이트)
4. 다른 B/L 선택했다 돌아오면 입력값 유지

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary Blue**: `#3b82f6` (버튼, 선택)
- **Success Green**: `#16a34a` (성공, Dispatched)
- **Warning Yellow**: `#fbbf24` (주의, AI 제안)
- **Pending Orange**: `#f97316` (진행 중)
- **Neutral Gray**: `#6b7280` (텍스트, 비활성)

### 타이포그래피
- **헤딩**: 14-18px, 600-700 weight
- **본문**: 12-14px, 400-500 weight
- **라벨**: 12px, 600 weight

### 스페이싱
- 패널 여백: 24px
- 컴포넌트 간 간격: 16px
- 요소 간 간격: 8px

## 🔍 콘솔 로깅 (개발자 도구)

**F12 열기 → Console 탭에서 다음 로그 확인**:

```javascript
// 승인 클릭 시
[Kafka CDC Event] Object

// OPUS 버튼 클릭 시
[OPUS Screen] Opening: https://opus.internal/...

// 상태 변화 추적
approvalProgress: "Pending" → "Sending..." → "Dispatched"
```

## 📝 DDD 원칙 적용

| 요소 | 구현 | 위치 |
|------|------|------|
| **Aggregate Root** | ArrivalNotice | types/arrival-notice.ts |
| **Entities** | ConsigneeContact, VesselSchedule | 타입 정의 |
| **Value Objects** | ConfidenceScore, FreeDateRange | 배지 컴포넌트 |
| **Bounded Context** | Shipment Release & A/N | 모든 컴포넌트 |

## ⚠️ 주의사항

1. **npm 필수**: Node.js만으로는 실행 불가 (npm 필요)
2. **포트 3000**: 다른 프로세스에서 사용 중이면 변경 필요
3. **성능**: Mock 데이터만 사용 (실제 DB 미연동)
4. **OPUS 링크**: 시뮬레이션 모드 (실제 레거시 시스템 미연동)

## 🔜 향후 개선 사항

- [ ] 실제 Kafka 이벤트 스트림 연동
- [ ] PostgreSQL 아카이브 저장소 추가
- [ ] OPUS API 통합
- [ ] 배치 승인 모드 (다중 B/L)
- [ ] 감사 추적 로그
- [ ] 다중 사용자 워크플로우
- [ ] 모바일 반응형 디자인

## ✅ 체크리스트

- ✅ 프로젝트 구조 생성
- ✅ React 컴포넌트 작성
- ✅ Zustand 상태 관리 구현
- ✅ Mock 데이터 준비
- ✅ 타입 정의 완료
- ✅ Tailwind CSS 설정
- ✅ 문서 작성
- ⏳ npm 라이브러리 설치 (npm 환경 필요)
- ⏳ 개발 서버 실행 (npm install 후)

---

**프로젝트 생성 일시**: 2026-07-30  
**개발자**: Claude AI  
**상태**: 준비 완료 (npm 설치 대기 중)
