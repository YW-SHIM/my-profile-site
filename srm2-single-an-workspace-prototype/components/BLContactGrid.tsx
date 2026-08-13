'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { SectionHeader } from './SectionHeader';

interface ToggleColumnDef {
  key: keyof ArrivalNoticeRecord;
  label: string;
}

const TOGGLE_COLUMNS: ToggleColumnDef[] = [
  { key: 'anSent', label: 'A/N SENT' },
  { key: 'contactEmail', label: 'CNEE/NTFY' },
  { key: 'consigneeEmail2', label: 'CNEE/NTFY #2' },
  { key: 'broker1', label: 'BROKER #1' },
  { key: 'broker2', label: 'BROKER #2' },
  { key: 'pod', label: 'POD' },
  { key: 'del', label: 'DEL' },
  { key: 'cargoNature', label: 'TYPE' },
  { key: 'deliveryTerm', label: 'TERM' },
  { key: 'formType', label: 'A/N FORM' },
  { key: 'language', label: 'LANGUAGE' },
];

const ACTION_BUTTONS = ['Undo', 'Retrieve', 'Down Excel', 'Save', 'Code Validate', 'E-Mail', 'Preview', 'Print', 'History'];

export function BLContactGrid() {
  const { filteredRecords, selectedRecordIds, toggleRecordSelection, draftEdits } = useArrivalNoticeStore();
  const [showConfig, setShowConfig] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(TOGGLE_COLUMNS.map((c) => c.key)));
  const [pendingColumns, setPendingColumns] = useState<Set<string>>(visibleColumns);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));

  const toggleColumns = TOGGLE_COLUMNS.filter((c) => visibleColumns.has(c.key));
  const allVisibleSelected =
    filteredRecords.length > 0 && filteredRecords.every((r) => selectedRecordIds.includes(r.id));

  const toggleAllVisible = () => {
    filteredRecords.forEach((r) => {
      const isSelected = selectedRecordIds.includes(r.id);
      if (allVisibleSelected && isSelected) toggleRecordSelection(r.id);
      if (!allVisibleSelected && !isSelected) toggleRecordSelection(r.id);
    });
  };

  const openConfig = () => {
    setPendingColumns(new Set(visibleColumns));
    setShowConfig(true);
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm relative">
      <SectionHeader
        number={4}
        title="B/L Grid · Contact Roles · Batch Selection"
        requirement="Requirement #2, #3, #10"
      />

      <div className="p-4">
        {/* Action toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
            <label className="flex items-center gap-1">
              <input type="checkbox" defaultChecked /> E-Mail
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" /> Fax
            </label>
            <label className="flex items-center gap-1">
              A/N Status
              <select className="ml-1 px-1.5 py-1 border border-gray-300 rounded text-xs">
                <option>All</option>
                <option>YES</option>
                <option>NO</option>
              </select>
            </label>
          </div>
          <div className="flex items-center gap-1.5">
            {ACTION_BUTTONS.map((label) => (
              <button
                key={label}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded border ${
                  label === 'Undo'
                    ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    : label === 'Save'
                      ? 'bg-pink-600 text-white border-pink-600 hover:bg-pink-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={openConfig}
              title="Grid Configuration"
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-2 py-2 text-left font-semibold">SEQ</th>
                <th className="px-2 py-2 text-left font-semibold">
                  <input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} />
                </th>
                <th className="px-2 py-2 text-left font-semibold">CHG</th>
                <th className="px-2 py-2 text-left font-semibold whitespace-nowrap">IMPORT MANIFEST NO</th>
                <th className="px-2 py-2 text-left font-semibold">BL NO.</th>
                <th className="px-2 py-2 text-left font-semibold">TP</th>
                <th className="px-2 py-2 text-left font-semibold">CODE</th>
                <th className="px-2 py-2 text-left font-semibold whitespace-nowrap">CUSTOMER NAME</th>
                {toggleColumns.map((col) => (
                  <th key={col.key} className="px-2 py-2 text-left font-semibold whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => {
                const isSelected = selectedRecordIds.includes(record.id);
                const isChanged = Boolean(draftEdits[record.id]);
                return (
                  <tr key={record.id} className={`border-t border-gray-100 hover:bg-gray-50 ${isSelected ? 'bg-pink-50/60' : ''}`}>
                    <td className="px-2 py-2 text-gray-500">{index + 1}</td>
                    <td className="px-2 py-2">
                      <input type="checkbox" checked={isSelected} onChange={() => toggleRecordSelection(record.id)} />
                    </td>
                    <td className="px-2 py-2">
                      <input type="checkbox" checked={isChanged} readOnly />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">{record.importManifestNo ?? '—'}</td>
                    <td className="px-2 py-2 whitespace-nowrap font-medium text-gray-800">{record.blNo}</td>
                    <td className="px-2 py-2">{record.type === 'CNEE' ? 'C' : 'N'}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{record.customerCode}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{record.consigneeName}</td>
                    {toggleColumns.map((col) => (
                      <td key={col.key} className="px-2 py-2 whitespace-nowrap text-gray-700">
                        {String(record[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-gray-400 mt-2">
          {selectedRecordIds.length} of {filteredRecords.length} B/L&apos;s selected · Contacts auto-mapped by
          Customer Code across {new Set(filteredRecords.map((r) => r.vvd)).size} VVDs · CNEE = Consignee · NTFY = Notify
          Party
        </p>

        {/* Pagination bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-6 h-6 flex items-center justify-center rounded border text-xs font-semibold ${
                  page === currentPage
                    ? 'bg-pink-600 text-white border-pink-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5">
              Items per page:
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-1.5 py-1 border border-gray-300 rounded text-xs"
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>
            <span>
              Total: {filteredRecords.length.toLocaleString()} Records · Selected: {selectedRecordIds.length} B/L&apos;s
            </span>
          </div>
        </div>
      </div>

      {/* Grid Configuration side panel */}
      {showConfig && (
        <div className="absolute top-14 right-4 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700">Grid Configuration</span>
            <Settings className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="px-3 py-2 max-h-64 overflow-y-auto">
            <p className="text-[11px] font-semibold text-gray-500 mb-1">Show / Hide Columns</p>
            {TOGGLE_COLUMNS.map((col) => (
              <label key={col.key} className="flex items-center justify-between py-1 text-xs text-gray-700">
                {col.label}
                <input
                  type="checkbox"
                  className="accent-pink-600"
                  checked={pendingColumns.has(col.key)}
                  onChange={(e) =>
                    setPendingColumns((prev) => {
                      const next = new Set(prev);
                      if (e.target.checked) next.add(col.key);
                      else next.delete(col.key);
                      return next;
                    })
                  }
                />
              </label>
            ))}
          </div>
          <div className="px-3 py-2 border-t border-gray-100 flex justify-end gap-2">
            <button
              onClick={() => setPendingColumns(new Set(TOGGLE_COLUMNS.map((c) => c.key)))}
              className="px-3 py-1 text-xs font-semibold text-gray-500 hover:text-gray-700"
            >
              Reset
            </button>
            <button
              onClick={() => {
                setVisibleColumns(new Set(pendingColumns));
                setShowConfig(false);
              }}
              className="px-3 py-1 text-xs font-semibold bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
