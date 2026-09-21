import React from 'react';
import { GraduationCap, MapPin, Award, BookOpen, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AnimatedText } from '../components/motion/AnimatedText';
import { FadeIn } from '../components/motion/FadeIn';

export const About: React.FC = () => {
  const credibilityIcons = [
    GraduationCap,
    MapPin,
    Award,
    BookOpen,
  ];

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-16 lg:px-20 bg-[var(--bg-base)] overflow-hidden border-b border-[var(--border-hairline)] transition-colors duration-400"
    >
      {/* Ambient background soft glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(255, 107, 53, 0.08) 0%, rgba(74, 14, 78, 0.04) 50%, transparent 80%)',
        }}
      />

      {/* Subtle blueprint corner coordinates */}
      <div className="absolute top-10 right-8 font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]/40 pointer-events-none hidden xl:block">
        [ PHILOSOPHY // 02 · FULL-STACK & AI ]
      </div>

      {/* 4 Decorative Corner Wireframe SVGs */}
      <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none opacity-20 hidden md:block">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full stroke-[var(--text-primary)]">
          <path d="M0 16H16V0" strokeWidth="1" />
          <path d="M0 32H32V0" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 w-16 h-16 pointer-events-none opacity-20 hidden md:block">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full stroke-[var(--text-primary)]">
          <path d="M64 16H48V0" strokeWidth="1" />
          <path d="M64 32H32V0" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Kicker */}
        <FadeIn delay={0.1}>
          <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-mono mb-4 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
            [ ABOUT // CORE PHILOSOPHY ]
          </div>
        </FadeIn>

        {/* Section Heading: Display + Serif Accent */}
        <FadeIn delay={0.2}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.15] mb-8 sm:mb-10">
            From whiteboard to{' '}
            <span className="font-serif-accent font-normal italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl px-1">
              production
            </span>
            .
          </h2>
        </FadeIn>

        {/* Character-by-character scroll reveal text */}
        <div className="my-8 sm:my-10 text-lg sm:text-2xl md:text-3xl text-[var(--text-primary)] font-display font-normal tracking-tight">
          <AnimatedText text={PERSONAL_INFO.bio} className="text-[var(--text-primary)]" />
        </div>

        {/* Key Engineering Metric Counters */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10 p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-hairline)] shadow-sm">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[#FF6B35]">
                35+
              </div>
              <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mt-1">
                Public Repositories
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[var(--text-primary)]">
                200+
              </div>
              <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mt-1">
                Chapters Evaluated
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[#FF6B35]">
                1st
              </div>
              <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mt-1">
                ACM Website Award '25
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[var(--text-primary)]">
                1
              </div>
              <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mt-1">
                Statutory Copyright IP
              </div>
            </div>
          </div>
        </FadeIn>

          {/* Credibility Chips */}
          <FadeIn delay={0.4}>
            <div className="pt-6 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PERSONAL_INFO.chips.map((chip, idx) => {
                const Icon = credibilityIcons[idx];
                return (
                  <div
                    key={chip}
                    className="flex items-center gap-3 py-2 text-xs sm:text-sm font-body text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                    <span className="font-medium tracking-wide">{chip}</span>
                  </div>
                );
              })}
            </div>

            {/* Quick Resume Link */}
            <div className="mt-8 flex items-center justify-end">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-resume-modal'))}
                data-hoverable="true"
                data-cursor-label="RESUME"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B35] hover:text-[var(--text-primary)] transition-colors group"
              >
                <FileDown className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>View & Download Curriculum Vitae (PDF)</span>
                <span className="text-[10px] opacity-70 font-sans">↗</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  };
