'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { ArrivalNoticeRecord, CARGO_NATURE_OPTIONS } from '@/types/arrival-notice';
import { SectionHeader } from './SectionHeader';

type ToggleColumnDef =
  | { id: string; key: keyof ArrivalNoticeRecord; label: string; kind: 'text' }
  | { id: string; label: string; kind: 'contact'; emailKey: keyof ArrivalNoticeRecord; faxKey: keyof ArrivalNoticeRecord }
  | { id: string; key: keyof ArrivalNoticeRecord; label: string; kind: 'select'; options: readonly string[] };

const TOGGLE_COLUMNS: ToggleColumnDef[] = [
  { id: 'anSent', key: 'anSent', label: 'A/N SENT', kind: 'text' },
  { id: 'cneeNtfy', label: 'CNEE/NTFY', kind: 'contact', emailKey: 'contactEmail', faxKey: 'contactFax' },
  { id: 'cneeNtfy2', label: 'CNEE/NTFY #2', kind: 'contact', emailKey: 'consigneeEmail2', faxKey: 'consigneeFax2' },
  { id: 'broker1', label: 'BROKER #1', kind: 'contact', emailKey: 'broker1Email', faxKey: 'broker1Fax' },
  { id: 'broker2', label: 'BROKER #2', kind: 'contact', emailKey: 'broker2Email', faxKey: 'broker2Fax' },
  { id: 'pod', key: 'pod', label: 'POD', kind: 'text' },
  { id: 'del', key: 'del', label: 'DEL', kind: 'text' },
  { id: 'cargoNature', key: 'cargoNature', label: 'TYPE', kind: 'select', options: CARGO_NATURE_OPTIONS },
  { id: 'deliveryTerm', key: 'deliveryTerm', label: 'TERM', kind: 'text' },
  { id: 'formType', key: 'formType', label: 'A/N FORM', kind: 'text' },
  { id: 'language', key: 'language', label: 'LANGUAGE', kind: 'text' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FAX_REGEX = /^\+?\d{1,3}-\d{1,4}-\d{3,4}-\d{4}$/;

const ACTION_BUTTONS = ['Undo', 'Retrieve', 'Down Excel', 'Save', 'Code Validate', 'E-Mail', 'Preview', 'Print', 'History'];

export function BLContactGrid() {
  const {
    filteredRecords,
    selectedRecordIds,
    toggleRecordSelection,
    draftEdits,
    updateDraftEdit,
    toggleAllChgFlags,
    saveGridEdits,
    undoGridEdits,
  } = useArrivalNoticeStore();
  const [showConfig, setShowConfig] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(TOGGLE_COLUMNS.map((c) => c.id)));
  const [pendingColumns, setPendingColumns] = useState<Set<string>>(visibleColumns);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactMode, setContactMode] = useState<'EMAIL' | 'FAX'>('EMAIL');

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));

  const toggleColumns = TOGGLE_COLUMNS.filter((c) => visibleColumns.has(c.id));
  const isRowChgTicked = (record: ArrivalNoticeRecord) =>
    Boolean(draftEdits[record.id]?.chgFlag ?? record.chgFlag ?? false);
  const allChgTicked = filteredRecords.length > 0 && filteredRecords.every(isRowChgTicked);
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
              <input type="checkbox" checked={contactMode === 'EMAIL'} onChange={() => setContactMode('EMAIL')} /> E-Mail
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={contactMode === 'FAX'} onChange={() => setContactMode('FAX')} /> Fax
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
                onClick={label === 'Save' ? saveGridEdits : label === 'Undo' ? undoGridEdits : undefined}
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
                <th className="px-2 py-2 text-left font-semibold">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" checked={allChgTicked} onChange={toggleAllChgFlags} />
                    CHG
                  </label>
                </th>
                <th className="px-2 py-2 text-left font-semibold whitespace-nowrap">IMPORT MANIFEST NO</th>
                <th className="px-2 py-2 text-left font-semibold">BL NO.</th>
                <th className="px-2 py-2 text-left font-semibold">TP</th>
                <th className="px-2 py-2 text-left font-semibold">CODE</th>
                <th className="px-2 py-2 text-left font-semibold whitespace-nowrap">CUSTOMER NAME</th>
                {toggleColumns.map((col) => (
                  <th key={col.id} className="px-2 py-2 text-left font-semibold whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => {
                const isSelected = selectedRecordIds.includes(record.id);
                const isChgTicked = isRowChgTicked(record);
                return (
                  <tr key={record.id} className={`border-t border-gray-100 hover:bg-gray-50 ${isSelected ? 'bg-pink-50/60' : ''}`}>
                    <td className="px-2 py-2 text-gray-500">{index + 1}</td>
                    <td className="px-2 py-2">
                      <input type="checkbox" checked={isSelected} onChange={() => toggleRecordSelection(record.id)} />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="checkbox"
                        checked={isChgTicked}
                        onChange={() => updateDraftEdit(record.id, 'chgFlag', !isChgTicked)}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">{record.importManifestNo ?? '—'}</td>
                    <td className="px-2 py-2 whitespace-nowrap font-medium text-gray-800">{record.blNo}</td>
                    <td className="px-2 py-2">{record.type === 'CNEE' ? 'C' : 'N'}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{record.customerCode}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{record.consigneeName}</td>
                    {toggleColumns.map((col) => {
                      if (col.kind === 'text') {
                        return (
                          <td key={col.id} className="px-2 py-2 whitespace-nowrap text-gray-700">
                            {String(record[col.key] ?? '')}
                          </td>
                        );
                      }
                      if (col.kind === 'select') {
                        const value = String(draftEdits[record.id]?.[col.key] ?? record[col.key] ?? '');
                        return (
                          <td key={col.id} className="px-2 py-2 whitespace-nowrap">
                            <select
                              value={value}
                              onChange={(e) => updateDraftEdit(record.id, col.key, e.target.value)}
                              className="px-1.5 py-1 border border-gray-300 rounded text-xs bg-white"
                            >
                              {col.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </td>
                        );
                      }
                      const activeKey = contactMode === 'EMAIL' ? col.emailKey : col.faxKey;
                      const value = String(draftEdits[record.id]?.[activeKey] ?? record[activeKey] ?? '');
                      const formatRegex = contactMode === 'EMAIL' ? EMAIL_REGEX : FAX_REGEX;
                      const isValid = value === '' || formatRegex.test(value);
                      return (
                        <td key={col.id} className="px-2 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateDraftEdit(record.id, activeKey, e.target.value)}
                            className={`w-full min-w-[9rem] px-1.5 py-1 border rounded text-xs ${
                              isValid ? 'border-gray-200' : 'border-red-400'
                            }`}
                          />
                        </td>
                      );
                    })}
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
              <label key={col.id} className="flex items-center justify-between py-1 text-xs text-gray-700">
                {col.label}
                <input
                  type="checkbox"
                  className="accent-pink-600"
                  checked={pendingColumns.has(col.id)}
                  onChange={(e) =>
                    setPendingColumns((prev) => {
                      const next = new Set(prev);
                      if (e.target.checked) next.add(col.id);
                      else next.delete(col.id);
                      return next;
                    })
                  }
                />
              </label>
            ))}
          </div>
          <div className="px-3 py-2 border-t border-gray-100 flex justify-end gap-2">
            <button
              onClick={() => setPendingColumns(new Set(TOGGLE_COLUMNS.map((c) => c.id)))}
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
