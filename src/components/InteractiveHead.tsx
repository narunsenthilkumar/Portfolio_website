import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const InteractiveHead: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isFlashActive, setIsFlashActive] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Normalized coordinates (-1 to 1) relative to screen center
      const x = (e.clientX - w / 2) / (w / 2);
      const y = (e.clientY - h / 2) / (h / 2);

      setTilt({
        x: -y * 18, // Rotation around X-axis (tilt up/down)
        y: x * 18,  // Rotation around Y-axis (tilt left/right)
      });
    };

    const handleGlobalClick = () => {
      // 1. Trigger spring scale bounce animation on head
      controls.start({
        scale: [1, 0.91, 1.06, 1],
        transition: {
          duration: 0.5,
          times: [0, 0.25, 0.65, 1],
          ease: "easeOut"
        }
      });

      // 2. Trigger amber visor glow flash
      setIsFlashActive(true);
      setTimeout(() => setIsFlashActive(false), 380);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleGlobalClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [controls]);

  return (
    <div
      className="relative w-full flex justify-center items-center pointer-events-auto"
      style={{ perspective: 1000 }}
    >
      {/* 3D Rotatable Card Container */}
      <motion.div
        animate={controls}
        className="w-full relative flex justify-center items-center"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Glow ambient background aura (orange matching visor) */}
        <div
          className="absolute w-[80%] h-[80%] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none z-0 transition-opacity duration-300"
          style={{
            transform: 'translateZ(-30px)',
            opacity: isFlashActive ? 1.0 : 0.45,
          }}
        />

        {/* Visor Glow Overlay Flash (Fades and scales out on click) */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-500/20 to-transparent pointer-events-none z-20 mix-blend-color-dodge transition-all duration-300 ease-out"
          style={{
            opacity: isFlashActive ? 0.9 : 0,
            transform: `translateZ(25px) scale(${isFlashActive ? 1.05 : 1})`,
            filter: 'blur(4px)',
          }}
        />

        {/* Core Visor Image Container */}
        <div
          className="relative w-full rounded-3xl overflow-visible border border-[#D7E2EA]/5 bg-transparent flex justify-center shadow-2xl"
          style={{
            transform: 'translateZ(15px)',
            boxShadow: '0 20px 45px rgba(245, 158, 11, 0.18)',
          }}
        >
          <img
            src="/profile_vr_glasses.png"
            alt="Narun Visor Avatar"
            className="w-full h-auto object-contain select-none pointer-events-none"
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  );
};
