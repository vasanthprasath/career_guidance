import React, { useState, useMemo } from 'react';
import {
  X, Search, Star, Shield, CheckCircle2, Clock, Calendar,
  ArrowRight, ChevronRight, Lock, Zap, Crown, Users,
  Filter, ChevronDown, Sparkles, Bell, MapPin, Award,
  AlertCircle, CalendarCheck, Globe, Shuffle, Check
} from 'lucide-react';
import {
  MENTOR_POOL,
  SENIORITY_CONFIG,
  type MentorProfile,
  type MentorSlot,
  type UserSubscription,
  type SubscriptionTier,
  type SeniorityLevel,
  type SessionBooking,
} from '../data/subscriptionData';
import { CAREER_TRACKS } from '../data/appData';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const canAccessMentor = (sub: UserSubscription, mentor: MentorProfile): boolean =>
  mentor.eligibleTiers.includes(sub.tier);

const formatDate = (iso: string): string => {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};

const formatTime12 = (t: string): string => {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface MentorAllocationProps {
  subscription: UserSubscription;
  bookings: SessionBooking[];
  onBook: (booking: SessionBooking) => void;
  onUpgrade: () => void;
  onClose: () => void;
}

// ─── Mentor Card ──────────────────────────────────────────────────────────────
const MentorCard: React.FC<{
  mentor: MentorProfile;
  locked: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onUpgrade: () => void;
}> = ({ mentor, locked, isSelected, onSelect, onUpgrade }) => {
  const senCfg = SENIORITY_CONFIG[mentor.seniority];

  return (
    <button
      id={`mentor-alloc-${mentor.id}`}
      onClick={locked ? onUpgrade : onSelect}
      className={`relative w-full text-left rounded-2xl p-4 transition-all duration-300 group ${
        isSelected
          ? 'ring-2 ring-navy-700 shadow-card-hover -translate-y-0.5'
          : locked
            ? 'opacity-70'
            : 'hover:-translate-y-0.5 hover:shadow-card-hover'
      }`}
      style={{
        background: locked ? 'rgba(248,250,252,0.5)' : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(24px)',
        border: isSelected ? '1.5px solid #1E3A8A' : '1px solid rgba(226,232,240,0.80)',
      }}
    >
      {/* Lock Overlay */}
      {locked && (
        <div className="absolute inset-0 rounded-2xl z-10 flex flex-col items-center justify-center"
          style={{ background: 'rgba(248,250,252,0.60)', backdropFilter: 'blur(4px)' }}
        >
          <Lock size={20} strokeWidth={2} className="text-slate-400 mb-2" />
          <p className="text-xs font-semibold text-slate-500 text-center px-4">
            Upgrade to <span className="text-navy-700">Elite</span> to unlock
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onUpgrade(); }}
            className="mt-2 text-[10px] px-3 py-1 rounded-full gradient-navy text-white font-semibold"
          >
            Upgrade <ArrowRight size={10} className="inline" />
          </button>
        </div>
      )}

      <div className={locked ? 'blur-[2px]' : ''}>
        {/* Top Row */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: `linear-gradient(135deg, ${mentor.colorFrom}, ${mentor.colorTo})` }}
          >
            {mentor.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-navy-900 truncate">{mentor.name}</h4>
              {mentor.verified && (
                <Shield size={12} strokeWidth={2.5} className="text-navy-700 shrink-0" />
              )}
              {mentor.isOnline && (
                <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" title="Online" />
              )}
            </div>
            <p className="text-[11px] text-slate-500 truncate">{mentor.role} · {mentor.organization}</p>
          </div>
        </div>

        {/* Seniority + Exp Badge */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ background: senCfg.bg, color: senCfg.color }}
          >
            {senCfg.label} · {mentor.yearsExp} yrs
          </span>
          {mentor.tracks.map((t) => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium capitalize">
              {t.replace('-', ' ')}
            </span>
          ))}
        </div>

        {/* Rating + Sessions */}
        <div className="flex items-center gap-3 mb-2">
          <span className="flex items-center gap-0.5 text-xs text-amber-500 font-semibold">
            <Star size={11} fill="currentColor" /> {mentor.rating}
          </span>
          <span className="text-[11px] text-slate-400">{mentor.totalSessions} sessions</span>
          <span className="text-[11px] text-slate-400">{mentor.availableSlots.length} slots open</span>
        </div>

        {/* Credentials */}
        <div className="space-y-1">
          {mentor.credentials.slice(0, 2).map((c, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <CheckCircle2 size={10} strokeWidth={2} className="text-navy-700 shrink-0" />
              {c}
            </div>
          ))}
        </div>

        {isSelected && (
          <div className="mt-3 pt-2 border-t border-slate-100">
            <p className="text-[11px] text-slate-600 leading-relaxed">{mentor.bio}</p>
          </div>
        )}
      </div>
    </button>
  );
};

// ─── Slot Picker ──────────────────────────────────────────────────────────────
const SlotPicker: React.FC<{
  mentor: MentorProfile;
  subscription: UserSubscription;
  selectedSlot: MentorSlot | null;
  onSelectSlot: (slot: MentorSlot) => void;
}> = ({ mentor, subscription, selectedSlot, onSelectSlot }) => {
  // Group slots by date
  const grouped = useMemo(() => {
    const maxDaysOut = subscription.bookingWindowDays;
    const today = new Date();
    const cutoff = new Date(today);
    cutoff.setDate(today.getDate() + maxDaysOut);

    const filtered = mentor.availableSlots.filter((s) => {
      const d = new Date(s.date + 'T00:00:00');
      return d >= today && d <= cutoff;
    });

    const map = new Map<string, MentorSlot[]>();
    filtered.forEach((s) => {
      const arr = map.get(s.date) || [];
      arr.push(s);
      map.set(s.date, arr);
    });
    return map;
  }, [mentor, subscription]);

  if (grouped.size === 0) {
    return (
      <div className="p-6 text-center">
        <CalendarCheck size={24} className="text-slate-300 mx-auto mb-2" />
        <p className="text-sm text-slate-500">No available slots within your booking window ({subscription.bookingWindowDays} days)</p>
        <p className="text-xs text-slate-400 mt-1">Try auto-matching or check back later</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
      {Array.from(grouped.entries()).map(([date, slots]) => (
        <div key={date}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {formatDate(date)}
          </p>
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => {
              const active = selectedSlot?.date === slot.date && selectedSlot?.time === slot.time;
              return (
                <button
                  key={`${slot.date}-${slot.time}`}
                  onClick={() => onSelectSlot(slot)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'gradient-navy text-white shadow-sm scale-[1.04]'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-navy-700/30 hover:text-navy-800'
                  }`}
                >
                  <Clock size={10} className={`inline mr-1 ${active ? 'text-white/70' : 'text-slate-400'}`} />
                  {formatTime12(slot.time)}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Auto-Match Form ──────────────────────────────────────────────────────────
const AutoMatchForm: React.FC<{
  subscription: UserSubscription;
  onSubmit: (goal: string, track: string, slots: string[]) => void;
}> = ({ subscription, onSubmit }) => {
  const [goal, setGoal] = useState('');
  const [track, setTrack] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const timePrefs = [
    'Morning (9–12)', 'Afternoon (12–3)', 'Evening (3–6)', 'Night (7–9)',
  ];

  const toggleSlot = (s: string) =>
    setSlots((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleSubmit = () => {
    if (!goal || !track || slots.length === 0) return;
    onSubmit(goal, track, slots);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center animate-scale-in">
        <div className="w-14 h-14 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-4">
          <Sparkles size={24} className="text-white" strokeWidth={1.75} />
        </div>
        <h3 className="text-lg font-bold text-navy-900 mb-2">Auto-Match Requested!</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          We'll allocate the highest-rated eligible mentor matching your preferences within 24 hours. You'll receive a confirmation notification.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
          style={{ background: 'rgba(30,58,138,0.06)', color: '#1E3A8A' }}>
          <Bell size={12} /> Notification pending
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl" style={{ background: 'rgba(30,58,138,0.04)', border: '1px solid rgba(30,58,138,0.08)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Shuffle size={14} strokeWidth={2} className="text-navy-700" />
          <p className="text-xs font-bold text-navy-800">Smart Auto-Matching</p>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Tell us your goal and preferred times — we'll match you with the best available mentor in your qualification tier within 24 hours.
        </p>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600 block mb-1.5">Your Goal</label>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Prepare for FAANG interviews, plan MS application, crack UPSC Mains..."
          className="input-field text-xs min-h-[70px] resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600 block mb-1.5">Target Track</label>
        <div className="relative">
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="input-field text-xs appearance-none pr-8"
          >
            <option value="">Select track…</option>
            {CAREER_TRACKS.map((t) => (
              <option key={t.id} value={t.id}>{t.title} — {t.subtitle}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600 block mb-2">Preferred Time Slots</label>
        <div className="flex flex-wrap gap-2">
          {timePrefs.map((s) => (
            <button
              key={s}
              onClick={() => toggleSlot(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                slots.includes(s)
                  ? 'gradient-navy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-navy-700/30'
              }`}
            >
              {slots.includes(s) && <Check size={10} className="inline mr-1" />}
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!goal || !track || slots.length === 0}
        className="w-full btn-primary justify-center py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Sparkles size={15} /> Request Auto-Match
      </button>
    </div>
  );
};

// ─── Main Allocation Engine ───────────────────────────────────────────────────
const MentorAllocation: React.FC<MentorAllocationProps> = ({
  subscription,
  bookings,
  onBook,
  onUpgrade,
  onClose,
}) => {
  const [mode, setMode] = useState<'browse' | 'auto'>('browse');
  const [search, setSearch] = useState('');
  const [trackFilter, setTrackFilter] = useState('');
  const [seniorityFilter, setSeniorityFilter] = useState<SeniorityLevel | ''>('');
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<MentorSlot | null>(null);
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState<'select' | 'schedule' | 'confirm' | 'done'>('select');
  const [holdTimer, setHoldTimer] = useState(600); // 10 min hold in secs
  const [holdActive, setHoldActive] = useState(false);

  // Session enforcement
  const canBook = subscription.sessionsRemaining > 0 && subscription.tier !== 'free';

  // Filter mentors
  const filteredMentors = useMemo(() => {
    return MENTOR_POOL.filter((m) => {
      if (search) {
        const q = search.toLowerCase();
        const match = m.name.toLowerCase().includes(q)
          || m.role.toLowerCase().includes(q)
          || m.organization.toLowerCase().includes(q)
          || m.tracks.some((t) => t.includes(q));
        if (!match) return false;
      }
      if (trackFilter && !m.tracks.includes(trackFilter)) return false;
      if (seniorityFilter && m.seniority !== seniorityFilter) return false;
      return true;
    });
  }, [search, trackFilter, seniorityFilter]);

  // Hold timer
  React.useEffect(() => {
    if (!holdActive) return;
    const interval = setInterval(() => {
      setHoldTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [holdActive]);

  const formatTimer = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleProceedToSchedule = () => {
    if (!selectedMentor) return;
    setStep('schedule');
  };

  const handleProceedToConfirm = () => {
    if (!selectedSlot) return;
    setHoldActive(true);
    setStep('confirm');
  };

  const handleConfirmBooking = () => {
    if (!selectedMentor || !selectedSlot) return;
    const booking: SessionBooking = {
      bookingId: `BK-${Date.now()}`,
      seekerId: 'seeker-1',
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      mentorInitials: selectedMentor.initials,
      scheduledDate: selectedSlot.date,
      scheduledTime: selectedSlot.time,
      durationMinutes: subscription.sessionDurationMinutes,
      status: 'confirmed',
      track: selectedMentor.tracks[0] || 'employment',
      notes: notes || undefined,
    };
    onBook(booking);
    setHoldActive(false);
    setStep('done');
  };

  return (
    <div
      id="mentor-allocation-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,25,47,0.50)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(226,232,240,0.80)',
          boxShadow: '0 20px 80px rgb(15,23,42,0.18)',
        }}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-slate-200/60"
          style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-navy flex items-center justify-center">
                <Users size={16} strokeWidth={2} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-navy-900">Mentor Allocation Engine</h2>
                <p className="text-[11px] text-slate-500">
                  {subscription.tier === 'free'
                    ? 'Upgrade to unlock 1-on-1 mentorship'
                    : `${subscription.sessionsRemaining} sessions remaining · ${subscription.sessionDurationMinutes} min each`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Subscription Badge */}
              <span className={`text-[10px] px-3 py-1 rounded-full font-bold flex items-center gap-1 ${
                subscription.tier === 'elite'
                  ? 'gradient-navy text-white'
                  : subscription.tier === 'pro'
                    ? 'bg-navy-700/10 text-navy-700'
                    : 'bg-slate-100 text-slate-500'
              }`}>
                {subscription.tier === 'elite' && <Crown size={10} />}
                {subscription.tier === 'pro' && <Zap size={10} />}
                {subscription.tier.toUpperCase()} PLAN
              </span>
              <button onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <X size={16} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* No Credits Warning */}
          {!canBook && subscription.tier !== 'free' && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-100 flex items-center gap-3">
              <AlertCircle size={16} className="text-amber-600 shrink-0" />
              <p className="text-xs text-amber-700 font-medium">
                You've used all your sessions this month. Renews on {subscription.renewalDate}.
              </p>
              <button
                onClick={onUpgrade}
                className="text-[10px] px-3 py-1 rounded-full gradient-navy text-white font-semibold ml-auto shrink-0"
              >
                Upgrade
              </button>
            </div>
          )}

          {/* Free Tier Prompt */}
          {subscription.tier === 'free' && (
            <div className="mt-3 p-3 rounded-xl flex items-center gap-3"
              style={{ background: 'rgba(30,58,138,0.04)', border: '1px solid rgba(30,58,138,0.10)' }}>
              <Lock size={16} className="text-navy-700 shrink-0" />
              <p className="text-xs text-slate-600 font-medium">
                1-on-1 mentorship requires a <strong className="text-navy-700">Pro</strong> or <strong className="text-navy-700">Elite</strong> plan.
              </p>
              <button
                onClick={onUpgrade}
                className="btn-primary text-[10px] py-1.5 px-3 ml-auto shrink-0"
              >
                View Plans <ArrowRight size={10} />
              </button>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* ── Mode Toggle ── */}
          <div className="flex items-center gap-1 rounded-xl p-1 mb-5 w-fit"
            style={{ background: 'rgba(15,23,42,0.05)' }}>
            <button
              onClick={() => setMode('browse')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                mode === 'browse' ? 'bg-white text-navy-800 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Search size={12} className="inline mr-1.5" /> Browse & Select
            </button>
            <button
              onClick={() => setMode('auto')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                mode === 'auto' ? 'bg-white text-navy-800 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Sparkles size={12} className="inline mr-1.5" /> Auto-Match
            </button>
          </div>

          {mode === 'auto' ? (
            <AutoMatchForm
              subscription={subscription}
              onSubmit={() => {}}
            />
          ) : step === 'done' ? (
            /* ── Confirmation Done ── */
            <div className="py-12 text-center animate-scale-in">
              <div className="w-16 h-16 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-5">
                <CalendarCheck size={28} className="text-white" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Session Booked!</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
                Your {subscription.sessionDurationMinutes}-minute session with <strong>{selectedMentor?.name}</strong> is
                confirmed for <strong>{selectedSlot && formatDate(selectedSlot.date)}</strong> at <strong>{selectedSlot && formatTime12(selectedSlot.time)}</strong>.
              </p>
              <div className="flex justify-center gap-3">
                <button className="btn-primary text-xs" onClick={onClose}>
                  <Check size={13} /> Done
                </button>
                <button className="btn-secondary text-xs" onClick={() => { setStep('select'); setSelectedMentor(null); setSelectedSlot(null); }}>
                  Book Another
                </button>
              </div>
            </div>
          ) : step === 'confirm' ? (
            /* ── Step 3: Confirmation ── */
            <div className="max-w-md mx-auto animate-scale-in">
              <h3 className="text-base font-bold text-navy-900 mb-4">Confirm Your Booking</h3>

              {/* Hold Timer */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 mb-5 flex items-center gap-2">
                <Clock size={14} className="text-amber-600" />
                <p className="text-xs text-amber-700">
                  Slot held for <strong>{formatTimer(holdTimer)}</strong>. Confirm to lock it in.
                </p>
              </div>

              <div className="glass-light rounded-2xl p-5 mb-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: `linear-gradient(135deg, ${selectedMentor?.colorFrom}, ${selectedMentor?.colorTo})` }}>
                    {selectedMentor?.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{selectedMentor?.name}</p>
                    <p className="text-[11px] text-slate-500">{selectedMentor?.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Date', value: selectedSlot && formatDate(selectedSlot.date), icon: Calendar },
                    { label: 'Time', value: selectedSlot && formatTime12(selectedSlot.time), icon: Clock },
                    { label: 'Duration', value: `${subscription.sessionDurationMinutes} minutes`, icon: Zap },
                    { label: 'Sessions left after', value: `${subscription.sessionsRemaining - 1}`, icon: Award },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                        <Icon size={9} /> {label}
                      </p>
                      <p className="text-xs font-bold text-navy-900">{value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-400 block mb-1">Session Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What would you like to discuss?"
                    className="input-field text-xs min-h-[50px] resize-none"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('schedule')} className="btn-secondary flex-1 justify-center text-xs">
                  Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={holdTimer === 0}
                  className="btn-primary flex-1 justify-center text-xs disabled:opacity-40"
                >
                  <CalendarCheck size={14} /> Confirm Booking
                </button>
              </div>
            </div>
          ) : step === 'schedule' && selectedMentor ? (
            /* ── Step 2: Slot Picker ── */
            <div className="animate-fade-in">
              <button onClick={() => { setStep('select'); setSelectedSlot(null); }}
                className="text-xs text-navy-700 font-semibold hover:underline mb-4 flex items-center gap-1">
                ← Back to mentors
              </button>

              <div className="grid lg:grid-cols-5 gap-5">
                {/* Left: Mentor Detail */}
                <div className="lg:col-span-2">
                  <div className="glass-light rounded-2xl p-5 sticky top-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                        style={{ background: `linear-gradient(135deg, ${selectedMentor.colorFrom}, ${selectedMentor.colorTo})` }}>
                        {selectedMentor.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-navy-900">{selectedMentor.name}</h3>
                          {selectedMentor.verified && <Shield size={12} className="text-navy-700" />}
                        </div>
                        <p className="text-[11px] text-slate-500">{selectedMentor.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{selectedMentor.bio}</p>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Credentials</p>
                    <div className="space-y-1.5">
                      {selectedMentor.credentials.map((c, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          <CheckCircle2 size={10} strokeWidth={2} className="text-navy-700 shrink-0" /> {c}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Calendar */}
                <div className="lg:col-span-3">
                  <div className="glass-light rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
                        <Calendar size={14} strokeWidth={2} className="text-navy-700" />
                        Available Slots
                      </h3>
                      <span className="text-[10px] text-slate-400">
                        Booking window: {subscription.bookingWindowDays} days
                      </span>
                    </div>

                    <SlotPicker
                      mentor={selectedMentor}
                      subscription={subscription}
                      selectedSlot={selectedSlot}
                      onSelectSlot={setSelectedSlot}
                    />

                    <button
                      onClick={handleProceedToConfirm}
                      disabled={!selectedSlot}
                      className="mt-5 btn-primary w-full justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {selectedSlot
                        ? <>Hold & Review <ArrowRight size={14} /></>
                        : 'Select a time slot'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── Step 1: Browse Mentors ── */
            <div className="animate-fade-in">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="mentor-search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, role, company, or track…"
                    className="input-field pl-9 text-xs"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      value={trackFilter}
                      onChange={(e) => setTrackFilter(e.target.value)}
                      className="input-field text-xs appearance-none pr-7 w-36"
                    >
                      <option value="">All Tracks</option>
                      {CAREER_TRACKS.map((t) => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select
                      value={seniorityFilter}
                      onChange={(e) => setSeniorityFilter(e.target.value as SeniorityLevel | '')}
                      className="input-field text-xs appearance-none pr-7 w-36"
                    >
                      <option value="">All Levels</option>
                      <option value="associate">Associate (2–4 yrs)</option>
                      <option value="lead">Lead (5–8 yrs)</option>
                      <option value="executive">Executive (8+ yrs)</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Seniority Legend */}
              <div className="flex flex-wrap gap-3 mb-5">
                {Object.entries(SENIORITY_CONFIG).map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color }} />
                    <span className="font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                    <span>({cfg.exp})</span>
                  </div>
                ))}
              </div>

              {/* Mentor Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMentors.map((m) => (
                  <MentorCard
                    key={m.id}
                    mentor={m}
                    locked={!canAccessMentor(subscription, m)}
                    isSelected={selectedMentor?.id === m.id}
                    onSelect={() => setSelectedMentor(selectedMentor?.id === m.id ? null : m)}
                    onUpgrade={onUpgrade}
                  />
                ))}
              </div>

              {filteredMentors.length === 0 && (
                <div className="py-12 text-center">
                  <Users size={24} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No mentors match your filters</p>
                </div>
              )}

              {/* Proceed Button */}
              {selectedMentor && canBook && (
                <div className="sticky bottom-0 pt-4 pb-2 -mx-6 px-6"
                  style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.95), transparent)' }}>
                  <button
                    id="proceed-schedule"
                    onClick={handleProceedToSchedule}
                    className="btn-primary w-full justify-center py-3.5 text-sm"
                  >
                    Schedule with {selectedMentor.name} <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorAllocation;
