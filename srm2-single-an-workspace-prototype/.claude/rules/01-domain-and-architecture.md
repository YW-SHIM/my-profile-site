# Rule 01: Domain-Driven Design & Bounded Context

## Bounded Context: Shipment Release & Arrival Notification
- **Aggregate Root:** `BookingRecord` / `ArrivalNotice`
- **Entities:** `ConsigneeContact`, `VesselSchedule`, `ShipperInfo`, `CargoInfo`, `CustomsReference`
- **Value Objects:** `ConfidenceScore`, `FreeDateRange`, `DeliveryTerm`, `BookingStatus`, `VVD`

## System Architecture

### 1. List View (Dashboard)
- **Purpose:** Overview of all bookings with filtering and search
- **Data Flow:** 
  - Fetch booking list from backend (with pagination)
  - Apply filters (Date Type, Date Period, Status, Cargo Nature)
  - Display results in sortable table
  - Support bulk operations via checkboxes

### 2. Detail View (Single B/L Review & Approval)
- **Purpose:** Full shipment details for individual B/L approval
- **Data Flow:**
  - Load single booking details
  - Display shipper/consignee information
  - Show schedule and delivery information
  - Calculate and display AI confidence score
  - Enable approval workflow

### 3. Approval Workflow (Stateless Pattern)
```
User clicks "Approve & Send Arrival Notice"
  ↓
Status: Pending Review → Sending... (UI feedback)
  ↓
Backend API call: POST /api/bookings/{id}/approve
  ↓
Kafka CDC Event published (real-time data sync)
  ↓
Status: Dispatched (Success message)
  ↓
Return to list view with updated status
```

## Core Principles
1. **Task-Oriented UI:** The frontend must replace multi-screen toggling across legacy OPUS screens (`ESM_BKG_1054`, `ESM_BKG_0240`, `ESM_BKG_0672`, `ESM_BKG_0381`).

2. **Phase 1 Scope (Core Base) - TWO VIEWS:**
   
   **A. List View (Shipment Overview Dashboard)**
   - Display all bookings in organized table format
   - Support filtering by Date Type, Date Period, Booking Status, Cargo Nature
   - Enable search by Booking No., VVD, POD, POL
   - Show status indicators for quick visual scanning
   - Allow bulk selection via checkboxes
   - Pagination for large datasets
   - Quick action icons (view details, download, etc.)
   
   **B. Detail View (Single B/L Approval)**
   - Consolidate shipper/consignee information
   - Display complete schedule (VVD, POD ETA, Available Date, Last Free Date, etc.)
   - Show AI confidence badge for customer code validation
   - Provide remark input for approval notes
   - Display 1-Click Action Button: `Approve & Send Arrival Notice`
   - Show status progression (Pending → Sending → Dispatched)

3. **User Journey:**
   - Start in List View (dashboard with filters)
   - Click booking row to enter Detail View
   - Review shipment details and AI suggestions
   - Click "Approve & Send Arrival Notice"
   - Observe status change and Kafka event (console log)
   - Return to List View with updated status

4. **Field Organization by Context:**
   - **List View**: Show essential columns only (Booking No., SHPR, CNEE, VVD, Dates, Status)
   - **Detail View**: Show all operational details (Schedule, Delivery, Customs Info)
   - **Excluded Fields**: HUB, DEL ETA, POD FIRMS, P/Up FIRMS, Agent (per SRM2 strategy)

## Data Domain Model

```
BookingRecord
├── Identity
│   ├── bookingNo (unique identifier)
│   ├── vvd (Vessel/Voyage/Direction)
│   └── blNo (Bill of Lading number)
├── Shipper
│   ├── shipperCode
│   ├── shipperName
│   └── shipperAddress
├── Consignee
│   ├── consigneeName
│   ├── consigneeAddress
│   └── notifyContact
├── Schedule
│   ├── sailDate (departure)
│   ├── etaDate (arrival)
│   ├── availableDate (container availability)
│   └── lastFreeDate (pickup deadline)
├── Cargo
│   ├── cargoNature
│   ├── containerType
│   ├── volume
│   └── weight
├── Delivery
│   ├── pod (Port of Discharge)
│   ├── del (Place of Delivery)
│   ├── cyYard (Container Yard)
│   └── returnYard
└── Approval
    ├── status (Pending, Sending, Dispatched, Archived)
    ├── confidenceScore (AI validation confidence)
    ├── matchStatus (Matched, AI_Suggested, Unmatched)
    └── timestamp (last updated)
