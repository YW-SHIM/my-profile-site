import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface RightPanelProps {
  record: ArrivalNoticeRecord | null;
}

export const RightPanel: React.FC<RightPanelProps> = ({ record }) => {
  const { updateRemark, approveAndSendArrivalNotice, isApproving, approvalProgress } =
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

  const isDisabled = record.status === 'DISPATCHED' || record.status === 'ARCHIVED';

  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto flex flex-col">
      {/* Schedule Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Schedule & Delivery</h2>

        {/* Grid of mandatory fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Row 1 */}
          <div>
            <label className="text-xs font-medium text-gray-600">VVD</label>
            <p className="text-sm font-semibold text-gray-900">{record.vvd}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">B/L No.</label>
            <p className="text-sm font-mono text-gray-900">{record.blNo}</p>
          </div>

          {/* Row 2 */}
          <div>
            <label className="text-xs font-medium text-gray-600">Delivery Term</label>
            <p className="text-sm font-semibold text-gray-900">{record.deliveryTerm}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Container Type</label>
            <p className="text-sm font-semibold text-gray-900">{record.cntrType}</p>
          </div>

          {/* Row 3 */}
          <div>
            <label className="text-xs font-medium text-gray-600">Place of Delivery</label>
            <p className="text-sm text-gray-900">{record.del}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">POD ETA</label>
            <p className="text-sm text-gray-900">{record.podEta}</p>
          </div>

          {/* Row 4 */}
          <div>
            <label className="text-xs font-medium text-gray-600">Available Date</label>
            <p className="text-sm font-semibold text-green-700">{record.availableDate}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Last Free Date</label>
            <p className="text-sm font-semibold text-orange-700">{record.lastFreeDate}</p>
          </div>

          {/* Row 5 */}
          <div>
            <label className="text-xs font-medium text-gray-600">Pickup CY/CFS</label>
            <p className="text-sm text-gray-900">{record.pickupYard}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Return CY</label>
            <p className="text-sm text-gray-900">{record.returnYard}</p>
          </div>

          {/* Row 6 */}
          <div>
            <label className="text-xs font-medium text-gray-600">Form Type</label>
            <p className="text-sm text-gray-900">{record.formType}</p>
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
          className={`w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            isDisabled ? 'bg-gray-100 text-gray-500' : 'bg-white'
          }`}
          placeholder="Add any remarks or notes here..."
        />
      </div>

      {/* Action Section */}
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
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
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
            'Approve & Send Arrival Notice'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          {record.status === 'DISPATCHED'
            ? 'Record has been dispatched and archived'
            : 'This action will send the arrival notice via Kafka CDC'}
        </p>
      </div>
    </div>
  );
};
