import React, { useState } from 'react';
import {
  Compass, Bell, BookOpen, Briefcase, GraduationCap, Landmark,
  Rocket, CheckCircle2, TrendingUp, Clock, Users, Star,
  Award, ArrowRight, ChevronRight, Target, Zap, FileText,
  Calendar, LogOut, Settings, ChevronDown, X, Download,
  Plus, Search, Mail, Phone, ExternalLink, Edit3, Save,
  User, Lock, Globe, ToggleLeft, Trash2, AlertCircle,
  Crown, CalendarCheck, Shield
} from 'lucide-react';
import { CAREER_TRACKS } from '../data/appData';
import {
  SAMPLE_BOOKINGS,
  type UserSubscription,
  type SubscriptionTier,
  type SessionBooking,
} from '../data/subscriptionData';
import SubscriptionPricing from './SubscriptionPricing';
import MentorAllocation from './MentorAllocation';

interface SeekerDashboardProps {
  onNavigate: (view: string) => void;
}

type QuickActionPanel = 'resume' | 'calendar' | 'mentor' | 'settings' | null;

const iconMap: Record<string, React.FC<any>> = {
  Briefcase, GraduationCap, Landmark, BookOpen, Rocket,
};

const TrackIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 18 }) => {
  const Icon = iconMap[name] || Briefcase;
  return <Icon size={size} strokeWidth={1.75} />;
};

// ─── Resume Builder Panel ───────────────────────────────────────────────────
const ResumeBuilderPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [score, setScore] = useState(72);
  const sections = [
    { label: 'Contact Info', status: 'complete', score: 100 },
    { label: 'Work Experience', status: 'complete', score: 90 },
    { label: 'Education', status: 'complete', score: 100 },
    { label: 'Skills', status: 'partial', score: 65 },
    { label: 'Projects', status: 'partial', score: 50 },
    { label: 'Certifications', status: 'missing', score: 0 },
    { label: 'Summary / Objective', status: 'missing', score: 0 },
  ];

  return (
    <div className="glass-light rounded-2xl p-6 animate-scale-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-navy flex items-center justify-center">
            <FileText size={16} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-navy-900">Resume Builder</h3>
            <p className="text-xs text-slate-500">ATS-optimised score tracker</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      {/* ATS Score Ring */}
      <div className="flex items-center gap-4 p-4 rounded-xl mb-5" style={{ background: 'rgba(30,58,138,0.04)', border: '1px solid rgba(30,58,138,0.08)' }}>
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
            <circle
              cx="18" cy="18" r="14" fill="none"
              stroke="#1E3A8A" strokeWidth="3.5"
              strokeDasharray={`${score * 87.96 / 100} 87.96`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-navy-900">{score}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-navy-900">ATS Match Score</p>
          <p className="text-xs text-slate-500 mt-0.5">Add certifications & summary to reach 90%+</p>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">Needs Improvement</span>
          </div>
        </div>
      </div>

      {/* Section Checklist */}
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Resume Sections</p>
      <div className="space-y-2 mb-5">
        {sections.map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              s.status === 'complete' ? 'gradient-navy' :
              s.status === 'partial' ? 'bg-amber-100' : 'bg-slate-100'
            }`}>
              {s.status === 'complete' && <CheckCircle2 size={11} strokeWidth={2.5} className="text-white" />}
              {s.status === 'partial' && <AlertCircle size={11} strokeWidth={2} className="text-amber-600" />}
              {s.status === 'missing' && <Plus size={11} strokeWidth={2.5} className="text-slate-400" />}
            </div>
            <span className="text-xs font-medium text-slate-700 flex-1">{s.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full gradient-navy" style={{ width: `${s.score}%` }} />
              </div>
              <span className="text-[10px] text-slate-400 w-8 text-right">{s.score}%</span>
            </div>
            <button className="text-[10px] text-navy-700 font-semibold hover:underline ml-1">
              {s.status === 'missing' ? 'Add' : 'Edit'}
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="btn-primary flex-1 justify-center text-xs py-2.5">
          <Download size={13} strokeWidth={2} /> Download PDF
        </button>
        <button className="btn-secondary text-xs py-2.5 px-4">
          <ExternalLink size={13} strokeWidth={2} /> Share Link
        </button>
      </div>
    </div>
  );
};

// ─── Exam Calendar Panel ─────────────────────────────────────────────────────
const ExamCalendarPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [filter, setFilter] = useState('all');

  const exams = [
    { name: 'UPSC CSE Prelims 2025', date: 'Nov 18, 2026', type: 'govt', daysLeft: 26, status: 'open', link: '#' },
    { name: 'GATE 2026', date: 'Feb 1, 2027', type: 'higher', daysLeft: 100, status: 'open', link: '#' },
    { name: 'SSC CGL Tier I', date: 'Dec 5, 2026', type: 'govt', daysLeft: 43, status: 'open', link: '#' },
    { name: 'CAT 2026', date: 'Nov 24, 2026', type: 'higher', daysLeft: 32, status: 'open', link: '#' },
    { name: 'IBPS PO Mains', date: 'Nov 30, 2026', type: 'govt', daysLeft: 38, status: 'notified', link: '#' },
    { name: 'GRE General', date: 'Ongoing', type: 'higher', daysLeft: 0, status: 'anytime', link: '#' },
  ];

  const filtered = filter === 'all' ? exams : exams.filter((e) => e.type === filter);

  return (
    <div className="glass-light rounded-2xl p-6 animate-scale-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-navy flex items-center justify-center">
            <Calendar size={16} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-navy-900">Exam Calendar</h3>
            <p className="text-xs text-slate-500">Upcoming notifications & deadlines</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl" style={{ background: 'rgba(15,23,42,0.05)' }}>
        {[{ id: 'all', label: 'All Exams' }, { id: 'govt', label: 'Govt / PSC' }, { id: 'higher', label: 'Higher Study' }].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              filter === f.id ? 'bg-white text-navy-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {filtered.map((exam, i) => (
          <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
              exam.type === 'govt' ? 'gradient-navy text-white' : 'bg-slate-100 text-navy-700'
            }`}>
              {exam.daysLeft > 0 ? exam.daysLeft : '∞'}
              {exam.daysLeft > 0 && <span className="text-[8px] ml-0.5">d</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-navy-900 truncate">{exam.name}</p>
              <p className="text-[10px] text-slate-500 flex items-center gap-1">
                <Clock size={9} strokeWidth={2} /> {exam.date}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                exam.status === 'open' ? 'bg-green-100 text-green-700' :
                exam.status === 'notified' ? 'bg-blue-100 text-blue-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {exam.status === 'open' ? 'Apply' : exam.status === 'notified' ? 'Notified' : 'Anytime'}
              </span>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                <Bell size={12} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 btn-primary w-full justify-center text-xs py-2.5">
        <Bell size={13} strokeWidth={2} /> Enable All Alerts
      </button>
    </div>
  );
};

// ─── Find Mentor Panel ───────────────────────────────────────────────────────
const FindMentorPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [booked, setBooked] = useState<number[]>([]);

  const mentors = [
    { name: 'Dr. Anita Rao', role: 'Data Science Lead', org: 'IIT Bombay', rating: 4.9, sessions: 124, track: 'Employment', init: 'AR', available: true },
    { name: 'Vikram Singh', role: 'VP Engineering', org: 'Razorpay', rating: 4.8, sessions: 89, track: 'Employment', init: 'VS', available: true },
    { name: 'Meera Iyer', role: 'IAS 2022 Topper', org: 'UPSC Mentor', rating: 4.9, sessions: 210, track: 'Govt', init: 'MI', available: false },
    { name: 'Suresh Nair', role: 'Founder & CEO', org: 'AgriTech Startup', rating: 4.7, sessions: 56, track: 'Entrepreneur', init: 'SN', available: true },
    { name: 'Priya Mehta', role: 'PhD Advisor', org: 'Stanford CS', rating: 4.9, sessions: 180, track: 'Higher Study', init: 'PM', available: true },
  ];

  const filtered = mentors.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.track.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-light rounded-2xl p-6 animate-scale-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-navy flex items-center justify-center">
            <Users size={16} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-navy-900">Find a Mentor</h3>
            <p className="text-xs text-slate-500">14,000+ verified experts available</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, role, or track…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9 text-xs"
        />
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {filtered.map((m, i) => (
          <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}>
            <div className="w-10 h-10 rounded-full gradient-navy flex items-center justify-center text-white text-xs font-bold shrink-0">
              {m.init}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-navy-900">{m.name}</p>
                {m.available ? (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">Available</span>
                ) : (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">Busy</span>
                )}
              </div>
              <p className="text-[10px] text-slate-500">{m.role} · {m.org}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-0.5 text-[10px] text-amber-500 font-semibold">
                  <Star size={9} fill="currentColor" /> {m.rating}
                </span>
                <span className="text-[10px] text-slate-400">{m.sessions} sessions</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{m.track}</span>
              </div>
            </div>
            <button
              onClick={() => setBooked((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])}
              className={`text-[10px] px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 shrink-0 ${
                booked.includes(i)
                  ? 'bg-green-100 text-green-700'
                  : m.available
                  ? 'btn-primary py-1.5 px-3'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              disabled={!m.available && !booked.includes(i)}
            >
              {booked.includes(i) ? '✓ Booked' : m.available ? 'Book' : 'Notify Me'}
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-slate-400 py-8">No mentors found for "{search}"</p>
        )}
      </div>
    </div>
  );
};

// ─── Settings Panel ──────────────────────────────────────────────────────────
const SettingsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [notifs, setNotifs] = useState(true);
  const [emails, setEmails] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle: React.FC<{ value: boolean; onChange: (v: boolean) => void }> = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5.5 rounded-full transition-all duration-300 ${value ? 'gradient-navy' : 'bg-slate-200'}`}
      style={{ width: 40, height: 22 }}
    >
      <div
        className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-all duration-300`}
        style={{ width: 18, height: 18, left: value ? 20 : 2, top: 2 }}
      />
    </button>
  );

  return (
    <div className="glass-light rounded-2xl p-6 animate-scale-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-navy flex items-center justify-center">
            <Settings size={16} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-navy-900">Settings</h3>
            <p className="text-xs text-slate-500">Account & notification preferences</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-5">
        {/* Profile */}
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Profile</p>
          <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}>
            <div className="w-12 h-12 rounded-2xl gradient-navy flex items-center justify-center text-white font-bold text-base shrink-0">PS</div>
            <div className="flex-1">
              <input defaultValue="Priya Sharma" className="input-field text-xs mb-1.5 py-2" />
              <input defaultValue="priya.sharma@email.com" className="input-field text-xs py-2" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Notifications</p>
          <div className="space-y-2.5">
            {[
              { label: 'Push Notifications', desc: 'Job matches, exam alerts', value: notifs, set: setNotifs },
              { label: 'Email Digest', desc: 'Weekly career summary', value: emails, set: setEmails },
              { label: 'Dark Mode Preview', desc: 'Toggle interface theme', value: darkMode, set: setDarkMode },
            ].map(({ label, desc, value, set }) => (
              <div key={label} className="flex items-center justify-between p-3.5 rounded-xl" style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}>
                <div>
                  <p className="text-xs font-semibold text-navy-900">{label}</p>
                  <p className="text-[10px] text-slate-400">{desc}</p>
                </div>
                <Toggle value={value} onChange={set} />
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Account</p>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-medium">
              <Lock size={12} strokeWidth={2} /> Change Password
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2.5 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition-colors font-medium">
              <Trash2 size={12} strokeWidth={2} /> Delete Account
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
          saved ? 'bg-green-500 text-white' : 'btn-primary'
        }`}
        style={saved ? {} : { background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)' }}
      >
        {saved ? <><CheckCircle2 size={15} /> Saved!</> : <><Save size={15} strokeWidth={2} /> Save Changes</>}
      </button>
    </div>
  );
};

// ─── Main Dashboard ──────────────────────────────────────────────────────────
const SeekerDashboard: React.FC<SeekerDashboardProps> = ({ onNavigate }) => {
  const [activeTrack, setActiveTrack] = useState('employment');
  const [profileOpen, setProfileOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<QuickActionPanel>(null);

  // ── Subscription & Mentorship State ──
  const [subscription, setSubscription] = useState<UserSubscription>({
    tier: 'pro',
    sessionsRemaining: 2,
    totalSessionsPerMonth: 2,
    sessionDurationMinutes: 30,
    renewalDate: 'Nov 15, 2026',
    bookingWindowDays: 7,
  });
  const [bookings, setBookings] = useState<SessionBooking[]>(SAMPLE_BOOKINGS);
  const [showPricing, setShowPricing] = useState(false);
  const [showAllocation, setShowAllocation] = useState(false);

  const handleSelectPlan = (tier: SubscriptionTier) => {
    const planMap: Record<SubscriptionTier, Partial<UserSubscription>> = {
      free:  { tier: 'free', sessionsRemaining: 0, totalSessionsPerMonth: 0, sessionDurationMinutes: 0, bookingWindowDays: 0 },
      pro:   { tier: 'pro', sessionsRemaining: 2, totalSessionsPerMonth: 2, sessionDurationMinutes: 30, bookingWindowDays: 7 },
      elite: { tier: 'elite', sessionsRemaining: 4, totalSessionsPerMonth: 4, sessionDurationMinutes: 45, bookingWindowDays: 21 },
    };
    setSubscription((prev) => ({ ...prev, ...planMap[tier] }));
    setShowPricing(false);
  };

  const handleBookSession = (booking: SessionBooking) => {
    setBookings((prev) => [booking, ...prev]);
    setSubscription((prev) => ({ ...prev, sessionsRemaining: Math.max(0, prev.sessionsRemaining - 1) }));
  };

  const track = CAREER_TRACKS.find((t) => t.id === activeTrack) || CAREER_TRACKS[0];

  const notifications = [
    { id: 1, text: 'Google SWE Internship — Application deadline in 3 days', type: 'urgent', time: '2h ago' },
    { id: 2, text: 'UPSC Prelims 2025 notification released', type: 'info', time: '5h ago' },
    { id: 3, text: 'Your mentor Dr. Anita Rao confirmed a session for tomorrow', type: 'success', time: '1d ago' },
  ];

  const upcomingTasks = [
    { task: 'Complete Phase 2 of Employment Roadmap', due: 'Nov 5', done: false },
    { task: 'Submit SOP draft for Stanford MS CS', due: 'Nov 10', done: true },
    { task: 'Take GATE mock test #3', due: 'Nov 12', done: false },
    { task: 'Update LinkedIn with new project', due: 'Nov 15', done: false },
  ];

  const quickActions = [
    { icon: FileText, label: 'Resume Builder', id: 'resume' as QuickActionPanel, desc: 'ATS Score: 72%' },
    { icon: Calendar, label: 'Exam Calendar', id: 'calendar' as QuickActionPanel, desc: '3 exams upcoming' },
    { icon: Users, label: 'Find Mentor', id: 'mentor' as QuickActionPanel, desc: '12 matches available' },
    { icon: Settings, label: 'Settings', id: 'settings' as QuickActionPanel, desc: 'Profile & preferences' },
  ];

  return (
    <div className="min-h-screen">
      {/* Dashboard Topbar */}
      <div className="glass-navbar px-3 sm:px-6 h-14 flex items-center justify-between sticky top-16 z-40">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Compass size={16} strokeWidth={2} className="text-navy-700 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-navy-800 truncate">Seeker Dashboard</span>
          <span
            className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0"
            style={{ background: 'rgba(30,58,138,0.08)', color: '#1E3A8A' }}
          >
            Job Seeker Stage
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button id="dash-notifications" className="relative p-2 rounded-lg hover:bg-white/60 transition-colors">
            <Bell size={15} strokeWidth={2} className="text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-navy-700 rounded-full" />
          </button>
          <button
            id="dash-profile"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-xl hover:bg-white/60 transition-colors text-sm font-medium text-navy-800"
          >
            <div className="w-7 h-7 rounded-full gradient-navy flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              PS
            </div>
            <span className="hidden sm:inline">Priya S.</span>
            <ChevronDown size={12} className="hidden sm:block" />
          </button>
          <button
            id="dash-logout"
            onClick={() => onNavigate('landing')}
            className="p-2 rounded-lg hover:bg-white/60 text-slate-500 hover:text-slate-700 transition-colors"
            title="Sign out"
          >
            <LogOut size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* ── Left Sidebar ── */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Profile Summary Card */}
            <div className="glass-light rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl gradient-navy flex items-center justify-center text-white font-bold text-base">
                  PS
                </div>
                <div>
                  <div className="text-sm font-bold text-navy-900">Priya Sharma</div>
                  <div className="text-[11px] text-slate-500">Job Seeker · B.Tech CS</div>
                </div>
              </div>
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Profile Strength</span>
                    <span className="font-semibold text-navy-700">78%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full gradient-navy" style={{ width: '78%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Employment Roadmap</span>
                    <span className="font-semibold text-navy-700">Phase 2</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full gradient-navy" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Subscription Status Card ── */}
            <div
              id="subscription-status-card"
              className="rounded-2xl p-4"
              style={
                subscription.tier === 'elite'
                  ? { background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 100%)', border: '1px solid rgba(255,255,255,0.10)' }
                  : subscription.tier === 'pro'
                    ? { background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.15)' }
                    : { background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.6)' }
              }
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                  subscription.tier === 'elite' ? 'text-blue-300' : subscription.tier === 'pro' ? 'text-navy-700' : 'text-slate-400'
                }`}>
                  {subscription.tier === 'elite' && <Crown size={10} />}
                  {subscription.tier === 'pro' && <Zap size={10} />}
                  {subscription.tier.toUpperCase()} PLAN
                </span>
                <button
                  onClick={() => setShowPricing(true)}
                  className={`text-[10px] font-semibold hover:underline ${
                    subscription.tier === 'elite' ? 'text-blue-300' : 'text-navy-700'
                  }`}
                >
                  {subscription.tier === 'free' ? 'Upgrade' : 'Manage'}
                </button>
              </div>

              {subscription.tier !== 'free' ? (
                <>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-medium ${subscription.tier === 'elite' ? 'text-white/70' : 'text-slate-600'}`}>Sessions Left</span>
                    <span className={`text-xs font-bold ${subscription.tier === 'elite' ? 'text-white' : 'text-navy-900'}`}>
                      {subscription.sessionsRemaining}/{subscription.totalSessionsPerMonth}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: subscription.tier === 'elite' ? 'rgba(255,255,255,0.12)' : '#E2E8F0' }}>
                    <div className="h-full rounded-full" style={{
                      width: `${(subscription.sessionsRemaining / subscription.totalSessionsPerMonth) * 100}%`,
                      background: subscription.tier === 'elite' ? 'linear-gradient(90deg,#60A5FA,#93C5FD)' : 'linear-gradient(135deg, #0F172A, #1E3A8A)',
                    }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] ${subscription.tier === 'elite' ? 'text-white/40' : 'text-slate-400'}`}>
                      {subscription.sessionDurationMinutes} min · {subscription.bookingWindowDays}d window
                    </span>
                    <span className={`text-[10px] ${subscription.tier === 'elite' ? 'text-white/40' : 'text-slate-400'}`}>
                      Renews {subscription.renewalDate}
                    </span>
                  </div>
                  <button
                    id="sidebar-book-session"
                    onClick={() => setShowAllocation(true)}
                    className={`mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold transition-all duration-200 ${
                      subscription.tier === 'elite'
                        ? 'bg-white/15 text-white hover:bg-white/20 border border-white/15'
                        : 'gradient-navy text-white'
                    }`}
                  >
                    <CalendarCheck size={12} /> Book a Session
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[11px] text-slate-500 mb-2">Upgrade to unlock 1-on-1 mentorship sessions</p>
                  <button
                    onClick={() => setShowPricing(true)}
                    className="w-full btn-primary text-[10px] justify-center py-2"
                  >
                    <Crown size={11} /> View Plans
                  </button>
                </>
              )}
            </div>

            {/* Track Selector */}
            <div className="glass-light rounded-2xl p-4">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">My Tracks</p>
              <div className="space-y-1">
                {CAREER_TRACKS.map((t) => (
                  <button
                    key={t.id}
                    id={`sidebar-track-${t.id}`}
                    onClick={() => { setActiveTrack(t.id); setActivePanel(null); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTrack === t.id
                        ? 'gradient-navy text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <TrackIcon name={t.icon} size={15} />
                    {t.title}
                    {activeTrack === t.id && <ChevronRight size={13} className="ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Quick Actions (NOW INTERACTIVE) ── */}
            <div className="glass-light rounded-2xl p-4">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</p>
              <div className="space-y-1">
                {quickActions.map(({ icon: Icon, label, id, desc }) => (
                  <button
                    key={label}
                    id={`quick-action-${id}`}
                    onClick={() => setActivePanel(activePanel === id ? null : id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                      activePanel === id
                        ? 'gradient-navy text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-navy-800'
                    }`}
                  >
                    <Icon
                      size={14}
                      strokeWidth={2}
                      className={activePanel === id ? 'text-white' : 'text-slate-400 group-hover:text-navy-700 transition-colors'}
                    />
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{label}</div>
                      <div className={`text-[10px] leading-tight ${activePanel === id ? 'text-white/70' : 'text-slate-400'}`}>
                        {desc}
                      </div>
                    </div>
                    <ChevronRight
                      size={12}
                      className={`transition-transform duration-200 shrink-0 ${activePanel === id ? 'rotate-90 text-white/70' : 'text-slate-300 group-hover:text-slate-500'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="lg:col-span-3 space-y-6">

            {/* ── Quick Action Panels (slide in above main content) ── */}
            {activePanel === 'resume' && <ResumeBuilderPanel onClose={() => setActivePanel(null)} />}
            {activePanel === 'calendar' && <ExamCalendarPanel onClose={() => setActivePanel(null)} />}
            {activePanel === 'mentor' && <FindMentorPanel onClose={() => setActivePanel(null)} />}
            {activePanel === 'settings' && <SettingsPanel onClose={() => setActivePanel(null)} />}

            {/* Welcome Banner */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Good morning 👋</p>
                  <h2 className="text-xl font-bold mb-2">Continue Your {track.title} Journey</h2>
                  <p className="text-white/60 text-sm">
                    You're 45% through Phase 2 — Skill Building &amp; Certification. Keep it up!
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15" fill="none"
                        stroke="white" strokeWidth="3"
                        strokeDasharray={`${45 * 94.2 / 100} 94.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">45%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <button className="btn-glass text-xs py-2">Continue Roadmap <ArrowRight size={12} /></button>
                <button className="btn-glass text-xs py-2">View All Tasks</button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Jobs Matched', value: '34', icon: Briefcase, delta: '+8 today' },
                { label: 'Mentors Available', value: '12', icon: Users, delta: 'Near you' },
                { label: 'Exams Upcoming', value: '3', icon: Clock, delta: 'Next: Nov 18' },
                { label: 'Skills Completed', value: '7/12', icon: Award, delta: '5 remaining' },
              ].map(({ label, value, icon: Icon, delta }, i) => (
                <div key={i} className="glass-light rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon size={15} strokeWidth={2} className="text-navy-700" />
                    <span className="text-[10px] text-slate-400">{delta}</span>
                  </div>
                  <div className="text-xl font-bold text-navy-900">{value}</div>
                  <div className="text-[11px] text-slate-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Active Track Roadmap */}
            <div className="glass-light rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl gradient-navy flex items-center justify-center text-white">
                    <TrackIcon name={track.icon} size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900">{track.title} Roadmap</h3>
                    <p className="text-xs text-slate-500">{track.subtitle}</p>
                  </div>
                </div>
                <button id="view-full-roadmap" className="text-xs text-navy-700 font-semibold hover:underline flex items-center gap-1">
                  Full View <ChevronRight size={12} />
                </button>
              </div>

              <div className="relative space-y-1">
                {track.roadmap.map((step, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i < track.roadmap.length - 1 && (
                      <div className="absolute left-4 top-9 bottom-0 w-px bg-gradient-to-b from-slate-200 to-transparent" />
                    )}
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                        i === 0 ? 'gradient-navy text-white' :
                        i === 1 ? 'bg-navy-700/20 text-navy-700' :
                        'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {i < 1 ? <CheckCircle2 size={14} strokeWidth={2} /> : i + 1}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-semibold text-navy-700">{step.phase}</span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock size={9} /> {step.duration}
                        </span>
                        {i === 0 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">COMPLETE</span>
                        )}
                        {i === 1 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">IN PROGRESS</span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-navy-900 mb-0.5">{step.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Column Section */}
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Notifications */}
              <div className="glass-light rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
                    <Bell size={14} strokeWidth={2} className="text-navy-700" /> Notifications
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full gradient-navy text-white font-semibold">3 New</span>
                </div>
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`rounded-xl p-3 text-xs ${
                        n.type === 'urgent' ? 'bg-red-50 border border-red-100' :
                        n.type === 'success' ? 'bg-green-50 border border-green-100' :
                        'bg-slate-50 border border-slate-100'
                      }`}
                    >
                      <p className="text-slate-700 font-medium leading-snug mb-1">{n.text}</p>
                      <p className="text-slate-400">{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="glass-light rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
                    <Target size={14} strokeWidth={2} className="text-navy-700" /> Tasks &amp; Deadlines
                  </h3>
                  <button className="text-[10px] text-navy-700 font-semibold hover:underline">+ Add</button>
                </div>
                <div className="space-y-2.5">
                  {upcomingTasks.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          item.done ? 'gradient-navy border-navy-700' : 'border-slate-300'
                        }`}
                      >
                        {item.done && <CheckCircle2 size={11} strokeWidth={2.5} className="text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${item.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                          {item.task}
                        </p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar size={9} /> Due {item.due}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Mentorship Sessions & Booking History ── */}
            <div className="glass-light rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
                  <CalendarCheck size={14} strokeWidth={2} className="text-navy-700" /> Mentorship Sessions
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPricing(true)}
                    className={`text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
                      subscription.tier === 'elite'
                        ? 'gradient-navy text-white'
                        : subscription.tier === 'pro'
                          ? 'bg-navy-700/10 text-navy-700'
                          : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {subscription.tier === 'elite' && <Crown size={9} />}
                    {subscription.tier === 'pro' && <Zap size={9} />}
                    {subscription.tier.toUpperCase()}
                  </button>
                  <button
                    id="open-allocation-engine"
                    onClick={() => setShowAllocation(true)}
                    className="btn-primary text-[10px] py-1.5 px-3"
                  >
                    <Users size={11} /> Book Session
                  </button>
                </div>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {bookings.map((b) => (
                    <div
                      key={b.bookingId}
                      className="flex items-center gap-3 p-3.5 rounded-xl"
                      style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}
                    >
                      <div className="w-10 h-10 rounded-xl gradient-navy flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {b.mentorInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-navy-900">{b.mentorName}</p>
                        <p className="text-[10px] text-slate-500 flex items-center gap-2">
                          <span className="flex items-center gap-1"><Calendar size={9} /> {b.scheduledDate}</span>
                          <span className="flex items-center gap-1"><Clock size={9} /> {b.scheduledTime}</span>
                          <span>{b.durationMinutes} min</span>
                        </p>
                        {b.notes && <p className="text-[10px] text-slate-400 mt-0.5 truncate">{b.notes}</p>}
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        b.status === 'completed' ? 'bg-slate-100 text-slate-500' :
                        b.status === 'rescheduled' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <Users size={20} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No sessions yet</p>
                  <p className="text-xs text-slate-400">Book your first 1-on-1 mentorship session</p>
                </div>
              )}
            </div>

            {/* Recommended Mentors */}
            <div className="glass-light rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
                  <Users size={14} strokeWidth={2} className="text-navy-700" /> Recommended Mentors
                </h3>
                <button
                  onClick={() => setShowAllocation(true)}
                  className="text-[10px] text-navy-700 font-semibold hover:underline"
                >
                  Browse All
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { name: 'Dr. Anita Rao', role: 'Data Science Lead', org: 'Google DeepMind', rating: 4.9, sessions: 124, init: 'AR', badge: 'Lead' },
                  { name: 'Vikram Singh', role: 'VP Engineering', org: 'Razorpay', rating: 4.8, sessions: 89, init: 'VS', badge: 'Lead' },
                  { name: 'Sneha Desai', role: 'IAS Officer', org: 'UPSC CSE AIR 78', rating: 4.9, sessions: 67, init: 'SD', badge: 'Associate' },
                ].map((m, i) => (
                  <div
                    key={i}
                    id={`mentor-card-${i}`}
                    className="rounded-xl p-3 text-center hover:-translate-y-0.5 transition-transform"
                    style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.6)' }}
                  >
                    <div className="w-10 h-10 rounded-full gradient-navy flex items-center justify-center text-white text-xs font-bold mx-auto mb-2">
                      {m.init}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <span className="text-xs font-bold text-navy-900">{m.name}</span>
                      <Shield size={10} strokeWidth={2.5} className="text-navy-700" />
                    </div>
                    <div className="text-[10px] text-slate-500">{m.role}</div>
                    <div className="text-[10px] text-slate-400 mb-1.5">{m.org}</div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(30,58,138,0.08)', color: '#1E3A8A' }}>
                      {m.badge} Mentor
                    </span>
                    <div className="flex items-center justify-center gap-2 text-[10px] my-2">
                      <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                        <Star size={9} fill="currentColor" /> {m.rating}
                      </span>
                      <span className="text-slate-400">{m.sessions} sessions</span>
                    </div>
                    <button
                      onClick={() => setShowAllocation(true)}
                      className="btn-primary text-[10px] px-3 py-1.5 w-full justify-center"
                    >
                      Book Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── Subscription Pricing Modal ── */}
      {showPricing && (
        <SubscriptionPricing
          currentSubscription={subscription}
          onSelectPlan={handleSelectPlan}
          onClose={() => setShowPricing(false)}
        />
      )}

      {/* ── Mentor Allocation Engine Modal ── */}
      {showAllocation && (
        <MentorAllocation
          subscription={subscription}
          bookings={bookings}
          onBook={handleBookSession}
          onUpgrade={() => { setShowAllocation(false); setShowPricing(true); }}
          onClose={() => setShowAllocation(false)}
        />
      )}
    </div>
  );
};

export default SeekerDashboard;
