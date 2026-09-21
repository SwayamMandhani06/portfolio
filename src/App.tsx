import React from 'react';
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

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[#FF6B35]/20 selection:text-[var(--text-primary)] overflow-x-clip transition-colors duration-400">
          {/* Analog film grain overlay */}
          <GrainOverlay />

          {/* Tactile Custom Cursor */}
          <CustomCursor />

          {/* Fixed Top Navigation with Theme Switcher */}
          <Navbar />

          {/* Main Journey Flow */}
          <main className="overflow-x-clip">
            {/* 1. Hero with interactive dot-grid, draggable chips, scramble headline */}
            <Hero />

            {/* 2. Marquee strip */}
            <MarqueeStrip />

            {/* 3. About / How I Think */}
            <About />

            {/* 4. Journey / Experience Timeline */}
            <JourneyTimeline />

            {/* 5. What I Build / Capabilities */}
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
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
};

export default App;
