import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FadeIn } from './FadeIn';
import { GraduationCap, Award, BookOpen, Briefcase, Code2 } from 'lucide-react';

interface TimelineEntry {
  title: string;
  institution: string;
  date: string;
  description?: string;
  icon: React.ReactNode;
  score?: string;
}

const TIMELINE_DATA: TimelineEntry[] = [
  {
    title: "B.E. Computer Science Engineering",
    institution: "Vidyaa Vikas College of Engineering and Technology",
    date: "Expected 2026",
    description: "Pursuing a Bachelor's degree in Computer Science Engineering, building hands-on expertise in full-stack web architectures, AI automation, and algorithms.",
    icon: <GraduationCap className="w-5 h-5 text-[#B600A8]" />
  },
  {
    title: "Front-End Development Internship",
    institution: "Cognifyz IT Solutions Pvt. Ltd.",
    date: "June 2026 – July 2026",
    description: "Served as a Front-End Development Intern constructing responsive web interfaces, UI component architectures, and optimizing CSS performance.",
    score: "ID: CTI/A1/C367251",
    icon: <Briefcase className="w-5 h-5 text-cyan-400" />
  },
  {
    title: "AI & Full-Stack Development Specialization",
    institution: "NxtWave CCBP 4.0 Academy",
    date: "2024 – 2026",
    description: "Specializing in Model Context Protocol (MCP), AI automation workflows, Make.com integration, React web apps, and Python data analysis.",
    score: "Industry Certified",
    icon: <Code2 className="w-5 h-5 text-[#B600A8]" />
  },
  {
    title: "Higher Secondary Certificate (+2)",
    institution: "Shree Valli Matric Higher Secondary School, Erode",
    date: "March 2024",
    score: "Score: 70%",
    icon: <BookOpen className="w-5 h-5 text-indigo-500" />
  },
  {
    title: "Secondary School Leaving Certificate (SSLC)",
    institution: "Shree Valli Matric Higher Secondary School, Erode",
    date: "April 2022",
    score: "Score: 81%",
    icon: <Award className="w-5 h-5 text-amber-500" />
  }
];

export const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section
      ref={containerRef}
      id="timeline"
      className={`px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20 overflow-hidden select-none transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#0C0C0C] text-[#D7E2EA]' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <FadeIn delay={0} y={40} rotateX={20} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}
          >
            Education
          </h2>
          <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest font-extrabold mt-3 ${
            theme === 'dark' ? 'text-cyan-400' : 'text-indigo-700'
          }`}>
            Academic Milestones, Internships & Training
          </p>
        </FadeIn>

        {/* Timeline Container */}
        <div className="relative w-full max-w-5xl">
          {/* Vertical Line Background Track */}
          <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 z-0 rounded-full ${
            theme === 'dark' ? 'bg-[#D7E2EA]/10' : 'bg-[#0F172A]/20'
          }`}>
            {/* Animated Drawing Line */}
            <motion.div
              style={{
                scaleY: scrollYProgress,
                transformOrigin: "top",
                background: theme === 'dark'
                  ? 'linear-gradient(180deg, #00F0FF, #B600A8, #7621B0, #FF007A)'
                  : 'linear-gradient(180deg, #4338CA, #6D28D9, #C026D3, #4338CA)',
                boxShadow: theme === 'dark' ? '0 0 16px rgba(0,240,255,0.8)' : '0 0 16px rgba(67,56,202,0.6)'
              }}
              className="w-full h-full rounded-full"
            />
          </div>

          {/* Entries */}
          <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {TIMELINE_DATA.map((entry, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row w-full items-start md:items-center relative ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Card Container with 3D Tilt */}
                  <div
                    className={`w-full md:w-[calc(50%-36px)] pl-16 md:pl-0 ${
                      isEven ? 'md:pr-8 text-left' : 'md:pl-8 text-left'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20, rotateY: isEven ? -15 : 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
                      whileHover={{
                        scale: 1.05,
                        rotateY: isEven ? -8 : 8,
                        rotateX: -4,
                        transition: { type: 'spring', stiffness: 350, damping: 18 }
                      }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: index * 0.15 }}
                      className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 transition-all duration-300 relative shadow-2xl overflow-hidden cursor-pointer ${
                        theme === 'dark'
                          ? 'border-[#D7E2EA]/20 bg-[#121214]/90 backdrop-blur-xl hover:border-cyan-400/50 shadow-black'
                          : 'border-[#0F172A]/20 bg-white shadow-indigo-500/10 hover:border-indigo-600/50'
                      }`}
                      style={{ perspective: 1000 }}
                    >
                      {/* Top Header & Icon */}
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-3 rounded-2xl border ${
                          theme === 'dark' ? 'bg-[#1C1C1F] border-white/10' : 'bg-indigo-50 border-indigo-100'
                        }`}>
                          {entry.icon}
                        </div>
                        {entry.score && (
                          <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                            theme === 'dark' ? 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-800'
                          }`}>
                            {entry.score}
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-black uppercase tracking-tight leading-snug ${
                          theme === 'dark' ? 'text-[#D7E2EA]' : 'text-slate-950'
                        }`}
                        style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)' }}
                      >
                        {entry.title}
                      </h3>
                      <p
                        className={`mt-1.5 font-bold ${
                          theme === 'dark' ? 'text-cyan-400' : 'text-indigo-700'
                        }`}
                        style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
                      >
                        {entry.institution}
                      </p>
                      <p className={`uppercase tracking-widest text-xs mt-2 font-black font-mono ${
                        theme === 'dark' ? 'text-[#D7E2EA]/60' : 'text-slate-700'
                      }`}>
                        {entry.date}
                      </p>
                      {entry.description && (
                        <p
                          className={`leading-relaxed mt-3.5 font-semibold ${
                            theme === 'dark' ? 'text-[#D7E2EA]/75' : 'text-slate-700'
                          }`}
                          style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)' }}
                        >
                          {entry.description}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Circular Timeline Node Badge */}
                  <div className="absolute left-6 md:left-1/2 top-[32px] md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ scale: 1.35 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 16,
                        delay: index * 0.15 + 0.1,
                      }}
                      style={{
                        background: theme === 'dark'
                          ? 'linear-gradient(123deg, #00F0FF 0%, #B600A8 50%, #FF007A 100%)'
                          : 'linear-gradient(123deg, #312E81 0%, #4338CA 50%, #C026D3 100%)',
                        boxShadow: theme === 'dark' ? '0 0 20px rgba(0,240,255,0.9)' : '0 0 20px rgba(67,56,202,0.7)',
                      }}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center cursor-pointer shadow-xl"
                    >
                      <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
