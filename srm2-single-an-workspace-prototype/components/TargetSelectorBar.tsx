'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useArrivalNoticeStore, ADVANCED_FILTER_CHIPS, AdvancedFilterChip } from '@/store/arrival-notice-store';
import { SectionHeader } from './SectionHeader';

const inputCls =
  'px-2.5 py-1.5 border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400';

export function TargetSelectorBar() {
  const { filters, addVvd, removeVvd, setFilter, toggleAdvancedFilter, resetFilters, retrieveRecords } =
    useArrivalNoticeStore();
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [vvdDraft, setVvdDraft] = useState('');

  const handleAddVvd = () => {
    const value = vvdDraft.trim().toUpperCase();
    if (value) addVvd(value);
    setVvdDraft('');
  };

  const hasVvdPod = filters.selectedVvds.length > 0 && filters.pod.trim() !== '';
  const hasEtaPod = filters.podEtaFrom !== '' && filters.podEtaTo !== '' && filters.pod.trim() !== '';
  const hasBlNo = filters.blNoSearch.trim() !== '';
  const mandatoryMet = hasVvdPod || hasEtaPod || hasBlNo;

  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <SectionHeader
        number={1}
        title="Select Targets by VVD + POD"
        requirement="Requirement #1"
        actions={
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <button
                onClick={retrieveRecords}
                disabled={!mandatoryMet}
                title={!mandatoryMet ? 'VVD + POD, POD ETA + POD, B/L No. 중 하나를 입력하세요' : undefined}
                className="px-4 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded hover:bg-gray-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
              >
                Retrieve
              </button>
              <button className="px-4 py-1.5 bg-white text-gray-700 text-xs font-semibold rounded border border-gray-300 hover:bg-gray-50 transition-all">
                Template
              </button>
            </div>
            {!mandatoryMet && (
              <span className="text-[11px] text-red-500 font-medium">
                VVD+POD, POD ETA+POD, B/L No. 중 하나를 입력하세요
              </span>
            )}
          </div>
        }
      />

      <div className="p-4 space-y-3">
        {/* Mandatory search combination legend */}
        <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-pink-50 border border-pink-200 rounded text-xs">
          <span className="font-semibold text-pink-700">Mandatory Search (choose one):</span>
          <span className={`px-2 py-0.5 rounded-full font-semibold ${hasVvdPod ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 border border-pink-300'}`}>
            VVD + POD
          </span>
          <span className="text-gray-400">or</span>
          <span className={`px-2 py-0.5 rounded-full font-semibold ${hasEtaPod ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 border border-pink-300'}`}>
            POD ETA + POD
          </span>
          <span className="text-gray-400">or</span>
          <span className={`px-2 py-0.5 rounded-full font-semibold ${hasBlNo ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 border border-pink-300'}`}>
            B/L No.
          </span>
        </div>

        {/* Row 1: VVD tags + POD ETA + POD + B/L No */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-gray-500">
            VVD<span className="text-red-500">*</span>
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.selectedVvds.map((vvd) => (
              <span
                key={vvd}
                className="flex items-center gap-1 px-2 py-1 bg-pink-50 border border-pink-300 text-pink-700 text-xs font-semibold rounded"
              >
                {vvd}
                <button onClick={() => removeVvd(vvd)} title={`Remove ${vvd}`}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              value={vvdDraft}
              onChange={(e) => setVvdDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddVvd()}
              placeholder="+ Add VVD"
              className="w-28 px-2 py-1 border border-dashed border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-semibold text-gray-500">
              POD ETA<span className="text-red-500">*</span>
            </span>
            <input
              type="date"
              value={filters.podEtaFrom}
              onChange={(e) => setFilter('podEtaFrom', e.target.value)}
              className={inputCls}
            />
            <span className="text-gray-400">~</span>
            <input
              type="date"
              value={filters.podEtaTo}
              onChange={(e) => setFilter('podEtaTo', e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-semibold text-gray-500">
              POD<span className="text-red-500">*</span>
            </span>
            <input
              value={filters.pod}
              onChange={(e) => setFilter('pod', e.target.value)}
              className={`${inputCls} w-24`}
            />
          </div>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-semibold text-gray-500">
              B/L No.<span className="text-red-500">*</span>
            </span>
            <input
              value={filters.blNoSearch}
              onChange={(e) => setFilter('blNoSearch', e.target.value)}
              placeholder="Search B/L No."
              className={`${inputCls} w-40`}
            />
          </div>
        </div>

        {/* Row 2: Container Type / Customer Type / A/N Status / DEL */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Container Type</span>
            <div className="flex rounded overflow-hidden border border-gray-300">
              {(['All', 'DR', 'RF'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter('containerTypeFilter', option)}
                  className={`px-3 py-1 text-xs font-semibold ${
                    filters.containerTypeFilter === option
                      ? 'bg-pink-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Customer Type</span>
            <select
              value={filters.customerTypeFilter}
              onChange={(e) => setFilter('customerTypeFilter', e.target.value)}
              className={inputCls}
            >
              <option>All</option>
              <option>Consignee</option>
              <option>Notify Party</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">A/N Status</span>
            <select
              value={filters.anStatusFilter}
              onChange={(e) => setFilter('anStatusFilter', e.target.value)}
              className={inputCls}
            >
              <option>All</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">DEL</span>
            <input
              value={filters.delFilter}
              onChange={(e) => setFilter('delFilter', e.target.value)}
              className={`${inputCls} w-24`}
            />
          </div>
        </div>

        {/* Row 3: More Filters toggle + chips */}
        <div className="pt-1 border-t border-gray-100">
          <button
            onClick={() => setShowMoreFilters((prev) => !prev)}
            className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            {showMoreFilters ? 'Collapse Filters' : '+ More Filters'}
            {filters.activeAdvancedFilters.length > 0 && (
              <span className="text-gray-400">({filters.activeAdvancedFilters.length} filters applied)</span>
            )}
          </button>

          {showMoreFilters && (
            <div className="flex flex-wrap gap-2 mt-2">
              {ADVANCED_FILTER_CHIPS.map((chip: AdvancedFilterChip) => {
                const isActive = filters.activeAdvancedFilters.includes(chip);
                return (
                  <button
                    key={chip}
                    onClick={() => toggleAdvancedFilter(chip)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      isActive
                        ? 'bg-pink-600 text-white border-pink-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
              <button
                onClick={resetFilters}
                className="px-3 py-1 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-700"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
