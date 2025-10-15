// src/components/dashboard/ProfileManager.tsx
import React, { useState } from "react";
import { UserProfile } from "../../types";

const ProfileManager = ({ profile, onSave }: { profile: UserProfile; onSave?: (p: UserProfile) => void }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserProfile>({ ...profile });

  const save = () => {
    setEditing(false);
    onSave?.(form);
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
          <p className="text-sm text-gray-400">Manage your personal info</p>
        </div>

        {!editing ? (
          <button onClick={() => setEditing(true)} className="px-4 py-2 bg-blue-600 rounded">Edit</button>
        ) : (
          <div className="flex gap-2">
            <button onClick={save} className="px-4 py-2 bg-green-600 rounded">Save</button>
            <button onClick={() => { setForm(profile); setEditing(false); }} className="px-4 py-2 bg-gray-800 rounded">Cancel</button>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400">First Name</label>
          <input value={form.firstName} disabled={!editing} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700" />
        </div>

        <div>
          <label className="text-xs text-gray-400">Last Name</label>
          <input value={form.lastName} disabled={!editing} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700" />
        </div>

        <div>
          <label className="text-xs text-gray-400">Phone</label>
          <input value={form.phoneNumber} disabled={!editing} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700" />
        </div>

        <div>
          <label className="text-xs text-gray-400">Address</label>
          <input value={form.address} disabled={!editing} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
