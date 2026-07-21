import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, Youtube, Mail } from 'lucide-react';
import { FadeIn } from './FadeIn';
import Spline from '@splinetool/react-spline';
import { useTheme } from '../context/ThemeContext';

// ─── Hero Section Component ──────────────────────────────────────────────────
export const HeroSection: React.FC = () => {
  const { theme } = useTheme();

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />, url: "https://www.linkedin.com/in/narunjs23" },
    { icon: <Github className="w-5 h-5 sm:w-6 sm:h-6" />, url: "https://github.com/narunsenthilkumar" },
    { icon: <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />, url: "https://x.com/narun4639" },
    { icon: <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />, url: "https://youtube.com/@tech_shark-w4y" },
    { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, url: "mailto:narunsenthilkumar20@gmail.com" },
  ];

  const descriptionText = "a developer and creator driven by building intelligent automation and interactive digital experiences";
  const words = descriptionText.split(" ");

  // Staggered 3D word entrance configurations
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 18, rotateX: -35, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 120
      }
    }
  };

  const highlightWords = ['developer', 'creator', 'intelligent', 'automation', 'interactive', 'digital', 'experiences'];

  return (
    <section className={`relative h-[100dvh] min-h-[540px] sm:min-h-[620px] flex flex-col justify-between overflow-x-clip select-none transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0C0C0C]' : 'bg-[#F8FAFC]'
      }`}>
      {/* HERO HEADING */}
      <div className="relative w-full flex-grow flex items-start justify-center pt-24 xs:pt-28 sm:pt-14 md:pt-16 overflow-hidden z-20 pointer-events-none px-2">
        <div className="w-full text-center overflow-hidden">
          <FadeIn
            delay={0.15}
            y={20}
            as="h1"
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full pointer-events-none"
            style={{ fontSize: 'clamp(2rem, 11.5vw, 14.5rem)' }}
          >
            Hi, i&apos;m narun
          </FadeIn>
        </div>
      </div>

      {/* 3D SPLINE ROBOT ANIMATION & LIGHT THEME GROUND SHADOW */}
      <div className={`absolute inset-0 w-full h-full z-10 pointer-events-auto flex items-center justify-center overflow-hidden transition-all duration-500 ${theme === 'dark' ? 'bg-[#0C0C0C]' : 'bg-[#F8FAFC]'
        }`}>
        <div className="w-full h-full transform translate-x-0 translate-y-2 sm:translate-x-8 sm:translate-y-8 md:translate-x-14 md:translate-y-12 transition-all duration-500 relative">
          <Spline
            scene="https://prod.spline.design/0oDupUjeZGI8zBxt/scene.splinecode"
            className="w-full h-full"
          />

          {/* Dynamic Ground Shadow strictly synchronized with Robot movements in Light Mode only */}
          {theme === 'light' && (
            <div className="absolute bottom-[12%] right-[10%] sm:right-[16%] w-[200px] xs:w-[260px] sm:w-[420px] md:w-[500px] h-[35px] sm:h-[70px] pointer-events-none z-15 flex items-center justify-center">
              <motion.div
                animate={{
                  scaleX: [0.82, 1.18, 0.82],
                  scaleY: [0.82, 1.12, 0.82],
                  x: [0, 8, -6, 0],
                  y: [0, -4, 4, 0],
                  opacity: [0.35, 0.6, 0.35],
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full rounded-[50%] bg-slate-900/40 blur-[20px] sm:blur-[26px] shadow-[0_0_55px_rgba(15,23,42,0.5)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="w-full flex flex-row items-end justify-between px-3 xs:px-5 sm:px-8 md:px-10 pb-5 sm:pb-8 md:pb-10 z-40 gap-2 xs:gap-4">
        {/* Animated Left description inside prominent high-contrast backdrop card in both themes */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className={`shrink sm:shrink-0 text-left rounded-xl sm:rounded-2xl transition-all duration-300 relative z-40 ${theme === 'light'
            ? 'bg-white/95 backdrop-blur-md p-3 xs:p-4 sm:p-5 border border-indigo-600/40 sm:border-2 shadow-[0_15px_35px_rgba(15,23,42,0.22)]'
            : 'bg-[#121214]/95 backdrop-blur-md p-3 xs:p-4 sm:p-5 border border-cyan-400/40 sm:border-2 shadow-[0_15px_35px_rgba(0,240,255,0.2)]'
            }`}
          style={{ perspective: 1000 }}
        >
          <p
            className={`uppercase tracking-wide leading-snug max-w-[130px] xs:max-w-[170px] sm:max-w-[220px] md:max-w-[260px] flex flex-wrap gap-x-1 sm:gap-x-2 gap-y-0.5 font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'
              }`}
            style={{ fontSize: 'clamp(0.625rem, 1.3vw, 1.4rem)' }}
          >
            {words.map((word, idx) => {
              const isHighlighted = highlightWords.includes(word.toLowerCase().replace(/[^a-z]/g, ''));
              return (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  whileHover={{ scale: 1.12, y: -3, color: theme === 'dark' ? '#00F0FF' : '#4338CA' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className={`inline-block cursor-pointer transition-colors duration-200 ${isHighlighted
                    ? theme === 'dark'
                      ? 'font-black text-cyan-300 underline decoration-cyan-400 underline-offset-4'
                      : 'font-black text-indigo-700 underline decoration-indigo-600 underline-offset-4'
                    : theme === 'dark' ? 'text-white font-black' : 'text-slate-950 font-black'
                    }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
        </motion.div>

        {/* Right Contact + Socials */}
        <div className="flex flex-col items-end gap-2.5 xs:gap-3.5 sm:gap-6 relative z-40 shrink-0">
          {/* Social Links Row */}
          <FadeIn delay={0.4} y={20} className={`flex gap-2 xs:gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-white/95 backdrop-blur-md border border-indigo-500/30 sm:border-2 shadow-lg' : 'bg-[#141414]/95 backdrop-blur-md border border-white/20 sm:border-2'
            }`}>
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-200 ${theme === 'dark' ? 'text-white hover:text-cyan-400 font-bold' : 'text-slate-950 hover:text-indigo-700 font-black'
                  }`}
              >
                {link.icon}
              </a>
            ))}
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <a
              href="/resume.pdf"
              download="Narun_JS_Resume.pdf"
              className="inline-block rounded-full text-white font-bold uppercase tracking-widest transition-transform duration-200 hover:scale-105 active:scale-95 text-center"
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
              <span className="block px-4 py-2 text-[9px] xs:px-6 xs:py-2.5 xs:text-[10px] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base font-bold whitespace-nowrap">
                Download CV
              </span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
