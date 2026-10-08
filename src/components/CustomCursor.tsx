import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, input, a, [role="button"]')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference flex items-center justify-center text-primary font-mono text-[10px]"
      animate={{
        x: position.x - (hovered ? 24 : 8),
        y: position.y - (hovered ? 24 : 8),
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      {hovered ? (
        <div className="relative w-12 h-12 flex items-center justify-center border border-primary/50 rounded-full animate-spin-slow">
          <div className="absolute top-0 w-[2px] h-2 bg-primary"></div>
          <div className="absolute bottom-0 w-[2px] h-2 bg-primary"></div>
          <div className="absolute left-0 w-2 h-[2px] bg-primary"></div>
          <div className="absolute right-0 w-2 h-[2px] bg-primary"></div>
          <div className="w-1 h-1 bg-primary rounded-full"></div>
          <div className="absolute -bottom-6 text-primary tracking-widest text-[8px] whitespace-nowrap">
            TARGET
          </div>
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full border border-primary/50 flex items-center justify-center">
          <div className="w-1 h-1 bg-primary rounded-full"></div>
        </div>
      )}
    </motion.div>
  );
};

export default CustomCursor;
