import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { soundFx } from '../lib/audio';
import { ShieldCheck, Lock, Play, AlertCircle } from 'lucide-react';

export const AdminStartGate: React.FC = () => {
  const { teamId, setGameState } = useStore();
  const [adminCode, setAdminCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminCode.trim()) return;

    if (adminCode.trim() === '123') {
      soundFx.playSuccess();
      setErrorMsg('');
      setIsAuthorizing(true);
      // Brief feedback before launching crash sequence & starting timer
      setTimeout(() => {
        setGameState('CRASH_SEQUENCE');
      }, 900);
    } else {
      soundFx.playAlarm();
      setErrorMsg('INVALID ADMIN AUTHORIZATION KEY. ACCESS DENIED.');
      setAdminCode('');
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto font-mono z-40 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl mx-4 border-2 border-cyan-400/80 bg-[#070e1c]/95 p-8 sm:p-10 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.35)] relative overflow-hidden"
      >
        {/* Top scanline aesthetic overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-300">
              <Lock size={22} />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 tracking-[0.25em] uppercase font-bold">
                OPERATIONAL SECURITY CHECKPOINT
              </div>
              <div className="text-lg sm:text-xl font-bold tracking-widest text-cyan-300">
                ADMIN AUTHORIZATION GATE
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] text-gray-400 tracking-wider">TEAM VERIFIED</span>
            <span className="px-2.5 py-0.5 rounded bg-cyan-900/60 border border-cyan-400/50 text-cyan-200 text-xs font-bold tracking-widest">
              {teamId || 'TEAM-001'}
            </span>
          </div>
        </div>

        {/* Status Prompt Information */}
        <div className="mt-6 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-100/90 space-y-2">
          <div className="flex items-center gap-2 font-bold text-cyan-300 tracking-wider">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>CREDENTIALS ACCEPTED • TIMER ON HOLD</span>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
            The mission clock is currently paused. An event administrator must enter the authorization code to initiate the 12-minute mission timer and launch Flight AI-804 telemetry.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-xs font-bold tracking-widest text-gray-300 mb-2">
              ADMIN ACCESS CODE:
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={6}
                autoFocus
                value={adminCode}
                onChange={(e) => {
                  setAdminCode(e.target.value);
                  setErrorMsg('');
                }}
                placeholder='Enter admin code "123"'
                className="w-full bg-black/80 border-2 border-cyan-400/60 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 px-4 py-3.5 text-xl tracking-[0.3em] font-bold text-cyan-200 placeholder:text-gray-600 placeholder:text-xs placeholder:tracking-normal rounded-xl transition-all"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-red-400 bg-red-950/50 border border-red-500/50 p-3 rounded-lg"
            >
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={isAuthorizing}
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg ${
              isAuthorizing
                ? 'bg-emerald-500 text-black border border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.7)]'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black border border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.6)] cursor-pointer'
            }`}
          >
            {isAuthorizing ? (
              <>
                <ShieldCheck size={18} />
                <span>AUTHORIZING... STARTING MISSION CLOCK</span>
              </>
            ) : (
              <>
                <Play size={18} />
                <span>AUTHORIZE & START 12-MINUTE TIMER</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-5 text-center text-[10px] text-gray-500 tracking-wider">
          PROTOCOL SEC-123 // FLIGHT 804 CYBER RESPONSE
        </div>
      </motion.div>
    </div>
  );
};

export default AdminStartGate;
