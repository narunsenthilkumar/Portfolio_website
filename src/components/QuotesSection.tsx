import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DevQuote {
  text: string;
  author: string;
  role: string;
  color: string;
}

const QUOTES: DevQuote[] = [
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    role: "Computer Scientist",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
    role: "Writer & Physician",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    role: "Creator of Linux & Git",
    color: "from-blue-500/20 to-indigo-500/20"
  }
];

export const QuotesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
    }, 2500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // ── Mouse movement tracking for interactive particle magnetic effect ────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  // ── Interactive Grid Dot System ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const spacing = 38;
    const dots: { x: number; y: number; originX: number; originY: number; size: number }[] = [];

    for (let x = spacing / 2; x < width; x += spacing) {
      for (let y = spacing / 2; y < height; y += spacing) {
        dots.push({ x, y, originX: x, originY: y, size: 4.5 });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isLight = theme === 'light';
      const mouse = mouseRef.current;
      const hoverRadius = 220;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mouse.x - dot.originX;
        const dy = mouse.y - dot.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetSize = 4.5;

        if (dist < hoverRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (hoverRadius - dist) / hoverRadius;
          const push = force * 55;

          dot.x = dot.originX - Math.cos(angle) * push;
          dot.y = dot.originY - Math.sin(angle) * push;
          targetSize = 4.5 + force * 7;

          // Draw magnetic connection line to cursor
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(dot.x, dot.y);
            ctx.strokeStyle = isLight
              ? `rgba(67, 56, 202, ${0.4 * (1 - dist / 140)})`
              : `rgba(0, 240, 255, ${0.65 * (1 - dist / 140)})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        } else {
          dot.x += (dot.originX - dot.x) * 0.12;
          dot.y += (dot.originY - dot.y) * 0.12;
        }

        dot.size += (targetSize - dot.size) * 0.2;

        // Render Dot with Electric Neon Colors in Dark Mode
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);

        if (dist < hoverRadius) {
          ctx.fillStyle = isLight ? '#4338CA' : '#FF007A';
          ctx.shadowBlur = 16;
          ctx.shadowColor = isLight ? '#4338CA' : '#FF007A';
        } else {
          ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.45)' : 'rgba(0, 240, 255, 0.55)';
          ctx.shadowBlur = 4;
          ctx.shadowColor = isLight ? 'transparent' : 'rgba(0, 240, 255, 0.4)';
        }

        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + QUOTES.length) % QUOTES.length);
    resetTimer();
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
    resetTimer();
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetTimer();
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 26 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 26 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.25 }
      }
    })
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative py-20 sm:py-28 md:py-32 px-5 sm:px-8 md:px-10 overflow-hidden select-none z-30 border-t transition-colors duration-500 ${theme === 'dark'
          ? 'bg-[#0C0C0C] text-[#D7E2EA] border-[#D7E2EA]/5'
          : 'bg-[#F8FAFC] text-[#0F172A] border-[#0F172A]/10'
        }`}
    >
      {/* Interactive Repellent Dots Grid Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] md:w-[600px] h-[280px] sm:h-[450px] md:h-[600px] bg-purple-900/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Heading */}
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-12 sm:mb-16"
          style={{ fontSize: 'clamp(2rem, 8vw, 6rem)' }}
        >
          Dev Quotes
        </h2>

        {/* Carousel Outer Wrapper */}
        <div className="relative w-full max-w-3xl flex items-center justify-between gap-2 sm:gap-6 min-h-[300px] sm:min-h-[260px] md:min-h-[220px]">

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className={`flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border backdrop-blur-md transition-all duration-300 active:scale-95 shrink-0 z-20 shadow-xl ${theme === 'dark'
                ? 'border-[#D7E2EA]/20 bg-[#121214]/80 hover:bg-[#1C1C1F] text-[#D7E2EA] hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'border-[#0F172A]/20 bg-white hover:bg-slate-100 text-[#0F172A] hover:border-indigo-500/50 shadow-md'
              }`}
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Quotes Window Container */}
          <div className={`relative flex-grow overflow-hidden px-4 py-8 rounded-[24px] sm:rounded-[32px] border backdrop-blur-xl shadow-2xl flex flex-col justify-center items-center ${theme === 'dark'
              ? 'border-[#D7E2EA]/15 bg-gradient-to-br from-[#121214]/90 to-[#080809]/95'
              : 'border-[#0F172A]/15 bg-gradient-to-br from-white to-slate-50 shadow-xl'
            }`}>

            {/* Dynamic Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${QUOTES[currentIndex].color} opacity-40 transition-colors duration-500 rounded-[24px] sm:rounded-[32px] pointer-events-none z-0`} />

            {/* Quote Icon Accent */}
            <div className={`absolute top-4 left-6 sm:left-8 opacity-15 pointer-events-none ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-600'
              }`}>
              <Quote className="w-16 h-16 transform -scale-x-100" />
            </div>

            <div className="relative z-10 w-full min-h-[140px] sm:min-h-[110px] flex flex-col justify-center items-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex flex-col items-center text-center px-4 sm:px-8"
                >
                  <p
                    className={`font-semibold tracking-tight leading-snug italic max-w-xl ${theme === 'dark' ? 'text-[#D7E2EA]' : 'text-slate-950'
                      }`}
                    style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.7rem)' }}
                  >
                    &ldquo;{QUOTES[currentIndex].text}&rdquo;
                  </p>

                  <div className="mt-4 sm:mt-5 flex flex-col items-center">
                    <span className={`font-extrabold uppercase tracking-wider text-xs sm:text-sm ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-600'
                      }`}>
                      {QUOTES[currentIndex].author}
                    </span>
                    <span className={`text-[10px] sm:text-xs tracking-widest uppercase font-mono mt-0.5 font-medium ${theme === 'dark' ? 'text-[#D7E2EA]/60' : 'text-slate-700'
                      }`}>
                      {QUOTES[currentIndex].role}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className={`flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border backdrop-blur-md transition-all duration-300 active:scale-95 shrink-0 z-20 shadow-xl ${theme === 'dark'
                ? 'border-[#D7E2EA]/20 bg-[#121214]/80 hover:bg-[#1C1C1F] text-[#D7E2EA] hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'border-[#0F172A]/20 bg-white hover:bg-slate-100 text-[#0F172A] hover:border-indigo-500/50 shadow-md'
              }`}
            aria-label="Next quote"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center gap-3 mt-10 z-20">
          {QUOTES.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleDotClick(idx)}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              className={`h-4 rounded-full transition-all duration-300 ${idx === currentIndex
                  ? theme === 'dark'
                    ? 'w-12 bg-gradient-to-r from-[#00F0FF] to-[#FF007A] shadow-[0_0_15px_rgba(0,240,255,0.8)]'
                    : 'w-12 bg-gradient-to-r from-[#4338CA] to-[#6D28D9] shadow-[0_0_15px_rgba(67,56,202,0.5)]'
                  : theme === 'dark' ? 'w-4 bg-[#00F0FF]/40 hover:bg-[#00F0FF]/80' : 'w-4 bg-slate-400/60 hover:bg-slate-700'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
