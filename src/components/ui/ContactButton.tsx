import React from 'react';
import { Magnet } from '../motion/Magnet';

interface ContactButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: 'default' | 'large';
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = 'View My Work',
  href,
  onClick,
  className = '',
  size = 'default',
}) => {
  const sizeClasses =
    size === 'large'
      ? 'px-9 py-4.5 text-sm sm:text-base'
      : 'px-7 py-3 text-xs sm:text-sm';

  const buttonContent = (
    <button
      onClick={onClick}
      data-hoverable="true"
      className={`group relative inline-flex items-center justify-center rounded-full font-display font-medium uppercase tracking-widest text-[#F2F0EC] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${sizeClasses} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FF6B35 0%, #C8102E 50%, #4A0E4E 100%)',
        boxShadow:
          '0px 4px 16px rgba(0, 0, 0, 0.35), inset 0px 0px 14px rgba(255, 107, 53, 0.7), 0 0 24px rgba(255, 107, 53, 0.25)',
      }}
    >
      <span className="relative z-10 flex items-center gap-2 drop-shadow-sm font-semibold">
        {label}
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33337 8H12.6667M12.6667 8L8.66671 4M12.6667 8L8.66671 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {/* Subtle outer glow on hover */}
      <span
        className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40 -z-10"
        style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #C8102E 50%, #4A0E4E 100%)',
        }}
      />
    </button>
  );

  return (
    <Magnet strength={3} padding={140}>
      {href ? (
        <a href={href} className="inline-block" data-hoverable="true">
          {buttonContent}
        </a>
      ) : (
        buttonContent
      )}
    </Magnet>
  );
};
