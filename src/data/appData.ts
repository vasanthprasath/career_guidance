// ─────────────────────────────────────────────
//  NextStep — Global App State Types & Constants
// ─────────────────────────────────────────────

export type ViewMode = 'landing' | 'auth' | 'seeker-dashboard' | 'partner-dashboard';
export type AuthPortal = 'seeker' | 'partner';
export type CareerTrack = 'employment' | 'higher-study' | 'government' | 'college' | 'entrepreneur';

export interface SeekerStage {
  id: string;
  label: string;
}

export interface OrgCategory {
  id: string;
  label: string;
}

export const SEEKER_STAGES: SeekerStage[] = [
  { id: 'college-student', label: 'College Student' },
  { id: 'job-seeker', label: 'Job Seeker' },
  { id: 'govt-aspirant', label: 'Govt Exam Aspirant' },
  { id: 'higher-study', label: 'Higher Study Applicant' },
  { id: 'entrepreneur', label: 'Aspiring Entrepreneur' },
];

export const ORG_CATEGORIES: OrgCategory[] = [
  { id: 'hiring-company', label: 'Hiring Company' },
  { id: 'university', label: 'University / College' },
  { id: 'incubator', label: 'Startup Incubator' },
  { id: 'training-partner', label: 'Training Partner' },
];

export interface CareerTrackData {
  id: CareerTrack;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  accentBg: string;
  features: string[];
  roadmap: RoadmapStep[];
  stats: { label: string; value: string }[];
}

export interface RoadmapStep {
  phase: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  milestones: string[];
}

export const CAREER_TRACKS: CareerTrackData[] = [
  {
    id: 'employment',
    title: 'Employment',
    subtitle: 'Private Sector & Industry Careers',
    icon: 'Briefcase',
    color: '#1E3A8A',
    accentBg: 'from-blue-50 to-indigo-50',
    features: [
      'Role-based career roadmaps',
      'Skill-gap analyzer',
      'Resume benchmark checklists',
      'Verified hiring partner referrals',
    ],
    stats: [
      { label: 'Partner Companies', value: '2,400+' },
      { label: 'Job Openings', value: '18K+' },
      { label: 'Avg. Placement Rate', value: '87%' },
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'Self-Assessment & Goal Setting',
        description: 'Identify your strengths, interests, and target industry. Map skills to market demand.',
        duration: '2–3 weeks',
        skills: ['Self-reflection', 'Market research', 'Resume baseline'],
        milestones: ['Complete skills audit', 'Choose target role', 'Set 90-day goal'],
      },
      {
        phase: 'Phase 2',
        title: 'Skill Building & Certification',
        description: 'Close skill gaps with targeted courses, projects, and industry certifications.',
        duration: '2–4 months',
        skills: ['Domain skills', 'Portfolio projects', 'Industry certifications'],
        milestones: ['Complete 2 certifications', 'Build portfolio', 'Contribute to open source'],
      },
      {
        phase: 'Phase 3',
        title: 'Application & Networking',
        description: 'Craft ATS-optimized resume, build LinkedIn, and leverage partner referrals.',
        duration: '4–8 weeks',
        skills: ['Resume writing', 'LinkedIn optimization', 'Networking'],
        milestones: ['Apply to 30+ companies', 'Get 3 referrals', 'Attend 2 career fairs'],
      },
      {
        phase: 'Phase 4',
        title: 'Interview Preparation',
        description: 'Master technical interviews, case studies, and HR rounds with mock sessions.',
        duration: '3–6 weeks',
        skills: ['Technical interviews', 'Behavioral questions', 'Negotiation'],
        milestones: ['Complete 10 mock interviews', 'Clear technical round', 'Negotiate offer'],
      },
    ],
  },
  {
    id: 'higher-study',
    title: 'Higher Study',
    subtitle: 'Domestic & Global Academics',
    icon: 'GraduationCap',
    color: '#0F172A',
    accentBg: 'from-slate-50 to-blue-50',
    features: [
      'University & degree finder (Masters, MBA, PhD)',
      'Entrance exam calendar (GATE, GRE, CAT, IELTS)',
      'SOP / LOR workspaces',
      'Scholarship directory',
    ],
    stats: [
      { label: 'Partner Universities', value: '850+' },
      { label: 'Scholarships Listed', value: '5,200+' },
      { label: 'Admit Rate Improvement', value: '3.2×' },
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'Program Research & Shortlisting',
        description: 'Research programs, rankings, faculty, and funding opportunities across countries.',
        duration: '4–6 weeks',
        skills: ['Research methodology', 'Program evaluation', 'Budget planning'],
        milestones: ['Shortlist 15 programs', 'Set GPA / Score targets', 'Map deadlines'],
      },
      {
        phase: 'Phase 2',
        title: 'Exam Preparation',
        description: 'Prepare for entrance exams (GRE, GMAT, IELTS, TOEFL, GATE, CAT) systematically.',
        duration: '3–6 months',
        skills: ['Quantitative reasoning', 'Verbal skills', 'Test strategy'],
        milestones: ['Reach target score', 'Complete 5 mock tests', 'Book exam slot'],
      },
      {
        phase: 'Phase 3',
        title: 'Application Documents',
        description: 'Craft compelling SOP, get strong LORs, and finalize transcripts and CV.',
        duration: '6–8 weeks',
        skills: ['Academic writing', 'Storytelling', 'Communication'],
        milestones: ['Draft 3 SOP versions', 'Secure 3 recommenders', 'Proofread all docs'],
      },
      {
        phase: 'Phase 4',
        title: 'Application & Visa',
        description: 'Submit applications, track decisions, and prepare visa documentation.',
        duration: '4–12 weeks',
        skills: ['Document management', 'Interview prep', 'Financial planning'],
        milestones: ['Submit all applications', 'Ace admission interview', 'Secure visa'],
      },
    ],
  },
  {
    id: 'government',
    title: 'Government Jobs',
    subtitle: 'Public Sector & Civil Services',
    icon: 'Landmark',
    color: '#1E3A8A',
    accentBg: 'from-indigo-50 to-blue-50',
    features: [
      'Structured exam trackers (UPSC, PSC, SSC, Banking)',
      'Eligibility calculators',
      'Syllabus breakdowns',
      'Official notification alerts',
    ],
    stats: [
      { label: 'Exams Tracked', value: '120+' },
      { label: 'Notifications / Year', value: '3,500+' },
      { label: 'Aspirants Guided', value: '90K+' },
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'Exam Selection & Eligibility',
        description: 'Map your eligibility, compare exams (UPSC / State PSC / SSC / Banking / Defense).',
        duration: '1–2 weeks',
        skills: ['Eligibility mapping', 'Career comparison', 'Target setting'],
        milestones: ['Select primary exam', 'Verify eligibility', 'Download syllabus'],
      },
      {
        phase: 'Phase 2',
        title: 'Structured Study Plan',
        description: 'Build a month-by-month study calendar covering all subjects with daily goals.',
        duration: '6–18 months',
        skills: ['Time management', 'General Studies', 'Optional subject mastery'],
        milestones: ['Complete syllabus once', 'Score 60%+ in tests', 'Revise weak areas'],
      },
      {
        phase: 'Phase 3',
        title: 'Mock Tests & Analysis',
        description: 'Take weekly full-length mocks, analyze errors, and benchmark performance.',
        duration: 'Ongoing (3+ months)',
        skills: ['Speed accuracy', 'Error analysis', 'Time allocation'],
        milestones: ['50 mock tests cleared', 'Rank top 15% in mocks', 'Identify pattern'],
      },
      {
        phase: 'Phase 4',
        title: 'Interview & Final Preparation',
        description: 'Prepare for personality test, current affairs deep-dive, and document verification.',
        duration: '4–6 weeks',
        skills: ['Current affairs', 'Public speaking', 'Confidence building'],
        milestones: ['Clear Prelims & Mains', 'Clear personality test', 'Document verification'],
      },
    ],
  },
  {
    id: 'college',
    title: 'College Students',
    subtitle: 'Campus-to-Career Foundation',
    icon: 'BookOpen',
    color: '#0F172A',
    accentBg: 'from-blue-50 to-sky-50',
    features: [
      'Semester-by-semester action plans',
      'Internship finder',
      'Real-world project showcases',
      'Hackathon calendars & alumni mentors',
    ],
    stats: [
      { label: 'Internship Postings', value: '12,000+' },
      { label: 'Hackathons Listed', value: '400+/yr' },
      { label: 'Alumni Mentors', value: '6,800+' },
    ],
    roadmap: [
      {
        phase: 'Year 1–2',
        title: 'Foundation & Exploration',
        description: 'Build core academics, explore clubs, and discover interests through real projects.',
        duration: 'First 2 years',
        skills: ['Core academics', 'Coding basics', 'Communication'],
        milestones: ['Join 2 clubs', 'Complete side project', 'Attend career fair'],
      },
      {
        phase: 'Year 2–3',
        title: 'Internship & Skill Building',
        description: 'Land your first internship, build a portfolio, and grow your professional network.',
        duration: 'Year 2 onwards',
        skills: ['Domain skills', 'Networking', 'Project management'],
        milestones: ['First internship', 'GitHub portfolio', 'LinkedIn 200+ connections'],
      },
      {
        phase: 'Year 3',
        title: 'Specialization & Leadership',
        description: 'Take leadership roles, lead projects, and pursue competitive internships.',
        duration: 'Third year',
        skills: ['Leadership', 'Advanced domain', 'Research skills'],
        milestones: ['Club leadership', 'Research paper / patent', 'Summer internship @ MAANG'],
      },
      {
        phase: 'Final Year',
        title: 'Placement & Next Steps',
        description: 'Prepare for campus placements, higher study, or startup launch.',
        duration: 'Final year',
        skills: ['Interview prep', 'Decision making', 'Negotiation'],
        milestones: ['Pre-placement offer', 'Admit / offer letter', 'Define 5-year plan'],
      },
    ],
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    subtitle: 'Startups & Venture Building',
    icon: 'Rocket',
    color: '#1E3A8A',
    accentBg: 'from-indigo-50 to-purple-50',
    features: [
      'Idea validation frameworks',
      'Pitch deck templates',
      'Government & private startup grant directories',
      'Incubator matchmaking & co-founder networking',
    ],
    stats: [
      { label: 'Partner Incubators', value: '340+' },
      { label: 'Grants Listed', value: '1,800+' },
      { label: 'Founders Supported', value: '25K+' },
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'Idea Validation',
        description: 'Validate problem-solution fit with customer discovery and market research.',
        duration: '4–8 weeks',
        skills: ['Customer interviews', 'Market sizing', 'Problem framing'],
        milestones: ['50 customer interviews', 'Define TAM/SAM/SOM', 'Validate core hypothesis'],
      },
      {
        phase: 'Phase 2',
        title: 'MVP & Early Traction',
        description: 'Build minimum viable product, acquire first users, and iterate rapidly.',
        duration: '2–4 months',
        skills: ['Product thinking', 'Growth hacking', 'Lean methodology'],
        milestones: ['Launch MVP', '100 early users', 'First revenue ₹1L'],
      },
      {
        phase: 'Phase 3',
        title: 'Incubation & Funding',
        description: 'Apply to top incubators, pitch to angels, and apply for government grants.',
        duration: '3–6 months',
        skills: ['Pitching', 'Financial modeling', 'Fundraising'],
        milestones: ['Incubator acceptance', 'Seed round ₹50L+', 'Govt grant secured'],
      },
      {
        phase: 'Phase 4',
        title: 'Scale & Team Building',
        description: 'Hire core team, optimize unit economics, and expand to new markets.',
        duration: '6–18 months',
        skills: ['Hiring', 'Operations', 'Go-to-market'],
        milestones: ['10-person team', 'Series A ready', 'Product-market fit'],
      },
    ],
  },
];

export const PARTNER_STATS = [
  { label: 'Verified Partners', value: '4,200+' },
  { label: 'Students Placed', value: '1.2M+' },
  { label: 'Active Mentors', value: '14,000+' },
  { label: 'Exam Notifications', value: '3,500+/yr' },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer, Google',
    track: 'Employment',
    quote: 'NextStep\'s roadmap helped me close the exact skill gaps Google was looking for. From day 1 to offer in 6 months.',
    avatar: 'PS',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'Arjun Mehta',
    role: 'IAS Officer (2024 Batch)',
    track: 'Government',
    quote: 'The structured UPSC tracker and daily targets kept me accountable for 14 months. Cleared in my first attempt.',
    avatar: 'AM',
    color: 'from-slate-400 to-blue-600',
  },
  {
    name: 'Kavya Nair',
    role: 'MS CS, Stanford University',
    track: 'Higher Study',
    quote: 'The SOP workspace and scholarship directory were game-changers. Got into Stanford with a ₹45L scholarship.',
    avatar: 'KN',
    color: 'from-indigo-400 to-navy-700',
  },
  {
    name: 'Rohan Gupta',
    role: 'Founder, AgriTech Startup (₹2Cr funded)',
    track: 'Entrepreneur',
    quote: 'Found my co-founder, incubator, and seed funding all through NextStep\'s entrepreneur ecosystem.',
    avatar: 'RG',
    color: 'from-blue-500 to-slate-600',
  },
];
