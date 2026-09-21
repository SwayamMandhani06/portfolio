import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SmoothScroll } from './components/core/SmoothScroll';
import { GrainOverlay } from './components/core/GrainOverlay';
import { CustomCursor } from './components/core/CustomCursor';
import { Navbar } from './components/core/Navbar';
import { Hero } from './sections/Hero';
import { MarqueeStrip } from './sections/MarqueeStrip';
import { About } from './sections/About';
import { JourneyTimeline } from './sections/JourneyTimeline';
import { WhatIBuild } from './sections/WhatIBuild';
import { SelectedWork } from './sections/SelectedWork';
import { MoreExperiments } from './sections/MoreExperiments';
import { Proof } from './sections/Proof';
import { Contact } from './sections/Contact';
import { ResumeModal } from './components/ui/ResumeModal';
import { CommandPalette } from './components/ui/CommandPalette';
import { MusicPlayer } from './components/ui/MusicPlayer';
import { Preloader } from './components/ui/Preloader';
import { Terminal } from 'lucide-react';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    const handleOpenResume = () => setIsResumeOpen(true);
    const handleOpenCommandPalette = () => setIsCommandPaletteOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-resume-modal', handleOpenResume);
    window.addEventListener('open-command-palette', handleOpenCommandPalette);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-resume-modal', handleOpenResume);
      window.removeEventListener('open-command-palette', handleOpenCommandPalette);
    };
  }, []);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[#FF6B35]/20 selection:text-[var(--text-primary)] overflow-x-clip transition-colors duration-400">
          {/* Cinematic Preloader with Asset Preload & Multi-Panel Shutter Reveal */}
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

          {/* Analog film grain overlay */}
          <GrainOverlay />

          {/* Tactile Custom Cursor */}
          <CustomCursor />

          {/* Fixed Top Navigation with Theme Switcher & Resume */}
          <Navbar />

          {/* Main Journey Flow */}
          <main className="overflow-x-clip">
            {/* 1. Hero with interactive dot-grid, 3D shockwave orb, draggable chips, scramble headline */}
            <Hero />

            {/* 2. Marquee strip */}
            <MarqueeStrip />

            {/* 3. About / How I Think */}
            <About />

            {/* 4. Journey / Experience Timeline */}
            <JourneyTimeline />

            {/* 5. What I Build / Capabilities (Fixed text visibility) */}
            <WhatIBuild />

            {/* 6. Selected Work (Sticky-Stacking Cards) */}
            <SelectedWork />

            {/* 7. More Experiments */}
            <MoreExperiments />

            {/* 8. Proof (Research, IP, Awards, Certifications) */}
            <Proof />

            {/* 9. Contact (Closing Moment) */}
            <Contact />
          </main>

          {/* Floating Music Player: earrings by Malcolm Todd */}
          <MusicPlayer />

          {/* Floating Minimal Terminal Trigger Pill */}
          <div className="fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-40">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              data-hoverable="true"
              aria-label="Open Terminal (Cmd+K)"
              className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)]/90 backdrop-blur-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#FF6B35]/60 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-black/20"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF6B35]/15 flex items-center justify-center text-[#FF6B35]">
                <Terminal className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold">
                <span className="hidden sm:inline">TERM </span>⌘K
              </span>
            </button>
          </div>

          {/* Interactive Modals */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />

          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
};

export default App;
