// src/components/auth/ManagerLoginForm.tsx
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "../../assets/icons";
import { Input } from "./common/Input";
import { useNavigate } from "react-router-dom";

type ManagerLoginFormProps = {
  onLogin?: () => void;
  setView?: (v: "signup" | "login" | "managerLogin") => void;
};

export const ManagerLoginForm: React.FC<ManagerLoginFormProps> = ({ onLogin, setView }) => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("manager@example.com");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !secretKey) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    // Simulate authentication delay
    await new Promise((r) => setTimeout(r, 600));

    // 🔐 Simple mock validation logic
    if (
      email.toLowerCase().includes("manager") &&
      password.length > 3 &&
      secretKey.trim().length > 4
    ) {
      onLogin?.();
      navigate("/manager/dashboard");
    } else {
      setError("Invalid credentials or secret key");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
      <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl shadow-black/40">
        <h1 className="text-4xl font-bold text-center mb-2 text-white">
          Manager Login
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Enter your credentials and bank secret key to access your manager dashboard.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-300 bg-red-900/40 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <Input
            id="manager-email"
            type="email"
            placeholder="manager@example.com"
            label="Manager Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<MailIcon />}
          />

          {/* Password */}
          <Input
            id="manager-password"
            type={passwordVisible ? "text" : "password"}
            placeholder="••••••••"
            label="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<LockIcon />}
            rightContent={
              <button
                type="button"
                onClick={() => setPasswordVisible((v) => !v)}
                className="text-gray-400 hover:text-white"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />

          {/* Secret Key */}
          <Input
            id="manager-secret"
            type="password"
            placeholder="Enter your bank's secret key"
            label="Manager Secret Key"
            required
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            icon={<LockIcon />}
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => alert("Forgot password flow coming soon")}
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot password?
            </button>

            {setView && (
              <button
                type="button"
                onClick={() => setView("login")}
                className="text-sm text-gray-400 hover:text-white hover:underline"
              >
                Back to user login
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-lg px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-transform shadow-lg shadow-blue-600/30 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          This portal is for bank managers only. Keep your credentials secure.
        </p>
      </div>
    </div>
  );
};

export default ManagerLoginForm;
