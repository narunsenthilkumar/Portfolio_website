import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const CYBER_GLYPHS = "01$#@%&*?<>[]{}!+=-";
const TARGET_NAME = "NARUN";

// Anatomical human brain coordinate map (relative to center of canvas)
const BRAIN_NODES = [
  // Brainstem (center bottom)
  { x: 0, y: 130, region: "stem" },
  { x: -15, y: 95, region: "stem" },
  { x: 15, y: 95, region: "stem" },
  { x: -8, y: 65, region: "stem" },
  { x: 8, y: 65, region: "stem" },

  // Cerebellum (bottom left/back area)
  { x: -35, y: 75, region: "cerebellum" },
  { x: -60, y: 60, region: "cerebellum" },
  { x: -80, y: 70, region: "cerebellum" },
  { x: -70, y: 40, region: "cerebellum" },
  { x: -48, y: 48, region: "cerebellum" },
  { x: -28, y: 52, region: "cerebellum" },

  // Left Cerebrum Outer Boundary
  { x: -28, y: -95, region: "c_left_out" },
  { x: -60, y: -85, region: "c_left_out" },
  { x: -90, y: -68, region: "c_left_out" },
  { x: -115, y: -42, region: "c_left_out" },
  { x: -130, y: -12, region: "c_left_out" },
  { x: -135, y: 20, region: "c_left_out" },
  { x: -125, y: 48, region: "c_left_out" },
  { x: -105, y: 68, region: "c_left_out" },
  { x: -80, y: 72, region: "c_left_out" },

  // Right Cerebrum Outer Boundary
  { x: 28, y: -95, region: "c_right_out" },
  { x: 60, y: -85, region: "c_right_out" },
  { x: 90, y: -68, region: "c_right_out" },
  { x: 115, y: -42, region: "c_right_out" },
  { x: 130, y: -12, region: "c_right_out" },
  { x: 135, y: 20, region: "c_right_out" },
  { x: 125, y: 48, region: "c_right_out" },
  { x: 105, y: 68, region: "c_right_out" },
  { x: 80, y: 72, region: "c_right_out" },

  // Inner Cerebrum Nodes
  { x: -28, y: -52, region: "c_left_in" },
  { x: -58, y: -42, region: "c_left_in" },
  { x: -82, y: -22, region: "c_left_in" },
  { x: -98, y: 12, region: "c_left_in" },
  { x: -88, y: 38, region: "c_left_in" },
  { x: -52, y: 28, region: "c_left_in" },
  { x: -28, y: 12, region: "c_left_in" },

  { x: 28, y: -52, region: "c_right_in" },
  { x: 55, y: -42, region: "c_right_in" },
  { x: 82, y: -22, region: "c_right_in" },
  { x: 98, y: 12, region: "c_right_in" },
  { x: 88, y: 38, region: "c_right_in" },
  { x: 52, y: 28, region: "c_right_in" },
  { x: 28, y: 12, region: "c_right_in" },

  // Medial Fissure (Center Line)
  { x: 0, y: -85, region: "fissure" },
  { x: 0, y: -55, region: "fissure" },
  { x: 0, y: -22, region: "fissure" },
  { x: 0, y: 12, region: "fissure" },
  { x: 0, y: 42, region: "fissure" },
];

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState<string[]>(Array(TARGET_NAME.length).fill(''));

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const progressRef = useRef(0);

  // Sync ref with progress
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Loading progress count timer
  useEffect(() => {
    const duration = 2200; // 2.2s for rich visual immersion
    const intervalTime = 25;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 450); // Pause at 100% for transition
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Click Boost: fire massive neural activity and boost progress
  const handleLoaderClick = () => {
    setProgress((prev) => {
      if (prev >= 100) return 100;
      return Math.min(99.5, prev + 8);
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  // Cyber Glitch Text Reveal
  useEffect(() => {
    const resolvedCount = Math.floor((progress / 100) * TARGET_NAME.length);

    const interval = setInterval(() => {
      setDisplayText(
        TARGET_NAME.split("").map((char, idx) => {
          if (idx < resolvedCount || progress >= 100) {
            return char;
          }
          return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
        })
      );
    }, 45);

    return () => clearInterval(interval);
  }, [progress]);

  // Canvas Neural Brain Animation Loop
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

    // Initialize Brain Nodes State
    interface NodeState {
      x: number;
      y: number;
      region: string;
      activation: number; // Node activation brightness (0 to 1)
      neighbors: number[]; // Index array of connected nodes
    }

    const nodes: NodeState[] = BRAIN_NODES.map((node) => ({
      ...node,
      activation: 0,
      neighbors: [],
    }));

    // Connect nodes within distance threshold (nerve pathways)
    const connectThreshold = 75;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // Calculate relative coordinates in actual pixel spacing
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= connectThreshold) {
          nodes[i].neighbors.push(j);
          nodes[j].neighbors.push(i);
        }
      }
    }

    // Signals state (action potential light pulses)
    interface Signal {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
    }

    let activeSignals: Signal[] = [];

    const getSignalColor = (region: string) => {
      if (region === 'cerebellum') return '#10B981'; // Green
      if (region === 'stem') return '#F59E0B'; // Orange
      return '#A855F7'; // Purple / Magenta
    };

    const spawnSignal = (fromIdx: number) => {
      const node = nodes[fromIdx];
      if (node.neighbors.length === 0) return;
      const toIdx = node.neighbors[Math.floor(Math.random() * node.neighbors.length)];

      activeSignals.push({
        fromIdx,
        toIdx,
        progress: 0,
        speed: Math.random() * 0.02 + 0.015,
        color: getSignalColor(node.region),
      });
    };

    // Initialize starting signals
    for (let i = 0; i < 15; i++) {
      spawnSignal(Math.floor(Math.random() * nodes.length));
    }

    let animFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2 - 40; // Shift slightly above center
      const mouse = mouseRef.current;
      const currentProgress = progressRef.current;

      // Draw background glow inside the brain
      const radialGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 180);
      radialGlow.addColorStop(0, `rgba(168, 85, 247, ${0.05 + (currentProgress / 100) * 0.05})`);
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Interactive Mouse Attraction/Stimulation
      if (mouse.x > -500 && mouse.y > -500) {
        nodes.forEach((n, idx) => {
          const nx = cx + n.x;
          const ny = cy + n.y;
          const dx = mouse.x - nx;
          const dy = mouse.y - ny;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 70) {
            // Stimulate node
            n.activation = Math.min(1.0, n.activation + 0.08);
            if (Math.random() < 0.05) {
              spawnSignal(idx);
            }
          }
        });
      }

      // Cap maximum active signals based on loading progress (lights up more as it loads)
      const maxSignals = Math.floor(15 + (currentProgress / 100) * 35);
      if (activeSignals.length < maxSignals && Math.random() < 0.25) {
        spawnSignal(Math.floor(Math.random() * nodes.length));
      }

      // Draw Nerve Pathways (Links)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const fromNode = nodes[i];
        const fromX = cx + fromNode.x;
        const fromY = cy + fromNode.y;

        fromNode.neighbors.forEach((neighborIdx) => {
          // Prevent drawing double lines
          if (neighborIdx > i) {
            const toNode = nodes[neighborIdx];
            const toX = cx + toNode.x;
            const toY = cy + toNode.y;

            // Link brightness is a factor of both nodes' current activation level
            const linkAlpha = 0.06 + Math.max(fromNode.activation, toNode.activation) * 0.15;
            ctx.strokeStyle = `rgba(215, 226, 234, ${linkAlpha})`;
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();
          }
        });
      }

      // Update and Draw Signals
      activeSignals = activeSignals.filter((sig) => {
        sig.progress += sig.speed;

        const fromNode = nodes[sig.fromIdx];
        const toNode = nodes[sig.toIdx];

        const fx = cx + fromNode.x;
        const fy = cy + fromNode.y;
        const tx = cx + toNode.x;
        const ty = cy + toNode.y;

        // Current coordinates of traveling pulse
        const px = fx + (tx - fx) * sig.progress;
        const py = fy + (ty - fy) * sig.progress;

        // Draw pulse glow
        const glowRadius = 4 + (currentProgress / 100) * 2;
        const signalGlow = ctx.createRadialGradient(px, py, 0.5, px, py, glowRadius);
        signalGlow.addColorStop(0, '#FFFFFF');
        signalGlow.addColorStop(0.3, sig.color);
        signalGlow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = signalGlow;
        ctx.beginPath();
        ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        if (sig.progress >= 1) {
          // Node activation flash upon arrival
          toNode.activation = 1.0;

          // Propagate signals (chance to spawn 1 or 2 new branches)
          const branches = Math.random() < 0.4 ? 2 : 1;
          for (let b = 0; b < branches; b++) {
            if (activeSignals.length < maxSignals) {
              spawnSignal(sig.toIdx);
            }
          }
          return false; // remove finished signal
        }
        return true;
      });

      // Update and Draw Brain Nodes
      nodes.forEach((n) => {
        // Slowly decay activation levels
        n.activation = Math.max(0, n.activation - 0.02);

        const nx = cx + n.x;
        const ny = cy + n.y;

        // Dot size pulses with activation level
        const radius = 2.0 + n.activation * 3.5;
        const alpha = 0.2 + n.activation * 0.8;

        // Draw outer pulsing aura
        if (n.activation > 0.05) {
          ctx.fillStyle = `rgba(168, 85, 247, ${n.activation * 0.25})`;
          ctx.beginPath();
          ctx.arc(nx, ny, radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw core node
        ctx.fillStyle = `rgba(215, 226, 234, ${alpha})`;
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleLoaderClick}
      initial={{ opacity: 1 }}
      exit={{
        y: '-100vh',
        opacity: 0,
        transition: {
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1], // Premium exit ease
        },
      }}
      className="fixed inset-0 z-[100] bg-[#0C0C0C] flex flex-col justify-end items-center select-none overflow-hidden pb-16 sm:pb-24 cursor-pointer"
    >
      {/* Canvas Neural Brain Simulation Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Shifting Colorful Ambient Gradients */}
      <div className="absolute top-[20%] left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse pointer-events-none z-0" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-[30%] right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse pointer-events-none z-0" style={{ animationDuration: '7s' }} />

      {/* Bottom Interface Container */}
      <div className="flex flex-col items-center relative z-20 w-full max-w-sm px-8">
        {/* Glitched Name Reveal */}
        <div className="flex justify-center items-center gap-1.5 mb-6">
          {displayText.map((char, index) => (
            <span
              key={index}
              className="text-[#D7E2EA] font-black text-4xl sm:text-5xl tracking-widest font-mono select-none transition-colors duration-300"
              style={{
                textShadow: char === TARGET_NAME[index]
                  ? '0 0 10px rgba(215, 226, 234, 0.25)'
                  : '0 0 8px rgba(168, 85, 247, 0.4)',
                color: char === TARGET_NAME[index] ? '#D7E2EA' : '#A855F7',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Linear Loading Track */}
        <div className="w-full h-[3px] bg-[#D7E2EA]/10 rounded-full overflow-hidden mb-3.5 relative shadow-inner">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #18011F, #B600A8, #7621B0, #BE4C00)',
              boxShadow: '0 0 10px rgba(182, 0, 168, 0.9)',
            }}
          />
        </div>

        {/* Click to boost & percentage indicator */}
        <div className="w-full flex justify-between items-center text-[10px] sm:text-xs tracking-widest text-[#D7E2EA]/40 font-mono uppercase">
          <span className="animate-pulse">CLICK TO STIMULATE SYNAPSES</span>
          <span className="font-bold text-[#D7E2EA]/75">{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};
