import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

const messages = [
  "RECOVERY NETWORK INITIALIZING...",
  "SIGNAL DETECTED",
  "FLIGHT DATA CORRUPTED",
  "BLACK BOX SIGNAL: ACTIVE",
  "CRASH SITE: UNKNOWN",
];

const BootSequence: React.FC = () => {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const setGameState = useStore((state) => state.setGameState);

  useEffect(() => {
    if (currentMsgIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMsgIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowTitle(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentMsgIndex]);

  useEffect(() => {
    if (showTitle) {
      const timer = setTimeout(() => {
        setGameState('AUTHENTICATION');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showTitle, setGameState]);

  return (
    <div className="flex flex-col items-start justify-center w-full max-w-5xl px-8 font-mono">
      {!showTitle ? (
        <div className="space-y-4 text-primary opacity-80 text-xl md:text-3xl tracking-widest">
          {messages.slice(0, currentMsgIndex + 1).map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {'> '} {msg}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-4 h-8 bg-primary ml-2 translate-y-2"
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center w-full text-center space-y-8"
        >
          <h1 className="text-[6rem] md:text-[10rem] leading-none font-display font-bold tracking-[0.1em] text-textMain drop-shadow-[0_0_20px_rgba(124,255,91,0.4)]">
            MISSION AI:<br/>IMPOSSIBLE
          </h1>
          <h2 className="text-2xl md:text-4xl font-mono tracking-[0.3em] text-primary">
            BLACK BOX RECOVERY PROTOCOL
          </h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-16 text-xl tracking-[0.4em] text-red-500 bg-red-500/10 px-8 py-4 border border-red-500/30 rounded"
          >
            AUTHENTICATION REQUIRED
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BootSequence;
