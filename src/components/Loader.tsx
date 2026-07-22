import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Keep latest onComplete callback ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Safe execution of onComplete - called at most ONCE
  const handleComplete = useCallback(() => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onCompleteRef.current();
    }
  }, []);

  // Guarantee video playback & handle autoplay block or fail
  useEffect(() => {
    const playVideo = (ref: React.RefObject<HTMLVideoElement | null>) => {
      if (ref.current) {
        const promise = ref.current.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay blocked by browser or failed - fallback after brief delay
            setTimeout(handleComplete, 1500);
          });
        }
      }
    };

    playVideo(desktopVideoRef);
    playVideo(mobileVideoRef);
  }, [handleComplete]);

  // Safety fallback timer: guarantee dismissal within max 3 seconds regardless of video state
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 3000);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [handleComplete]);

  return (
    <motion.div
      onClick={handleComplete}
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
        muted
        playsInline
        preload="auto"
        onEnded={handleComplete}
        onError={handleComplete}
        className="absolute inset-0 w-full h-full object-cover z-0 hidden [@media(min-aspect-ratio:1/1)]:block"
      >
        <source src="/video_loading_16-9.mp4" type="video/mp4" />
      </video>

      {/* 9:16 Portrait / Mobile Loading Video */}
      <video
        ref={mobileVideoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleComplete}
        onError={handleComplete}
        className="absolute inset-0 w-full h-full object-cover z-0 block [@media(min-aspect-ratio:1/1)]:hidden"
      >
        <source src="/video_loading_9-16.mp4" type="video/mp4" />
      </video>

      {/* Dark Backdrop Vignette Overlay for Depth & Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-[#0C0C0C]/40 to-[#0C0C0C]/60 z-5 pointer-events-none" />

      {/* Subtle Skip Hint */}
      <div className="absolute bottom-8 z-10 pointer-events-none text-white/40 text-xs tracking-widest uppercase font-mono animate-pulse">
        Click anywhere to skip
      </div>
    </motion.div>
  );
};
