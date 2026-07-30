# Rule 03: Language & Labeling Mandate

## Communication Guidelines
- Use clear, straightforward English for all UI labels, tooltips, and prompts.
- Use simple sentences and direct verbs (e.g., `Approve & Send Arrival Notice`, `Search`, `Reset`, `Download`, `View Details`).
- Keep field labels concise (single word or short phrase preferred).
- Use consistent terminology across all screens.

## UI Label Standard Mapping

### Navigation & Menu
- `Booking Management` -> Main module name (top-left sidebar)
- `Shipment Overview` -> Current view/section
- `Dashboard` -> Tab for overview
- `BRN Send` -> Tab for B/L Release Notice sending

### List View - Table Headers
- `Issue` -> Checkbox + Action icon column
- `Booking No.` -> Bill of Lading number (clickable/linked)
- `SHPR Code` -> Shipper code reference
- `SHPR` -> Shipper company name
- `CNEE` -> Consignee/Notify contact
- `T/VVD` -> Vessel/Voyage/Direction (transshipment)
- `1st VVD` -> First vessel movement
- `Sail Date 1st VVD` -> First departure date
- `CY Cut Off` -> Container yard cut-off deadline
- `ERD` -> Estimated Release Date
- `Vol` -> Volume (containers/units)

### Filter & Search Section
- `Date Type` -> Booking Creation / Other date types
- `Date Period` -> From/To date range
- `Booking Status` -> Multi-select status filters (Firm, Waiting, Advanced, Cancelled, Memo)
- `Cargo Nature` -> Type of cargo
- `Booking Office` -> Originating office
- `More Filters` -> Expand additional filter options
- `Expand Filters` -> Show/hide filter panel
- `5 filters applied` -> Count indicator
- `Saved Filters` -> Load previously saved filter sets
- `Reset` -> Clear all filters

### Detail View - Shipment Info
- `Shipment Overview` -> Page title
- `B/L No.` -> Bill of Lading number
- `VVD` -> Vessel/Voyage/Direction
- `POD` -> Port of Discharge
- `POL` -> Port of Loading
- `CNEE / NTFY` -> Consignee / Notify Contact
- `D/T` -> Delivery Term
- `CNTR Type` -> Container type
- `DEL` -> Place of Delivery
- `POD ETA` -> Port of Discharge Estimated Time of Arrival
- `Available Date` -> Container availability date
- `Last Free Date` -> Last free day for pickup
- `P/Up CY/CFS` -> Pickup location (Container Yard / Container Freight Station)
- `Return CY` -> Empty return location
- `Form Type` -> Document form type (EDI / Paper)
- `Remark` -> Additional notes/comments

### Action Buttons & Controls
- `Search` -> Primary search button (pink/magenta)
- `Reset` -> Clear search/filter form
- `Download all` -> Export table data
- `BRN Send` -> Send B/L Release Notice
- `BRN Cancel` -> Cancel BRN action
- `Approve & Send Arrival Notice` -> Main approval action
- `View in OPUS` -> Open legacy system
- `Save` -> Persist changes
- `View Details` / `Edit` -> Open detail view
- `More Actions` -> Dropdown menu

### Status & Badges
- `Firm` -> Confirmed/solid booking (blue badge)
- `Waiting (M)` -> Awaiting motion/confirmation (blue badge)
- `Advanced (A)` -> Advanced shipment (blue badge)
- `Cancelled (X)` -> Cancelled booking (red badge)
- `Memo Split (S)` -> Split memo (blue badge)
- `Pending Review` -> Awaiting approval (blue status)
- `Sending...` -> In progress (orange status with spinner)
- `Dispatched` -> Successfully completed (green status)

### Confidence & Match Indicators
- `Match Status` -> AI matching result (Matched / AI_Suggested / Unmatched)
- `Verified Customer Code` -> Confirmed customer code
- `AI Suggested Code` -> AI-recommended alternative code
- Confidence score display format: `[Score]%` (e.g., `98%`, `87%`)

### Information Icons & Tooltips
- `?` icon next to field labels -> Contextual help
- Hover text provides field descriptions and requirements
- Date fields show format hints (e.g., `YYYY-MM-DD`)

## Typography Standards
- **Header/Title**: 16-18px, bold (600-700 weight)
- **Section Title**: 14px, semibold (600 weight)
- **Field Label**: 12px, semibold (600 weight)
- **Body Text**: 13-14px, regular (400 weight)
- **Small/Helper Text**: 11-12px, regular (400 weight)

## Component Spacing
- **Section margins**: 24px (top/bottom)
- **Field spacing**: 16px (vertical)
- **Filter row spacing**: 12px
- **Table row height**: 40px minimum
- **Padding inside elements**: 12-16px

## Tone of Voice
- **Instruction**: Direct and action-oriented ("Search", "Filter", "Approve")
- **Error messages**: Clear problem statement + suggested action
- **Help text**: Concise explanation without jargon
- **Button text**: Always start with a verb
