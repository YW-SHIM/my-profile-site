# my-workspace 워크스페이스 가이드

이 디렉토리(`my-workspace`)는 여러 독립 프로젝트를 담는 최상위 git 저장소입니다.
각 하위 프로젝트는 독립된 배포/실행 단위이며, 프로젝트 간 코드 공유·의존은 없습니다.
이 문서는 Claude Code가 `my-workspace` 하위 어느 프로젝트에서 세션을 시작하더라도
상위 디렉토리 규칙으로 자동 로드됩니다 — 각 프로젝트의 세부 규칙(`.claude/rules/`, README)을
대체하지 않고, "무엇이 어디 있는지"를 안내하는 인덱스 역할만 합니다.

## 하위 프로젝트 목록

### `.` (워크스페이스 루트) — 개인 포트폴리오 사이트
- `index.html` / `css/` / `js/` 로 구성된 정적 사이트 (`YW SHIM - Product Owner Portfolio`)
- 별도 프레임워크 빌드 없이 정적 파일로 서빙되는 완성 상태

### `srm2-single-an-workspace-prototype/` — SRM2 Arrival Notice 워크스페이스 프로토타입
- 도메인 규칙은 이 프로젝트의 `.claude/rules/01~04-*.md`가 유일한 근거(authoritative spec)입니다 — 여기서 내용을 복제하지 않습니다.
- 사용법/구조는 해당 프로젝트의 `README.md`, 요구사항 교차검증 이력은 `USER-STORY-VERIFICATION-REPORT.md` 참조.
- 원본 비즈니스 요구사항 문서(`SRM2 MVP PROPOSAL.pdf` 등)는 `D:\work\SRM2-SINGLE-AN-WORKSPACE.PROTOTYPE\`에 보관되어 있습니다.

### `my-profile-site/` — 빈 프로젝트 (미착수)
- `.claude/settings.local.json`과 빈 `plans/` 폴더만 존재합니다. 아직 실질적인 구현 내용이 없습니다.
- 다음 세션에서 이 프로젝트를 다룰 때는 "내용이 비어 있는 것이 정상"임을 전제하고, 먼저 사용자에게 목적을 확인하세요.

### `output-style-test/` — 빈 프로젝트 (일회성 테스트 흔적)
- `.claude/settings.local.json` 외 파일이 없습니다. output-style 실험을 위해 만들어졌던 것으로 추정되며 현재는 내용이 없습니다.

## 참고자료 위치 (D:\work) 교차검증 규칙

`D:\work\` 아래에는 각 프로젝트의 원본 비즈니스 문서(PDF, 스프레드시트, 목업 이미지 등)가 보관되어 있습니다.
이 폴더는 **참고자료 보관소일 뿐 git 저장소가 아니며**, 리포지토리 내 문서(예: srm2의 `.claude/rules/`)가
개정된 뒤에도 D:\work 쪽 사본은 갱신되지 않을 수 있습니다.

교차검증은 다음 두 규칙을 따릅니다:
1. **폴더명 일치 검사** — 현재 작업 중인 프로젝트명과 일치하는 폴더가 `D:\work\` 아래 존재할 때만 교차검증을 수행합니다. 일치하는 폴더가 없으면 생략합니다.
2. **최신 파일 우선** — 일치하는 폴더 안에서 비즈니스 내용이 서로 충돌하면, 생성일/수정일 기준 가장 최신 문서를 우선 적용합니다.

(예: srm2 프로젝트 → `D:\work\SRM2-SINGLE-AN-WORKSPACE.PROTOTYPE\`가 대상 폴더이며, 이미 `USER-STORY-VERIFICATION-REPORT.md`에서 검증 완료됨.)

## 유지보수 지침

`my-workspace` 하위에 새 프로젝트 폴더를 생성할 때는, 작업을 마치기 전에 이 문서의
"하위 프로젝트 목록" 섹션에 해당 프로젝트의 1~2줄 요약 항목을 추가하세요.
이 문서는 상위 디렉토리 규칙으로 자동 로드되므로 공통 규칙은 신규 프로젝트에도 즉시 적용되지만,
목록 자체는 수동으로 최신화해야 합니다.
