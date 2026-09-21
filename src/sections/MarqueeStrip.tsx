import React, { useEffect, useRef, useState } from 'react';
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../data/portfolioData';

export const MarqueeStrip: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            setScrollOffset(progress * 400);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-[var(--bg-base)] overflow-hidden border-y border-[var(--border-hairline)] select-none transition-colors duration-400"
    >
      {/* Row 1: Moves Right on Scroll */}
      <div className="relative w-full overflow-hidden mb-4 sm:mb-6">
        <div
          className="flex gap-4 sm:gap-6 will-change-transform transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(calc(-20% + ${scrollOffset * 0.45}px))`,
          }}
        >
          {MARQUEE_ROW_1.concat(MARQUEE_ROW_1).map((tech, i) => (
            <div
              key={`row1-${i}`}
              data-hoverable="true"
              className="flex-shrink-0 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] px-6 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-display font-medium uppercase tracking-widest text-[var(--text-secondary)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] shadow-sm"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves Left on Scroll */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-4 sm:gap-6 will-change-transform transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(calc(-5% - ${scrollOffset * 0.45}px))`,
          }}
        >
          {MARQUEE_ROW_2.concat(MARQUEE_ROW_2).map((tech, i) => (
            <div
              key={`row2-${i}`}
              data-hoverable="true"
              className="flex-shrink-0 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] px-6 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-display font-medium uppercase tracking-widest text-[var(--text-secondary)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] shadow-sm"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
