'use client';

import { useMemo, useState } from 'react';
import { Settings, Undo2, Save, ChevronDown } from 'lucide-react';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { SectionHeader } from './SectionHeader';

interface ColumnDef {
  key: keyof ArrivalNoticeRecord;
  label: string;
  editable?: 'select' | 'date' | 'text';
  options?: string[];
}

const COLUMNS: ColumnDef[] = [
  { key: 'vvd', label: 'VVD' },
  { key: 'cntrType', label: 'CNTR TYPE', editable: 'select', options: ['ALL', 'DR', 'RF'] },
  { key: 'podEta', label: 'POD ETA', editable: 'date' },
  { key: 'etaDel', label: 'DEL ETA', editable: 'date' },
  { key: 'availableDate', label: 'AVAILABLE DATE', editable: 'date' },
  { key: 'lastFreeDate', label: 'LAST FREE TO PICK UP', editable: 'date' },
  { key: 'pickupYard', label: 'P/Up CY/CFS', editable: 'text' },
  { key: 'returnYard', label: 'RETURN CY', editable: 'text' },
  { key: 'formType', label: 'FORM', editable: 'select', options: ['General', 'EDI', 'Paper'] },
  { key: 'agent', label: 'AGENT', editable: 'select', options: ['*', 'N/A'] },
  { key: 'importManifestNo', label: 'IMPORT MANIFEST NO' },
];

const DEFAULT_NOTICE_TEXT = [
  'Demurrage Free Time — Dry Container: 10 days Calendar / Reefer Container: 6 days Calendar',
  'Detention time and Charges apply per contract terms.',
  'For Bank L/G Confirmation of User (Load) & C-eref should be collected.',
  'All type of Empty container can not return to Bujeok ICD.',
  'DEM charged for SOC container from APR, 2010.',
].join('\n');

export function VesselArrivalGrid() {
  const { filteredRecords, draftEdits, updateDraftEdit, undoGridEdits, saveGridEdits } = useArrivalNoticeStore();
  const [showConfig, setShowConfig] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
  const [noticeText, setNoticeText] = useState(DEFAULT_NOTICE_TEXT);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(COLUMNS.map((c) => c.key)));
  const [pendingColumns, setPendingColumns] = useState<Set<string>>(visibleColumns);

  // Section 2는 VVD 단위 스케줄 확인/편집 그리드 — 선택된 VVD마다 대표 레코드 1건을 편집 대상으로 사용
  const vvdRows = useMemo(() => {
    const seen = new Set<string>();
    const rows: ArrivalNoticeRecord[] = [];
    filteredRecords.forEach((r) => {
      if (!seen.has(r.vvd)) {
        seen.add(r.vvd);
        rows.push(r);
      }
    });
    return rows;
  }, [filteredRecords]);

  const getValue = (record: ArrivalNoticeRecord, key: keyof ArrivalNoticeRecord) =>
    (draftEdits[record.id]?.[key] as string | undefined) ?? (record[key] as string | undefined) ?? '';

  const columns = COLUMNS.filter((c) => visibleColumns.has(c.key));

  const openConfig = () => {
    setPendingColumns(new Set(visibleColumns));
    setShowConfig(true);
  };

  const applyConfig = () => {
    setVisibleColumns(new Set(pendingColumns));
    setShowConfig(false);
  };

  const resetConfig = () => {
    setPendingColumns(new Set(COLUMNS.map((c) => c.key)));
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm relative">
      <SectionHeader
        number={2}
        title="Confirm & Set Vessel Arrival Info — edit directly in the grid, no popup"
        requirement="Requirement #3"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={undoGridEdits}
              className="px-3 py-1.5 flex items-center gap-1 bg-white text-gray-700 text-xs font-semibold rounded border border-gray-300 hover:bg-gray-50"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Undo
            </button>
            <button
              onClick={saveGridEdits}
              className="px-3 py-1.5 flex items-center gap-1 bg-pink-600 text-white text-xs font-semibold rounded hover:bg-pink-700"
            >
              <Save className="w-3.5 h-3.5" />
              Save
            </button>
            <button
              onClick={openConfig}
              title="Grid Configuration"
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        }
      />

      <div className="p-4">
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-2 py-2 text-left font-semibold">SEQ</th>
                {columns.map((col) => (
                  <th key={col.key} className="px-2 py-2 text-left font-semibold whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vvdRows.map((record, index) => (
                <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-2 py-2 text-gray-500">{11 + index}</td>
                  {columns.map((col) => {
                    const value = getValue(record, col.key);
                    if (col.editable === 'select') {
                      return (
                        <td key={col.key} className="px-2 py-1">
                          <div className="relative bg-pink-50 rounded">
                            <select
                              value={value}
                              onChange={(e) => updateDraftEdit(record.id, col.key, e.target.value)}
                              className="w-full appearance-none px-2 py-1 pr-5 bg-transparent text-pink-700 font-medium focus:outline-none"
                            >
                              {(col.options ?? []).map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-3 h-3 text-pink-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </td>
                      );
                    }
                    if (col.editable === 'date') {
                      return (
                        <td key={col.key} className="px-2 py-1">
                          <input
                            type="datetime-local"
                            lang="en-US"
                            value={value ? value.slice(0, 16) : ''}
                            onChange={(e) => updateDraftEdit(record.id, col.key, `${e.target.value}:00Z`)}
                            className="w-full px-2 py-1 bg-pink-50 rounded text-pink-700 font-medium focus:outline-none focus:ring-1 focus:ring-pink-400"
                          />
                        </td>
                      );
                    }
                    if (col.editable === 'text') {
                      return (
                        <td key={col.key} className="px-2 py-1">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateDraftEdit(record.id, col.key, e.target.value)}
                            className="w-full px-2 py-1 bg-pink-50 rounded text-pink-700 font-medium focus:outline-none focus:ring-1 focus:ring-pink-400"
                          />
                        </td>
                      );
                    }
                    return (
                      <td key={col.key} className="px-2 py-2 text-gray-700 whitespace-nowrap">
                        {col.key === 'importManifestNo' ? value || '—' : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-gray-400 mt-2">
          Right-click any header/cell in the grid to: Schedule &amp; reorder columns (Grid Show/Hide and Moving).
        </p>

        {/* Important Notice */}
        <div className="mt-4 border border-amber-200 bg-amber-50 rounded-lg">
          <div className="flex items-center justify-between px-3 py-2 border-b border-amber-200">
            <span className="text-xs font-semibold text-amber-800">Important Notice</span>
            <button
              onClick={() => setShowNotice((prev) => !prev)}
              className="px-2 py-1 text-[11px] font-semibold text-amber-800 border border-amber-300 rounded hover:bg-amber-100"
            >
              {showNotice ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {showNotice && (
            <textarea
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              rows={5}
              className="w-full text-[11px] text-amber-800 bg-transparent px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-300 resize-y"
            />
          )}
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
            <p className="text-[11px] font-semibold text-gray-500 mb-1">Visible Columns</p>
            {COLUMNS.map((col) => (
              <label key={col.key} className="flex items-center gap-2 py-0.5 text-xs text-gray-700">
                <input
                  type="checkbox"
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
                {col.label}
              </label>
            ))}
            <p className="text-[11px] font-semibold text-gray-400 mt-2">
              Hidden Columns ({COLUMNS.length - pendingColumns.size})
            </p>
          </div>
          <div className="px-3 py-2 border-t border-gray-100 flex justify-end gap-2">
            <button onClick={resetConfig} className="px-3 py-1 text-xs font-semibold text-gray-500 hover:text-gray-700">
              Reset
            </button>
            <button
              onClick={applyConfig}
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
