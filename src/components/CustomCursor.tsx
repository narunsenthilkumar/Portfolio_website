import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchMobile, setIsTouchMobile] = useState(false);

  useEffect(() => {
    const checkTouchMobile = () => {
      const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setIsTouchMobile(isMobile);
    };
    checkTouchMobile();
    window.addEventListener('resize', checkTouchMobile);
    return () => window.removeEventListener('resize', checkTouchMobile);
  }, []);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing effect for the outer ring
  const springConfig = { damping: 30, stiffness: 240, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Position adjustments to center the shapes on the cursor tip
  const dotX = useTransform(mouseX, (val) => val - 4);
  const dotY = useTransform(mouseY, (val) => val - 4);
  const ringX = useTransform(springX, (val) => val - 18);
  const ringY = useTransform(springY, (val) => val - 18);

  useEffect(() => {
    if (isTouchMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isTouchMobile]);

  useEffect(() => {
    if (isTouchMobile) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isIframe = target.tagName === 'IFRAME' || target.closest('iframe');
      if (isIframe) {
        setIsVisible(false);
        return;
      }

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchMobile]);

  // Hide default cursor ONLY when custom cursor is actively visible on desktop pointer
  useEffect(() => {
    if (!isVisible || isTouchMobile) return;

    const style = document.createElement('style');
    style.id = 'hide-default-cursor';
    style.innerHTML = `
      @media (pointer: fine) {
        *, *::before, *::after {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById('hide-default-cursor');
      if (el) el.remove();
    };
  }, [isVisible, isTouchMobile]);

  if (!isVisible || isTouchMobile) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? "#B600A8" : "#D7E2EA",
          width: '36px',
          height: '36px',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          mixBlendMode: 'difference',
          transition: 'scale 0.2s ease, border-color 0.2s ease'
        }}
      />
      
      {/* Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          scale: isHovered ? 0.6 : 1,
          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          transition: 'scale 0.2s ease'
        }}
      />
    </>
  );
};
