import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🔹 Pages
import LandingPage from "./pages/LandingPage";         // 👈 new homepage (Cred-like landing)
import AuthPage from "./pages/AuthPage";               // customer login/signup
import DashboardPage from "./pages/DashboardPage";     // protected customer dashboard
import CardPage from "./pages/CardPage";               // card detail view

// 🔹 Manager pages
import * as ManagerLoginModule from "./components/auth/ManagerLoginForm";
import ManagerDashboard from "./pages/ManagerDashboard";

// ✅ Handle different export styles (default/named)
const ManagerLoginForm =
  (ManagerLoginModule as any).default ??
  (ManagerLoginModule as any).ManagerLoginForm ??
  (ManagerLoginModule as any);

export default function App() {
  // --- Authentication state ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isManagerAuthenticated, setIsManagerAuthenticated] = useState<boolean>(false);

  // --- Handlers ---
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const handleManagerLogin = () => setIsManagerAuthenticated(true);
  const handleManagerLogout = () => setIsManagerAuthenticated(false);

  return (
    <Router>
      <Routes>
        {/* -------------------------------------
            🔹 PUBLIC ROUTES
        ------------------------------------- */}

        {/* Public Landing / Home Page */}
        <Route path="/home" element={<LandingPage />} />

        {/* Customer login/signup */}
        <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />

        {/* -------------------------------------
            🔹 CUSTOMER (PROTECTED) ROUTES
        ------------------------------------- */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <DashboardPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/card/:id"
          element={
            isAuthenticated ? (
              <CardPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* -------------------------------------
            🔹 MANAGER ROUTES
        ------------------------------------- */}
        <Route
          path="/manager"
          element={
            isManagerAuthenticated ? (
              <Navigate to="/manager/dashboard" replace />
            ) : (
              <ManagerLoginForm onLogin={handleManagerLogin} />
            )
          }
        />

        <Route
          path="/manager/dashboard"
          element={
            isManagerAuthenticated ? (
              <ManagerDashboard onLogout={handleManagerLogout} />
            ) : (
              <Navigate to="/manager" replace />
            )
          }
        />

        {/* -------------------------------------
            🔹 FALLBACK
        ------------------------------------- */}
        <Route
          path="*"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/home" replace />
          }
        />
      </Routes>
    </Router>
  );
}
