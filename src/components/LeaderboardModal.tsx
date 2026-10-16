import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchLeaderboard, isSupabaseConnected, isGoogleSheetsConnected } from '../lib/database';
import type { LeaderboardEntry } from '../lib/database';
import { soundFx } from '../lib/audio';
import { 
  Clock, 
  X, 
  RefreshCw, 
  Database, 
  CheckCircle2, 
  Users
} from 'lucide-react';

export const LeaderboardModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchLeaderboard();
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="relative w-full max-w-4xl bg-[#070d1e]/95 border-2 border-cyan-400 rounded-3xl p-6 md:p-8 shadow-[0_0_80px_rgba(6,182,212,0.45)] text-white overflow-hidden"
      >
        {/* Top Cyber Accents */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-cyan-400 to-purple-500"></div>

        {/* Header with EDC Logo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cyan-500/30 pb-5 mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="/edc-logo.jpg" 
                alt="EDC Logo" 
                className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-black p-0.5 object-cover shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'edc-logo.jpg';
                }}
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black animate-pulse"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold text-[10px] tracking-widest uppercase">
                  BLACKOUT PROTOCOL
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-500 text-amber-300 font-bold text-[10px] tracking-wider uppercase">
                  EDC • SIT PUNE
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-black tracking-[0.15em] text-white mt-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
                LIVE MISSION LEADERBOARD
              </h2>

              <div className="flex items-center gap-3 text-xs text-cyan-300 mt-1">
                <span>RANKED BY FASTEST RECOVERY TIME</span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border border-cyan-400/50 bg-cyan-950/60 text-cyan-300 font-bold">
                  <Database size={11} />
                  {isGoogleSheetsConnected ? 'GOOGLE SHEETS CLOUD' : isSupabaseConnected ? 'POSTGRESQL CLOUD' : 'LOCAL PERSISTENT STORE'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              onClick={() => {
                soundFx.playClick();
                loadData();
              }}
              className="p-2 hover:text-cyan-300 text-gray-400 rounded-xl hover:bg-slate-800 transition-colors"
              title="Refresh Leaderboard"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 3 Eras mini badges */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-[10px] text-center font-bold">
          <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300">
            ERA 1: RETRO / ANCIENT
          </div>
          <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-cyan-300">
            ERA 2: INDUSTRIAL / MODERN
          </div>
          <div className="p-2 rounded-xl bg-purple-950/30 border border-purple-500/40 text-purple-300">
            ERA 3: CYBER / FUTURE
          </div>
        </div>

        {/* Table Content */}
        <div className="max-h-[55vh] overflow-y-auto pr-1 space-y-3 scrollbar-thin">
          {loading ? (
            <div className="py-16 text-center text-cyan-300 font-bold tracking-widest animate-pulse">
              SYNCING BLACKOUT TELEMETRY FROM CLOUD DATABASE...
            </div>
          ) : entries.length === 0 ? (
            <div className="py-16 text-center text-gray-500 tracking-wider">
              NO TEAMS HAVE COMPLETED THE RECOVERY MISSION YET.
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, index) => {
                const isWinner = index === 0;
                const isSecond = index === 1;
                const isThird = index === 2;

                return (
                  <div
                    key={entry.team_code + index}
                    className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl border-2 transition-all ${
                      isWinner
                        ? 'bg-gradient-to-r from-[#201805] to-[#120e03] border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.35)]'
                        : isSecond
                        ? 'bg-gradient-to-r from-[#141b2b] to-[#0c111c] border-slate-400 shadow-[0_0_20px_rgba(148,163,184,0.2)]'
                        : isThird
                        ? 'bg-gradient-to-r from-[#1f1105] to-[#100902] border-amber-600 shadow-[0_0_20px_rgba(217,119,6,0.2)]'
                        : 'bg-black/60 border-cyan-900/60 hover:border-cyan-700'
                    }`}
                  >
                    {/* Left: Rank & Team */}
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                        isWinner
                          ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.8)]'
                          : isSecond
                          ? 'bg-slate-300 text-black shadow-[0_0_15px_rgba(203,213,225,0.8)]'
                          : isThird
                          ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.8)]'
                          : 'bg-slate-800 text-gray-300 border border-slate-700'
                      }`}>
                        #{index + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-base tracking-widest text-white">
                            {entry.team_code}
                          </span>
                          {isWinner && (
                            <span className="px-2 py-0.5 bg-yellow-400 text-black text-[10px] font-black rounded-full shadow">
                              CHAMPION 🏆
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 tracking-wider">
                          {entry.team_name}
                        </div>
                      </div>
                    </div>

                    {/* Right: Time Taken & Status */}
                    <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-0">
                      <div className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded-xl border border-cyan-500/40">
                        <Clock size={16} className={isWinner ? 'text-yellow-400' : 'text-cyan-400'} />
                        <span className={`text-base font-black tracking-widest ${isWinner ? 'text-yellow-300' : 'text-cyan-300'}`}>
                          {entry.formatted_time}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          ({entry.time_taken_seconds}s)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/40">
                        <CheckCircle2 size={15} />
                        <span>VERIFIED ✓</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center border-t border-cyan-500/30 pt-4 mt-6 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-cyan-400" />
            <span>TOTAL VERIFIED MISSIONS: {entries.length}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all"
            >
              DISMISS
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardModal;
