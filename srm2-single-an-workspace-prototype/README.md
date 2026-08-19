# SRM2 Single Arrival Notice Unified Workspace - Prototype

## Project Overview

This is a **Task-Oriented UI Prototype** for Shipment Release Management (SRM2), consolidating 5 legacy OPUS screens (`ESM_BKG_1054`, `ESM_BKG_0672` ×3, `ESM_BKG_0381`) into a single 4-section vertical grid workflow. See `.claude/rules/*.md` for the authoritative spec — this document only summarizes the current implementation.

### Key Features

✅ **4-Section Consolidated Workspace** – Select Targets → Confirm Vessel Arrival Info → Verify Mandatory Data → B/L Grid & Batch Selection, with a sticky bottom execution bar

✅ **No Modal Popups** – All edits happen inline in the grids (dropdowns, date pickers, inline text editing)

✅ **Grid Configuration** – Column show/hide/reorder per grid (Section 2, Section 4); no field is hardcoded-excluded

✅ **1-Click Batch Send** – `Send Arrival Notice (N)` dispatches all selected B/Ls without an intermediate confirmation step

## Technology Stack

- **Framework:** React + Next.js (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Language:** TypeScript

## Project Structure

```
.claude/
├── settings.json          # Project configuration
└── rules/                 # Domain & implementation rules (authoritative spec)
    ├── 01-domain-and-architecture.md
    ├── 02-ui-ux-field-rules.md
    ├── 03-language-and-style.md
    └── 04-mock-data-and-api.md

app/
├── layout.tsx             # Root layout
├── page.tsx               # Main workspace (assembles Section 1–4 + bottom bar)
└── globals.css            # Global styles

components/
├── TargetSelectorBar.tsx        # Section 1 — Select Targets by VVD + POD
├── VesselArrivalGrid.tsx        # Section 2 — Confirm & Set Vessel Arrival Info
├── ManifestVerificationStats.tsx# Section 3 — Verify Mandatory Data
├── BLContactGrid.tsx            # Section 4 — B/L Grid, Contact Roles, Batch Selection
├── BottomExecutionBar.tsx       # Sticky bottom execution bar
└── SectionHeader.tsx            # Shared section header

store/
└── arrival-notice-store.ts # Zustand state management (filters, selection, batch send)

types/
└── arrival-notice.ts       # TypeScript interfaces (ArrivalNoticeRecord)

lib/
└── mock-data.ts             # Mock B/L records for demo
```

## Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will run on `http://localhost:3000`

## UI Workflow

### Section 1 — Select Targets by VVD + POD
VVD multi-tag selector, POD ETA date range, POD, B/L No. search, Container Type/Customer Type/A/N Status filters, `+ More Filters` expandable chip row, `Retrieve` / `Template` actions.

### Section 2 — Confirm & Set Vessel Arrival Info
One row per selected VVD with inline-editable cells (dropdowns for VVD/CNTR TYPE/FORM/AGENT, date pickers for POD ETA/DEL ETA/AVAILABLE DATE/LAST FREE TO PICK UP). `Undo` / `Save`, Grid Configuration panel.

### Section 3 — Verify Mandatory Data
Live counts: Manifest Matched / Manifest Missing (with offending B/L + VVD) / Total B/L, computed from the current filter result set.

### Section 4 — B/L Grid · Contact Roles · Batch Selection
Fixed columns (SEQ, SEL, CHG, IMPORT MANIFEST NO, BL NO, TP, CODE, CUSTOMER NAME) plus Grid-Configuration-toggleable columns (A/N SENT, CNEE/NTFY, BROKER #1/#2, POD, DEL, TYPE, TERM, A/N FORM, LANGUAGE). Toolbar: `Undo`, `Retrieve`, `Down Excel`, `Save`, `Code Validate`, `E-Mail`, `Preview`, `Print`, `History`.

### Bottom Execution Bar (sticky)
`Selected X / Y B/L` counter, `Preview Selected A/N`, `Validate Selected`, primary action `Send Arrival Notice (N)`.

## Mock Data

Sample B/L records are provided in `lib/mock-data.ts`, covering multiple VVDs/PODs so the three primary search combinations (VVD+POD, POD ETA Range+POD, Customer Code+POD) can be exercised.

## Key Implementation Details

### Zustand Store (`store/arrival-notice-store.ts`)
- Manages record list, filters, per-row selection state
- `approveAndMassSendArrivalNotices()` – dispatches all selected B/Ls in one action (Section 4 + Bottom Bar)

## Known Gaps (see `USER-STORY-VERIFICATION-REPORT.md` for details)

- POD ETA range / Customer Code filters are not yet wired into `applyFilters`
- Manifest-missing rows have no visual (red) highlight in Section 4
- `Send Arrival Notice` is not gated on manifest/contact validation passing
- Bottom bar's `Preview Selected A/N` and `Validate Selected` buttons have no handler yet

## Development Notes

- All UI labels should use clear, straightforward English per Rule 03
- DDD principles applied: `ArrivalNotice` as aggregate root
- No modal popups anywhere — all edits happen inline in the grids, per Rule 01

## License

Internal - CyberLogitec SRM2 Project
