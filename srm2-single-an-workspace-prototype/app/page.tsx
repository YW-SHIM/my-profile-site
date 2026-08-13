'use client';

import { useEffect, useState } from 'react';
import { TargetSelectorBar } from '@/components/TargetSelectorBar';
import { VesselArrivalGrid } from '@/components/VesselArrivalGrid';
import { ManifestVerificationStats } from '@/components/ManifestVerificationStats';
import { BLContactGrid } from '@/components/BLContactGrid';
import { BottomExecutionBar } from '@/components/BottomExecutionBar';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { getAllMockRecords } from '@/lib/mock-data';

export default function Home() {
  const { filteredRecords, selectedRecordIds, isApproving, setRecords, approveAndMassSendArrivalNotices } =
    useArrivalNoticeStore();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      setRecords(getAllMockRecords());
      setIsInitialized(true);
    }
  }, [isInitialized, setRecords]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="px-6 py-4">
        <h1 className="text-lg font-bold text-pink-700">UNIFIED ARRIVAL NOTICE WORKSPACE</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">
        <TargetSelectorBar />
        <VesselArrivalGrid />
        <ManifestVerificationStats />
        <BLContactGrid />
      </div>

      <div className="sticky bottom-0">
        <BottomExecutionBar
          selectedCount={selectedRecordIds.length}
          totalCount={filteredRecords.length}
          isApproving={isApproving}
          onMassApprove={approveAndMassSendArrivalNotices}
        />
      </div>
    </div>
  );
}
