import React, { useState } from 'react';
import {
  Building2, Bell, Users, Briefcase, TrendingUp,
  CheckCircle2, Star, ArrowRight, ChevronRight,
  BarChart3, Globe, Eye, Edit3, Plus, Filter,
  Shield, Award, LogOut, Settings, ChevronDown,
  Zap, Clock, Target, MessageSquare, Calendar,
  CalendarCheck, Crown, X, Check, AlertCircle, Save
} from 'lucide-react';

interface PartnerDashboardProps {
  onNavigate: (view: string) => void;
}

const PartnerDashboard: React.FC<PartnerDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'talent' | 'analytics' | 'mentorship'>('overview');

  // ── Mentor Availability State ──
  const [weeklyHours, setWeeklyHours] = useState<Record<string, { enabled: boolean; slots: string[] }>>({
    Mon: { enabled: true, slots: ['10:00', '11:00', '15:00'] },
    Tue: { enabled: true, slots: ['09:00', '14:00'] },
    Wed: { enabled: false, slots: [] },
    Thu: { enabled: true, slots: ['10:00', '16:00', '17:00'] },
    Fri: { enabled: true, slots: ['09:00', '11:00'] },
    Sat: { enabled: false, slots: [] },
    Sun: { enabled: false, slots: [] },
  });
  const [mentorCredsSaved, setMentorCredsSaved] = useState(false);

  const allottedMentees = [
    { name: 'Priya Sharma', init: 'PS', track: 'Employment', date: '2026-10-28', time: '10:00', duration: 30, status: 'confirmed' as const },
    { name: 'Arjun Mehta', init: 'AM', track: 'Higher Study', date: '2026-10-30', time: '14:00', duration: 30, status: 'pending' as const },
    { name: 'Kavya Nair', init: 'KN', track: 'Employment', date: '2026-10-25', time: '15:00', duration: 30, status: 'completed' as const },
    { name: 'Rohan Gupta', init: 'RG', track: 'Entrepreneur', date: '2026-11-02', time: '11:00', duration: 45, status: 'confirmed' as const },
  ];

  const SLOT_OPTIONS = ['09:00','10:00','11:00','14:00','15:00','16:00','17:00','19:00','20:00'];

  const toggleDay = (day: string) => {
    setWeeklyHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled, slots: !prev[day].enabled ? prev[day].slots : [] },
    }));
  };

  const toggleSlot = (day: string, slot: string) => {
    setWeeklyHours((prev) => {
      const cur = prev[day];
      const newSlots = cur.slots.includes(slot)
        ? cur.slots.filter((s) => s !== slot)
        : [...cur.slots, slot].sort();
      return { ...prev, [day]: { ...cur, slots: newSlots } };
    });
  };

  const jobPostings = [
    { title: 'Senior Software Engineer', dept: 'Engineering', applicants: 248, status: 'Active', match: 94, deadline: 'Nov 20' },
    { title: 'Product Manager', dept: 'Product', applicants: 89, status: 'Active', match: 87, deadline: 'Nov 25' },
    { title: 'Data Scientist', dept: 'Analytics', applicants: 167, status: 'Active', match: 91, deadline: 'Dec 1' },
    { title: 'UX Designer', dept: 'Design', applicants: 43, status: 'Draft', match: 88, deadline: 'Dec 5' },
  ];

  const topCandidates = [
    { name: 'Arjun M.', role: 'Applied: SWE', match: 97, skills: ['React', 'Node.js', 'AWS'], track: 'Employment', init: 'AM' },
    { name: 'Kavya N.', role: 'Applied: DS', match: 95, skills: ['Python', 'ML', 'Tableau'], track: 'Employment', init: 'KN' },
    { name: 'Rohan G.', role: 'Applied: PM', match: 92, skills: ['Product', 'Agile', 'SQL'], track: 'Employment', init: 'RG' },
    { name: 'Priya S.', role: 'Applied: SWE', match: 89, skills: ['TypeScript', 'Docker'], track: 'Employment', init: 'PS' },
  ];

  const cohortPrograms = [
    { title: 'Cloud Computing Bootcamp', enrolled: 34, capacity: 50, startDate: 'Nov 15', status: 'Open' },
    { title: 'Leadership Mentorship Q4', enrolled: 12, capacity: 15, startDate: 'Nov 8', status: 'Almost Full' },
    { title: 'AI/ML Certification Track', enrolled: 28, capacity: 40, startDate: 'Dec 1', status: 'Open' },
  ];

  return (
    <div className="min-h-screen">
      {/* Partner Dashboard Topbar — Navy Themed */}
      <div
        className="sticky top-16 z-40 px-4 sm:px-6 h-14 flex items-center justify-between"
        style={{
          background: 'rgba(10,25,47,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-3">
          <Building2 size={16} strokeWidth={2} className="text-blue-400" />
          <span className="text-sm font-semibold text-white">Partner Dashboard</span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.75)' }}
          >
            Hiring Company
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button id="partner-dash-notifications" className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Bell size={15} strokeWidth={2} className="text-white/70" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full" />
          </button>
          <button
            id="partner-dash-profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium text-white/80"
          >
            <div className="w-7 h-7 rounded-full bg-blue-500/30 border border-blue-400/30 flex items-center justify-center text-blue-300 text-[10px] font-bold">
              TC
            </div>
            TechCorp Inc.
            <ChevronDown size={12} />
          </button>
          <button
            id="partner-dash-logout"
            onClick={() => onNavigate('landing')}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors"
            title="Sign out"
          >
            <LogOut size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Partner Identity Banner */}
        <div
          className="rounded-3xl p-6 mb-8 text-white"
          style={{
            background: 'linear-gradient(135deg, #0A192F 0%, #0F172A 60%, #1E3A8A 100%)',
            boxShadow: '0 12px 40px rgb(10,25,47,0.25)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                TC
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">TechCorp Inc.</h2>
                  <div className="badge-dark">
                    <Shield size={10} /> Verified Partner
                  </div>
                </div>
                <p className="text-white/50 text-sm">Hiring Company · Est. 2018 · 2,400+ employees</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="btn-glass text-xs py-2">
                <Edit3 size={12} /> Edit Profile
              </button>
              <button className="btn-glass text-xs py-2">
                <Plus size={12} /> Post New Job
              </button>
            </div>
          </div>

          {/* Partner Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Active Postings', value: '8', icon: Briefcase },
              { label: 'Total Applicants', value: '1,247', icon: Users },
              { label: 'Hires This Quarter', value: '34', icon: Award },
              { label: 'Avg. Match Score', value: '91%', icon: Target },
            ].map(({ label, value, icon: Icon }, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Icon size={16} strokeWidth={2} className="text-blue-300 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-[11px] text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          id="partner-tabs"
          className="flex items-center gap-1 rounded-2xl p-1.5 mb-6 w-fit"
          style={{ background: 'rgba(15,23,42,0.06)', border: '1px solid rgba(15,23,42,0.08)' }}
        >
          {(['overview', 'jobs', 'talent', 'analytics', 'mentorship'] as const).map((tab) => (
            <button
              key={tab}
              id={`partner-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 capitalize ${activeTab === tab
                  ? 'gradient-navy text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {tab === 'jobs' ? 'Job Postings' : tab === 'talent' ? 'Talent Pipeline' : tab === 'mentorship' ? 'Mentor Panel' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recruitment Funnel */}
              <div className="lg:col-span-2 glass-light rounded-2xl p-6">
                <h3 className="text-base font-bold text-navy-900 mb-5 flex items-center gap-2">
                  <BarChart3 size={16} strokeWidth={2} className="text-navy-700" />
                  Recruitment Funnel — This Month
                </h3>
                <div className="space-y-3">
                  {[
                    { stage: 'Applications Received', count: 1247, pct: 100, color: '#0A192F' },
                    { stage: 'Profile Screened (NextStep Match)', count: 892, pct: 71, color: '#1E3A8A' },
                    { stage: 'Interview Invited', count: 234, pct: 19, color: '#3B5FC0' },
                    { stage: 'Offer Extended', count: 48, pct: 4, color: '#60A5FA' },
                    { stage: 'Hired', count: 34, pct: 2.7, color: '#93C5FD' },
                  ].map(({ stage, count, pct, color }) => (
                    <div key={stage}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 font-medium">{stage}</span>
                        <span className="text-navy-800 font-bold">{count.toLocaleString()} ({pct}%)</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <div className="glass-navy rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Zap size={14} strokeWidth={2} className="text-blue-300" />
                    Partner Actions
                  </h3>
                  <div className="space-y-2">
                    {[
                      { icon: Plus, label: 'Post New Opportunity', desc: 'Jobs, internships, events' },
                      { icon: MessageSquare, label: 'Host Mentorship Cohort', desc: 'Q1 2025 applications open' },
                      { icon: Globe, label: 'View Talent Pipeline', desc: '1,247 matched candidates' },
                      { icon: Eye, label: 'Campus Connect', desc: 'Partner with 850+ colleges' },
                    ].map(({ icon: Icon, label, desc }, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:bg-white/10"
                        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <Icon size={14} strokeWidth={2} className="text-blue-300" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">{label}</div>
                          <div className="text-[10px] text-white/40">{desc}</div>
                        </div>
                        <ChevronRight size={12} className="text-white/30 ml-auto shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Cohort Programs */}
            <div className="glass-light rounded-2xl p-6">
              <h3 className="text-base font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Users size={16} strokeWidth={2} className="text-navy-700" />
                Active Mentorship Cohorts
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {cohortPrograms.map((c, i) => (
                  <div
                    key={i}
                    id={`cohort-${i}`}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.6)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xs font-bold text-navy-900 leading-snug flex-1">{c.title}</h4>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0 ${c.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>Enrollment</span>
                        <span className="font-semibold">{c.enrolled}/{c.capacity}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full gradient-navy"
                          style={{ width: `${(c.enrolled / c.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock size={9} /> Starts {c.startDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Jobs Tab ── */}
        {activeTab === 'jobs' && (
          <div className="glass-light rounded-2xl p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-navy-900">Job Postings</h3>
              <div className="flex gap-2">
                <button className="btn-secondary text-xs py-2">
                  <Filter size={13} /> Filter
                </button>
                <button className="btn-primary text-xs py-2">
                  <Plus size={13} /> New Posting
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {jobPostings.map((job, i) => (
                <div
                  key={i}
                  id={`job-row-${i}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl hover:bg-slate-50/60 transition-colors"
                  style={{ border: '1px solid rgba(226,232,240,0.6)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-navy flex items-center justify-center">
                      <Briefcase size={16} strokeWidth={2} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">{job.title}</h4>
                      <p className="text-[11px] text-slate-500">{job.dept} · Closes {job.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <div className="text-center">
                      <div className="text-base font-bold text-navy-800">{job.applicants}</div>
                      <div className="text-[10px] text-slate-400">Applicants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-bold gradient-text-navy">{job.match}%</div>
                      <div className="text-[10px] text-slate-400">Avg Match</div>
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                      {job.status}
                    </span>
                    <div className="flex gap-2 ml-auto sm:ml-0">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                        <Eye size={14} strokeWidth={2} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                        <Edit3 size={14} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Talent Tab ── */}
        {activeTab === 'talent' && (
          <div className="animate-fade-in space-y-5">
            <div className="glass-light rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-navy-900">Matched Talent Pipeline</h3>
                <div className="badge-light">
                  <TrendingUp size={11} /> 1,247 total candidates
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topCandidates.map((c, i) => (
                  <div
                    key={i}
                    id={`candidate-${i}`}
                    className="rounded-2xl p-4 text-center hover:-translate-y-1 transition-all duration-300"
                    style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.6)' }}
                  >
                    <div className="w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white font-bold text-sm mx-auto mb-3">
                      {c.init}
                    </div>
                    <h4 className="text-sm font-bold text-navy-900">{c.name}</h4>
                    <p className="text-[11px] text-slate-500 mb-2">{c.role}</p>

                    {/* Match Score */}
                    <div
                      className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full mb-3 gradient-navy text-white"
                    >
                      <Star size={10} fill="currentColor" /> {c.match}% Match
                    </div>

                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {c.skills.map((s) => (
                        <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                    <button className="btn-primary text-[10px] px-3 py-1.5 w-full justify-center">
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Analytics Tab ── */}
        {activeTab === 'analytics' && (
          <div className="animate-fade-in space-y-5">
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { label: 'Candidate View Rate', value: '72%', delta: '+5% vs last month', icon: Eye },
                { label: 'Application Conversion', value: '18.7%', delta: '+2.3% vs last month', icon: TrendingUp },
                { label: 'Time to Hire (Avg)', value: '18 days', delta: '-4 days vs last month', icon: Clock },
              ].map(({ label, value, delta, icon: Icon }, i) => (
                <div key={i} className="glass-light rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl gradient-navy flex items-center justify-center">
                      <Icon size={15} strokeWidth={2} className="text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold gradient-text-navy mb-1">{value}</div>
                  <div className="text-sm text-slate-600 font-medium">{label}</div>
                  <div className="text-[11px] text-green-600 font-medium mt-1">{delta}</div>
                </div>
              ))}
            </div>

            <div className="glass-light rounded-2xl p-6">
              <h3 className="text-base font-bold text-navy-900 mb-5">Track-wise Application Distribution</h3>
              <div className="space-y-4">
                {[
                  { track: 'Employment Track', pct: 68, count: 849 },
                  { track: 'College Students', pct: 22, count: 274 },
                  { track: 'Higher Study', pct: 7, count: 87 },
                  { track: 'Entrepreneur', pct: 3, count: 37 },
                ].map(({ track, pct, count }) => (
                  <div key={track}>
                    <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                      <span className="font-medium">{track}</span>
                      <span className="font-bold text-navy-800">{count} ({pct}%)</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-navy transition-all duration-1000"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Mentorship Tab (Mentor Availability Dashboard) ── */}
        {activeTab === 'mentorship' && (
          <div className="animate-fade-in space-y-5">
            {/* Mentor Identity Card */}
            <div className="glass-light rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gradient-navy flex items-center justify-center text-white text-lg font-bold">TC</div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-base font-bold text-navy-900">TechCorp Mentors</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold gradient-navy text-white flex items-center gap-1">
                        <Shield size={9} /> Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Lead Mentor · Employment & Entrepreneur Tracks</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">5–8 yrs avg. experience · VP Engineering, Data Science Lead</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary text-xs py-2"><Edit3 size={12} /> Edit Credentials</button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {[
                  { label: 'Total Sessions', value: '89', icon: CalendarCheck },
                  { label: 'Rating', value: '4.8★', icon: Star },
                  { label: 'Active Mentees', value: '12', icon: Users },
                  { label: 'This Month', value: '6/8', icon: Calendar },
                ].map(({ label, value, icon: Icon }, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}>
                    <Icon size={14} strokeWidth={2} className="text-navy-700 mb-1.5" />
                    <div className="text-lg font-bold text-navy-900">{value}</div>
                    <div className="text-[10px] text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-5">
              {/* ── Weekly Availability Scheduler ── */}
              <div className="lg:col-span-3 glass-light rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl gradient-navy flex items-center justify-center">
                      <Calendar size={16} strokeWidth={2} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-900">Weekly Office Hours</h3>
                      <p className="text-[11px] text-slate-500">Set your recurring available slots</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setMentorCredsSaved(true); setTimeout(() => setMentorCredsSaved(false), 2000); }}
                    className={`text-xs py-2 px-4 rounded-xl font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                      mentorCredsSaved ? 'bg-green-500 text-white' : 'btn-primary'
                    }`}
                  >
                    {mentorCredsSaved ? <><CheckCircle2 size={13} /> Saved!</> : <><Save size={13} /> Save Schedule</>}
                  </button>
                </div>

                <div className="space-y-3">
                  {Object.entries(weeklyHours).map(([day, config]) => (
                    <div key={day} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: config.enabled ? 'rgba(248,250,252,0.8)' : 'rgba(248,250,252,0.4)', border: '1px solid rgba(226,232,240,0.5)' }}>
                      <button
                        onClick={() => toggleDay(day)}
                        className={`mt-0.5 w-9 h-5 rounded-full relative transition-all duration-300 shrink-0 ${config.enabled ? 'gradient-navy' : 'bg-slate-200'}`}
                        style={{ minWidth: 36, height: 20 }}
                      >
                        <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
                          style={{ left: config.enabled ? 18 : 2, top: 2, width: 16, height: 16 }} />
                      </button>
                      <div className="flex-1">
                        <p className={`text-xs font-bold mb-1.5 ${config.enabled ? 'text-navy-900' : 'text-slate-400'}`}>{day}</p>
                        {config.enabled && (
                          <div className="flex flex-wrap gap-1.5">
                            {SLOT_OPTIONS.map((slot) => {
                              const active = config.slots.includes(slot);
                              const h = parseInt(slot.split(':')[0]);
                              const ampm = h >= 12 ? 'PM' : 'AM';
                              const display = `${h % 12 || 12}:00 ${ampm}`;
                              return (
                                <button
                                  key={slot}
                                  onClick={() => toggleSlot(day, slot)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all duration-200 ${active
                                    ? 'gradient-navy text-white shadow-sm'
                                    : 'bg-white border border-slate-200 text-slate-500 hover:border-navy-700/30'
                                  }`}
                                >
                                  {display}
                                </button>
                              );
                            })}
                          </div>
                        )}
                        {!config.enabled && <p className="text-[10px] text-slate-400">Unavailable</p>}
                      </div>
                      <span className={`text-[10px] font-medium mt-0.5 shrink-0 ${config.enabled ? 'text-navy-700' : 'text-slate-400'}`}>
                        {config.slots.length} slot{config.slots.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Credentials & Qualifications ── */}
              <div className="lg:col-span-2 space-y-5">
                <div className="glass-light rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <Shield size={14} className="text-navy-700" /> Credentials
                  </h3>
                  <div className="space-y-2">
                    {[
                      'IIT Roorkee B.Tech CSE',
                      'Ex-Amazon SDE-3',
                      'VP Engineering, Razorpay',
                      'ICF Certified Coach',
                    ].map((cred, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}>
                        <CheckCircle2 size={12} strokeWidth={2} className="text-navy-700 shrink-0" />
                        <span className="text-xs text-slate-700 font-medium flex-1">{cred}</span>
                        <button className="text-[10px] text-slate-400 hover:text-red-500 transition-colors"><X size={10} /></button>
                      </div>
                    ))}
                    <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 hover:border-navy-700/30 hover:text-navy-700 transition-colors font-medium">
                      <Plus size={12} /> Add Credential
                    </button>
                  </div>
                </div>

                <div className="glass-light rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                    <Target size={14} className="text-navy-700" /> Track Expertise
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['Employment', 'Higher Study', 'Government', 'College', 'Entrepreneur'].map((t) => {
                      const active = ['Employment', 'Entrepreneur'].includes(t);
                      return (
                        <span key={t} className={`text-[10px] px-3 py-1 rounded-full font-semibold transition-all ${
                          active ? 'gradient-navy text-white' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {active && <Check size={9} className="inline mr-0.5" />} {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Allotted Mentees ── */}
            <div className="glass-light rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
                  <Users size={16} className="text-navy-700" /> Allotted Mentees
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(30,58,138,0.08)', color: '#1E3A8A' }}>
                  {allottedMentees.length} sessions
                </span>
              </div>
              <div className="space-y-3">
                {allottedMentees.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}>
                    <div className="w-10 h-10 rounded-full gradient-navy flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {m.init}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-navy-900">{m.name}</p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-2">
                        <span className="flex items-center gap-1"><Calendar size={9} /> {m.date}</span>
                        <span className="flex items-center gap-1"><Clock size={9} /> {m.time}</span>
                        <span>{m.duration} min</span>
                        <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{m.track}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                        m.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        m.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                      </span>
                      {m.status === 'pending' && (
                        <div className="flex gap-1">
                          <button className="text-[10px] px-2.5 py-1 rounded-lg gradient-navy text-white font-semibold">Accept</button>
                          <button className="text-[10px] px-2.5 py-1 rounded-lg border border-slate-200 text-slate-500 font-semibold hover:bg-slate-50">Reschedule</button>
                        </div>
                      )}
                      {m.status === 'confirmed' && (
                        <button className="text-[10px] px-2.5 py-1 rounded-lg border border-slate-200 text-slate-500 font-semibold hover:bg-slate-50">Reschedule</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDashboard;
