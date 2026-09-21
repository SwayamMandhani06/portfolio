import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-colors duration-150">
      {children}
    </motion.span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  if (shouldReduceMotion) {
    return <p className={className}>{text}</p>;
  }

  // Count total characters for smooth per-character pacing
  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p ref={containerRef} className={`leading-relaxed ${className}`}>
      {words.map((word, wordIdx) => {
        const chars = word.split('');
        const wordElement = (
          <span key={`word-${wordIdx}`} className="inline-block whitespace-nowrap">
            {chars.map((char) => {
              const start = charCounter / totalChars;
              const end = Math.min(1, start + 1 / totalChars);
              charCounter += 1;
              return (
                <Char key={`char-${charCounter}`} progress={scrollYProgress} range={[start, end]}>
                  {char}
                </Char>
              );
            })}
            {wordIdx < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
        // Account for space
        charCounter += 1;
        return wordElement;
      })}
    </p>
  );
};
