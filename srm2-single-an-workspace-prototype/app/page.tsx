'use client';

import { useEffect, useState } from 'react';
import { HeaderNav } from '@/components/HeaderNav';
import { LeftPanel } from '@/components/LeftPanel';
import { RightPanel } from '@/components/RightPanel';
import { RecipientContactsPanel } from '@/components/RecipientContactsPanel';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { getAllMockRecords, getMockRecordByBlNo } from '@/lib/mock-data';

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
      <div className="flex-1 flex overflow-hidden gap-4 p-4">
        {/* Left Panel: Customer Code & Validation */}
        <div className="w-80 overflow-y-auto">
          <LeftPanel record={selectedRecord} />
        </div>

        {/* Center Panel: Vessel Schedule & Recipient Contacts */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Vessel Arrival & Schedule Card */}
          <RightPanel record={selectedRecord} />

          {/* Recipient & Contacts Card */}
          <RecipientContactsPanel record={selectedRecord} />
        </div>

        {/* Right Sidebar: Pending Records List */}
        <div className="w-72 bg-white border border-gray-200 rounded-lg overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Pending Arrival Notices
            </h3>

            {/* Pending Records */}
            <div className="space-y-2 mb-6">
              {records
                .filter((r) => r.status === 'PENDING')
                .map((record) => (
                  <button
                    key={record.id}
                    onClick={() => selectRecord(record)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                      selectedRecord?.id === record.id
                        ? 'bg-blue-50 border-blue-300 shadow-sm ring-1 ring-blue-200'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-mono font-semibold text-gray-900">
                      {record.blNo}
                    </div>
                    <div className="text-gray-600 mt-1 truncate">
                      {record.customerName}
                    </div>
                    <div className="text-gray-500 mt-0.5">{record.vvd}</div>
                  </button>
                ))}
            </div>

            {/* Processed Records */}
            {records.filter((r) => r.status !== 'PENDING').length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  Processed
                </h4>
                <div className="space-y-2">
                  {records
                    .filter((r) => r.status !== 'PENDING')
                    .map((record) => (
                      <div
                        key={record.id}
                        className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs"
                      >
                        <div className="font-mono font-semibold text-gray-500">
                          {record.blNo}
                        </div>
                        <div className="text-gray-400 mt-1">
                          {record.status === 'DISPATCHED' && '✓ Sent'}
                          {record.status === 'ARCHIVED' && '📦 Archived'}
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
