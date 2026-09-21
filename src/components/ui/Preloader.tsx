import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const PRELOAD_IMAGES = [
  '/projects/examsense-ai.png',
  '/projects/campuscare.png',
  '/projects/taskly.png',
  '/projects/retail-sales.png',
  '/projects/habit-tracker.png',
  '/projects/agro-product.png',
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Parallel Asset Preloading
    const preloadAssets = async () => {
      try {
        if ('fonts' in document) {
          await (document as any).fonts.ready;
        }
      } catch (e) {
        // Continue if font preloading throws
      }

      const imagePromises = PRELOAD_IMAGES.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      const audioPromise = new Promise<void>((resolve) => {
        const audio = new Audio();
        audio.src = '/audio/earrings-malcolm-todd.m4a';
        audio.preload = 'metadata';
        audio.onloadedmetadata = () => resolve();
        audio.onerror = () => resolve();
        setTimeout(resolve, 800);
      });

      await Promise.all([...imagePromises, audioPromise]);
    };

    preloadAssets();

    // Smooth, calm editorial counter
    const startTime = performance.now();
    const duration = 1600; // 1.6s smooth duration

    let animationFrameId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const raw = Math.min(elapsed / duration, 1);
      // Soft easeInOut cubic curve
      const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
      const current = Math.floor(eased * 100);

      setProgress(current);

      if (raw < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => setIsReady(true), 250);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, []);

  const columns = [0, 1, 2, 3, 4];

  const handleEnter = (withSong: boolean) => {
    if (withSong) {
      window.dispatchEvent(new CustomEvent('play-music'));
    }
    setIsExiting(true);
    setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, 1150);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isReady) {
        if (e.key === 'Escape') {
          setProgress(100);
          setIsReady(true);
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ' || e.key.toLowerCase() === 's') {
          e.preventDefault();
          handleEnter(true);
        } else if (e.key === 'Escape' || e.key.toLowerCase() === 'm') {
          e.preventDefault();
          handleEnter(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReady]);

  return (
    <div className="fixed inset-0 z-[999999] pointer-events-auto select-none overflow-hidden">
      {/* Multi-Panel Staggered Vertical Curtain Shutter Panels */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none z-0">
        {columns.map((colIndex) => (
          <motion.div
            key={colIndex}
            initial={{ y: '0%' }}
            animate={isExiting ? { y: '-100%' } : { y: '0%' }}
            transition={{
              duration: 0.85,
              delay: isExiting ? colIndex * 0.07 : 0,
              ease: [0.76, 0, 0.24, 1], // Luxury cubic-bezier shutter curve
            }}
            className="flex-1 h-full bg-[#0B0B0C] border-r border-white/[0.04] last:border-r-0"
          />
        ))}
      </div>

      {/* Foreground Content */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="relative w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 z-10 text-[#F7F5F0]"
          >
            {/* Top Bar: Minimalist Title */}
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#9E9C98]">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="text-[#F7F5F0] font-semibold">Swayam Mandhani</span>
              </div>
              <div>
                <span>Pune, IN · 2027</span>
              </div>
            </div>

            {/* Center Area: Editorial Minimalist Loading Block */}
            <div className="my-auto flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full px-4">
              {/* Monogram / Title */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10 sm:mb-12"
              >
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-[#F7F5F0] tracking-tight leading-[1.08] mb-3 sm:mb-4">
                  From whiteboard to{' '}
                  <span className="font-serif-accent font-normal italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FF6B35] px-1.5 inline-block">
                    production
                  </span>
                  .
                </h1>
                <p className="text-xs sm:text-sm md:text-base font-mono text-[#9E9C98] tracking-widest uppercase">
                  Full-Stack Engineering & AI Systems
                </p>
              </motion.div>

              {/* Counter: Clean, Bold Monospace */}
              <div className="font-mono text-lg sm:text-2xl md:text-3xl text-[#F7F5F0] tracking-wider mb-6 sm:mb-8">
                {!isReady ? (
                  <span className="tabular-nums">
                    loading <span className="animate-pulse">...</span> [ {String(progress).padStart(2, '0')} / 100 ]
                  </span>
                ) : (
                  <span className="text-[#FF6B35] font-semibold tracking-wider">
                    ready · select experience
                  </span>
                )}
              </div>

              {/* Minimalist 2px Line Indicator */}
              <div className="w-64 sm:w-80 md:w-96 h-[2px] bg-white/10 relative overflow-hidden mb-10">
                <motion.div
                  className="h-full bg-[#FF6B35]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              {/* Interactive Experience Choice (Enter with Sound vs Silence) */}
              <AnimatePresence>
                {isReady && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col items-center gap-4 w-full"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
                      {/* Option 1: Enter with Sound */}
                      <button
                        onClick={() => handleEnter(true)}
                        data-hoverable="true"
                        className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 rounded-full border border-[#FF6B35]/60 bg-[#FF6B35]/15 hover:bg-[#FF6B35] text-[#F7F5F0] hover:text-white text-xs sm:text-sm font-mono uppercase tracking-widest transition-all duration-200 active:scale-95 shadow-sm"
                      >
                        <Volume2 className="w-4 h-4 text-[#FF6B35] group-hover:text-white" />
                        <span>Enter with Sound</span>
                      </button>

                      {/* Option 2: Enter in Silence */}
                      <button
                        onClick={() => handleEnter(false)}
                        data-hoverable="true"
                        className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 sm:px-9 sm:py-4 rounded-full border border-white/15 bg-transparent hover:border-white/35 text-[#9E9C98] hover:text-[#F7F5F0] text-xs sm:text-sm font-mono uppercase tracking-widest transition-all duration-200 active:scale-95"
                      >
                        <VolumeX className="w-4 h-4 text-[#9E9C98] group-hover:text-[#F7F5F0]" />
                        <span>Enter Muted</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Bar: Instructions */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A]">
              <div>
                <span>PORTFOLIO // 2026</span>
              </div>
              <div>
                {isReady ? (
                  <span>[ ↵ with sound · ESC muted ]</span>
                ) : (
                  <span
                    onClick={() => {
                      setProgress(100);
                      setIsReady(true);
                    }}
                    className="cursor-pointer hover:text-[#F7F5F0] transition-colors"
                  >
                    [ ESC to skip ]
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
