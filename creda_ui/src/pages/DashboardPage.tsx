// src/pages/DashboardPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import CardList from "../components/dashboard/CardList";
import PaymentsHub from "../components/dashboard/PaymentsHub";
import SupportChat from "../components/dashboard/SupportChat";
import AddCardModal from "../components/dashboard/AddCardModal";
import ProfileManager from "../components/dashboard/ProfileManager";
import { fetchCards, fetchProfile, fetchTransactions } from "../services/mockApi";
import { CreditCard, Transaction, UserProfile } from "../types";

const SIDEBAR_EXPANDED = 256;
const SIDEBAR_COLLAPSED = 80;

export default function DashboardPage({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [cards, setCards] = useState<CreditCard[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [activeView, setActiveView] = useState<"dashboard" | "payments" | "profile">("dashboard");
  const [showAddCard, setShowAddCard] = useState(false);
  const [showSupportChat, setShowSupportChat] = useState(false);

  useEffect(() => {
    (async () => {
      const [cardsData, profileData, txns] = await Promise.all([fetchCards(), fetchProfile(), fetchTransactions()]);
      setCards(cardsData);
      setProfile(profileData);
      setTransactions(txns);
    })();
  }, []);

  // Provide handler for sidebar actions
  const handleSetActiveView = (v: typeof activeView) => {
    setActiveView(v);
    if (v === "profile") {
      // nothing else — will show profile pane
    } else if (v === "payments") {
      // scroll to top so payments visible
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // close mobile sidebar if open
    if (mobileSidebarOpen) setMobileSidebarOpen(false);
  };

  const leftWidth = sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  // layout styles for the main content (avoids squeeze)
  const mainStyle: React.CSSProperties = {
    marginLeft: window.innerWidth >= 768 ? leftWidth : 0,
    transition: "margin-left 180ms ease",
    paddingTop: 88,
    paddingBottom: 48,
  };

  // click handler when card clicked in list -> navigate to card page
  const handleSelectCard = (cardId: string) => {
    navigate(`/card/${cardId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar
        activeView={activeView}
        setActiveView={handleSetActiveView}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        openMobile={mobileSidebarOpen}
        setOpenMobile={setMobileSidebarOpen}
      />

      <TopBar
        profile={profile}
        collapsed={sidebarCollapsed}
        leftWidth={leftWidth}
        onToggleSidebar={() => {
          if (window.innerWidth >= 768) setSidebarCollapsed((s) => !s);
          else setMobileSidebarOpen((s) => !s);
        }}
        onToggleSupport={() => setShowSupportChat((s) => !s)}
      />

      <main style={mainStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* header row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                {profile?.firstName?.[0] ?? "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Hi, {profile?.firstName ?? "User"}</h1>
                <p className="text-sm text-gray-400">Manage your cards, payments and support</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setShowAddCard(true)} className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-teal-500 font-semibold shadow">
                Add Card
              </button>
              <button onClick={() => setShowSupportChat((s) => !s)} className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">Support</button>
            </div>
          </div>

          {/* content */}
          {activeView === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Vertical card list */}
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <CardList cards={cards} onSelectCard={handleSelectCard} />
                </div>

                {/* quick payments */}
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <PaymentsHub compact />
                </div>
              </div>

              <aside className="space-y-6">
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Support</h3>
                  <SupportChat compact onOpen={() => setShowSupportChat(true)} />
                </div>

                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <div className="text-sm text-gray-400">Select a card to see more details & actions.</div>
                </div>
              </aside>
            </div>
          )}

          {activeView === "payments" && (
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
              <PaymentsHub />
            </div>
          )}

          {activeView === "profile" && profile && (
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
              <ProfileManager profile={profile} onSave={(p) => setProfile(p)} />
            </div>
          )}
        </div>
      </main>

      {showAddCard && <AddCardModal onClose={() => setShowAddCard(false)} onAdd={(card) => setCards((prev) => [card, ...prev])} />}
      {showSupportChat && <SupportChat onClose={() => setShowSupportChat(false)} />}
    </div>
  );
}
