import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface ChipData {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  initialX?: string;
  initialY?: string;
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
    driftDistance: 12,
  },
  {
    id: 'chip-2',
    label: 'Available For Work',
    sublabel: 'Full-Stack & AI/ML',
    icon: '●',
    driftDuration: 5.1,
    driftDistance: -14,
  },
  {
    id: 'chip-3',
    label: 'Pune, Maharashtra',
    sublabel: 'India · IST (UTC+5:30)',
    icon: '📍',
    driftDuration: 4.8,
    driftDistance: 10,
  },
  {
    id: 'chip-4',
    label: 'Open Source',
    sublabel: '35+ Public Repos',
    icon: '✦',
    driftDuration: 3.8,
    driftDistance: -12,
  },
];

const DraggableChip: React.FC<{ chip: ChipData; index: number }> = ({ chip, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Velocity-based dynamic tilt physics
  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const rotateZ = useTransform(smoothX, [-80, 80], [-12, 12]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -140, right: 140, top: -100, bottom: 100 }}
      dragElastic={0.4}
      dragSnapToOrigin
      style={{ x, y, rotateZ }}
      whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
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
      className="group relative cursor-grab select-none rounded-2xl border border-white/10 bg-[#141416]/80 backdrop-blur-md px-4 py-3 shadow-lg shadow-black/40 transition-colors hover:border-[#FF6B35]/40 hover:bg-[#18181c]"
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-mono ${
            chip.icon === '●'
              ? 'bg-[#FF6B35]/20 text-[#FF6B35]'
              : 'bg-white/5 text-[#F2F0EC]/80'
          }`}
        >
          {chip.icon}
        </span>
        <div>
          <div className="text-xs font-display font-semibold tracking-wide text-[#F2F0EC]">
            {chip.label}
          </div>
          {chip.sublabel && (
            <div className="text-[10px] font-mono text-[#8F8D89]">
              {chip.sublabel}
            </div>
          )}
        </div>
      </div>
      {/* Subtle indicator hint */}
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
      className="relative w-full h-full min-h-[380px] flex flex-col justify-center items-center lg:items-end gap-5 p-4 z-10"
    >
      <div className="text-[11px] font-mono uppercase tracking-widest text-[#8F8D89]/60 mb-2 pointer-events-none text-center lg:text-right">
        [ Interactive Nodes · Drag to interact ]
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md w-full">
        {CHIPS.map((chip, index) => (
          <DraggableChip key={chip.id} chip={chip} index={index} />
        ))}
      </div>
    </div>
  );
};
