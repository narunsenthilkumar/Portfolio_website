import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { LiveProjectButton } from './LiveProjectButton';
import { useTheme } from '../context/ThemeContext';
import { FadeIn } from './FadeIn';
import { Sparkles, ExternalLink } from 'lucide-react';

interface Project {
  num: string;
  title: string;
  category: string;
  github: string;
  images: [string, string, string];
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "MCP Learning Path Demo",
    category: "Open Source",
    github: "https://github.com/narunsenthilkumar/mcp-learning-path-demo",
    images: ["/project_mcp.png", "/project_mcp_2.png", "/project_mcp_3.png"],
    tags: ["React", "TypeScript", "MCP Protocol", "AI Tools"]
  },
  {
    num: "02",
    title: "Buildthon Platform",
    category: "Hackathon",
    github: "https://github.com/narunsenthilkumar/buildthon",
    images: ["/project_buildthon.png", "/project_buildthon_2.png", "/project_buildthon_3.png"],
    tags: ["Full Stack", "Node.js", "MongoDB", "Realtime Web"]
  },
  {
    num: "03",
    title: "Skill Scout",
    category: "Personal App",
    github: "https://github.com/narunsenthilkumar/skill-scout",
    images: ["/project_skill_scout.png", "/project_skill_scout_2.png", "/project_skill_scout_3.png"],
    tags: ["React", "Tailwind CSS", "Job Analytics"]
  },
  {
    num: "04",
    title: "Space Escape Runner",
    category: "3D Game Dev",
    github: "https://github.com/narunsenthilkumar/Space_Escape_Runner_game",
    images: ["/project_space_escape.png", "/project_space_escape_2.png", "/project_space_escape_3.png"],
    tags: ["Three.js", "WebGL", "Physics Engine"]
  },
  {
    num: "05",
    title: "EduReach Platform",
    category: "Full-Stack Web",
    github: "https://github.com/narunsenthilkumar/Edureach-platform",
    images: ["/project_edureach_1.png", "/project_edureach_2.png", "/project_edureach_3.png"],
    tags: ["React", "Express", "PostgreSQL", "Education"]
  },
  {
    num: "06",
    title: "Recipe Filter",
    category: "Web App",
    github: "https://github.com/narunsenthilkumar/Recipe_Filter",
    images: ["/project_recipe_filter.png", "/project_recipe_filter_2.png", "/project_recipe_filter_3.png"],
    tags: ["JavaScript", "API Integration", "CSS3 Animation"]
  }
];

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      id="projects"
      className={`px-4 xs:px-6 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32 relative z-20 overflow-x-clip select-none transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0C0C0C] text-[#D7E2EA]' : 'bg-[#F8FAFC] text-[#0F172A]'
        }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="w-full text-center mb-12 sm:mb-16 md:mb-24">
          <FadeIn delay={0} y={30}>
            <h2
              className="hero-heading font-black uppercase text-center leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 9.5rem)' }}
            >
              Projects
            </h2>
            <p className={`text-[10px] xs:text-xs sm:text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest font-extrabold mt-2.5 sm:mt-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-700'
              }`}>
              Interactive Stacking 3D Showcase & Repositories
            </p>
          </FadeIn>
        </div>

        {/* Sticky stacking container */}
        <div className="relative flex flex-col gap-8 sm:gap-14 md:gap-24 w-full">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={idx}
              index={idx}
              project={project}
              totalCards={PROJECTS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  project: Project;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, totalCards, scrollYProgress }) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const finalScale = 1 - (totalCards - 1 - index) * 0.03;
  const triggerVal = Math.min(0.99, index / totalCards);
  const scale = useTransform(scrollYProgress, [0, triggerVal, 1], [1, 1, finalScale]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = -((y - cy) / cy) * 5;
    const rotateY = ((x - cx) / cx) * 5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const stickyTop = isMobile ? `${56 + index * 14}px` : `${96 + index * 24}px`;

  return (
    <div
      ref={cardContainerRef}
      className="h-auto md:h-[82vh] min-h-[440px] xs:min-h-[480px] md:min-h-[560px] md:max-h-[760px] sticky flex justify-center items-stretch w-full mb-8 sm:mb-14 md:mb-24"
      style={{
        top: stickyTop
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          scale,
          transform: isMobile ? 'none' : `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className={`w-full border-2 rounded-[28px] xs:rounded-[36px] sm:rounded-[48px] md:rounded-[60px] p-4 xs:p-5 sm:p-7 md:p-9 flex flex-col justify-between overflow-hidden transition-[background-color,border-color,box-shadow] duration-300 relative shadow-2xl ${theme === 'dark'
            ? 'bg-[#0C0C0C] border-[#D7E2EA]/20 shadow-black'
            : 'bg-white border-[#0F172A]/20 shadow-slate-300'
          }`}
      >
        {/* Shimmer Light Pass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none z-10" />

        {/* Top Row: Number, Title, Tags, Live Button */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b pb-4 sm:pb-5 z-20 ${theme === 'dark' ? 'border-[#D7E2EA]/15' : 'border-[#0F172A]/15'
          }`}>
          <div className="flex items-start sm:items-center gap-3 sm:gap-5 md:gap-7">
            <motion.span
              whileHover={{ scale: 1.08, rotate: 4 }}
              className={`font-black leading-none select-none shrink-0 transition-colors duration-300 ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-700'
                }`}
              style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}
            >
              {project.num}
            </motion.span>
            <div className="flex flex-col text-left">
              <span className={`uppercase text-[10px] sm:text-xs tracking-widest font-black flex items-center gap-1.5 ${theme === 'dark' ? 'text-purple-400' : 'text-indigo-800'
                }`}>
                <Sparkles className="w-3 h-3" />
                {project.category}
              </span>
              <h3 className={`uppercase text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tight leading-tight mt-0.5 ${theme === 'dark' ? 'text-[#D7E2EA]' : 'text-slate-950'
                }`}>
                {project.title}
              </h3>
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1 xs:gap-1.5 mt-1.5 sm:mt-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${theme === 'dark'
                        ? 'bg-white/5 border-white/15 text-[#D7E2EA]/80'
                        : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="self-start sm:self-center shrink-0 z-20 mt-1 sm:mt-0">
            <LiveProjectButton href={project.github} />
          </div>
        </div>

        {/* Middle Image Cards Row with 3D Tilt & Touch Snap Scroll */}
        <div className="my-3 sm:my-5 flex-grow flex items-center justify-start md:justify-center gap-2.5 sm:gap-4 md:gap-5 overflow-x-auto select-none py-2 px-1 z-20 no-scrollbar snap-x snap-mandatory">
          {project.images.map((imgSrc, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -6, rotateZ: i % 2 === 0 ? 1 : -1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className={`flex-1 min-w-[170px] xs:min-w-[210px] sm:min-w-[250px] md:min-w-[290px] max-w-[340px] h-[140px] xs:h-[170px] sm:h-[220px] md:h-[270px] rounded-xl sm:rounded-2xl md:rounded-3xl border-2 overflow-hidden shrink-0 shadow-xl relative group cursor-pointer snap-center ${theme === 'dark' ? 'border-[#D7E2EA]/15 bg-[#161616]' : 'border-[#0F172A]/15 bg-slate-100'
                }`}
            >
              <img
                src={imgSrc}
                alt={`${project.title} screenshot ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <span className="text-white text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> View Screenshot
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
