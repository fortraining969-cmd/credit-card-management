// src/components/dashboard/NotificationsPanel.tsx
import React from 'react';
import { FiBell } from 'react-icons/fi';

const NOTIFS = [
  { id: 1, text: 'Payment of ₹2,599 is due on Oct 16', time: '2h ago' },
  { id: 2, text: 'New offer: 5% cashback on groceries', time: '1d ago' },
  { id: 3, text: 'Your CIBIL inquiry was successful', time: '3d ago' },
];

export default function NotificationsPanel() {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-semibold">Notifications</h4>
        <div className="text-gray-400 text-sm">3 new</div>
      </div>

      <ul className="mt-3 space-y-3">
        {NOTIFS.map(n => (
          <li key={n.id} className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-yellow-400">
              <FiBell />
            </div>
            <div>
              <div className="text-sm">{n.text}</div>
              <div className="text-xs text-gray-500 mt-1">{n.time}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-right">
        <button className="text-sm text-blue-400 hover:underline">View all</button>
      </div>
    </div>
  );
}
