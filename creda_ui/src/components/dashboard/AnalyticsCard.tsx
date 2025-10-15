// src/components/dashboard/AnalyticsCard.tsx
import React from 'react';

const sampleTrend = [12000, 11000, 15000, 14000, 17000, 16000, 19000];

const Sparkline = ({ data = sampleTrend }: { data?: number[] }) => {
  const max = Math.max(...data);
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`).join(' ');
  return <svg viewBox="0 0 100 100" className="w-full h-20"><polyline fill="none" stroke="#60a5fa" strokeWidth="2" points={points} /></svg>;
};

export default function AnalyticsCard({ cards }: any) {
  const totalOutstanding = Math.round((cards || []).reduce((s: number, c: any) => s + (c.outstanding || 0), 0));
  const monthlySpend = Math.round(totalOutstanding / (cards?.length || 1) * 0.3);

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-lg font-semibold">Spending Insights</h4>
          <p className="text-sm text-gray-400">Recent trends & recommendations</p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold">₹{monthlySpend.toLocaleString('en-IN')}</div>
          <div className="text-xs text-gray-500">Est. monthly spend</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Sparkline />
        </div>

        <div className="space-y-3">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-xs text-gray-400">Outstanding</div>
            <div className="font-bold text-lg">₹{totalOutstanding.toLocaleString('en-IN')}</div>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-xs text-gray-400">Avg Utilization</div>
            <div className="font-bold text-lg">54%</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">Save on Interest</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">View Recommendations</button>
      </div>
    </div>
  );
}
