import React from 'react';
import { EXPERIMENTS } from '../data/portfolioData';
import { FadeIn } from '../components/motion/FadeIn';

export const MoreExperiments: React.FC = () => {
  return (
    <section
      id="experiments"
      className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-16 lg:px-20 bg-[var(--bg-base)] border-b border-[var(--border-hairline)] transition-colors duration-400"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <FadeIn delay={0.1}>
            <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-3 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
              ARCHIVE & LABS
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              More{' '}
              <span className="font-serif-accent font-normal italic text-3xl sm:text-5xl md:text-6xl px-1">
                experiments
              </span>
              .
            </h2>
          </FadeIn>
        </div>

        {/* 3-per-row Compact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {EXPERIMENTS.map((exp, index) => (
            <FadeIn key={exp.title} delay={0.1 + (index % 3) * 0.1}>
              <div
                data-hoverable="true"
                className="group flex flex-col justify-between h-full p-5 sm:p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border-hairline)] transition-all duration-300 hover:border-[#FF6B35]/40 hover:bg-[var(--surface-hover)] hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-[#FF6B35] font-semibold">
                      {exp.highlight || 'Project'}
                    </span>
                    <div className="flex items-center gap-3">
                      {exp.liveUrl && (
                        <a
                          href={exp.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live demo for ${exp.title}`}
                          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                      <a
                        href={exp.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repo for ${exp.title}`}
                        className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-2">
                    {exp.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-body">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-hairline)] font-mono text-xs text-[var(--text-secondary)]">
                  {exp.tech.join(' · ')}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
