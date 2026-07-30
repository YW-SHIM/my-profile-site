# Rule 01: Domain-Driven Design & Bounded Context

## Bounded Context: Shipment Release & Arrival Notification
- **Aggregate Root:** `ArrivalNotice`
- **Entities:** `ConsigneeContact`, `VesselSchedule`, `CustomsReference`
- **Value Objects:** `ConfidenceScore`, `FreeDateRange`, `DeliveryTerm`

## Core Principles
1. **Task-Oriented UI:** The frontend must replace multi-screen toggling across legacy OPUS screens (`ESM_BKG_1054`, `ESM_BKG_0240`, `ESM_BKG_0672`, `ESM_BKG_0381`).
2. **Phase 1 Scope (Core Base):**
   - Provide a Single A/N Unified Workspace for individual B/L review and approval.
   - Consolidate Customer Code Validation, Recipient Contacts, and Vessel Schedules into one screen.
   - Provide a 1-Click Action Button: `Approve & Send Arrival Notice`.
