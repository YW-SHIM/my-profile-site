# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Turbopack dev server (http://localhost:3000, auto-picks another port if busy)
npm run build    # production build (Turbopack, includes TypeScript type-check)
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit # standalone type-check without emitting files
```

이 저장소에는 테스트 스크립트가 없다. 타입 오류는 `npx tsc --noEmit` 또는 `npm run build`로 확인한다.

shadcn/ui 컴포넌트 추가: `npx shadcn@latest add <name> -y` (→ `components/ui/`).
추가 전 확인: `npx shadcn@latest view <name>`.

## 주요 패키지 버전 (breaking change 주의)

| 패키지 | 버전 | 주의사항 |
|--------|------|----------|
| `next` | `^16.3.6` | AGENTS.md 경고 참조 — 기존 지식과 API가 다를 수 있음. 의심스러우면 `node_modules/next/dist/docs/` 확인 |
| `react` | `19.2.8` | |
| `zod` | `^4.6.5` | v3 대비 `.optional()` / `.nullable()` 동작, `z.object()` 등 API 변경. 공식 마이그레이션 가이드 필수 |
| `zustand` | `^5.0.15` | v4 대비 미들웨어·슬라이스 패턴 변경. 스토어가 아직 없으므로 추가 시 v5 공식 문서 기준으로 작성 |
| `@base-ui/react` | `^1.8.0` | shadcn/ui 프리미티브로 사용. Radix UI와 API가 다름 |

## Architecture

Next.js App Router 프로젝트. `src/` 없음 — `app/`, `components/`, `lib/` 모두 repo 루트에 위치. Path alias `@/*` → repo 루트 (`tsconfig.json`).

### 이 프로젝트의 shadcn/ui는 표준 설정이 아님

`components.json`의 `"style": "base-nova"`. 프리미티브는 **Radix UI가 아닌 `@base-ui/react`** 기반.

- `render` prop 패턴 사용: `<AlertDialogTrigger render={<Button variant="destructive" />}>`
- `data-open`, `data-ending-style` 등 Base UI 전용 data attribute 사용
- `AlertDialogAction`, `AlertDialogCancel` 등 이미 `Button`을 내부에 감싼 컴포넌트를 다시 `<Button>`으로 감싸지 않는다
- `cn()` (`lib/utils.ts`) → `cn` npm 패키지 (clsx + tailwind-merge 대체)
- classic shadcn `form` 래퍼 컴포넌트 없음 → **`<Field />` 계열** (`components/ui/field.tsx`: `FieldLabel`, `FieldError`, `FieldGroup` 등) + React Hook Form `<Controller />` + `zodResolver` 조합

### 컴포넌트 계층 (하위 → 상위)

| 폴더 | 역할 |
|------|------|
| `components/ui/` | shadcn CLI 출력물. vendored 취급 — 직접 수정 최소화 |
| `components/common/` | `ui/`를 조합한 소형 재사용 컴포넌트 (`ThemeToggle`, `Logo`, `NavLink`) |
| `components/layout/` | 앱 셸 구조 컴포넌트 (`Header`, `Footer`, `MobileNav`, `Container`, `PageWrapper`) |
| `components/providers/` | 앱 전역 컨텍스트 (`ThemeProvider` — `next-themes` 래핑) |
| `app/**/page.tsx` | 라우트 단위 컴포지션 |

### 네비게이션

**단일 정보 소스**: `components/layout/nav-items.ts`의 `navItems` → `Header.tsx`(데스크톱), `Footer.tsx`, `MobileNav.tsx` 세 곳이 동일하게 소비.  
항목을 추가할 때 대응하는 `app/<path>/page.tsx`가 반드시 존재해야 한다. 미들웨어·프록시·catch-all 라우트가 없으므로 파일이 없으면 404.

### 다크 모드

`next-themes` → `ThemeProvider` → `app/layout.tsx`. `<html>`에 `suppressHydrationWarning` 필수.  
마운트 전 테마를 읽어야 하는 클라이언트 컴포넌트는 effect + setState가 아닌 `useSyncExternalStore`를 사용한다 (`react-hooks/set-state-in-effect` lint rule).

### 상태·폼·토스트

- **Zustand v5**: 클라이언트 전역 상태. 스토어 없음 — 기능이 실제로 필요할 때 `store/` 아래 슬라이스로 추가.
- **React Hook Form + Zod v4 + `@hookform/resolvers`**: 폼 검증.
- **`sonner`**: 토스트 알림. `<Toaster />`는 `app/layout.tsx`에 마운트되어 있음.

### Next.js 16 전역 타입

`next dev` 또는 `next build` 실행 시 `.next/types/`·`.next/dev/types/`에 라우트별 타입이 자동 생성된다.
`LayoutProps<"/">`, `PageProps` 등은 import 없이 전역에서 사용 가능하며, **첫 `npm run dev` 전에는 해당 타입이 없어 타입 오류가 발생**한다.

### CSS / 테마

Tailwind v4, CSS-first — `tailwind.config.js` 없음. 테마 토큰·CSS 변수는 `app/globals.css` (`@theme inline`, `:root`, `.dark`).

## Workflow

코드 구현(기능 추가·버그 수정·리팩터링)을 마치면 **커밋 전에** `.claude/agents/code-reviewer.md` 서브에이전트를 실행해 리뷰를 받는다. 리뷰어는 읽기 전용이며, 지적 사항 수정은 메인 세션에서 처리한다.

## Playwright MCP

- 프로젝트 공유 설정: 루트 `.mcp.json` (`playwright` 서버, `npx @playwright/mcp@latest`, stdio). 커밋 대상.
- 개인 활성화: `.claude/settings.local.json`의 `enabledMcpjsonServers: ["playwright"]`. gitignore 대상.
- UI 변경 검증 시 `npm run dev`로 서버를 띄운 뒤 `mcp__playwright__*` 도구로 확인.
- 반응형 확인: `md` 브레이크포인트(768px) 전후로 `browser_resize` 사용.
- `.playwright-mcp/`: MCP가 생성하는 런타임 아티팩트(로그·스크린샷). gitignore 적용됨.

## Conventions

- `any` 타입 금지 — `grep -rn ": any" components/ app/ lib/`로 커밋 전 확인.
- 2칸 들여쓰기, camelCase 함수/변수, PascalCase 컴포넌트.
- 코드 주석 한국어, 변수명/함수명 영어.
- 모바일 네비 브레이크포인트: `md` (`hidden md:flex` / `md:hidden`).
- 모든 UI는 반응형 필수.
