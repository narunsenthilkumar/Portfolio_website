import React from 'react';
import { FadeIn } from './FadeIn';

const COL1_SKILLS = [
  { name: 'Python', icon: '🐍' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Next.js', icon: '▲' },
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'Tailwind CSS', icon: '💨' },
  { name: 'C++', icon: '⚙️' },
  { name: 'C#', icon: '🔷' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'REST APIs', icon: '🔗' },
  { name: 'WebSockets', icon: '🔌' },
];

const COL2_SKILLS = [
  { name: 'TensorFlow', icon: '🧠' },
  { name: 'PyTorch', icon: '🔥' },
  { name: 'scikit-learn', icon: '📊' },
  { name: 'Pandas', icon: '🐼' },
  { name: 'NumPy', icon: '🔢' },
  { name: 'OpenCV', icon: '👁️' },
  { name: 'LangChain', icon: '🔗' },
  { name: 'n8n', icon: '🔄' },
  { name: 'Ollama', icon: '🦙' },
  { name: 'RAG Pipelines', icon: '📡' },
  { name: 'Prompt Eng.', icon: '✍️' },
  { name: 'HuggingFace', icon: '🤗' },
  { name: 'FastAPI', icon: '🚀' },
  { name: 'Jupyter', icon: '📓' },
  { name: 'MLflow', icon: '📈' },
];

const COL3_SKILLS = [
  { name: 'Git', icon: '🌿' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Google Cloud', icon: '☁️' },
  { name: 'Unity', icon: '🎮' },
  { name: 'Figma', icon: '🎨' },
  { name: 'VS Code', icon: '💻' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Redis', icon: '♦️' },
  { name: 'Postman', icon: '📮' },
  { name: 'Linux', icon: '🐧' },
  { name: 'CI/CD', icon: '♾️' },
];

interface SkillCardProps {
  name: string;
  icon: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon }) => (
  <div className="flex items-center gap-3 bg-[#0C0C0C]/[0.06] hover:bg-[#0C0C0C]/[0.10] border border-[#0C0C0C]/[0.08] hover:border-[#0C0C0C]/20 rounded-xl px-4 py-3 mx-1 my-1.5 transition-all duration-300 group cursor-default select-none w-full min-w-[170px]">
    <span className="text-xl leading-none group-hover:scale-110 transition-transform duration-200">{icon}</span>
    <span className="text-sm font-medium text-[#0C0C0C]/70 group-hover:text-[#0C0C0C] tracking-wide transition-colors duration-200 whitespace-nowrap">{name}</span>
  </div>
);

export const ServicesSection: React.FC = () => {
  return (
    <>
      {/* Inject CSS keyframes for the column scrolling */}
      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .skills-col:hover > div {
          animation-play-state: paused;
        }
      `}</style>

      <section
        id="skills"
        className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          {/* SKILLS HEADING */}
          <FadeIn delay={0} y={40} className="text-center mb-14 sm:mb-18 md:mb-24">
            <h2
              className="font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}
            >
              Skills
            </h2>
            <p className="mt-4 text-[#0C0C0C]/45 font-light text-sm sm:text-base tracking-widest uppercase">
              Languages · AI/ML · Tools & Platforms
            </p>
          </FadeIn>

          {/* THREE AUTO-SCROLL COLUMNS */}
          <FadeIn delay={0.2} y={30}>
            <div className="flex gap-3 sm:gap-4 md:gap-6 items-start">
              {/* Column 1 — scroll UP */}
              <div className="skills-col flex-1 min-w-0 overflow-hidden" style={{ height: '420px', position: 'relative' }}>
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                <div
                  className="flex flex-col"
                  style={{ animation: `scroll-up 32s linear infinite`, willChange: 'transform' }}
                >
                  {[...COL1_SKILLS, ...COL1_SKILLS].map((skill, idx) => (
                    <SkillCard key={`c1-${idx}`} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </div>

              {/* Column 2 — scroll DOWN */}
              <div className="skills-col flex-1 min-w-0 overflow-hidden" style={{ height: '420px', position: 'relative' }}>
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                <div
                  className="flex flex-col"
                  style={{ animation: `scroll-down 28s linear infinite`, willChange: 'transform' }}
                >
                  {[...COL2_SKILLS, ...COL2_SKILLS].map((skill, idx) => (
                    <SkillCard key={`c2-${idx}`} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </div>

              {/* Column 3 — scroll UP (faster) */}
              <div className="skills-col flex-1 min-w-0 overflow-hidden" style={{ height: '420px', position: 'relative' }}>
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                <div
                  className="flex flex-col"
                  style={{ animation: `scroll-up 36s linear infinite`, willChange: 'transform' }}
                >
                  {[...COL3_SKILLS, ...COL3_SKILLS].map((skill, idx) => (
                    <SkillCard key={`c3-${idx}`} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};
