import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface ChipData {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  driftDuration: number;
  driftDistance: number;
}

const CHIPS: ChipData[] = [
  {
    id: 'chip-1',
    label: "PCCoE Pune '27",
    sublabel: 'Computer Engineering',
    icon: '⚡',
    driftDuration: 4.2,
    driftDistance: 10,
  },
  {
    id: 'chip-2',
    label: 'Available For Work',
    sublabel: 'Full-Stack & AI/ML',
    icon: '●',
    driftDuration: 5.1,
    driftDistance: -12,
  },
  {
    id: 'chip-3',
    label: 'Pune, Maharashtra',
    sublabel: 'India · IST (UTC+5:30)',
    icon: '📍',
    driftDuration: 4.8,
    driftDistance: 8,
  },
  {
    id: 'chip-4',
    label: 'Open Source',
    sublabel: '35+ Public Repos',
    icon: '✦',
    driftDuration: 3.8,
    driftDistance: -10,
  },
];

const DraggableChip: React.FC<{ chip: ChipData; index: number }> = ({ chip, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const rotateZ = useTransform(smoothX, [-80, 80], [-10, 10]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
      dragElastic={0.4}
      dragSnapToOrigin
      style={{ x, y, rotateZ }}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      animate={{
        y: [0, chip.driftDistance, 0],
      }}
      transition={{
        y: {
          duration: chip.driftDuration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: index * 0.4,
        },
      }}
      data-hoverable="true"
      data-cursor-label="DRAG"
      className="group relative cursor-grab select-none rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface)]/80 backdrop-blur-md px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-md transition-colors hover:border-[#FF6B35]/50 hover:bg-[var(--surface-hover)] w-full"
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-mono flex-shrink-0 ${
            chip.icon === '●'
              ? 'bg-[#FF6B35]/20 text-[#FF6B35]'
              : 'bg-[var(--border-hairline)] text-[var(--text-primary)]/80'
          }`}
        >
          {chip.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-display font-semibold tracking-wide text-[var(--text-primary)] truncate">
            {chip.label}
          </div>
          {chip.sublabel && (
            <div className="text-[10px] font-mono text-[var(--text-secondary)] truncate">
              {chip.sublabel}
            </div>
          )}
        </div>
      </div>
      {/* Indicator */}
      <span className="absolute -top-1 -right-1 flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B35] opacity-40"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6B35]/80"></span>
      </span>
    </motion.div>
  );
};

export const FloatingChips: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col justify-center items-center lg:items-end gap-3 sm:gap-4 p-2 sm:p-4 z-10"
    >
      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[var(--text-secondary)]/70 mb-1 pointer-events-none text-center lg:text-right">
        [ Interactive Nodes · Drag to interact ]
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-w-md w-full">
        {CHIPS.map((chip, index) => (
          <DraggableChip key={chip.id} chip={chip} index={index} />
        ))}
      </div>
    </div>
  );
};
