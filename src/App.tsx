import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import SeekerDashboard from './components/SeekerDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import ChatBot from './components/ChatBot';

type ViewMode = 'landing' | 'auth' | 'seeker-dashboard' | 'partner-dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('landing');
  const [roleToggle, setRoleToggle] = useState<'seeker' | 'partner'>('seeker');

  const navigate = (target: string) => {
    if (target === 'auth' || target === 'landing' || target === 'seeker-dashboard' || target === 'partner-dashboard') {
      setView(target as ViewMode);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRoleToggle = (role: 'seeker' | 'partner') => {
    setRoleToggle(role);
    // Preview the corresponding dashboard when toggling in navbar
    if (view === 'seeker-dashboard' && role === 'partner') {
      setView('partner-dashboard');
    } else if (view === 'partner-dashboard' && role === 'seeker') {
      setView('seeker-dashboard');
    }
  };

  const showNavbar = view !== 'auth';

  return (
    <div className="min-h-screen gradient-page">
      {showNavbar && (
        <Navbar
          onNavigate={navigate}
          currentView={view}
          roleToggle={roleToggle}
          onRoleToggle={handleRoleToggle}
        />
      )}

      {/* Auth Modal — always renders on top */}
      {view === 'auth' && (
        <AuthModal
          onClose={() => setView('landing')}
          onLoginSeeker={() => {
            setRoleToggle('seeker');
            setView('seeker-dashboard');
          }}
          onLoginPartner={() => {
            setRoleToggle('partner');
            setView('partner-dashboard');
          }}
          defaultPortal={roleToggle}
        />
      )}

      {/* Page Views */}
      {view === 'landing' && (
        <LandingPage onNavigate={navigate} />
      )}

      {view === 'seeker-dashboard' && (
        <SeekerDashboard onNavigate={navigate} />
      )}

      {view === 'partner-dashboard' && (
        <PartnerDashboard onNavigate={navigate} />
      )}

      {/* Auth: show landing page blurred behind */}
      {view === 'auth' && (
        <div className="fixed inset-0 -z-10">
          <LandingPage onNavigate={() => {}} />
        </div>
      )}

      {/* ── AI Career ChatBot (global, shown on all non-auth views) ── */}
      {view !== 'auth' && <ChatBot />}
    </div>
  );
};

export default App;
