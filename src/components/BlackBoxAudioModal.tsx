import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { soundFx } from '../lib/audio';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  FileAudio, 
  Clock, 
  Radio,
  X
} from 'lucide-react';

export const BlackBoxAudioModal: React.FC = () => {
  const { 
    isAudioPopupOpen, 
    setIsAudioPopupOpen, 
    stampedTimeTakenSeconds, 
    teamId 
  } = useStore();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);

  // Play audio on initial modal open
  useEffect(() => {
    if (isAudioPopupOpen) {
      setIsPlaying(true);
      soundFx.playRadioTransmission();
    } else {
      setIsPlaying(false);
      soundFx.stopRadioTransmission();
    }
  }, [isAudioPopupOpen]);

  // Simulated playback progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!isAudioPopupOpen) return null;

  const m = Math.floor((stampedTimeTakenSeconds || 0) / 60).toString().padStart(2, '0');
  const s = ((stampedTimeTakenSeconds || 0) % 60).toString().padStart(2, '0');
  const formattedFinalTime = `${m}m ${s}s`;

  const togglePlay = () => {
    if (isPlaying) {
      soundFx.stopRadioTransmission();
      setIsPlaying(false);
    } else {
      soundFx.playRadioTransmission();
      setIsPlaying(true);
      if (playbackProgress >= 100) setPlaybackProgress(0);
    }
  };

  const restartPlay = () => {
    soundFx.stopRadioTransmission();
    setPlaybackProgress(0);
    soundFx.playRadioTransmission();
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-3xl bg-[#0f172a] border-2 border-emerald-400 rounded-3xl p-6 md:p-8 shadow-[0_0_80px_rgba(16,185,129,0.5)] text-white"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            soundFx.stopRadioTransmission();
            setIsAudioPopupOpen(false);
          }}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
        >
          <X size={20} />
        </button>

        {/* HERO CELEBRATION HEADER */}
        <div className="text-center pb-6 border-b border-emerald-500/40">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-xs tracking-widest mb-3 animate-pulse">
            <CheckCircle2 size={16} />
            <span>MISSION COMPLETE // AUDIO FILE RECOVERED</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]">
            BLACK BOX AUDIO ARCHIVE
          </h2>
          <p className="text-xs md:text-sm text-cyan-300 mt-1 tracking-wider">
            COCKPIT VOICE RECORDER (CVR) TRANSMISSION UNLOCKED
          </p>
        </div>

        {/* OFFICIAL TIME STAMP CARD */}
        <div className="my-6 p-5 rounded-2xl bg-black/60 border-2 border-yellow-400/80 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_0_25px_rgba(250,204,21,0.25)]">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/20 border border-yellow-400 rounded-xl text-yellow-400">
              <Clock size={28} />
            </div>
            <div>
              <div className="text-xs text-gray-400 tracking-wider">OFFICIAL MISSION TIME STAMP</div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-300 tracking-widest">
                {formattedFinalTime}
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="text-xs text-gray-400 tracking-wider">TEAM IDENTIFIER</div>
            <div className="text-xl font-bold text-white tracking-widest">
              {teamId || 'TEAM-001'}
            </div>
            <div className="text-[11px] text-emerald-400 font-bold mt-0.5">
              RECORDED IN CLOUD DATABASE ✓
            </div>
          </div>
        </div>

        {/* AUDIO PLAYER INTERFACE */}
        <div className="p-6 rounded-2xl bg-[#091124] border-2 border-cyan-400/60 shadow-inner space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/20 border border-cyan-400 rounded-lg text-cyan-300">
                <FileAudio size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-wider">
                  FLIGHT_804_MAYDAY_TRANSMISSION.WAV
                </div>
                <div className="text-[11px] text-cyan-400">
                  CHANNEL: 121.5 MHz VHF GUARD // 37.5 kHz ULB SYNC
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Radio size={16} className="text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">ONLINE</span>
            </div>
          </div>

          {/* Equalizer Visualizer Bars */}
          <div className="h-12 bg-black/80 rounded-xl p-2 flex items-end justify-between gap-1 overflow-hidden border border-gray-700">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className={`w-full rounded-t transition-all duration-150 ${
                  isPlaying ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
                style={{
                  height: isPlaying ? `${Math.sin((i + playbackProgress) * 0.5) * 40 + 50}%` : '15%',
                }}
              />
            ))}
          </div>

          {/* Scrubber Bar */}
          <div className="space-y-1">
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-200"
                style={{ width: `${playbackProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>00:{Math.floor((playbackProgress * 0.15)).toString().padStart(2, '0')}</span>
              <span>00:15 [FULL RECORDING]</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider rounded-xl transition-all shadow-[0_0_15px_#10b981]"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span>{isPlaying ? 'PAUSE AUDIO' : 'PLAY AUDIO'}</span>
              </button>

              <button
                onClick={restartPlay}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-gray-300 text-xs rounded-xl transition-all"
              >
                <RotateCcw size={14} />
                <span>RESTART</span>
              </button>
            </div>

            <div className="text-xs text-gray-400 font-mono hidden sm:block">
              FORMAT: 24-BIT PCM / 48 kHz
            </div>
          </div>
        </div>

        {/* TRANSCRIPT BOX */}
        <div className="mt-5 p-4 rounded-xl bg-black/60 border border-gray-700 text-xs text-gray-300 space-y-1.5">
          <div className="text-yellow-300 font-bold tracking-wider">// CVR AUDIO TRANSCRIPT //</div>
          <div className="italic text-cyan-200">
            &quot;Mayday, Mayday, Mayday. Flight AI-804. All systems stabilized. Emergency beacon locked on 121.5 MHz. Flight recorder telemetry secured. Safe recovery clearance granted.&quot;
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <CheckCircle2 size={16} />
            <span>RECORD SECURED IN EVENT DATABASE • RESULTS LOCKED</span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              soundFx.stopRadioTransmission();
              setIsAudioPopupOpen(false);
            }}
            className="w-full sm:w-auto px-6 py-3 border border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black font-bold text-xs rounded-xl transition-all"
          >
            DISMISS TRANSMISSION
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlackBoxAudioModal;
