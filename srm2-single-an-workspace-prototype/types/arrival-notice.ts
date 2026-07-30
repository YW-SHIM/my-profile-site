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
  consigneeEmail?: string;
  consigneeEmail2?: string;
  broker1?: string;
  broker2?: string;
  oneTimeOnly?: boolean;

  // Order & Reference Numbers
  purchaseOrderNo?: string;
  shipmentControlNo?: string;

  // Customs & Inspection (NEW)
  customsSeq?: string;

  // Notification & Status
  anSent?: 'YES' | 'NO';
  yesNoDecision?: 'Y' | 'N';
  reviseFlag?: boolean;
  type?: 'CNEE' | 'NTFY';

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
