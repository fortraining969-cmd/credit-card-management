// src/components/dashboard/TransactionsList.tsx
import React, { useMemo } from 'react';

// sample transactions - replace with real fetch if you have API
const SAMPLE_TXNS = [
  { id: 't1', date: '2025-10-14', merchant: 'Amazon', amount: 2599, card: 'Axis Bank' },
  { id: 't2', date: '2025-10-12', merchant: 'PhonePe', amount: 349, card: 'HDFC' },
  { id: 't3', date: '2025-10-10', merchant: 'Netflix', amount: 699, card: 'SBI' },
  { id: 't4', date: '2025-09-29', merchant: 'Flipkart', amount: 1299, card: 'Axis Bank' },
  { id: 't5', date: '2025-09-20', merchant: 'Uber', amount: 399, card: 'HDFC' },
];

export default function TransactionsList({ query = '' }: { query?: string }) {
  const filtered = useMemo(() => {
    if (!query) return SAMPLE_TXNS;
    const q = query.toLowerCase();
    return SAMPLE_TXNS.filter(t => `${t.merchant} ${t.card} ${t.amount}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <div className="text-sm text-gray-400">Showing {filtered.length} items</div>
      </div>

      <div className="mt-4 divide-y divide-gray-800">
        {filtered.map(tx => (
          <div key={tx.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{tx.merchant}</div>
              <div className="text-xs text-gray-500">{tx.date} • {tx.card}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">₹{tx.amount.toLocaleString('en-IN')}</div>
              <div className="text-xs text-gray-400">Debit</div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-6 text-center text-gray-500">No transactions match your search.</div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">View all transactions</button>
      </div>
    </div>
  );
}
