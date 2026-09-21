import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactButton } from '../components/ui/ContactButton';
import { LiveProjectButton } from '../components/ui/LiveProjectButton';
import { HeroOrbCanvas } from '../components/visual/HeroOrbCanvas';
import { FloatingChips } from '../components/visual/FloatingChips';
import { ScrambleText } from '../components/motion/ScrambleText';
import { Magnet } from '../components/motion/Magnet';

const easeCurve = [0.25, 0.1, 0.25, 1] as const;

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 overflow-x-clip bg-[var(--bg-base)] transition-colors duration-400">
      {/* Subtle ambient line grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] -z-10"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main hero grid content */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 relative">
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

          {/* Hero Name with Text-Scramble on Load & Hover */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeCurve }}
            className="font-display font-black text-[var(--text-primary)] tracking-tight leading-[0.95] text-[clamp(2.75rem,7vw,5.75rem)] lg:whitespace-nowrap"
          >
            <ScrambleText
              text={PERSONAL_INFO.name}
              as="h1"
              duration={900}
              scrambleOnLoad={true}
              scrambleOnHover={true}
              className="cursor-default"
            />
          </motion.div>

          {/* Subheadline: Mixing Display + Italic Serif Accent with Hover Scramble */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeCurve }}
            className="mt-6 text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] font-display font-medium tracking-tight max-w-2xl leading-snug"
          >
            <span>{PERSONAL_INFO.headline} </span>
            <span className="font-serif-accent italic text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-normal px-0.5 inline-block">
              <ScrambleText
                text={PERSONAL_INFO.headlineAccent}
                duration={400}
                scrambleOnLoad={false}
                scrambleOnHover={true}
              />
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
            {/* Primary CTA: ContactButton with luxury gradient */}
            <ContactButton label="View My Work" href="#work" />

            {/* Secondary CTA: Ghost button with Magnet */}
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
          <div className="w-full -mt-10 relative z-20">
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
