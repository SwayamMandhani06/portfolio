import React from 'react';
import { PROOF_DATA } from '../data/portfolioData';
import { FadeIn } from '../components/motion/FadeIn';

export const Proof: React.FC = () => {
  return (
    <section
      id="proof"
      className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-16 lg:px-20 bg-[var(--bg-base)] border-b border-[var(--border-hairline)] transition-colors duration-400"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-16 md:mb-20">
          <FadeIn delay={0.1}>
            <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-3 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
              PROOF
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Not just{' '}
              <span className="font-serif-accent font-normal italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl px-1">
                demos
              </span>
              .
            </h2>
          </FadeIn>
        </div>

        {/* Three Primary Credibility Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {/* Block 1: Published Research */}
          <FadeIn delay={0.1}>
            <div className="h-full p-5 sm:p-7 md:p-8 rounded-[24px] sm:rounded-[32px] bg-[var(--surface)] border border-[var(--border-hairline)] flex flex-col justify-between transition-all duration-300 hover:border-[#FF6B35]/40 hover:bg-[var(--surface-hover)] shadow-sm">
              <div>
                <div className="text-xs uppercase tracking-widest font-mono text-[#FF6B35] mb-3 font-semibold">
                  01 / Peer-Reviewed Research
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)] mb-2 leading-snug">
                  {PROOF_DATA.research.paper}
                </h3>
                <div className="text-xs font-mono text-[var(--text-secondary)] mb-4">
                  {PROOF_DATA.research.venue}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                  {PROOF_DATA.research.description}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--border-hairline)] flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                AICCoNS 2025 Proceedings
              </div>
            </div>
          </FadeIn>

          {/* Block 2: Registered IP */}
          <FadeIn delay={0.2}>
            <div className="h-full p-5 sm:p-7 md:p-8 rounded-[24px] sm:rounded-[32px] bg-[var(--surface)] border border-[var(--border-hairline)] flex flex-col justify-between transition-all duration-300 hover:border-[#FF6B35]/40 hover:bg-[var(--surface-hover)] shadow-sm">
              <div>
                <div className="text-xs uppercase tracking-widest font-mono text-[#FF6B35] mb-3 font-semibold">
                  02 / Intellectual Property
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)] mb-2 leading-snug">
                  {PROOF_DATA.ip.name}
                </h3>
                <div className="text-xs font-mono text-[var(--text-secondary)] mb-4">
                  {PROOF_DATA.ip.registration}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                  Registered proprietary e-commerce and price-analytics platform for Indian farmers, certified under statutory national copyright protection.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--border-hairline)] flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                {PROOF_DATA.ip.certNo}
              </div>
            </div>
          </FadeIn>

          {/* Block 3: Recognition & Awards */}
          <FadeIn delay={0.3}>
            <div className="h-full p-5 sm:p-7 md:p-8 rounded-[24px] sm:rounded-[32px] bg-[var(--surface)] border border-[var(--border-hairline)] flex flex-col justify-between transition-all duration-300 hover:border-[#FF6B35]/40 hover:bg-[var(--surface-hover)] shadow-sm">
              <div>
                <div className="text-xs uppercase tracking-widest font-mono text-[#FF6B35] mb-3 font-semibold">
                  03 / Honors & Awards
                </div>
                <div className="space-y-4">
                  {PROOF_DATA.awards.map((award, i) => (
                    <div key={i} className="pb-3 border-b border-[var(--border-hairline)] last:border-b-0 last:pb-0">
                      <div className="text-sm font-display font-bold text-[var(--text-primary)]">
                        {award.title}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        {award.organization}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--border-hairline)] flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                200+ Chapters Evaluated
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Compact Clean Certifications Strip */}
        <FadeIn delay={0.4}>
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-hairline)] shadow-sm">
            <div className="text-xs uppercase tracking-widest font-mono text-[var(--text-secondary)] mb-4">
              Industry Certifications & Professional Simulations
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROOF_DATA.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-xs sm:text-sm text-[var(--text-primary)]/90 font-body py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]/70 flex-shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
