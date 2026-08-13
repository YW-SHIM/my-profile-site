# 🎨 Design-Assets UI 스크린샷 상세 분석 리포트

**생성일:** 2026년 8월 4일  
**분석 범위:** Design-Assets 폴더의 6개 UI 스크린샷  
**프로젝트:** SRM2 (Single Unified Workspace - Arrival Notice)

---

## 📊 분석 요약

| 항목 | 내용 |
|------|------|
| **총 이미지 수** | 6개 |
| **총 파일 크기** | 1,008KB |
| **평균 파일 크기** | 168KB |
| **가장 큰 파일** | 화면 캡처 2026-08-04 134446.png (222KB) |
| **가장 최신 파일** | 화면 캡처 2026-08-04 135544.png |

---

## 🖼️ 스크린샷별 상세 분석

### 1️⃣ **화면 캡처 2026-08-04 135544.png** (175KB)
**주제: Container Loading/Discharging List (컨테이너 적하/양하 목록)**

#### 주요 특징:
- **레이아웃:** 필터 섹션 + 고급 필터 바 + 데이터 그리드
- **필터 영역:**
  - VVD (선택박스) - 선박 항차 지정
  - POL (선택박스) - 적항 선택
  - POD (선택박스) - 양하항 선택
  - Booking/Cargo Office (다중 선택)
  - Booking Status (필터)
  - Booking Cargo Type (선택박스)
  - Trans Mode (선택박스)
  - 고급 필터 확장 옵션

- **메인 그리드:**
  - 다중 선택 체크박스
  - Container No., Type, Seal No., Seal Condition 등
  - WD (Warehouse Deposit) 정보
  - Door Arrival Date, ERD, FRD
  - CSD WST, CSD WST(T) 날짜 필드
  - Gross, Net Weight
  - Packaging, VGM WST 정보
  - SNOW Cargo, Booking No., B/L No., SLBL
  - APOL, APOD 필드

#### UI 패턴:
- ✅ 컬럼 헤더 정렬 기능 (↑↓ 화살표)
- ✅ 행 선택 체크박스
- ✅ 스크롤 가능한 넓은 그리드
- ✅ 좌측 네비게이션 사이드바 (Transshipment Management, Mass Roller 등)

#### 디자인 특징:
- 헤더: 마젠타/분홍색 (#D91E63) 배경
- 폰트: 명확한 타이포그래피, 작은 텍스트 크기
- 색상: 회색 테이블 헤더, 흰색 배경

---

### 2️⃣ **화면 캡처 2026-08-04 134915.png** (171KB)
**주제: Error Category (오류 카테고리 관리)**

#### 주요 특징:
- **좌측 사이드바:**
  - Common Services
  - IAM & ADMIN
  - Account Request
  - Business Workflow
  - Error Reporting (선택됨)
  - Error Reporting Inquiry
  - Error Category
  - Escalation Contact Table

- **메인 콘텐츠:**
  - 제목: "Error Category"
  - 헬프 아이콘 (?) 
  - Product (검색 & 선택)
  - Error Category (검색 & 선택)
  - Severity (낮음-높음) 라디오 버튼
  - Status (드롭다운)

- **필터 섹션:** Collapse Filters
  - System Record (생성자, 생성 날짜, 수정자, 수정 날짜)
  - Collapse Filters (접을/펼칠 수 있음)

- **데이터 테이블:**
  - 119개 항목 선택됨
  - Status, Product, Error Category, Severity, Created By, Created On, Last Updated By, Last Updated On, Actions 컬럼
  - 각 행에 토글 스위치 (Active/Inactive)
  - Action 버튼 (Cancel, Save)

#### UI 패턴:
- ✅ 계층적 사이드바 네비게이션
- ✅ 토글 버튼 (on/off 상태)
- ✅ 행 선택 및 일괄 작업
- ✅ 날짜/시간 입력 필드

#### 디자인 특징:
- 헤더: 마젠타 배경, 흰색 텍스트
- 토글: 초록색 (활성화), 회색 (비활성화)
- 모달/팝업 스타일 적용 가능

---

### 3️⃣ **화면 캡처 2026-08-04 134849.png** (95KB)
**주제: Escalation Contact Table (에스컬레이션 연락처 테이블)**

#### 주요 특징:
- **필터 섹션:**
  - Status (Active 버튼, 토글 스위치)
  - Product (AMS 선택)
  - Region (RICHY 선택됨)
  - Country (UNITED STATES)
  - Office (검색 & 선택)
  - Offshore Center (검색 & 선택)

- **액션 버튼:**
  - Download All (다운로드)
  - Add Contact (추가)
  - Settings (톱니바퀴 아이콘)

- **데이터 테이블:**
  - Status, Product, Region, Country, Office, Offshore Center, Event Identifier 1-4, Contact Category, Contact Workflow Group 컬럼
  - 행별 체크박스

- **우측 패널:**
  - 검색/필터링 패널 (우측 드롭다운)
  - Status, Product, Region, Country, Office, Offshore Center 필터 체크박스
  - "Restore Defaults" 버튼
  - Cancel, Apply 버튼

#### UI 패턴:
- ✅ 필터 패널 (좌측 필터 + 우측 상세 필터)
- ✅ 다중 선택 필터
- ✅ 우측 드롭다운 패널
- ✅ 액션 버튼 그룹

#### 디자인 특징:
- 헤더: 마젠타 배경
- 체크박스: 분홍색 (선택됨)
- 텍스트: 가독성 높은 회색/검정
- 버튼: 분홍색 Cancel, 자주색 Apply

---

### 4️⃣ **화면 캡처 2026-08-04 134545.png** (152KB)
**주제: Booking Creation (예약 생성 폼)**

#### 주요 특징:
- **좌측 네비게이션:**
  - Booking Management
  - Shipment Overview
  - Documentation Cut Off
  - Export Customs Cut Off
  - Booking Agent Management
  - Manual Booking Number Without Agent
  - Feature Simulator
  - Special Cargo Handling
  - **Booking Creation** (선택됨)
  - Booking Control - Standby

- **메인 폼:**
  - **Booking Information 섹션:**
    - Booking Number, Bill of Lading Number
    - Manual 체크박스
    - BRN Status, Flag 라디오 버튼 (Auto EFS Hold 등)
    - STB Status 라디오 버튼

  - **Booking Schedule 섹션:**
    - Planned Delivery Schedule
    - Selling Date
    - Empty OR Arrival Date
    - Delivery Date
    - Empty Pick up CY
    - Full Return CY (날짜 입력 필드)

  - **Routing & Vessel Information 섹션:**
    - Place of Receipt (POR)
    - Place of Delivery (DEL)
    - K/D Term
    - Block Stowage
    - Port of Loading (POL)
    - Port of Discharge (POD)
    - 1st WD, 2nd WD

  - **Booking Party & Contract 섹션:**
    - Shipper, Forwarder, Booking Party, Consignee (모두 "Enter from 3 characters to search")
    - RFA No., S/C No., TRA No. 라디오 버튼
    - Commodity, US Filter, CA Filter, EU Filter
    - Supp Doc, SCAC, FROB 필드

  - **Booking Contact 섹션** (하단)

#### UI 패턴:
- ✅ 다단계 폼 (섹션별 펼칠/접기)
- ✅ 라디오 버튼, 체크박스, 드롭다운 혼합
- ✅ 날짜 입력 필드
- ✅ 검색 가능한 입력 필드

#### 디자인 특징:
- 섹션 헤더: 어두운 배경 + 펼칠/접기 화살표
- 입력 필드: 흰색 배경, 회색 테두리
- 필수 필드: 빨간색 별(*) 표시
- 버튼: 우측 상단에 "New", "Save" 등

---

### 5️⃣ **화면 캡처 2026-08-04 134446.png** (222KB - 가장 큼)
**주제: Shipment Overview (선적 개요 대시보드)**

#### 주요 특징:
- **상단 필터 섹션:**
  - Date Type (드롭다운)
  - Date Period (날짜 범위 선택기)
  - Booking Status (Waiting (W) 필터 태그)
  - Cargo Nature (드롭다운)
  - Booking Office (드롭다운)

- **필터 액션:**
  - Collapse Filters (접기 버튼)
  - More Filters (확장 필터 버튼)
  - "4 filters applied" 표시
  - Saved Filters (저장된 필터)
  - Reset (초기화)
  - Search (검색 버튼)

- **메인 데이터 그리드:**
  - 체크박스 + Issue 아이콘
  - Booking No. (링크)
  - Container No., Contract/Agreement No.
  - Customer Code, Customer Name
  - T/VVD (선박 정보)
  - 1st VVD, Sail Date 1st VVD
  - CY Cut Off, ERD
  - Vol (부피), Cargo (화물 상태: OK 녹색, 경고 빨간색)
  - 다양한 문서 아이콘 (PDF 등)

- **우측 드롭다운:**
  - Container No., Contract/Agreement No., Customer Code, DEL, Is NPCF, EDI, VGM Status 체크박스

#### UI 패턴:
- ✅ 다중 필터 적용 & 저장
- ✅ 협소/확장 필터 패널
- ✅ 상태 표시 아이콘 (OK 녹색, 경고 빨간색)
- ✅ 링크 가능한 셀 (Booking No., Container No.)
- ✅ 문서 다운로드 아이콘

#### 디자인 특징:
- 헤더: 마젠타 배경
- 필터 태그: 회색 배경 + X 닫기 버튼
- 상태 표시: 녹색(OK), 빨간색(경고)
- 스크롤 가능한 가로 방향 그리드

---

### 6️⃣ **image (5).png** (190KB)
**주제: Worklist Dashboard (작업 목록 대시보드)**

#### 주요 특징:
- **헤더:**
  - "Worklist Dashboard" 제목
  - "STG" 태그 (Staging/Test 환경)

- **상단 필터:**
  - POD (SGSIN 드롭다운)
  - DEL (Enter DEL 입력 필드)
  - ETB 날짜 범위 (2026-07-20 ~ 2026-07-30)

- **탭 네비게이션:**
  - **Arrival Notice** (선택됨, 파란색)
  - **Cargo Release** (분홍색)

- **데이터 테이블 (Arrival Notice 탭):**
  - B/L No. (링크)
  - VVD (선박 항차)
  - Consignee Name (수하인 이름)
  - Notify Name (통지인 이름)
  - B/L Type (B 또는 W 배지)
  - B/L Status
  - Cargo Release (NOT RELEASED / AUTO RELEASED)
  - Full Container Release (NOT RELEASED)
  - D/O Cut-off Ex... (날짜)
  - D/O Cut-off Da... (날짜)
  - ETB (입항 예정일)
  - Action (더보기 메뉴)

- **배지 색상:**
  - B (분홍색 배지) - Bill of Lading Type
  - W (파란색 배지) - Waybill Type
  - 녹색 (AUTO RELEASED) - 자동 해제됨
  - 회색 (NOT RELEASED) - 해제되지 않음

#### UI 패턴:
- ✅ 탭 기반 네비게이션
- ✅ 상단 필터 (POD, DEL, 날짜 범위)
- ✅ 상태 배지 (색상 코드화)
- ✅ 행별 액션 메뉴
- ✅ 페이지네이션 (Show 30 items, Total 954 results)

#### 디자인 특징:
- 헤더: 분홍색 배경 (#D91E63 또는 유사)
- 탭: 파란색 (활성), 분홍색 (비활성)
- 상태 배지: 녹색(완료), 회색(대기)
- 타입 배지: B(분홍색), W(파란색)
- 테이블: 흰색 배경, 회색 헤더

---

## 🎯 디자인 패턴 정리

### 공통 UI 컴포넌트

| 컴포넌트 | 사용 위치 | 스타일 |
|---------|---------|--------|
| **상단 헤더** | 모든 화면 | 마젠타/분홍색 (#D91E63) |
| **필터 섹션** | 목록/대시보드 | 흰색 배경, 회색 입력 필드 |
| **데이터 그리드** | 목록 페이지 | 흰색 배경, 스크롤 가능 |
| **상태 배지** | 모든 리스트 | 색상 코드 (녹색OK, 빨간색경고) |
| **토글 스위치** | 설정/관리 | 초록색(ON), 회색(OFF) |
| **라디오 버튼** | 폼 | 표준 라디오 버튼 스타일 |
| **체크박스** | 다중 선택 | 분홍색 선택 표시 |
| **드롭다운** | 필터/폼 | 회색 배경, 아래 화살표 |
| **액션 버튼** | 모든 페이지 | 분홍색 (Primary), 흰색(Secondary) |
| **좌측 네비게이션** | 모든 페이지 | 흰색 배경, 중첩 메뉴 |

### 색상 팔레트

```
Primary (분홍색/마젠타):  #D91E63 (헤더, 버튼, 활성 탭)
Secondary (파란색):      #2196F3 (배지, 탭, 정보 표시)
Success (녹색):         #4CAF50 (완료, 성공, OK 상태)
Warning (주황색):       #FF9800 (경고, 주의)
Error (빨간색):         #F44336 (오류, 실패)
Neutral (회색):         #9E9E9E (비활성, 대기)
Background (흰색):      #FFFFFF (기본 배경)
Text (검정색):         #212121 (기본 텍스트)
```

### 레이아웃 구조

```
┌─────────────────────────────────────────────┐
│  헤더 (마젠타 배경)                          │
│  ONE CHORUS | BOOKING MANAGEMENT | TEST      │
├─────────────────────────────────────────────┤
│ 좌측 네비 │                    메인 콘텐츠  │
│          │  ┌────────────────────────────┐  │
│ - Menu 1 │  │  필터 섹션                  │  │
│ - Menu 2 │  ├────────────────────────────┤  │
│ - Menu 3 │  │  데이터 그리드 / 폼        │  │
│          │  │  (스크롤 가능)             │  │
│          │  └────────────────────────────┘  │
│          │  ┌────────────────────────────┐  │
│          │  │  페이지네이션 / 액션      │  │
│          │  └────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## 📝 주요 발견사항

### 1. **다층 필터링 시스템**
- 모든 리스트 페이지에서 "Collapse/Expand Filters" 패턴 사용
- 빠른 필터 (상단)와 고급 필터 (확장 가능) 분리
- 필터 적용 수를 표시 ("4 filters applied")
- 필터 저장 및 초기화 기능

### 2. **대량 작업 지원**
- 모든 리스트에 행 선택 체크박스
- "Select All" 기능 (암묵적)
- 선택된 항목에 대한 일괄 작업 가능

### 3. **명확한 상태 표시**
- 배지, 아이콘, 색상을 통한 상태 표현
- 초록색(성공), 빨간색(경고), 회색(대기) 등
- 정확한 상태 텍스트 라벨 포함

### 4. **계층적 네비게이션**
- 좌측 사이드바 (1-3단계 중첩 메뉴)
- 메인 콘텐츠 영역과 명확히 분리
- 현재 선택 페이지 하이라이트

### 5. **폼 설계**
- 섹션별 펼칠/접기 가능
- 필수 필드 표시 (빨간색 별)
- 다양한 입력 타입 (텍스트, 날짜, 드롭다운, 라디오 등)

### 6. **데이터 그리드**
- 열 정렬 기능 (↑↓ 화살표)
- 수평 스크롤 가능 (많은 컬럼)
- 페이지네이션 (Show X items, Total Y results)
- 링크 가능한 셀 (Booking No., Container No. 등)

---

## 🚀 현재 프로젝트(SRM2)에의 적용

### 유사점
- ✅ 마젠타 헤더 사용
- ✅ 필터링 기능 (VVD, POD 등)
- ✅ 다중 선택 체크박스
- ✅ 상태 배지
- ✅ 좌측 네비게이션

### 차이점
- ❌ SRM2는 **2-패널 레이아웃** (좌측: B/L 목록, 우측: 상세 정보)
- ❌ SRM2는 **모달 제거** (인라인 편집)
- ❌ SRM2는 **1-클릭 액션** (Approve & Send Arrival Notice)

### 권장사항
1. **필터링 시스템** 채용 (Collapse/Expand 패턴)
2. **색상 팔레트** 통일 (분홍색 #D91E63)
3. **배지 시스템** 활용 (Matched/Unmatched/AI_Suggested)
4. **상태 표시** 명확화 (녹색OK, 빨간색경고)
5. **네비게이션** 구조 참고

---

## 📌 결론

Design-Assets의 6개 스크린샷은 **엔터프라이즈급 물류/배송 관리 시스템**의 UI/UX를 보여줍니다.
주요 특징:
- ✅ 대량 데이터 처리 (그리드, 필터링, 페이지네이션)
- ✅ 명확한 상태 관리 (배지, 색상)
- ✅ 직관적인 네비게이션
- ✅ 모바일 미고려 (데스크톱 전용)

**SRM2 프로젝트는 이 패턴들을 참고하되, 더 간소화된 2-패널 레이아웃과 1-클릭 액션으로 차별화할 수 있습니다.**

