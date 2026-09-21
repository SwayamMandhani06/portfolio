import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Responsive spring physics
  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const labelEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (labelEl) {
        setCursorLabel(labelEl.getAttribute('data-cursor-label'));
        setIsHovered(true);
        return;
      } else {
        setCursorLabel(null);
      }

      const isInteractive = Boolean(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[data-hoverable="true"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      );

      setIsHovered(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block">
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none select-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorLabel ? 72 : isHovered ? 44 : 8,
          height: cursorLabel ? 28 : isHovered ? 44 : 8,
          backgroundColor: cursorLabel
            ? '#FF6B35'
            : isHovered
            ? 'transparent'
            : '#FF6B35',
          borderWidth: cursorLabel ? 0 : isHovered ? 1.5 : 0,
          borderColor: '#FF6B35',
          boxShadow: cursorLabel
            ? '0 4px 16px rgba(255, 107, 53, 0.45)'
            : isHovered
            ? '0 0 16px rgba(255, 107, 53, 0.25)'
            : '0 0 8px rgba(255, 107, 53, 0.5)',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.35,
        }}
      >
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-display font-bold tracking-widest text-[#F2F0EC] uppercase"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
