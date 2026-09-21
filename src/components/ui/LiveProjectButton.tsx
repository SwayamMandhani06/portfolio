import React from 'react';

interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = 'Live Project',
  href,
  onClick,
  className = '',
}) => {
  const content = (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-[var(--text-primary)] transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-[var(--surface-hover)] active:scale-[0.98] shadow-sm ${className}`}
      data-hoverable="true"
    >
      <span>{label}</span>
      <svg
        className="w-3.5 h-3.5 text-[var(--text-primary)]/80"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.66669 11.3334L11.3334 4.66669M11.3334 4.66669H6.00002M11.3334 4.66669V10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-hoverable="true"
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} data-hoverable="true" className="inline-block">
      {content}
    </button>
  );
};
