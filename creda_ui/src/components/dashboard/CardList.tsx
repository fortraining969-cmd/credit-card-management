// src/components/dashboard/CardList.tsx
import React from "react";
import { CreditCard } from "../../types";
import { FiCopy } from "react-icons/fi";

export default function CardList({
  cards,
  onSelectCard,
}: {
  cards: CreditCard[];
  onSelectCard: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">My Cards</h3>
        <div className="text-sm text-gray-400">Tap a card to view details</div>
      </div>

      <div className="space-y-5">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectCard(card.id)}
            role="button"
            className={`relative overflow-hidden rounded-2xl p-4 cursor-pointer transform transition hover:scale-[1.01] ${card.bgColor || "bg-gradient-to-br from-slate-700 to-slate-900"}`}
          >
            {/* subtle card inner shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>

            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-white/80">{card.bankName}</div>
                <div className="mt-4 text-white font-semibold text-lg tracking-wide">{card.cardType}</div>
              </div>

              <div className="text-right">
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-white text-xs">VISA</div>
              </div>
            </div>

            {/* chip and embossed number */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                {/* chip */}
                <div className="w-10 h-8 bg-yellow-300 rounded-sm shadow-inner" />
                <div className="text-white/90 font-mono text-xl tracking-widest">**** **** **** {card.last4}</div>
              </div>

              <div className="text-right">
                <div className="text-xs text-white/70">{card.cardHolder.toUpperCase()}</div>
                <div className="text-xs text-white/70 mt-1">EXP {card.expiry}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-white/80">Nickname: <span className="font-medium">{card.nickname ?? "—"}</span></div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-white/80">Outstanding</div>
                <div className="font-semibold">₹{(card.outstanding || 0).toLocaleString("en-IN")}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard?.writeText(card.last4);
                  }}
                  className="p-2 bg-black/30 rounded text-white/90"
                >
                  <FiCopy />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
