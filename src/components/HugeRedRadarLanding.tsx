import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { soundFx } from '../lib/audio';
import { 
  Volume2, 
  VolumeX, 
  Crosshair, 
  AlertTriangle, 
  ChevronRight, 
  Zap
} from 'lucide-react';

export const HugeRedRadarLanding: React.FC = () => {
  const { 
    setGameState, 
    soundEnabled, 
    toggleSound 
  } = useStore();

  const [rangeNM, setRangeNM] = useState<number>(30);
  const [sweepSpeed, setSweepSpeed] = useState<'normal' | 'fast'>('normal');
  const [isDiving, setIsDiving] = useState(false);
  const [radarHeading, setRadarHeading] = useState(0);

  // Animate the radar heading readout
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarHeading((prev) => (prev + 3) % 360);
    }, sweepSpeed === 'fast' ? 25 : 45);
    return () => clearInterval(interval);
  }, [sweepSpeed]);

  // Audio radar ping periodic sound
  useEffect(() => {
    if (!soundEnabled) return;
    const interval = setInterval(() => {
      soundFx.playRadarPing();
    }, sweepSpeed === 'fast' ? 2400 : 4200);
    return () => clearInterval(interval);
  }, [soundEnabled, sweepSpeed]);

  const handleInitiateDive = () => {
    if (isDiving) return;
    setIsDiving(true);
    if (soundEnabled) {
      soundFx.playWarpDive();
    }
    // Zoom motion duration matches framer motion animation
    setTimeout(() => {
      setGameState('COCKPIT_SIMULATOR');
    }, 1400);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c0508] text-red-400 font-mono select-none flex flex-col justify-between p-4 md:p-8">
      {/* Background Grid & Atmospheric Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(239, 68, 68, 0.15) 0%, transparent 70%),
            linear-gradient(to right, rgba(239, 68, 68, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      {/* TOP BAR / TACTICAL HUD HEADER */}
      <header className="relative z-20 flex justify-between items-center border-b border-red-500/30 pb-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-t-lg pt-14">
        {/* Left: Sector Info */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-ping shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400 tracking-[0.2em]">TACTICAL AIRSPACE SECTOR</div>
            <div className="text-sm md:text-base font-bold text-red-400 tracking-[0.2em] drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]">
              SECTOR 4-BRAVO // BEACON 121.5 MHz
            </div>
          </div>
        </div>

        {/* Right: Status & Sound Toggle */}
        <div className="flex items-center justify-end gap-4 text-xs">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-red-300/60 tracking-widest text-[10px]">RADAR SCAN</span>
            <span className="font-bold text-red-400 tracking-[0.15em]">{String(radarHeading).padStart(3, '0')}° MAG</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse hidden sm:inline-block" />
            <span className="text-[11px] font-bold text-red-400 tracking-wider hidden sm:inline">
              SIGNAL ACTIVE
            </span>
          </div>

          <button
            onClick={() => {
              toggleSound();
              soundFx.playClick();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-red-500/40 bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors rounded text-xs tracking-wider"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="hidden sm:inline">{soundEnabled ? 'AUDIO' : 'MUTE'}</span>
          </button>
        </div>
      </header>

      {/* CENTERPIECE: HUGE RED SPINNING RADAR */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center my-2">
        <div className="relative flex items-center justify-center">
          
          {/* Zoom-in Diving Motion Overlay */}
          <AnimatePresence>
            {isDiving && (
              <motion.div
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 30, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1] }}
                className="absolute inset-0 z-50 pointer-events-none rounded-full border-[12px] border-red-500 bg-red-600/35 backdrop-blur-2xl flex items-center justify-center"
              >
                <div className="w-full h-full rounded-full border-[6px] border-white animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* THE HUGE RED RADAR DISH CONTAINER */}
          <div 
            onClick={handleInitiateDive}
            className="relative cursor-pointer group rounded-full border-4 border-red-500/60 p-2 shadow-[0_0_80px_rgba(239,68,68,0.4),inset_0_0_80px_rgba(239,68,68,0.25)] bg-[#0f0305] transition-transform duration-300 hover:scale-[1.02]"
            style={{
              width: 'min(78vmin, 580px)',
              height: 'min(78vmin, 580px)',
            }}
          >
            {/* Outer Compass / Azimuth Markings Ring */}
            <div className="absolute inset-1 rounded-full border border-red-500/30 pointer-events-none">
              {/* Cardinal directions */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs md:text-sm font-bold text-red-400 tracking-widest">000° N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs md:text-sm font-bold text-red-400 tracking-widest">180° S</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs md:text-sm font-bold text-red-400 tracking-widest">270° W</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs md:text-sm font-bold text-red-400 tracking-widest">090° E</span>
              
              {/* Diagonal angles */}
              <span className="absolute top-8 right-10 text-[10px] text-red-500/60 hidden sm:block">045°</span>
              <span className="absolute bottom-8 right-10 text-[10px] text-red-500/60 hidden sm:block">135°</span>
              <span className="absolute bottom-8 left-10 text-[10px] text-red-500/60 hidden sm:block">225°</span>
              <span className="absolute top-8 left-10 text-[10px] text-red-500/60 hidden sm:block">315°</span>
            </div>

            {/* Concentric Range Rings */}
            <div className="absolute inset-8 rounded-full border border-red-500/40 pointer-events-none">
              <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] text-red-500/70">{rangeNM} NM</span>
            </div>
            <div className="absolute inset-20 rounded-full border border-red-500/35 pointer-events-none">
              <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] text-red-500/70">{Math.round(rangeNM * 0.66)} NM</span>
            </div>
            <div className="absolute inset-32 rounded-full border border-red-500/30 pointer-events-none">
              <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] text-red-500/70">{Math.round(rangeNM * 0.33)} NM</span>
            </div>
            <div className="absolute inset-44 rounded-full border border-dashed border-red-500/25 pointer-events-none" />

            {/* Crosshair Graticule Axes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-red-500/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-full w-[1px] bg-red-500/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-45">
              <div className="w-full h-[1px] bg-red-500/15" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -rotate-45">
              <div className="w-full h-[1px] bg-red-500/15" />
            </div>

            {/* THE RED SPINNING RADAR SWEEP HAND & PHOSPHOR CONIC GRADIENT */}
            <div 
              className={`absolute inset-0 rounded-full pointer-events-none ${sweepSpeed === 'fast' ? 'animate-[spin_2.8s_linear_infinite]' : 'animate-[spin_4.5s_linear_infinite]'}`}
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, rgba(239, 68, 68, 0.45) 0deg, rgba(239, 68, 68, 0.08) 55deg, transparent 75deg, transparent 360deg)',
              }}
            >
              {/* The sharp leading sweep hand / arm */}
              <div 
                className="absolute top-0 left-1/2 w-[2.5px] h-1/2 -translate-x-1/2 bg-red-400 origin-bottom"
                style={{
                  boxShadow: '0 0 16px 2px rgba(255, 100, 100, 0.95), 0 0 6px rgba(255, 255, 255, 0.9)',
                }}
              />
            </div>

            {/* DISTRESS TARGET BLIP: FLIGHT 804 (CRITICAL PLANE CONTACT) */}
            <div className="absolute top-[32%] right-[28%] z-10 pointer-events-auto">
              <div className="relative">
                {/* Pulsing distress beacon circle */}
                <div className="w-4 h-4 rounded-full bg-red-500 animate-ping absolute -inset-0.5 opacity-80" />
                <div className="w-3.5 h-3.5 rounded-full bg-red-400 border-2 border-white flex items-center justify-center shadow-[0_0_12px_#ff0000]" />
                
                {/* Flight 804 Tag */}
                <div className="absolute left-6 -top-3 bg-black/90 border border-red-500/80 px-2.5 py-1 rounded text-[11px] whitespace-nowrap shadow-lg">
                  <div className="flex items-center gap-1.5 font-bold text-red-300">
                    <AlertTriangle size={12} className="text-red-400 animate-bounce" />
                    <span>FLT AI-804 [MAYDAY]</span>
                  </div>
                  <div className="text-[10px] text-red-400/80 font-mono">
                    ALT: FL180 ↓ RAPID DESCENT<br />
                    DIST: 14.8 NM | HDG: 242°
                  </div>
                </div>
              </div>
            </div>

            {/* Auxiliary radar echo contact */}
            <div className="absolute bottom-[36%] left-[24%] z-10 opacity-70">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/90 shadow-[0_0_8px_#ef4444]" />
              <div className="text-[9px] text-red-400/70 absolute left-4 -top-1 whitespace-nowrap">
                DRONE-REC // 22.4 NM
              </div>
            </div>

            {/* CENTER CORE: INTERACTIVE DIVE ENGAGEMENT BUTTON */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInitiateDive();
                  }}
                  className="group/btn relative px-6 py-3 md:px-8 md:py-4 bg-red-950/80 hover:bg-red-900 border-2 border-red-500 text-red-300 font-bold tracking-[0.25em] text-xs md:text-sm rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:shadow-[0_0_50px_rgba(239,68,68,0.9)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  <Crosshair className="w-5 h-5 text-red-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>ENGAGE COCKPIT</span>
                  <ChevronRight className="w-5 h-5 text-red-400 group-hover/btn:translate-x-1 transition-transform" />
                  
                  {/* Glowing perimeter border pulse */}
                  <div className="absolute -inset-1 rounded-lg border border-red-400 opacity-50 animate-pulse pointer-events-none" />
                </button>
                <div className="text-[10px] text-center mt-2 text-red-400/80 tracking-widest uppercase">
                  [ CLICK RADAR TO DIVE IN ]
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RADAR TACTICAL CONTROLS & RANGE SELECTOR */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
          {/* Range Selection */}
          <div className="flex items-center gap-1 bg-black/60 border border-red-500/30 p-1 rounded-md">
            <span className="px-2 text-red-400/60 font-bold">RANGE:</span>
            {[15, 30, 60].map((nm) => (
              <button
                key={nm}
                onClick={() => {
                  setRangeNM(nm);
                  soundFx.playClick();
                }}
                className={`px-3 py-1 rounded transition-colors font-bold ${rangeNM === nm ? 'bg-red-600 text-white' : 'text-red-400 hover:bg-red-950/50'}`}
              >
                {nm} NM
              </button>
            ))}
          </div>

          {/* Sweep Speed Selection */}
          <div className="flex items-center gap-1 bg-black/60 border border-red-500/30 p-1 rounded-md">
            <span className="px-2 text-red-400/60 font-bold">SWEEP:</span>
            <button
              onClick={() => {
                setSweepSpeed('normal');
                soundFx.playClick();
              }}
              className={`px-3 py-1 rounded transition-colors font-bold ${sweepSpeed === 'normal' ? 'bg-red-600 text-white' : 'text-red-400 hover:bg-red-950/50'}`}
            >
              1X SCAN
            </button>
            <button
              onClick={() => {
                setSweepSpeed('fast');
                soundFx.playClick();
              }}
              className={`px-3 py-1 rounded transition-colors font-bold ${sweepSpeed === 'fast' ? 'bg-red-600 text-white' : 'text-red-400 hover:bg-red-950/50'}`}
            >
              2X RAPID
            </button>
          </div>

          {/* Direct Simulator Launch Button */}
          <button
            onClick={handleInitiateDive}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500 px-4 py-2 rounded font-bold text-red-300 tracking-wider transition-all"
          >
            <Zap size={14} className="text-red-400" />
            <span>ENTER FLIGHT 804 COCKPIT</span>
          </button>
        </div>
      </main>

      {/* FOOTER MISSION INTELLIGENCE & CRASH SITE DATA */}
      <footer className="relative z-20 border-t border-red-500/30 pt-3 flex flex-col md:flex-row justify-between items-center text-[11px] md:text-xs text-red-400/70 bg-black/40 px-4 py-2 rounded-b-lg gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2 py-0.5 bg-red-950 border border-red-500/50 text-red-400 font-bold rounded text-[10px]">
            CRASH SITE DATA
          </span>
          <span className="tracking-wider">
            LAT: 47.6062° N | LON: 122.3321° W | ELEV: 14 M | FREQ: 121.5 MHz
          </span>
        </div>

        <div className="flex items-center gap-4 text-red-300">
          <span className="hidden lg:inline text-gray-400">SYS.VER: 1.0.4 | ENCRYPTION: AES-256</span>
          <span className="font-bold text-red-400">OBJECTIVE: DIVE IN & SOLVE COCKPIT PSEUDOCODE</span>
        </div>
      </footer>
    </div>
  );
};

export default HugeRedRadarLanding;
