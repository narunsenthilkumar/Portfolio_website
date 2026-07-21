import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#timeline' },
    { label: 'Contact', href: '#cta' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 select-none ${isScrolled
            ? theme === 'dark'
              ? 'py-4 bg-[#0C0C0C]/80 border-b border-[#D7E2EA]/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
              : 'py-4 bg-[#F8FAFC]/80 border-b border-[#0F172A]/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
            : 'py-6 md:py-8 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 md:px-10">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 transition-transform duration-200 hover:scale-105"
          >
            <img
              src="/logo.png"
              alt="Narun Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-white/20 shadow-md"
            />
            <span className="font-black text-lg sm:text-xl tracking-widest bg-black text-white px-3.5 py-1 rounded-xl border border-white/20 shadow-md">
              NARUN
            </span>
          </a>

          {/* Desktop Menu + Theme Toggle */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs lg:text-[0.9rem] font-extrabold uppercase tracking-wider hover:text-indigo-500 transition-colors duration-200 ${theme === 'dark' ? 'text-[#D7E2EA]' : 'text-[#0F172A]'
                  }`}
              >
                {link.label}
              </a>
            ))}

            {/* Theme Toggle Button */}
            <motion.button
              onClick={(e) => toggleTheme(e)}
              whileHover={{ scale: 1.12, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Theme"
              className={`p-2.5 rounded-full transition-all duration-300 border flex items-center justify-center ${theme === 'dark'
                  ? 'bg-[#161616] text-yellow-400 border-white/10 hover:border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'bg-white text-indigo-600 border-slate-200 hover:border-indigo-500/50 shadow-[0_4px_12px_rgba(99,102,241,0.15)]'
                }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              onClick={(e) => toggleTheme(e)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Theme"
              className={`p-2 rounded-full transition-all duration-300 border ${theme === 'dark'
                  ? 'bg-[#161616] text-yellow-400 border-white/10'
                  : 'bg-white text-indigo-600 border-slate-200'
                }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'text-[#D7E2EA]' : 'text-[#0F172A]'
                }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className={`fixed inset-0 top-[70px] z-40 md:hidden flex flex-col justify-between p-8 backdrop-blur-xl transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0C0C0C]/95 text-[#D7E2EA]' : 'bg-[#F8FAFC]/95 text-[#0F172A]'
            }`}
        >
          <div className="flex flex-col gap-6 mt-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black uppercase tracking-wider hover:text-indigo-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mb-12 font-mono text-xs opacity-50">
            © 2026 NARUN JS • CS ENGINEER
          </div>
        </div>
      )}
    </>
  );
};
