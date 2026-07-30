# Functional Card Design - High-Level Architecture Alignment

## 🎯 Strategic Overview

**목표**: 5개의 AS-IS 레거시 화면을 **3개의 핵심 함수형 카드(Functional Cards)**로 통합하여 사용자가 단일 화면에서 배송 관련 모든 업무를 처리할 수 있도록 함.

### High-Level Design Principle
```
Legacy 5 Screens → 3 Functional Cards → 1-Click Approval Workflow
```

---

## 📋 3개 핵심 함수형 카드

### Card 1️⃣: Customer Code & Validation Panel
**출처**: ESM_BKG_1054 (Arrival Notice: Code Validate)  
**목적**: B/L 고객 정보 vs. MDM 코드 비교 및 AI 신뢰도 표시

#### 카드 구성
```
┌─────────────────────────────────────────────────────────┐
│ 📋 Customer Code & Validation                           │
├─────────────────────────────────────────────────────────┤
│ B/L Customer Info              │ Matched MDM Code       │
│ ─────────────────────────────  │ ──────────────────────  │
│ Name: AK FARM CO., LTD         │ Code: KR203915         │
│ Address: 38-1, 3F, 932...      │ Name: AK FARM CO. LTD  │
│                                │ Address: 38-1, 3F...   │
│ B/L No: MELG028... (link)      │ Confidence: 98% ✓      │
│                                │                        │
│ [Alternative Code]              │ [Code for A/N]        │
│ Suggested: KR500071 (87%)       │ Final: KR203915       │
│ (AI based match)                │ [✓ Verified]          │
│                                │                        │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Type: CNEE/NTFY | Evaluation: Matched              │ │
│ │ [Revise Code]                                       │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### 필드 매핑
| 필드 | 타입 | 소스 | 설명 |
|------|------|------|------|
| B/L Customer Name | Text | ESM_0672 | 고객사명 |
| B/L Customer Address | Text | ESM_0672 | 고객 주소 |
| Matched MDM Code | Dropdown | ESM_1054 | 매칭된 코드 |
| Matching Confidence | Badge | ESM_1054 | 신뢰도 (%) |
| Suggested Code | Badge | ESM_1054 | AI 제안 (노란색) |
| Code for A/N | Badge | ESM_1054 | 최종 코드 (녹색) |
| Evaluation | Badge | ESM_1054 | Matched/Unmatched |
| Type | Badge | ESM_1054 | CNEE/NTFY |

#### 액션 버튼
- `[Revise Code]` - 코드 수정 (인라인)
- `[AI Suggestion]` - AI 제안 토글 (선택사항)

#### 제외 필드
- ✅ Code Lookup (검색은 헤더의 필터로 이동)

---

### Card 2️⃣: Vessel Arrival & Schedule Panel
**출처**: ESM_BKG_0672 (Arrival Information - Container Details)  
**목적**: 선박 도착 일정, 픽업/반납, 형식 정보를 한눈에 표시

#### 카드 구성
```
┌────────────────────────────────────────────────────────────┐
│ 🚢 Vessel Arrival & Schedule                              │
├──────────────┬──────────────────────────────────────────── │
│ Core Vessel  │ Dates & Deadlines                           │
│ ─────────    │ ─────────────────                           │
│ VVD:         │ POD ETA:        2026-06-16                  │
│ 1CLT0012W    │ Available Date: 2026-06-16                  │
│              │ Last Free Date: 2026-06-17                  │
│ Vessel:      │ CY Cut Off:     2026-06-17                  │
│ ONE CLARA    │ ERD:            2026-06-20                  │
│              │                                             │
├──────────────┴──────────────────────────────────────────── │
│ Pickup & Return                                            │
│ ─────────────────────────────────────────────────────      │
│ Pickup CY/CFS:  SHICT/CFS  │  Return CY:  SHICT           │
│ Full CNTR CY:   KRPUS14    │  Empty CY:   KRPUS10         │
│                                                             │
│ Document & Handling                                        │
│ ──────────────────────────────────────────────────        │
│ Container Type: DG      │ Delivery Term: Y                │
│ Form Type: EDI          │ Place of Delivery: Shanghai     │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ 📝 Remark:                                           │  │
│ │ [_____________________________________________]      │  │
│ │ □ Revise Flag  [Save Changes]  [Reset]             │  │
│ └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

#### 필드 매핑 (정렬된 순서)

**Keep & Consolidate** ✅
| 필드 | 타입 | 소스 | 섹션 |
|------|------|------|------|
| VVD | Text | ESM_0672 | Core Vessel |
| Vessel Name | Text | ESM_0672 | Core Vessel |
| POD ETA | DateTime | ESM_0672 | Dates |
| Available Date | DateTime | ESM_0672 | Dates |
| Last Free Date | DateTime | ESM_0672 | Dates |
| Pickup CY/CFS | Text | ESM_0672 | Pickup |
| Return CY | Text | ESM_0672 | Return |
| Container Type | Select | ESM_0672 | Document |
| Delivery Term | Y/N | ESM_0672 | Document |
| Form Type | Select | ESM_0672 | Document |
| Place of Delivery | Text | ESM_0672 | Document |
| Remark | TextArea | ESM_0672 | Notes |
| Revise Flag | Checkbox | ESM_0672 (Popup) | Control |

**Exclude** ❌
| 필드 | 이유 | 원본 |
|------|------|------|
| HUB | 불필요 (POD로 충분) | ESM_0672 |
| DEL ETA | 중복 (POD ETA로 충분) | ESM_0672 |
| POD FIRMS | 레거시 (배송사 선택 필요 없음) | ESM_0672 |
| P/Up FIRMS | 레거시 (픽업 야드로 충분) | ESM_0672 |
| Agent | 레거시 (담당자는 시스템에서 추적) | ESM_0672 |

#### 추가된 필드 (TO-BE)
| 필드 | 타입 | 설명 |
|------|------|------|
| CY Cut Off | DateTime | 컨테이너 야드 마감 |
| ERD | DateTime | 예상 반납 일자 |
| Full CNTR P/Up CY | Text | 풀 컨테이너 픽업 (ESM_0672 Popup) |
| Empty Return CY | Text | 빈 컨테이너 반납 (ESM_0672 Popup) |

#### 액션 버튼
- `[Save Changes]` - 변경사항 저장
- `[Reset]` - 원본값으로 복원
- `[Revise Flag]` - 체크박스로 수정 표기

---

### Card 3️⃣: Recipient & Contacts / Dispatch Execution
**출처**: ESM_BKG_0240 (Customer Info) + ESM_BKG_0381 (A/N Send)  
**목적**: 배송 관련 수신자(Recipient) 정보 및 1-Click 승인/송신 액션

#### 카드 구성
```
┌──────────────────────────────────────────────────────────────┐
│ 👥 Recipient & Contacts / Dispatch Execution               │
├──────────────────────────────────────────────────────────────┤
│ Primary Recipient              │ Secondary Recipient        │
│ ─────────────────────────      │ ───────────────────        │
│ CNEE/NTFY:                     │ CNEE/NTFY #2:             │
│ □ shanghai@trading.com         │ □ pohl@hyundai.com        │
│                                │                            │
│ Email: ✓ (Checked)             │ Email: ☐ (Unchecked)      │
│ Fax: +86-21-5000-0000          │ Fax: +86-574-8888-0000    │
│                                │                            │
│ Broker #1: HB CORP             │ Broker #2: WBL             │
│ Tel: [______________________]  │ Tel: [____________________]│
│                                │                            │
│ One Time Only: ☐ (Checkbox)    │ S/C No: SC-SH-001         │
│ P/O No: PO-2026-001            │ C/N: CN                   │
│                                │                            │
├──────────────────────────────────────────────────────────────┤
│ 📤 Dispatch Execution                                        │
│ ─────────────────────────────                              │
│ A/N Sent Status:               │ Send Via:                  │
│ ☐ Fax  ☐ Email  ☐ EDI-Cust    │ [✓] One of Above (Auto)  │
│                                │                            │
│ Notification Channels:                                       │
│ [Fax] [Email] [EDI for Cust] [EDI for ONEPORT]            │
│                                │                            │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Y/N Approval Decision: [Y] [N]                       │   │
│ │                                                      │   │
│ │ [✨ APPROVE & SEND ARRIVAL NOTICE] (Primary CTA)   │   │
│ │ Status: Ready (Green) | Sending... | Dispatched    │   │
│ │                                                      │   │
│ │ Doc Type: General | Batch Send Options (Optional)  │   │
│ └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

#### 필드 매핑 (3가지 섹션)

**Section A: Primary Recipient (ESM_0240)**
| 필드 | 타입 | 체크박스 | 설명 |
|------|------|---------|------|
| CNEE/NTFY Email | Text | ✓ | 주 수신자 이메일 |
| CNEE/NTFY Fax | Text | ✓ | 주 수신자 팩스 |
| Broker #1 | Text | - | 주 브로커 |
| Broker #1 Tel | Text | - | 주 브로커 전화 |

**Section B: Secondary Recipient (ESM_0240)**
| 필드 | 타입 | 체크박스 | 설명 |
|------|------|---------|------|
| CNEE/NTFY #2 Email | Text | ✓ | 부 수신자 이메일 |
| CNEE/NTFY #2 Fax | Text | ✓ | 부 수신자 팩스 |
| Broker #2 | Text | - | 부 브로커 |
| Broker #2 Tel | Text | - | 부 브로커 전화 |
| One Time Only | Checkbox | - | 일회성 전송 |

**Section C: Reference Info (ESM_0240)**
| 필드 | 타입 | 소스 | 설명 |
|------|------|------|------|
| S/C No. | Text | ESM_0240 | 배송 관리번호 |
| P/O No. | Text | ESM_0381 | 구매 발주번호 |
| C/N (Nationality) | Text | ESM_0240 | 고객 국적 |
| A.NF (Flag) | Checkbox | ESM_0240 | A/N 플래그 |

**Section D: Dispatch Execution (ESM_0381)**
| 필드 | 타입 | 옵션 | 설명 |
|------|------|------|------|
| A/N Sent Status | Badge | YES/NO/PENDING | 송신 상태 |
| Send Via (Channel) | Multi-Select | Fax/Email/EDI-Cust/EDI-ONEPORT | 송신 채널 |
| Y/N Approval Decision | Radio | Y / N | 승인 판정 |
| Doc Type | Select | General / EDI / Custom | 문서 타입 |
| Approval Button (Primary CTA) | Button | - | 1-Click 송신 |

#### 액션 버튼
- `[Fax]` - FAX 채널 토글
- `[Email]` - 이메일 채널 토글
- `[EDI for Cust]` - 고객 EDI 토글
- `[EDI for ONEPORT]` - ONEPORT EDI 토글
- **`[APPROVE & SEND ARRIVAL NOTICE]`** - Primary CTA (큰 파란색 버튼)

#### 상태 표시
```
Status: Ready (초록색) → Sending... (주황색 + 스피너) → Dispatched (초록색 + 체크)
```

---

## 🗂️ 통합 레이아웃 (Single Workspace View)

### 전체 화면 구조
```
┌─────────────────────────────────────────────────────────────────┐
│ Header: ONE CHORUS TEST | Arrival Notice Unified Workspace      │
│ Breadcrumb: Booking > Shipment Overview > Arrival Notice         │
├─────────────────────────────────────────────────────────────────┤
│ Quick Filter Bar: POD ETA [Date Range] | VVD | POD | DEL | B/L  │
│ [Retrieve] [Down Excel] [Save] [Code Validate] [Template]        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────┐  ┌───────────────────────────────┐
│  │ Card 1:                    │  │ Card 2:                       │
│  │ Customer Code &            │  │ Vessel Arrival &              │
│  │ Validation Panel           │  │ Schedule Panel                │
│  │                            │  │                               │
│  │ 10 Fields + 2 Buttons      │  │ 14 Fields + Save/Reset        │
│  └────────────────────────────┘  └───────────────────────────────┘
│
│  ┌────────────────────────────────────────────────────────────────┐
│  │ Card 3:                                                        │
│  │ Recipient & Contacts / Dispatch Execution                      │
│  │                                                                │
│  │ Left: 4 Primary Recipient Fields (Chkbx)                      │
│  │ Right: 4 Secondary + 4 Reference Fields                       │
│  │ Bottom: 5 Dispatch Fields + PRIMARY CTA Button                │
│  │                                                                │
│  │ [APPROVE & SEND ARRIVAL NOTICE] - Green/Orange/Green Status   │
│  └────────────────────────────────────────────────────────────────┘
│
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 AS-IS to TO-BE 필드 매핑 (완전 체크리스트)

### ESM_BKG_1054 → Card 1 (Customer Code & Validation)
| 원본 필드 | TO-BE 위치 | 상태 |
|---------|----------|------|
| Code Name | Card 1 Left (B/L Info) | ✅ Keep |
| Code Address | Card 1 Left (B/L Info) | ✅ Keep |
| B/L Name | Card 1 Right (MDM Code) | ✅ Keep |
| B/L Address | Card 1 Right (MDM Code) | ✅ Keep |
| Suggesting Code | Card 1 Middle (Alternative) | ✅ Keep |
| Code for A/N | Card 1 Right (Final) | ✅ Keep |
| Evaluation | Card 1 Bottom (Badge) | ✅ Keep |
| Type | Card 1 Bottom (Badge) | ✅ Keep |
| B/L No. | Card 1 Right (Link) | ✅ Keep |

### ESM_BKG_0672 Main → Card 2 (Vessel Arrival & Schedule)
| 원본 필드 | TO-BE 위치 | 상태 |
|---------|----------|------|
| VVD | Card 2 Core | ✅ Keep |
| B/L No. | Header Filter | ✅ Move to Filter |
| D/T | Card 2 Document | ✅ Keep |
| CNTR Type | Card 2 Document | ✅ Keep |
| DEL | Card 2 Document | ✅ Keep |
| HUB | ❌ | EXCLUDE |
| POD ETA | Card 2 Dates | ✅ Keep |
| DEL ETA | ❌ | EXCLUDE |
| Available Date | Card 2 Dates | ✅ Keep |
| Last Free Date | Card 2 Dates | ✅ Keep |
| POD FIRMS | ❌ | EXCLUDE |
| P/Up CY/CFS | Card 2 Pickup | ✅ Keep |
| P/Up FIRMS | ❌ | EXCLUDE |
| Return CY | Card 2 Return | ✅ Keep |
| Form | Card 2 Document | ✅ Keep |
| Agent | ❌ | EXCLUDE |
| Remark | Card 2 Notes | ✅ Keep |

### ESM_BKG_0672 Popup → Card 2 (Added Fields)
| 원본 필드 | TO-BE 위치 | 상태 |
|---------|----------|------|
| Arrival Vessel | Card 2 Core | ✅ Keep |
| ETA POD | Card 2 Dates | ✅ Keep (as POD ETA) |
| ETA DEL | ❌ | EXCLUDE (use POD ETA) |
| Full CNTR P/Up CY | Card 2 Pickup | ✅ Keep |
| Empty Return CY | Card 2 Return | ✅ Keep |
| A/N Form Type | Card 2 Document | ✅ Keep (as Form) |
| Revise | Card 2 Control | ✅ Keep (Checkbox) |
| Address | ❌ | EXCLUDE (not needed) |
| Important Notice | ❌ | Implicit in UI |

### ESM_BKG_0240 → Card 3 (Recipient & Contacts)
| 원본 필드 | TO-BE 위치 | 상태 |
|---------|----------|------|
| B/L No. | Header Filter | ✅ Move to Filter |
| C/N | Card 3 Reference | ✅ Keep |
| A.NF | Card 3 Reference | ✅ Keep |
| S/C No. | Card 3 Reference | ✅ Keep |
| DEL | Card 2 (moved) | ✅ Moved |
| Eval. | Card 1 (moved) | ✅ Moved |
| Customer Code | Card 1 (moved) | ✅ Moved |
| Customer Name | Card 1 (moved) | ✅ Moved |
| Customer Address | Card 1 (moved) | ✅ Moved |
| CNEE/NTFY IN B/L | Card 3 Primary | ✅ Keep |
| CNEE/NTFY | Card 3 Primary | ✅ Keep |
| CNEE/NTFY #2 | Card 3 Secondary | ✅ Keep |
| Fax (Primary) | Card 3 Primary | ✅ Keep |
| BROKER #1 | Card 3 Primary | ✅ Keep |
| BROKER #2 | Card 3 Secondary | ✅ Keep |
| One Time Only | Card 3 Reference | ✅ Keep |

### ESM_BKG_0381 → Card 3 (Dispatch Execution)
| 원본 필드 | TO-BE 위치 | 상태 |
|---------|----------|------|
| Sel. | Header (Batch) | ✅ Keep (Checkbox) |
| Chg | Card 2 Control | ✅ Move to Card 2 |
| B/L No. | Header Filter | ✅ Move to Filter |
| TP | Card 3 Reference | ✅ Keep (as Transport Provider) |
| Code | Card 1 (moved) | ✅ Moved |
| Customer Name | Card 1 (moved) | ✅ Moved |
| A/N Sent | Card 3 Dispatch | ✅ Keep |
| CNEE/NTFY (Email) | Card 3 Primary | ✅ Keep |
| CNEE/NTFY #2 (Email) | Card 3 Secondary | ✅ Keep |
| One Time Only | Card 3 Reference | ✅ Keep |
| Y/N | Card 3 Dispatch | ✅ Keep |
| Doc | Card 3 Dispatch | ✅ Keep |
| Remark | Card 2 Notes | ✅ Move to Card 2 |

---

## 🎨 Visual Design Rules

### Card Styling
- **Background**: Light Gray (bg-gray-50)
- **Border**: Light Gray (border-gray-200, 1px solid)
- **Border Radius**: 8px
- **Padding**: 24px
- **Shadow**: Subtle (0 1px 3px rgba(0,0,0,0.1))
- **Heading**: 16px, Semi-Bold (600), Dark Gray (text-gray-900)
- **Subheading**: 12px, Medium (500), Medium Gray (text-gray-600)
- **Body Text**: 13-14px, Regular (400), Dark Gray (text-gray-900)

### Badge Styling
- **Confidence Badge** (Card 1):
  - Green (>95%): bg-green-100, text-green-800, icon: ✓
  - Yellow (<95%): bg-yellow-100, text-yellow-800, icon: !
  
- **Status Badge** (Card 3):
  - Ready: bg-green-100, text-green-800
  - Sending: bg-orange-100, text-orange-800 + spinner
  - Dispatched: bg-green-100, text-green-800 + ✓

### Button Styling
- **Primary CTA** (Card 3):
  - Background: Blue (bg-blue-600)
  - Text: White, 14px, Semi-Bold
  - Padding: 12px 24px
  - Border Radius: 8px
  - Hover: Darker Blue (bg-blue-700)
  - Active: Darkest Blue (bg-blue-800)
  - Disabled: Gray (bg-gray-300)
  
- **Secondary Buttons** (Card 2, Card 3):
  - Background: Gray (bg-gray-200)
  - Text: Dark Gray (text-gray-900)
  - Hover: Darker Gray (bg-gray-300)

### Checkbox/Radio Styling
- Size: 18px × 18px
- Checked: Blue (border-blue-600, bg-blue-600, ✓ white)
- Unchecked: Light Gray (border-gray-300, bg-white)
- Hover: Light Blue (border-blue-300)

---

## ✅ 검증 체크리스트

### 필드 포함/제외 검증
- [x] ESM_BKG_1054: 9개 필드 → Card 1 완전 매핑
- [x] ESM_BKG_0672 Main: 17개 필드 → Card 2 (12개 유지, 5개 제외)
- [x] ESM_BKG_0672 Popup: 14개 필드 → Card 2 (8개 유지)
- [x] ESM_BKG_0240: 15개 필드 → Card 3 + Card 1/2 (재배치)
- [x] ESM_BKG_0381: 13개 필드 → Card 3 (10개 유지)

### 규정 준수 (Rule 02)
- [x] HUB - EXCLUDED
- [x] DEL ETA - EXCLUDED
- [x] POD FIRMS - EXCLUDED
- [x] P/Up FIRMS - EXCLUDED
- [x] Agent - EXCLUDED

### 사용성 개선
- [x] 5개 화면 → 3개 카드 (60% 시각적 단순화)
- [x] 모달 제거 (직접 입력 필드로 통합)
- [x] 1-Click CTA (Approve & Send Arrival Notice)
- [x] 실시간 상태 표시 (Badge + Spinner)

---

## 📄 문서 생성

**작성 일시**: 2026-07-30  
**버전**: v1.0 - High-Level Architecture Alignment  
**상태**: ✅ 설계 완료 - Phase 2 컴포넌트 개발 준비 완료

---

## 🚀 Next Steps

1. **컴포넌트 개발**:
   - `CustomerCodeValidationCard.tsx`
   - `VesselArrivalScheduleCard.tsx`
   - `RecipientDispatchCard.tsx`

2. **상태 관리 업데이트**:
   - 3개 카드별 상태 분리
   - 크로스-카드 데이터 동기화

3. **UI 테스트**:
   - 각 카드의 16-18 필드 렌더링 검증
   - 버튼 상호작용 테스트
   - 배지 색상/상태 검증

4. **통합 테스트**:
   - 원본 5개 화면 vs TO-BE 기능 동등성
   - End-to-end 1-Click Approval 워크플로우
