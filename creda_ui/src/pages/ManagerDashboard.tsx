// src/pages/ManagerDashboard.tsx
import React, { useEffect, useState } from "react";
import TopBar from "../components/dashboard/TopBar";
import ApplicationsList from "../components/manager/ApplicationsList";
import * as managerApi from "../services/managerApi";
import { CardApplication } from "../services/managerApi";
import { useNavigate } from "react-router-dom";

/**
 * Manager dashboard (no left sidebar / left rail).
 * Single logout button in the header area. Full-width content.
 */

export default function ManagerDashboard({ onLogout }: { onLogout: () => void }) {
  const [apps, setApps] = useState<CardApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    const data = await managerApi.getApplications();
    setApps(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id: string, notes?: string) => {
    await managerApi.updateApplicationStatus(id, "approved", notes);
    await load();
  };

  const handleReject = async (id: string, notes?: string) => {
    await managerApi.updateApplicationStatus(id, "rejected", notes);
    await load();
  };

  const stats = {
    total: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  // No left margin since there is no sidebar / left rail
  const mainStyle: React.CSSProperties = {
    marginLeft: 0,
    transition: "margin-left 180ms ease",
    paddingTop: 88,
    paddingBottom: 48,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* TopBar: hide search and notifications for manager to keep UI minimal */}
      <TopBar
        profile={{ firstName: "Manager" }}
        leftWidth={0}
        onToggleSidebar={() => setShowMobileMenu((s) => !s)}
        hideSearch
        hideNotifications
      />

      {/* Mobile menu (if needed) */}
      {showMobileMenu && (
        <div className="md:hidden fixed left-0 top-20 z-50 w-full bg-gray-900/90 p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Manager</div>
            <button onClick={() => setShowMobileMenu(false)} className="text-sm text-gray-400">
              Close
            </button>
          </div>
        </div>
      )}

      <main style={mainStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header row with single Logout button */}
          <div className="flex items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Manager Dashboard</h1>
              <div className="text-sm text-gray-400">Review incoming credit card applications</div>
            </div>

            <div className="flex items-center gap-3">
              {/* Back to manager login (if desired) */}
              <button
                onClick={() => navigate("/manager")}
                className="px-3 py-2 bg-gray-800 rounded hover:bg-gray-700"
                title="Back to manager login"
              >
                Back to Login
              </button>

              {/* Single Logout button */}
              <button
                onClick={() => {
                  onLogout();
                  navigate("/");
                }}
                className="px-3 py-2 bg-red-600 rounded hover:bg-red-500"
                title="Logout"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-800 text-center">
              <div className="text-sm text-gray-400">Total</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-800 text-center">
              <div className="text-sm text-gray-400">Pending</div>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-800 text-center">
              <div className="text-sm text-gray-400">Approved</div>
              <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-800 text-center">
              <div className="text-sm text-gray-400">Rejected</div>
              <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
            </div>
          </div>

          {/* Applications list */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
            {loading ? (
              <div className="text-gray-400">Loading applications…</div>
            ) : (
              <ApplicationsList applications={apps} onApprove={handleApprove} onReject={handleReject} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
