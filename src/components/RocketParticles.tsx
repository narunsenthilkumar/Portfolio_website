import React, { useEffect, useRef, useState } from 'react';

// ─── Particle types ────────────────────────────────────────────────────────────
interface RocketParticle {
  origX: number; // original relative X coordinate (at scale 1.0)
  origY: number; // original relative Y coordinate (at scale 1.0)
  relX: number;  // scaled relative X
  relY: number;  // scaled relative Y
  x: number;     // current X coordinate on screen
  y: number;     // current Y coordinate on screen
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  phase: number;
}

interface DotParticle {
  ox: number;   // origin X
  oy: number;   // origin Y
  x: number;    // current X
  y: number;    // current Y
  vx: number;
  vy: number;
}

// ─── Rocket shape generator ───────────────────────────────────────────────────
function generateRocketPoints(): { x: number; y: number; color: string }[] {
  const points: { x: number; y: number; color: string }[] = [];
  const target = 2200; // Dense and detailed particle count

  // -35° rotation
  const cos = Math.cos(-35 * Math.PI / 180);
  const sin = Math.sin(-35 * Math.PI / 180);

  while (points.length < target) {
    const rx = (Math.random() - 0.5) * 200;
    const ry = (Math.random() - 0.5) * 360;

    let inside = false;
    let color = '#FFF';

    // Cockpit window (cyan/blue)
    if (Math.sqrt(rx * rx + (ry + 35) * (ry + 35)) <= 16) {
      inside = true;
      color = '#00E5FF';
    }

    // Nose cone (red)
    if (!inside && ry >= -170 && ry < -80) {
      const coneW = (ry + 170) * 0.55;
      if (Math.abs(rx) <= coneW) {
        inside = true;
        color = '#FF1744';
      }
    }

    // Main body (white/silver/cyan shade)
    if (!inside && ry >= -80 && ry <= 80) {
      if (Math.abs(rx) <= 46) {
        inside = true;
        color = Math.random() > 0.5 ? '#FFFFFF' : '#E0F7FA';
      }
    }

    // Fins (red/dark red)
    if (!inside && ry >= 30 && ry <= 110) {
      const lLimit = -46 - (ry - 30) * 0.70;
      const rLimit = 46 + (ry - 30) * 0.70;
      if (rx >= lLimit && rx <= -46) { inside = true; color = '#FF1744'; }
      else if (rx >= 46 && rx <= rLimit) { inside = true; color = '#D50000'; }
    }

    // Flame (orange/yellow/red)
    if (!inside && ry > 80 && ry <= 165) {
      const fw = 34 - (ry - 80) * 0.38;
      if (Math.abs(rx) <= fw) {
        inside = true;
        color = Math.random() > 0.5 ? '#FF9100' : '#FF3D00';
      }
    }

    if (inside) {
      const tx = rx * cos - ry * sin;
      const ty = rx * sin + ry * cos;
      points.push({ x: tx, y: ty, color });
    }
  }
  return points;
}

// ─── Scale helper based on viewport width ──────────────────────────────────────
function getScaleForWidth(width: number): number {
  if (width < 640) return 1.25;  // Compact scale for mobile
  if (width < 1024) return 1.85; // Medium scale for tablets
  return 2.55;                   // Large, tall and wide for desktops
}

export const RocketParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<RocketParticle[]>([]);
  const dotsRef   = useRef<DotParticle[]>([]);
  const mouseRef  = useRef({ x: -9999, y: -9999, active: false });
  const rafRef    = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Smooth cursor tilt tracking
  const angleXRef = useRef(0);
  const angleYRef = useRef(0);
  const targetAngleXRef = useRef(0);
  const targetAngleYRef = useRef(0);

  // ── Initialize rocket template points once ──────────────────────────────────
  useEffect(() => {
    const pts = generateRocketPoints();
    rocketRef.current = pts.map(p => ({
      origX: p.x,
      origY: p.y,
      relX: p.x,
      relY: p.y,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      size: Math.random() * 2.2 + 0.8,
      alpha: 0,
      baseAlpha: Math.random() * 0.4 + 0.6,
      color: p.color,
      phase: Math.random() * Math.PI * 2,
    }));
    
    // Set loaded state to trigger fade-in
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // ── Responsive Layout & Resize Handler ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const initCanvasAndParticles = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;

      const scale = getScaleForWidth(width);
      const cx = width / 2;
      const cy = height / 2;

      // Update rocket target coordinates relative to new screen size
      rocketRef.current.forEach(p => {
        p.relX = p.origX * scale;
        p.relY = p.origY * scale;
        p.targetX = cx + p.relX;
        // Shift slightly upward on small screens to clear bottom text bars
        p.targetY = cy + p.relY - (width < 640 ? 55 : 20);
        
        // If particle was unitialized, start it near target with random noise
        if (p.x === 0 && p.y === 0) {
          p.x = p.targetX + (Math.random() - 0.5) * 500;
          p.y = p.targetY + (Math.random() - 0.5) * 500;
        }
      });

      // Initialize repellent dot grid across the entire canvas space
      const spacing = 32;
      const dots: DotParticle[] = [];
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      const offX = (width - cols * spacing) / 2 + spacing / 2;
      const offY = (height - rows * spacing) / 2 + spacing / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offX + c * spacing;
          const y = offY + r * spacing;
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
        }
      }
      dotsRef.current = dots;
    };

    initCanvasAndParticles();
    window.addEventListener('resize', initCanvasAndParticles);

    return () => {
      window.removeEventListener('resize', initCanvasAndParticles);
    };
  }, []);

  // ── Animation Loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SPRING   = 0.045;
    const FRICTION = 0.88;
    const REPEL_R  = 100;
    const REPEL_F  = 4.2;

    const DOT_SPRING  = 0.045;
    const DOT_DAMP    = 0.85;
    const DOT_REPEL_R = 100;
    const DOT_REPEL_F = 4.2;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const m = mouseRef.current;

      // ── Smooth Angle Interpolation (for 3D tilt hover) ─────────────────────
      if (m.active) {
        const dx = m.x - width / 2;
        const dy = m.y - height / 2;
        targetAngleXRef.current = (dx / width) * 0.28;
        targetAngleYRef.current = (dy / height) * 0.28;
      } else {
        targetAngleXRef.current = 0;
        targetAngleYRef.current = 0;
      }
      angleXRef.current += (targetAngleXRef.current - angleXRef.current) * 0.095;
      angleYRef.current += (targetAngleYRef.current - angleYRef.current) * 0.095;

      // ── 1. Render background repellent dots (QuotesSection style) ─────────
      const dots = dotsRef.current;
      ctx.fillStyle = 'rgba(215, 226, 234, 0.22)';
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const ax = (d.ox - d.x) * DOT_SPRING;
        const ay = (d.oy - d.y) * DOT_SPRING;
        d.vx = (d.vx + ax) * DOT_DAMP;
        d.vy = (d.vy + ay) * DOT_DAMP;

        if (m.active) {
          const dx = d.x - m.x;
          const dy = d.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < DOT_REPEL_R) {
            const f = ((DOT_REPEL_R - dist) / DOT_REPEL_R) * DOT_REPEL_F;
            const a = Math.atan2(dy, dx);
            d.vx += Math.cos(a) * f;
            d.vy += Math.sin(a) * f;
          }
        }

        d.x += d.vx;
        d.y += d.vy;

        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 2. Render Rocket particles (swarm) ─────────────────────────────────
      const particles = rocketRef.current;
      ctx.shadowBlur = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += 0.038;

        // Springs back home relative to current cursor tilt offsets
        p.alpha = Math.min(
          p.baseAlpha + Math.sin(p.phase) * 0.12,
          p.alpha + 0.035
        );

        // Apply cursor tilt offset to target position dynamically
        const tx = p.targetX + angleXRef.current * 70;
        const ty = p.targetY + angleYRef.current * 70;

        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_R) {
            const f = ((REPEL_R - dist) / REPEL_R) * REPEL_F;
            const a = Math.atan2(dy, dx);
            p.vx += Math.cos(a) * f;
            p.vy += Math.sin(a) * f;
          }
        }

        const ax = (tx - p.x) * SPRING;
        const ay = (ty - p.y) * SPRING;
        p.vx = (p.vx + ax) * FRICTION;
        p.vy = (p.vy + ay) * FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        if (p.alpha <= 0) continue;

        // Apply dynamic canvas neon glow properties for window/engine sparks
        const hasGlow = p.color === '#00E5FF' || p.color === '#FF9100' || p.color === '#FF3D00';
        if (hasGlow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Mouse & Touch Event Handlers ───────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => { mouseRef.current.active = false; };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    const BLAST_R = 170;
    const BLAST_F = 24;

    // Trigger explosive shockwave on rocket particles
    rocketRef.current.forEach(p => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < BLAST_R) {
        const f = ((BLAST_R - dist) / BLAST_R) * BLAST_F;
        const a = Math.atan2(dy, dx);
        p.vx = Math.cos(a) * f;
        p.vy = Math.sin(a) * f;
      }
    });

    // Shockwave also affects background dots
    dotsRef.current.forEach(d => {
      const dx = d.x - cx;
      const dy = d.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < BLAST_R) {
        const f = ((BLAST_R - dist) / BLAST_R) * 10;
        const a = Math.atan2(dy, dx);
        d.vx = Math.cos(a) * f;
        d.vy = Math.sin(a) * f;
      }
    });
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ opacity: loaded ? 1 : 0 }}
        className="w-full h-full cursor-crosshair transition-opacity duration-1000"
      />
    </div>
  );
};
