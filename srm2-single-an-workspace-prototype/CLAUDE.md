# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

타입 체크는 별도 CLI 없이 `next build` 시 함께 실행됩니다. 빠른 타입 확인만 필요하면 `npx tsc --noEmit`을 사용합니다.

## Architecture

설계 원칙·UI 레이아웃·필드 명세는 `.claude/rules/01~04-*.md`가 유일한 권위 있는 근거입니다.

### 데이터 흐름

```
lib/mock-data.ts  →  store/arrival-notice-store.ts  →  app/page.tsx  →  components/
(ArrivalNoticeRecord[])    (Zustand, filteredRecords)      (조합)           (섹션 렌더)
```

- **단일 Zustand 스토어** (`store/arrival-notice-store.ts`): 레코드 목록, 필터 상태, 행 선택, Section 2 draftEdits(Undo/Save 전 임시 편집값)를 모두 관리
- `retrieveRecords()` 호출 시 `applyFilters()`가 실행되어 `filteredRecords` 갱신
- Section 2 인라인 편집은 `draftEdits` 맵에만 반영되다가 `saveGridEdits()` 호출 시 `records`에 반영됨

### 타입 시스템

`types/arrival-notice.ts`의 `ArrivalNoticeRecord`가 유일한 도메인 엔티티 타입입니다. `any` 타입 사용 금지. 경로 별칭 `@/*`은 프로젝트 루트(`./`)를 가리킵니다.

### 알려진 미구현 사항 (Known Gaps)

`USER-STORY-VERIFICATION-REPORT.md` 참조. 주요 항목:
- `applyFilters`에 POD ETA 범위·Customer Code·POL·T/S·S/C No. 미적용 (상태 수집만 됨)
- Section 4 Manifest 누락 행 빨간 강조 없음
- `Send Arrival Notice` 유효성 검사 게이팅 없음 (누른 즉시 dispatch됨)
- Bottom Bar의 `Preview Selected A/N`, `Validate Selected` 핸들러 미구현
- Section 2 Remarks 컬럼 누락

## MCP 서버

프로젝트 루트 `.mcp.json`에 `google-drive` MCP 서버가 정의되어 있으며, `servers/google-drive-server.js`를 Node.js로 기동합니다. `gcp-oauth.keys.json`과 `gcp-token.json`이 모두 필요합니다. 설정 활성화는 `.claude/settings.local.json`의 `enabledMcpjsonServers` 참조.

Google Drive 분석 agent 생성 시에는 `my-workspace/templates/google-drive-analysis-agent.md` 템플릿을 사용합니다 (Folder-First Search Protocol 보장).
