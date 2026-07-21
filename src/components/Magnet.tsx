import React, { useState, useRef, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  padding?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 3,
  padding = 150,
  activeTransition = "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)",
  inactiveTransition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
  className = ""
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState(inactiveTransition);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // The prompt says: "Activates when cursor is within padding distance of element edge."
      // We check if the cursor is within the element bounding box expanded by the padding.
      const limitX = rect.width / 2 + padding;
      const limitY = rect.height / 2 + padding;

      if (Math.abs(distanceX) < limitX && Math.abs(distanceY) < limitY) {
        setTransition(activeTransition);
        // Translate is distance divided by strength
        const x = distanceX / strength;
        const y = distanceY / strength;
        setPosition({ x, y });
      } else {
        setTransition(inactiveTransition);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength, padding, activeTransition, inactiveTransition]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: transition,
        willChange: 'transform'
      }}
      className={className}
    >
      {children}
    </div>
  );
};
