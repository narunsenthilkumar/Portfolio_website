import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const WaterDropletEffect: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create new ripple
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, newRipple].slice(-10)); // Cap at 10 active ripples to prevent overflow
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  const handleAnimationComplete = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden select-none">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: ripple.x, top: ripple.y }}
          >
            {/* Primary outer cascading ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{
                scale: 2.4,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => handleAnimationComplete(ripple.id)}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-28 h-28 sm:w-40 sm:h-40 rounded-full border-2 border-slate-300/40 shadow-sm"
              style={{ willChange: 'transform, opacity' }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
