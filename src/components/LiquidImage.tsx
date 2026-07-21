import React, { useEffect, useRef } from 'react';

export const LiquidImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  
  // Track mouse position globally
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const currentScaleRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animFrameId: number;

    const tick = () => {
      const img = imgRef.current;
      const turb = turbRef.current;
      const disp = dispRef.current;
      
      if (!img || !turb || !disp) {
        animFrameId = requestAnimationFrame(tick);
        return;
      }

      timeRef.current += 0.03;

      // Get image center bounds
      const rect = img.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Calculate distance to cursor
      const dx = mouseRef.current.x - cx;
      const dy = mouseRef.current.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Max hover influence radius of 260px
      const maxRadius = 260;
      let targetScale = 0;

      if (dist < maxRadius) {
        // Higher intensity closer to center (max 38px warp displacement)
        const factor = (1 - dist / maxRadius);
        targetScale = factor * 38;

        // Modulate base frequencies smoothly to simulate liquid flow waves
        const fx = 0.025 + Math.sin(timeRef.current) * 0.005;
        const fy = 0.035 + Math.cos(timeRef.current * 0.7) * 0.005;
        turb.setAttribute('baseFrequency', `${fx} ${fy}`);
      } else {
        targetScale = 0;
      }

      // Smooth interpolation for displacement scale values
      currentScaleRef.current += (targetScale - currentScaleRef.current) * 0.08;
      disp.setAttribute('scale', currentScaleRef.current.toFixed(2));

      animFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex justify-center items-center">
      {/* SVG Liquid Distortion Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="liquid-metal-warp">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.03 0.04"
              numOctaves="2"
              result="noise"
              seed="2"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Styled Portrait Image utilizing displacement filter */}
      <div 
        className="w-full relative group overflow-visible"
        style={{
          filter: "drop-shadow(0 20px 45px rgba(182, 0, 168, 0.28))"
        }}
      >
        <img
          ref={imgRef}
          src="/Profile_img_2.png"
          alt="Narun Portrait"
          className="w-full h-auto object-contain transition-all duration-300 select-none pointer-events-none"
          style={{
            filter: "url(#liquid-metal-warp)"
          }}
          loading="eager"
        />
      </div>
    </div>
  );
};
