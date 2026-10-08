import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

const CrashSequence: React.FC = () => {
  const setGameState = useStore((state) => state.setGameState);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = [
      { delay: 500, phase: 1 }, // Warning
      { delay: 2000, phase: 2 }, // Critical
      { delay: 3500, phase: 3 }, // Signal Lost
      { delay: 5000, phase: 4 }, // Black Box Acquired
      { delay: 7000, phase: 5 }, // To Mission
    ];

    const timeouts = sequence.map((s) =>
      setTimeout(() => {
        setPhase(s.phase);
        if (s.phase === 5) {
          setGameState('MISSION_START');
        }
      }, s.delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [setGameState]);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center font-mono z-50 pointer-events-none">
      {phase === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-2xl tracking-[0.2em] font-bold bg-black/80 px-8 py-4 rounded-sm">
          ACCESS GRANTED
        </motion.div>
      )}
      {phase === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-red-500 text-3xl md:text-5xl font-bold bg-black/90 px-12 py-6 border-l-4 border-red-500"
        >
          FLIGHT PATH DEVIATION
        </motion.div>
      )}
      {phase === 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-white text-4xl md:text-6xl font-bold flex flex-col items-center bg-black/95 px-16 py-10 border-t-2 border-b-2 border-red-500"
        >
          <span className="text-red-500">ENGINE STATUS: CRITICAL</span>
          <span className="text-xl md:text-3xl mt-4 text-gray-300 tracking-[0.2em]">ALTITUDE: RAPID DESCENT</span>
        </motion.div>
      )}
      {phase === 3 && (
        <motion.div 
          className="w-full h-full flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white tracking-[0.3em] text-4xl md:text-6xl font-bold"
          >
            SIGNAL LOST
          </motion.span>
        </motion.div>
      )}
      {phase === 4 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-primary tracking-[0.2em] text-2xl md:text-4xl flex flex-col items-center gap-6 bg-black/90 px-16 py-10 border border-primary/30"
        >
          <div className="w-4 h-4 bg-primary rounded-full"></div>
          BLACK BOX SIGNAL ACQUIRED
        </motion.div>
      )}
    </div>
  );
};

export default CrashSequence;
