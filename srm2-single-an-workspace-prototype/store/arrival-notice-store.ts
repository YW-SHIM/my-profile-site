import { create } from 'zustand';
import { ArrivalNoticeRecord } from '@/types/arrival-notice';

interface ArrivalNoticeStore {
  records: ArrivalNoticeRecord[];
  archivedRecords: ArrivalNoticeRecord[];
  selectedRecord: ArrivalNoticeRecord | null;
  isApproving: boolean;
  approvalProgress: 'Pending' | 'Sending...' | 'Dispatched';

  // Actions
  setRecords: (records: ArrivalNoticeRecord[]) => void;
  selectRecord: (record: ArrivalNoticeRecord) => void;
  updateRemark: (remark: string) => void;
  approveAndSendArrivalNotice: () => Promise<void>;
  simulateKafkaCDCSync: (blNo: string) => Promise<void>;
  archiveRecord: (blNo: string) => void;
  openOpusScreen: (blNo: string) => void;
}

export const useArrivalNoticeStore = create<ArrivalNoticeStore>((set, get) => ({
  records: [],
  archivedRecords: [],
  selectedRecord: null,
  isApproving: false,
  approvalProgress: 'Pending',

  setRecords: (records) => set({ records }),

  selectRecord: (record) => set({ selectedRecord: record }),

  updateRemark: (remark) =>
    set((state) => ({
      selectedRecord: state.selectedRecord
        ? { ...state.selectedRecord, remark }
        : null,
    })),

  approveAndSendArrivalNotice: async () => {
    const { selectedRecord } = get();
    if (!selectedRecord) return;

    set({ isApproving: true, approvalProgress: 'Pending' });

    // Step 1: Update to "Sending..."
    set({ approvalProgress: 'Sending...' });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Step 2: Simulate Kafka CDC sync
    await get().simulateKafkaCDCSync(selectedRecord.blNo);
    set({ approvalProgress: 'Dispatched' });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Step 3: Update selected record status
    const updatedRecord = {
      ...selectedRecord,
      status: 'DISPATCHED' as const,
      lastUpdated: new Date().toISOString(),
    };
    set({ selectedRecord: updatedRecord });

    // Step 4: Remove from active records and archive
    await get().archiveRecord(selectedRecord.blNo);

    set({ isApproving: false, approvalProgress: 'Pending' });
  },

  simulateKafkaCDCSync: async (blNo: string) => {
    // Simulate Kafka event publishing (1-2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Log Kafka event
    const kafkaEvent = {
      eventType: 'APPROVAL' as const,
      blNo,
      timestamp: new Date().toISOString(),
      payload: {
        status: 'DISPATCHED' as const,
      },
    };

    console.log('[Kafka CDC Event]', kafkaEvent);
  },

  archiveRecord: (blNo: string) => {
    set((state) => {
      const recordToArchive = state.records.find((r) => r.blNo === blNo);
      if (!recordToArchive) return state;

      return {
        records: state.records.filter((r) => r.blNo !== blNo),
        archivedRecords: [
          ...state.archivedRecords,
          { ...recordToArchive, status: 'ARCHIVED' as const },
        ],
      };
    });
  },

  openOpusScreen: (blNo: string) => {
    const opusUrl = `https://opus.internal/esm_bkg_1054?bl_no=${encodeURIComponent(blNo)}`;
    console.log('[OPUS Screen] Opening:', opusUrl);
    // In a real app, this would open a new window or navigate to the OPUS screen
    // window.open(opusUrl, '_blank');
  },
}));
