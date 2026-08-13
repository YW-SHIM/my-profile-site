'use client';

import { useMemo } from 'react';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';
import { SectionHeader } from './SectionHeader';

export function ManifestVerificationStats() {
  const { filteredRecords } = useArrivalNoticeStore();

  const stats = useMemo(() => {
    const missing = filteredRecords.filter((r) => !r.importManifestNo);
    const vvdCount = new Set(filteredRecords.map((r) => r.vvd)).size;
    return {
      matched: filteredRecords.length - missing.length,
      missing,
      total: filteredRecords.length,
      vvdCount,
    };
  }, [filteredRecords]);

  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <SectionHeader number={3} title="Verify Mandatory Data · Missing Check" requirement="Requirement #4" />
      <div className="p-4 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <div className="text-2xl font-bold text-green-700">{stats.matched}</div>
          <div className="text-[11px] font-semibold text-green-600 mt-1">MANIFEST MATCHED</div>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <div className="text-2xl font-bold text-red-700">{stats.missing.length}</div>
          <div className="text-[11px] font-semibold text-red-600 mt-1">
            MANIFEST MISSING
            {stats.missing.length > 0 && (
              <span className="block text-red-500">
                {stats.missing.map((r) => `${r.blNo} · ${r.vvd}`).join(', ')}
              </span>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-[11px] font-semibold text-gray-500 mt-1">
            TOTAL B/L ACROSS {stats.vvdCount} VVD{stats.vvdCount !== 1 ? 'S' : ''}
          </div>
        </div>
      </div>
    </section>
  );
}
