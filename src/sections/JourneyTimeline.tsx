import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { TIMELINE } from '../data/portfolioData';
import { FadeIn } from '../components/motion/FadeIn';

export const JourneyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.5'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-16 lg:px-20 bg-[var(--bg-base)] border-b border-[var(--border-hairline)] transition-colors duration-400 overflow-hidden"
    >
      {/* Ambient background subtle radial illumination */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(255, 107, 53, 0.08) 0%, rgba(74, 14, 78, 0.04) 50%, transparent 80%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-mono mb-4 flex items-center justify-center gap-3">
              <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
              [ PROTOCOL 02 // TRAJECTORY ]
              <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Engineering{' '}
              <span className="font-serif-accent font-normal italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-1">
                trajectory
              </span>
              .
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] font-body max-w-lg mx-auto leading-relaxed">
              Proven impact across distributed product engineering, peer-reviewed research, statutory copyright registration, and community leadership.
            </p>
          </FadeIn>
        </div>

        {/* Timeline Container with Self-Drawing Line */}
        <div className="relative">
          {/* Background Guide Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-[var(--border-hairline)]" />

          {/* Foreground Animated Self-Drawing SVG Line */}
          {!shouldReduceMotion && (
            <svg
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 h-full -translate-x-1/2 pointer-events-none z-10"
              viewBox="0 0 2 1000"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="1000"
                stroke="#FF6B35"
                strokeWidth="2"
                style={{
                  pathLength,
                }}
              />
            </svg>
          )}

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={`${item.period}-${index}`}
                  className="relative flex flex-col justify-center group"
                >
                  {/* Central Indicator Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20 top-7 sm:top-8 md:top-1/2 md:-translate-y-1/2">
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[var(--bg-base)] border border-[var(--border-hairline)] group-hover:border-[#FF6B35] transition-colors duration-300 shadow-md">
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125 ${
                          item.isFuture ? 'bg-[var(--text-secondary)]' : 'bg-[#FF6B35]'
                        }`}
                      />
                      {!item.isFuture && (
                        <span className="absolute inset-0 rounded-full bg-[#FF6B35]/20 animate-ping pointer-events-none" />
                      )}
                    </div>
                  </div>

                  {/* Responsive Card */}
                  <div
                    className={`w-full pl-10 sm:pl-14 md:pl-0 ${
                      isEven
                        ? 'md:w-1/2 md:mr-auto md:pr-14 md:text-right'
                        : 'md:w-1/2 md:ml-auto md:pl-14 md:text-left'
                    }`}
                  >
                    <FadeIn delay={0.1} x={isEven ? -20 : 20}>
                      <div className="p-6 sm:p-7 md:p-8 rounded-[24px] sm:rounded-3xl bg-[var(--surface)] border border-[var(--border-hairline)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-[var(--surface-hover)] hover:shadow-xl hover:shadow-[#FF6B35]/5 shadow-sm">
                        {/* Top Phase & Badge Row */}
                        <div
                          className={`flex items-center gap-2 mb-3 ${
                            isEven ? 'md:justify-end' : 'justify-start'
                          }`}
                        >
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6B35] font-bold bg-[#FF6B35]/10 px-2.5 py-1 rounded-full border border-[#FF6B35]/20">
                            PHASE 0{index + 1}
                          </span>
                          <span className="text-xs uppercase tracking-widest font-mono text-[var(--text-secondary)] font-medium">
                            {item.period}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)] mb-1">
                          {item.role}
                        </h3>

                        {/* Organization */}
                        <div className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-3 sm:mb-4">
                          {item.organization}
                        </div>

                        {/* Narrative Description */}
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5 font-body">
                          {item.description}
                        </p>

                        {/* Metrics Pills */}
                        {item.metrics && (
                          <div
                            className={`flex flex-wrap gap-1.5 sm:gap-2 pt-4 border-t border-[var(--border-hairline)] ${
                              isEven ? 'md:justify-end' : 'justify-start'
                            }`}
                          >
                            {item.metrics.map((metric) => (
                              <span
                                key={metric}
                                className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-mono font-medium px-2.5 sm:px-3 py-1 rounded-full bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[#FF6B35]/40 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                                <span>{metric}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </FadeIn>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
