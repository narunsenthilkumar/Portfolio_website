import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FadeIn } from './FadeIn';
import { Sparkles, Code2 } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  context: string;
  color: string;
}

const TECH_ITEMS: TechItem[] = [
  // Row 1 (11 items)
  { name: "C", category: "Language", context: "Low-Level Systems & Embedded C", color: "#00599C" },
  { name: "C++", category: "Language", context: "High Performance & Algorithms", color: "#00599C" },
  { name: "Python", category: "Language", context: "AI, Data Science & Scripting", color: "#3776AB" },
  { name: "JavaScript", category: "Language", context: "Interactive Web & Async Logic", color: "#F7DF1E" },
  { name: "React", category: "Frontend", context: "Modern UI Component Systems", color: "#61DAFB" },
  { name: "Node.js", category: "Backend", context: "RESTful APIs & Event Server", color: "#339933" },
  { name: "TensorFlow", category: "AI & ML", context: "Neural Networks & Deep Learning", color: "#FF6F00" },
  { name: "PyTorch", category: "AI & ML", context: "Tensor Compute & Model Training", color: "#EE4C2C" },
  { name: "Keras", category: "AI & ML", context: "High-Level Neural Network API", color: "#D00000" },
  { name: "Pandas", category: "Data Science", context: "Data Wrangling & Dataframes", color: "#150458" },
  { name: "NumPy", category: "Data Science", context: "Numerical Arrays & Math", color: "#013243" },

  // Row 2 (10 items)
  { name: "Matplotlib", category: "Data Science", context: "Scientific Data Visualization", color: "#11557C" },
  { name: "AWS", category: "Cloud", context: "Cloud Infrastructure & S3/EC2", color: "#FF9900" },
  { name: "Firebase", category: "Backend", context: "Realtime NoSQL & Auth Services", color: "#FFCA28" },
  { name: "MongoDB", category: "Database", context: "Document Database & Aggregations", color: "#47A248" },
  { name: "MySQL", category: "Database", context: "Relational Tables & SQL Queries", color: "#00758F" },
  { name: "Supabase", category: "Database", context: "PostgreSQL & Open Source Firebase", color: "#3ECF8E" },
  { name: "Figma", category: "Design", context: "UI/UX Prototyping & Layouts", color: "#F24E1E" },
  { name: "Unity", category: "Game Dev", context: "3D Physics & Game Engines", color: "#808080" },
  { name: "Flutter", category: "Mobile", context: "Cross-Platform Mobile Apps", color: "#02569B" },
  { name: "Git", category: "DevOps", context: "Version Control & Branching", color: "#F05032" }
];

const CATEGORIES = ["ALL", "Language", "Frontend", "Backend", "AI & ML", "Data Science", "Database", "Cloud"];

export const MarqueeSection: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isHoveredRow, setIsHoveredRow] = useState(false);

  const row1 = TECH_ITEMS.slice(0, 11);
  const row2 = TECH_ITEMS.slice(11);

  // Duplicated items for seamless marquee loop
  const quadrupledRow1 = [...row1, ...row1, ...row1, ...row1];
  const quadrupledRow2 = [...row2, ...row2, ...row2, ...row2];

  // Scroll offset tracking for continuous physics speedup
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      setScrollSpeed(Math.min(delta * 0.12, 8));

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        setScrollSpeed(0);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuous animation loop using rAF for butter-smooth translation loop
  const [translateXRight, setTranslateXRight] = useState(-1800);
  const [translateXLeft, setTranslateXLeft] = useState(0);

  useEffect(() => {
    let animId: number;

    const animate = () => {
      const baseSpeed = isHoveredRow ? 0.3 : 0.85 + scrollSpeed;

      setTranslateXRight(prev => {
        const next = prev + baseSpeed;
        return next >= 0 ? -1800 : next;
      });

      setTranslateXLeft(prev => {
        const next = prev - baseSpeed;
        return next <= -1800 ? 0 : next;
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [scrollSpeed, isHoveredRow]);

  const isLight = theme === 'light';

  return (
    <section id="skills" className={`w-full py-16 sm:py-24 overflow-hidden relative z-20 select-none transition-colors duration-500 ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#0C0C0C]'
      }`}>
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-10 sm:mb-14">
        <FadeIn delay={0} y={30}>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            Skills & Stack
          </h2>
          <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest font-bold ${isLight ? 'text-slate-700' : 'text-[#D7E2EA]/70'
            }`}>
            Interactive Technology Stack & Domain Proficiency
          </p>
        </FadeIn>

        {/* Animated Filter Category Pills */}
        <FadeIn delay={0.2} y={20} className="flex flex-wrap justify-center gap-2 mt-8">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 border ${isSelected
                    ? isLight
                      ? 'bg-[#4338CA] text-white border-[#4338CA] shadow-[0_4px_15px_rgba(67,56,202,0.35)]'
                      : 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white border-purple-500 shadow-[0_4px_15px_rgba(182,0,168,0.4)]'
                    : isLight
                      ? 'bg-white text-slate-800 border-slate-300 hover:border-[#4338CA] hover:bg-slate-50'
                      : 'bg-[#141414] text-[#D7E2EA]/80 border-white/15 hover:border-purple-500/50 hover:text-white'
                  }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </FadeIn>
      </div>

      {/* Container holding both infinite rows */}
      <div className="flex flex-col gap-4 md:gap-6 w-full">
        {/* ROW 1: Moves RIGHT */}
        <div
          className="flex gap-4 md:gap-6 flex-nowrap py-2"
          onMouseEnter={() => setIsHoveredRow(true)}
          onMouseLeave={() => setIsHoveredRow(false)}
          style={{
            transform: `translateX(${translateXRight}px)`,
            willChange: 'transform'
          }}
        >
          {quadrupledRow1.map((item, idx) => {
            const isMatched = selectedCategory === "ALL" || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
            return (
              <motion.div
                key={`row1-${idx}`}
                whileHover={{
                  scale: 1.08,
                  rotateY: 12,
                  rotateX: -6,
                  y: -10,
                  zIndex: 50,
                  transition: { type: 'spring', stiffness: 350, damping: 15 }
                }}
                className={`shrink-0 transition-all duration-300 rounded-2xl p-6 w-[280px] h-[180px] sm:w-[340px] sm:h-[210px] md:w-[380px] md:h-[230px] flex flex-col justify-between border shadow-xl cursor-pointer relative overflow-hidden ${isMatched ? 'opacity-100 scale-100' : 'opacity-30 scale-95 grayscale'
                  } ${isLight
                    ? 'bg-white border-slate-200 shadow-slate-200/50'
                    : 'bg-[#121214] border-white/10 shadow-black/80'
                  }`}
                style={{
                  perspective: 1000,
                  boxShadow: isLight
                    ? `0 10px 30px rgba(15,23,42,0.08), inset 0 0 0 1px ${item.color}33`
                    : `0 10px 30px rgba(0,0,0,0.6), inset 0 0 0 1px ${item.color}44`
                }}
              >
                {/* Accent Background Glow */}
                <div
                  className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-20 pointer-events-none blur-2xl"
                  style={{ backgroundColor: item.color }}
                />

                {/* Top Category Pill & Icon */}
                <div className="flex justify-between items-center relative z-10">
                  <span
                    className="text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border"
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}18`,
                      borderColor: `${item.color}44`
                    }}
                  >
                    {item.category}
                  </span>
                  <Sparkles className="w-4 h-4 opacity-50" style={{ color: item.color }} />
                </div>

                {/* Tech Title & Context */}
                <div className="relative z-10 my-auto">
                  <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                    {item.name}
                  </h3>
                  <div className="w-10 h-1 rounded-full my-2" style={{ backgroundColor: item.color }} />
                  <p className={`text-xs sm:text-sm font-semibold leading-snug line-clamp-2 ${isLight ? 'text-slate-600' : 'text-[#D7E2EA]/75'
                    }`}>
                    {item.context}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ROW 2: Moves LEFT */}
        <div
          className="flex gap-4 md:gap-6 flex-nowrap py-2"
          onMouseEnter={() => setIsHoveredRow(true)}
          onMouseLeave={() => setIsHoveredRow(false)}
          style={{
            transform: `translateX(${translateXLeft}px)`,
            willChange: 'transform'
          }}
        >
          {quadrupledRow2.map((item, idx) => {
            const isMatched = selectedCategory === "ALL" || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
            return (
              <motion.div
                key={`row2-${idx}`}
                whileHover={{
                  scale: 1.08,
                  rotateY: -12,
                  rotateX: -6,
                  y: -10,
                  zIndex: 50,
                  transition: { type: 'spring', stiffness: 350, damping: 15 }
                }}
                className={`shrink-0 transition-all duration-300 rounded-2xl p-6 w-[280px] h-[180px] sm:w-[340px] sm:h-[210px] md:w-[380px] md:h-[230px] flex flex-col justify-between border shadow-xl cursor-pointer relative overflow-hidden ${isMatched ? 'opacity-100 scale-100' : 'opacity-30 scale-95 grayscale'
                  } ${isLight
                    ? 'bg-white border-slate-200 shadow-slate-200/50'
                    : 'bg-[#121214] border-white/10 shadow-black/80'
                  }`}
                style={{
                  perspective: 1000,
                  boxShadow: isLight
                    ? `0 10px 30px rgba(15,23,42,0.08), inset 0 0 0 1px ${item.color}33`
                    : `0 10px 30px rgba(0,0,0,0.6), inset 0 0 0 1px ${item.color}44`
                }}
              >
                {/* Accent Background Glow */}
                <div
                  className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-20 pointer-events-none blur-2xl"
                  style={{ backgroundColor: item.color }}
                />

                {/* Top Category Pill & Icon */}
                <div className="flex justify-between items-center relative z-10">
                  <span
                    className="text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border"
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}18`,
                      borderColor: `${item.color}44`
                    }}
                  >
                    {item.category}
                  </span>
                  <Code2 className="w-4 h-4 opacity-50" style={{ color: item.color }} />
                </div>

                {/* Tech Title & Context */}
                <div className="relative z-10 my-auto">
                  <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                    {item.name}
                  </h3>
                  <div className="w-10 h-1 rounded-full my-2" style={{ backgroundColor: item.color }} />
                  <p className={`text-xs sm:text-sm font-semibold leading-snug line-clamp-2 ${isLight ? 'text-slate-600' : 'text-[#D7E2EA]/75'
                    }`}>
                    {item.context}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
