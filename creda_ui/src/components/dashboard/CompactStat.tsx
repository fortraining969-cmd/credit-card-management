// src/components/dashboard/CompactStat.tsx
import React from 'react';

const CompactStat = ({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/70 to-black/40 border border-gray-800 rounded-2xl p-5 min-h-[96px] flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-400 uppercase">{title}</p>
        <div className="mt-2 text-2xl font-bold leading-tight">{value}</div>
        {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
      </div>

      <div className="ml-4 w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-blue-400 text-lg font-semibold">₹</div>
    </div>
  );
};

export default CompactStat;
