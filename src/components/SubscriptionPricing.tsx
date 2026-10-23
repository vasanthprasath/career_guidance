import React, { useState } from 'react';
import {
  X, Check, Zap, Crown, Star, ArrowRight, Shield,
  ChevronDown, Sparkles, Lock, Users, Clock, Calendar
} from 'lucide-react';
import {
  SUBSCRIPTION_PLANS,
  type SubscriptionTier,
  type SubscriptionPlan,
  type UserSubscription,
} from '../data/subscriptionData';

interface SubscriptionPricingProps {
  currentSubscription: UserSubscription;
  onSelectPlan: (tier: SubscriptionTier) => void;
  onClose: () => void;
}

const TierIcon: React.FC<{ tier: SubscriptionTier; size?: number }> = ({ tier, size = 20 }) => {
  if (tier === 'free') return <Users size={size} strokeWidth={1.75} />;
  if (tier === 'pro') return <Zap size={size} strokeWidth={1.75} />;
  return <Crown size={size} strokeWidth={1.75} />;
};

const PricingCard: React.FC<{
  plan: SubscriptionPlan;
  isCurrentPlan: boolean;
  billing: 'monthly' | 'quarterly';
  onSelect: () => void;
}> = ({ plan, isCurrentPlan, billing, onSelect }) => {
  const isElite = plan.tier === 'elite';
  const isPro = plan.tier === 'pro';

  return (
    <div
      id={`pricing-card-${plan.tier}`}
      className={`relative rounded-3xl p-6 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
        isElite
          ? 'text-white'
          : 'text-navy-900'
      }`}
      style={
        isElite
          ? {
              background: 'linear-gradient(135deg, #0A192F 0%, #0F172A 50%, #1E3A8A 100%)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 12px 40px rgb(10,25,47,0.30)',
            }
          : {
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(24px)',
              border: `1px solid ${isPro ? 'rgba(30,58,138,0.25)' : 'rgba(226,232,240,0.80)'}`,
              boxShadow: isPro
                ? '0 8px 30px rgb(30,58,138,0.12)'
                : '0 8px 30px rgb(15,23,42,0.06)',
            }
      }
    >
      {/* Popular Badge */}
      {plan.highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)' }}
        >
          <Sparkles size={10} className="inline mr-1 -mt-0.5" />
          MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className="mb-5">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
          isElite ? 'bg-white/12 text-blue-300' :
          isPro ? 'gradient-navy text-white' : 'bg-slate-100 text-navy-700'
        }`}>
          <TierIcon tier={plan.tier} size={20} />
        </div>

        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold">{plan.name}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
            isElite ? 'bg-white/12 text-white/80' : 'badge-light'
          }`}>
            {plan.tagline}
          </span>
        </div>

        <div className="flex items-baseline gap-1.5 mt-3">
          <span className="text-3xl font-bold">
            {billing === 'monthly' ? plan.price.monthly : plan.price.quarterly}
          </span>
          <span className={`text-sm ${isElite ? 'text-white/50' : 'text-slate-400'}`}>
            /{billing === 'monthly' ? 'mo' : 'qtr'}
          </span>
        </div>
        {billing === 'quarterly' && plan.price.quarterlyNote && (
          <p className={`text-[11px] mt-1 font-medium ${isElite ? 'text-blue-300' : 'text-green-600'}`}>
            {plan.price.quarterlyNote}
          </p>
        )}
      </div>

      {/* Session Badge */}
      <div className={`rounded-xl p-3 mb-5 ${
        isElite ? 'bg-white/8 border border-white/10' :
        isPro ? 'bg-navy-700/5 border border-navy-700/10' : 'bg-slate-50 border border-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar size={14} strokeWidth={2} className={isElite ? 'text-blue-300' : 'text-navy-700'} />
            <span className="text-sm font-bold">
              {plan.sessionsPerMonth === 0 ? 'No 1-on-1' : `${plan.sessionsPerMonth}× sessions/mo`}
            </span>
          </div>
          {plan.sessionDuration > 0 && (
            <span className={`text-xs ${isElite ? 'text-white/50' : 'text-slate-400'}`}>
              • {plan.sessionDuration} min each
            </span>
          )}
        </div>
        {plan.bookingWindow > 0 && (
          <p className={`text-[11px] mt-1 flex items-center gap-1 ${isElite ? 'text-white/40' : 'text-slate-400'}`}>
            <Clock size={10} strokeWidth={2} />
            Book up to {plan.bookingWindow} days in advance
          </p>
        )}
      </div>

      {/* Mentor Access */}
      <div className={`text-xs font-semibold mb-2.5 ${isElite ? 'text-white/50' : 'text-slate-400'}`}>
        Mentor Access: <span className={isElite ? 'text-blue-300' : 'text-navy-700'}>{plan.mentorAccess}</span>
      </div>

      {/* Feature List */}
      <ul className="space-y-2.5 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check
              size={14}
              strokeWidth={2.5}
              className={`shrink-0 mt-0.5 ${
                isElite ? 'text-blue-300' : isPro ? 'text-navy-700' : 'text-slate-400'
              }`}
            />
            <span className={isElite ? 'text-white/80' : 'text-slate-600'}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        id={`select-plan-${plan.tier}`}
        onClick={onSelect}
        disabled={isCurrentPlan}
        className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
          isCurrentPlan
            ? isElite
              ? 'bg-white/15 text-white/60 cursor-default'
              : 'bg-slate-100 text-slate-400 cursor-default'
            : isElite
              ? 'bg-white text-navy-900 hover:bg-white/90 hover:scale-[1.02] shadow-lg'
              : isPro
                ? 'gradient-navy text-white hover:scale-[1.02] shadow-md'
                : 'border border-slate-200 text-navy-800 hover:bg-slate-50 hover:border-navy-700/30'
        }`}
      >
        {isCurrentPlan ? (
          <>
            <Check size={15} /> Current Plan
          </>
        ) : plan.tier === 'free' ? (
          'Get Started — Free'
        ) : (
          <>
            Upgrade to {plan.name} <ArrowRight size={14} />
          </>
        )}
      </button>
    </div>
  );
};

const SubscriptionPricing: React.FC<SubscriptionPricingProps> = ({
  currentSubscription,
  onSelectPlan,
  onClose,
}) => {
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly');

  return (
    <div
      id="subscription-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,25,47,0.50)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <button
            id="close-subscription"
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all"
          >
            <X size={18} />
          </button>

          <div className="badge-dark mx-auto mb-4 w-fit">
            <Crown size={12} strokeWidth={2} /> Subscription Plans
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Unlock 1-on-1 Expert Mentorship
          </h2>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Choose the plan that fits your career stage. Upgrade anytime — your unused sessions roll forward.
          </p>

          {/* Billing Toggle */}
          <div
            className="inline-flex items-center rounded-xl p-1 gap-0.5 mt-5"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                billing === 'monthly' ? 'bg-white text-navy-900 shadow-sm' : 'text-white/50 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('quarterly')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                billing === 'quarterly' ? 'bg-white text-navy-900 shadow-sm' : 'text-white/50 hover:text-white'
              }`}
            >
              Quarterly
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-500 text-white font-bold">SAVE</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PricingCard
              key={plan.tier}
              plan={plan}
              isCurrentPlan={currentSubscription.tier === plan.tier}
              billing={billing}
              onSelect={() => onSelectPlan(plan.tier)}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-white/30 text-xs mt-6 flex items-center justify-center gap-2">
          <Shield size={12} strokeWidth={2} />
          Secure payment · Cancel anytime · 7-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPricing;
