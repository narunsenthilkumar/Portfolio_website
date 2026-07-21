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
    <section className={`relative h-screen min-h-[600px] flex flex-col justify-between overflow-x-clip select-none transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0C0C0C]' : 'bg-[#F8FAFC]'
      }`}>
      {/* HERO HEADING */}
      <div className="relative w-full flex-grow flex items-start justify-center pt-10 sm:pt-12 md:pt-14 overflow-hidden z-20 pointer-events-none">
        <div className="w-full text-center overflow-hidden">
          <FadeIn
            delay={0.15}
            y={20}
            as="h1"
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13vw] sm:text-[13.5vw] md:text-[14.5vw] lg:text-[15.5vw] pointer-events-none"
            style={{ fontSize: 'clamp(4.5rem, 23vw, 15rem)' }}
          >
            Hi, i&apos;m narun
          </FadeIn>
        </div>
      </div>

      {/* 3D SPLINE ROBOT ANIMATION & LIGHT THEME GROUND SHADOW */}
      <div className={`absolute inset-0 w-full h-full z-10 pointer-events-auto flex items-center justify-center overflow-hidden transition-all duration-500 ${theme === 'dark' ? 'bg-[#0C0C0C]' : 'bg-[#F8FAFC]'
        }`}>
        <div className="w-full h-full transform translate-x-6 translate-y-6 sm:translate-x-12 sm:translate-y-10 md:translate-x-16 md:translate-y-12 transition-all duration-500 relative">
          <Spline
            scene="https://prod.spline.design/0oDupUjeZGI8zBxt/scene.splinecode"
            className="w-full h-full"
          />

          {/* Dynamic Ground Shadow strictly synchronized with Robot movements in Light Mode only */}
          {theme === 'light' && (
            <div className="absolute bottom-[14%] right-[16%] w-[260px] sm:w-[420px] md:w-[500px] h-[45px] sm:h-[70px] pointer-events-none z-15 flex items-center justify-center">
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
                className="w-full h-full rounded-[50%] bg-slate-900/40 blur-[26px] shadow-[0_0_55px_rgba(15,23,42,0.5)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-40">
        {/* Animated Left description inside prominent high-contrast backdrop card in both themes */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className={`w-1/2 sm:w-auto text-left rounded-2xl transition-all duration-300 relative z-40 ${theme === 'light'
            ? 'bg-white/95 backdrop-blur-md p-4 sm:p-5 border-2 border-indigo-600/40 shadow-[0_15px_35px_rgba(15,23,42,0.22)]'
            : 'bg-[#121214]/95 backdrop-blur-md p-4 sm:p-5 border-2 border-cyan-400/40 shadow-[0_15px_35px_rgba(0,240,255,0.2)]'
            }`}
          style={{ perspective: 1000 }}
        >
          <p
            className={`uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] flex flex-wrap gap-x-1.5 sm:gap-x-2 gap-y-0.5 font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'
              }`}
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
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
        <div className="flex flex-col items-end gap-4 sm:gap-6 relative z-40">
          {/* Social Links Row */}
          <FadeIn delay={0.4} y={20} className={`flex gap-3 sm:gap-4 p-2.5 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-white/95 backdrop-blur-md border-2 border-indigo-500/30 shadow-lg' : 'bg-[#141414]/95 backdrop-blur-md border-2 border-white/20'
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
              <span className="block px-8 py-3 text-[10px] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base font-bold">
                Download CV
              </span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
