import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { TimelineSection } from './components/TimelineSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { QuotesSection } from './components/QuotesSection';
import { CTASection } from './components/CTASection';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import { WaterDropletEffect } from './components/WaterDropletEffect';
import { ScrollAirEffect } from './components/ScrollAirEffect';
import { useTheme } from './context/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <div className={`relative w-full overflow-x-clip transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0C0C0C] text-[#D7E2EA]' : 'bg-[#F8FAFC] text-[#0F172A]'
        }`}>
        {/* Global sticky navbar */}
        {!isLoading && <Navbar />}

        {/* Global interactive scroll & click effects */}
        {!isLoading && <WaterDropletEffect />}
        {!isLoading && <ScrollAirEffect />}

        {/* Custom Cursor Dot & Trail */}
        <CustomCursor />

        {/* Main Content Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateX: 6, transformPerspective: 1200 }}
          animate={!isLoading ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} // cinematic easeOutExpo
        >
          {/* 1. HERO SECTION */}
          <HeroSection />

          {/* 2. MARQUEE SECTION */}
          <MarqueeSection />

          {/* 3. ABOUT SECTION */}
          <AboutSection />

          {/* 4. TIMELINE SECTION */}
          <TimelineSection />

          {/* 5. CERTIFICATIONS SECTION */}
          <CertificationsSection />

          {/* 6. PROJECTS SECTION */}
          <ProjectsSection />

          {/* 7. DEV QUOTES SECTION */}
          <QuotesSection />

          {/* 8. CTA SECTION */}
          <CTASection />

          {/* FOOTER */}
          <footer className={`py-16 px-6 border-t relative z-30 select-none transition-colors duration-500 ${theme === 'dark'
              ? 'bg-[#0C0C0C] text-[#D7E2EA]/50 border-[#D7E2EA]/10'
              : 'bg-[#F8FAFC] text-[#0F172A]/60 border-[#0F172A]/10'
            }`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="Narun Logo"
                    className="w-8 h-8 rounded-xl object-cover border border-white/20 shadow-md"
                  />
                  <span className="font-extrabold text-base sm:text-lg tracking-widest bg-black text-white px-3.5 py-1 rounded-xl border border-white/20 inline-block shadow-md">
                    NARUN
                  </span>
                </div>
                <span className="text-xs">© 2026 Developer & Creator. All rights reserved.</span>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="https://www.linkedin.com/in/narunjs23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-500 transition-colors duration-200"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/narunsenthilkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-500 transition-colors duration-200"
                >
                  GitHub
                </a>
                <a
                  href="https://x.com/narun4639"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-500 transition-colors duration-200"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://youtube.com/@tech_shark-w4y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-500 transition-colors duration-200"
                >
                  YouTube
                </a>
                <a
                  href="mailto:narunsenthilkumar20@gmail.com"
                  className="hover:text-indigo-500 transition-colors duration-200"
                >
                  Email
                </a>
              </div>
            </div>
          </footer>
        </motion.div>
      </div>
    </>
  );
}

export default App;
