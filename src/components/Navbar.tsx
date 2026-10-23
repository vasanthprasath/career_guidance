import React, { useState } from 'react';
import { Menu, X, Compass, ChevronDown, ArrowRight, Building2 } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
  roleToggle: 'seeker' | 'partner';
  onRoleToggle: (role: 'seeker' | 'partner') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, roleToggle, onRoleToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-navbar">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg gradient-navy flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Compass size={16} className="text-white" strokeWidth={2} />
          </div>
          <span className="font-bold text-lg text-navy-900 tracking-tight">
            Next<span className="gradient-text-navy">Step</span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {['Tracks', 'Partners', 'About'].map((item) => (
            <button
              key={item}
              id={`nav-${item.toLowerCase()}`}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-800 hover:bg-white/60 transition-all duration-200"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Role Preview Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <div
            id="role-toggle-bar"
            className="flex items-center rounded-xl p-1 gap-1"
            style={{ background: 'rgba(15,23,42,0.06)', border: '1px solid rgba(15,23,42,0.08)' }}
          >
            <button
              id="toggle-seeker"
              onClick={() => onRoleToggle('seeker')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                roleToggle === 'seeker'
                  ? 'bg-white text-navy-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Compass size={12} strokeWidth={2} />
              Career Seeker
            </button>
            <button
              id="toggle-partner"
              onClick={() => onRoleToggle('partner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                roleToggle === 'partner'
                  ? 'gradient-navy text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Building2 size={12} strokeWidth={2} />
              Partner
            </button>
          </div>

          <button
            id="nav-login"
            onClick={() => onNavigate('auth')}
            className="btn-secondary text-xs px-4 py-2"
          >
            Sign In
          </button>
          <button
            id="nav-cta"
            onClick={() => onNavigate('auth')}
            className="btn-primary text-xs px-4 py-2"
          >
            Get Started <ArrowRight size={13} strokeWidth={2} />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden p-2 rounded-lg hover:bg-white/60 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} className="text-navy-800" /> : <Menu size={20} className="text-navy-800" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-slate-200/60 px-4 py-4 space-y-2 animate-fade-in">
          {['Tracks', 'Partners', 'About'].map((item) => (
            <button
              key={item}
              className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {item}
            </button>
          ))}
          {/* Mobile Role Toggle */}
          <div className="pt-2 pb-1">
            <div
              className="flex items-center rounded-xl p-1 gap-1"
              style={{ background: 'rgba(15,23,42,0.06)', border: '1px solid rgba(15,23,42,0.08)' }}
            >
              <button
                onClick={() => { onRoleToggle('seeker'); setMobileOpen(false); }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  roleToggle === 'seeker'
                    ? 'bg-white text-navy-800 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                <Compass size={12} strokeWidth={2} />
                Career Seeker
              </button>
              <button
                onClick={() => { onRoleToggle('partner'); setMobileOpen(false); }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  roleToggle === 'partner'
                    ? 'gradient-navy text-white shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                <Building2 size={12} strokeWidth={2} />
                Partner
              </button>
            </div>
          </div>
          <div className="pt-1 flex gap-2">
            <button onClick={() => { onNavigate('auth'); setMobileOpen(false); }} className="btn-secondary flex-1 justify-center text-xs">
              Sign In
            </button>
            <button onClick={() => { onNavigate('auth'); setMobileOpen(false); }} className="btn-primary flex-1 justify-center text-xs">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
