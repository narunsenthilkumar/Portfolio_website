import React, { useEffect, useRef } from 'react';

interface ClickPulse {
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export const HeroEye: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Track mouse coordinates
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  
  // Eyeball looking offset (smoothed coordinates)
  const eyeOffsetRef = useRef({ x: 0, y: 0 });
  
  // Pupil dilation scale
  const pupilScaleRef = useRef(1.0);
  
  // Click pulse shockwaves
  const pulsesRef = useRef<ClickPulse[]>([]);
  
  // Animation time
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      // Eyeball container is responsive: ~340px on mobile, 450px on desktop
      const size = window.innerWidth < 640 ? 340 : 450;
      canvas.width = size;
      canvas.height = size;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Track mouse coordinates relative to canvas center
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      mouseRef.current = {
        x: e.clientX - cx,
        y: e.clientY - cy,
      };
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    const handleGlobalClick = () => {
      // Dilate pupil
      pupilScaleRef.current = 1.45;
      
      // Spawn new energy shockwave pulse
      pulsesRef.current.push({
        radius: 35,
        maxRadius: 135,
        opacity: 0.95,
        speed: 4.8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Listen to clicks within the Hero section container specifically
    const heroSection = document.querySelector('section');
    if (heroSection) {
      heroSection.addEventListener('mousedown', handleGlobalClick);
    }

    let animFrameId: number;
    let rotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.05;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const mouse = mouseRef.current;

      // 1. Calculate looking direction offset with smoothing
      let targetX = 0;
      let targetY = 0;

      if (isHoveredRef.current) {
        const dist = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
        const limit = 20; // max offset of pupil/iris
        if (dist > 1) {
          // Eyeball tracks the cursor direction smoothly
          targetX = (mouse.x / dist) * Math.min(limit, dist * 0.06);
          targetY = (mouse.y / dist) * Math.min(limit, dist * 0.06);
        }
      }

      // Smooth interpolation (spring-like ease)
      eyeOffsetRef.current.x += (targetX - eyeOffsetRef.current.x) * 0.08;
      eyeOffsetRef.current.y += (targetY - eyeOffsetRef.current.y) * 0.08;

      const eyeX = cx + eyeOffsetRef.current.x;
      const eyeY = cy + eyeOffsetRef.current.y;

      // Smooth decay of pupil dilation back to 1.0
      pupilScaleRef.current += (1.0 - pupilScaleRef.current) * 0.12;

      // 2. Draw Outer Metallic Tech Ring (Reticle)
      rotation += 0.0015;
      const rOuter = 150;
      const numTicks = 60;
      ctx.lineWidth = 1;
      
      // Outer ring main circular path
      ctx.strokeStyle = 'rgba(215, 226, 234, 0.18)';
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
      ctx.stroke();

      // Outer ring tick marks
      ctx.strokeStyle = 'rgba(215, 226, 234, 0.35)';
      for (let i = 0; i < numTicks; i++) {
        const angle = (i / numTicks) * Math.PI * 2 + rotation;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        // Every 5th tick is longer
        const tickLen = i % 5 === 0 ? 12 : 6;
        ctx.beginPath();
        ctx.moveTo(cx + cos * rOuter, cy + sin * rOuter);
        ctx.lineTo(cx + cos * (rOuter - tickLen), cy + sin * (rOuter - tickLen));
        ctx.stroke();
      }

      // 3. Draw Iris Fibers (glowing procedural lines)
      const numFibers = 160;
      const rPupilBase = 32;
      const rPupil = rPupilBase * pupilScaleRef.current;
      const rIrisMax = 90;

      // Background iris dark blue volume layer
      ctx.fillStyle = 'rgba(12, 12, 20, 0.85)';
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, rIrisMax, 0, Math.PI * 2);
      ctx.fill();

      // Draw multi-layered fibrous details
      for (let i = 0; i < numFibers; i++) {
        const angle = (i / numFibers) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Add wavy texture length modulation
        const wave = Math.sin(angle * 14 + timeRef.current * 2) * 5;
        const noise = Math.cos(angle * 32) * 3;
        const len = rIrisMax + wave + noise;

        // Base Layer (Deep Indigo/Blue)
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = 'rgba(29, 78, 216, 0.45)';
        ctx.beginPath();
        ctx.moveTo(eyeX + cos * rPupil, eyeY + sin * rPupil);
        ctx.lineTo(cx + cos * len, cy + sin * len);
        ctx.stroke();

        // Mid Layer (Electric Blue)
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.7)';
        ctx.beginPath();
        ctx.moveTo(eyeX + cos * rPupil, eyeY + sin * rPupil);
        ctx.lineTo(cx + cos * (len - 8), cy + sin * (len - 8));
        ctx.stroke();

        // Highlight Layer (Glow Cyan/White)
        if (i % 3 === 0) {
          ctx.lineWidth = 1.0;
          ctx.strokeStyle = 'rgba(165, 243, 252, 0.85)';
          ctx.beginPath();
          ctx.moveTo(eyeX + cos * (rPupil + 2), eyeY + sin * (rPupil + 2));
          ctx.lineTo(cx + cos * (len - 15), cy + sin * (len - 15));
          ctx.stroke();
        }
      }

      // 4. Draw Click Shockwave Pulses
      pulsesRef.current = pulsesRef.current.filter((p) => {
        p.radius += p.speed;
        p.opacity -= 0.022;

        if (p.opacity <= 0 || p.radius >= p.maxRadius) return false;

        // Shockwave ring
        ctx.strokeStyle = `rgba(165, 243, 252, ${p.opacity})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#6366F1';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, p.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Reset shadow
        ctx.shadowBlur = 0;

        return true;
      });

      // 5. Draw Black Pupil
      ctx.fillStyle = '#050508';
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, rPupil, 0, Math.PI * 2);
      ctx.fill();

      // Pupil inner border glow highlight
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, rPupil, 0, Math.PI * 2);
      ctx.stroke();

      // Pupil reflection spot (spherical glass effect)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(eyeX - rPupil * 0.35, eyeY - rPupil * 0.35, rPupil * 0.18, 0, Math.PI * 2);
      ctx.fill();

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (heroSection) {
        heroSection.removeEventListener('mousedown', handleGlobalClick);
      }
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center pointer-events-auto"
      style={{
        filter: "drop-shadow(0 20px 45px rgba(99, 102, 241, 0.3))"
      }}
    >
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto object-contain cursor-crosshair select-none"
      />
    </div>
  );
};
