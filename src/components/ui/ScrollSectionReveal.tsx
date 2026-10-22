import React from 'react';
import { motion } from 'motion/react';

interface ScrollSectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

export const ScrollSectionReveal: React.FC<ScrollSectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 45,
  duration = 0.65,
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { y: distance, x: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, ...offset }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -50px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth custom cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
