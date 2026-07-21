import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [, setShowName] = useState(false);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  // Guarantee video playback on mount
  useEffect(() => {
    const playVideos = () => {
      if (desktopVideoRef.current) {
        desktopVideoRef.current.play().catch(() => {});
      }
      if (mobileVideoRef.current) {
        mobileVideoRef.current.play().catch(() => {});
      }
    };
    playVideos();
  }, []);

  // Sequence: Video -> Reveal "NARUN" text -> Transition to Website
  useEffect(() => {
    // 1. After 1.8s video playback, reveal "NARUN" text
    const textTimer = setTimeout(() => {
      setShowName(true);
    }, 1800);

    // 2. After "NARUN" text is shown (at 3.5s total), complete loading and reveal website
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      onClick={onComplete}
      initial={{ opacity: 1 }}
      exit={{
        y: '-100vh',
        opacity: 0,
        transition: {
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1], // Premium exit ease
        },
      }}
      className="fixed inset-0 z-[100] bg-[#0C0C0C] flex flex-col justify-center items-center select-none overflow-hidden cursor-pointer"
    >
      {/* 16:9 Landscape / Desktop Loading Video */}
      <video
        ref={desktopVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 hidden [@media(min-aspect-ratio:1/1)]:block"
      >
        <source src="/video_loading_16-9.mp4" type="video/mp4" />
      </video>

      {/* 9:16 Portrait / Mobile Loading Video */}
      <video
        ref={mobileVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 block [@media(min-aspect-ratio:1/1)]:hidden"
      >
        <source src="/video_loading_9-16.mp4" type="video/mp4" />
      </video>

      {/* Dark Backdrop Vignette Overlay for Depth & Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-[#0C0C0C]/40 to-[#0C0C0C]/60 z-5 pointer-events-none" />
    </motion.div>
  );
};
