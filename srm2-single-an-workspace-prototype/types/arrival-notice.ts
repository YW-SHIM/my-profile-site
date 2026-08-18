export const CARGO_NATURE_OPTIONS = ['General', 'Hazardous', 'Reefer', 'Perishable', 'Live Animal', 'Out of Gauge'] as const;

export interface ArrivalNoticeRecord {
  id: string;

  // Shipment Identity (Core)
  bookingNo: string;
  blNo: string;
  vvd: string;
  tVvd?: string;
  arrivalVessel?: string;

  // Port & Location
  pod?: string;
  pol?: string;
  del: string;
  cyYard?: string;

  // Dates & Deadlines
  sailDate?: string;
  podEta: string;
  etaPod?: string;
  etaDel?: string;
  availableDate: string;
  lastFreeDate: string;
  cyYardCutoff?: string;
  erd?: string;

  // Container & Cargo
  deliveryTerm: string;
  cntrType: string;
  volume?: string;
  cargoNature?: string;
  formType: string;

  // Pickup & Return
  pickupYard: string;
  fullCntrPickupCy?: string;
  returnYard: string;
  emptyReturnCy?: string;

  // Shipper Information
  shipperCode?: string;
  shipperName: string;
  shipperAddress?: string;

  // Consignee & Customer
  consigneeName: string;
  consigneeAddress?: string;
  customerNationality?: string;
  arrivalNotificationFlag?: string;

  // Customer Code & Validation (Screen 1)
  customerCode: string;
  codeName?: string;
  codeAddress?: string;
  suggestedCode?: string;
  verifiedCodeForAN?: string;
  matchStatus: 'Matched' | 'Unmatched' | 'AI_Suggested';
  confidenceScore: number;
  evaluation?: 'A' | 'N';
  dataStatus?: string;

  // Contact Information (Screen 4)
  contactEmail: string;
  contactFax: string;
  consigneeEmail2?: string;
  consigneeFax2?: string;
  broker1Email?: string;
  broker1Fax?: string;
  broker2Email?: string;
  broker2Fax?: string;
  oneTimeOnly?: boolean;

  // Order & Reference Numbers
  purchaseOrderNo?: string;
  shipmentControlNo?: string;

  // Customs & Inspection (NEW)
  customsSeq?: string;
  importManifestNo?: string;
  agent?: string;

  // Notification & Status
  anSent?: 'YES' | 'NO';
  yesNoDecision?: 'Y' | 'N';
  reviseFlag?: boolean;
  chgFlag?: boolean;
  type?: 'CNEE' | 'NTFY';
  language?: string;

  // Common
  remark: string;
  status: 'PENDING' | 'SENDING' | 'DISPATCHED' | 'ARCHIVED';
  lastUpdated: string;
}

export interface ConfidenceBadgeProps {
  score: number;
  matchStatus: ArrivalNoticeRecord['matchStatus'];
}

export interface KafkaEvent {
  eventType: 'APPROVAL' | 'DISPATCH' | 'ARCHIVE';
  blNo: string;
  timestamp: string;
  payload: Partial<ArrivalNoticeRecord>;
}
