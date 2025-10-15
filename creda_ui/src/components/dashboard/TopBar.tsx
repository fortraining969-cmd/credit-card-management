// src/components/dashboard/TopBar.tsx
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiBell } from "react-icons/fi";

export default function TopBar({
  profile,
  leftWidth = 256,
  onToggleSidebar,
  onSearch,
  // new flags
  hideSearch = false,
  hideNotifications = false,
}: {
  profile?: any;
  leftWidth?: number;
  onToggleSidebar?: () => void;
  onSearch?: (q: string) => void;
  hideSearch?: boolean;
  hideNotifications?: boolean;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);

  // click outside close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const paddedStyle: React.CSSProperties = {
    transition: "padding-left 200ms ease",
    paddingLeft: typeof window !== "undefined" && window.innerWidth >= 768 ? leftWidth : 12,
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-black/40 backdrop-blur-md border-b border-gray-800">
      <div style={paddedStyle} className="max-w-7xl mx-auto pr-4 sm:pr-6 lg:pr-8">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile-only sidebar toggle */}
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-800 md:hidden"
              aria-label="Open menu"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Search box (optional) */}
            {!hideSearch && (
              <div className="relative">
                <input
                  onChange={(e) => onSearch?.(e.target.value)}
                  placeholder="Search transactions, merchants, cards..."
                  className="w-64 sm:w-80 md:w-96 px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiSearch />
                </div>
              </div>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4 relative">
            {/* Notifications (optional) */}
            {!hideNotifications && (
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => setShowNotifications((s) => !s)}
                  className="relative p-2 rounded-lg hover:bg-gray-800 transition"
                  aria-label="Notifications"
                >
                  <FiBell />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center text-white">
                    3
                  </span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-gray-800 text-sm font-semibold">
                      Notifications
                    </div>
                    <ul className="max-h-64 overflow-auto divide-y divide-gray-800">
                      <li className="px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer">
                        💳 Your SBI card bill of ₹5,499 is due on Oct 20
                      </li>
                      <li className="px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer">
                        ⚡ Electricity bill for ₹799 paid successfully
                      </li>
                      <li className="px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer">
                        🎉 You earned ₹100 cashback on your HDFC card
                      </li>
                    </ul>
                    <div className="text-center text-xs text-gray-400 py-2">
                      View all alerts →
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User avatar (still shown; manager can use it if desired) */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                {profile?.firstName?.[0] ?? "U"}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{profile?.firstName ?? "User"}</div>
                <div className="text-xs text-gray-400">Member since 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
