import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

export const ScrollAirEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const velocityRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    scrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = Date.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();

      const deltaY = currentScrollY - scrollYRef.current;
      const deltaTime = Math.max(1, currentTime - lastScrollTimeRef.current);

      // Scroll speed/velocity: pixels per millisecond
      const calculatedVelocity = deltaY / deltaTime;
      
      // Filter out small jitters
      if (Math.abs(calculatedVelocity) > 0.05) {
        velocityRef.current = calculatedVelocity * 1.5; // Scale velocity
      }

      scrollYRef.current = currentScrollY;
      lastScrollTimeRef.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const vel = velocityRef.current;
      const absVel = Math.abs(vel);

      // Spawn wind streaks if velocity is high
      if (absVel > 0.2) {
        const spawnCount = Math.min(5, Math.ceil(absVel * 3));
        for (let i = 0; i < spawnCount; i++) {
          // If scrolling down (vel > 0), air moves UP (speed < 0)
          // If scrolling up (vel < 0), air moves DOWN (speed > 0)
          const direction = vel > 0 ? -1 : 1;
          const speed = direction * (absVel * 6 + Math.random() * 5);
          
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            // Spawn from bottom if moving up, or from top if moving down
            y: direction === -1 ? canvas.height + 10 : -10,
            length: Math.min(180, absVel * 90 + Math.random() * 40),
            speed: speed,
            opacity: Math.min(0.4, absVel * 0.15 + 0.05),
            width: Math.max(0.5, Math.min(2.5, absVel * 0.8)),
          });
        }
      }

      // Decay velocity slowly
      velocityRef.current *= 0.92;

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.y += p.speed;
        p.opacity -= 0.008; // gradual fade out

        if (p.opacity <= 0) return false;
        
        // Boundaries checks
        if (p.speed < 0 && p.y + p.length < 0) return false;
        if (p.speed > 0 && p.y - p.length > canvas.height) return false;

        // Draw the streak
        ctx.strokeStyle = `rgba(215, 226, 234, ${p.opacity})`;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + (p.speed > 0 ? -p.length : p.length));
        ctx.stroke();

        return true;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[45] select-none"
    />
  );
};
