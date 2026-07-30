import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { Mail, Phone, Users } from 'lucide-react';

interface RecipientContactsPanelProps {
  record: ArrivalNoticeRecord | null;
}

export const RecipientContactsPanel: React.FC<RecipientContactsPanelProps> = ({ record }) => {
  if (!record) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recipients & Contacts</h3>

      {/* Primary Recipient */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Primary Recipient
        </h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600">Consignee / Notify Email</label>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4 text-gray-400" />
              <a
                href={`mailto:${record.contactEmail}`}
                className="text-sm text-blue-600 hover:underline truncate"
              >
                {record.contactEmail}
              </a>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Fax</label>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-700">{record.contactFax}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Recipient */}
      {record.consigneeEmail2 && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Secondary Recipient
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Alternative Email</label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-gray-400" />
                <a
                  href={`mailto:${record.consigneeEmail2}`}
                  className="text-sm text-blue-600 hover:underline truncate"
                >
                  {record.consigneeEmail2}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Broker Information */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Brokers</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600">Broker #1</label>
            <p className="text-sm text-gray-900 mt-1">{record.broker1 || 'N/A'}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Broker #2</label>
            <p className="text-sm text-gray-900 mt-1">{record.broker2 || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
