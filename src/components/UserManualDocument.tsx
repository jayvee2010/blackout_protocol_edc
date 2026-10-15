import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { soundFx } from '../lib/audio';
import ManualChatbot from './ManualChatbot';
import { OFFICIAL_USER_MANUAL_SECTIONS, OFFICIAL_USER_MANUAL_TEXT } from '../lib/manualContent';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Edit3, 
  Compass, 
  BookOpen,
  Award,
  KeyRound,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const UserManualDocument: React.FC = () => {
  const { 
    setGameState, 
    customManualContent, 
    setCustomManualContent, 
    stampFinalVictory
  } = useStore();

  const [activeTab, setActiveTab] = useState<string>('brief');
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(
    customManualContent || OFFICIAL_USER_MANUAL_TEXT
  );

  // Final code entry prompt state
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [codeFeedback, setCodeFeedback] = useState<string>('');
  const [codeError, setCodeError] = useState<boolean>(false);

  const handleCopy = () => {
    const textToCopy = customManualContent || OFFICIAL_USER_MANUAL_TEXT;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    soundFx.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    setCustomManualContent(editedText);
    setIsEditing(false);
    soundFx.playSuccess();
  };

  const handleVerifyFinalCode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = enteredCode.trim().toLowerCase();

    // The official secret verification code
    const isValid = clean === 'g3h8dd9s0g4hb86m';

    if (isValid) {
      setCodeError(false);
      setCodeFeedback('CODE AUTHORIZED! OFFICIAL PASS CONFIRMED — STOPPING MISSION CLOCK...');
      soundFx.playSuccess();

      // THIS IS THE EXACT POINT THE GAME ENDS AND TIME IS STAMPED!
      setTimeout(() => {
        stampFinalVictory();
      }, 500);
    } else {
      setCodeError(true);
      setCodeFeedback('ACCESS REJECTED: Invalid verification code.');
      soundFx.playError();
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-y-auto bg-[#070b14] text-gray-100 font-mono p-4 md:p-8 select-none">
      
      {/* Background Document Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-6 pb-20 pt-16">
        
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/30 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playClick();
                setGameState('COCKPIT_SIMULATOR');
              }}
              className="flex items-center gap-2 px-3.5 py-2 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/50 rounded-xl text-cyan-300 text-xs font-bold transition-all shadow"
            >
              <ArrowLeft size={16} />
              <span>RETURN TO COCKPIT</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setGameState('MISSION_START');
              }}
              className="flex items-center gap-2 px-3.5 py-2 bg-red-950/70 hover:bg-red-900 border border-red-500/50 rounded-xl text-red-300 text-xs font-bold transition-all shadow"
            >
              <Compass size={16} />
              <span>RETURN TO RADAR</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                soundFx.playClick();
              }}
              className="flex items-center gap-2 px-3 py-2 bg-blue-900/60 hover:bg-blue-800 border border-blue-400/50 rounded-xl text-blue-200 text-xs font-bold transition-all"
            >
              <Edit3 size={15} />
              <span>{isEditing ? 'CANCEL EDIT' : 'VIEW / EDIT RAW TEXT'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold transition-all"
            >
              {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
              <span>{copied ? 'COPIED!' : 'COPY MANUAL'}</span>
            </button>
          </div>
        </div>

        {/* PRIZE UNLOCK BANNER */}
        <div className="bg-gradient-to-r from-emerald-950/90 via-cyan-950/90 to-blue-950/90 border-2 border-emerald-400 p-6 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.35)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 border border-emerald-400 rounded-xl">
              <Award className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-500 text-black font-bold text-[10px] rounded tracking-widest">
                  CIRCUIT TROUBLESHOOTING MANUAL UNLOCKED
                </span>
                <span className="text-emerald-400 text-xs font-bold tracking-widest">
                  SYMBIOSIS IEEE STUDENT BRANCH • SIT PUNE
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-[0.15em] mt-1">
                ARDUINO CIRCUIT TROUBLESHOOTING MANUAL
              </h1>
              <p className="text-xs text-gray-300 mt-1">
                PARTICIPANT EDITION | CIRCUIT 1 & CIRCUIT 2 // ZERO-HALLUCINATION HARDWARE COPILOT
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-emerald-300 font-mono">
            <div>DOC ID: SIT-IEEE-ACTM-2026</div>
            <div>SCOPE: CIRCUIT 1 & 2</div>
            <div>STATUS: VERIFIED</div>
          </div>
        </div>

        {/* EDIT / VIEW RAW USER DOCUMENT DRAWER */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black/90 border-2 border-blue-500/80 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-sm font-bold text-blue-400 tracking-wider">
                  RAW CIRCUIT TROUBLESHOOTING MANUAL (EDIT / EXTEND):
                </span>
              </div>

              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows={12}
                className="w-full bg-[#0a0f1d] border border-blue-500/40 rounded-xl p-4 text-xs font-mono text-cyan-200 outline-none focus:border-cyan-400 leading-relaxed"
                placeholder="Paste or modify the manual text..."
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg text-xs text-gray-300 hover:bg-gray-800"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs tracking-wider shadow-lg"
                >
                  SAVE & UPDATE MANUAL
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TABBED MANUAL CHAPTERS (PAGES 1-30) */}
        <div className="bg-[#0b1329]/95 border-2 border-cyan-500/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* Chapter Tabs */}
          <div className="flex flex-wrap border-b border-cyan-500/40 bg-black/40">
            {OFFICIAL_USER_MANUAL_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveTab(sec.id);
                  soundFx.playClick();
                }}
                className={`px-4 py-3 text-xs font-bold tracking-wider transition-all border-r border-cyan-500/20 text-left ${
                  activeTab === sec.id
                    ? 'bg-cyan-950/90 text-cyan-300 border-b-2 border-b-cyan-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-black/20'
                }`}
              >
                <div>{sec.title}</div>
                <div className="text-[10px] text-gray-500 font-normal">{sec.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Chapter Content */}
          <div className="p-6 md:p-8 space-y-4">
            {OFFICIAL_USER_MANUAL_SECTIONS.filter((s) => s.id === activeTab).map((sec) => (
              <div key={sec.id} className="space-y-3">
                <div className="flex items-center gap-3 text-cyan-400">
                  <BookOpen size={20} />
                  <div>
                    <h2 className="text-base md:text-lg font-bold tracking-widest text-white">
                      {sec.title}
                    </h2>
                    <p className="text-xs text-cyan-300">{sec.subtitle}</p>
                  </div>
                </div>

                <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-5 text-xs md:text-sm whitespace-pre-wrap leading-relaxed text-gray-200 font-mono shadow-inner max-h-[500px] overflow-y-auto scrollbar-thin">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 2: STRICT AI COPILOT CHATBOT (ZERO HALLUCINATION)   */}
        {/* ======================================================== */}
        <div className="mt-8">
          <ManualChatbot />
        </div>

        {/* ======================================================== */}
        {/* STEP 3: TEXTBOX PROMPT TO ENTER FINAL CODE                */}
        {/* ======================================================== */}
        <div className="mt-8 bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border-2 border-yellow-400 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(250,204,21,0.35)] space-y-5">
          <div className="flex items-start gap-4 border-b border-yellow-500/40 pb-4">
            <div className="p-3 bg-yellow-500/20 border-2 border-yellow-400 rounded-xl text-yellow-400 shrink-0">
              <KeyRound size={28} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded bg-yellow-400 text-black text-[10px] font-bold tracking-widest mb-1">
                FINAL CIRCUIT VERIFICATION (PAGE 29)
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-widest text-yellow-300">
                ENTER CIRCUIT VERIFICATION CODE
              </h3>
              <p className="text-xs md:text-sm text-gray-300 mt-1 leading-relaxed">
                Once the supervisor inspects your physical Arduino, LCD, servo, and LED circuit and issues a PASS approval, submit your official verification code below to freeze the 12-minute mission clock and record your final team time!
              </p>
            </div>
          </div>

          <form onSubmit={handleVerifyFinalCode} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-yellow-300 tracking-widest mb-2">
                SUPERVISOR VERIFICATION CODE SUBMISSION:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  placeholder="ENTER VERIFICATION CODE"
                  className="flex-1 bg-black/90 border-2 border-yellow-400/80 rounded-xl px-5 py-3 text-base md:text-lg font-bold text-yellow-300 outline-none focus:border-white tracking-widest placeholder:text-gray-600"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm tracking-widest rounded-xl transition-all shadow-[0_0_25px_rgba(250,204,21,0.6)] flex items-center justify-center gap-2 hover:scale-105"
                >
                  <ShieldCheck size={18} />
                  <span>SUBMIT VERIFICATION CODE</span>
                </button>
              </div>
            </div>

            {codeFeedback && (
              <div className={`p-4 rounded-xl border-2 text-xs md:text-sm font-bold flex items-center gap-2 ${
                codeError
                  ? 'bg-red-950/80 border-red-500 text-red-200'
                  : 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
              }`}>
                {codeError ? <AlertTriangle size={18} className="shrink-0" /> : <ShieldCheck size={18} className="shrink-0" />}
                <span>{codeFeedback}</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default UserManualDocument;
