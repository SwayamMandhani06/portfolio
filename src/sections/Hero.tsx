import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Copy, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactButton } from '../components/ui/ContactButton';
import { LiveProjectButton } from '../components/ui/LiveProjectButton';
import { HeroOrbCanvas } from '../components/visual/HeroOrbCanvas';
import { FloatingChips } from '../components/visual/FloatingChips';
import { InteractiveDotGrid } from '../components/visual/InteractiveDotGrid';
import { ScrambleText } from '../components/motion/ScrambleText';
import { Magnet } from '../components/motion/Magnet';

const easeCurve = [0.25, 0.1, 0.25, 1] as const;

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [accentIndex, setAccentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 5200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAccentIndex((prev) => (prev + 1) % (PERSONAL_INFO.headlineAccents?.length || 1));
    }, 5800);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-4 sm:px-8 md:px-12 lg:px-20 overflow-x-clip bg-[var(--bg-base)] transition-colors duration-400">
      {/* Interactive Canvas Dot-Grid with cursor repel physics */}
      <InteractiveDotGrid />

      {/* Atmospheric subtle radial wash */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 75% 30%, rgba(255, 107, 53, 0.09) 0%, rgba(200, 16, 46, 0.04) 45%, transparent 75%)',
        }}
      />

      {/* Subtle blueprint corner coordinates */}
      <div className="absolute top-28 right-8 font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]/40 pointer-events-none hidden xl:block">
        [ SYS // 01 · 18.6298° N, 73.7997° E ]
      </div>

      {/* Main hero grid content */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center z-10 relative">
        {/* Left Column: Typography & CTAs (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Tagline / Cycling Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: easeCurve }}
            className="mb-4 flex items-center gap-3 text-xs md:text-sm font-medium uppercase tracking-widest text-[var(--text-secondary)]"
          >
            <span className="inline-block w-8 h-[1px] bg-[var(--text-secondary)]/40" />
            <div className="h-6 overflow-hidden relative inline-flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={PERSONAL_INFO.roles[roleIndex]}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="inline-block text-[var(--text-primary)] font-display tracking-wider font-semibold"
                >
                  {PERSONAL_INFO.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Hero Name: Guaranteed single line across all viewports */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeCurve }}
            className="font-display font-black text-[var(--text-primary)] tracking-tight leading-[0.95] text-[clamp(1.75rem,5.8vw,5.2rem)] xl:text-[clamp(2.5rem,5.5vw,5.5rem)] whitespace-nowrap overflow-visible select-none"
          >
            <ScrambleText
              text={PERSONAL_INFO.name}
              as="h1"
              duration={1200}
              scrambleOnLoad={true}
              scrambleOnHover={true}
              className="cursor-default whitespace-nowrap inline-block"
            />
          </motion.div>

          {/* Subheadline: Slow, calm editorial font switch */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeCurve }}
            className="mt-6 text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] font-display font-medium tracking-tight max-w-2xl leading-snug"
          >
            <span>{PERSONAL_INFO.headline} </span>
            <span className="font-serif-accent italic text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-normal px-1 inline-flex items-center h-8 sm:h-9 overflow-hidden align-middle">
              <AnimatePresence mode="wait">
                <motion.span
                  key={PERSONAL_INFO.headlineAccents[accentIndex]}
                  initial={{ y: 14, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -14, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.65, ease: easeCurve }}
                  className="inline-block"
                >
                  {PERSONAL_INFO.headlineAccents[accentIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            <span>{PERSONAL_INFO.headlineSuffix}</span>
          </motion.h2>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: easeCurve }}
            className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Primary CTA */}
            <ContactButton label="View My Work" href="#work" />

            {/* Secondary CTA: Get In Touch */}
            <Magnet strength={3} padding={120}>
              <LiveProjectButton
                label="Get In Touch"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = `mailto:${PERSONAL_INFO.email}`;
                }}
                className="py-3 px-6 text-xs sm:text-sm font-display tracking-wider"
              />
            </Magnet>

            {/* Quick Copy Email Action */}
            <button
              onClick={handleCopyEmail}
              data-hoverable="true"
              aria-label="Copy email address"
              className="group flex items-center gap-2 px-4 py-3 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-all duration-300 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-500 font-semibold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[#FF6B35] transition-colors" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            {/* Download Resume Action */}
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Swayam_Mandhani_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-hoverable="true"
              data-cursor-label="RESUME"
              aria-label="Download Resume"
              className="group flex items-center gap-2 px-4 py-3 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-all duration-300 shadow-sm"
            >
              <FileDown className="w-3.5 h-3.5 text-[#FF6B35] group-hover:-translate-y-0.5 transition-transform" />
              <span>Resume (PDF)</span>
            </a>
          </motion.div>

          {/* Social Row with Magnets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: easeCurve }}
            className="mt-10 flex items-center gap-4"
          >
            {/* GitHub */}
            <Magnet strength={4} padding={70}>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                data-hoverable="true"
                aria-label="GitHub Profile"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] text-[var(--text-secondary)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:text-[var(--text-primary)] hover:scale-105 shadow-sm"
              >
                <svg className="h-4 w-4 fill-currentColor transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </Magnet>

            {/* LinkedIn */}
            <Magnet strength={4} padding={70}>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-hoverable="true"
                aria-label="LinkedIn Profile"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] text-[var(--text-secondary)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:text-[var(--text-primary)] hover:scale-105 shadow-sm"
              >
                <svg className="h-4 w-4 fill-currentColor transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
                </svg>
              </a>
            </Magnet>

            {/* Email */}
            <Magnet strength={4} padding={70}>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                data-hoverable="true"
                aria-label="Send Email"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] text-[var(--text-secondary)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:text-[var(--text-primary)] hover:scale-105 shadow-sm"
              >
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
            </Magnet>
          </motion.div>
        </div>

        {/* Right Column: 3D Geodesic Wireframe Centerpiece + Interactive Draggable Chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeCurve }}
          className="lg:col-span-5 relative flex flex-col items-center justify-center w-full"
        >
          {/* Restored 3D Wireframe / Ambient Orb Centerpiece */}
          <div className="relative w-full flex items-center justify-center">
            <HeroOrbCanvas />
          </div>

          {/* Integrated Draggable Floating Chips below 3D element */}
          <div className="w-full mt-4 relative z-20">
            <FloatingChips />
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-7xl mx-auto w-full pt-4 flex items-center justify-between text-[11px] uppercase tracking-widest text-[var(--text-secondary)]/80"
      >
        <span>PCCoE Pune · Batch 2027</span>
        <span className="hidden sm:inline-block animate-pulse">Scroll to explore ↓</span>
        <span>Systems & AI Engineer</span>
      </motion.div>
    </section>
  );
};
