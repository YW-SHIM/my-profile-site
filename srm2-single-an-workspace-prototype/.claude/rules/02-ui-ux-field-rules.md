# Rule 02: UI/UX, Operational Groupings & Data Field Specifications

## Primary High-Volume Workflows
The workspace MUST support rapid multi-B/L review and mass dispatch based on three primary operational search & grouping combinations:
1. **Primary Combination:** `VVD` (Vessel Voyage Direction) + `POD` (Port of Discharging)
   - Operates on large volumes of B/Ls arriving on a specific vessel voyage.
   - Requires fast verification of ETA, Container Discharge/Pickup Yards, and unique Customs Reference Sequences (VVD-level or B/L-level unique SEQ numbers).
2. **Secondary Combination:** `POD ETA Date Range` + `POD`
3. **Tertiary Combination:** `Customer Code` + `POD`

## Column Visibility via Grid Configuration
There is no fixed field-exclusion list. Every grid (Section 2, Section 4) exposes a **Grid Configuration** panel (gear icon) that lets the user show/hide and reorder columns at will — including legacy fields such as `HUB`, `DEL ETA`, `POD FIRMS`, `P/Up FIRMS`, `Agent`. Field visibility is a user preference, not a hardcoded UI rule.

## 4-Section Consolidated Layout
Organize the workspace into a vertical stack of four numbered sections plus a sticky bottom execution bar. No modal popups anywhere — all edits happen inline in the grids.

1. **Section 1 — Select Targets by VVD + POD:**
   - VVD multi-tag selector (+ Add VVD), POD ETA date range, POD, B/L No. search
   - `Retrieve` / `Template` actions
   - Container Type toggle (All/DR/RF), Customer Type, A/N Status, DEL
   - `+ More Filters` expandable chip row: T/S, POL, Customer Code, DEL, Customer Name, S/C No.

2. **Section 2 — Confirm & Set Vessel Arrival Info (edit directly in the grid, no popup):**
   - One row per selected VVD: SEQ, VVD, CNTR TYPE, POD ETA, DEL ETA, AVAILABLE DATE, LAST FREE TO PICK UP, P/Up CY/CFS, RETURN CY, FORM, AGENT, IMPORT MANIFEST NO
   - Editable cells use inline dropdowns (VVD, CNTR TYPE, FORM, AGENT) or inline date pickers (POD ETA, DEL ETA, AVAILABLE DATE, LAST FREE TO PICK UP)
   - `Undo` / `Save` actions, Grid Configuration panel, collapsible "Important Notice" box

3. **Section 3 — Verify Mandatory Data · Missing Check:**
   - Manifest Matched / Manifest Missing (with offending B/L + VVD) / Total B/L across VVDs, computed live from the current filter result set

4. **Section 4 — B/L Grid · Contact Roles · Batch Selection:**
   - Send/E-Mail/Fax toggles, A/N Status filter, action toolbar (`Undo`, `Retrieve`, `Down Excel`, `Save`, `Code Validate`, `E-Mail`, `Preview`, `Print`, `History`)
   - Fixed columns: SEQ, SEL, CHG, IMPORT MANIFEST NO, BL NO, TP, CODE, CUSTOMER NAME
   - Grid-Configuration-toggleable columns: A/N SENT, CNEE/NTFY, CNEE/NTFY #2, BROKER #1, BROKER #2, POD, DEL, TYPE, TERM, A/N FORM, LANGUAGE

5. **Bottom Execution Bar (sticky):**
   - `Selected X / Y B/L` counter, `Preview Selected A/N`, `Validate Selected`, primary action `Send Arrival Notice (N)`
