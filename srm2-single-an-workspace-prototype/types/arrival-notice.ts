export interface ArrivalNoticeRecord {
  id: string;
  vvd: string;
  blNo: string;
  deliveryTerm: string;
  cntrType: string;
  del: string;
  podEta: string;
  availableDate: string;
  lastFreeDate: string;
  pickupYard: string;
  returnYard: string;
  formType: string;
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
