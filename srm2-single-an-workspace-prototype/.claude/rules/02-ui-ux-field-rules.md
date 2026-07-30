# Rule 02: UI/UX & Data Field Specifications

## Strict Field Exclusions (MANDATE)
Do NOT render the following 5 legacy fields on the Single A/N Workspace:
1. `HUB`
2. `DEL ETA`
3. `POD FIRMS`
4. `P/Up FIRMS`
5. `Agent`

## Mandatory Display Fields
When rendering the arrival notice summary card, you MUST display only these operational fields:
- `VVD` (Vessel/Voyage/Direction)
- `B/L No.`
- `D/T` (Delivery Term)
- `CNTR Type`
- `DEL` (Place of Delivery)
- `POD ETA`
- `Available Date`
- `Last Free Date`
- `P/Up CY/CFS` (Container Yard / Station)
- `Return CY` (Empty Return Yard)
- `Form Type`
- `Remark`

## UI Layout Rules
Organize the page into three main sections:
1. **Header Navigation:** B/L Search Input, Status Badge (`Pending Review`), and `View in OPUS` deep-link action button.
2. **Left Panel (Customer & Contacts):** B/L Customer Name, Address, Matched MDM Code, AI Confidence Score Badge, Email & Fax recipients.
3. **Right Panel (Schedule & Execution):** Schedule Card with mandatory fields, Remark input area, and primary `Approve & Send Arrival Notice` button.
