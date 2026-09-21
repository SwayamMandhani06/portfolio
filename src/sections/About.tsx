import React from 'react';
import { GraduationCap, MapPin, Award, BookOpen } from 'lucide-react';
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
      className="relative w-full py-28 md:py-36 px-6 sm:px-12 md:px-16 lg:px-20 bg-[var(--bg-base)] overflow-hidden border-b border-[var(--border-hairline)] transition-colors duration-400"
    >
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
      <div className="absolute bottom-8 left-8 w-16 h-16 pointer-events-none opacity-20 hidden md:block">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full stroke-[var(--text-primary)]">
          <path d="M0 48H16V64" strokeWidth="1" />
          <path d="M0 32H32V64" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none opacity-20 hidden md:block">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full stroke-[var(--text-primary)]">
          <path d="M64 48H48V64" strokeWidth="1" />
          <path d="M64 32H32V64" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Kicker */}
        <FadeIn delay={0.1}>
          <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-4 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
            ABOUT
          </div>
        </FadeIn>

        {/* Section Heading: Display + Serif Accent */}
        <FadeIn delay={0.2}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-10">
            From whiteboard to{' '}
            <span className="font-serif-accent font-normal italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-1">
              production
            </span>
            .
          </h2>
        </FadeIn>

        {/* Character-by-character scroll reveal text */}
        <div className="my-10 text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] font-display font-normal tracking-tight">
          <AnimatedText text={PERSONAL_INFO.bio} className="text-[var(--text-primary)]" />
        </div>

        {/* Credibility Chips */}
        <FadeIn delay={0.4}>
          <div className="mt-14 pt-8 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </FadeIn>
      </div>
    </section>
  );
};
