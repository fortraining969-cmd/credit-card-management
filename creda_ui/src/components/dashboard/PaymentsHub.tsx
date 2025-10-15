// src/components/dashboard/PaymentsHub.tsx
import React, { useState } from "react";
import { FiPhone, FiTv, FiZap, FiHome, FiCreditCard, FiDatabase } from "react-icons/fi";

export default function PaymentsHub({ compact = false }: { compact?: boolean }) {
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  const samplePayees = ["Divyanshu", "Div Papa", "Mayank", "Akshay PhonePe"];
  const services = [
    { key: "recharge", label: "Recharge", icon: <FiPhone className="text-2xl" /> },
    { key: "dth", label: "DTH", icon: <FiTv className="text-2xl" /> },
    { key: "electricity", label: "Electricity", icon: <FiZap className="text-2xl" /> },
    { key: "credit", label: "Credit Card", icon: <FiCreditCard className="text-2xl" /> },
    { key: "postpaid", label: "Postpaid", icon: <FiDatabase className="text-2xl" /> },
    { key: "water", label: "Water", icon: <FiHome className="text-2xl" /> },
    // add more as needed...
  ];

  const doPay = () => {
    if (!payee || !amount) {
      alert("Enter payee and amount");
      return;
    }
    setTimeout(() => {
      setSuccess(`✅ Paid ₹${Number(amount).toLocaleString("en-IN")} to ${payee}`);
      setAmount("");
      setPayee("");
    }, 500);
  };

  if (compact) {
    return (
      <div>
        <div className="flex gap-2">
          <select value={payee} onChange={(e) => setPayee(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 px-3 py-2 rounded">
            <option value="">Select Payee</option>
            {samplePayees.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ""))} placeholder="₹ amount" className="w-28 bg-gray-800 border border-gray-700 px-3 py-2 rounded" />
          <button onClick={doPay} className="px-3 py-2 bg-green-600 rounded">Pay</button>
        </div>
        {success && <div className="mt-3 text-sm text-green-400">{success}</div>}
      </div>
    );
  }

  return (
    <div>
      {/* Banner / carousel placeholder */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-4 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-semibold">Offers & Bills</div>
            <div className="text-sm text-white/90">Pay bills, recharge & more — fast and secure</div>
          </div>
          <div className="text-xs text-white/90">Know More →</div>
        </div>
      </div>

      {/* Quick circular actions (PhonePe style) */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 mb-5">
        <h4 className="text-md font-semibold mb-3">Money Transfers</h4>
        <div className="flex gap-4 overflow-x-auto py-2">
          {["To Contact", "To Account", "To Self", "Bank Balance"].map((t) => (
            <div key={t} className="flex-shrink-0 flex flex-col items-center gap-2 w-24">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-lg">{t.split(" ").map(s=>s[0]).join("")}</div>
              <div className="text-xs text-gray-300 text-center">{t}</div>
            </div>
          ))}
        </div>

        {/* favorites row (contacts as initials) */}
        <div className="mt-4">
          <h5 className="text-sm font-semibold mb-2">Favorites</h5>
          <div className="flex gap-3 overflow-x-auto py-2">
            {samplePayees.map((p) => (
              <button key={p} onClick={() => setPayee(p)} className="flex-shrink-0 flex flex-col items-center gap-2 w-20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-semibold">{p.split(" ").map(s=>s[0]).join("").slice(0,2)}</div>
                <div className="text-xs text-gray-300 text-center">{p.length > 10 ? `${p.slice(0,10)}...` : p}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pay Now area */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 mb-5">
        <h4 className="text-md font-semibold mb-3">Pay Now</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select value={payee} onChange={(e) => setPayee(e.target.value)} className="col-span-2 bg-gray-800 border border-gray-700 px-3 py-2 rounded">
            <option value="">Select Payee / Enter UPI</option>
            {samplePayees.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ""))} placeholder="Amount (INR)" className="bg-gray-800 border border-gray-700 px-3 py-2 rounded" />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={doPay} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded font-semibold">Pay ₹{amount || "0"}</button>
          <button onClick={() => { setPayee(""); setAmount(""); setSuccess(null); }} className="px-4 py-2 bg-gray-800 rounded">Reset</button>
        </div>
        {success && <div className="mt-3 text-sm text-green-400">{success}</div>}
      </div>

      {/* Recharge & Pay Bills grid */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
        <h5 className="text-sm font-semibold mb-4">Recharge & Pay Bills</h5>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {services.map((s) => (
            <button key={s.key} onClick={() => alert(`${s.label} clicked (mock)`)} className="flex flex-col items-center gap-2 bg-gray-800 p-3 rounded">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white">{s.icon}</div>
              <div className="text-xs text-gray-300">{s.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
