import { ArrivalNoticeRecord } from '@/types/arrival-notice';

type VvdKey = 'ITYT0009E' | 'HODT0010E' | 'SEQT2618E';

const VVD_SCHEDULE: Record<
  VvdKey,
  Pick<
    ArrivalNoticeRecord,
    'cntrType' | 'podEta' | 'etaDel' | 'availableDate' | 'lastFreeDate' | 'pickupYard' | 'returnYard' | 'formType' | 'agent'
  >
> = {
  ITYT0009E: {
    cntrType: 'DR',
    podEta: '2026-08-05T02:00:00Z',
    etaDel: '2026-08-11T01:00:00Z',
    availableDate: '2026-08-11T07:00:00Z',
    lastFreeDate: '2026-08-12T07:00:00Z',
    pickupYard: 'KRPUS14',
    returnYard: 'KRPUS10',
    formType: 'General',
    agent: '*',
  },
  HODT0010E: {
    cntrType: 'RF',
    podEta: '2026-08-06T13:00:00Z',
    etaDel: '2026-08-11T13:00:00Z',
    availableDate: '2026-08-11T19:00:00Z',
    lastFreeDate: '2026-08-12T19:00:00Z',
    pickupYard: 'KRPUS14',
    returnYard: 'KRPUS10',
    formType: 'General',
    agent: '*',
  },
  SEQT2618E: {
    cntrType: 'RF',
    podEta: '2026-08-11T06:30:00Z',
    etaDel: '2026-08-11T05:30:00Z',
    availableDate: '2026-08-11T11:00:00Z',
    lastFreeDate: '2026-08-13T07:00:00Z',
    pickupYard: 'KRPUS14',
    returnYard: 'KRPUS10',
    formType: 'General',
    agent: '*',
  },
};

interface RowSeed {
  seq: number;
  vvd: VvdKey;
  blNo: string;
  tp: 'C' | 'N';
  customerCode: string;
  consigneeName: string;
  missingManifest?: boolean;
}

// Section 4 "B/L Grid" 16개 레코드 — 와이어프레임 이미지의 SEQ/BL NO/TP/CODE/CUSTOMER NAME 값을 그대로 재현
const ROW_SEEDS: RowSeed[] = [
  { seq: 1, vvd: 'ITYT0009E', blNo: 'AARF07890300', tp: 'C', customerCode: 'KR101163', consigneeName: 'SEJO INTERNATIONAL CO LTD' },
  { seq: 2, vvd: 'HODT0010E', blNo: 'AARF08090300', tp: 'C', customerCode: 'KR580883', consigneeName: 'HYUNDAI NAVIS' },
  { seq: 3, vvd: 'SEQT2618E', blNo: 'AARF08434500', tp: 'C', customerCode: 'KR102744', consigneeName: 'DSV AIR & SEA LTD.' },
  { seq: 4, vvd: 'ITYT0009E', blNo: 'ADLF02055990', tp: 'N', customerCode: 'KR112367', consigneeName: 'WORLDTRADING KOREA CO.,LTD.' },
  { seq: 5, vvd: 'HODT0010E', blNo: 'ADLG00115500', tp: 'C', customerCode: 'KR501451', consigneeName: 'SUNGWOO CORPORATION' },
  { seq: 6, vvd: 'SEQT2618E', blNo: 'ADLG00170600', tp: 'C', customerCode: 'KR103469', consigneeName: 'HIGHLAND FOODS CO., LTD' },
  { seq: 7, vvd: 'ITYT0009E', blNo: 'AKFL18543300', tp: 'C', customerCode: 'KR514603', consigneeName: 'KYOWA KOREA MARITIME AGENCY' },
  { seq: 8, vvd: 'HODT0010E', blNo: 'AKFL18836700', tp: 'C', customerCode: 'KR514603', consigneeName: 'KYOWA KOREA MARITIME AGENCY' },
  { seq: 9, vvd: 'SEQT2618E', blNo: 'AKFL20934600', tp: 'C', customerCode: 'KR505148', consigneeName: 'KFLOWER (KOREA FLORICULTURE)' },
  { seq: 10, vvd: 'ITYT0009E', blNo: 'AKFL20946900', tp: 'C', customerCode: 'KR111583', consigneeName: 'E-MART INC.' },
  { seq: 11, vvd: 'HODT0010E', blNo: 'AKFL21544400', tp: 'C', customerCode: 'KR580004', consigneeName: 'CR TRADE CO LTD' },
  { seq: 12, vvd: 'SEQT2618E', blNo: 'AKFL21544400', tp: 'N', customerCode: 'JP103781', consigneeName: 'TOMINAGA SHOJI CO LTD' },
  { seq: 13, vvd: 'ITYT0009E', blNo: 'AKFL21868600', tp: 'C', customerCode: 'KR206127', consigneeName: 'JASON PARK TRANS CO.,LTD.', missingManifest: true },
  { seq: 14, vvd: 'HODT0010E', blNo: 'AKFL22014400', tp: 'C', customerCode: 'KR508304', consigneeName: 'MAINFREIGHT KOREA LIMITED' },
  { seq: 15, vvd: 'SEQT2618E', blNo: 'AKLG00112400', tp: 'C', customerCode: 'KR103374', consigneeName: 'HANSOL PAPER CO., LTD' },
  { seq: 16, vvd: 'ITYT0009E', blNo: 'AKLG00133600', tp: 'C', customerCode: 'KR521838', consigneeName: 'NEW ZEALAND SALT CO, LTD' },
];

const BROKERS: [string, string][] = [
  ['HB CORPORATION', 'WORLD BEST LOGISTICS'],
  ['HYUNDAI NAVIS', 'DHL GLOBAL FORWARDING'],
  ['CARGO STAR', 'KINTETSU WORLD EXPRESS'],
];

const manifestPrefix = (vvd: VvdKey) => vvd.slice(0, 4);

export const MOCK_ARRIVAL_NOTICES: ArrivalNoticeRecord[] = ROW_SEEDS.map((seed, index) => {
  const schedule = VVD_SCHEDULE[seed.vvd];
  const [broker1, broker2] = BROKERS[index % BROKERS.length];
  const matchStatus: ArrivalNoticeRecord['matchStatus'] =
    seed.tp === 'N' ? 'AI_Suggested' : index % 5 === 4 ? 'Unmatched' : 'Matched';
  const confidenceScore =
    matchStatus === 'Matched' ? 96 + (index % 4) : matchStatus === 'AI_Suggested' ? 82 + (index % 6) : 60 + (index % 10);

  return {
    id: String(seed.seq),

    bookingNo: `SELBK${3645300 + seed.seq}`,
    blNo: seed.blNo,
    vvd: seed.vvd,
    tVvd: seed.vvd,
    arrivalVessel: 'ONE CLARA',

    pod: 'KRPUS',
    pol: 'Los Angeles',
    del: 'KRPUS',
    cyYard: schedule.pickupYard,

    sailDate: '2026-07-30',
    podEta: schedule.podEta,
    etaPod: schedule.podEta,
    etaDel: schedule.etaDel,
    availableDate: schedule.availableDate,
    lastFreeDate: schedule.lastFreeDate,
    cyYardCutoff: schedule.lastFreeDate,
    erd: '2026-08-12',

    deliveryTerm: 'CY/CY',
    cntrType: schedule.cntrType,
    volume: '1x20',
    cargoNature: 'General',
    formType: 'General',

    pickupYard: schedule.pickupYard,
    fullCntrPickupCy: schedule.pickupYard,
    returnYard: schedule.returnYard,
    emptyReturnCy: schedule.returnYard,

    shipperCode: seed.consigneeName,
    shipperName: seed.consigneeName,
    shipperAddress: 'Origin Address, Overseas',

    consigneeName: seed.consigneeName,
    consigneeAddress: 'KRPUS Bonded Area, Busan, Korea',
    customerNationality: seed.customerCode.startsWith('JP') ? 'JP' : 'KR',
    arrivalNotificationFlag: 'N',

    customerCode: seed.customerCode,
    codeName: seed.consigneeName,
    codeAddress: 'Busan, Korea',
    suggestedCode: seed.customerCode,
    verifiedCodeForAN: seed.customerCode,
    matchStatus,
    confidenceScore,
    evaluation: matchStatus === 'Unmatched' ? 'N' : 'A',
    dataStatus: 'N',

    contactEmail: `contact@${seed.blNo.toLowerCase()}.com`,
    contactFax: '+82-51-000-0000',
    consigneeEmail: `${seed.blNo.toLowerCase()}@cnee.com`,
    consigneeEmail2: `${seed.blNo.toLowerCase()}@ntfy.com`,
    broker1,
    broker2,
    oneTimeOnly: false,

    purchaseOrderNo: `PO-2026-${String(seed.seq).padStart(3, '0')}`,
    shipmentControlNo: `SC-KRPUS-${String(seed.seq).padStart(3, '0')}`,

    customsSeq: `${seed.vvd}/${seed.blNo}-001`,
    importManifestNo: seed.missingManifest ? undefined : `${manifestPrefix(seed.vvd)}${String(seed.seq).padStart(4, '0')}XX`,
    agent: schedule.agent,

    anSent: 'NO',
    yesNoDecision: 'Y',
    reviseFlag: false,
    chgFlag: false,
    type: seed.tp === 'C' ? 'CNEE' : 'NTFY',
    language: 'English',

    remark: '',
    status: 'PENDING',
    lastUpdated: new Date().toISOString(),
  };
});

export const getMockRecordByBlNo = (blNo: string): ArrivalNoticeRecord | undefined => {
  return MOCK_ARRIVAL_NOTICES.find((r) => r.blNo === blNo);
};

export const getAllMockRecords = (): ArrivalNoticeRecord[] => {
  return MOCK_ARRIVAL_NOTICES;
};
