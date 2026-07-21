import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  rotateX?: number;
  rotateY?: number;
  scale?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.75,
  x = 0,
  y = 35,
  rotateX = 12,
  rotateY = 0,
  scale = 0.94,
  as = "div",
  className = "",
  style
}) => {
  const Component = motion.create(as as any);

  return (
    <Component
      initial={{
        opacity: 0,
        x,
        y,
        rotateX,
        rotateY,
        scale,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        ...style
      }}
    >
      {children}
    </Component>
  );
};
