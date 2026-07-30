'use client';

import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { formatDate } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface RightInspectionCardProps {
  record: ArrivalNoticeRecord | null;
}

export function RightInspectionCard({ record }: RightInspectionCardProps) {
  if (!record) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
        <p className="text-sm">Select a B/L to view inspection & customs details</p>
      </div>
    );
  }

  const formatDateRange = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDateColor = (dateStr: string, type: 'eta' | 'available' | 'lastfree') => {
    if (!dateStr) return 'text-gray-600';
    const date = new Date(dateStr);
    const now = new Date();

    if (type === 'eta') return 'text-blue-700 font-semibold';
    if (type === 'available') return 'text-green-700 font-semibold';
    if (type === 'lastfree') {
      const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysLeft <= 3 ? 'text-red-700 font-semibold' : 'text-orange-700 font-semibold';
    }
    return 'text-gray-600';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 px-6 py-4">
        <h2 className="text-sm font-bold text-gray-900">
          Inspection & Customs Information
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          Operational & verification details for {record.blNo}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Shipment Identity Section */}
        <div>
          <h3 className="text-xs font-bold uppercase text-gray-700 mb-3 tracking-wider">
            Shipment Identity
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-600 font-medium mb-1">VVD</div>
              <div className="text-sm font-mono font-bold text-gray-900">
                {record.vvd}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 font-medium mb-1">B/L No.</div>
              <div className="text-sm font-mono font-bold text-gray-900">
                {record.blNo}
              </div>
            </div>
          </div>
        </div>

        {/* Container & Cargo Section */}
        <div>
          <h3 className="text-xs font-bold uppercase text-gray-700 mb-3 tracking-wider">
            Container & Cargo
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-600 font-medium mb-1">D/T (Delivery Term)</div>
              <div className="text-sm font-semibold text-gray-900">
                {record.deliveryTerm === 'Y' ? 'Yes' : 'No'}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 font-medium mb-1">CNTR Type</div>
              <div className="text-sm font-semibold text-gray-900">
                {record.cntrType}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-gray-600 font-medium mb-1">Cargo Nature</div>
              <div className="text-sm text-gray-900">
                {record.cargoNature || 'General Cargo'}
              </div>
            </div>
          </div>
        </div>

        {/* Port & Delivery Section */}
        <div>
          <h3 className="text-xs font-bold uppercase text-gray-700 mb-3 tracking-wider">
            Port & Delivery Location
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-600 font-medium mb-1">POD</div>
              <div className="text-sm font-semibold text-gray-900">
                {record.pod}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 font-medium mb-1">DEL (Place of Delivery)</div>
              <div className="text-sm font-semibold text-gray-900">
                {record.del}
              </div>
            </div>
          </div>
        </div>

        {/* Critical Dates Section */}
        <div>
          <h3 className="text-xs font-bold uppercase text-gray-700 mb-3 tracking-wider">
            Critical Dates
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-xs font-medium text-gray-700">POD ETA</span>
              <span className={`text-sm font-mono ${getDateColor(record.podEta, 'eta')}`}>
                {formatDateRange(record.podEta)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-xs font-medium text-gray-700">Available Date</span>
              <span className={`text-sm font-mono ${getDateColor(record.availableDate, 'available')}`}>
                {formatDateRange(record.availableDate)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="text-xs font-medium text-gray-700">Last Free Date (Pickup)</span>
              <span className={`text-sm font-mono ${getDateColor(record.lastFreeDate, 'lastfree')}`}>
                {formatDateRange(record.lastFreeDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Pickup & Return Section */}
        <div>
          <h3 className="text-xs font-bold uppercase text-gray-700 mb-3 tracking-wider">
            Pickup & Return
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-600 font-medium mb-1">P/Up CY/CFS</div>
              <div className="text-sm font-semibold text-gray-900">
                {record.pickupYard}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 font-medium mb-1">Return CY</div>
              <div className="text-sm font-semibold text-gray-900">
                {record.returnYard}
              </div>
            </div>
          </div>
        </div>

        {/* Document & Customs Section */}
        <div>
          <h3 className="text-xs font-bold uppercase text-gray-700 mb-3 tracking-wider">
            Document & Customs
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-600 font-medium mb-1">A/N Form Type</div>
              <div className="text-sm font-semibold text-gray-900">
                {record.formType}
              </div>
            </div>
            {record.customsSeq && (
              <div>
                <div className="text-xs text-gray-600 font-medium mb-1">
                  Customs Reference (SEQ)
                </div>
                <div className="text-sm font-mono font-bold text-purple-700 bg-purple-50 p-2 rounded border border-purple-200">
                  {record.customsSeq}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Remark Section */}
        {record.remark && (
          <div>
            <h3 className="text-xs font-bold uppercase text-gray-700 mb-2 tracking-wider">
              Remarks
            </h3>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-gray-800">
              {record.remark}
            </div>
          </div>
        )}

        {/* View in OPUS Button */}
        <div className="pt-4 border-t border-gray-200">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <ExternalLink className="w-4 h-4" />
            View in OPUS
          </button>
        </div>
      </div>
    </div>
  );
}
