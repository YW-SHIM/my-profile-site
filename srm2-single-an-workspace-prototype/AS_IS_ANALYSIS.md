# AS-IS UI Analysis - 5 Legacy Screens Consolidation

## 📊 Overview

5개의 AS-IS 레거시 OPUS 화면에서 단일 통합 워크스페이스로 마이그레이션하기 위한 완전한 필드 및 기능 분석입니다.

---

## 🔍 AS-IS 화면 분석

### Screen 1: ESM_BKG_1054 - Arrival Notice: Code Validate
**목적**: 고객 코드 검증 및 AI 기반 매칭 제안

**상단 필터 섹션**:
- VVD (라디오 버튼)
- POD ETA (라디오 버튼, 날짜 범위)
- POD (드롭다운)
- KRPUS (고정값)
- T/S (체크박스)
- DEL (텍스트 입력)
- POL (텍스트 입력)
- B/L No. (텍스트 입력)

**상태 탭**:
- Unmatched (검증 실패)
- Matched (검증 성공)

**테이블 컬럼**:
| # | Code | Code Name | Code Address | B/L Name | B/L Address | Suggesting Code | Code Name | Code Address | Code for A/N | Evaluation | Type | B/L No. |
|---|------|-----------|--------------|----------|-------------|-----------------|-----------|--------------|--------------|--------------|------|---------|
| 1 | KR205104 | WONJUN... | Rm 1605... | AK FARM CO., LTD | 38-1, 3F... | KR203915 | AK FARM... | 38-1, 3F... | KR203915 | 💡 | CNEE | MELG028... |

**주요 기능**:
- Code Lookup (고객사 코드 검색)
- Suggesting Code 제시 (AI 기반)
- Code for A/N 확정 (최종 검증 코드)
- Evaluation Badge (매칭 상태)

**버튼**:
- Retrieve (데이터 조회)
- Down Excel (엑셀 다운로드)
- Save (저장)
- A/N Setup (설정)
- A/N Send (전송)

---

### Screen 2: ESM_BKG_0672-01 - Arrival Information (Container Details)
**목적**: 컨테이너 레벨의 배송 정보 관리

**상단 필터 섹션**:
- VVD (라디오 버튼, 텍스트)
- POD ETA (라디오 버튼, 날짜 범위)
- POD (드롭다운)
- KRPUS (고정값)
- T/S (체크박스)
- DEL (텍스트)
- POL (텍스트)
- B/L No. (텍스트)

**탭 구조**:
- Arrival Data (활성)
- Customer
- Upload & Match

**테이블 컬럼**:
| Seq | VVD | B/L No. | D/T | CNTR Type | DEL | HUB | POD ETA | DEL ETA | Available Date | Last Free | POD FIRMS | P/Up CY/CFS | P/Up FIRMS | Return CY | Form | Agent | Remark |
|-----|-----|---------|-----|-----------|-----|-----|---------|---------|----------------|-----------|-----------|-----------|-----------|-----------|----|-------|--------|

**주요 필드 (행 예시)**:
```
1CLT0012W | NG5AP1117800 | Y | DG | KRPUS | 2026-06-16 04:00 | 2026-06-16 03:00 | 2026-06-16 09:00 | 2026-06-17 09:00 | | KRPUS14 | KRPUS10 | General | *
```

**중요사항**:
- HUB ❌ (제외 대상)
- DEL ETA ❌ (제외 대상)
- POD FIRMS ❌ (제외 대상)
- P/Up FIRMS ❌ (제외 대상)
- Agent ❌ (제외 대상)

**버튼**:
- Retrieve
- Down Excel
- Save
- Code Validate
- Template
- A/N Send
- Close

---

### Screen 3: ESM_BKG_0672-01 - Arrival Info. Setting (Modal/Dialog)
**목적**: 개별 배송의 도착 정보 설정

**팝업 제목**: "Arrival Info. Setting"

**입력 필드** (체크박스 + 값):
1. ☐ Arrival Vessel: `ONE CLARA` | Address: -
2. ☐ VVD: `1CLT0012W` (드롭다운)
3. ☐ ETA POD: `2026-06-16 04:00` | ☐ NULL
4. ☐ ETA DEL: `2026-06-16 03:00` | ☐ NULL | ⚠️ Important Notice
5. ☐ Available Date: `2026-06-16 09:00` | ☐ NULL
6. ☐ Last Free Date to Pick up: `2026-06-17 09:00` | ☐ NULL
7. ☐ Full CNTR P/Up CY: `KRPUS14`
8. ☐ Empty Return CY: `KRPUS10`
9. ☐ A/N Form Type: `General` (드롭다운)
10. ☐ Agent: `*` ❌ (제외)
11. ☐ Revise: (체크박스)
12. ☐ Remark: (텍스트 에어리어)

**버튼**:
- Setup Arrival Info. (저장)
- Close

**특징**:
- 각 필드별 NULL 체크박스
- Important Notice 팝업 지원
- Revise 플래그로 수정 추적

---

### Screen 4: ESM_BKG_0240-01 - Customer Information (Contact Management)
**목적**: 고객 및 연락처 정보 관리

**탭 구조**:
- Arrival Data
- Customer (활성)
- Upload & Match

**상단 필터**:
- VVD, POD ETA (날짜), POD, KRPUS, T/S, DEL, POL
- Evaluated: All (드롭다운)
- Customer Code (텍스트)
- Customer Name (텍스트)
- P/O No. (텍스트)
- S/C No. (텍스트)

**테이블 컬럼**:
| Seq | Chg | B/L No. | C/N | A.NF | S/C No. | DEL | Eval. | Data | Customer Code | Customer Name (B/L) | Customer Address (B/L) | CNEE/ENTFY IN B/L | CNEE/ENTFY | CNEE/ENTFY #2 | Fax | BROKER #1 | BROKER #2 | One Time Only | CNEE/ENTFY IN B/L |
|-----|-----|---------|-----|------|---------|-----|-------|------|---------------|--------------------|------------------------|------------------|------------|----------------|-----|-----------|-----------|---------------|--------------------|

**데이터 예시**:
```
Row 1: AARG01692500 | CN | N | KRPUS | A | N | KR103487 | EUSU LOGISTICS CO.,LTD | 7TH FLOOR, 147... | | | | | | ywshin@gm... | ... | ...
Row 2: AARG01911600 | CN | N | KRPUS | A | N | KR508883 | HYUNDAI NAVIS | 25, YULGOK-RO... | 8223901019 | | | | | pohl@hyundaicorp.com
```

**버튼** (하단):
- Set Data
- Customer& Info.
- Multi-Contact
- Master Data

---

### Screen 5: ESM_BKG_0381 - Arrival Notice Send
**목적**: 도착통지 송신 및 수신자 관리

**상단 필터**:
- VVD, POD ETA (날짜), POD, DEL, POL
- Customer Code, Customer Name
- P/O No., TP (드롭다운), B/L No.

**알림 채널 선택**:
- Fax (버튼)
- E-Mail (버튼)
- EDI for Customer (버튼)
- EDI for ONEPORT (버튼)

**테이블 컬럼**:
| Seq | Sel | Chg | Show PU# | B/L No. | TP | Code | Customer Name | A/N Sent | CNEE/ENTFY | CNEE/ENTFY #2 | BROKER #1 | BROKER #2 | One Time Only | Y/N | Doc | Remark |

**데이터 예시**:
```
Row 1: 3 | ☑ | □ | ☑ | ZHOG23560700 | N | KR201706 | HB CORPORATION | NO | ☑ ywshin@gm... | □ | □ | □ | □ | | 💡
Row 2: 3 | □ | □ | ☑ | YGNG09201600 | C | KR106673 | WORLD BEST LOGISTICS... | NO | □ | □ | □ | □ | □ | | 💡
```

**그룹화 옵션**:
- Grouping by Code (버튼)
- Multi-Contact (버튼)

**주요 기능**:
- 다중 선택 (Sel 체크박스)
- 변경 추적 (Chg 플래그)
- 다중 수신자 지원 (CNEE/ENTFY, #2, BROKER #1, #2)
- 일회성 전송 플래그
- A/N Sent 상태 표시
- Y/N 판정 기록

**버튼** (상단):
- Retrieve
- Down Excel
- Preview
- Print
- Template
- A/N Setup
- History
- Close

---

## 📋 통합 필드 매핑표

### Core Fields (모든 화면에서 공통)
| AS-IS 이름 | Unified 이름 | 포함 화면 | 타입 | 필수여부 |
|-----------|-----------|---------|------|--------|
| B/L No. | B/L No. | 1,2,4,5 | Text | Y |
| VVD | VVD | 2,3,5 | Dropdown | Y |
| POD | POD | 2,5 | Dropdown | Y |
| POD ETA | POD ETA | 2,3,5 | DateTime | Y |
| DEL | DEL | 2,3,4,5 | Text | Y |
| CNEE | CNEE | 1,4,5 | Text | Y |

### Customer & Code Fields
| AS-IS 이름 | Unified 이름 | 포함 화면 | 설명 |
|-----------|-----------|---------|------|
| Code | Customer Code | 1,4,5 | MDM 고객 코드 |
| Code Name | Code Name | 1,4 | 코드 기반 고객명 |
| Code Address | Code Address | 1 | 코드 기반 주소 |
| Suggesting Code | AI Suggested Code | 1 | AI 매칭 제안 코드 |
| Code for A/N | Verified Customer Code | 1 | 최종 검증 코드 |
| Customer Code | Customer Code | 4,5 | 고객사 코드 |
| Customer Name | Customer Name | 4,5 | B/L 상 고객명 |
| Customer Address | Customer Address | 4,5 | B/L 상 고객 주소 |

### Container & Cargo
| AS-IS 이름 | Unified 이름 | 포함 화면 | 설명 |
|-----------|-----------|---------|------|
| D/T | Delivery Term | 2 | Y/N 배송 구분 |
| CNTR Type | Container Type | 2 | DG/DR/기타 |
| Form | Form Type | 2,3 | EDI/Paper |
| ~~HUB~~ | ❌ EXCLUDED | 2 | 제외 |
| ~~DEL ETA~~ | ❌ EXCLUDED | 2 | 제외 |
| ~~POD FIRMS~~ | ❌ EXCLUDED | 2 | 제외 |
| ~~P/Up FIRMS~~ | ❌ EXCLUDED | 2 | 제외 |
| ~~Agent~~ | ❌ EXCLUDED | 2,3 | 제외 |

### Dates & Deadlines
| AS-IS 이름 | Unified 이름 | 포함 화면 | 설명 |
|-----------|-----------|---------|------|
| POD ETA | POD ETA | 2,3,5 | 항구 도착 예정시간 |
| ETA POD | ETA POD | 3 | 항구 도착 예정 (모달) |
| ETA DEL | ETA DEL | 3 | 배송지 도착 예정 (모달) |
| Available Date | Available Date | 2,3 | 수령 가능 일시 |
| Last Free Date | Last Free Date | 2,3 | 픽업 마감 일시 |
| CY Cut Off | CY Cut Off | TO-BE | CY 마감 시간 |
| ERD | ERD | TO-BE | 예상 반납 일자 |

### Pickup & Return
| AS-IS 이름 | Unified 이름 | 포함 화면 | 설명 |
|-----------|-----------|---------|------|
| P/Up CY/CFS | Pickup CY/CFS | 2 | 픽업 위치 |
| Full CNTR P/Up CY | Full CNTR P/Up CY | 3 | 풀 컨테이너 픽업 CY |
| Return CY | Return CY | 2 | 반납 CY |
| Empty Return CY | Empty Return CY | 3 | 빈 컨테이너 반납 CY |

### Contact & Recipient
| AS-IS 이름 | Unified 이름 | 포함 화면 | 설명 |
|-----------|-----------|---------|------|
| CNEE/ENTFY | Consignee/Notify Email | 4,5 | 주 수신자 이메일 |
| CNEE/ENTFY #2 | Consignee/Notify #2 Email | 4,5 | 부 수신자 이메일 |
| Fax | Fax | 4,5 | 팩스 번호 |
| BROKER #1 | Broker #1 | 4,5 | 주 브로커 |
| BROKER #2 | Broker #2 | 4,5 | 부 브로커 |
| One Time Only | One Time Only | 4,5 | 일회성 전송 플래그 |

### Status & Evaluation
| AS-IS 이름 | Unified 이름 | 포함 화면 | 설명 |
|-----------|-----------|---------|------|
| Evaluation | Match Status | 1 | Matched/Unmatched/AI_Suggested |
| Eval. | Evaluation | 4 | 평가 완료 여부 |
| Data | Data Status | 4 | 데이터 상태 |
| A/N Sent | A/N Sent | 5 | YES/NO - 송신 여부 |
| Revise | Revise Flag | 3 | 수정 여부 |
| Type | Type | 1 | CNEE/NTFY 구분 |
| C/N | Customer Nationality | 4 | 고객 국적 |
| A.NF | Arrival Notification Flag | 4 | A/N 플래그 |

### Additional Fields
| AS-IS 이름 | Unified 이름 | 포함 화면 | 설명 |
|-----------|-----------|---------|------|
| Remark | Remark | 2,3,5 | 비고/특이사항 |
| P/O No. | Purchase Order Number | 4,5 | 구매 발주번호 |
| S/C No. | Shipment Control No. | 4 | 배송 관리번호 |
| POL | Port of Loading | 5 | 선적항 |
| Arrival Vessel | Arrival Vessel | 3 | 도착 선박명 |
| Address | Address | 3 | 도착선 주소 |
| TP | Transport Provider | 5 | 수송 제공자 |
| Y/N | Y/N Decision | 5 | 예/아니오 판정 |
| Doc | Document Type | 5 | 문서 타입 |
| Booking No. | Booking No. | TO-BE | 예약번호 |
| Cargo Nature | Cargo Nature | TO-BE | 화물성질 |
| Volume | Volume | TO-BE | 수량 |
| Sail Date | Sail Date | TO-BE | 출항일 |
| T/VVD | T/VVD | TO-BE | 경유선사 |
| SHPR | Shipper | TO-BE | 선주 |

---

## 🔧 AS-IS 기능을 통합 워크스페이스에 매핑

### 화면 1: Code Validation 기능
**AS-IS**: ESM_BKG_1054  
**TO-BE**: Detail View > Tab 3: "Upload & Match"

**이관 기능**:
- Code 검색 → Customer Code 필드 자동완성
- Suggesting Code 제시 → AI Suggested Code 뱃지
- Code for A/N 확정 → Verified Customer Code
- Evaluation Badge → Match Status (Green/Yellow/Red)

**버튼**: Code Validate (탭 내 버튼)

---

### 화면 2: Container Details 기능
**AS-IS**: ESM_BKG_0672-01 (Arrival Data 탭)  
**TO-BE**: Main List View + Detail View (Tab 1: Arrival Data)

**이관 기능**:
- 컨테이너별 배송 정보 표시 (D/T, CNTR Type, DEL, POD ETA 등)
- 행별 수정 가능 (인라인 에딧)
- 버튼 세트: Retrieve, Down Excel, Save, Code Validate, Template, A/N Send

**제외**: HUB, DEL ETA, POD FIRMS, P/Up FIRMS, Agent (Rule 02 준수)

---

### 화면 3: Arrival Info Setup
**AS-IS**: ESM_BKG_0672-01 (모달)  
**TO-BE**: Detail View Modal / Sidebar

**이관 기능**:
- Arrival Vessel 입력
- VVD 드롭다운 선택
- ETA POD, ETA DEL 입력 (NULL 체크박스)
- Available Date, Last Free Date 입력
- Full CNTR P/Up CY, Empty Return CY 입력
- A/N Form Type 드롭다운
- Revise 체크박스
- Remark 텍스트 에어리어

**버튼**: Setup Arrival Info. (저장), Close

---

### 화면 4: Customer Information
**AS-IS**: ESM_BKG_0240-01  
**TO-BE**: Detail View > Tab 2: "Customer"

**이관 기능**:
- Customer Code, Customer Name 입력
- CNEE/ENTFY (이메일) 입력
- CNEE/ENTFY #2 (대체 수신자)
- Fax 번호
- Broker #1, #2 관리
- One Time Only 플래그
- C/N (국적), A.NF (플래그)

**버튼**: Set Data, Customer& Info., Multi-Contact, Master Data

---

### 화면 5: Arrival Notice Send
**AS-IS**: ESM_BKG_0381  
**TO-BE**: 별도 "A/N Send" 화면 / 모달

**이관 기능**:
- 수신 채널 선택 (Fax, E-Mail, EDI for Customer, EDI for ONEPORT)
- 다중 수신자 관리
- A/N Sent 상태 추적
- Y/N 판정 기록
- Grouping by Code 옵션
- Multi-Contact 관리

**버튼**: Retrieve, Down Excel, Preview, Print, Template, A/N Setup, History, Close

---

## 🎯 통합 워크스페이스 기본 구조

```
┌─────────────────────────────────────────────────────────────┐
│ ONE CHORUS TEST | Arrival Notice Unified Workspace          │
├─────────────────────────────────────────────────────────────┤
│ Quick Filter: POD ETA | Date Range | VVD | POD | DEL | B/L │
├─────────────────────────────────────────────────────────────┤
│ ☑ Retrieve | ☐ Down Excel | ☐ Save | ☐ Code Validate      │
├─────────────────────────────────────────────────────────────┤
│ Seq│Sel│B/L│Code│Name │Address│CNEE│Email│Fax│Broker│...   │
│────┼───┼───┼────┼─────┼───────┼────┼─────┼───┼──────┼─── │
│ 1  │☑  │...|    │     │       │    │     │   │      │   │
│ 2  │□  │...|    │     │       │    │     │   │      │   │
│ 3  │□  │...|    │     │       │    │     │   │      │   │
└─────────────────────────────────────────────────────────────┘

[Row Click] → Open Detail View Modal
┌─────────────────────────────────────────┐
│ Arrival Info. Setting                   │
├─────────────────────────────────────────┤
│ [Arrival Data] [Customer] [Upload&Match]│
├─────────────────────────────────────────┤
│ Arrival Vessel: ONE CLARA               │
│ VVD: [______] ETA POD: 2026-06-16       │
│ Available Date: 2026-06-16              │
│ P/Up CY: KRPUS14 | Return CY: KRPUS10   │
│ Form Type: [General] Remark: [________] │
├─────────────────────────────────────────┤
│ [Setup Arrival Info.] [Close]           │
└─────────────────────────────────────────┘
```

---

## ✅ 완성 체크리스트

- [x] 5개 AS-IS 화면 상세 분석
- [x] 필드 통합 매핑 완성
- [x] 제외 필드 명확화 (HUB, DEL ETA, POD FIRMS, P/Up FIRMS, Agent)
- [x] 기능 통합 전략 수립
- [x] Rule 02 업데이트 (12개 섹션 → 62개 필드)
- [x] Rule 03 제목 업데이트 예정
- [ ] 컴포넌트 구현 (TableView, DetailModal, TabsView)
- [ ] 통합 테스트

---

## 📌 Next Steps

1. **Rule 03**: 모든 62개 필드의 라벨 표준화
2. **타입 확장**: ArrivalNoticeRecord에 모든 필드 추가
3. **Mock 데이터**: 5개 화면의 실제 데이터 구조 반영
4. **컴포넌트 구현**:
   - TableView.tsx (16개 컬럼)
   - DetailModal.tsx (3 탭)
   - Notification Settings (알림 채널)
5. **버튼 통합**: 모든 AS-IS 버튼 기능 구현
6. **테스트**: 원본 화면과의 기능 동등성 검증

