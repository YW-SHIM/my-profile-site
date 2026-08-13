'use client';

import { Loader, Send } from 'lucide-react';

interface BottomExecutionBarProps {
  selectedCount: number;
  totalCount: number;
  isApproving: boolean;
  onMassApprove: () => void;
}

export function BottomExecutionBar({ selectedCount, totalCount, isApproving, onMassApprove }: BottomExecutionBarProps) {
  return (
    <div className="border-t-2 border-pink-200 bg-white px-6 py-3 flex items-center justify-between">
      <div className="text-sm font-semibold text-gray-700">
        Selected <span className="text-pink-600">{selectedCount}</span> / {totalCount} B/L
      </div>

      <div className="flex items-center gap-2">
        <button className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
          Preview Selected A/N
        </button>
        <button className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
          Validate Selected
        </button>
        <button
          onClick={onMassApprove}
          disabled={selectedCount === 0 || isApproving}
          className={`flex items-center gap-2 px-5 py-2 rounded font-bold text-sm text-white shadow-md transition-all active:scale-95 ${
            selectedCount === 0 || isApproving ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          {isApproving ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {isApproving ? 'Sending...' : `Send Arrival Notice (${selectedCount})`}
        </button>
      </div>
    </div>
  );
}
