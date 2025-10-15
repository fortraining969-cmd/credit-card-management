// src/components/dashboard/AddCardModal.tsx
import React, { useState } from "react";
import { CreditCard } from "../../types";

export default function AddCardModal({ onClose, onAdd }: { onClose: () => void; onAdd: (c: CreditCard) => void }) {
  const [bank, setBank] = useState("");
  const [holder, setHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const submit = () => {
    const digits = cardNumber.replace(/\D/g, "");
    const cvvDigits = cvv.replace(/\D/g, "");
    if (!bank || !holder || digits.length < 12 || !expiry || (cvvDigits.length !== 3 && cvvDigits.length !== 4)) {
      return alert("Fill valid details. Card number must be numeric (min 12 digits) and CVV must be 3 or 4 digits.");
    }
    const last4 = digits.slice(-4);
    const newCard: CreditCard = {
      id: String(Date.now()),
      bankName: bank,
      cardHolder: holder,
      last4,
      expiry,
      outstanding: 0,
      limit: 50000,
      cardType: "VISA",
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
      nickname: bank + " Card",
      blocked: false,
    };
    // DO NOT store full card number/CVV in client app in real product; here used only for demo
    onAdd(newCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Add New Card</h3>

        <div className="space-y-3">
          <input value={bank} onChange={(e) => setBank(e.target.value)} placeholder="Bank Name" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
          <input value={holder} onChange={(e) => setHolder(e.target.value)} placeholder="Card Holder Name" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
          <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number (digits only)" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" />
          <div className="grid grid-cols-2 gap-3">
            <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" />
            <input value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0,4))} placeholder="CVV" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-800">Cancel</button>
          <button onClick={submit} className="px-4 py-2 rounded bg-blue-600">Add Card</button>
        </div>
      </div>
    </div>
  );
}
