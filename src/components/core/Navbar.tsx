import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import { Magnet } from '../motion/Magnet';
import { ScrambleText } from '../motion/ScrambleText';

const easeCurve = [0.25, 0.1, 0.25, 1] as const;

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Journey', href: '#journey' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeCurve }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 sm:px-12 md:px-16 lg:px-20 ${
        scrolled
          ? 'py-4 bg-[var(--bg-base)]/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/5'
          : 'py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Availability Badge */}
        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[var(--surface)]/70 backdrop-blur-sm px-4 py-1.5 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B35]"></span>
          </span>
          <span className="text-xs tracking-wider uppercase text-[var(--text-secondary)] font-medium font-body select-none">
            {PERSONAL_INFO.statusBadge}
          </span>
        </div>

        {/* Navigation Links + Theme Switcher */}
        <div className="flex items-center gap-6 lg:gap-8">
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <Magnet key={link.label} strength={4} padding={80}>
                <a
                  href={link.href}
                  data-hoverable="true"
                  className="text-xs uppercase tracking-widest text-[var(--text-primary)] transition-opacity duration-200 hover:opacity-70 font-medium"
                >
                  <ScrambleText text={link.label} scrambleOnLoad={false} scrambleOnHover={true} duration={250} />
                </a>
              </Magnet>
            ))}
          </nav>

          {/* Luxury Editorial Theme Switcher */}
          <Magnet strength={3} padding={90}>
            <button
              onClick={toggleTheme}
              data-hoverable="true"
              aria-label="Toggle dark and cream themes"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-[var(--surface)] px-3.5 py-1.5 text-xs font-display font-medium text-[var(--text-primary)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:shadow-md"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-[#FF6B35]" />
                  <span className="hidden sm:inline-block tracking-wider uppercase text-[10px] text-[var(--text-secondary)]">
                    Cream
                  </span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-[#FF6B35]" />
                  <span className="hidden sm:inline-block tracking-wider uppercase text-[10px] text-[var(--text-secondary)]">
                    Noir
                  </span>
                </>
              )}
            </button>
          </Magnet>
        </div>
      </div>
    </motion.header>
  );
};
