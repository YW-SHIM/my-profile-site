'use client';

import { ReactNode } from 'react';

interface SectionHeaderProps {
  number: number;
  title: string;
  requirement?: string;
  actions?: ReactNode;
}

export function SectionHeader({ number, title, requirement, actions }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center">
          {number}
        </span>
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        {actions}
        {requirement && <span className="text-xs text-gray-400">{requirement}</span>}
      </div>
    </div>
  );
}
