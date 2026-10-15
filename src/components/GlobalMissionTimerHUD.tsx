import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { soundFx } from '../lib/audio';
import { Clock, CheckCircle2, Shield, RotateCcw } from 'lucide-react';

export const GlobalMissionTimerHUD: React.FC = () => {
  const { 
    gameState,
    teamId, 
    remainingTime, 
    decrementRemainingTime, 
    isTimerRunning, 
    isGameFinished,
    stampedTimeTakenSeconds,
    resetMissionToStart
  } = useStore();

  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  // Active countdown timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && !isGameFinished) {
      interval = setInterval(() => {
        decrementRemainingTime();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isGameFinished, decrementRemainingTime]);

  // Don't render during boot, initial login, or before admin authorization code
  if (gameState === 'BOOT' || gameState === 'AUTHENTICATION' || gameState === 'ADMIN_START_GATE') {
    return null;
  }

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalAllowed = 12 * 60; // 720 seconds
  const currentElapsed = isGameFinished && stampedTimeTakenSeconds
    ? stampedTimeTakenSeconds
    : Math.max(0, totalAllowed - remainingTime);

  const formatElapsed = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}m ${s}s`;
  };

  const isUrgent = remainingTime < 120 && !isGameFinished;

  const stageLabel = isGameFinished 
    ? 'FINAL RECOVERY COMPLETE'
    : gameState === 'CRASH_SEQUENCE'
    ? 'CRASH IMPACT SEQUENCE'
    : gameState === 'MISSION_START'
    ? 'TACTICAL RADAR SWEEP'
    : gameState === 'COCKPIT_SIMULATOR'
    ? 'COCKPIT PSEUDOCODE RECOVERY'
    : 'USER MANUAL & AUDIO DECRYPTION';

  const handleRestartMission = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      soundFx.playClick(900);
      setTimeout(() => setConfirmReset(false), 4000);
    } else {
      soundFx.playClick(1000);
      resetMissionToStart();
      setConfirmReset(false);
    }
  };

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 pointer-events-auto font-mono select-none">
      <div className={`flex items-center gap-2.5 sm:gap-5 px-3.5 sm:px-5 py-2 rounded-2xl border-2 backdrop-blur-xl shadow-2xl transition-all ${
        isGameFinished
          ? 'bg-emerald-950/90 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.7)] text-emerald-300'
          : isUrgent
          ? 'bg-red-950/90 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.8)] text-red-400 animate-pulse'
          : 'bg-[#0f172a]/95 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.4)] text-white'
      }`}>
        {/* Team Identification */}
        <div className="flex items-center gap-2 border-r border-gray-700 pr-2.5 sm:pr-4">
          <Shield size={16} className={isGameFinished ? 'text-emerald-400' : 'text-cyan-400'} />
          <div>
            <div className="text-[9px] text-gray-400 tracking-wider">TEAM</div>
            <div className="text-xs sm:text-sm font-bold tracking-widest text-white">
              {teamId || 'TEAM-001'}
            </div>
          </div>
        </div>

        {/* Global 12-Minute Countdown Timer */}
        <div className="flex items-center gap-2.5">
          <Clock size={18} className={isGameFinished ? 'text-emerald-400' : isUrgent ? 'text-red-400 animate-spin' : 'text-cyan-400'} />
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-gray-400 tracking-widest font-bold">
              {isGameFinished ? 'FINAL TIME STAMP' : 'MISSION TIMER'}
            </span>
            <span className={`text-xl sm:text-2xl font-bold tracking-widest leading-none drop-shadow-[0_0_10px_currentColor] ${
              isGameFinished ? 'text-emerald-400' : isUrgent ? 'text-red-500' : 'text-yellow-300'
            }`}>
              {isGameFinished ? formatElapsed(currentElapsed) : `T-${formatCountdown(remainingTime)}`}
            </span>
          </div>
        </div>

        {/* Elapsed Time & Stage */}
        <div className="hidden md:flex flex-col border-l border-gray-700 pl-4">
          <span className="text-[9px] text-gray-400 tracking-wider">
            {isGameFinished ? 'STATUS' : `ELAPSED: ${formatElapsed(currentElapsed)}`}
          </span>
          <span className="text-[11px] font-bold text-cyan-300 tracking-wider flex items-center gap-1.5">
            {isGameFinished && <CheckCircle2 size={13} className="text-emerald-400" />}
            <span>{stageLabel}</span>
          </span>
        </div>

        {/* RESTART MISSION BUTTON */}
        <div className="border-l border-gray-700 pl-2.5 sm:pl-3">
          <button
            onClick={handleRestartMission}
            title="Reset mission back to login page"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all shadow ${
              confirmReset
                ? 'bg-red-600 hover:bg-red-500 border-red-300 text-white animate-pulse'
                : 'bg-black/60 hover:bg-red-950/80 border-red-500/50 text-red-300 hover:border-red-400'
            }`}
          >
            <RotateCcw size={12} className={confirmReset ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">
              {confirmReset ? 'CLICK TO CONFIRM' : 'START FROM STARTING'}
            </span>
            <span className="sm:hidden">
              {confirmReset ? 'CONFIRM' : 'RESTART'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalMissionTimerHUD;
