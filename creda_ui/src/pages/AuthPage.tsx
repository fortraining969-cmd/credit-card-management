import React, { useState } from 'react';
import { Background } from '../components/layout/Background';
import { LoginForm } from '../components/auth/LoginForm';
import { SignUpForm } from '../components/auth/SignUpForm';
// ✅ CORRECT
import ManagerLoginForm from "../components/auth/ManagerLoginForm";

type AuthPageProps = {
  onLogin?: () => void;
};

export default function AuthPage({ onLogin }: AuthPageProps) {
  // keep same default as your original (signup) or change to 'login' if you prefer
  const [view, setView] = useState<'signup' | 'login' | 'managerLogin'>('signup');

  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginForm setView={setView} onLogin={onLogin} />;
      case 'managerLogin':
        return <ManagerLoginForm setView={setView} onLogin={onLogin} />;
      case 'signup':
      default:
        return <SignUpForm setView={setView} onLogin={onLogin} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 font-sans text-white overflow-hidden">
      <Background />
      <main className="relative z-10 w-full transition-all duration-500">
        {renderView()}
      </main>
    </div>
  );
}
