# Rule 01: Domain-Driven Design & Bounded Context

## Bounded Context: Shipment Release & Arrival Notification
- **Aggregate Root:** `ArrivalNotice`
- **Entities:** `ConsigneeContact`, `VesselSchedule`, `CustomsReference`
- **Value Objects:** `ConfidenceScore`, `FreeDateRange`, `DeliveryTerm`

## Strategic Imperative: 5-to-1 Screen Consolidation
You MUST merge the operational capabilities of these 5 legacy screens into one workspace:
1. `ESM_BKG_1054` (Customer Code Validation)
2. `ESM_BKG_0672` (Arrival Data Grid)
3. `ESM_BKG_0672` (Arrival Info Setting Modal)
4. `ESM_BKG_0672` (Customer Contact Tab)
5. `ESM_BKG_0381` (Arrival Notice Send Screen)

## Architectural Constraints
- Replace multi-tab navigation with a task-oriented, 4-section vertical grid workflow (Select Targets → Confirm Vessel Arrival Info → Verify Mandatory Data → B/L Grid & Batch Selection).
- Eliminate all modal popups; integrate inline schedule/remark overrides and column configuration directly into the workspace grids.
- Provide a primary 1-Click Action Button: `Send Arrival Notice`.