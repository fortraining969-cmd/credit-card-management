// src/pages/CardPage.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import CardDetail from "../components/dashboard/CardDetail";
import { fetchCards, fetchProfile, fetchTransactions } from "../services/mockApi";
import { useEffect, useState } from "react";
import { CreditCard, Transaction, UserProfile } from "../types";

const SIDEBAR_EXPANDED = 256;
const SIDEBAR_COLLAPSED = 80;

export default function CardPage({ onLogout }: { onLogout?: () => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    (async () => {
      const [cardsData, profileData, transactions] = await Promise.all([fetchCards(), fetchProfile(), fetchTransactions()]);
      setCards(cardsData);
      setProfile(profileData);
      setTxns(transactions);
    })();
  }, []);

  const card = cards.find((c) => c.id === id) ?? null;

  const leftWidth = sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  const mainStyle: React.CSSProperties = {
    marginLeft: window.innerWidth >= 768 ? leftWidth : 0,
    transition: "margin-left 180ms ease",
    paddingTop: 88,
    paddingBottom: 48,
  };

  if (!card) {
    return (
      <div style={mainStyle} className="min-h-screen">
        <TopBar profile={profile} collapsed={sidebarCollapsed} leftWidth={leftWidth} onToggleSidebar={() => setSidebarCollapsed((s) => !s)} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">Card not found. <button className="ml-2 text-blue-400" onClick={() => navigate("/dashboard")}>Go back</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar activeView="dashboard" setActiveView={() => {}} onLogout={onLogout ?? (() => {})} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} openMobile={false} setOpenMobile={() => {}} />
      <TopBar profile={profile} collapsed={sidebarCollapsed} leftWidth={leftWidth} onToggleSidebar={() => setSidebarCollapsed((s) => !s)} />
      <main style={mainStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
            <button onClick={() => navigate(-1)} className="text-sm text-blue-400 mb-4">← Back</button>
            <CardDetail card={card} transactions={txns.filter((t) => t.cardId === card.id)} onUpdateCard={(u) => setCards((prev) => prev.map((c) => (c.id === u.id ? u : c)))} />
          </div>
        </div>
      </main>
    </div>
  );
}
