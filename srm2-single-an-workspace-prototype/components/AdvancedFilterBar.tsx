'use client';

import { useState } from 'react';
import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { Search, Filter, X } from 'lucide-react';

interface AdvancedFilterBarProps {
  records: ArrivalNoticeRecord[];
  onFilteredRecords: (records: ArrivalNoticeRecord[]) => void;
}

type QueryType = 'vvd-pod' | 'eta-pod' | 'customer-pod' | 'all';

export function AdvancedFilterBar({ records, onFilteredRecords }: AdvancedFilterBarProps) {
  const [queryType, setQueryType] = useState<QueryType>('vvd-pod');
  const [vvdInput, setVvdInput] = useState('');
  const [podInput, setPodInput] = useState('');
  const [etaStartDate, setEtaStartDate] = useState('');
  const [etaEndDate, setEtaEndDate] = useState('');
  const [customerInput, setCustomerInput] = useState('');
  const [matchFilter, setMatchFilter] = useState<'all' | 'matched' | 'ai_suggested' | 'unmatched'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ready'>('all');

  const handleFilterApply = () => {
    let filtered = [...records];

    if (queryType === 'vvd-pod' && (vvdInput || podInput)) {
      filtered = filtered.filter((r) => {
        const vvdMatch = !vvdInput || r.vvd?.toLowerCase().includes(vvdInput.toLowerCase());
        const podMatch = !podInput || r.pod?.toLowerCase().includes(podInput.toLowerCase());
        return vvdMatch && podMatch;
      });
    }

    if (queryType === 'eta-pod' && (etaStartDate || etaEndDate || podInput)) {
      filtered = filtered.filter((r) => {
        const podMatch = !podInput || r.pod?.toLowerCase().includes(podInput.toLowerCase());
        if (!etaStartDate && !etaEndDate) return podMatch;

        const etaDate = new Date(r.podEta);
        const startDate = etaStartDate ? new Date(etaStartDate) : null;
        const endDate = etaEndDate ? new Date(etaEndDate) : null;

        let dateMatch = true;
        if (startDate) dateMatch = dateMatch && etaDate >= startDate;
        if (endDate) dateMatch = dateMatch && etaDate <= endDate;

        return podMatch && dateMatch;
      });
    }

    if (queryType === 'customer-pod' && (customerInput || podInput)) {
      filtered = filtered.filter((r) => {
        const customerMatch =
          !customerInput ||
          r.customerCode?.toLowerCase().includes(customerInput.toLowerCase()) ||
          r.codeName?.toLowerCase().includes(customerInput.toLowerCase());
        const podMatch = !podInput || r.pod?.toLowerCase().includes(podInput.toLowerCase());
        return customerMatch && podMatch;
      });
    }

    if (matchFilter !== 'all') {
      filtered = filtered.filter((r) => {
        if (matchFilter === 'matched') return r.matchStatus === 'Matched';
        if (matchFilter === 'ai_suggested') return r.matchStatus === 'AI_Suggested';
        if (matchFilter === 'unmatched') return r.matchStatus === 'Unmatched';
        return true;
      });
    }

    if (statusFilter === 'ready') {
      filtered = filtered.filter((r) => r.status === 'PENDING');
    }

    onFilteredRecords(filtered);
  };

  const handleReset = () => {
    setVvdInput('');
    setPodInput('');
    setEtaStartDate('');
    setEtaEndDate('');
    setCustomerInput('');
    setMatchFilter('all');
    setStatusFilter('all');
    setQueryType('vvd-pod');
    onFilteredRecords(records);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      {/* Tab Selection */}
      <div className="flex gap-2 mb-4 border-b border-gray-200 pb-3">
        <button
          onClick={() => setQueryType('vvd-pod')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            queryType === 'vvd-pod'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          VVD + POD
        </button>
        <button
          onClick={() => setQueryType('eta-pod')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            queryType === 'eta-pod'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          POD ETA Range + POD
        </button>
        <button
          onClick={() => setQueryType('customer-pod')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            queryType === 'customer-pod'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Customer Code + POD
        </button>
      </div>

      {/* Query Input Section */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        {queryType === 'vvd-pod' && (
          <>
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                VVD (Vessel/Voyage/Direction)
              </label>
              <input
                type="text"
                placeholder="e.g., HODT0010E"
                value={vvdInput}
                onChange={(e) => setVvdInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                POD (Port of Discharge)
              </label>
              <input
                type="text"
                placeholder="e.g., Shanghai Port"
                value={podInput}
                onChange={(e) => setPodInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {queryType === 'eta-pod' && (
          <>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                POD ETA From
              </label>
              <input
                type="date"
                value={etaStartDate}
                onChange={(e) => setEtaStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                POD ETA To
              </label>
              <input
                type="date"
                value={etaEndDate}
                onChange={(e) => setEtaEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                POD
              </label>
              <input
                type="text"
                placeholder="e.g., Shanghai Port"
                value={podInput}
                onChange={(e) => setPodInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {queryType === 'customer-pod' && (
          <>
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Customer Code
              </label>
              <input
                type="text"
                placeholder="e.g., KR203915"
                value={customerInput}
                onChange={(e) => setCustomerInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                POD
              </label>
              <input
                type="text"
                placeholder="e.g., Shanghai Port"
                value={podInput}
                onChange={(e) => setPodInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {/* Match Filter */}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Match Status
          </label>
          <select
            value={matchFilter}
            onChange={(e) => setMatchFilter(e.target.value as typeof matchFilter)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="matched">Matched</option>
            <option value="ai_suggested">AI Suggested</option>
            <option value="unmatched">Unmatched</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="ready">Ready to Send</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleFilterApply}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <X className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
