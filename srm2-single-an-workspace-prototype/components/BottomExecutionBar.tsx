'use client';

import { CheckCircle2, Loader, Send } from 'lucide-react';

interface BottomExecutionBarProps {
  selectedCount: number;
  totalCount: number;
  isApproving: boolean;
  approvalProgress: 'Pending' | 'Sending...' | 'Dispatched';
  onMassApprove: () => void;
}

export function BottomExecutionBar({
  selectedCount,
  totalCount,
  isApproving,
  approvalProgress,
  onMassApprove,
}: BottomExecutionBarProps) {
  const getProgressColor = () => {
    if (approvalProgress === 'Dispatched') return 'bg-green-50 border-green-200';
    if (approvalProgress === 'Sending...') return 'bg-orange-50 border-orange-200';
    return 'bg-blue-50 border-blue-200';
  };

  const getProgressText = () => {
    if (approvalProgress === 'Dispatched') return 'Dispatched';
    if (approvalProgress === 'Sending...') return 'Sending...';
    return 'Ready';
  };

  const getProgressIcon = () => {
    if (approvalProgress === 'Dispatched')
      return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (approvalProgress === 'Sending...')
      return <Loader className="w-4 h-4 text-orange-600 animate-spin" />;
    return <Send className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div
      className={`border-t border-gray-200 px-6 py-4 flex items-center justify-between ${getProgressColor()}`}
    >
      {/* Left: Summary Stats */}
      <div className="flex items-center gap-6">
        <div>
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
            Selected for Processing
          </div>
          <div className="text-xl font-bold text-gray-900">
            {selectedCount} / {totalCount} B/Ls
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {selectedCount > 0
              ? `Ready to dispatch ${selectedCount} Arrival Notice${selectedCount !== 1 ? 's' : ''}`
              : 'No records selected'}
          </div>
        </div>
      </div>

      {/* Center: Status Indicator */}
      <div className="flex items-center gap-2">
        {getProgressIcon()}
        <span
          className={`text-sm font-semibold ${
            approvalProgress === 'Dispatched'
              ? 'text-green-700'
              : approvalProgress === 'Sending...'
                ? 'text-orange-700'
                : 'text-blue-700'
          }`}
        >
          {getProgressText()}
        </span>
      </div>

      {/* Right: Primary Action Button */}
      <button
        onClick={onMassApprove}
        disabled={selectedCount === 0 || isApproving}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all ${
          selectedCount === 0 || isApproving
            ? 'bg-gray-400 cursor-not-allowed opacity-60'
            : approvalProgress === 'Dispatched'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
        }`}
      >
        {isApproving && <Loader className="w-5 h-5 animate-spin" />}
        {!isApproving && <CheckCircle2 className="w-5 h-5" />}
        <span>
          [ Approve & Mass Send Arrival Notices ]
        </span>
      </button>
    </div>
  );
}
