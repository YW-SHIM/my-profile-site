# SRM2 Single Arrival Notice Unified Workspace - Core Base Prototype

## Project Overview

This is a **Task-Oriented UI Prototype** for Shipment Release Management (SRM2), designed to consolidate and simplify the B/L (Bill of Lading) approval workflow across multiple legacy OPUS screens.

### Key Features

✅ **Single A/N Unified Workspace** – Replace 4 legacy OPUS screens (`ESM_BKG_1054`, `ESM_BKG_0240`, `ESM_BKG_0672`, `ESM_BKG_0381`) with one focused interface

✅ **1-Click Approval** – `Approve & Send Arrival Notice` button with real-time visual feedback

✅ **AI Confidence Badges** – Green (>95%) and Yellow (<95%) badges for customer code validation

✅ **Kafka CDC Simulation** – Simulates real-time event streaming and record archiving

✅ **OPUS Deep-Link** – `View in OPUS` button pre-loads the legacy system with current B/L

✅ **Clean Data Fields** – Excludes 5 legacy fields (HUB, DEL ETA, POD FIRMS, P/Up FIRMS, Agent) per product strategy

## Technology Stack

- **Framework:** React + Next.js (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** Zustand
- **Language:** TypeScript

## Project Structure

```
.claude/
├── settings.json          # Project configuration
└── rules/                 # Domain & implementation rules
    ├── 01-domain-and-architecture.md
    ├── 02-ui-ux-field-rules.md
    ├── 03-language-and-style.md
    └── 04-mock-data-and-api.md

app/
├── layout.tsx             # Root layout
├── page.tsx               # Main workspace component
└── globals.css            # Global styles

components/
├── HeaderNav.tsx          # Search + Status + View in OPUS button
├── LeftPanel.tsx          # Customer info + Code validation
├── RightPanel.tsx         # Schedule + Remark + Approval button
├── ConfidenceBadge.tsx    # AI confidence visual indicator
└── StatusBadge.tsx        # Status badges (Pending, Sending, Dispatched)

store/
└── arrival-notice-store.ts # Zustand state management (approval, Kafka, archiving)

types/
└── arrival-notice.ts       # TypeScript interfaces

lib/
└── mock-data.ts           # Mock B/L records for demo

tailwind.config.ts         # Tailwind configuration
postcss.config.js          # PostCSS configuration
next.config.js             # Next.js configuration
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

### 1. Header Navigation
- **B/L Search Input** – Find records by B/L No.
- **Status Badge** – Displays current status (Pending Review, Sending, Dispatched)
- **View in OPUS Button** – Opens legacy OPUS screen with pre-loaded B/L

### 2. Left Panel (Customer & Validation)
- Customer name, address, and details
- Match Status badge with AI confidence score
- Verified Customer Code or AI-suggested alternative
- Notify contact (Email, Fax)

### 3. Right Panel (Schedule & Approval)
- **Schedule Card** – 12 mandatory operational fields (VVD, B/L, D/T, CNTR, DEL, POD ETA, Available Date, Last Free Date, Pickup CY, Return CY, Form Type)
- **Remark Input** – Add optional notes
- **Approve Button** – Triggers 3-step workflow:
  1. Status changes to `Sending...` (visual spinner)
  2. Simulates Kafka CDC event (1.5s delay)
  3. Record dispatched & archived

### 4. Sidebar (Pending Records)
- Quick access list to pending B/L records
- Shows processed (dispatched/archived) records separately

## Approval Workflow

```
[PENDING] → Click "Approve & Send Arrival Notice"
    ↓
[SENDING...] → Publish Kafka CDC event (real-time simulation)
    ↓
[DISPATCHED] → Archive record + visual confirmation
    ↓
Record removed from pending list, moved to processed section
```

## Mock Data

Three sample B/L records are provided:
- **OOCL202400001234** – Matched (98% confidence, green badge)
- **MSC202400005678** – AI-Suggested (87% confidence, yellow badge)
- **EVERGREEN2024009999** – Unmatched (65% confidence, yellow badge)

## Key Implementation Details

### Zustand Store (`store/arrival-notice-store.ts`)
- Manages record list, selected record, approval state
- `approveAndSendArrivalNotice()` – Orchestrates the 3-step approval flow
- `simulateKafkaCDCSync()` – Logs Kafka events to console
- `archiveRecord()` – Removes from pending, moves to archive
- `openOpusScreen()` – Logs OPUS deep-link (can be wired to actual legacy system)

### Confidence Badge Component (`components/ConfidenceBadge.tsx`)
- Green badge: `confidenceScore > 95%`
- Yellow badge: `confidenceScore ≤ 95%`
- Shows match status label and score percentage

### Status Badge Component (`components/StatusBadge.tsx`)
- PENDING: Blue
- SENDING: Orange with animated pulse
- DISPATCHED: Green with checkmark
- ARCHIVED: Gray

## Field Exclusions (MANDATE)

The following legacy fields are **intentionally NOT displayed**:
- ❌ HUB
- ❌ DEL ETA
- ❌ POD FIRMS
- ❌ P/Up FIRMS
- ❌ Agent

This aligns with the SRM2 Product Strategy to focus on operational clarity and minimize cognitive load.

## Console Logging

Check the browser console for:
- Kafka CDC event logs when approval is clicked
- OPUS deep-link URLs when "View in OPUS" is clicked
- State transitions (Pending → Sending → Dispatched)

## Development Notes

- All UI labels use clear, straightforward English per Rule 03
- DDD principles applied: `ArrivalNotice` as aggregate root
- Task-oriented design: One focused workspace replacing 4 legacy screens
- No generic data grids: All data presented in context (schedule card, contact panel)

## Future Enhancements

- 🔜 Connect to real OPUS backend API
- 🔜 Real Kafka event streaming integration
- 🔜 Database persistence (archive storage)
- 🔜 Multi-user approval workflows
- 🔜 Audit trail / activity log
- 🔜 Batch approval mode (multiple B/Ls)
- 🔜 Integration with MDM system for customer code lookup

## License

Internal - CyberLogitec SRM2 Project
