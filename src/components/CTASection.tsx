import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { ContactButton } from './ContactButton';
import { useTheme } from '../context/ThemeContext';

// ─── Preset Topics for Fast Form Completion ────────────────────────────────────
const TOPIC_PRESETS = [
  { label: "💼 Hiring / Project", text: "New Project Inquiry" },
  { label: "🤝 Collaboration", text: "Project Collaboration" },
  { label: "⚡ Freelance", text: "Freelance Work" },
  { label: "🚀 Quick Question", text: "General Inquiry" },
];

// ─── Floating label input ──────────────────────────────────────────────────────
interface FloatingInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  disabled?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label, value, onChange, type = 'text', error, disabled,
}) => {
  const [focused, setFocused] = useState(false);
  const { theme } = useTheme();
  const floating = focused || value.length > 0;
  const isValid = value.trim().length > 0 && !error;

  return (
    <div className="relative mb-6 text-left">
      <motion.label
        animate={floating
          ? { y: -24, x: 0, scale: 0.82, color: theme === 'dark' ? '#E040FB' : '#4338CA' }
          : { y: 12,  x: 16, scale: 1,    color: theme === 'dark' ? '#D7E2EA' : '#1E293B' }
        }
        transition={{ type: 'spring' as const, stiffness: 350, damping: 24 }}
        className="absolute left-0 top-0 text-xs uppercase tracking-wider pointer-events-none origin-left font-black z-20"
      >
        {label}
      </motion.label>

      <div className="relative flex items-center pt-2">
        <motion.input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          animate={focused
            ? { boxShadow: theme === 'dark' ? '0 0 0 2px #B600A8, 0 0 18px rgba(182,0,168,0.35)' : '0 0 0 2px #4338CA, 0 0 18px rgba(67,56,202,0.25)' }
            : { boxShadow: theme === 'dark' ? '0 0 0 1px rgba(255,255,255,0.2)' : '0 0 0 1.5px rgba(15,23,42,0.3)' }
          }
          transition={{ duration: 0.25 }}
          className={`w-full rounded-xl px-4 py-3.5 focus:outline-none transition-colors font-bold text-sm ${
            theme === 'dark' ? 'bg-[#18181A] text-white' : 'bg-white text-slate-950 border border-slate-300'
          } ${error ? 'border-2 border-red-500' : 'border border-transparent'}`}
        />
        {isValid && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3.5 top-5 text-emerald-500 pointer-events-none z-20"
          >
            <CheckCircle2 className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      {/* Bottom glowing gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl overflow-hidden pointer-events-none">
        <motion.div
          className={`w-full h-full ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]'
              : 'bg-gradient-to-r from-[#4338CA] via-[#6D28D9] to-[#C026D3]'
          }`}
          initial={{ scaleX: 0 }}
          animate={focused ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ originX: 0 }}
        />
      </div>
      {error && <span className="text-[11px] text-red-500 font-extrabold mt-1 block pl-1 font-mono">{error}</span>}
    </div>
  );
};

// ─── Floating label textarea ──────────────────────────────────────────────────
interface FloatingTextareaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  error?: string;
  disabled?: boolean;
}

const FloatingTextarea: React.FC<FloatingTextareaProps> = ({
  label, value, onChange, rows = 3, error, disabled,
}) => {
  const [focused, setFocused] = useState(false);
  const { theme } = useTheme();
  const floating = focused || value.length > 0;
  const isValid = value.trim().length > 0 && !error;

  return (
    <div className="relative mb-6 text-left">
      <motion.label
        animate={floating
          ? { y: -24, x: 0, scale: 0.82, color: theme === 'dark' ? '#E040FB' : '#4338CA' }
          : { y: 12,  x: 16, scale: 1,    color: theme === 'dark' ? '#D7E2EA' : '#1E293B' }
        }
        transition={{ type: 'spring' as const, stiffness: 350, damping: 24 }}
        className="absolute left-0 top-0 text-xs uppercase tracking-wider pointer-events-none origin-left font-black z-20"
      >
        {label}
      </motion.label>

      <div className="relative flex items-center pt-2">
        <motion.textarea
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          animate={focused
            ? { boxShadow: theme === 'dark' ? '0 0 0 2px #B600A8, 0 0 18px rgba(182,0,168,0.35)' : '0 0 0 2px #4338CA, 0 0 18px rgba(67,56,202,0.25)' }
            : { boxShadow: theme === 'dark' ? '0 0 0 1px rgba(255,255,255,0.2)' : '0 0 0 1.5px rgba(15,23,42,0.3)' }
          }
          transition={{ duration: 0.25 }}
          className={`w-full rounded-xl px-4 py-3.5 focus:outline-none transition-colors font-bold text-sm resize-none ${
            theme === 'dark' ? 'bg-[#18181A] text-white' : 'bg-white text-slate-950 border border-slate-300'
          } ${error ? 'border-2 border-red-500' : 'border border-transparent'}`}
        />
        {isValid && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3.5 top-5 text-emerald-500 pointer-events-none z-20"
          >
            <CheckCircle2 className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl overflow-hidden pointer-events-none">
        <motion.div
          className={`w-full h-full ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]'
              : 'bg-gradient-to-r from-[#4338CA] via-[#6D28D9] to-[#C026D3]'
          }`}
          initial={{ scaleX: 0 }}
          animate={focused ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ originX: 0 }}
        />
      </div>
      {error && <span className="text-[11px] text-red-500 font-extrabold mt-1 block pl-1 font-mono">{error}</span>}
    </div>
  );
};

// ─── CTA Section Component ────────────────────────────────────────────────────
export const CTASection: React.FC = () => {
  const [showForm, setShowForm]   = useState(false);
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [subject, setSubject]     = useState('');
  const [content, setContent]     = useState('');
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [flying, setFlying]       = useState(false);

  const { theme } = useTheme();
  const cardRef      = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const startPosRef  = useRef({ x: 0, y: 0 });

  const filledFieldsCount = [name, email, subject, content].filter(v => v.trim().length > 0).length;
  const completionPercent = (filledFieldsCount / 4) * 100;

  useEffect(() => {
    const handleOpenForm = () => setShowForm(true);
    window.addEventListener('open-cta-contact', handleOpenForm);
    return () => window.removeEventListener('open-cta-contact', handleOpenForm);
  }, []);

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = -((y - cy) / cy) * 8;
    const rotateY =  ((x - cx) / cx) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleCardMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())    e.name    = 'Name is required';
    if (!email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Email is invalid';
    if (!subject.trim()) e.subject = 'Subject is required';
    if (!content.trim()) e.content = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const msg = `*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${content}`;
    window.open(`https://api.whatsapp.com/send?phone=919043487172&text=${encodeURIComponent(msg)}`, '_blank');

    const rect = submitBtnRef.current?.getBoundingClientRect();
    startPosRef.current = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth / 2, y: window.innerHeight * 0.7 };

    setIsSending(true);
    setFlying(true);
  };

  const finishFlight = useCallback(() => {
    setName(''); setEmail(''); setSubject(''); setContent('');
    setErrors({}); setIsSending(false); setFlying(false); setShowForm(false);
  }, []);

  useEffect(() => {
    if (!flying) return;

    const p0 = { ...startPosRef.current };
    const p1 = { x: p0.x - 80,              y: p0.y + 120 };
    const p2 = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 };
    const p3 = { x: window.innerWidth + 160, y: -200 };

    let t = 0;
    const SPEED = 0.012;

    const tick = () => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      if (!ctx) return;

      cvs.width  = window.innerWidth;
      cvs.height = window.innerHeight;

      ctx.clearRect(0, 0, cvs.width, cvs.height);

      const bx = (1-t)**3*p0.x + 3*(1-t)**2*t*p1.x + 3*(1-t)*t**2*p2.x + t**3*p3.x;
      const by = (1-t)**3*p0.y + 3*(1-t)**2*t*p1.y + 3*(1-t)*t**2*p2.y + t**3*p3.y;

      ctx.save();
      ctx.translate(bx, by);
      ctx.scale(1.2, 1.2);
      ctx.fillStyle   = theme === 'dark' ? '#B600A8' : '#4338CA';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(-14, -10);
      ctx.lineTo(-6, 0);
      ctx.lineTo(-14, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      t += SPEED;
      if (t <= 1) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        finishFlight();
      }
    };

    const animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [flying, finishFlight, theme]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 30 },
    visible: { opacity: 1, scale: 1,    y: 0,  transition: { type: 'spring' as const, stiffness: 260, damping: 22 } },
    exit:    { opacity: 0, scale: 0.88, y: 30, transition: { duration: 0.22 } },
  };

  return (
    <section
      id="cta"
      className={`w-full min-h-[75vh] flex flex-col justify-center items-center py-24 sm:py-32 md:py-40 px-5 relative z-30 select-none overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#0C0C0C] text-[#D7E2EA]' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      <div className="max-w-4xl w-full flex flex-col items-center text-center">

        {/* Heading */}
        <motion.div layout="position" transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center">
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-center"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            Let&apos;s build something incredible
          </h2>

          <AnimatePresence>
            {!showForm && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`font-light max-w-xl mt-6 text-center overflow-hidden ${
                  theme === 'dark' ? 'text-[#D7E2EA]/80' : 'text-slate-800 font-bold'
                }`}
                style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.25rem)' }}
              >
                Open to collaborations, hackathons, freelance projects, and full-time opportunities.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Form / Button toggle */}
        <div className="mt-10 sm:mt-12 w-full flex justify-center">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="btn"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.28 }}
              >
                <ContactButton onClick={() => setShowForm(true)} />
              </motion.div>
            ) : (
              /* ── Contact Card ─────────────────────────────────────────────── */
              <motion.div
                key="form-card"
                variants={cardVariants}
                initial="hidden" animate="visible" exit="exit"
                className="relative p-[1.5px] rounded-2xl overflow-hidden w-full max-w-[500px]"
              >
                {/* Rotating gradient border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
                  className="absolute -inset-10 pointer-events-none"
                  style={{
                    background: theme === 'dark'
                      ? 'conic-gradient(from 0deg, #B600A8, #7621B0, #BE4C00, #B600A8)'
                      : 'conic-gradient(from 0deg, #4338CA, #6D28D9, #C026D3, #4338CA)',
                    opacity: 0.85, filter: 'blur(2px)',
                  }}
                />

                {/* Card body */}
                <div
                  ref={cardRef}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className={`relative rounded-2xl p-6 sm:p-8 z-10 overflow-hidden transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-b from-[#141414] to-[#0A0A0A]'
                      : 'bg-white shadow-2xl border-2 border-indigo-600/20'
                  }`}
                  style={{
                    boxShadow: theme === 'dark'
                      ? '0 24px 48px rgba(0,0,0,0.75), inset 0 0 20px rgba(182,0,168,0.07)'
                      : '0 24px 48px rgba(15,23,42,0.18), inset 0 0 20px rgba(67,56,202,0.05)',
                    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Form Completion Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200/20 overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]'
                          : 'bg-gradient-to-r from-[#4338CA] via-[#6D28D9] to-[#C026D3]'
                      }`}
                      animate={{ width: `${completionPercent}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className={`absolute top-4 right-4 p-1.5 rounded-full transition-all duration-200 z-20 ${
                      theme === 'dark'
                        ? 'text-[#D7E2EA]/50 hover:text-white hover:bg-white/10'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-bold'
                    }`}
                    aria-label="Close form"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-black uppercase tracking-wide text-left flex items-center gap-2 ${
                      theme === 'dark' ? 'text-[#D7E2EA]' : 'text-slate-950'
                    }`}>
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      Send a Message
                    </h3>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-600 font-black">
                      {filledFieldsCount}/4 Fields Ready
                    </span>
                  </div>

                  {/* Quick Preset Topic Selectors for Maximum User Efficiency */}
                  <div className="mb-5 flex flex-wrap gap-2 text-left">
                    <span className={`w-full text-[11px] uppercase tracking-widest font-black font-mono mb-1 block ${
                      theme === 'dark' ? 'text-purple-400' : 'text-indigo-800'
                    }`}>
                      Quick Topics (Click to pre-fill subject):
                    </span>
                    {TOPIC_PRESETS.map((preset, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setSubject(preset.text)}
                        className={`text-xs px-3 py-1.5 rounded-full font-extrabold transition-all duration-200 border ${
                          subject === preset.text
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : theme === 'dark'
                              ? 'bg-[#1C1C1F] text-[#D7E2EA] border-white/15 hover:border-purple-400'
                              : 'bg-slate-100 text-slate-900 border-slate-300 hover:border-indigo-600 hover:bg-indigo-50'
                        }`}
                      >
                        {preset.label}
                      </motion.button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="mt-2">
                    <FloatingInput label="Your Name"  value={name}    onChange={setName}    error={errors.name}    disabled={isSending} />
                    <FloatingInput label="Your Email" value={email}   onChange={setEmail}   type="email" error={errors.email} disabled={isSending} />
                    <FloatingInput label="Subject"    value={subject} onChange={setSubject} error={errors.subject} disabled={isSending} />
                    <FloatingTextarea label="Message" value={content} onChange={setContent} error={errors.content} disabled={isSending} rows={3} />

                    <motion.button
                      ref={submitBtnRef}
                      type="submit"
                      disabled={isSending}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full mt-2 py-3.5 px-6 rounded-full text-white font-black uppercase tracking-widest text-xs sm:text-sm transition-all duration-200 shadow-lg relative overflow-hidden flex justify-center items-center gap-2"
                      style={{
                        background: theme === 'dark'
                          ? 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)'
                          : 'linear-gradient(123deg, #312E81 0%, #4338CA 40%, #6D28D9 75%, #A855F7 100%)',
                        boxShadow: theme === 'dark'
                          ? '0 4px 20px rgba(182,0,168,0.35)'
                          : '0 4px 20px rgba(67,56,202,0.35)',
                        outline: theme === 'dark' ? '2px solid white' : '2px solid #0F172A',
                        outlineOffset: '-3px',
                      }}
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSending ? 'Launching...' : 'Send Message'}</span>
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Flight Canvas Overlay */}
      {flying && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50"
        />
      )}
    </section>
  );
};
