# Rule 04: Mock Data & State Management

## TypeScript Interface (`types/arrival-notice.ts`)

```typescript
export interface ArrivalNoticeRecord {
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
  status: 'PENDING' | 'APPROVED' | 'DISPATCHED';
}
```
