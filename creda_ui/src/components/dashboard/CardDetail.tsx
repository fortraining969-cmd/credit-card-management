// src/components/dashboard/CardDetail.tsx
import React, { useState } from "react";
import { CreditCard, Transaction } from "../../types";
import { FiCopy, FiLock, FiUnlock, FiShield } from "react-icons/fi";

export default function CardDetail({
  card,
  transactions,
  onUpdateCard,
}: {
  card: CreditCard;
  transactions: Transaction[];
  onUpdateCard: (c: CreditCard) => void;
}) {
  const [editingNick, setEditingNick] = useState(false);
  const [nickname, setNickname] = useState(card.nickname ?? "");
  const [blocked, setBlocked] = useState(card.blocked ?? false);
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState("");

  const saveNickname = () => {
    onUpdateCard({ ...card, nickname });
    setEditingNick(false);
  };

  const toggleBlock = () => {
    setBlocked((b) => {
      const nb = !b;
      onUpdateCard({ ...card, blocked: nb });
      return nb;
    });
  };

  const setNewPin = () => {
    if (pin.length < 4) return alert("Enter 4-digit PIN");
    alert("PIN updated (mock)");
    setPin("");
    setPinMode(false);
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-400">Selected Card</div>
          <div className="text-lg font-bold">
            {card.bankName} • {card.cardType}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            **** **** **** {card.last4} · EXP {card.expiry}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-sm text-gray-400">Outstanding</div>
          <div className="text-xl font-bold">₹{card.outstanding?.toLocaleString("en-IN") ?? 0}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {!editingNick ? (
            <>
              <div className="text-sm text-gray-300">
                {card.nickname || <span className="text-gray-500 italic">No nickname</span>}
              </div>
              <button onClick={() => setEditingNick(true)} className="text-xs text-blue-400">
                Edit
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="px-2 py-1 rounded bg-gray-800 border border-gray-700"
              />
              <button onClick={saveNickname} className="px-2 py-1 bg-blue-600 rounded">
                Save
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigator.clipboard?.writeText(card.last4)}
            className="px-3 py-2 bg-gray-800 rounded flex items-center gap-2"
          >
            <FiCopy /> Copy
          </button>
          <button
            onClick={toggleBlock}
            className={`px-3 py-2 rounded ${blocked ? "bg-yellow-600" : "bg-red-600"} text-white`}
          >
            {blocked ? (
              <>
                <FiUnlock /> Unblock
              </>
            ) : (
              <>
                <FiLock /> Block
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-3">Card Actions</h4>

        {/* Manage PIN */}
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-gray-800 rounded p-3">
            <div className="flex items-center gap-3">
              <FiShield className="text-lg text-teal-300" />
              <div>
                <div className="text-sm font-medium">Manage PIN</div>
                <div className="text-xs text-gray-400">Change your ATM / POS PIN</div>
              </div>
            </div>

            <div>
              <button onClick={() => setPinMode((s) => !s)} className="px-3 py-1 rounded bg-blue-600 text-sm">
                {pinMode ? "Cancel" : "Change"}
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded p-3">
            <button onClick={() => alert("Manage limits (mock)")} className="w-full px-3 py-2 rounded bg-gray-700 text-left">
              Manage Limits
            </button>
          </div>

          <div className="bg-gray-800 rounded p-3">
            <button onClick={() => alert("Start dispute (mock)")} className="w-full px-3 py-2 rounded bg-gray-700 text-left">
              Dispute Transaction
            </button>
          </div>
        </div>

        {pinMode && (
          <div className="mt-3 p-3 bg-gray-800 rounded">
            <div className="text-xs text-gray-400 mb-2">Set new 4-digit PIN</div>
            <div className="flex gap-2">
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="px-3 py-2 rounded bg-black/20"
                placeholder="••••"
              />
              <button onClick={setNewPin} className="px-3 py-2 bg-blue-600 rounded">
                Save PIN
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">Recent transactions</h4>

        {/* NOTE: add right padding so scrollbar does not cover amounts.
            also set scrollbarGutter where supported to reserve space */}
        <div
          className="divide-y divide-gray-800 max-h-40 overflow-auto pr-4"
          style={{ scrollbarGutter: "stable" as any }}
          aria-label="Recent transactions"
        >
          {transactions.length === 0 && <div className="text-gray-500 py-4">No recent transactions for this card.</div>}

          {transactions.map((t) => (
            <div key={t.id} className="py-2 flex items-center justify-between pr-2">
              <div>
                <div className="font-medium">{t.merchant}</div>
                <div className="text-xs text-gray-400">{t.date}</div>
              </div>

              {/* Amount column: add left gap and ensure it doesn't collide with scrollbar */}
              <div className="text-right pl-4 pr-2 min-w-[110px]">
                <div className="font-medium">₹{t.amount.toLocaleString("en-IN")}</div>
                <div className="text-xs text-gray-400">{t.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
