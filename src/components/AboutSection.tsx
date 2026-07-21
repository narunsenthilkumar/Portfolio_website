import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { useTheme } from '../context/ThemeContext';
import { Cpu, Terminal, Cloud, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMousePos({ x, y });
  };

  const highlights = [
    { icon: <Terminal className="w-6 h-6 text-indigo-500" />, title: "Full Stack & Web Architecture", desc: "Building scalable frontend & backend web systems" },
    { icon: <Cpu className="w-6 h-6 text-purple-500" />, title: "AI & Machine Learning", desc: "Predictive analytics, data wrangling & model pipelines" },
    { icon: <Cloud className="w-6 h-6 text-cyan-500" />, title: "Cloud & Automation", desc: "Automated deployment, DevOps & RESTful microservices" },
  ];

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen flex flex-col justify-center items-center px-4 xs:px-6 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32 overflow-hidden select-none transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#0C0C0C]' : 'bg-[#F8FAFC]'
      }`}
    >
      {/* DECORATIVE 3D FLOATING CORNER ICONS WITH PARALLAX */}
      <motion.div
        animate={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="absolute top-[3%] sm:top-[5%] left-[2%] sm:left-[4%] z-10 pointer-events-none opacity-40 sm:opacity-75 md:opacity-100 transition-opacity duration-300"
      >
        <img
          src="/ai_automation_icon.png"
          alt="AI & Automation Icon"
          className="w-[70px] xs:w-[90px] sm:w-[140px] md:w-[180px] lg:w-[220px] object-contain drop-shadow-[0_15px_30px_rgba(181,1,167,0.2)] animate-pulse"
          style={{ animationDuration: '4s' }}
        />
      </motion.div>

      <motion.div
        animate={{ x: -mousePos.x * 1.2, y: -mousePos.y * 1.2 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="absolute bottom-[4%] sm:bottom-[8%] left-[2%] sm:left-[5%] z-10 pointer-events-none opacity-40 sm:opacity-75 md:opacity-100 transition-opacity duration-300"
      >
        <img
          src="/code_data_icon.png"
          alt="Code & Data Icon"
          className="w-[60px] xs:w-[80px] sm:w-[120px] md:w-[150px] lg:w-[190px] object-contain drop-shadow-[0_15px_30px_rgba(62,207,142,0.2)] animate-bounce"
          style={{ animationDuration: '6s' }}
        />
      </motion.div>

      <motion.div
        animate={{ x: -mousePos.x * 1.5, y: mousePos.y * 1.5 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="absolute top-[3%] sm:top-[5%] right-[2%] sm:right-[4%] z-10 pointer-events-none opacity-40 sm:opacity-75 md:opacity-100 transition-opacity duration-300"
      >
        <img
          src="/cloud_deploy_icon.png"
          alt="Cloud & Deploy Icon"
          className="w-[70px] xs:w-[90px] sm:w-[140px] md:w-[180px] lg:w-[220px] object-contain drop-shadow-[0_15px_30px_rgba(2,86,155,0.2)] animate-pulse"
          style={{ animationDuration: '5s' }}
        />
      </motion.div>

      <motion.div
        animate={{ x: mousePos.x * 1.2, y: -mousePos.y * 1.2 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="absolute bottom-[4%] sm:bottom-[8%] right-[2%] sm:right-[5%] z-10 pointer-events-none opacity-40 sm:opacity-75 md:opacity-100 transition-opacity duration-300"
      >
        <img
          src="/game_dev_icon.png"
          alt="Game Dev Icon"
          className="w-[75px] xs:w-[95px] sm:w-[150px] md:w-[190px] lg:w-[230px] object-contain drop-shadow-[0_15px_30px_rgba(240,80,50,0.2)] animate-bounce"
          style={{ animationDuration: '7s' }}
        />
      </motion.div>

      {/* CONTENT INNER CONTAINER */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl w-full">
        {/* About Me Heading */}
        <FadeIn delay={0} y={40} rotateX={20} className="mb-6 sm:mb-10">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-[2.75rem] xs:text-[3.75rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem]"
          >
            About me
          </h2>
        </FadeIn>

        {/* Scroll Reveal Description */}
        <div className="mb-10 sm:mb-14 px-2 sm:px-6">
          <AnimatedText
            text="Hey there! I’m a Computer Science Engineer driven by the thrill of optimization and the art of digital creation. Half of my brain is dedicated to analytical problem-solving, algorithms, and system architectures; the other half is obsessed with building high-performance web applications, intelligent automation, and interactive experiences."
            className={`font-semibold leading-relaxed max-w-[680px] mx-auto text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl ${
              theme === 'dark' ? 'text-[#D7E2EA]' : 'text-slate-900'
            }`}
          />
        </div>

        {/* 3D Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full mb-12 sm:mb-16 px-1 sm:px-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.04,
                rotateY: 6,
                rotateX: -3,
                y: -5,
                transition: { type: 'spring', stiffness: 280, damping: 24 }
              }}
              className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border text-left flex flex-col justify-between shadow-xl backdrop-blur-xl relative overflow-hidden group cursor-pointer transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#121214]/80 border-white/10 hover:border-cyan-400/50 shadow-black'
                  : 'bg-white border-slate-200 hover:border-indigo-600/50 shadow-slate-200'
              }`}
              style={{ perspective: 1000 }}
            >
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border ${
                  theme === 'dark' ? 'bg-[#1A1A1E] border-white/10' : 'bg-slate-100 border-slate-200'
                }`}>
                  {item.icon}
                </div>
                <Sparkles className={`w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity ${
                  theme === 'dark' ? 'text-cyan-400' : 'text-indigo-600'
                }`} />
              </div>

              <div>
                <h3 className={`text-sm sm:text-base md:text-lg font-black uppercase tracking-tight mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-950'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                  theme === 'dark' ? 'text-[#D7E2EA]/70' : 'text-slate-600'
                }`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Button */}
        <FadeIn delay={0.15} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};
