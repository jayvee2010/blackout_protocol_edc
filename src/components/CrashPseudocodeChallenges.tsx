import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { soundFx } from '../lib/audio';
import { 
  AlertOctagon, 
  CheckCircle2, 
  Terminal, 
  Play, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Layers
} from 'lucide-react';

export const CrashPseudocodeChallenges: React.FC<{
  onAllCompleted: () => void;
}> = ({ onAllCompleted }) => {
  const { 
    solvedChallenges, 
    markChallengeSolved 
  } = useStore();

  const [activeTab, setActiveTab] = useState<number>(1);

  // ----------------------------------------------------
  // CHALLENGE 1: Stall & Compressor Surge Recovery Matrix
  // ----------------------------------------------------
  const [c1YokeAction, setC1YokeAction] = useState<string>('');
  const [c1ThrustSequence, setC1ThrustSequence] = useState<string>('');
  const [c1Slats, setC1Slats] = useState<string>('');
  const [c1AoAThreshold, setC1AoAThreshold] = useState<string>('');
  const [c1Feedback, setC1Feedback] = useState<string>('WARNING: Stall warning shaker active at 128 KIAS with AOA +24.6°. Formulate anti-stall flight law sequence.');
  const [c1Success, setC1Success] = useState<boolean>(false);

  const verifyChallenge1 = () => {
    if (c1YokeAction !== 'PUSH_DOWN_REDUCE_AOA') {
      soundFx.playError();
      setC1Feedback('AERODYNAMIC FAILURE: Pulling up or maintaining level yoke deepens aerodynamic stall. Control column must be pushed NOSE-DOWN to reduce AOA below critical angle.');
      return;
    }
    if (c1ThrustSequence !== 'TOGA_DELAYED_SURGE_PREVENTION') {
      soundFx.playError();
      setC1Feedback('COMPRESSOR SURGE / FLAMEOUT: Slamming immediate TOGA at extreme AOA causes catastrophic turbine surge. Spool TOGA progressively once AOA reduces below 14°.');
      return;
    }
    if (c1Slats !== 'DEPLOY_SLATS_EXTENDED') {
      soundFx.playError();
      setC1Feedback('BOUNDARY LAYER SEPARATION: Leading edge slats must be EXTENDED to re-energize boundary layer airflow over the wings.');
      return;
    }
    const parsedAoa = parseFloat(c1AoAThreshold.trim());
    if (isNaN(parsedAoa) || parsedAoa < 12 || parsedAoa > 16) {
      soundFx.playError();
      setC1Feedback('THRESHOLD ERROR: Specify target recovery AOA between 12.0° and 16.0° to balance stall recovery with ground obstacle clearance.');
      return;
    }

    setC1Success(true);
    setC1Feedback('EXCELLENT: Anti-stall flight law compiled! Airflow re-attached, turbine surge mitigated, airspeed climbing past 175 KIAS. MODULE 01 CLEARED.');
    markChallengeSolved(1);
    soundFx.playSuccess();
  };

  // ----------------------------------------------------
  // CHALLENGE 2: CG & Differential Fuel Jettison Telemetry
  // ----------------------------------------------------
  const [c2Crossfeed, setC2Crossfeed] = useState<string>('ISOLATED');
  const [c2TypedSeconds, setC2TypedSeconds] = useState<string>('');
  const [c2LoopCondition, setC2LoopCondition] = useState<string>('');
  const [c2Feedback, setC2Feedback] = useState<string>('OVERWEIGHT DITCH RISK: Current Gross Weight: 84,200 KG. Maximum Structural Landing Weight (MLW): 65,000 KG. Dual manifold rate: 320 KG/s total. Calculate exact seconds.');
  const [c2Success, setC2Success] = useState<boolean>(false);
  const [isDumping, setIsDumping] = useState<boolean>(false);

  // Exact math: 84,200 - 65,000 = 19,200 KG to jettison.
  // 19,200 / 320 KG/s = exactly 60 seconds!
  const verifyChallenge2 = () => {
    const parsed = parseInt(c2TypedSeconds.trim(), 10);
    if (parsed !== 60) {
      soundFx.playError();
      setC2Feedback('CALCULATION ERROR: Fuel to dump = 84,200 KG - 65,000 KG = 19,200 KG. Divided by dual-pump flow rate 320 KG/s. Compute (19,200 / 320) and enter integer seconds.');
      return;
    }
    if (c2Crossfeed !== 'CROSSFEED_BALANCED_OPEN') {
      soundFx.playError();
      setC2Feedback('LATERAL INSTABILITY: Crossfeed valve must be BALANCED_OPEN to equalize hydrostatic head and avoid dangerous roll moment between wing tanks.');
      return;
    }
    if (c2LoopCondition !== 'WHILE (current_weight > 65000_KG)') {
      soundFx.playError();
      setC2Feedback('CONTROL LOOP FLAW: Select the termination condition that halts jettison exactly at 65,000 KG.');
      return;
    }

    setIsDumping(true);
    soundFx.playClick();
    setTimeout(() => {
      setIsDumping(false);
      setC2Success(true);
      setC2Feedback('TELEMETRY VALIDATED: 19,200 KG jettisoned in exactly 60s. Center of Gravity (CG) within 28.4% MAC envelope. MODULE 02 CLEARED.');
      markChallengeSolved(2);
      soundFx.playSuccess();
    }, 600);
  };

  const allSolved = solvedChallenges.includes(1) && solvedChallenges.includes(2);

  return (
    <div className="w-full max-w-4xl bg-[#0f172a]/95 border-2 border-red-500 rounded-2xl p-5 md:p-7 shadow-[0_0_60px_rgba(248,113,113,0.5)] backdrop-blur-xl text-white font-mono select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-red-500/50 pb-4 mb-5 gap-3">
        <div className="flex items-center gap-3">
          <Terminal className="text-red-400 w-7 h-7 animate-pulse shrink-0" />
          <div>
            <h2 className="text-lg md:text-xl font-bold tracking-[0.2em] text-white drop-shadow-[0_0_12px_rgba(248,113,113,0.9)]">
              FLIGHT AI-804 // CRASH DIAGNOSTIC CONSOLE
            </h2>
            <p className="text-xs text-cyan-300 tracking-wider">
              MULTI-STAGE AVIONIC PSEUDOCODE SYSTEM DIAGNOSTICS (ESTIMATED: 5-6 MIN)
            </p>
          </div>
        </div>

        {/* Modules navigation - 2 challenging modules */}
        <div className="flex items-center gap-2">
          {[1, 2].map((num) => {
            const isSolved = solvedChallenges.includes(num);
            return (
              <button
                key={num}
                onClick={() => {
                  setActiveTab(num);
                  soundFx.playClick();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 text-xs font-bold transition-all shadow-md ${
                  activeTab === num
                    ? 'border-red-400 bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.7)] scale-105'
                    : isSolved
                    ? 'border-emerald-400 bg-emerald-950/90 text-emerald-300'
                    : 'border-slate-600 bg-slate-800/90 text-slate-300 hover:border-slate-400'
                }`}
              >
                {isSolved ? <CheckCircle2 size={15} className="text-emerald-400" /> : <AlertOctagon size={15} />}
                <span>MODULE 0{num}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODULE 1: STALL RECOVERY & COMPRESSOR SURGE PREVENTION   */}
      {/* ======================================================== */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="bg-red-950/70 border border-red-500/60 p-3.5 rounded-xl flex items-start gap-3">
            <Flame className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-red-300 tracking-wider">
                CHALLENGE 01: AERODYNAMIC STALL LAW & COMPRESSOR SURGE MITIGATION
              </span>
              <p className="text-gray-200 leading-relaxed">
                Telemetry indicates AOA +24.6° at 128 KIAS. Stick shaker active. You must construct the flight computer anti-stall algorithm to avoid deep stall and catastrophic high-AOA turbine compressor stalls.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Step 1: Pitch Control */}
            <div className="bg-black/60 p-3.5 rounded-xl border border-cyan-500/40 space-y-2">
              <span className="text-[11px] font-bold text-cyan-300 tracking-wider block">
                1. ELEVATOR / CONTROL COLUMN LOGIC:
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'PUSH_DOWN_REDUCE_AOA', label: 'PUSH NOSE-DOWN (Break critical stall AOA)' },
                  { id: 'PULL_UP_INCREASE_ALT', label: 'PULL UP (Attempt emergency altitude gain)' },
                  { id: 'MAINTAIN_LEVEL', label: 'HOLD NEUTRAL (Wait for airspeed recovery)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setC1YokeAction(opt.id);
                      soundFx.playClick();
                    }}
                    className={`w-full p-2.5 rounded-lg border text-xs font-bold text-left transition-all ${
                      c1YokeAction === opt.id
                        ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                        : 'border-slate-700 bg-slate-900/60 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Thrust Management */}
            <div className="bg-black/60 p-3.5 rounded-xl border border-cyan-500/40 space-y-2">
              <span className="text-[11px] font-bold text-cyan-300 tracking-wider block">
                2. AUTOTHROTTLE & ENGINE SURGE LOGIC:
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'TOGA_IMMEDIATE_FULL', label: 'IMMEDIATE TOGA (Instant 100% full thrust)' },
                  { id: 'TOGA_DELAYED_SURGE_PREVENTION', label: 'SPOOL TOGA PROGRESSIVELY (Prevent surge flameout)' },
                  { id: 'IDLE_SHUTDOWN', label: 'IDLE CUT-OFF (Zero fuel burn)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setC1ThrustSequence(opt.id);
                      soundFx.playClick();
                    }}
                    className={`w-full p-2.5 rounded-lg border text-xs font-bold text-left transition-all ${
                      c1ThrustSequence === opt.id
                        ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                        : 'border-slate-700 bg-slate-900/60 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: High-Lift Devices */}
            <div className="bg-black/60 p-3.5 rounded-xl border border-cyan-500/40 space-y-2">
              <span className="text-[11px] font-bold text-cyan-300 tracking-wider block">
                3. WING HIGH-LIFT RECOVERY DEVICE:
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'DEPLOY_SLATS_EXTENDED', label: 'DEPLOY LEADING-EDGE SLATS (Re-energize airflow)' },
                  { id: 'RETRACT_CLEAN_WING', label: 'RETRACT ALL FLAPS/SLATS (Reduce parasitic drag)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setC1Slats(opt.id);
                      soundFx.playClick();
                    }}
                    className={`w-full p-2.5 rounded-lg border text-xs font-bold text-left transition-all ${
                      c1Slats === opt.id
                        ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                        : 'border-slate-700 bg-slate-900/60 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Numerical Boundary Parameter */}
            <div className="bg-black/60 p-3.5 rounded-xl border border-cyan-500/40 space-y-2">
              <span className="text-[11px] font-bold text-cyan-300 tracking-wider block">
                4. TARGET RECOVERY AOA THRESHOLD (DEGREES):
              </span>
              <p className="text-[11px] text-gray-400">
                Enter critical safe angle threshold in degrees (Allowed: 12.0° to 16.0°):
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={c1AoAThreshold}
                  onChange={(e) => setC1AoAThreshold(e.target.value)}
                  placeholder="e.g. 14.0"
                  className="w-32 bg-black border border-cyan-400 rounded-lg px-3 py-2 text-cyan-200 text-sm font-bold outline-none text-center"
                />
                <span className="text-xs text-gray-300">degrees (AOA target)</span>
              </div>
            </div>
          </div>

          {/* Feedback & Action */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
            <div className={`text-xs p-3.5 rounded-xl border flex-1 w-full font-bold ${
              c1Success ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200' : 'bg-red-950/80 border-red-500/60 text-red-200'
            }`}>
              {c1Feedback}
            </div>

            <button
              onClick={verifyChallenge1}
              className="w-full sm:w-auto px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-widest rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.7)] flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
            >
              <Play size={15} />
              <span>TEST RECOVERY CODE</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* MODULE 2: CG & DIFFERENTIAL FUEL JETTISON MATHEMATICS     */}
      {/* ======================================================== */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="bg-yellow-950/70 border border-yellow-500/60 p-3.5 rounded-xl flex items-start gap-3">
            <Layers className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-yellow-300 tracking-wider">
                CHALLENGE 02: EMERGENCY WEIGHT SHEDDING & CROSSFEED MANIFOLD BALANCING
              </span>
              <p className="text-gray-200 leading-relaxed">
                Aircraft Gross Weight: <strong>84,200 KG</strong>. Maximum Landing Weight (MLW): <strong>65,000 KG</strong>.<br />
                Dual wing jettison pump system pumps at a combined flow rate of <strong>320 KG/second</strong>.<br />
                Calculate the required jettison time and configure hydraulic crossfeed valves to prevent asymmetric wing flutter.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Crossfeed Logic */}
            <div className="bg-black/60 p-3.5 rounded-xl border border-cyan-500/40 space-y-2">
              <span className="text-[11px] font-bold text-cyan-300 tracking-wider block">
                1. FUEL CROSSFEED MANIFOLD STATE:
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'CROSSFEED_BALANCED_OPEN', label: 'CROSSFEED_BALANCED_OPEN (Equalize wing pressure)' },
                  { id: 'ISOLATED', label: 'ISOLATED_CLOSED (Risk lateral wing weight imbalance)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setC2Crossfeed(opt.id);
                      soundFx.playClick();
                    }}
                    className={`w-full p-2.5 rounded-lg border text-xs font-bold text-left transition-all ${
                      c2Crossfeed === opt.id
                        ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300'
                        : 'border-slate-700 bg-slate-900/60 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Loop Condition */}
            <div className="bg-black/60 p-3.5 rounded-xl border border-cyan-500/40 space-y-2">
              <span className="text-[11px] font-bold text-cyan-300 tracking-wider block">
                2. VALVE ACTUATION CONTROL LOOP:
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'WHILE (current_weight > 65000_KG)', label: 'WHILE (current_weight > 65,000_KG) { open_valves(); }' },
                  { id: 'UNTIL (tank_empty)', label: 'UNTIL (fuel_tanks == EMPTY) { dump_all(); }' },
                  { id: 'WHILE (current_weight < 65000_KG)', label: 'WHILE (current_weight < 65,000_KG) { hold(); }' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setC2LoopCondition(opt.id);
                      soundFx.playClick();
                    }}
                    className={`w-full p-2.5 rounded-lg border text-xs font-bold text-left transition-all ${
                      c2LoopCondition === opt.id
                        ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300'
                        : 'border-slate-700 bg-slate-900/60 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Math calculation input */}
          <div className="bg-black/70 p-4 rounded-xl border border-yellow-500/60 space-y-2">
            <span className="text-xs font-bold text-yellow-300 tracking-wider block">
              3. CALCULATE REQUIRED DUMP DURATION (SECONDS):
            </span>
            <p className="text-[11px] text-gray-300">
              Calculate: <code>(Current Gross Weight - MLW) / Combined Flow Rate</code>:
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={c2TypedSeconds}
                onChange={(e) => setC2TypedSeconds(e.target.value)}
                placeholder="Enter computed seconds"
                className="w-48 bg-black border-2 border-yellow-400 rounded-lg px-4 py-2 text-yellow-200 text-sm md:text-base font-bold outline-none text-center"
              />
              <span className="text-xs text-gray-400">
                integer seconds (Formula: (84,200 - 65,000) / 320)
              </span>
            </div>
          </div>

          {/* Feedback & Verify */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
            <div className={`text-xs p-3.5 rounded-xl border flex-1 w-full font-bold ${
              c2Success ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200' : 'bg-cyan-950/80 border-cyan-500/60 text-cyan-200'
            }`}>
              {c2Feedback}
            </div>

            <button
              onClick={verifyChallenge2}
              disabled={isDumping}
              className="w-full sm:w-auto px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs tracking-widest rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.6)] flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
            >
              <Play size={15} />
              <span>{isDumping ? 'MONITORING JETTISON FLOW...' : 'ENGAGE JETTISON VALVES'}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* PRIZE UNLOCK BANNER */}
      {allSolved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 border-2 border-emerald-400 bg-emerald-950/90 p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_0_40px_rgba(16,185,129,0.7)]"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-9 h-9 text-emerald-400 shrink-0" />
            <div>
              <div className="text-sm md:text-base font-bold text-emerald-300 tracking-wider">
                ALL FLIGHT DIAGNOSTIC MODULES RESOLVED!
              </div>
              <div className="text-xs text-emerald-100">
                CIRCUIT USER MANUAL & HARDWARE TROUBLESHOOTING COPILOT ARE UNLOCKED.
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playSuccess();
              onAllCompleted();
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs tracking-[0.2em] rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
          >
            <span>ACCESS USER MANUAL</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      )}

    </div>
  );
};

export default CrashPseudocodeChallenges;
