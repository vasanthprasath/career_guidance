// ── Career Guidance Chatbot Knowledge Base ──────────────────────────────────
// Rule-based smart matcher with career domain expertise

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface KnowledgeEntry {
  keywords: string[];
  response: string;
  category: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // ── Career Track Questions ──
  {
    keywords: ['career track', 'which track', 'choose track', 'right track', 'career path', 'what track'],
    response: `NextStep offers 5 career tracks tailored to your stage:\n\n🏢 **Employment Track** — For job seekers targeting private sector roles, internships, and placements.\n🎓 **Higher Studies** — For those pursuing MS, MBA, PhD, or foreign university admissions.\n🏛️ **Government & Civil Services** — UPSC, SSC, State PSC, Banking, and defense exams.\n📚 **College Students** — Skill building, projects, certifications, and campus placements.\n🚀 **Entrepreneurship** — Startup incubation, funding guidance, and founder mentorship.\n\nTake the Career Assessment Quiz on your dashboard to get a personalized track recommendation!`,
    category: 'tracks',
  },
  {
    keywords: ['employment', 'job', 'placement', 'hire', 'hiring', 'interview', 'apply'],
    response: `For the **Employment Track**, here's your recommended roadmap:\n\n1️⃣ **Phase 1** — Profile Setup: Complete your resume, LinkedIn, and skill assessment.\n2️⃣ **Phase 2** — Skill Building: Bridge skill gaps with certified courses.\n3️⃣ **Phase 3** — Application Sprint: Apply to matched jobs with ATS-optimized resume.\n4️⃣ **Phase 4** — Interview Prep: Mock interviews, case studies, and behavioral prep.\n5️⃣ **Phase 5** — Offer & Negotiation: Salary benchmarking and offer evaluation.\n\nUse the **Resume Builder** in Quick Actions to check your ATS score!`,
    category: 'employment',
  },
  {
    keywords: ['upsc', 'civil service', 'ias', 'ips', 'government', 'ssc', 'banking'],
    response: `For **Government & Civil Services** preparation:\n\n📋 **UPSC CSE Timeline:**\n- Prelims (June) → Mains (Sept) → Interview (Feb-Mar)\n- Start 12-18 months before prelims\n\n📚 **Key Resources:**\n- NCERT Books (Class 6-12) for foundation\n- Laxmikanth for Polity, Ramesh Singh for Economy\n- Daily newspaper analysis (The Hindu / Indian Express)\n\n💡 **Pro Tips:**\n- Use the Exam Calendar to track notification dates\n- Book a mentor session with our UPSC toppers\n- Join our weekly Current Affairs group sessions\n\nCheck the Exam Calendar in your dashboard for all upcoming government exam notifications!`,
    category: 'government',
  },
  {
    keywords: ['higher study', 'ms', 'mba', 'phd', 'abroad', 'university', 'masters', 'gre', 'gmat', 'ielts', 'toefl', 'sop'],
    response: `For **Higher Studies** abroad or in India:\n\n🎯 **Application Timeline (Fall intake):**\n- Jan-Mar: Research programs & shortlist universities\n- Apr-Jun: GRE/GMAT prep and attempt\n- Jul-Aug: IELTS/TOEFL, draft SOP & LORs\n- Sep-Dec: Submit applications\n- Jan-Apr: Decisions & visa process\n\n📝 **SOP Tips:**\n- Lead with a compelling personal narrative\n- Connect past experience → target program → career goal\n- Be specific about why THAT university\n\nUse our **SOP Workspace** tool and book a session with a mentor who's been through the same process!`,
    category: 'higherstudy',
  },
  {
    keywords: ['entrepreneur', 'startup', 'business', 'founder', 'funding', 'incubator', 'pitch'],
    response: `For the **Entrepreneurship Track:**\n\n🚀 **Startup Journey Phases:**\n1. **Ideation** — Problem validation, market research, MVP planning\n2. **Building** — Technical development, early user testing\n3. **Launch** — Go-to-market strategy, initial traction\n4. **Scale** — Fundraising, team building, growth hacking\n\n💰 **Funding Stages:**\n- Pre-seed: ₹10-50L (Angel investors, Grants)\n- Seed: ₹50L-2Cr (Seed funds, Accelerators)\n- Series A: ₹2-15Cr (VCs)\n\n📍 **Indian Incubators:** IIT incubators, T-Hub, Atal Innovation Mission, NASSCOM 10K\n\nBook a mentor session with early-stage founders on the platform!`,
    category: 'entrepreneurship',
  },
  // ── Resume & Skills ──
  {
    keywords: ['resume', 'cv', 'ats', 'format', 'template'],
    response: `**Resume Best Practices for ATS (Applicant Tracking Systems):**\n\n✅ **Do's:**\n- Use clean, single-column format (no graphics/tables)\n- Include keywords from the job description\n- Quantify achievements (e.g., "Increased sales by 30%")\n- Keep it 1 page (freshers) or 2 pages (experienced)\n- Use standard section headings: Experience, Education, Skills\n\n❌ **Don'ts:**\n- No photos or colored headers\n- No creative fonts — stick to Arial, Calibri, or Garamond\n- Don't use "References available upon request"\n\n💡 Use our **Resume Builder** (Quick Actions → Resume Builder) to get your ATS score and section-by-section feedback!`,
    category: 'resume',
  },
  {
    keywords: ['skill', 'learn', 'course', 'certification', 'upskill', 'skill gap'],
    response: `**Top Skills in Demand (2025-2026):**\n\n💻 **Tech:** AI/ML, Cloud (AWS/Azure/GCP), Full-Stack Dev, Cybersecurity, Data Engineering\n📊 **Business:** Product Management, Digital Marketing, Data Analytics, Agile/Scrum\n🎨 **Design:** UI/UX Design, Figma, Design Systems\n\n🏅 **High-Value Certifications:**\n- AWS Solutions Architect / Google Cloud Professional\n- PMP / Scrum Master\n- Google Data Analytics / IBM Data Science\n- Meta Frontend Developer\n\n💡 Your dashboard's **Skill Gap Analyzer** identifies exactly which skills to focus on based on your target role. Check it out!`,
    category: 'skills',
  },
  // ── Mentor & Subscription ──
  {
    keywords: ['mentor', 'mentorship', 'book session', 'find mentor', 'guidance', 'coaching'],
    response: `**Mentorship on NextStep:**\n\n👥 Our mentors are verified professionals from top companies and institutions:\n- **Associate Mentors** (3-7 years experience)\n- **Lead Mentors** (7-15 years, senior leaders)\n- **Executive Mentors** (15+ years, C-suite, Elite plan only)\n\n📅 **How to Book:**\n1. Go to Mentorship Sessions → Click "Book Session"\n2. Browse mentors by track, expertise, or availability\n3. Pick a time slot within your booking window\n4. Confirm & receive calendar invite\n\n💎 **Session Credits:**\n- Pro plan: 2 sessions/month (30 min each)\n- Elite plan: 4 sessions/month (45 min each)\n\nUpgrade your plan in the sidebar Subscription Card!`,
    category: 'mentor',
  },
  {
    keywords: ['subscription', 'plan', 'pricing', 'upgrade', 'pro', 'elite', 'free', 'premium'],
    response: `**NextStep Subscription Plans:**\n\n🆓 **Starter (Free)**\n- Community forum access\n- Group AMA sessions (view-only)\n- No 1-on-1 mentor sessions\n\n⚡ **Pro Navigator (₹499/mo)**\n- 2 mentor sessions/month (30 min)\n- Mid-level mentors access\n- 7-day advance booking window\n- Priority support\n\n👑 **Elite Fellowship (₹1,499/mo)**\n- 4 mentor sessions/month (45 min)\n- All mentor tiers including Executive\n- 21-day advance booking\n- Dedicated success manager\n- Private Slack community\n\nClick "Manage" on your Subscription Card or go to Mentorship Sessions → Plan badge to upgrade!`,
    category: 'subscription',
  },
  // ── Interview Prep ──
  {
    keywords: ['interview', 'prepare', 'mock', 'behavioral', 'technical', 'hr round'],
    response: `**Interview Preparation Guide:**\n\n🎯 **Technical Rounds:**\n- Practice DSA on LeetCode/HackerRank (aim for 150+ problems)\n- System Design: Study scalability, databases, caching\n- Focus on your top 2-3 projects with depth\n\n💬 **Behavioral Rounds (STAR Method):**\n- **S**ituation: Set the context\n- **T**ask: Your responsibility\n- **A**ction: What you specifically did\n- **R**esult: Quantifiable outcome\n\n🏢 **HR Round Tips:**\n- Research company values and recent news\n- Prepare "Why this company?" and "Where do you see yourself in 5 years?"\n- Have thoughtful questions ready to ask\n\nBook a **Mock Interview** session with a mentor for personalized feedback!`,
    category: 'interview',
  },
  // ── General & Platform ──
  {
    keywords: ['how to use', 'platform', 'dashboard', 'help', 'guide', 'tutorial', 'get started'],
    response: `**Getting Started with NextStep:**\n\n1️⃣ **Complete Your Profile** — Fill in education, skills, and career goals (aim for 80%+ profile strength)\n2️⃣ **Choose Your Track** — Select from 5 career tracks in the sidebar\n3️⃣ **Follow Your Roadmap** — Each track has a phase-wise plan with actionable tasks\n4️⃣ **Use Quick Actions** — Resume Builder, Exam Calendar, Find Mentor, Settings\n5️⃣ **Track Progress** — Monitor tasks, deadlines, and milestones\n\n🔔 **Key Features:**\n- Notifications for deadlines and exam alerts\n- Mentor booking with subscription-based sessions\n- ATS Resume Builder with score tracking\n- Exam Calendar with government exam dates\n\nExplore each section in the sidebar to unlock your full potential!`,
    category: 'platform',
  },
  {
    keywords: ['scholarship', 'financial aid', 'fee', 'afford', 'loan', 'education loan'],
    response: `**Scholarship & Financial Aid Resources:**\n\n🎓 **Government Scholarships:**\n- National Scholarship Portal (NSP)\n- INSPIRE Scholarship (STEM students)\n- Post-Matric Scholarship for SC/ST/OBC\n- Central Sector Scheme for college students\n\n🌍 **Study Abroad Scholarships:**\n- Fulbright (USA), Chevening (UK), DAAD (Germany)\n- Commonwealth Scholarships, Erasmus Mundus (EU)\n- University-specific merit and need-based aid\n\n🏦 **Education Loans:**\n- SBI Scholar Loan, Bank of Baroda Vidya Lakshmi\n- Prodigy Finance, MPOWER (for international study)\n- Interest subsidy for economically weaker sections\n\nCheck our **Scholarship Directory** for personalized recommendations based on your profile!`,
    category: 'scholarship',
  },
  {
    keywords: ['linkedin', 'networking', 'professional network', 'connection', 'profile'],
    response: `**LinkedIn Optimization Tips:**\n\n📸 **Profile:**\n- Professional headshot (increases profile views by 14x)\n- Compelling headline (not just job title — add value prop)\n- Detailed About section with keywords\n\n📝 **Content Strategy:**\n- Post 2-3 times/week about your learnings\n- Engage with industry leaders' content\n- Share project showcases and achievements\n\n🤝 **Networking:**\n- Send personalized connection requests\n- Engage before pitching (comment, like, share)\n- Join relevant groups and participate in discussions\n\n💡 Pro tip: Update your LinkedIn with each new skill or project. Our Resume Builder syncs recommendations with LinkedIn best practices!`,
    category: 'linkedin',
  },
  {
    keywords: ['gate', 'cat', 'jee', 'neet', 'exam', 'entrance', 'competitive'],
    response: `**Competitive Exam Guidance:**\n\n📐 **GATE** (Engineering PG / PSU):\n- Prep time: 6-12 months\n- Focus: Subject-specific + Aptitude + Maths\n- Key: Previous year papers + mock tests\n\n📊 **CAT** (MBA admissions):\n- Prep time: 6-10 months\n- Sections: VARC, DILR, QA\n- Target 99+ percentile for IIMs\n\n🔬 **JEE/NEET:**\n- Start 1-2 years before exam\n- NCERT mastery is non-negotiable\n- Regular mock tests and error analysis\n\n📅 Use the **Exam Calendar** in Quick Actions to track:\n- Notification dates\n- Application deadlines\n- Exam dates and result dates\n\nAll major exam dates are auto-synced to your calendar!`,
    category: 'exams',
  },
];

// Greeting responses for conversation starters
const GREETINGS: Record<string, string> = {
  default: `Hi! 👋 I'm **NextStep AI**, your career guidance assistant.\n\nI can help you with:\n• 🛤️ Choosing the right career track\n• 📝 Resume & interview preparation\n• 🎓 Higher studies & exam guidance\n• 👥 Mentorship & subscription plans\n• 💼 Job search strategies\n• 🚀 Startup & entrepreneurship advice\n\nWhat would you like to know?`,
};

// Fallback when no match found
const FALLBACK_RESPONSES = [
  `That's a great question! While I don't have a specific answer for that, here are some things I can help with:\n\n• Career track selection & roadmaps\n• Resume optimization & ATS tips\n• Interview preparation strategies\n• Mentorship booking & plans\n• Exam guidance (UPSC, GATE, CAT, etc.)\n• Higher studies abroad guidance\n\nTry asking about any of these topics, or book a 1-on-1 mentor session for personalized advice!`,
  `I appreciate the question! Let me point you in the right direction:\n\n🔍 For specific career advice → Book a **Mentor Session**\n📚 For exam prep → Check the **Exam Calendar** in Quick Actions\n📝 For resume help → Use the **Resume Builder**\n\nOr try asking me about career tracks, interview tips, skills, or subscriptions!`,
];

/**
 * Simple keyword-matching AI engine.
 * Scores each knowledge entry by counting keyword matches,
 * returns the best response or a fallback.
 */
export function generateResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim();

  // Greeting detection
  if (/^(hi|hello|hey|sup|yo|hola|namaste|good morning|good evening|good afternoon)\b/.test(lower) && lower.length < 30) {
    return GREETINGS.default;
  }

  // Thank you detection
  if (/\b(thank|thanks|thx|ty|appreciated)\b/.test(lower)) {
    return `You're welcome! 😊 Feel free to ask me anything else about your career journey. I'm here to help!\n\n💡 **Quick tip:** Book a mentor session for detailed, personalized guidance on your specific situation.`;
  }

  // Bye detection
  if (/\b(bye|goodbye|see you|cya|take care)\b/.test(lower)) {
    return `Goodbye! 👋 Best of luck on your career journey. Remember:\n\n✨ *"The best time to start was yesterday. The next best time is now."*\n\nCome back anytime you need guidance!`;
  }

  // Score each knowledge entry
  let bestScore = 0;
  let bestEntry: KnowledgeEntry | null = null;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.split(' ').length; // Multi-word keywords score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore >= 1) {
    return bestEntry.response;
  }

  // Fallback
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}

export function createMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
