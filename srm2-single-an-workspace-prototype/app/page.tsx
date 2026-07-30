'use client';

import { useEffect, useState } from 'react';
import { AdvancedFilterBar } from '@/components/AdvancedFilterBar';
import { LeftBatchSelectorCard } from '@/components/LeftBatchSelectorCard';
import { RightInspectionCard } from '@/components/RightInspectionCard';
import { RecipientContactsPanel } from '@/components/RecipientContactsPanel';
import { BottomExecutionBar } from '@/components/BottomExecutionBar';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { getAllMockRecords } from '@/lib/mock-data';

export default function Home() {
  const {
    records,
    selectedRecord,
    selectedRecordIds,
    isApproving,
    approvalProgress,
    setRecords,
    selectRecord,
    toggleRecordSelection,
    toggleAllRecordSelection,
    approveAndMassSendArrivalNotices,
  } = useArrivalNoticeStore();

  const [filteredRecords, setFilteredRecords] = useState<typeof records>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const mockRecords = getAllMockRecords();
      setRecords(mockRecords);
      setFilteredRecords(mockRecords);
      selectRecord(mockRecords[0]);
      setIsInitialized(true);
    }
  }, [isInitialized, setRecords, selectRecord]);

  const handleFilteredRecords = (filtered: typeof records) => {
    setFilteredRecords(filtered);
    if (filtered.length > 0 && !filtered.find((r) => r.id === selectedRecord?.id)) {
      selectRecord(filtered[0]);
    }
  };

  const pendingCount = filteredRecords.filter((r) => r.status === 'PENDING').length;

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Top: Advanced Filter Bar */}
      <AdvancedFilterBar records={records} onFilteredRecords={handleFilteredRecords} />

      {/* Main Content: 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden gap-4 p-4">
        {/* Left Column: Batch Selector */}
        <div className="w-96 overflow-hidden">
          <LeftBatchSelectorCard
            records={filteredRecords}
            selectedRecord={selectedRecord}
            selectedRecordIds={selectedRecordIds}
            onSelectRecord={selectRecord}
            onToggleSelection={toggleRecordSelection}
            onToggleAllSelection={toggleAllRecordSelection}
          />
        </div>

        {/* Center Column: Inspection & Recipients */}
        <div className="flex-1 flex flex-col overflow-hidden gap-4">
          <div className="flex-1 overflow-y-auto">
            <RightInspectionCard record={selectedRecord} />
          </div>

          <div className="flex-1 overflow-y-auto">
            <RecipientContactsPanel record={selectedRecord} />
          </div>
        </div>
      </div>

      {/* Bottom: Mass Execution Bar */}
      <BottomExecutionBar
        selectedCount={selectedRecordIds.length}
        totalCount={pendingCount}
        isApproving={isApproving}
        approvalProgress={approvalProgress}
        onMassApprove={approveAndMassSendArrivalNotices}
      />
    </div>
  );
}
