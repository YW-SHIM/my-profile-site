import { create } from 'zustand';
import { ArrivalNoticeRecord } from '@/types/arrival-notice';

export const ADVANCED_FILTER_CHIPS = ['T/S', 'POL', 'Customer Code', 'DEL', 'Customer Name', 'S/C No'] as const;
export type AdvancedFilterChip = (typeof ADVANCED_FILTER_CHIPS)[number];

interface TargetFilters {
  selectedVvds: string[];
  podEtaFrom: string;
  podEtaTo: string;
  pod: string;
  blNoSearch: string;
  containerTypeFilter: 'All' | 'DR' | 'RF';
  customerTypeFilter: string;
  anStatusFilter: string;
  delFilter: string;
  activeAdvancedFilters: AdvancedFilterChip[];
}

const DEFAULT_FILTERS: TargetFilters = {
  selectedVvds: ['ITYT0009E', 'HODT0010E', 'SEQT2618E'],
  podEtaFrom: '2026-08-05',
  podEtaTo: '2026-08-11',
  pod: 'KRPUS',
  blNoSearch: '',
  containerTypeFilter: 'All',
  customerTypeFilter: 'All',
  anStatusFilter: 'All',
  delFilter: '',
  activeAdvancedFilters: ['DEL'],
};

interface ArrivalNoticeStore {
  records: ArrivalNoticeRecord[];
  filteredRecords: ArrivalNoticeRecord[];
  archivedRecords: ArrivalNoticeRecord[];
  selectedRecord: ArrivalNoticeRecord | null;
  selectedRecordIds: string[];
  isApproving: boolean;
  approvalProgress: 'Pending' | 'Sending...' | 'Dispatched';
  filters: TargetFilters;
  draftEdits: Record<string, Partial<ArrivalNoticeRecord>>;

  // Actions
  setRecords: (records: ArrivalNoticeRecord[]) => void;
  selectRecord: (record: ArrivalNoticeRecord) => void;
  toggleRecordSelection: (recordId: string) => void;
  toggleAllRecordSelection: () => void;
  clearSelection: () => void;
  updateRemark: (remark: string) => void;
  approveAndSendArrivalNotice: () => Promise<void>;
  approveAndMassSendArrivalNotices: () => Promise<void>;
  simulateKafkaCDCSync: (blNo: string) => Promise<void>;
  archiveRecord: (blNo: string) => void;
  openOpusScreen: (blNo: string) => void;

  // Section 1: Target selection filters
  addVvd: (vvd: string) => void;
  removeVvd: (vvd: string) => void;
  setFilter: <K extends keyof TargetFilters>(key: K, value: TargetFilters[K]) => void;
  toggleAdvancedFilter: (chip: AdvancedFilterChip) => void;
  resetFilters: () => void;
  retrieveRecords: () => void;

  // Section 2: Inline grid draft edits (Undo/Save)
  updateDraftEdit: <K extends keyof ArrivalNoticeRecord>(recordId: string, field: K, value: ArrivalNoticeRecord[K]) => void;
  undoGridEdits: () => void;
  saveGridEdits: () => void;
  toggleAllChgFlags: () => void;
}

const applyFilters = (records: ArrivalNoticeRecord[], filters: TargetFilters): ArrivalNoticeRecord[] => {
  return records.filter((r) => {
    if (filters.selectedVvds.length > 0 && !filters.selectedVvds.includes(r.vvd)) return false;
    if (filters.pod && r.pod !== filters.pod) return false;
    if (filters.blNoSearch && !r.blNo.toLowerCase().includes(filters.blNoSearch.toLowerCase())) return false;
    if (filters.containerTypeFilter !== 'All' && r.cntrType !== filters.containerTypeFilter) return false;
    if (filters.anStatusFilter !== 'All' && r.anSent !== filters.anStatusFilter) return false;
    if (filters.delFilter && r.del !== filters.delFilter) return false;
    return true;
  });
};

export const useArrivalNoticeStore = create<ArrivalNoticeStore>((set, get) => ({
  records: [],
  filteredRecords: [],
  archivedRecords: [],
  selectedRecord: null,
  selectedRecordIds: [],
  isApproving: false,
  approvalProgress: 'Pending',
  filters: DEFAULT_FILTERS,
  draftEdits: {},

  setRecords: (records) =>
    set((state) => ({ records, filteredRecords: applyFilters(records, state.filters) })),

  selectRecord: (record) => set({ selectedRecord: record }),

  toggleRecordSelection: (recordId) =>
    set((state) => {
      const newIds = state.selectedRecordIds.includes(recordId)
        ? state.selectedRecordIds.filter((id) => id !== recordId)
        : [...state.selectedRecordIds, recordId];
      return { selectedRecordIds: newIds };
    }),

  toggleAllRecordSelection: () =>
    set((state) => {
      const pendingRecords = state.records.filter((r) => r.status === 'PENDING');
      if (state.selectedRecordIds.length === pendingRecords.length) {
        return { selectedRecordIds: [] };
      }
      return { selectedRecordIds: pendingRecords.map((r) => r.id) };
    }),

  clearSelection: () => set({ selectedRecordIds: [] }),

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

  approveAndMassSendArrivalNotices: async () => {
    const { records, selectedRecordIds } = get();
    if (selectedRecordIds.length === 0) return;

    set({ isApproving: true, approvalProgress: 'Pending' });
    set({ approvalProgress: 'Sending...' });

    const recordsToProcess = records.filter((r) => selectedRecordIds.includes(r.id));
    const totalCount = recordsToProcess.length;

    for (let i = 0; i < recordsToProcess.length; i++) {
      const record = recordsToProcess[i];
      await get().simulateKafkaCDCSync(record.blNo);
      await new Promise((resolve) => setTimeout(resolve, 300));
      await get().archiveRecord(record.blNo);
    }

    set({ approvalProgress: 'Dispatched' });
    await new Promise((resolve) => setTimeout(resolve, 500));

    set({ selectedRecordIds: [], isApproving: false, approvalProgress: 'Pending' });

    console.log(`[Mass Approval] Successfully dispatched ${totalCount} Arrival Notices`);
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

  addVvd: (vvd) =>
    set((state) => ({
      filters: { ...state.filters, selectedVvds: [...new Set([...state.filters.selectedVvds, vvd])] },
    })),

  removeVvd: (vvd) =>
    set((state) => ({
      filters: { ...state.filters, selectedVvds: state.filters.selectedVvds.filter((v) => v !== vvd) },
    })),

  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  toggleAdvancedFilter: (chip) =>
    set((state) => {
      const isActive = state.filters.activeAdvancedFilters.includes(chip);
      return {
        filters: {
          ...state.filters,
          activeAdvancedFilters: isActive
            ? state.filters.activeAdvancedFilters.filter((c) => c !== chip)
            : [...state.filters.activeAdvancedFilters, chip],
        },
      };
    }),

  resetFilters: () =>
    set((state) => ({
      filters: DEFAULT_FILTERS,
      filteredRecords: applyFilters(state.records, DEFAULT_FILTERS),
    })),

  retrieveRecords: () =>
    set((state) => ({ filteredRecords: applyFilters(state.records, state.filters) })),

  updateDraftEdit: (recordId, field, value) =>
    set((state) => ({
      draftEdits: {
        ...state.draftEdits,
        [recordId]: { ...state.draftEdits[recordId], [field]: value },
      },
    })),

  undoGridEdits: () => set({ draftEdits: {} }),

  saveGridEdits: () =>
    set((state) => {
      const applyEdits = (record: ArrivalNoticeRecord) =>
        state.draftEdits[record.id] ? { ...record, ...state.draftEdits[record.id] } : record;
      return {
        records: state.records.map(applyEdits),
        filteredRecords: state.filteredRecords.map(applyEdits),
        draftEdits: {},
      };
    }),

  toggleAllChgFlags: () =>
    set((state) => {
      const isTicked = (record: ArrivalNoticeRecord) =>
        state.draftEdits[record.id]?.chgFlag ?? record.chgFlag ?? false;
      const allTicked = state.filteredRecords.length > 0 && state.filteredRecords.every(isTicked);
      const nextDraftEdits = { ...state.draftEdits };
      state.filteredRecords.forEach((record) => {
        nextDraftEdits[record.id] = { ...nextDraftEdits[record.id], chgFlag: !allTicked };
      });
      return { draftEdits: nextDraftEdits };
    }),
}));
