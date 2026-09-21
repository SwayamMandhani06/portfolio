import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FLAGSHIP_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { LiveProjectButton } from '../components/ui/LiveProjectButton';
import { FadeIn } from '../components/motion/FadeIn';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  containerProgress: MotionValue<number>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, total, containerProgress }) => {
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(
    containerProgress,
    [index / total, (index + 1) / total],
    [1, targetScale]
  );

  return (
    <div className="relative md:sticky md:top-28 lg:top-32 w-full mb-8 sm:mb-12 md:mb-20">
      <motion.div
        style={{ scale }}
        className="relative w-full rounded-[24px] sm:rounded-[36px] md:rounded-[48px] border-2 border-[var(--border-hairline)] bg-[var(--surface)] p-5 sm:p-8 md:p-10 transition-shadow duration-300 hover:shadow-2xl shadow-black/10 overflow-hidden"
      >
        {/* Card Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[var(--border-hairline)]">
          <div className="flex items-baseline gap-3 sm:gap-6">
            <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-[var(--text-primary)]/20">
              {project.number}
            </span>
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-1">
                {project.category} · {project.year}
              </div>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)]">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            {project.liveUrl ? (
              <LiveProjectButton label="Live Project" href={project.liveUrl} />
            ) : (
              <LiveProjectButton
                label="Live Demo"
                onClick={() => alert('Live deployment coming soon. Check the GitHub repository for the complete demo video and setup instructions.')}
              />
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-hoverable="true"
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Code</span>
            </a>
          </div>
        </div>

        {/* Authentic Browser Frame Project Preview */}
        <div className="my-6">
          <a
            href={project.liveUrl || project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-hoverable="true"
            data-cursor-label="VISIT"
            className="group relative block rounded-2xl sm:rounded-3xl border border-[var(--border-hairline)] bg-[var(--surface-hover)] overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#FF6B35]/60 hover:shadow-[#FF6B35]/10"
          >
            {/* macOS / Modern Browser Window Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[var(--border-hairline)] bg-[var(--surface)]/90 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]/80" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]/80" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]/80" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-[10px] sm:text-xs font-mono text-[var(--text-secondary)] truncate max-w-[200px] sm:max-w-md">
                <svg className="w-3 h-3 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="truncate">
                  {project.liveUrl ? project.liveUrl.replace('https://', '').replace('http://', '') : `github.com/SwayamMandhani06/${project.id}`}
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#FF6B35] font-semibold hidden sm:flex items-center gap-1 group-hover:underline">
                <span>VISIT</span>
                <span>↗</span>
              </div>
            </div>

            {/* High-Resolution Project Preview Image */}
            <div className="relative aspect-[16/9] sm:aspect-[16/8.5] w-full overflow-hidden bg-black/20">
              <img
                src={project.previewImages?.tileLarge || `/projects/${project.id}.png`}
                alt={`${project.title} Live Interface`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35] text-white text-xs font-display font-semibold shadow-lg">
                  Launch Live Deployment ↗
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Project Description & Highlights */}
        <div className="pt-2">
          <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed font-body mb-3">
            {project.description}
          </p>
          {project.highlights.map((highlight, idx) => (
            <p key={idx} className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-2 flex items-start gap-2">
              <span className="text-[#FF6B35] font-bold">›</span>
              <span>{highlight}</span>
            </p>
          ))}
        </div>

        {/* Plain-text Stack List Separated by Dots */}
        <div className="mt-4 pt-4 border-t border-[var(--border-hairline)] text-xs sm:text-sm font-mono text-[var(--text-secondary)]">
          {project.techStack.join(' · ')}
        </div>
      </motion.div>
    </div>
  );
};

export const SelectedWork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-16 lg:px-20 bg-[var(--bg-base)] border-b border-[var(--border-hairline)] transition-colors duration-400"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <FadeIn delay={0.1}>
            <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-3 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[var(--text-secondary)]/40" />
              SELECTED WORK
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Crafted with{' '}
              <span className="font-serif-accent font-normal italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-1">
                precision
              </span>
              .
            </h2>
          </FadeIn>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative">
          {FLAGSHIP_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={FLAGSHIP_PROJECTS.length}
              containerProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
