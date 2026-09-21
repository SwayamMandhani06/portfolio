import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown, ExternalLink, Printer, ShieldCheck, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const resumePath = PERSONAL_INFO.resumeUrl || '/Swayam_Mandhani_Resume.pdf';

  const handlePrint = () => {
    const printWindow = window.open(resumePath, '_blank');
    if (printWindow) {
      printWindow.focus();
      setTimeout(() => {
        try {
          printWindow.print();
        } catch {
          // Fallback if cross-origin or blocked
        }
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[100000] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="relative w-full max-w-5xl h-[92vh] sm:h-[90vh] rounded-[24px] sm:rounded-[32px] border border-[var(--border-hairline)] bg-[var(--surface)] shadow-2xl z-10 flex flex-col overflow-hidden"
          >
            {/* Top Accent Gradient Border Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg, #FF6B35 0%, #C8102E 50%, #4A0E4E 100%)',
              }}
            />

            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[var(--border-hairline)] bg-[var(--surface)]/95 backdrop-blur-md flex-shrink-0 gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/30 flex items-center justify-center flex-shrink-0 text-[#FF6B35]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-display font-bold text-[var(--text-primary)] truncate">
                      Swayam Mandhani · Resume
                    </h3>
                    <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" /> Verified 2026
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--text-secondary)] truncate">
                    B.Tech Computer Engineering · Full-Stack, AI & Data Analytics
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
                {/* Print Button (desktop) */}
                <button
                  onClick={handlePrint}
                  data-hoverable="true"
                  title="Print Resume"
                  aria-label="Print Resume"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--surface-hover)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Print</span>
                </button>

                {/* Open in New Tab Button */}
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hoverable="true"
                  title="Open in new tab"
                  aria-label="Open PDF in new tab"
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--surface-hover)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Tab</span>
                </a>

                {/* Download Button */}
                <a
                  href={resumePath}
                  download="Swayam_Mandhani_Resume.pdf"
                  data-hoverable="true"
                  title="Download Resume PDF"
                  aria-label="Download Resume PDF"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#FF6B35] text-white text-xs font-display font-semibold uppercase tracking-wider hover:bg-[#FF6B35]/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-[#FF6B35]/25"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  data-hoverable="true"
                  aria-label="Close Resume Modal"
                  className="p-1.5 sm:p-2 rounded-full border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors ml-1"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="relative flex-1 w-full h-full bg-[#1e1e24]/40 p-2 sm:p-4 overflow-hidden">
              <iframe
                src={`${resumePath}#toolbar=0&navpanes=0`}
                title="Swayam Mandhani Resume PDF"
                className="w-full h-full rounded-xl sm:rounded-2xl border border-[var(--border-hairline)] bg-white shadow-inner"
              />

              {/* Mobile Fallback Overlay Hint */}
              <div className="sm:hidden absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border-hairline)] text-center shadow-lg">
                <p className="text-xs text-[var(--text-primary)] mb-2 font-medium">
                  For the best experience on mobile devices:
                </p>
                <div className="flex items-center justify-center gap-2">
                  <a
                    href={resumePath}
                    download="Swayam_Mandhani_Resume.pdf"
                    className="text-xs font-bold text-[#FF6B35] underline px-2 py-1"
                  >
                    Direct Download (216 KB)
                  </a>
                  <span className="text-[var(--text-secondary)]">·</span>
                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--text-secondary)] underline px-2 py-1"
                  >
                    Open in Full Tab
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
