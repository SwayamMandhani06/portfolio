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
      className="relative w-full py-28 md:py-36 px-6 sm:px-12 md:px-16 lg:px-20 bg-[var(--bg-base)] border-b border-[var(--border-hairline)] transition-colors duration-400"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-center gap-3">
              <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
              THE JOURNEY
              <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              A path of continuous{' '}
              <span className="font-serif-accent font-normal italic text-4xl sm:text-5xl md:text-6xl px-1">
                evolution
              </span>
              .
            </h2>
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
          <div className="space-y-16 md:space-y-24">
            {TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={`${item.period}-${index}`}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Central Indicator Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[var(--bg-base)] border border-[var(--border-hairline)] shadow-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.isFuture ? 'bg-[var(--text-secondary)]' : 'bg-[#FF6B35]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Left Side Content (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? 'md:pr-14 md:text-right' : 'md:hidden'
                    }`}
                  >
                    {isEven && (
                      <FadeIn delay={0.1} x={-20}>
                        <div className="p-6 md:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-hairline)] transition-all duration-300 hover:border-[#FF6B35]/40 hover:bg-[var(--surface-hover)] shadow-sm">
                          <div className="text-xs uppercase tracking-widest font-display font-semibold text-[#FF6B35] mb-2">
                            {item.period}
                          </div>
                          <h3 className="text-lg md:text-xl font-display font-bold text-[var(--text-primary)]">
                            {item.role}
                          </h3>
                          <div className="text-sm font-medium text-[var(--text-secondary)] mb-4">
                            {item.organization}
                          </div>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                            {item.description}
                          </p>
                          {item.metrics && (
                            <div className="flex flex-wrap gap-2 md:justify-end">
                              {item.metrics.map((metric) => (
                                <span
                                  key={metric}
                                  className="text-[11px] uppercase tracking-wider font-medium px-3 py-1 rounded-full bg-[var(--surface-hover)] text-[var(--text-primary)]/80 border border-[var(--border-hairline)]"
                                >
                                  {metric}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </FadeIn>
                    )}
                  </div>

                  {/* Right Side Content (Desktop) or Default on Mobile */}
                  <div
                    className={`w-full md:w-1/2 pl-12 ${
                      !isEven ? 'md:pl-14 md:text-left' : 'md:hidden'
                    }`}
                  >
                    <FadeIn delay={0.1} x={20}>
                      <div className="p-6 md:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-hairline)] transition-all duration-300 hover:border-[#FF6B35]/40 hover:bg-[var(--surface-hover)] shadow-sm">
                        <div className="text-xs uppercase tracking-widest font-display font-semibold text-[#FF6B35] mb-2">
                          {item.period}
                        </div>
                        <h3 className="text-lg md:text-xl font-display font-bold text-[var(--text-primary)]">
                          {item.role}
                        </h3>
                        <div className="text-sm font-medium text-[var(--text-secondary)] mb-4">
                          {item.organization}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                          {item.description}
                        </p>
                        {item.metrics && (
                          <div className="flex flex-wrap gap-2">
                            {item.metrics.map((metric) => (
                              <span
                                key={metric}
                                className="text-[11px] uppercase tracking-wider font-medium px-3 py-1 rounded-full bg-[var(--surface-hover)] text-[var(--text-primary)]/80 border border-[var(--border-hairline)]"
                              >
                                {metric}
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
