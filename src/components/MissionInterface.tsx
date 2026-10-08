import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

const MissionInterface: React.FC = () => {
  const { teamId, remainingTime, setRemainingTime, setGameState } = useStore();

  useEffect(() => {
    if (remainingTime <= 0) {
      setGameState('MISSION_EXPIRED');
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, setRemainingTime, setGameState]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isUrgent = remainingTime < 120;

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col font-mono text-white pointer-events-auto">
      {/* HUD Header with Timer at the top center */}
      <div className="w-full flex justify-between items-start p-6 border-b border-primary/20 bg-black/60 backdrop-blur z-20">
        <div className="flex flex-col w-1/3">
          <span className="text-xs text-gray-400 tracking-[0.2em] mb-1">TEAM IDENTIFICATION</span>
          <span className="text-2xl tracking-[0.3em] font-bold text-primary">{teamId || 'UNKNOWN'}</span>
        </div>
        
        <div className="flex flex-col items-center justify-start w-1/3 text-center">
          <span className="text-xs tracking-[0.3em] mb-2 text-gray-400">MISSION TIME REMAINING</span>
          <span className={`text-6xl md:text-7xl font-bold tracking-widest leading-none ${isUrgent ? 'text-red-500' : 'text-white'}`}>
            T-{formatTime(remainingTime)}
          </span>
        </div>

        <div className="flex flex-col items-end w-1/3">
          <span className="text-xs text-gray-400 tracking-[0.2em] mb-1">STATUS</span>
          <span className="flex items-center gap-3 tracking-[0.3em] text-sm font-bold text-primary">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            SIGNAL ACTIVE
          </span>
        </div>
      </div>

      {/* Main Area */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center pointer-events-none z-10">
        
        {/* HUD Overlays */}
        <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
          <div className="bg-black/80 border border-primary/30 p-6 pointer-events-auto w-96 shadow-2xl">
            <h3 className="text-lg border-b border-primary/30 pb-3 mb-4 tracking-[0.2em] font-bold text-primary">CRASH SITE DATA</h3>
            <ul className="text-sm space-y-4 text-gray-300 tracking-[0.2em]">
              <li className="flex justify-between"><span>LATITUDE:</span> <span className="font-bold text-white">47.6062° N</span></li>
              <li className="flex justify-between"><span>LONGITUDE:</span> <span className="font-bold text-white">122.3321° W</span></li>
              <li className="flex justify-between"><span>ELEVATION:</span> <span className="font-bold text-white">14 M</span></li>
              <li className="text-white mt-6 pt-4 border-t border-primary/20 flex items-center gap-4 text-base font-bold">
                <span className="text-primary">[●]</span> FREQ 121.5 MHz
              </li>
            </ul>
          </div>
          
          <div className="text-right text-gray-500 tracking-[0.3em] text-[11px] flex flex-col gap-3 font-bold">
            <span>SYS.VER: 1.0.4</span>
            <span>UPLINK: STABLE</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionInterface;
