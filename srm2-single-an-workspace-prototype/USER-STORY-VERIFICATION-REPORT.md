# SRM2 Unified A/N Workspace — User Story 교차검증 리포트

**검증 기준 문서**: `SRM2 MVP PROPOSAL.pdf` (Ocean Network Express, Jun 2026) pp.19-22, `Appendix#. User Story 1 - Unified A/N Workspace` (Story 1-1 ~ 1-4)
**검증 대상 코드**: `app/page.tsx`, `components/TargetSelectorBar.tsx`, `components/VesselArrivalGrid.tsx`, `components/ManifestVerificationStats.tsx`, `components/BLContactGrid.tsx`, `components/BottomExecutionBar.tsx`, `store/arrival-notice-store.ts`, `types/arrival-notice.ts`, `lib/mock-data.ts`
**검증일**: 2026-08-13

> 참고: 이번 검증은 Google Drive MCP가 세션에 연결되지 않은 상태에서, 사용자가 `D:\work\SRM2-SINGLE-AN-WORKSPACE.PROTOTYPE`에 직접 옮겨둔 원본 `SRM2 MVP PROPOSAL.pdf`를 직접 읽어 진행했다. GDrive MCP 미연결 원인 및 조치는 리포트 말미 부록 참조.

---

## Story 1-1: Unified A/N Workspace (단일 B/L 리뷰)

> As an Inbound Customer Service Staff, I want to review customer code validation, contact details, and vessel schedules on a single task-oriented screen, So that I can approve and send Single Arrival Notices without navigating multiple OPUS screens.

| # | Acceptance Criteria | 판정 | 근거 |
|---|---|---|---|
| 1 | B/L 고객정보·매칭된 MDM 코드·이메일/팩스 연락처·선박 도착 스케줄을 하나의 패널에 표시 | ⚠️ 주의 | 4섹션(TargetSelectorBar~BLContactGrid)이 한 화면에 있어 "여러 화면 이동 없음" 취지는 충족하나, "선택한 B/L 1건"에 대한 단일 상세 패널 형태가 아니라 다건 배치 그리드 형태로 구현됨(Story 1-2~1-4 방향으로 스코프가 확장/대체됨) |
| 2 | 5개 필드(HUB, DEL ETA, POD FIRMS, P/Up FIRMS, Agent) 강제 숨김 | 📌 **대체됨 (검증 제외)** | 사용자 확정: Mockup UI Image #2에서 제안된 Grid Configuration show/hide 컬럼 설정 기능으로 대체. `VesselArrivalGrid.tsx:200-242`, `BLContactGrid.tsx:165-211`의 Grid Configuration 패널이 이를 충족하며, `.claude/rules/02`도 이 정책으로 이미 갱신되어 있음. 별도 판정 없이 각주 처리 |
| 3 | "Approve & Send" 클릭 시 A/N 전송 + OPUS 테이블(BKG_CUSTOMER, BKG_ARR_NTC) 실시간 Kafka CDC/API 갱신 | ⚠️ 주의 | `store/arrival-notice-store.ts`의 `approveAndSendArrivalNotice`/`approveAndMassSendArrivalNotices`가 `simulateKafkaCDCSync`(setTimeout + console.log)만 수행 — 프로토타입 목업 단계이므로 실제 백엔드 연동은 범위 밖. 인터페이스 자리는 마련되어 있음 |

---

## Story 1-2: High-Density Batch Arrival Notice Workspace & Verification

> As an Inbound Customer Service Staff, I want to load 30 to 100+ B/Ls under a specific VVD + POD, verify Vessel Arrival Info, Import Manifest status, and Customer Code Validation on one task-oriented screen, So that I can identify missing information and update operational data in batch without navigating multiple OPUS screens.

| # | Acceptance Criteria | 판정 | 근거 |
|---|---|---|---|
| 1 | 기본 검색 VVD+POD, 옵션 필터(ETA From/To, Customer Code, POL, DEL, B/L No.) | ⚠️ 주의 | `TargetSelectorBar.tsx`에 VVD/POD/POD ETA 범위/B/L No./Container Type/Customer Type/DEL 입력 UI는 존재. 하지만 store의 `applyFilters`(`store/arrival-notice-store.ts:71-81`)는 `selectedVvds`, `pod`, `blNoSearch`, `containerTypeFilter`, `anStatusFilter`, `delFilter`만 실제로 필터링에 반영하며, **POD ETA 범위·Customer Code·POL·T/S·S/C No.는 상태로만 수집되고 실제 필터 로직에는 미적용** |
| 2 | 그리드 최대 100건/페이지, 컴팩트 행높이(~32px), Checkbox/Seq/B/L No. 컬럼 고정(freeze) | ⚠️ 주의 (2026-08-13 개선) | `BLContactGrid.tsx` 하단에 mockup(p.17)과 동일한 형태의 페이지네이션 바(이전/다음 화살표, 페이지 번호, Items per page 선택, Total 표시) 추가 완료. 기본 페이지당 100건 유지, mock 데이터는 16건 그대로(사용자 확정) — 페이지당 건수를 10/50으로 낮추면 실제 페이지 이동 동작 확인 가능. 컬럼 freeze(sticky)·컴팩트 32px 행높이는 여전히 미구현 |
| 3 | VVD+POD 레벨에서 POD ETA/DEL ETA/Pick-Up CY/Return CY/Available Date/Last Free Date/Remarks 편집, 관련 B/L 전체에 자동 반영 | ⚠️ 주의 (2026-08-19 개선 확인) | `VesselArrivalGrid.tsx`가 모달 없이 인라인 편집 가능(POD ETA, DEL ETA, Available Date, Last Free Date, Form, Agent). 커밋 `5ea7475`(B/L Grid 인라인 편집 기능 추가) 이후 **P/Up CY/CFS·Return CY도 `editable: 'text'`로 편집 가능해짐**(`VesselArrivalGrid.tsx:23-24`) — 해소 완료. 다만 **Remarks 컬럼은 여전히 그리드에 없음**(`COLUMNS` 배열 미포함) |
| 4 | Manifest 정보(MRN, MSN, Manifest SEQ No.) 표시, 누락 시 빨간색 강조 | ⚠️ 주의 | `ManifestVerificationStats.tsx`가 Import Manifest No. 누락 건수·목록(B/L·VVD)을 집계 표시하나, MRN/MSN 세부 필드는 데이터 모델(`types/arrival-notice.ts`)에 없음. `BLContactGrid.tsx:141`도 Import Manifest No.만 "—"로 표시할 뿐 **행 자체를 빨간색으로 강조하지는 않음** |
| 5 | 고객명/주소 vs MDM 비교, Matched/AI Suggested/Unmatched/Wrong Input/Not Existed 배지 표시 | 📌 **ToBe 범위 제외 (사용자 확정 2026-08-13)** | 데이터 모델(`types/arrival-notice.ts:57-58`)·mock 데이터(`lib/mock-data.ts:88-91`)에는 값이 남아있으나, Code Validation 배지/신뢰도 점수 UI 노출은 이번 ToBe 스코프에서 불필요한 것으로 확정 — 구현 안 함 |

---

## Story 1-3: Parent-Child Multi-Contact Management & Multi-Address Dispatch

> As an Inbound Customer Service Staff, I want to expand B/L records to inspect and edit parent-child customer contact details across three roles (Consignee, Notify Party, Also Notify) with up to 3 email/fax addresses per role, So that I can fix missing contact points directly inline before sending notifications.

| # | Acceptance Criteria | 판정 | 근거 |
|---|---|---|---|
| 1 | 각 B/L을 Parent 행으로, CNEE/NTFY/AN을 확장 가능한 Child 행으로 표시 | 📌 **ToBe 범위 제외 (사용자 확정 2026-08-13)** | Parent-Child 확장 UI는 이번 ToBe 스코프에서 불필요한 것으로 확정 — 구현 안 함 |
| 2 | 각 역할(CNEE/NTFY/AN)당 이메일 최대 3개, 팩스 최대 3개 | 📌 **ToBe 범위 제외 (사용자 확정 2026-08-13)** | 역할별 다중 주소 구조는 이번 ToBe 스코프에서 불필요한 것으로 확정 — 구현 안 함 |
| 3 | Customer Code 기준 `BKG_IB_CUST_CNTC_STUP`에서 연락처 자동 로드, 수동 override 가능 | N/A (프로토타입 범위 밖) | 목업 단계로 실제 백엔드 테이블 연동 없음 — 백엔드 연동 자체가 이번 ToBe 스코프 밖 |
| 4 | CNEE/NTFY/AN 체크박스로 수신자 선택 | 📌 **ToBe 범위 제외 (사용자 확정 2026-08-13)** | 역할별 수신자 선택 체크박스는 이번 ToBe 스코프에서 불필요한 것으로 확정 — 구현 안 함 |
| 5 | 이메일/팩스 누락 시 노랑/빨강 강조, 그리드 내 직접 입력 가능 | 📌 **ToBe 범위 제외 (사용자 확정 2026-08-13)** | Parent-Child 구조 자체가 범위 제외됨에 따라 역할별 인라인 편집도 함께 제외 |

---

## Story 1-4: Selective Preview & Mass Batch Dispatch

> As an Inbound Customer Service Staff, I want to selectively preview generated Arrival Notices and dispatch them in bulk to all selected B/Ls, So that I can guarantee document accuracy and complete notification delivery in a single action.

| # | Acceptance Criteria | 판정 | 근거 |
|---|---|---|---|
| 1 | B/L 선택 시 PDF/HTML 프리뷰(은행 계좌정보·비고·레이아웃 확인) | 📌 **ToBe 범위 제외 (사용자 확정 2026-08-13)** | 프리뷰 기능은 이번 ToBe 스코프에서 불필요한 것으로 확정 — 버튼은 존재하되 구현하지 않음 |
| 2 | Select All 체크박스 또는 개별 선택, 30~100+ B/L 동시 전송 지원 | ✅ 통과 (규모 검증 제외) | `BLContactGrid.tsx:37-46,115`의 헤더 체크박스(전체 선택)와 행별 체크박스(`toggleRecordSelection`)가 정상 동작. 다만 실제 30~100+건 규모 테스트는 mock 데이터 16건 한계로 미검증 |
| 3 | 최소 1건 선택 + 필수 연락처/Manifest 검증 통과 시에만 Send 버튼 활성화 | ⚠️ 주의 | `BottomExecutionBar.tsx`는 "선택 건수 0" 조건만으로 버튼을 비활성화하며, **Manifest 누락·연락처 누락 여부는 Send 활성화 조건에 전혀 반영되지 않음** |
| 4 | Send 클릭 후 백그라운드 처리 + 실시간 상태(Queued→Sending→Sent/Failed) + `BKG_ARR_NTC_WD` 이력 저장 | ⚠️ 주의 | `store/arrival-notice-store.ts`의 `isApproving`/`approvalProgress`로 진행률은 추적하나, 상태값이 스펙의 Queued/Sending/Sent/Failed 어휘와 다름(`PENDING`→`APPROVED`→`DISPATCHED`/`ARCHIVED`). 백엔드 이력 테이블 연동은 프로토타입 범위 밖 |

---

## 종합 요약 (2026-08-13 최종, 사용자 스코프 확정 반영)

| 구분 | 개수 |
|---|---|
| ✅ 통과 | 1 |
| ⚠️ 주의 | 4 |
| ❌ 오류 | 0 |
| 📌 대체됨/ToBe 범위 제외 (사용자 확정) | 7 |
| N/A(백엔드 범위 밖) | 1 |

**사용자 확정 사항:**
- Story 1-1 AC2(5개 필드 강제 숨김) → Grid Configuration show/hide로 대체
- Story 1-2 AC5(Code Validation 배지/신뢰도 점수 UI) → ToBe 범위 제외
- Story 1-3 전체(Parent-Child 다중 연락처 구조) → ToBe 범위 제외
- Story 1-4 AC1(B/L 프리뷰) → ToBe 범위 제외

**남은 ⚠️ 주의 항목 (우선순위 순, 2026-08-19 갱신):**
1. Story 1-2 AC1: POD ETA 범위·Customer Code 등 필터 UI는 있으나 실제 필터링에 미반영
2. Story 1-2 AC3: Remarks 컬럼이 Section 2 그리드에 없음 (P/Up CY/CFS·Return CY 읽기전용 문제는 2026-08-19 커밋 `5ea7475`로 해소됨)
3. Story 1-2 AC4: Manifest 누락 행 자체의 빨간색 강조 없음, MRN/MSN 세부 필드 없음
4. Story 1-4 AC3: Send 버튼이 Manifest/연락처 검증 통과 여부를 게이팅하지 않음

Story 1-2 AC2(고밀도 배치·페이지네이션)는 2026-08-13에 `BLContactGrid.tsx`에 페이지네이션 바를 추가해 ⚠️ 주의로 개선 완료(컬럼 freeze·32px 행높이는 미구현으로 남음). 2026-08-19 조사(루트 MD 정리 과정)에서 추가로 다음 신규 위반이 확인됨 — 상세는 `.claude/rules/03-language-and-style.md`, `02-ui-ux-field-rules.md` 대조 결과 참조:
5. Rule 03 위반: `TargetSelectorBar.tsx`의 경고 문구가 한국어로 하드코딩됨(영어 라벨 표준 미준수)
6. Rule 02 위반: Section 2에서 VVD 컬럼이 스펙상 드롭다운 편집 대상이나 읽기전용으로 렌더링됨(`VesselArrivalGrid.tsx:17`)
7. Rule 02 위반: `HUB`, `POD FIRMS`, `P/Up FIRMS` 필드가 타입/컬럼 정의 자체에 없어 Grid Configuration으로도 켤 수 없음
8. Rule 02 위반: Bottom Bar의 `Preview Selected A/N`, `Validate Selected` 버튼에 핸들러 없음

나머지 갭들에 대한 구현은 후속 작업으로 필요 시 별도 Plan을 통해 진행한다.

---

## 부록: Google Drive MCP 연결 상태

`claude mcp list` 실행 시 `google-drive` 서버가 표시되지 않음. 조사 결과:
- `gcp-oauth.keys.json`, `gcp-token.json` 모두 정상 존재 (자격증명 문제 아님)
- `.claude/settings.local.json`에 `enabledMcpjsonServers: ["google-drive"]`, `enableAllProjectMcpServers: true` 이미 설정됨 (승인 문제 아님)
- `~/.claude.json`의 `projects` 맵에 이 정확한 프로젝트 경로 항목이 없음 — 세션이 이 디렉토리에서 MCP 초기화를 아직 거치지 않았을 가능성이 유력한 원인

**조치**: 이 디렉토리에서 Claude Code를 재시작(`claude` 재실행 또는 `claude --resume`)하면 `.mcp.json`이 재로딩되어 연결될 가능성이 높음. 재시작 후에도 연결되지 않으면 `node servers/auth-google-drive.js`로 토큰을 재발급 필요.
