import React, { useState } from 'react';
import {
  Compass, Building2, Eye, EyeOff, ArrowRight, CheckCircle2,
  ShieldCheck, X, ChevronDown, Loader2
} from 'lucide-react';
import { SEEKER_STAGES, ORG_CATEGORIES } from '../data/appData';

interface AuthModalProps {
  onClose: () => void;
  onLoginSeeker: () => void;
  onLoginPartner: () => void;
  defaultPortal?: 'seeker' | 'partner';
}

const SeekerLoginCard: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div
      id="seeker-login-card"
      className="rounded-3xl p-7 flex flex-col gap-5"
      style={{
        background: 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(226,232,240,0.80)',
        boxShadow: '0 8px 30px rgb(15,23,42,0.07)',
      }}
    >
      {/* Badge */}
      <div className="badge-light w-fit">
        <Compass size={12} strokeWidth={2} />
        Individual Portal · Career Guidance
      </div>

      <div>
        <h2 className="text-xl font-bold text-navy-900">Welcome Back</h2>
        <p className="text-sm text-slate-500 mt-0.5">Sign in to your career guidance account</p>
      </div>

      {/* Belongs-to Checklist */}
      <div className="rounded-xl p-4" style={{ background: 'rgba(30,58,138,0.04)', border: '1px solid rgba(30,58,138,0.08)' }}>
        <p className="text-xs font-semibold text-navy-700 mb-2.5">For individuals seeking:</p>
        <div className="space-y-1.5">
          {[
            'Personalized career roadmaps',
            'Mentorship & expert guidance',
            'Exam trackers & notifications',
            'Job preparation tools',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 size={13} strokeWidth={2} className="text-navy-700 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Email Address</label>
          <input
            id="seeker-email"
            type="email"
            placeholder="your@email.com"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Password</label>
          <div className="relative">
            <input
              id="seeker-password"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              className="input-field pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Current Stage</label>
          <div className="relative">
            <select
              id="seeker-stage"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="input-field appearance-none pr-8"
              required
            >
              <option value="">Select your stage...</option>
              {SEEKER_STAGES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" className="rounded accent-navy-700" />
            Remember me
          </label>
          <button type="button" className="text-xs text-navy-700 font-semibold hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          id="seeker-login-btn"
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-3 text-sm"
        >
          {loading ? (
            <><Loader2 size={15} className="animate-spin" /> Signing in...</>
          ) : (
            <>Sign In to Dashboard <ArrowRight size={15} strokeWidth={2} /></>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-slate-500">
        New here?{' '}
        <button className="text-navy-700 font-semibold hover:underline">
          Create free account
        </button>
      </p>
    </div>
  );
};

const PartnerLoginCard: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div
      id="partner-login-card"
      className="rounded-3xl p-7 flex flex-col gap-5"
      style={{
        background: 'rgba(10,25,47,0.90)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 12px 40px rgb(10,25,47,0.30)',
      }}
    >
      {/* Badge */}
      <div className="badge-dark w-fit">
        <ShieldCheck size={12} strokeWidth={2} />
        Institutional Portal · Partnership Hub
      </div>

      <div>
        <h2 className="text-xl font-bold text-white">Partner Sign In</h2>
        <p className="text-sm text-white/50 mt-0.5">Access your institutional dashboard</p>
      </div>

      {/* Belongs-to Block */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
      >
        <p className="text-xs font-semibold text-white/70 mb-2.5">For verified institutions:</p>
        <div className="space-y-1.5">
          {[
            'Post opportunities & recruit talent',
            'Host mentorship cohorts',
            'Access talent pipeline analytics',
            'Build institutional brand presence',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-white/60">
              <CheckCircle2 size={13} strokeWidth={2} className="text-blue-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="text-xs font-semibold text-white/60 block mb-1.5">Official Organization Email</label>
          <input
            id="partner-email"
            type="email"
            placeholder="admin@organization.com"
            className="input-field-dark"
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-white/60 block mb-1.5">Password</label>
          <div className="relative">
            <input
              id="partner-password"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              className="input-field-dark pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-white/60 block mb-1.5">Organization Category</label>
          <div className="relative">
            <select
              id="partner-category"
              className="input-field-dark appearance-none pr-8 w-full"
              required
            >
              <option value="">Select category...</option>
              {ORG_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id} style={{ background: '#0F172A' }}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-white/60 block mb-1.5">Organization ID</label>
          <input
            id="partner-org-id"
            type="text"
            placeholder="e.g. INST-2024-001"
            className="input-field-dark"
            required
          />
        </div>

        <button
          id="partner-login-btn"
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-navy-900 transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)' }}
        >
          {loading ? (
            <><Loader2 size={15} className="animate-spin" /> Verifying...</>
          ) : (
            <>Access Partner Portal <ArrowRight size={15} strokeWidth={2} /></>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-white/40">
        New institution?{' '}
        <button className="text-blue-400 font-semibold hover:text-blue-300">
          Apply for partnership
        </button>
      </p>
    </div>
  );
};

const AuthModal: React.FC<AuthModalProps> = ({
  onClose, onLoginSeeker, onLoginPartner, defaultPortal = 'seeker'
}) => {
  const [activePortal, setActivePortal] = useState<'seeker' | 'partner'>(defaultPortal);

  return (
    <div
      id="auth-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,25,47,0.45)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-5xl animate-scale-in">
        {/* Portal Switcher Header */}
        <div className="text-center mb-6">
          <button
            id="auth-close"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white mb-2">Which portal belongs to you?</h1>
          <p className="text-white/60 text-sm">Select your portal type to sign in</p>

          {/* Toggle Bar */}
          <div
            id="auth-portal-toggle"
            className="inline-flex items-center rounded-2xl p-1.5 gap-1 mt-5"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            <button
              id="auth-toggle-seeker"
              onClick={() => setActivePortal('seeker')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activePortal === 'seeker'
                  ? 'bg-white text-navy-900 shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Compass size={15} strokeWidth={2} />
              Career Guidance Login
            </button>
            <button
              id="auth-toggle-partner"
              onClick={() => setActivePortal('partner')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activePortal === 'partner'
                  ? 'gradient-navy text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Building2 size={15} strokeWidth={2} />
              Partnership Login
            </button>
          </div>
        </div>

        {/* Cards Side-by-Side on Desktop */}
        <div className="grid md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
          <div className={`transition-all duration-300 ${activePortal === 'seeker' ? 'ring-2 ring-white/40 rounded-3xl' : 'opacity-60 md:opacity-100'}`}>
            <SeekerLoginCard onLogin={onLoginSeeker} />
          </div>
          <div className={`transition-all duration-300 ${activePortal === 'partner' ? 'ring-2 ring-white/40 rounded-3xl' : 'opacity-60 md:opacity-100'}`}>
            <PartnerLoginCard onLogin={onLoginPartner} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
