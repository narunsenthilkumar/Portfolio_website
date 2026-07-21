import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ className = "", onClick }) => {
  const { theme } = useTheme();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const ctaSection = document.getElementById('cta');
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('open-cta-contact'));
        }, 600);
      }
    }
  };

  return (
    <button
      type="button"
      id={onClick ? "cta-contact-trigger" : undefined}
      onClick={handleClick}
      className={`inline-block rounded-full text-white font-semibold uppercase tracking-widest transition-transform duration-200 hover:scale-105 active:scale-95 text-center ${className}`}
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)'
          : 'linear-gradient(123deg, #312E81 0%, #4338CA 40%, #6D28D9 75%, #A855F7 100%)',
        boxShadow: theme === 'dark'
          ? '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1'
          : '0px 4px 14px rgba(67, 56, 202, 0.35), inset 4px 4px 12px #6366F1',
        outline: theme === 'dark' ? '2px solid white' : '2px solid #0F172A',
        outlineOffset: '-3px'
      }}
    >
      <span className="block px-8 py-3 text-[10px] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base font-semibold">
        Contact Me
      </span>
    </button>
  );
};
