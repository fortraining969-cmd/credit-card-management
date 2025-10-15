// src/components/layout/Sidebar.tsx
import React from "react";
import { FiHome, FiUser, FiLogOut, FiMenu, FiDollarSign } from "react-icons/fi";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (v: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onLogout,
  collapsed,
  setCollapsed,
  openMobile,
  setOpenMobile,
}) => {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { key: "payments", label: "Payments", icon: <FiDollarSign /> },
    { key: "profile", label: "Profile", icon: <FiUser /> },
  ];

  return (
    <>
      {/* Desktop / tablet sidebar (collapsible) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 ${collapsed ? "w-20" : "w-64"} bg-gray-950 text-white shadow-lg transition-all hidden md:block`}
      >
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-800">
          {!collapsed ? (
            <div>
              <h1 className="text-2xl font-bold">CREDA</h1>
              <p className="text-xs text-gray-400">Card Hub</p>
            </div>
          ) : (
            <div className="text-lg font-bold">C</div>
          )}

          <button onClick={() => setCollapsed((s) => !s)} className="p-2 rounded hover:bg-gray-800">
            <FiMenu />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={`w-full flex items-center gap-x-3 px-3 py-2 rounded-lg transition ${
                activeView === item.key ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button onClick={onLogout} className="w-full flex items-center gap-x-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700">
            <FiLogOut />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile overlay sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 text-white shadow-lg md:hidden transform ${openMobile ? "translate-x-0" : "-translate-x-full"} transition-transform`}
      >
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-800">
          <div>
            <h1 className="text-2xl font-bold">CREDA</h1>
            <p className="text-xs text-gray-400">Card Hub</p>
          </div>
          <button onClick={() => setOpenMobile(false)} className="p-2 rounded hover:bg-gray-800">
            Close
          </button>
        </div>

        <nav className="px-2 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveView(item.key);
                setOpenMobile(false);
              }}
              className={`w-full flex items-center gap-x-3 px-3 py-2 rounded-lg transition ${
                activeView === item.key ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => {
              onLogout();
              setOpenMobile(false);
            }}
            className="w-full flex items-center gap-x-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
