import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  Phone,
  X,
  MessageSquare,
  FileDown,
  Send,
  Loader2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INQUIRY_TYPES = [
  'Software Engineering Role',
  'Full-Stack Web App',
  'AI / RAG Architecture',
  'Freelance Project',
  'General Inquiry',
];

export const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'form' | 'channels'>('form');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Connects directly to Swayam's work email via FormSubmit AJAX API
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          inquiry: inquiryType,
          message: message.trim(),
          _subject: `[Portfolio Inquiry] ${inquiryType} from ${name.trim()}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        // Trigger client mailto fallback if network blocks
        triggerMailtoFallback();
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback to mailto:', err);
      triggerMailtoFallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMailtoFallback = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${inquiryType} from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setSubmitStatus('success');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitStatus('idle');
  };

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PERSONAL_INFO.email
  )}&su=${encodeURIComponent('Collaboration / Opportunity Inquiry')}`;

  const whatsappUrl = `https://wa.me/919421852724?text=${encodeURIComponent(
    'Hi Swayam, I reviewed your portfolio and would like to connect.'
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
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
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="relative w-full max-w-xl rounded-[28px] sm:rounded-[36px] border border-[var(--border-hairline)] bg-[var(--surface)] p-5 sm:p-8 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Top Accent Gradient Border */}
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
              aria-label="Close query modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[var(--border-hairline)] bg-[var(--surface-hover)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header & Tabs */}
            <div className="mb-5 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FF6B35] font-semibold">
                  GET IN TOUCH · SAY HELLO
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                Let's build something{' '}
                <span className="font-serif-accent font-normal italic text-2xl sm:text-3xl md:text-4xl text-[#FF6B35] px-1">
                  real
                </span>
                .
              </h3>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-2 mt-4 p-1 rounded-full bg-[var(--surface-hover)] border border-[var(--border-hairline)] w-fit">
                <button
                  onClick={() => setActiveTab('form')}
                  className={`px-3.5 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                    activeTab === 'form'
                      ? 'bg-[#FF6B35] text-white font-semibold shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Send Query
                </button>
                <button
                  onClick={() => setActiveTab('channels')}
                  className={`px-3.5 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                    activeTab === 'channels'
                      ? 'bg-[#FF6B35] text-white font-semibold shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Direct Channels
                </button>
              </div>
            </div>

            {/* TAB 1: INTERACTIVE QUERY FORM */}
            {activeTab === 'form' && (
              <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-display font-bold text-[var(--text-primary)] mb-2">
                      Query Received!
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-body max-w-sm mb-6 leading-relaxed">
                      Thank you, <span className="text-[var(--text-primary)] font-semibold">{name}</span>. Your query has been delivered directly to Swayam's inbox. You'll receive a response within 24 hours.
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-full border border-[var(--border-hairline)] bg-[var(--surface-hover)] text-xs font-mono text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-colors"
                      >
                        Send Another Note
                      </button>
                      <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-full bg-[#FF6B35] text-white text-xs font-mono font-semibold hover:bg-[#FF6B35]/90 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                          Your Name <span className="text-[#FF6B35]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Rivera"
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[#FF6B35]/60 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-[#FF6B35]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[#FF6B35]/60 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Inquiry Category Pills */}
                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                        Inquiry Topic
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {INQUIRY_TYPES.map((type) => {
                          const isSelected = inquiryType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setInquiryType(type)}
                              className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                                isSelected
                                  ? 'bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/60 font-semibold'
                                  : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-hairline)] hover:text-[var(--text-primary)]'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Body */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                          Your Query / Project Details <span className="text-[#FF6B35]">*</span>
                        </label>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                          {message.length} chars
                        </span>
                      </div>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe the opportunity, technical challenge, or timeline..."
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[#FF6B35]/60 transition-colors resize-none font-body leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <div className="text-[10px] font-mono text-[var(--text-secondary)] hidden sm:block">
                        Delivered directly to {PERSONAL_INFO.email}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !name || !email || !message}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF6B35] text-white font-display font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#FF6B35]/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-md shadow-[#FF6B35]/20 ml-auto"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Query</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: DIRECT CHANNELS */}
            {activeTab === 'channels' && (
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin">
                {/* 1. Copy Email Pill */}
                <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] flex items-center justify-between gap-3">
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

                {/* 2. Direct Action Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={gmailWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-[#FF6B35]" />
                      <span>Open in Gmail Web</span>
                    </div>
                    <span className="text-[var(--text-secondary)]">↗</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                      <span>Message on WhatsApp</span>
                    </div>
                    <span className="text-[var(--text-secondary)]">↗</span>
                  </a>

                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#FF6B35]" />
                      <span>Direct Call ({PERSONAL_INFO.phone})</span>
                    </div>
                    <span className="text-[var(--text-secondary)]">↗</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-sky-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 fill-sky-400" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
                      </svg>
                      <span>Connect on LinkedIn</span>
                    </div>
                    <span className="text-[var(--text-secondary)]">↗</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.resumeUrl}
                    download="Swayam_Mandhani_Resume.pdf"
                    className="flex items-center justify-between p-3 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border-hairline)] text-xs font-display font-semibold text-[var(--text-primary)] hover:border-[#FF6B35]/50 transition-colors col-span-1 sm:col-span-2"
                  >
                    <div className="flex items-center gap-2">
                      <FileDown className="w-4 h-4 text-[#FF6B35]" />
                      <span>Download Resume (PDF, 216 KB)</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#FF6B35] font-bold">PDF ↓</span>
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Status Footnote */}
            <div className="pt-3 border-t border-[var(--border-hairline)] text-center text-[10px] font-mono text-[var(--text-secondary)]/80 flex-shrink-0">
              Pune, India · IST (UTC+5:30) · Responds within 24 hours
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
