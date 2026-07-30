export interface ArrivalNoticeRecord {
  id: string;
  bookingNo: string;
  vvd: string;
  tVvd?: string;
  blNo: string;
  shipperCode: string;
  shipperName: string;
  shipperAddress: string;
  consigneeName: string;
  consigneeAddress: string;
  deliveryTerm: string;
  cntrType: string;
  del: string;
  pod?: string;
  pol?: string;
  podEta: string;
  sailDate?: string;
  availableDate: string;
  lastFreeDate: string;
  cyYard: string;
  pickupYard: string;
  returnYard: string;
  formType: string;
  volume?: string;
  cargoNature?: string;
  remark: string;
  customerCode: string;
  customerName: string;
  customerAddress: string;
  matchStatus: 'Matched' | 'Unmatched' | 'AI_Suggested';
  confidenceScore: number;
  suggestedCode?: string;
  contactEmail: string;
  contactFax: string;
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
