# Rule 02: UI/UX & Data Field Specifications

## Strict Field Exclusions (MANDATE)
Do NOT render the following 5 legacy fields on the Single A/N Workspace:
1. `HUB` ❌
2. `DEL ETA` ❌
3. `POD FIRMS` ❌
4. `P/Up FIRMS` ❌
5. `Agent` ❌

## Consolidated Field Set from 5 Legacy AS-IS Screens

### Screen 1: ESM_BKG_1054 - Arrival Notice Code Validate
**Purpose:** Customer code validation with suggestion matching
**Key Fields:**
- Code (Customer Code)
- Code Name (Customer Name)
- Code Address
- Customer Information on B/L (Name, Address)
- Suggesting Code (AI Suggested Code)
- Code for A/N (Final Verified Code)
- Evaluation (Match Status)
- Type (CNEE / NTFY)
- B/L No. (Link to shipment)

**Buttons:** Retrieve, Down Excel, Save, A/N Setup, A/N Send

### Screen 2: ESM_BKG_0672-01 - Arrival Information (Container List)
**Purpose:** Container-level shipping details
**Key Fields:**
- VVD (Vessel/Voyage/Direction)
- B/L No.
- D/T (Delivery Term) - Y/N
- CNTR Type (Container Type)
- DEL (Place of Delivery)
- ~~HUB~~ (EXCLUDED)
- POD ETA
- ~~DEL ETA~~ (EXCLUDED)
- Available Date
- Last Free Date (to Pick Up)
- POD FIRMS (Port Delivery Firms) ~~(EXCLUDED)~~
- P/Up CY/CFS (Pickup Location)
- P/Up FIRMS ~~(EXCLUDED)~~
- Return CY (Return Container Yard)
- Form (Form Type)
- ~~Agent~~ (EXCLUDED)
- Remark

**Buttons:** Retrieve, Down Excel, Save, Code Validate, Template, A/N Send, Close

### Screen 3: ESM_BKG_0672-01 - Arrival Info. Setting (Modal/Popup)
**Purpose:** Configure arrival information for single shipment
**Key Fields (Editable):**
- Arrival Vessel (Vessel Name)
- VVD (dropdown selection)
- ETA POD (Estimated Time of Arrival at POD)
- ETA DEL (Estimated Time of Arrival at DEL)
- Available Date
- Last Free Date to Pick Up
- Full CNTR P/Up CY (Container Pickup Container Yard)
- Empty Return CY (Empty Container Return Yard)
- A/N Form Type (dropdown)
- ~~Agent~~ (EXCLUDED)
- Revise (Checkbox)
- Remark (Textarea)

**Buttons:** Setup Arrival Info., Close

### Screen 4: ESM_BKG_0240-01 - Customer Information (Contact Details)
**Purpose:** Customer and contact information management
**Key Fields:**
- B/L No.
- C/N (Customer Nationality)
- A.NF (Arrival Notification Flag)
- S/C No. (Shipment Control Number)
- DEL (Place of Delivery)
- Eval. (Evaluation)
- Data (Data Status)
- Customer Code
- Customer Name (B/L)
- Customer Address (B/L)
- CNEE/ENTFY IN B/L (Consignee/Notify in B/L)
- CNEE/ENTFY (Consignee/Notify Email)
- CNEE/ENTFY #2 (Alternative Consignee Email)
- Fax
- BROKER #1 (Primary Broker)
- BROKER #2 (Secondary Broker)
- One Time Only (Checkbox)
- CNEE/ENTFY IN B/L (Email)

**Buttons:** Set Data, Customer& Info., Multi-Contact, Master Data

**Tabs:** Arrival Data | Customer | Upload & Match

### Screen 5: ESM_BKG_0381 - Arrival Notice Send
**Purpose:** Send arrival notice to stakeholders
**Key Fields:**
- VVD (Vessel/Voyage/Direction)
- POD ETA, POL, DEL
- Customer Code, Customer Name
- P/O No. (Purchase Order Number)
- TP (Transport Provider/Type)
- B/L No.

**Notification Channels:**
- Fax
- E-Mail
- EDI for Customer
- EDI for ONEPORT

**Recipient Table Columns:**
- Seq. (Sequence)
- Sel. (Selection checkbox)
- Chg (Change flag)
- Show PU# (Show Pickup number)
- B/L No.
- TP (Transport Provider)
- Code (Customer Code)
- Customer Name
- A/N Sent (Status - YES/NO)
- CNEE/ENTFY (Consignee Notify)
- CNEE/ENTFY #2 (Alternative Contact)
- BROKER #1, #2 (Broker Contacts)
- One Time Only (Checkbox)
- Y/N (Yes/No Decision)
- Doc (Document Type)
- Remark

**Buttons:** Retrieve, Down Excel, Preview, Print, Template, A/N Setup, History, Close

**Grouping:** Grouping by Code, Multi-Contact

---

## Consolidated Master Field List (FOR UNIFIED WORKSPACE)

### 1. Core Shipment Identity
- `Booking No.` (FROM: TO-BE Design)
- `B/L No.` (FROM: All screens)
- `VVD` (FROM: All screens)
- `T/VVD` (FROM: TO-BE Design)
- `Vessel Name` (FROM: Screen 3)

### 2. Port & Location
- `POD` (Port of Discharge) (FROM: Screen 5)
- `POL` (Port of Loading) (FROM: Screen 5)
- `DEL` (Place of Delivery) (FROM: Screens 2, 4)
- `POD ETA` (FROM: All screens)
- ~~`DEL ETA`~~ (EXCLUDED per mandate)
- `CY Cut Off` (Container Yard Cutoff) (FROM: TO-BE Design)
- `ERD` (Estimated Release Date) (FROM: TO-BE Design)

### 3. Container & Cargo
- `D/T` (Delivery Term - Y/N) (FROM: Screen 2)
- `CNTR Type` (Container Type) (FROM: Screen 2)
- `Volume` (FROM: TO-BE Design)
- `Cargo Nature` (FROM: TO-BE Design)
- `Form` (Form Type) (FROM: Screen 2)

### 4. Dates & Deadlines
- `Sail Date` (FROM: TO-BE Design)
- `Available Date` (FROM: Screen 2)
- `Last Free Date` (FROM: Screen 2)
- `ETA POD` (Estimated Time Arrival POD) (FROM: Screen 3)
- `ETA DEL` (Estimated Time Arrival DEL) (FROM: Screen 3)

### 5. Pickup & Return
- `P/Up CY/CFS` (Pickup Container Yard / Container Freight Station) (FROM: Screen 2)
- `Full CNTR P/Up CY` (FROM: Screen 3)
- `Return CY` (Return Container Yard) (FROM: Screen 2)
- `Empty Return CY` (FROM: Screen 3)

### 6. Shipper Information
- `SHPR Code` (Shipper Code) (FROM: TO-BE Design)
- `SHPR Name` (Shipper Name) (FROM: TO-BE Design)
- `SHPR Address` (FROM: Screen 2)

### 7. Consignee & Customer
- `CNEE` (Consignee Name) (FROM: All screens)
- `CNEE Address` (Consignee Address) (FROM: Screens 2, 4)
- `C/N` (Customer Nationality) (FROM: Screen 4)
- `A.NF` (Arrival Notification Flag) (FROM: Screen 4)

### 8. Customer Code & Validation
- `Customer Code` (FROM: Screens 1, 4)
- `Code Name` (Customer Name from Code) (FROM: Screen 1)
- `Code Address` (FROM: Screen 1)
- `Suggesting Code` (AI Suggested Code) (FROM: Screen 1)
- `Code for A/N` (Verified Customer Code for A/N) (FROM: Screen 1)
- `Evaluation` (Match Status) (FROM: Screen 1)
- `Eval.` (Evaluation Flag) (FROM: Screen 4)
- `Data` (Data Status) (FROM: Screen 4)

### 9. Contact Information
- `CNEE/ENTFY` (Consignee Email) (FROM: Screen 4)
- `CNEE/ENTFY #2` (Alternative Contact Email) (FROM: Screen 4)
- `Fax` (FAX Number) (FROM: Screen 4)
- `BROKER #1` (Primary Broker) (FROM: Screen 4)
- `BROKER #2` (Secondary Broker) (FROM: Screen 4)
- `One Time Only` (Flag) (FROM: Screen 4)

### 10. Order/Reference Numbers
- `P/O No.` (Purchase Order Number) (FROM: Screen 5)
- `S/C No.` (Shipment Control Number) (FROM: Screen 4)

### 11. Document & Status
- `Type` (CNEE / NTFY) (FROM: Screen 1)
- `A/N Sent` (Arrival Notice Sent Status) (FROM: Screen 5)
- `Y/N` (Yes/No Decision) (FROM: Screen 5)
- `Revise` (Revision Flag) (FROM: Screen 3)

### 12. Additional
- `Remark` (FROM: All screens)
- `Grouping by Code` (FROM: Screen 5)

---

## UI Layout Rules (Complete Multi-Screen Consolidation)

### 1. **Top Navigation Bar**
   - Logo/Brand (ONE CHORUS TEST)
   - Screen Title: "Arrival Notice: Unified Workspace"
   - Breadcrumb: `Booking Management > Shipment Overview > Arrival Notice`
   - Top-right: User profile, Notifications, Settings

### 2. **Quick Controls Bar (Filter Section)**
   - **Date Selection:** 
     - Date Type: POD ETA (radio button)
     - Date Range: From YYYY-MM-DD to YYYY-MM-DD (calendar picker)
   - **Basic Search:**
     - VVD (text input)
     - POD (dropdown)
     - T/S (checkbox)
     - DEL (text input)
     - POL (text input)
     - B/L No. (text input)
   - **Evaluation Status:** Dropdown (All / Evaluated / Unmatched)
   - **Action Buttons:** Retrieve, Reset, Search

### 3. **Main List View (Consolidated Table)**
   - **Columns (in order):**
     1. Seq. (Sequence)
     2. Sel. (Checkbox for multi-select)
     3. Chg (Change indicator)
     4. B/L No. (linked)
     5. C/N, A.NF (Customer flags)
     6. S/C No.
     7. DEL (Place of Delivery)
     8. Eval. (Evaluation status)
     9. Data (Data status)
     10. Customer Code
     11. Customer Name
     12. CNEE/ENTFY (Primary contact)
     13. CNEE/ENTFY #2 (Secondary contact)
     14. Fax
     15. BROKER #1
     16. BROKER #2
     17. One Time Only
     18. Remark
   - **Row Actions:** 
     - Click row to open Detail view
     - Icons for: View, Edit, Copy

### 4. **Tabbed Interface (Context-Aware)**
   - **Tab 1: Arrival Data**
     - Container-level shipment details (ESM_BKG_0672)
     - VVD, D/T, CNTR Type, DEL, POD ETA, Available Date, etc.
   - **Tab 2: Customer**
     - Contact & customer information (ESM_BKG_0240)
     - CNEE, CNEE Email, Fax, Broker info, etc.
   - **Tab 3: Upload & Match**
     - Code validation & matching (ESM_BKG_1054)
     - Code Name, Code Address, Suggesting Code, etc.

### 5. **Detail View - Modal/Sidebar**
When user clicks "Setup Arrival Info." or row detail:
   - **Section 1: Shipment Identity**
     - B/L No., VVD, POD, DEL
   - **Section 2: Vessel Details**
     - Arrival Vessel, ETA POD, ETA DEL, Available Date
   - **Section 3: Pickup & Return**
     - Full CNTR P/Up CY, Empty Return CY
   - **Section 4: Document**
     - A/N Form Type, Revise checkbox, Remark textarea
   - **Section 5: Code Validation** (if applicable)
     - Suggested Code with confidence badge
     - Code for A/N (verified)
   - **Buttons:** 
     - Setup Arrival Info. (Save)
     - Close

### 6. **Action Buttons (Toolbar)**

#### Top-Right Primary Buttons
- `Retrieve` - Fetch latest data
- `Down Excel` - Export to Excel
- `Save` - Save changes
- `Code Validate` - Validate customer codes
- `Template` - Load template
- `A/N Setup` - Setup arrival info (modal)
- `A/N Send` - Send arrival notice to recipients
- `Close` - Exit screen

#### Notification Buttons (For A/N Send Screen)
- Fax (Channel selector)
- E-Mail (Channel selector)
- EDI for Customer (Channel selector)
- EDI for ONEPORT (Channel selector)

#### Bottom Buttons (Multi-Contact Management)
- `Set Data` - Configure data
- `Customer& Info.` - View customer details
- `Multi-Contact` - Manage multiple contacts
- `Master Data` - Manage master data

---

## Contact & Notification Management

### Multiple Contact Support
- CNEE/ENTFY (Primary Consignee/Notify)
- CNEE/ENTFY #2 (Secondary Consignee/Notify)
- BROKER #1 (Primary Broker)
- BROKER #2 (Secondary Broker)
- Fax (FAX contact)
- One Time Only (Single-instance flag)

### Notification Channels
1. **Fax** - Send via FAX
2. **E-Mail** - Send via Email
3. **EDI for Customer** - EDI format for customer system
4. **EDI for ONEPORT** - EDI format for ONEPORT system

---

## Status & Evaluation Coding

| Status | Type | Color | Meaning |
|--------|------|-------|---------|
| Matched | Code Validation | Green | Code validated & confirmed |
| Unmatched | Code Validation | Yellow | Code requires manual review |
| AI Suggested | Code Validation | Amber | AI suggested alternative |
| Evaluated | Data Status | Blue | Data reviewed & complete |
| Unmatched | Data Status | Red | Data incomplete or issues |
| A/N Sent | Notification | Green | Arrival notice sent |
| Not Sent | Notification | Gray | Awaiting send action |

---

## Data Field Mapping by AS-IS Screen

| Field | Screen 1 | Screen 2 | Screen 3 | Screen 4 | Screen 5 | Unified |
|-------|----------|----------|----------|----------|----------|---------|
| B/L No. | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| VVD | - | ✓ | ✓ | - | ✓ | ✓ |
| CNEE | ✓ | ✓ | - | ✓ | ✓ | ✓ |
| Code for A/N | ✓ | - | - | - | - | ✓ |
| DEL | - | ✓ | ✓ | ✓ | ✓ | ✓ |
| POD ETA | - | ✓ | ✓ | - | ✓ | ✓ |
| Form Type | - | ✓ | ✓ | - | - | ✓ |
| P/Up CY | - | ✓ | ✓ | - | - | ✓ |
| Return CY | - | ✓ | ✓ | - | - | ✓ |
| Email Contact | - | - | - | ✓ | ✓ | ✓ |
| A/N Sent | - | - | - | - | ✓ | ✓ |
| Remark | - | ✓ | ✓ | - | ✓ | ✓ |

---

## Color & Status Coding
- **Pink/Magenta (#D91E63)**: Primary brand color (header, primary action buttons)
- **Green (#4CAF50)**: Matched/Confirmed status
- **Yellow (#FFC107)**: Warning/Unmatched status
- **Red (#F44336)**: Error/Critical status
- **Blue (#2196F3)**: Informational/Tagged status
- **Gray (#9E9E9E)**: Inactive/Awaiting status

## Responsive Behavior
- **Desktop (1920px+):** Full layout with sidebar, filters, table, + detail panel
- **Tablet (768-1200px):** Collapsible sidebar, scrollable table, modal detail view
- **Mobile (<768px):** Stacked layout, card-based table, full-screen modals
