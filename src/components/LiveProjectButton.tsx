import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LiveProjectButtonProps {
  href: string;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ href, className = "" }) => {
  const { theme } = useTheme();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full font-bold uppercase tracking-widest text-center px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm md:text-base transition-all duration-200 shadow-md ${
        theme === 'dark'
          ? 'border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10'
          : 'border-2 border-[#4338CA] bg-[#4338CA] text-white hover:bg-[#312E81] shadow-indigo-500/20'
      } ${className}`}
    >
      View on GitHub
    </a>
  );
};
