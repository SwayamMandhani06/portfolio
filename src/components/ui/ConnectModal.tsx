import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, ExternalLink, Phone, X, MessageSquare, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PERSONAL_INFO.email
  )}&su=${encodeURIComponent('Collaboration / Opportunity Inquiry')}`;

  const whatsappUrl = `https://wa.me/919421852724?text=${encodeURIComponent(
    "Hi Swayam, I reviewed your portfolio and would like to connect."
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-lg rounded-[32px] border border-[var(--border-hairline)] bg-[var(--surface)] p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Accent Gradient Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg, #FF6B35 0%, #C8102E 50%, #4A0E4E 100%)',
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              data-hoverable="true"
              aria-label="Close modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[var(--border-hairline)] bg-[var(--surface-hover)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#FF6B35] font-semibold mb-1">
                DIRECT CHANNELS
              </div>
              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                Let's build something real.
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-body mt-1.5 leading-relaxed">
                Choose your preferred channel below to start the conversation.
              </p>
            </div>

            {/* Main Action 1: Copy Email */}
            <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] mb-4 flex items-center justify-between gap-3">
              <div className="min-w-0 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/15 flex items-center justify-center flex-shrink-0 text-[#FF6B35]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Direct Email
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-semibold text-[var(--text-primary)] truncate">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                data-hoverable="true"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border-hairline)] text-xs font-mono font-medium text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-all flex-shrink-0 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-500 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Additional Direct Connect Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {/* Option A: Open in Gmail Web */}
              <a
                href={gmailWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-hoverable="true"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-[#FF6B35]/50 hover:bg-[var(--surface)] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-[#FF6B35]" />
                  <span>Open in Gmail Web</span>
                </div>
                <span className="text-[var(--text-secondary)] group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </a>

              {/* Option B: WhatsApp / Direct Ping */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-hoverable="true"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-emerald-500/50 hover:bg-[var(--surface)] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>Message on WhatsApp</span>
                </div>
                <span className="text-[var(--text-secondary)] group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </a>

              {/* Option C: Direct Call */}
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                data-hoverable="true"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-[#FF6B35]/50 hover:bg-[var(--surface)] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FF6B35]" />
                  <span>Direct Call ({PERSONAL_INFO.phone})</span>
                </div>
                <span className="text-[var(--text-secondary)] group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </a>

              {/* Option D: LinkedIn DM */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-hoverable="true"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-blue-500/50 hover:bg-[var(--surface)] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 fill-blue-500" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
                  </svg>
                  <span>Connect on LinkedIn</span>
                </div>
                <span className="text-[var(--text-secondary)] group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </a>

              {/* Option E: Download Resume */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Swayam_Mandhani_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-hoverable="true"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-[#FF6B35]/50 hover:bg-[var(--surface)] transition-all group col-span-1 sm:col-span-2"
              >
                <div className="flex items-center gap-2.5">
                  <FileDown className="w-4 h-4 text-[#FF6B35]" />
                  <span>Download Curriculum Vitae / Resume (PDF)</span>
                </div>
                <span className="text-[10px] font-mono text-[#FF6B35] font-bold group-hover:translate-y-0.5 transition-transform">
                  PDF ↓
                </span>
              </a>
            </div>

            {/* Bottom Status Note */}
            <div className="text-center text-[11px] font-mono text-[var(--text-secondary)]/80">
              Pune, India · IST (UTC+5:30) · Typically responds within 24 hours
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
