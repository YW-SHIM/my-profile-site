'use client';

import { Search, Filter, ExternalLink, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface TopFilterBarProps {
  onSearch: (query: SearchQuery) => void;
  onFilterChange: (filter: string) => void;
  selectedFilter: string;
}

export interface SearchQuery {
  type: 'vvd-pod' | 'eta-pod' | 'code-pod' | 'all';
  vvd?: string;
  pod?: string;
  etaStart?: string;
  etaEnd?: string;
  customerCode?: string;
}

export const TopFilterBar: React.FC<TopFilterBarProps> = ({
  onSearch,
  onFilterChange,
  selectedFilter,
}) => {
  const [searchType, setSearchType] = useState<'vvd-pod' | 'eta-pod' | 'code-pod'>('vvd-pod');
  const [vvd, setVvd] = useState('');
  const [pod, setPod] = useState('');
  const [etaStart, setEtaStart] = useState('');
  const [etaEnd, setEtaEnd] = useState('');
  const [customerCode, setCustomerCode] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

  const handleSearch = () => {
    const query: SearchQuery = { type: searchType, pod };
    let filterCount = pod ? 1 : 0;

    switch (searchType) {
      case 'vvd-pod':
        query.vvd = vvd;
        if (vvd) filterCount++;
        break;
      case 'eta-pod':
        query.etaStart = etaStart;
        query.etaEnd = etaEnd;
        if (etaStart || etaEnd) filterCount++;
        break;
      case 'code-pod':
        query.customerCode = customerCode;
        if (customerCode) filterCount++;
        break;
    }

    setAppliedFiltersCount(filterCount);
    onSearch(query);
  };

  const handleReset = () => {
    setVvd('');
    setPod('');
    setEtaStart('');
    setEtaEnd('');
    setCustomerCode('');
    setAppliedFiltersCount(0);
    setSearchType('vvd-pod');
    onSearch({ type: 'all' });
  };

  const quickFilters = [
    { id: 'all', label: 'All Records', icon: '📋' },
    { id: 'unmatched', label: 'Unmatched Codes', icon: '⚠️' },
    { id: 'ready-send', label: 'Ready to Send', icon: '✓' },
    { id: 'pending', label: 'Pending A/N', icon: '⏳' },
  ];

  return (
    <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg">
      {/* Header Bar */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-pink-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <span className="text-lg">📦</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">Arrival Notice: Unified Workspace</h1>
            <p className="text-xs text-pink-100">
              Booking Management &gt; Shipment Overview &gt; Arrival Notice
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            title="User profile"
            className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center justify-center"
          >
            👤
          </button>
          <button
            title="Notifications"
            className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center justify-center relative"
          >
            🔔
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full"></span>
          </button>
          <button
            title="Settings"
            className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center justify-center"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-6 py-4 space-y-4">
        {/* Search Type Tabs */}
        <div className="flex gap-1 border-b border-pink-400 pb-2">
          <button
            onClick={() => setSearchType('vvd-pod')}
            className={`px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${
              searchType === 'vvd-pod'
                ? 'bg-white text-pink-600 shadow-md'
                : 'text-pink-100 hover:bg-white hover:bg-opacity-10'
            }`}
          >
            VVD + POD
          </button>
          <button
            onClick={() => setSearchType('eta-pod')}
            className={`px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${
              searchType === 'eta-pod'
                ? 'bg-white text-pink-600 shadow-md'
                : 'text-pink-100 hover:bg-white hover:bg-opacity-10'
            }`}
          >
            ETA + POD
          </button>
          <button
            onClick={() => setSearchType('code-pod')}
            className={`px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${
              searchType === 'code-pod'
                ? 'bg-white text-pink-600 shadow-md'
                : 'text-pink-100 hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Customer Code + POD
          </button>
        </div>

        {/* Dynamic Search Fields */}
        <div className="grid grid-cols-5 gap-3">
          {searchType === 'vvd-pod' && (
            <>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">VVD</label>
                <input
                  type="text"
                  placeholder="e.g., 1CLT0012W"
                  value={vvd}
                  onChange={(e) => setVvd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">POD</label>
                <input
                  type="text"
                  placeholder="e.g., KRPUS"
                  value={pod}
                  onChange={(e) => setPod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="col-span-3 flex items-end gap-2">
                <button
                  onClick={handleSearch}
                  className="flex-1 bg-white text-pink-600 px-4 py-2 rounded font-semibold text-sm hover:bg-pink-50 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white bg-opacity-20 text-white rounded font-semibold text-sm hover:bg-opacity-30 transition-all"
                >
                  Reset
                </button>
              </div>
            </>
          )}

          {searchType === 'eta-pod' && (
            <>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">POD ETA From</label>
                <input
                  type="date"
                  value={etaStart}
                  onChange={(e) => setEtaStart(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">POD ETA To</label>
                <input
                  type="date"
                  value={etaEnd}
                  onChange={(e) => setEtaEnd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">POD</label>
                <input
                  type="text"
                  placeholder="e.g., KRPUS"
                  value={pod}
                  onChange={(e) => setPod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="col-span-2 flex items-end gap-2">
                <button
                  onClick={handleSearch}
                  className="flex-1 bg-white text-pink-600 px-4 py-2 rounded font-semibold text-sm hover:bg-pink-50 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white bg-opacity-20 text-white rounded font-semibold text-sm hover:bg-opacity-30 transition-all"
                >
                  Reset
                </button>
              </div>
            </>
          )}

          {searchType === 'code-pod' && (
            <>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">Customer Code</label>
                <input
                  type="text"
                  placeholder="e.g., KR203915"
                  value={customerCode}
                  onChange={(e) => setCustomerCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">POD</label>
                <input
                  type="text"
                  placeholder="e.g., KRPUS"
                  value={pod}
                  onChange={(e) => setPod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="col-span-3 flex items-end gap-2">
                <button
                  onClick={handleSearch}
                  className="flex-1 bg-white text-pink-600 px-4 py-2 rounded font-semibold text-sm hover:bg-pink-50 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white bg-opacity-20 text-white rounded font-semibold text-sm hover:bg-opacity-30 transition-all"
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>

        {/* Quick Filters & Advanced Options */}
        <div className="flex items-center gap-4 pt-2 border-t border-pink-400">
          <div className="flex gap-2">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-white text-pink-600 shadow-md'
                    : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                }`}
              >
                {filter.icon} {filter.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-pink-100 hover:bg-white hover:bg-opacity-10 rounded transition-all"
          >
            <Filter className="w-4 h-4" />
            {appliedFiltersCount > 0 && (
              <span className="bg-white text-pink-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {appliedFiltersCount} applied
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </button>

          <button
            title="View in legacy OPUS system"
            className="ml-auto flex items-center gap-2 px-3 py-1 text-xs font-semibold text-pink-100 hover:bg-white hover:bg-opacity-10 rounded transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View in OPUS
          </button>
        </div>

        {/* Advanced Filters (Collapsible) */}
        {showAdvancedFilters && (
          <div className="bg-white bg-opacity-10 rounded-lg p-4 space-y-3 border border-pink-400">
            <div className="grid grid-cols-5 gap-3">
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">Booking Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                  <option>All</option>
                  <option>Firm</option>
                  <option>Waiting</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">Cargo Nature</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                  <option>All</option>
                  <option>General</option>
                  <option>Hazmat</option>
                  <option>Reefer</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">Booking Office</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                  <option>All</option>
                  <option>SEOUL</option>
                  <option>BUSAN</option>
                  <option>INCHEON</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-100 block mb-1">Match Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                  <option>All</option>
                  <option>Matched</option>
                  <option>AI Suggested</option>
                  <option>Unmatched</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleReset}
                  className="w-full bg-white bg-opacity-20 text-white px-3 py-2 rounded font-semibold text-sm hover:bg-opacity-30 transition-all"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
