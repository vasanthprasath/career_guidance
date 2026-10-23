import React, { useEffect, useRef } from 'react';
import {
  ArrowRight, Star, TrendingUp, Users, Briefcase, Shield,
  CheckCircle2, Zap, ChevronDown, Globe, Award, Target, ShieldCheck
} from 'lucide-react';
import { PARTNER_STATS, TESTIMONIALS } from '../data/appData';
import PathwayExplorer from './PathwayExplorer';

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

const FloatingCard: React.FC<{ className?: string; delay?: number; children: React.ReactNode }> = ({
  className = '', delay = 0, children
}) => (
  <div
    className={`glass-light rounded-2xl p-4 animate-float ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const StatCard: React.FC<{ value: string; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
  <div className="glass-light rounded-2xl p-5 text-center group hover:-translate-y-1 transition-transform duration-300">
    <div className="w-10 h-10 rounded-xl gradient-navy flex items-center justify-center mx-auto mb-3 text-white">
      {icon}
    </div>
    <div className="text-2xl font-bold gradient-text-navy mb-1">{value}</div>
    <div className="text-xs text-slate-500 font-medium">{label}</div>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            (entry.target as HTMLElement).style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ── Hero Section ── */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 pt-10 pb-16"
      >
        {/* Mesh Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-40 w-[600px] h-[600px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, #E2E8F0 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #CBD5E1 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #94A3B8 0%, transparent 60%)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column — Copy */}
            <div ref={heroRef} className="text-center lg:text-left">
              <div className="badge-light mb-6 mx-auto lg:mx-0 w-fit animate-fade-in">
                <Zap size={12} strokeWidth={2} />
                India's #1 Human-First Career Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-[1.1] mb-6 animate-slide-up">
                Your{' '}
                <span className="gradient-text-navy">Next Career</span>{' '}
                Move Starts Here
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 animate-slide-up animate-delay-100">
                Personalized roadmaps, exam trackers, mentor networks, and institutional partnerships — 
                built for real people navigating real career decisions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10 animate-slide-up animate-delay-200">
                <button
                  id="hero-cta-primary"
                  onClick={() => onNavigate('auth')}
                  className="btn-primary text-sm px-8 py-3.5"
                >
                  Start Your Journey <ArrowRight size={16} strokeWidth={2} />
                </button>
                <button
                  id="hero-cta-partner"
                  onClick={() => onNavigate('auth')}
                  className="btn-secondary text-sm px-7 py-3.5"
                >
                  <Shield size={15} strokeWidth={2} />
                  Partner With Us
                </button>
              </div>

              {/* Social Proof Row */}
              <div className="flex flex-wrap items-center gap-5 justify-center lg:justify-start animate-slide-up animate-delay-300">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-2">
                    {['PS', 'AM', 'KN', 'RG'].map((init, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-white gradient-navy flex items-center justify-center text-[9px] font-bold text-white"
                      >
                        {init}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-slate-600 font-medium">
                    <strong className="text-navy-800">1.2M+</strong> students guided
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  <span className="text-xs text-slate-600 font-medium ml-1">4.9 / 5 rating</span>
                </div>
              </div>
            </div>

            {/* Right Column — Floating Cards Visual */}
            <div className="relative hidden lg:flex items-center justify-center h-[480px]">
              {/* Central Card */}
              <div
                className="glass-light rounded-3xl p-6 w-72 text-center z-20 animate-float"
                style={{ animationDelay: '0ms' }}
              >
                <div className="w-12 h-12 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-3">
                  <Target size={22} className="text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1">Your Career Profile</h3>
                <div className="text-xs text-slate-500 mb-4">Personalized to your stage & goals</div>
                <div className="space-y-2">
                  {['Employment Track', 'Skill Gap: 2 areas', '85% Profile Match'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs bg-slate-50 rounded-lg px-3 py-2 text-slate-700">
                      <CheckCircle2 size={12} strokeWidth={2} className="text-navy-700" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Card 1 — Top Right */}
              <FloatingCard className="absolute top-4 right-0 w-52" delay={800}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg gradient-navy flex items-center justify-center">
                    <Briefcase size={12} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-navy-900">New Match!</span>
                </div>
                <p className="text-[11px] text-slate-600">Google SWE Internship</p>
                <p className="text-[10px] text-slate-400">98% profile match · 3 days left</p>
              </FloatingCard>

              {/* Floating Card 2 — Bottom Left */}
              <FloatingCard className="absolute bottom-16 left-0 w-52" delay={1200}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg gradient-navy flex items-center justify-center">
                    <TrendingUp size={12} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-navy-900">Exam Alert</span>
                </div>
                <p className="text-[11px] text-slate-600">UPSC Prelims 2025</p>
                <p className="text-[10px] text-slate-400">Notification released · Apply now</p>
              </FloatingCard>

              {/* Floating Card 3 — Top Left */}
              <FloatingCard className="absolute top-16 left-4 w-44" delay={400}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Award size={14} strokeWidth={2} className="text-navy-700" />
                  <span className="text-xs font-bold text-navy-900">Achievement</span>
                </div>
                <p className="text-[11px] text-slate-600">Roadmap Phase 2 Complete!</p>
              </FloatingCard>

              {/* Floating Card 4 — Bottom Right */}
              <FloatingCard className="absolute bottom-4 right-4 w-48" delay={1600}>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={13} strokeWidth={2} className="text-navy-700" />
                  <span className="text-xs font-bold text-navy-900">Mentor Match</span>
                </div>
                <p className="text-[11px] text-slate-600">Dr. Anita Rao available</p>
                <p className="text-[10px] text-slate-400">IIT Bombay · Data Science</p>
              </FloatingCard>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-40">
          <span className="text-[10px] text-slate-500 font-medium">Explore tracks</span>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section id="stats" className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PARTNER_STATS.map((s, i) => (
              <StatCard
                key={i}
                value={s.value}
                label={s.label}
                icon={
                  i === 0 ? <Globe size={18} strokeWidth={2} /> :
                  i === 1 ? <Users size={18} strokeWidth={2} /> :
                  i === 2 ? <Star size={18} strokeWidth={2} /> :
                  <TrendingUp size={18} strokeWidth={2} />
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Which Portal Is Yours? Toggle Bar ── */}
      <section id="portal-comparison" className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass-light rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-navy-900 text-center mb-2">
              Which Portal Belongs to You?
            </h2>
            <p className="text-slate-500 text-sm text-center mb-8">
              Two distinct portals — each built for a completely different mission.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Seeker Side */}
              <div className="rounded-2xl p-6" style={{ background: 'rgba(30,58,138,0.04)', border: '1px solid rgba(30,58,138,0.10)' }}>
                <div className="badge-light mb-4 w-fit">
                  <CheckCircle2 size={12} /> Career Guidance Portal
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1">For Individuals</h3>
                <p className="text-xs text-slate-500 mb-4">Students, job seekers, aspirants & founders</p>
                <ul className="space-y-2">
                  {[
                    'Personalized 5-track career roadmaps',
                    'Skill-gap analyzer & resume tools',
                    'Exam tracker & notification alerts',
                    'Mentor matching & SOP workspace',
                    'Scholarship & incubator directories',
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={14} strokeWidth={2} className="text-navy-700 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  id="comparison-seeker-cta"
                  onClick={() => onNavigate('seeker-dashboard')}
                  className="mt-5 btn-primary text-xs w-full justify-center"
                >
                  Preview Seeker Dashboard
                </button>
              </div>

              {/* Partner Side */}
              <div className="rounded-2xl p-6 gradient-navy">
                <div className="badge-dark mb-4 w-fit">
                  <ShieldCheck size={12} className="inline" /> Partnership Portal
                </div>
                <h3 className="text-base font-bold text-white mb-1">For Institutions</h3>
                <p className="text-xs text-white/50 mb-4">Universities, recruiters, incubators & mentors</p>
                <ul className="space-y-2">
                  {[
                    'Post verified jobs & internships',
                    'Access curated talent pipeline',
                    'Host mentorship cohort programs',
                    'Analytics & conversion dashboards',
                    'Co-branded institutional pages',
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle2 size={14} strokeWidth={2} className="text-blue-300 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  id="comparison-partner-cta"
                  onClick={() => onNavigate('partner-dashboard')}
                  className="mt-5 btn-glass text-xs w-full justify-center"
                >
                  Preview Partner Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pathway Explorer ── */}
      <PathwayExplorer onNavigate={onNavigate} />

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="badge-light mx-auto mb-4 w-fit">
              <Star size={12} strokeWidth={2} /> Real Success Stories
            </div>
            <h2 className="text-3xl font-bold text-navy-900">
              From Aspirants to <span className="gradient-text-navy">Achievers</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                id={`testimonial-${i}`}
                className="glass-light rounded-2xl p-5 scroll-reveal hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={11} fill="#1E3A8A" className="text-navy-700" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-navy-900">{t.name}</div>
                    <div className="text-[10px] text-slate-500">{t.role}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: 'rgba(30,58,138,0.08)', color: '#1E3A8A' }}
                  >
                    {t.track} Track
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section id="cta-banner" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-10 text-center text-white"
            style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
              boxShadow: '0 20px 60px rgb(10,25,47,0.30)',
            }}
          >
            <div className="badge-dark mx-auto mb-5 w-fit">
              <Zap size={12} /> Start Today — It's Free
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Take Your NextStep?</h2>
            <p className="text-white/60 text-base max-w-md mx-auto mb-8 leading-relaxed">
              Join 1.2 million students, job seekers, and aspirants who found their path with NextStep.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                id="cta-banner-primary"
                onClick={() => onNavigate('auth')}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-navy-900 text-sm transition-all duration-300 hover:scale-[1.02]"
                style={{ background: 'white' }}
              >
                Create Free Account <ArrowRight size={16} strokeWidth={2} />
              </button>
              <button
                id="cta-banner-partner"
                onClick={() => onNavigate('auth')}
                className="btn-glass text-sm px-8 py-3.5"
              >
                Partner with NextStep
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-4 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg gradient-navy flex items-center justify-center">
                <Target size={14} className="text-white" strokeWidth={2} />
              </div>
              <span className="font-bold text-navy-900">NextStep</span>
            </div>
            <p className="text-xs text-slate-400 text-center">
              © 2025 NextStep Platform · Human-First Career Discovery · Built with ❤️ in India
            </p>
            <div className="flex items-center gap-4">
              {['Privacy', 'Terms', 'Contact'].map((l) => (
                <button key={l} className="text-xs text-slate-500 hover:text-navy-700 transition-colors">
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};


export default LandingPage;
