import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { FadeIn } from '../components/motion/FadeIn';

export const WhatIBuild: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0].id);

  const selectedCategoryData =
    SKILL_CATEGORIES.find((cat) => cat.id === activeCategory) || SKILL_CATEGORIES[0];

  return (
    <section
      id="capabilities"
      className="relative w-full py-28 md:py-36 px-6 sm:px-12 md:px-16 lg:px-20 bg-[var(--bg-base)] border-b border-white/5 transition-colors duration-400"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <FadeIn delay={0.1}>
            <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-3 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
              CAPABILITIES
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Tools of the{' '}
              <span className="font-serif-accent font-normal italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-1">
                craft
              </span>
              .
            </h2>
          </FadeIn>
        </div>

        {/* Category Switcher Tabs */}
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-white/10 pb-4 mb-12">
            {SKILL_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  data-hoverable="true"
                  className={`relative px-4 py-2.5 text-xs sm:text-sm font-display uppercase tracking-widest transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--text-primary)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B35]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Category Skills Area with 40ms Staggered Slide-Up */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategoryData.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.045 },
                },
                exit: { opacity: 0, transition: { duration: 0.15 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {selectedCategoryData.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { ease: [0.25, 0.1, 0.25, 1], duration: 0.4 } },
                  }}
                  data-hoverable="true"
                  className="group flex items-center justify-between p-5 rounded-2xl bg-[var(--surface)] border border-white/10 transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-[var(--surface-hover)] shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-semibold text-[#FF6B35]">
                      0{index + 1}
                    </span>
                    <span className="text-base sm:text-lg font-display font-semibold text-[var(--text-primary)] group-hover:translate-x-1 transition-transform duration-200">
                      {skill}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#FF6B35] transition-colors duration-200" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
