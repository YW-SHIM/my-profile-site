import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface RightPanelProps {
  record: ArrivalNoticeRecord | null;
}

export const RightPanel: React.FC<RightPanelProps> = ({ record }) => {
  const { updateRemark, approveAndSendArrivalNotice, isApproving, approvalProgress, openOpusScreen } =
    useArrivalNoticeStore();

  if (!record) {
    return (
      <div className="flex-1 bg-white p-6 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Select a B/L to view schedule & actions</p>
      </div>
    );
  }

  const handleApprove = async () => {
    await approveAndSendArrivalNotice();
  };

  const handleViewInOpus = () => {
    openOpusScreen(record.blNo);
  };

  const isDisabled = record.status === 'DISPATCHED' || record.status === 'ARCHIVED';

  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto flex flex-col">
      {/* Vessel Arrival & Schedule Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Vessel Arrival & Schedule</h2>
          <button
            onClick={handleViewInOpus}
            className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="View in legacy OPUS system"
          >
            <ExternalLink className="w-4 h-4" />
            View in OPUS
          </button>
        </div>

        {/* VVD & Vessel Info */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">VVD</label>
            <p className="text-sm font-semibold text-gray-900 mt-1">{record.vvd}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">B/L No.</label>
            <p className="text-sm font-mono text-gray-900 mt-1">{record.blNo}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Form Type</label>
            <p className="text-sm text-gray-900 mt-1">{record.formType}</p>
          </div>
        </div>

        {/* Critical Dates Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Critical Dates</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600">POD ETA</label>
              <p className="text-sm font-semibold text-blue-600 mt-1">{record.podEta}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Available Date</label>
              <p className="text-sm font-semibold text-green-700 mt-1">{record.availableDate}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Last Free Date</label>
              <p className="text-sm font-semibold text-red-600 mt-1">{record.lastFreeDate}</p>
            </div>
          </div>
        </div>

        {/* Container & Delivery Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Container & Delivery</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600">D/T (Delivery Term)</label>
              <p className="text-sm text-gray-900 mt-1">{record.deliveryTerm}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">CNTR Type</label>
              <p className="text-sm text-gray-900 mt-1">{record.cntrType}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Place of Delivery</label>
              <p className="text-sm text-gray-900 mt-1">{record.del}</p>
            </div>
          </div>
        </div>

        {/* Pickup & Return Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Pickup & Return</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600">P/Up CY/CFS</label>
              <p className="text-sm text-gray-900 mt-1">{record.pickupYard}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Return CY</label>
              <p className="text-sm text-gray-900 mt-1">{record.returnYard}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Remark Section */}
      <div className="mb-6 flex-1">
        <label className="text-sm font-semibold text-gray-900 block mb-2">Remark</label>
        <textarea
          value={record.remark || ''}
          onChange={(e) => updateRemark(e.target.value)}
          disabled={isDisabled}
          className={`w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm ${
            isDisabled ? 'bg-gray-100 text-gray-500' : 'bg-white'
          }`}
          placeholder="Add remarks or special notes..."
        />
      </div>

      {/* Approval Section */}
      <div className="space-y-3">
        {record.status === 'DISPATCHED' && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Arrival Notice Dispatched Successfully
            </span>
          </div>
        )}

        {record.status === 'ARCHIVED' && (
          <div className="flex items-center gap-2 p-3 bg-gray-100 border border-gray-300 rounded-lg">
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Record Archived</span>
          </div>
        )}

        <button
          onClick={handleApprove}
          disabled={isDisabled || isApproving}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-base ${
            isDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isApproving
                ? 'bg-orange-500 text-white cursor-wait'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isApproving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {approvalProgress}
            </>
          ) : (
            <>
              <span>✨</span>
              Approve & Send Arrival Notice
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          {record.status === 'DISPATCHED'
            ? 'Arrival Notice has been dispatched to all recipients'
            : 'Send arrival notification via Email, Fax, and EDI'}
        </p>
      </div>
    </div>
  );
};
