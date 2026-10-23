import React, { useState, useEffect } from 'react';
import {
  Briefcase, GraduationCap, Landmark, BookOpen, Rocket,
  X, ChevronRight, Clock, Zap, CheckCircle2, Star,
  ArrowRight, Users, TrendingUp
} from 'lucide-react';
import { CAREER_TRACKS, type CareerTrackData, type CareerTrack } from '../data/appData';

const iconMap: Record<string, React.FC<any>> = {
  Briefcase, GraduationCap, Landmark, BookOpen, Rocket,
};

interface PathwayExplorerProps {
  onNavigate: (view: string) => void;
}

const TrackIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 24 }) => {
  const Icon = iconMap[name] || Briefcase;
  return <Icon size={size} strokeWidth={1.75} />;
};

const TrackCard: React.FC<{
  track: CareerTrackData;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}> = ({ track, isSelected, onClick, index }) => {
  return (
    <button
      id={`track-card-${track.id}`}
      onClick={onClick}
      className={`track-card text-left w-full group ${
        isSelected ? '-translate-y-2 border-t-navy-700' : ''
      }`}
      style={{
        animationDelay: `${index * 80}ms`,
        borderTopColor: isSelected ? '#1E3A8A' : 'transparent',
        borderTopWidth: '3px',
      }}
    >
      {/* Icon Container */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
          isSelected ? 'gradient-navy text-white shadow-md' : 'bg-slate-100 text-navy-700 group-hover:bg-navy-700/10'
        }`}
      >
        <TrackIcon name={track.icon} size={22} />
      </div>

      <h3 className="text-base font-bold text-navy-900 mb-0.5">{track.title}</h3>
      <p className="text-xs text-slate-500 font-medium mb-3">{track.subtitle}</p>

      <ul className="space-y-1.5 mb-4">
        {track.features.slice(0, 2).map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
            <CheckCircle2 size={12} strokeWidth={2} className="text-navy-700 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Stats Row */}
      <div className="flex items-center gap-3 mt-auto">
        {track.stats.slice(0, 1).map((s, i) => (
          <div key={i} className="text-left">
            <div className="text-sm font-bold text-navy-800">{s.value}</div>
            <div className="text-[10px] text-slate-500 leading-tight">{s.label}</div>
          </div>
        ))}
        <div className="ml-auto">
          <ChevronRight
            size={16}
            strokeWidth={2}
            className={`transition-transform duration-300 ${isSelected ? 'text-navy-700 translate-x-1' : 'text-slate-400 group-hover:translate-x-0.5'}`}
          />
        </div>
      </div>

      {isSelected && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: '0 0 0 1.5px #1E3A8A inset, 0 20px 60px rgb(30,58,138,0.08)' }}
        />
      )}
    </button>
  );
};

const RoadmapPanel: React.FC<{ track: CareerTrackData; onClose: () => void }> = ({ track, onClose }) => {
  return (
    <div className="glass-light rounded-3xl p-6 lg:p-8 animate-scale-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-navy flex items-center justify-center">
            <TrackIcon name={track.icon} size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy-900">{track.title} Roadmap</h3>
            <p className="text-xs text-slate-500">{track.subtitle}</p>
          </div>
        </div>
        <button
          id="close-roadmap"
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {track.stats.map((s, i) => (
          <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'rgba(30,58,138,0.04)', border: '1px solid rgba(30,58,138,0.08)' }}>
            <div className="text-lg font-bold gradient-text-navy">{s.value}</div>
            <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">What you get</p>
        <div className="grid grid-cols-2 gap-2">
          {track.features.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-700 p-2 rounded-lg bg-white/60">
              <Zap size={13} strokeWidth={2} className="text-navy-700 mt-0.5 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Step-by-Step Path</p>
        <div className="relative space-y-1">
          {track.roadmap.map((step, i) => (
            <div key={i} className="flex gap-4 relative">
              {/* Timeline Line */}
              {i < track.roadmap.length - 1 && (
                <div className="absolute left-4 top-9 bottom-0 w-px bg-gradient-to-b from-navy-700/30 to-transparent" />
              )}

              {/* Step Number */}
              <div className="shrink-0 w-8 h-8 rounded-full gradient-navy flex items-center justify-center text-white text-xs font-bold shadow-sm mt-0.5">
                {i + 1}
              </div>

              {/* Content */}
              <div className="flex-1 pb-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold text-navy-700 bg-navy-700/8 px-2 py-0.5 rounded-full">
                    {step.phase}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock size={10} strokeWidth={2} /> {step.duration}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-navy-900 mb-1">{step.title}</h4>
                <p className="text-xs text-slate-500 mb-2 leading-relaxed">{step.description}</p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {step.skills.map((s, j) => (
                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Milestones */}
                <div className="space-y-1">
                  {step.milestones.map((m, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <Star size={9} strokeWidth={2} className="text-navy-700 shrink-0" />
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PathwayExplorer: React.FC<PathwayExplorerProps> = ({ onNavigate }) => {
  const [selectedTrack, setSelectedTrack] = useState<CareerTrack | null>(null);

  const selected = CAREER_TRACKS.find((t) => t.id === selectedTrack) || null;

  return (
    <section id="pathway-explorer" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="badge-light mb-4 mx-auto w-fit">
            <TrendingUp size={12} strokeWidth={2} />
            5 Proven Career Tracks
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Choose Your{' '}
            <span className="gradient-text-navy">Career Pathway</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
            Click any track to instantly preview a real-world step-by-step roadmap, required skills, and connected institutional partners.
          </p>
        </div>

        <div className={`grid gap-6 ${selected ? 'lg:grid-cols-5' : 'lg:grid-cols-5'}`}>
          {/* Track Cards Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${selected ? 'lg:col-span-2 lg:grid-cols-1' : 'lg:col-span-5 lg:grid-cols-5'} transition-all duration-500`}>
            {CAREER_TRACKS.map((track, i) => (
              <TrackCard
                key={track.id}
                track={track}
                isSelected={selectedTrack === track.id}
                onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                index={i}
              />
            ))}
          </div>

          {/* Roadmap Panel */}
          {selected && (
            <div className="lg:col-span-3 animate-slide-in-right">
              <RoadmapPanel
                track={selected}
                onClose={() => setSelectedTrack(null)}
              />
              <div className="mt-4 flex gap-3">
                <button
                  id={`cta-explore-${selected.id}`}
                  onClick={() => onNavigate('auth')}
                  className="btn-primary flex-1 justify-center"
                >
                  Start {selected.title} Journey <ArrowRight size={16} strokeWidth={2} />
                </button>
                <button className="btn-secondary px-4">
                  <Users size={16} strokeWidth={2} />
                  Find Mentor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PathwayExplorer;
