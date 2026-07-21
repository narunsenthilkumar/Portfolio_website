import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme-preference');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [ripplePos, setRipplePos] = useState<{ x: number; y: number } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    }
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = (e?: React.MouseEvent) => {
    const x = e?.clientX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const y = e?.clientY ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    // Modern View Transitions API (Chrome / Edge / Safari 18+) for 60fps circular expand
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const root = document.documentElement;

      const transition = (document as any).startViewTransition(() => {
        root.classList.add('disable-transitions');
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
        // Force synchronous layout reflow so snapshot has exact target theme colors
        void root.offsetHeight;
        root.classList.remove('disable-transitions');
      });

      transition.ready.then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ],
          },
          {
            duration: 520,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      // High-performance Framer Motion circular ripple veil fallback
      setRipplePos({ x, y });
      setIsTransitioning(true);

      setTimeout(() => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
      }, 120);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 450);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Fallback smooth ripple animation when View Transitions API is unsupported */}
      <AnimatePresence>
        {isTransitioning && ripplePos && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 ${
              theme === 'dark' ? 'bg-[#F8FAFC]' : 'bg-[#0C0C0C]'
            }`}
            style={{
              left: ripplePos.x,
              top: ripplePos.y,
              width: '100vw',
              height: '100vw',
              aspectRatio: '1/1',
            }}
          />
        )}
      </AnimatePresence>

      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
