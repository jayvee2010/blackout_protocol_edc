import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { soundFx } from '../lib/audio';
import CockpitWorld from './3d/CockpitWorld';
import CrashPseudocodeChallenges from './CrashPseudocodeChallenges';
import { 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Compass, 
  RotateCcw,
  Power,
  ChevronDown,
  ChevronUp,
  FileText,
  Trophy
} from 'lucide-react';

export const AirplaneCockpitSimulator: React.FC = () => {
  const { 
    setGameState, 
    soundEnabled, 
    toggleSound, 
    cockpitPitch, 
    cockpitRoll, 
    setCockpitAttitude,
    solvedChallenges,
    setIsLeaderboardOpen
  } = useStore();

  // Cockpit switchboard state
  const [masterCaution, setMasterCaution] = useState<boolean>(true);
  const [apuRunning, setApuRunning] = useState<boolean>(true);
  const [hydraulicsOn, setHydraulicsOn] = useState<boolean>(true);
  const [deIceActive, setDeIceActive] = useState<boolean>(false);
  const [pitotHeat, setPitotHeat] = useState<boolean>(true);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState<boolean>(true);

  // Flight instruments readouts
  const [airspeed] = useState<number>(145);
  const [altitude] = useState<number>(18200);
  const [heading, setHeading] = useState<number>(242);

  // Periodic alarm if master caution is active
  useEffect(() => {
    if (!masterCaution || !soundEnabled) return;
    const interval = setInterval(() => {
      soundFx.playAlarm();
    }, 4500);
    return () => clearInterval(interval);
  }, [masterCaution, soundEnabled]);

  // Mouse steering / yoke interaction
  const handleCockpitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const newPitch = Math.round(y * 24);
    const newRoll = Math.round(x * 30);
    setCockpitAttitude(newPitch, newRoll);
    setHeading((prev) => (prev + Math.round(newRoll * 0.05) + 360) % 360);
  };

  const handleYokeReset = () => {
    soundFx.playClick();
    setCockpitAttitude(0, 0);
  };

  const allChallengesSolved = solvedChallenges.includes(1) && solvedChallenges.includes(2) && solvedChallenges.includes(3);

  return (
    <div 
      onMouseMove={handleCockpitMouseMove}
      className="relative w-screen h-screen overflow-hidden bg-[#091124] text-white font-mono select-none"
    >
      {/* 3D COCKPIT ENVIRONMENT BACKGROUND */}
      <CockpitWorld />

      {/* TOP OVERHEAD PANEL / TACTICAL COCKPIT CONTROLS */}
      <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-3 md:p-5 pt-16 md:pt-16 bg-[#0a1124]/90 backdrop-blur-md border-b-2 border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.35)]">
        
        {/* Left: Mission & Flight ID */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              soundFx.playClick();
              setGameState('MISSION_START');
            }}
            className="flex items-center gap-2 px-3.5 py-2 bg-red-950/90 hover:bg-red-900 border-2 border-red-500 rounded-lg text-red-300 text-xs font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          >
            <Compass size={16} />
            <span className="hidden sm:inline">EXIT TO RADAR</span>
          </button>

          <div>
            <div className="text-xs md:text-sm font-bold text-red-300 tracking-widest flex items-center gap-2">
              <span>FLIGHT AI-804</span>
              <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded">
                SIMULATOR
              </span>
            </div>
            <div className="text-[10px] text-gray-300 tracking-wider hidden sm:block">
              EMERGENCY DESCENT // COCKPIT SYSTEM DIAGNOSTICS
            </div>
          </div>
        </div>

        {/* Center: Flashing Master Caution Warning Light */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              setMasterCaution(!masterCaution);
            }}
            className={`px-4 py-2.5 rounded-lg border-2 font-bold text-xs md:text-sm tracking-widest flex items-center gap-2 transition-all ${
              masterCaution
                ? 'bg-red-600 text-white border-red-300 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.95)]'
                : 'bg-red-950/60 text-red-300/70 border-red-900'
            }`}
          >
            <AlertTriangle size={18} className={masterCaution ? 'animate-bounce' : ''} />
            <span>MASTER CAUTION</span>
            <span className="text-[10px] hidden md:inline">{masterCaution ? '[ACTIVE - CLICK SILENCE]' : '[SILENCED]'}</span>
          </button>
        </div>

        {/* Right: Audio & Manual Vault Direct Access */}
        <div className="flex items-center gap-3">
          {allChallengesSolved && (
            <button
              onClick={() => {
                soundFx.playSuccess();
                setGameState('MANUAL_DOCUMENT');
              }}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider rounded-lg border border-emerald-200 shadow-[0_0_20px_#10b981] flex items-center gap-2 transition-all animate-pulse"
            >
              <FileText size={16} />
              <span>USER MANUAL [UNLOCKED]</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              setIsLeaderboardOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500 border border-yellow-400 text-yellow-300 hover:text-black rounded-lg text-xs font-bold transition-all shadow"
          >
            <Trophy size={16} />
            <span className="hidden sm:inline">LEADERBOARD</span>
          </button>

          <button
            onClick={() => {
              toggleSound();
              soundFx.playClick();
            }}
            className="flex items-center gap-1.5 px-3 py-2 border border-red-500/50 bg-black/70 text-red-300 hover:bg-red-950/80 rounded-lg text-xs font-bold"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="hidden sm:inline">{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
          </button>
        </div>
      </div>

      {/* LEFT GLASSHOUSE INSTRUMENT: PRIMARY FLIGHT DISPLAY (PFD) */}
      <div className="absolute left-4 top-20 z-10 hidden lg:flex flex-col bg-[#0a1124]/90 border-2 border-cyan-400 rounded-2xl p-3.5 w-60 shadow-[0_0_30px_rgba(6,182,212,0.35)] backdrop-blur-md">
        <div className="flex justify-between items-center border-b border-cyan-500/40 pb-1.5 mb-2 text-xs text-cyan-300 font-bold">
          <span>PFD // ATTITUDE HORIZON</span>
          <span>NAV-1</span>
        </div>

        {/* Artificial Horizon Box */}
        <div className="relative w-full h-36 bg-[#041a30] rounded-xl overflow-hidden border border-cyan-400/50 flex items-center justify-center shadow-inner">
          <div 
            className="absolute inset-[-40px] transition-transform duration-100 pointer-events-none"
            style={{
              transform: `rotate(${-cockpitRoll}deg) translateY(${cockpitPitch * 2}px)`,
              background: 'linear-gradient(to bottom, #2563eb 50%, #78350f 50%)',
            }}
          >
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_#ffffff]" />
            <div className="absolute top-[35%] left-1/4 w-1/2 h-[1px] bg-white/80 text-[8px] text-center text-white">+10°</div>
            <div className="absolute top-[65%] left-1/4 w-1/2 h-[1px] bg-white/80 text-[8px] text-center text-white">-10°</div>
          </div>

          <div className="relative z-10 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-[3px] bg-yellow-400 shadow-[0_0_10px_#facc15]" />
            <div className="w-3 h-3 rounded-full border-2 border-yellow-400 mx-1" />
            <div className="w-8 h-[3px] bg-yellow-400 shadow-[0_0_10px_#facc15]" />
          </div>
        </div>

        {/* Readouts Tape */}
        <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-center text-[10px]">
          <div className="bg-black/70 border border-gray-700 p-1 rounded-lg">
            <div className="text-gray-300 text-[9px] font-bold">AIRSPEED</div>
            <div className="font-bold text-cyan-300 text-xs">{airspeed} KT</div>
          </div>
          <div className="bg-black/70 border border-gray-700 p-1 rounded-lg">
            <div className="text-gray-300 text-[9px] font-bold">ALTITUDE</div>
            <div className="font-bold text-cyan-300 text-xs">{(altitude / 1000).toFixed(1)}k FT</div>
          </div>
          <div className="bg-black/70 border border-gray-700 p-1 rounded-lg">
            <div className="text-gray-300 text-[9px] font-bold">HEADING</div>
            <div className="font-bold text-cyan-300 text-xs">{heading}°</div>
          </div>
        </div>

        <button
          onClick={handleYokeReset}
          className="mt-2.5 text-[10px] flex items-center justify-center gap-1.5 py-1.5 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-400/50 rounded-lg text-cyan-300 font-bold transition-colors"
        >
          <RotateCcw size={12} />
          <span>LEVEL ATTITUDE (RESET YOKE)</span>
        </button>
      </div>

      {/* RIGHT PEDESTAL PANEL: PHYSICAL SWITCHBOARD */}
      <div className="absolute right-4 top-20 z-10 hidden xl:flex flex-col bg-[#0a1124]/90 border-2 border-emerald-400 rounded-2xl p-3.5 w-60 shadow-[0_0_30px_rgba(16,185,129,0.35)] backdrop-blur-md space-y-2.5">
        <div className="flex justify-between items-center border-b border-emerald-500/40 pb-1.5 text-xs text-emerald-300 font-bold">
          <span>COCKPIT OVERHEAD SWITCHES</span>
          <Power size={14} />
        </div>

        {/* Switch 1: APU */}
        <div className="bg-black/70 border border-gray-700 p-2.5 rounded-xl flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-gray-200">APU GEN:</div>
            <div className="text-[9px] text-gray-400 font-mono">AUX POWER</div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              setApuRunning(!apuRunning);
            }}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors ${apuRunning ? 'bg-emerald-500' : 'bg-gray-700'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${apuRunning ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Switch 2: Hydraulics */}
        <div className="bg-black/70 border border-gray-700 p-2.5 rounded-xl flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-gray-200">HYD PUMPS:</div>
            <div className="text-[9px] text-gray-400 font-mono">SYS A & B</div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              setHydraulicsOn(!hydraulicsOn);
            }}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors ${hydraulicsOn ? 'bg-emerald-500' : 'bg-gray-700'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${hydraulicsOn ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Switch 3: Wing De-Ice */}
        <div className="bg-black/70 border border-gray-700 p-2.5 rounded-xl flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-gray-200">WING DE-ICE:</div>
            <div className="text-[9px] text-gray-400 font-mono">ANTI-ICE</div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              setDeIceActive(!deIceActive);
            }}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors ${deIceActive ? 'bg-emerald-500' : 'bg-gray-700'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${deIceActive ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Switch 4: Pitot Heat */}
        <div className="bg-black/70 border border-gray-700 p-2.5 rounded-xl flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-gray-200">PITOT HEAT:</div>
            <div className="text-[9px] text-gray-400 font-mono">SPEED PROBE</div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              setPitotHeat(!pitotHeat);
            }}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors ${pitotHeat ? 'bg-emerald-500' : 'bg-gray-700'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${pitotHeat ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* CENTER-PLACED & MUCH BIGGER CRASH PSEUDOCODE SIMULATION BOX */}
      <div className="absolute inset-0 z-30 flex items-center justify-center p-4 md:p-8 pointer-events-none overflow-y-auto">
        <AnimatePresence>
          {diagnosticsOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto w-full flex flex-col items-center justify-center my-auto"
            >
              <div className="w-full max-w-5xl flex justify-end mb-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setDiagnosticsOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-gray-900 border border-red-500/70 rounded-lg text-red-300 font-bold text-xs tracking-wider transition-all shadow"
                >
                  <ChevronDown size={15} />
                  <span>MINIMIZE DIAGNOSTICS</span>
                </button>
              </div>

              <CrashPseudocodeChallenges
                onAllCompleted={() => {
                  setGameState('MANUAL_DOCUMENT');
                }}
              />
            </motion.div>
          ) : (
            <div className="pointer-events-auto absolute bottom-8">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setDiagnosticsOpen(true);
                }}
                className="flex items-center gap-2.5 px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-widest rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.8)] transition-all animate-bounce"
              >
                <ChevronUp size={20} />
                <span>OPEN CRASH PSEUDOCODE DIAGNOSTICS</span>
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM STEERING HINT */}
      <div className="absolute bottom-2 left-6 z-10 text-xs text-gray-300 tracking-wider pointer-events-none hidden sm:block bg-black/60 px-3 py-1 rounded border border-gray-700">
        [ MOVE MOUSE TO STEER FLIGHT COLUMN & YOKE // COMPLETE 3 PSEUDOCODE MODULES TO UNLOCK MANUAL ]
      </div>
    </div>
  );
};

export default AirplaneCockpitSimulator;
