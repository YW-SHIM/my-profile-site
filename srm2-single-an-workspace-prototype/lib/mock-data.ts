import { ArrivalNoticeRecord } from '@/types/arrival-notice';

export const MOCK_ARRIVAL_NOTICES: ArrivalNoticeRecord[] = [
  {
    id: '1',
    // Shipment Identity
    bookingNo: 'SELBK3645303',
    blNo: 'MELG028183300',
    vvd: 'HODT0010E',
    tVvd: '1CLT0012W',
    arrivalVessel: 'ONE CLARA',

    // Port & Location
    pod: 'Shanghai Port',
    pol: 'Los Angeles',
    del: 'Shanghai',
    cyYard: 'SHICT',

    // Dates & Deadlines
    sailDate: '2026-05-20',
    podEta: '2026-06-16T04:00:00Z',
    etaPod: '2026-06-16T04:00:00Z',
    etaDel: '2026-06-16T03:00:00Z',
    availableDate: '2026-06-16T09:00:00Z',
    lastFreeDate: '2026-06-17T09:00:00Z',
    cyYardCutoff: '2026-06-17T09:00:00Z',
    erd: '2026-06-20',

    // Container & Cargo
    deliveryTerm: 'Y',
    cntrType: 'DG',
    volume: 'D2-1.00',
    cargoNature: 'General Cargo',
    formType: 'EDI',

    // Pickup & Return
    pickupYard: 'SHICT/CFS',
    fullCntrPickupCy: 'KRPUS14',
    returnYard: 'SHICT',
    emptyReturnCy: 'KRPUS10',

    // Shipper Information
    shipperCode: 'SE JUNG SHIPPING CO., LTD',
    shipperName: 'SE JUNG SHIPPING CO., LTD',
    shipperAddress: '123 Port Road, Shanghai, China',

    // Consignee & Customer
    consigneeName: 'Shanghai Trading Co., Ltd',
    consigneeAddress: '123 Zhongshan Road, Shanghai, China',
    customerNationality: 'CN',
    arrivalNotificationFlag: 'N',

    // Customer Code & Validation (Screen 1)
    customerCode: 'KR203915',
    codeName: 'AK FARM CO., LTD',
    codeAddress: '38-1, 3F, 932, YANGIAE-DAERO, SONGPA-GU, SEOUL, KOREA',
    suggestedCode: 'KR203915',
    verifiedCodeForAN: 'KR203915',
    matchStatus: 'Matched',
    confidenceScore: 98,
    evaluation: 'A',
    dataStatus: 'N',

    // Contact Information (Screen 4)
    contactEmail: 'customs@shanghatrading.com',
    contactFax: '+86-21-5000-0000',
    consigneeEmail: 'ywshin@gm.com',
    consigneeEmail2: 'pohl@hyundaicorp.com',
    broker1: 'HB CORPORATION',
    broker2: 'WORLD BEST LOGISTICS',
    oneTimeOnly: false,

    // Order & Reference Numbers
    purchaseOrderNo: 'PO-2026-001',
    shipmentControlNo: 'SC-SH-001',

    // Notification & Status
    anSent: 'NO',
    yesNoDecision: 'Y',
    reviseFlag: false,
    type: 'CNEE',

    // Common
    remark: 'Urgent shipment - fragile goods',
    status: 'PENDING',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    // Shipment Identity
    bookingNo: 'SELBK3645304',
    blNo: 'SHAGP4762900',
    vvd: 'HODT0010E',
    tVvd: '1CLT0012W',
    arrivalVessel: 'ONE CLARA',

    // Port & Location
    pod: 'Ningbo Port',
    pol: 'Los Angeles',
    del: 'Ningbo',
    cyYard: 'NBCT',

    // Dates & Deadlines
    sailDate: '2026-05-20',
    podEta: '2026-06-16T04:00:00Z',
    etaPod: '2026-06-16T04:00:00Z',
    etaDel: '2026-06-16T03:00:00Z',
    availableDate: '2026-06-16T09:00:00Z',
    lastFreeDate: '2026-06-17T09:00:00Z',
    cyYardCutoff: '2026-06-17T09:00:00Z',
    erd: '2026-06-20',

    // Container & Cargo
    deliveryTerm: 'Y',
    cntrType: 'DR',
    volume: 'D2-1.00',
    cargoNature: 'Electronics',
    formType: 'EDI',

    // Pickup & Return
    pickupYard: 'NBCT',
    fullCntrPickupCy: 'KRPUS14',
    returnYard: 'NBCT',
    emptyReturnCy: 'KRPUS10',

    // Shipper Information
    shipperCode: 'SE JUNG SHIPPING CO., LTD',
    shipperName: 'SE JUNG SHIPPING CO., LTD',
    shipperAddress: '456 Harbor Road, Ningbo, China',

    // Consignee & Customer
    consigneeName: 'ANGJRHN ENTERPRISE LTD',
    consigneeAddress: '456 Qiaogang Road, Ningbo, China',
    customerNationality: 'CN',
    arrivalNotificationFlag: 'N',

    // Customer Code & Validation (Screen 1)
    customerCode: 'KR',
    codeName: 'BLUE WATER SHIPPING KOREA',
    codeAddress: '5TH FL, BEONGIL, DONGNAE-GU, BUSAN, SOUTH KOREA',
    suggestedCode: 'KR500071',
    verifiedCodeForAN: 'KR500071',
    matchStatus: 'AI_Suggested',
    confidenceScore: 87,
    evaluation: 'A',
    dataStatus: 'N',

    // Contact Information (Screen 4)
    contactEmail: 'logistics@nbelectronics.com',
    contactFax: '+86-574-8888-0000',
    consigneeEmail: 'pohl@hyundaicorp.com',
    consigneeEmail2: 'peter.kim@woojin.com',
    broker1: 'HYUNDAI NAVIS',
    broker2: 'DHL GLOBAL FORWARDING',
    oneTimeOnly: false,

    // Order & Reference Numbers
    purchaseOrderNo: 'PO-2026-002',
    shipmentControlNo: 'SC-NB-002',

    // Notification & Status
    anSent: 'NO',
    yesNoDecision: 'Y',
    reviseFlag: false,
    type: 'NTFY',

    // Common
    remark: 'Electronics - requires careful handling',
    status: 'PENDING',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '3',
    // Shipment Identity
    bookingNo: 'SELG23590801',
    blNo: 'MVDG911312500',
    vvd: 'SEQT2618E',
    tVvd: '1CLT0012W',
    arrivalVessel: 'ONE CLARA',

    // Port & Location
    pod: 'Xiamen Port',
    pol: 'Los Angeles',
    del: 'Xiamen',
    cyYard: 'XIAMEN CY',

    // Dates & Deadlines
    sailDate: '2026-05-18',
    podEta: '2026-06-13T14:00:00Z',
    etaPod: '2026-06-16T04:00:00Z',
    etaDel: '2026-06-16T03:00:00Z',
    availableDate: '2026-06-16T09:00:00Z',
    lastFreeDate: '2026-06-17T09:00:00Z',
    cyYardCutoff: '2026-06-17T09:00:00Z',
    erd: '2026-06-20',

    // Container & Cargo
    deliveryTerm: 'Y',
    cntrType: 'DR',
    volume: 'D5-1.00',
    cargoNature: 'General Cargo',
    formType: 'Paper',

    // Pickup & Return
    pickupYard: 'XIAMEN CY',
    fullCntrPickupCy: 'KRPUS14',
    returnYard: 'XIAMEN CY',
    emptyReturnCy: 'KRPUS10',

    // Shipper Information
    shipperCode: 'UNICO TRADE CO LTD',
    shipperName: 'UNICO TRADE CO LTD',
    shipperAddress: '789 Trade Center, Xiamen, China',

    // Consignee & Customer
    consigneeName: 'OCEAN NETWORK EXPRESS - KOREA CO., LTD - SEOUL',
    consigneeAddress: '789 Lujiang Road, Xiamen, China',
    customerNationality: 'CN',
    arrivalNotificationFlag: 'N',

    // Customer Code & Validation (Screen 1)
    customerCode: 'KR',
    codeName: 'CMF CO. LTD',
    codeAddress: '217, Jeonpo-daero, Busanjin-gu, Busan, Republic of Korea',
    suggestedCode: 'KR101149',
    verifiedCodeForAN: 'KR101149',
    matchStatus: 'Unmatched',
    confidenceScore: 65,
    evaluation: 'N',
    dataStatus: 'N',

    // Contact Information (Screen 4)
    contactEmail: 'info@xiamentrading.com',
    contactFax: '+86-592-5555-0000',
    consigneeEmail: 'peter.kim@woojin.com',
    consigneeEmail2: 'jennifer@trimcompany.com',
    broker1: 'CARGO STAR',
    broker2: 'KINTETSU WORLD EXPR',
    oneTimeOnly: true,

    // Order & Reference Numbers
    purchaseOrderNo: 'PO-2026-003',
    shipmentControlNo: 'SC-XM-003',

    // Notification & Status
    anSent: 'NO',
    yesNoDecision: 'N',
    reviseFlag: true,
    type: 'CNEE',

    // Common
    remark: 'Standard shipment - requires code validation',
    status: 'PENDING',
    lastUpdated: new Date().toISOString(),
  },
];

export const getMockRecordByBlNo = (blNo: string): ArrivalNoticeRecord | undefined => {
  return MOCK_ARRIVAL_NOTICES.find((r) => r.blNo === blNo);
};

export const getAllMockRecords = (): ArrivalNoticeRecord[] => {
  return MOCK_ARRIVAL_NOTICES;
};
