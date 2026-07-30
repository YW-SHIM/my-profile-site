'use client';

import { useEffect, useState } from 'react';
import { HeaderNav } from '@/components/HeaderNav';
import { LeftPanel } from '@/components/LeftPanel';
import { RightPanel } from '@/components/RightPanel';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { getAllMockRecords, getMockRecordByBlNo } from '@/lib/mock-data';
import { ArrivalNoticeRecord } from '@/types/arrival-notice';

export default function Home() {
  const { records, selectedRecord, setRecords, selectRecord } =
    useArrivalNoticeStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      setRecords(getAllMockRecords());
      selectRecord(getAllMockRecords()[0]);
      setIsInitialized(true);
    }
  }, [isInitialized, setRecords, selectRecord]);

  const handleSearch = (blNo: string) => {
    const record = getMockRecordByBlNo(blNo);
    if (record) {
      selectRecord(record);
    } else {
      alert(`B/L No. "${blNo}" not found in mock data`);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <HeaderNav selectedRecord={selectedRecord} onSearch={handleSearch} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <LeftPanel record={selectedRecord} />

        {/* Right Panel */}
        <RightPanel record={selectedRecord} />

        {/* Sidebar: Pending Records List (Optional) */}
        <div className="bg-white border-l border-gray-200 w-72 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Pending Records</h3>
            <div className="space-y-2 max-h-96">
              {records
                .filter((r) => r.status === 'PENDING')
                .map((record) => (
                  <button
                    key={record.id}
                    onClick={() => selectRecord(record)}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                      selectedRecord?.id === record.id
                        ? 'bg-blue-50 border-blue-300 shadow-sm'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-xs font-mono font-semibold text-gray-900">
                      {record.blNo}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {record.customerName}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {record.vvd}
                    </div>
                  </button>
                ))}
            </div>

            {records.filter((r) => r.status !== 'PENDING').length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Processed
                </h4>
                <div className="space-y-2 max-h-64">
                  {records
                    .filter((r) => r.status !== 'PENDING')
                    .map((record) => (
                      <div
                        key={record.id}
                        className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="text-xs font-mono font-semibold text-gray-500">
                          {record.blNo}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {record.status}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
