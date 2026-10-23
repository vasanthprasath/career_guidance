// ─────────────────────────────────────────────────────────────────────────────
//  NextStep — Subscription & Mentor Allocation Engine Data Layer
// ─────────────────────────────────────────────────────────────────────────────

export type SubscriptionTier = 'free' | 'pro' | 'elite';
export type SeniorityLevel   = 'associate' | 'lead' | 'executive';
export type BookingStatus    = 'pending' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';

// ── Subscription ─────────────────────────────────────────────────────────────
export interface UserSubscription {
  tier: SubscriptionTier;
  sessionsRemaining: number;
  totalSessionsPerMonth: number;
  sessionDurationMinutes: number;
  renewalDate: string;
  bookingWindowDays: number;
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  tagline: string;
  price: { monthly: string; quarterly: string; quarterlyNote: string };
  sessionsPerMonth: number;
  sessionDuration: number;         // minutes; 0 = no 1-on-1
  bookingWindow: number;           // days in advance
  mentorAccess: string;
  seniorityUnlocked: SeniorityLevel[];
  features: string[];
  highlighted?: boolean;
}

// ── Mentor ────────────────────────────────────────────────────────────────────
export interface MentorSlot {
  date: string;  // YYYY-MM-DD
  time: string;  // HH:MM 24h
}

export interface MentorProfile {
  id: string;
  name: string;
  initials: string;
  role: string;
  organization: string;
  yearsExp: number;
  seniority: SeniorityLevel;
  qualificationBadge: string;
  tracks: string[];
  eligibleTiers: SubscriptionTier[];
  rating: number;
  totalSessions: number;
  bio: string;
  verified: boolean;
  credentials: string[];
  availableSlots: MentorSlot[];
  colorFrom: string;
  colorTo: string;
  isOnline: boolean;
}

// ── Session Booking ───────────────────────────────────────────────────────────
export interface SessionBooking {
  bookingId: string;
  seekerId: string;
  mentorId: string;
  mentorName: string;
  mentorInitials: string;
  scheduledDate: string;   // YYYY-MM-DD
  scheduledTime: string;   // HH:MM
  durationMinutes: number;
  status: BookingStatus;
  track: string;
  notes?: string;
}

// ── Subscription Plans ────────────────────────────────────────────────────────
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    tier: 'free',
    name: 'Starter',
    tagline: 'Pathway Access',
    price: { monthly: '₹0', quarterly: '₹0', quarterlyNote: 'Always free' },
    sessionsPerMonth: 0,
    sessionDuration: 0,
    bookingWindow: 0,
    mentorAccess: 'Community Only',
    seniorityUnlocked: [],
    features: [
      'Community forum Q&A access',
      'Group AMA sessions (view-only)',
      'All 5 career track roadmaps',
      'Exam notifications & alerts',
      'Resume builder (basic)',
      'Scholarship directory access',
    ],
  },
  {
    tier: 'pro',
    name: 'Pro Navigator',
    tagline: 'Standard Plan',
    price: { monthly: '₹999', quarterly: '₹2,499', quarterlyNote: 'Save ₹498' },
    sessionsPerMonth: 2,
    sessionDuration: 30,
    bookingWindow: 7,
    mentorAccess: 'Mid-Level Mentors',
    seniorityUnlocked: ['associate', 'lead'],
    highlighted: true,
    features: [
      '2 × 1-on-1 sessions / month (30 min)',
      'Associate & Lead mentors (3–8 yrs)',
      'Book up to 7 days in advance',
      'Verified alumni & certified coaches',
      'Session recording & AI notes',
      'Priority email support',
      'Resume builder (advanced)',
    ],
  },
  {
    tier: 'elite',
    name: 'Elite Fellowship',
    tagline: 'Premium Plan',
    price: { monthly: '₹2,499', quarterly: '₹6,499', quarterlyNote: 'Save ₹998' },
    sessionsPerMonth: 4,
    sessionDuration: 45,
    bookingWindow: 21,
    mentorAccess: 'Senior & Executive Mentors',
    seniorityUnlocked: ['associate', 'lead', 'executive'],
    features: [
      '4 × 1-on-1 sessions / month (45 min)',
      'All tiers incl. Executive mentors (8+ yrs)',
      'Book up to 21 days in advance',
      'C-Suite, Founders & Ivy PhDs access',
      '24-hr async review turnaround',
      'Dedicated success manager',
      'Exclusive cohort events & masterclasses',
    ],
  },
];

// ── Slot Generator (deterministic-ish per mentor id) ─────────────────────────
const BASE_DATES: string[] = (() => {
  const result: string[] = [];
  const start = new Date('2026-10-24');
  for (let i = 0; i < 21; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d.getDay() !== 0) {   // skip Sundays
      result.push(d.toISOString().split('T')[0]);
    }
  }
  return result;
})();

const SLOT_TIMES = ['09:00','10:00','11:00','14:00','15:00','16:00','17:00','19:00','20:00'];

function makeSlots(idNum: number, density: number): MentorSlot[] {
  const slots: MentorSlot[] = [];
  BASE_DATES.forEach((date, di) => {
    SLOT_TIMES.forEach((time, ti) => {
      if ((di * 7 + ti + idNum) % density === 0) {
        slots.push({ date, time });
      }
    });
  });
  return slots.slice(0, 18);
}

// ── Mentor Pool ───────────────────────────────────────────────────────────────
export const MENTOR_POOL: MentorProfile[] = [
  // ── Associate Mentors (Pro + Elite) ──
  {
    id: 'm1',
    name: 'Riya Kapoor',
    initials: 'RK',
    role: 'Senior Software Engineer',
    organization: 'Flipkart',
    yearsExp: 4,
    seniority: 'associate',
    qualificationBadge: 'Associate Mentor · NIT Trichy · AWS Certified',
    tracks: ['employment', 'college'],
    eligibleTiers: ['pro', 'elite'],
    rating: 4.7,
    totalSessions: 48,
    bio: 'Full-stack engineer (React, Node.js, AWS). Guides students through FAANG interview prep and portfolio building.',
    verified: true,
    credentials: ['NIT Trichy B.Tech CSE', 'AWS Certified Developer', 'Ex-Wipro SDE-2'],
    availableSlots: makeSlots(1, 3),
    colorFrom: '#3B82F6', colorTo: '#6366F1',
    isOnline: true,
  },
  {
    id: 'm2',
    name: 'Akash Verma',
    initials: 'AV',
    role: 'Career Coach & HR Lead',
    organization: 'Deloitte',
    yearsExp: 5,
    seniority: 'associate',
    qualificationBadge: 'Associate Mentor · ICF Certified Coach · IIM Indore',
    tracks: ['employment', 'college'],
    eligibleTiers: ['pro', 'elite'],
    rating: 4.8,
    totalSessions: 93,
    bio: 'ICF-certified coach helping fresh graduates break into consulting and MNC careers.',
    verified: true,
    credentials: ['ICF Certified Coach', 'MBA IIM Indore', 'Ex-Capgemini HR'],
    availableSlots: makeSlots(2, 4),
    colorFrom: '#64748B', colorTo: '#3B82F6',
    isOnline: false,
  },
  {
    id: 'm3',
    name: 'Sneha Desai',
    initials: 'SD',
    role: 'IAS Officer & UPSC Educator',
    organization: 'Govt. of Maharashtra',
    yearsExp: 3,
    seniority: 'associate',
    qualificationBadge: 'Associate Mentor · UPSC CSE AIR 78 · 2022 Batch',
    tracks: ['government'],
    eligibleTiers: ['pro', 'elite'],
    rating: 4.9,
    totalSessions: 67,
    bio: 'Cleared UPSC CSE in first attempt (AIR 78). Specialises in GS paper strategy and interview prep.',
    verified: true,
    credentials: ['UPSC CSE AIR 78', 'IAS 2022 Batch', 'B.A. Economics Delhi University'],
    availableSlots: makeSlots(3, 5),
    colorFrom: '#6366F1', colorTo: '#3B82F6',
    isOnline: true,
  },
  // ── Lead Mentors (Pro + Elite) ──
  {
    id: 'm4',
    name: 'Dr. Anita Rao',
    initials: 'AR',
    role: 'Data Science Lead',
    organization: 'Google DeepMind',
    yearsExp: 7,
    seniority: 'lead',
    qualificationBadge: 'Lead Mentor · Ex-FAANG · IIT Bombay PhD',
    tracks: ['employment', 'higher-study'],
    eligibleTiers: ['pro', 'elite'],
    rating: 4.9,
    totalSessions: 124,
    bio: 'PhD IIT Bombay → Google DeepMind. Expert in ML career transitions and MS / PhD application strategy.',
    verified: true,
    credentials: ['PhD IIT Bombay (CS)', 'Ex-Meta AI Research', 'Google DeepMind Staff Scientist'],
    availableSlots: makeSlots(4, 6),
    colorFrom: '#1E3A8A', colorTo: '#6366F1',
    isOnline: true,
  },
  {
    id: 'm5',
    name: 'Vikram Singh',
    initials: 'VS',
    role: 'VP Engineering',
    organization: 'Razorpay',
    yearsExp: 8,
    seniority: 'lead',
    qualificationBadge: 'Lead Mentor · IIT Roorkee · Tier-1 MNC',
    tracks: ['employment', 'entrepreneur'],
    eligibleTiers: ['pro', 'elite'],
    rating: 4.8,
    totalSessions: 89,
    bio: 'Scaled Razorpay engineering from 100K→10M merchants. Mentors on technical leadership and startup building.',
    verified: true,
    credentials: ['IIT Roorkee B.Tech', 'Ex-Amazon SDE-3', 'Razorpay VP Engineering'],
    availableSlots: makeSlots(5, 7),
    colorFrom: '#475569', colorTo: '#4F46E5',
    isOnline: false,
  },
  {
    id: 'm6',
    name: 'Prof. Mira Joshi',
    initials: 'MJ',
    role: 'Professor & Admissions Counsellor',
    organization: 'IIM Ahmedabad',
    yearsExp: 6,
    seniority: 'lead',
    qualificationBadge: 'Lead Mentor · IIM-A Faculty · MBA Strategy',
    tracks: ['higher-study', 'college'],
    eligibleTiers: ['pro', 'elite'],
    rating: 4.9,
    totalSessions: 156,
    bio: 'IIM-A faculty who has helped 200+ students gain admission to top global MBA programmes.',
    verified: true,
    credentials: ['IIM Ahmedabad Faculty', 'PhD Business Strategy', 'Ex-McKinsey Consultant'],
    availableSlots: makeSlots(6, 5),
    colorFrom: '#3B82F6', colorTo: '#64748B',
    isOnline: true,
  },
  // ── Executive Mentors (Elite ONLY) ──
  {
    id: 'm7',
    name: 'Rohit Sharma',
    initials: 'RS',
    role: 'Co-founder & CEO',
    organization: 'UniPay (₹2,000Cr ARR Fintech)',
    yearsExp: 12,
    seniority: 'executive',
    qualificationBadge: 'Executive Mentor · Venture-backed Founder · YC Alum',
    tracks: ['entrepreneur', 'employment'],
    eligibleTiers: ['elite'],
    rating: 5.0,
    totalSessions: 34,
    bio: "Built India's fastest-growing fintech from 0→₹2000Cr ARR. Advises founders on fundraising, product-market fit, and 0→1.",
    verified: true,
    credentials: ['IIT Delhi CS', 'YC W20 Alumni', 'Sequoia-backed Series B'],
    availableSlots: makeSlots(7, 9),
    colorFrom: '#0A192F', colorTo: '#1E3A8A',
    isOnline: true,
  },
  {
    id: 'm8',
    name: 'Dr. Priya Mehta',
    initials: 'PM',
    role: 'Associate Professor',
    organization: 'Stanford University, CS Dept.',
    yearsExp: 11,
    seniority: 'executive',
    qualificationBadge: 'Executive Mentor · Stanford CS · NSF Grantee',
    tracks: ['higher-study', 'employment'],
    eligibleTiers: ['elite'],
    rating: 4.9,
    totalSessions: 52,
    bio: 'Stanford CS faculty (AI/ML focus). Guides PhD aspirants on SOP, research proposals, and academic career paths.',
    verified: true,
    credentials: ['Stanford CS PhD', 'MIT Postdoc AI Lab', 'NSF Career Grant Recipient'],
    availableSlots: makeSlots(8, 11),
    colorFrom: '#1E40AF', colorTo: '#0A192F',
    isOnline: false,
  },
  {
    id: 'm9',
    name: 'IAS Meera Iyer',
    initials: 'MI',
    role: 'Joint Secretary (Retd.)',
    organization: 'Government of India',
    yearsExp: 25,
    seniority: 'executive',
    qualificationBadge: 'Executive Mentor · Senior Bureaucrat · Oxford Scholar',
    tracks: ['government'],
    eligibleTiers: ['elite'],
    rating: 4.9,
    totalSessions: 210,
    bio: 'Retired IAS officer (1999 Batch), 25 yrs public service. Expert UPSC strategist and interview board panelist.',
    verified: true,
    credentials: ['IAS 1999 Batch', 'Joint Secretary GoI (Retd.)', 'Oxford Rhodes Scholar'],
    availableSlots: makeSlots(9, 8),
    colorFrom: '#334155', colorTo: '#0F172A',
    isOnline: true,
  },
];

// ── Sample Bookings (pre-loaded for seeker demo) ──────────────────────────────
export const SAMPLE_BOOKINGS: SessionBooking[] = [
  {
    bookingId: 'BK-2026-001',
    seekerId: 'seeker-1',
    mentorId: 'm4',
    mentorName: 'Dr. Anita Rao',
    mentorInitials: 'AR',
    scheduledDate: '2026-10-28',
    scheduledTime: '10:00',
    durationMinutes: 30,
    status: 'confirmed',
    track: 'Employment',
    notes: 'Discuss ML career path, skill gap for DS roles at product companies',
  },
  {
    bookingId: 'BK-2026-002',
    seekerId: 'seeker-1',
    mentorId: 'm5',
    mentorName: 'Vikram Singh',
    mentorInitials: 'VS',
    scheduledDate: '2026-10-20',
    scheduledTime: '15:00',
    durationMinutes: 30,
    status: 'completed',
    track: 'Employment',
    notes: 'Resume review and system design interview preparation',
  },
  {
    bookingId: 'BK-2026-003',
    seekerId: 'seeker-1',
    mentorId: 'm2',
    mentorName: 'Akash Verma',
    mentorInitials: 'AV',
    scheduledDate: '2026-10-15',
    scheduledTime: '11:00',
    durationMinutes: 30,
    status: 'completed',
    track: 'Employment',
    notes: 'Career switch to consulting — skill mapping session',
  },
];

// ── Seniority Config ──────────────────────────────────────────────────────────
export const SENIORITY_CONFIG: Record<SeniorityLevel, {
  label: string; exp: string; color: string; bg: string; description: string;
}> = {
  associate: {
    label: 'Associate',
    exp: '2–4 yrs',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
    description: 'Verified credential badges, early-career specialists',
  },
  lead: {
    label: 'Lead',
    exp: '5–8 yrs',
    color: '#1E3A8A',
    bg: 'rgba(30,58,138,0.08)',
    description: 'Ex-FAANG / Tier-1 MNC / Top-tier universities / Rank holders',
  },
  executive: {
    label: 'Executive',
    exp: '8+ yrs',
    color: '#0A192F',
    bg: 'rgba(10,25,47,0.12)',
    description: 'Directors, VPs, Founders, Senior Bureaucrats',
  },
};
