# Rule 02: UI/UX & Data Field Specifications

## Strict Field Exclusions (MANDATE)
Do NOT render the following 5 legacy fields on the Single A/N Workspace:
1. `HUB`
2. `DEL ETA`
3. `POD FIRMS`
4. `P/Up FIRMS`
5. `Agent`

## Mandatory Display Fields - Table/List View
When rendering the B/L list in table format, display these columns in order:
- `Issue` (Checkbox + Icon for actions)
- `Booking No.` (Linked to detail page)
- `SHPR Code` (Shipper Code)
- `SHPR` (Shipper Name)
- `CNEE` (Consignee Name)
- `T/VVD` (Vessel/Voyage/Direction)
- `1st VVD` (First VVD Sequence)
- `Sail Date 1st VVD` (Departure Date)
- `CY Cut Off` (Container Yard Cut-off Date)
- `ERD` (Estimated Release Date)
- `Vol` (Volume/Quantity)
- `Status Indicator` (Color-coded status)

## Detail View Fields
When entering detail/approval view for a single B/L, display:
- **Customer Section:** Shipper Name, Consignee Name, Consignee Address
- **Schedule Section:**
  - `B/L No.` (Master identifier)
  - `VVD` (Vessel/Voyage/Direction)
  - `T/VVD` (Vessel/Voyage/Direction with sequence)
  - `POD` (Port of Discharge)
  - `CNEE` (Consignee/Notify Contact)
  - `1st VVD` (First movement vessel)
  - `Sail Date` (Departure Date)
  - `CY Cut Off` (Container Yard Cut-off)
  - `ERD` (Estimated Release Date)
  - `Remark` (Additional notes)

## UI Layout Rules (Enhanced)

### 1. **Top Navigation Bar**
   - Logo/Brand (ONE CHORUS TEST)
   - Breadcrumb navigation: `Booking Management > Shipment Overview`
   - Top-right: User profile, Notifications, Settings

### 2. **Left Sidebar Menu**
   - Primary navigation to different modules
   - `Shipment Overview` (active state)
   - Collapsible sections for related features
   - Icons for visual hierarchy

### 3. **Main Content Area - Filter & Controls**
   - **Filter Section:** Date Type, Date Period, Booking Status (with multiple tags), Cargo Nature
   - **Search Controls:** Booking No., VVD, POD, POL search fields
   - **Action Buttons:** More Filters, Saved Filters, Reset, Search (primary pink/magenta button)

### 4. **Table View (List of B/Ls)**
   - Sortable column headers (indicated by sort icons)
   - Checkboxes for bulk selection
   - Inline action icons (document, link icons)
   - Color-coded status indicators in rightmost column
   - Pagination controls (Show X items, Page indicator, Next/Prev arrows)

### 5. **Detail View (When B/L Selected)**
   - **Top Section:** B/L Summary card with key identifiers
   - **Middle Section:** Schedule & Execution details (organized in grid or card layout)
   - **Bottom Section:** Remark textarea and primary action button (`Approve & Send Arrival Notice`)
   - **Right Panel (Optional):** AI Confidence Score Badge, Quick actions

## Color & Status Coding
- **Pink/Magenta**: Primary brand color (header, primary buttons)
- **Green badge**: High confidence score (>95%)
- **Yellow/Orange badge**: Medium confidence (70-95%)
- **Red badge**: Low confidence or requires action (<70%)
- **Blue badges**: Informational tags (Waiting, Advanced, Cancelled, Memo flags)

## Responsive Behavior
- **Desktop:** Full 3-section layout with sidebar + main content + optional detail panel
- **Tablet:** Sidebar collapsible, table becomes scrollable
- **Mobile:** Stacked layout, table converts to card view
