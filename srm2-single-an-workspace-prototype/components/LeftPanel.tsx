import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { ConfidenceBadge } from './ConfidenceBadge';
import { Mail, Phone } from 'lucide-react';

interface LeftPanelProps {
  record: ArrivalNoticeRecord | null;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ record }) => {
  if (!record) {
    return (
      <div className="bg-gray-50 border-r border-gray-200 p-6 w-96 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Select a B/L to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border-r border-gray-200 p-6 w-96 overflow-y-auto">
      {/* Shipper Section */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Shipper (SHPR)
        </h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs font-medium text-gray-600">Shipper Code</label>
            <p className="text-sm font-mono text-gray-900">{record.shipperCode}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Shipper Name</label>
            <p className="text-sm font-semibold text-gray-900">{record.shipperName}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Address</label>
            <p className="text-sm text-gray-700">{record.shipperAddress}</p>
          </div>
        </div>
      </div>

      {/* Consignee Section */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Consignee (CNEE) / Notify
        </h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs font-medium text-gray-600">Consignee Name</label>
            <p className="text-sm font-semibold text-gray-900">{record.consigneeName}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Address</label>
            <p className="text-sm text-gray-700">{record.consigneeAddress}</p>
          </div>
        </div>
      </div>

      {/* Match Status */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Code Validation
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-2">
              Match Status
            </label>
            <ConfidenceBadge
              score={record.confidenceScore}
              matchStatus={record.matchStatus}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">
              Verified Customer Code
            </label>
            <p className="text-sm font-mono font-semibold text-gray-900">
              {record.customerCode}
            </p>
          </div>
          {record.suggestedCode && record.matchStatus === 'AI_Suggested' && (
            <div>
              <label className="text-xs font-medium text-gray-600">
                AI Suggested Code
              </label>
              <p className="text-sm font-mono text-amber-700 bg-amber-50 px-2 py-1 rounded">
                {record.suggestedCode}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Notify Contact
        </h3>
        <div className="space-y-2">
          {record.contactEmail && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <a
                href={`mailto:${record.contactEmail}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {record.contactEmail}
              </a>
            </div>
          )}
          {record.contactFax && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-700">{record.contactFax}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
