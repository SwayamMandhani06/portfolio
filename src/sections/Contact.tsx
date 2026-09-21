import React, { useState } from 'react';
import { Mail, Phone, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactButton } from '../components/ui/ContactButton';
import { ConnectModal } from '../components/ui/ConnectModal';
import { FadeIn } from '../components/motion/FadeIn';

export const Contact: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSayHello = () => {
    setIsModalOpen(true);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-between py-20 sm:py-28 px-4 sm:px-8 md:px-16 lg:px-20 bg-[var(--bg-base)] overflow-hidden transition-colors duration-400"
    >
      {/* Interactive Direct Channels Connect Modal */}
      <ConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Subtle luxury gradient atmospheric wash */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(200, 16, 46, 0.12) 0%, rgba(74, 14, 78, 0.06) 50%, transparent 100%)',
        }}
      />

      <div className="max-w-5xl mx-auto w-full my-auto text-center z-10 flex flex-col items-center">
        {/* Kicker */}
        <FadeIn delay={0.1}>
          <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[var(--text-secondary)]/40" />
            GET IN TOUCH
            <span className="w-8 h-[1px] bg-[var(--text-secondary)]/40" />
          </div>
        </FadeIn>

        {/* Closing Headline: Let's build something real. */}
        <FadeIn delay={0.2}>
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-[var(--text-primary)] tracking-tight leading-[0.95] mb-8 sm:mb-12 break-words">
            Let's build something{' '}
            <span className="font-serif-accent font-normal italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-[var(--text-primary)] block sm:inline-block px-1">
              real
            </span>
            .
          </h2>
        </FadeIn>

        {/* Subtitle statement */}
        <FadeIn delay={0.3}>
          <p className="max-w-xl text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-body mb-8 sm:mb-12 leading-relaxed px-2">
            Open for software engineering roles, AI & data analytics initiatives, and high-impact technical collaborations.
          </p>
        </FadeIn>

        {/* Giant Magnetic ContactButton with instant modal trigger */}
        <FadeIn delay={0.4}>
          <div className="mb-12 sm:mb-16">
            <ContactButton
              label="Say Hello"
              onClick={handleSayHello}
              size="large"
              className="text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5"
            />
          </div>
        </FadeIn>

        {/* Direct Social & Contact Channels */}
        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-10 text-xs sm:text-sm font-mono text-[var(--text-secondary)]">
            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              data-hoverable="true"
              className="flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
            >
              <svg className="w-4 h-4 fill-currentColor flex-shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>github.com/SwayamMandhani06</span>
            </a>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-hoverable="true"
              className="flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
            >
              <svg className="w-4 h-4 fill-currentColor flex-shrink-0" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
              </svg>
              <span>linkedin.com/in/swayam-mandhani</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              data-hoverable="true"
              className="flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>{PERSONAL_INFO.email}</span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              data-hoverable="true"
              className="flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{PERSONAL_INFO.phone}</span>
            </a>

            {/* Resume */}
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Swayam_Mandhani_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-hoverable="true"
              className="flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
            >
              <FileDown className="w-4 h-4 flex-shrink-0 text-[#FF6B35]" />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto w-full pt-12 sm:pt-16 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-secondary)] text-center sm:text-left">
        <div>
          {PERSONAL_INFO.location} · {PERSONAL_INFO.statusBadge}
        </div>
        <div>
          Designed & Engineered with Precision · © {new Date().getFullYear()} Swayam Mandhani
        </div>
      </div>
    </section>
  );
};
