# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Turbopack dev server (http://localhost:3000, auto-picks another port if busy)
npm run build    # production build (Turbopack, includes TypeScript type-check)
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test suite/script configured in this repo. There is also no standalone typecheck
script — `npx tsc --noEmit` or `npm run build` is how type errors surface.

Adding a shadcn/ui component: `npx shadcn@latest add <name> -y` (writes into `components/ui/`).
Use `npx shadcn@latest view <name>` to inspect a registry entry before adding it if unsure it exists.

## Architecture

Next.js App Router project, no `src/` directory — `app/`, `components/`, `lib/` all live at repo
root. Path alias `@/*` → repo root (`tsconfig.json`).

**This is not a stock shadcn/ui setup — read before touching `components/ui/` or writing new UI code:**
- `components.json` uses `"style": "base-nova"`. Primitives are built on **`@base-ui/react`**
  (e.g. `components/ui/button.tsx` imports `Button as ButtonPrimitive` from `@base-ui/react/button`),
  **not Radix UI**. Prop shapes, data attributes (`data-open`, `data-ending-style`, etc.) and the
  `render` prop pattern (e.g. `<AlertDialogTrigger render={<Button variant="destructive" />}>`) come
  from Base UI's API, not Radix's.
- `cn()` (`lib/utils.ts`) re-exports the `cn` npm package (shadcn's own drop-in replacement for
  clsx + tailwind-merge), not a hand-rolled utility.
- The classic shadcn `form` wrapper component **does not exist in this registry** — it was replaced
  by a `<Field />` family (`components/ui/field.tsx`: `FieldLabel`, `FieldError`, `FieldGroup`, etc.)
  meant to be combined directly with React Hook Form's `<Controller />` + `zodResolver`. Don't try to
  `npx shadcn add form` — it's a no-op in this registry.
- Some generated components already wrap `Button` internally and accept `variant`/`size` directly
  (e.g. `AlertDialogAction`, `AlertDialogCancel`) — don't re-wrap them in another `<Button>` or pass
  them a `render` prop; only bare primitives like `AlertDialogTrigger`/`SheetTrigger` need `render`.
- Tailwind v4, CSS-first config — no `tailwind.config.js`. Theme tokens/CSS vars live in
  `app/globals.css` (`@theme inline`, `:root`, `.dark`), generated/updated by `shadcn init`.

**Component layering** (bottom → top), enforced by folder, not by lint rule:
- `components/ui/` — shadcn/Base UI CLI output only. Treat as vendored; avoid hand-editing beyond
  what the CLI generates, so `shadcn diff`/re-adds stay meaningful.
- `components/common/` — small reusable pieces composed from `ui/` (`ThemeToggle`, `Logo`, `NavLink`).
- `components/layout/` — app-shell structural components (`Header`, `Footer`, `MobileNav`,
  `Container`, `PageWrapper`) composed from `common/` + `ui/`.
- `components/providers/` — app-wide context wiring (`ThemeProvider`, wrapping `next-themes`).
- `app/**/page.tsx` — route-level composition of the above.

**Single source of truth for navigation**: `components/layout/nav-items.ts` exports `navItems`,
consumed identically by `Header.tsx` (desktop nav), `Footer.tsx`, and `MobileNav.tsx` (mobile Sheet).
Adding/removing a nav entry here changes all three surfaces at once — but a `href` only works if a
matching `app/<path>/page.tsx` actually exists; nothing else (no middleware/proxy, no redirects in
`next.config.ts`, no catch-all routes) resolves a route implicitly.

**Dark mode**: `next-themes`, wired via `components/providers/ThemeProvider.tsx` into
`app/layout.tsx`. `<html>` has `suppressHydrationWarning` (required because next-themes sets the
`class` attribute via an inline script before hydration). Client components that need to know the
resolved theme before paint (e.g. `ThemeToggle`) should read mount state via `useSyncExternalStore`
rather than an effect + `setState`, to satisfy the `react-hooks/set-state-in-effect` lint rule.

**State/forms stack** (installed, no wrapper libraries beyond shadcn's own `field.tsx`): `zustand`
for client state (no store exists yet — add a slice under a new `store/` dir only when a feature
actually needs shared state), `react-hook-form` + `zod` + `@hookform/resolvers` for forms.

## Conventions

- No `any` — this is enforced by convention/review, not by an eslint rule in this config; check with
  `grep -rn ": any" components/ app/ lib/` before considering work done.
- 2-space indentation, camelCase functions/variables, PascalCase components.
- Everything must be responsive; the mobile nav breakpoint is `md` (`hidden md:flex` / `md:hidden`
  pairs in `Header.tsx`/`MobileNav.tsx`).
