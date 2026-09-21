import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'span' | 'p' | 'div';
  scrambleOnLoad?: boolean;
  scrambleOnHover?: boolean;
  duration?: number; // ms
}

const GLYPHS = '!@#$%^&*()_+-=~[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  as = 'span',
  scrambleOnLoad = true,
  scrambleOnHover = true,
  duration = 800,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const scramble = useCallback(
    (customDuration?: number) => {
      if (isScrambling.current) return;
      isScrambling.current = true;

      const dur = customDuration ?? duration;
      const startTime = performance.now();
      const length = text.length;

      const update = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / dur, 1);

        // Number of characters resolved
        const resolvedCount = Math.floor(progress * length);

        let result = '';
        for (let i = 0; i < length; i++) {
          if (text[i] === ' ' || text[i] === '\n') {
            result += text[i];
          } else if (i < resolvedCount) {
            result += text[i];
          } else {
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          timeoutRef.current = window.setTimeout(update, 48);
        } else {
          setDisplayText(text);
          isScrambling.current = false;
        }
      };

      update();
    },
    [text, duration]
  );

  useEffect(() => {
    if (scrambleOnLoad) {
      const delayTimer = window.setTimeout(() => {
        scramble(duration);
      }, 150);
      return () => clearTimeout(delayTimer);
    }
  }, [scrambleOnLoad, scramble, duration]);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScrambling.current) {
      scramble(320); // Quick 300ms hover scramble
    }
  };

  const Component = as as any;

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`select-none transition-colors ${className}`}
      data-hoverable="true"
    >
      {displayText}
    </Component>
  );
};
