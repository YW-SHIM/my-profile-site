'use client';

import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { ConfidenceBadge } from './ConfidenceBadge';
import { CheckCircle2, Circle } from 'lucide-react';

interface LeftBatchSelectorCardProps {
  records: ArrivalNoticeRecord[];
  selectedRecord: ArrivalNoticeRecord | null;
  selectedRecordIds: string[];
  onSelectRecord: (record: ArrivalNoticeRecord) => void;
  onToggleSelection: (recordId: string) => void;
  onToggleAllSelection: () => void;
}

export function LeftBatchSelectorCard({
  records,
  selectedRecord,
  selectedRecordIds,
  onSelectRecord,
  onToggleSelection,
  onToggleAllSelection,
}: LeftBatchSelectorCardProps) {
  const pendingRecords = records.filter((r) => r.status === 'PENDING');
  const allSelected =
    pendingRecords.length > 0 && selectedRecordIds.length === pendingRecords.length;
  const someSelected = selectedRecordIds.length > 0 && !allSelected;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full">
      {/* Header with Select All */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Batch Selection
          </h2>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {selectedRecordIds.length} selected
          </span>
        </div>

        {/* Select All Checkbox */}
        <button
          onClick={onToggleAllSelection}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors w-full"
        >
          {allSelected ? (
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          ) : someSelected ? (
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
          <span
            className={`font-medium ${
              allSelected
                ? 'text-blue-600'
                : someSelected
                  ? 'text-blue-500'
                  : 'text-gray-700'
            }`}
          >
            {allSelected
              ? `All (${pendingRecords.length})`
              : `Select All (${pendingRecords.length})`}
          </span>
        </button>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {pendingRecords.map((record) => {
            const isSelected = selectedRecordIds.includes(record.id);
            const isActive = selectedRecord?.id === record.id;

            return (
              <div
                key={record.id}
                className={`p-3 transition-colors border-l-4 ${
                  isActive
                    ? 'bg-blue-50 border-l-blue-600'
                    : isSelected
                      ? 'bg-blue-25 border-l-blue-400'
                      : 'bg-white border-l-transparent hover:bg-gray-50'
                }`}
              >
                {/* Checkbox Row */}
                <button
                  onClick={() => onToggleSelection(record.id)}
                  className="flex items-center gap-2 mb-2 text-sm hover:opacity-80 transition-opacity"
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  <span className="font-mono font-semibold text-gray-900">
                    {record.blNo}
                  </span>
                </button>

                {/* B/L Customer Name */}
                <div className="ml-7 mb-1">
                  <div className="text-xs text-gray-600 font-medium">
                    B/L Customer
                  </div>
                  <div className="text-xs text-gray-900 font-semibold truncate">
                    {record.consigneeName}
                  </div>
                </div>

                {/* B/L Address */}
                <div className="ml-7 mb-2">
                  <div className="text-xs text-gray-500 truncate">
                    {record.consigneeAddress || 'N/A'}
                  </div>
                </div>

                {/* Matched MDM Code */}
                <div className="ml-7 mb-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <div className="text-xs text-gray-600 font-medium mb-1">
                    Matched MDM Code
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold text-gray-900">
                        {record.verifiedCodeForAN || record.customerCode}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {record.codeName}
                      </div>
                    </div>
                    {/* AI Confidence Badge */}
                    <div className="ml-2">
                      <ConfidenceBadge
                        score={record.confidenceScore}
                        matchStatus={record.matchStatus}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Indicators */}
                <div className="ml-7 flex gap-2 text-xs">
                  {record.contactEmail && (
                    <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
                      ✉ Email
                    </span>
                  )}
                  {record.contactFax && (
                    <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
                      📠 Fax
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {pendingRecords.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No pending records
          </div>
        )}
      </div>
    </div>
  );
}
