// src/components/manager/ApplicationsList.tsx
import React, { useMemo, useState } from "react";
import { CardApplication, ApplicationStatus } from "../../services/managerApi";

export default function ApplicationsList({
  applications,
  onApprove,
  onReject,
}: {
  applications: CardApplication[];
  onApprove: (id: string, notes?: string) => Promise<void>;
  onReject: (id: string, notes?: string) => Promise<void>;
}) {
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | ApplicationStatus | "low-score">("all");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      if (filterStatus === "all") {
        // pass
      } else if (filterStatus === "low-score") {
        if (a.score > 620) return false;
      } else if (a.status !== filterStatus) return false;

      if (!query) return true;
      const q = query.toLowerCase();
      return (
        a.applicantName.toLowerCase().includes(q) ||
        (a.applicantEmail || "").toLowerCase().includes(q) ||
        (a.applicantPhone || "").includes(q)
      );
    });
  }, [applications, query, filterStatus]);

  const toggleSelect = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));

  const bulkApprove = async () => {
    const ids = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
    if (!ids.length) return alert("Select some applications first");
    if (!confirm(`Approve ${ids.length} applications?`)) return;
    for (const id of ids) await onApprove(id);
    setSelected({});
  };

  const bulkReject = async () => {
    const ids = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
    if (!ids.length) return alert("Select some applications first");
    if (!confirm(`Reject ${ids.length} applications?`)) return;
    for (const id of ids) await onReject(id);
    setSelected({});
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email or phone"
          className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="px-3 py-2 bg-gray-800 border border-gray-700 rounded">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="low-score">Low score (&lt;= 620)</option>
        </select>

        <button onClick={bulkApprove} className="px-3 py-2 bg-green-600 rounded">Approve selected</button>
        <button onClick={bulkReject} className="px-3 py-2 bg-red-600 rounded">Reject selected</button>
      </div>

      <div className="divide-y divide-gray-800">
        {filtered.length === 0 && <div className="py-6 text-gray-400">No applications found.</div>}

        {filtered.map((a) => (
          <div key={a.id} className="py-3 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <input type="checkbox" checked={!!selected[a.id]} onChange={() => toggleSelect(a.id)} className="mt-2" />
              <div>
                <div className="flex items-center gap-3">
                  <div className="text-lg font-semibold">{a.applicantName}</div>
                  <div className="text-xs text-gray-400">Applied {new Date(a.appliedOn).toLocaleString()}</div>
                </div>
                <div className="text-sm text-gray-400 mt-1">{a.applicantEmail} • {a.applicantPhone}</div>
                <div className="text-sm text-gray-300 mt-2 flex gap-4">
                  <div>Score: <span className="font-semibold">{a.score}</span></div>
                  <div>Requested: <span className="font-semibold">₹{a.requestedLimit.toLocaleString()}</span></div>
                  <div>Status: <span className={`px-2 py-0.5 rounded ${a.status === "pending" ? "bg-yellow-600" : a.status === "approved" ? "bg-green-600" : "bg-red-600"}`}>{a.status}</span></div>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-gray-400">Reason</div>
                  <div className="text-sm text-gray-200 mt-1">{a.reason}</div>
                </div>
              </div>
            </div>

            <div className="w-56 flex flex-col gap-2">
              <textarea placeholder="Notes (optional)" value={notes[a.id] || ""} onChange={(e)=> setNotes(s => ({...s, [a.id]: e.target.value}))} className="w-full h-20 p-2 rounded bg-gray-800 border border-gray-700 text-sm" />
              <div className="flex gap-2">
                <button onClick={() => onApprove(a.id, notes[a.id])} className="flex-1 px-3 py-2 bg-green-600 rounded">Approve</button>
                <button onClick={() => onReject(a.id, notes[a.id])} className="flex-1 px-3 py-2 bg-red-600 rounded">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
