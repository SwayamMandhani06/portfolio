import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, FileDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Magnet } from '../motion/Magnet';
import { ScrambleText } from '../motion/ScrambleText';

const easeCurve = [0.25, 0.1, 0.25, 1] as const;

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [puneTime, setPuneTime] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setPuneTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeCurve }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-3 sm:px-8 md:px-12 lg:px-20 ${
        scrolled
          ? 'py-3 sm:py-4 bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border-hairline)] shadow-lg shadow-black/5'
          : 'py-4 sm:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Availability Badge with live Pune IST time */}
        <div className="flex items-center gap-2 sm:gap-2.5 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)]/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 shadow-sm flex-shrink-0">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B35]"></span>
          </span>
          <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[var(--text-secondary)] font-medium font-mono select-none">
            <span className="hidden md:inline">
              Available · Pune {puneTime && `${puneTime} IST`}
            </span>
            <span className="hidden sm:inline md:hidden">
              Available {puneTime && `· ${puneTime}`}
            </span>
            <span className="sm:hidden">
              Available
            </span>
          </span>
        </div>

        {/* Navigation Links + Theme Switcher */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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

          {/* Quick Contact Link on Mobile */}
          <a
            href="#contact"
            data-hoverable="true"
            className="md:hidden text-[11px] uppercase tracking-wider text-[var(--text-primary)] font-semibold hover:opacity-70 px-2 py-1"
          >
            Contact
          </a>

          {/* Interactive Terminal Trigger (Desktop) */}
          <Magnet strength={3} padding={80}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              data-hoverable="true"
              aria-label="Open Interactive Terminal (Cmd+K)"
              title="Open Terminal (⌘K)"
              className="hidden lg:flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] px-2.5 py-1.5 text-[10px] font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-all shadow-sm flex-shrink-0"
            >
              <span className="text-[#FF6B35] font-bold">&gt;_ ⌘K</span>
            </button>
          </Magnet>

          {/* Interactive Resume Modal Trigger */}
          <Magnet strength={3} padding={80}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-resume-modal'))}
              data-hoverable="true"
              data-cursor-label="RESUME"
              aria-label="View and Download Resume"
              className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] px-2.5 sm:px-3.5 py-1.5 text-xs font-display font-medium text-[var(--text-primary)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:shadow-md flex-shrink-0 group"
            >
              <FileDown className="h-3.5 w-3.5 text-[#FF6B35] group-hover:-translate-y-0.5 transition-transform" />
              <span className="tracking-wider uppercase text-[10px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                Resume
              </span>
            </button>
          </Magnet>

          {/* Luxury Editorial Theme Switcher */}
          <Magnet strength={3} padding={90}>
            <button
              onClick={toggleTheme}
              data-hoverable="true"
              aria-label="Toggle dark and cream themes"
              className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] px-2.5 sm:px-3.5 py-1.5 text-xs font-display font-medium text-[var(--text-primary)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:shadow-md flex-shrink-0"
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
