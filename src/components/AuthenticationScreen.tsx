import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { authenticateTeam } from '../lib/api';
import { motion } from 'framer-motion';

const AuthenticationScreen: React.FC = () => {
  const [teamIdInput, setTeamIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [statusMsg, setStatusMsg] = useState('AWAITING CREDENTIALS');
  
  const { setGameState, setTeamId, attemptsRemaining } = useStore();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamIdInput || !passwordInput) return;
    
    setLoading(true);
    setStatusMsg('VERIFYING...');
    setErrorMsg('');

    const result = await authenticateTeam(teamIdInput.toUpperCase(), passwordInput);
    
    setLoading(false);

    if (result.success) {
      setStatusMsg('ACCESS GRANTED');
      setTeamId(teamIdInput.toUpperCase());
      setTimeout(() => setGameState('ADMIN_START_GATE'), 1500);
    } else {
      setErrorMsg(result.message || 'ERROR');
      setStatusMsg('AUTHENTICATION FAILED');
      if (result.disqualified) {
        setTimeout(() => setGameState('DISQUALIFIED'), 2000);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
    setPasswordInput(val);
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 3; i++) {
      dots.push(i < passwordInput.length ? '●' : '·');
    }
    return dots.join(' ');
  };

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto">
      {/* Terminal UI */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl border border-primary/30 bg-surface/60 backdrop-blur-md p-10 font-mono"
        style={{ boxShadow: '0 0 30px rgba(124,255,91,0.05)' }}
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

        <div className="text-center mb-10 border-b border-primary/20 pb-6">
          <h2 className="text-primary tracking-[0.3em] text-xl font-bold">MISSION CONTROL // AUTHENTICATION</h2>
          <p className="text-sm text-muted mt-2 tracking-[0.4em]">OPERATION: BLACK BOX RECOVERY</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-8">
          <div className="flex flex-col">
            <label className="text-lg text-primary/70 mb-2 tracking-[0.2em]">TEAM IDENTIFICATION</label>
            <input
              type="text"
              value={teamIdInput}
              onChange={(e) => setTeamIdInput(e.target.value)}
              disabled={loading}
              className="bg-black/70 border border-primary/30 text-primary px-4 py-3 outline-none focus:border-primary uppercase tracking-[0.3em] text-xl"
              placeholder="ENTER TEAM ID"
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-lg text-primary/70 mb-2 tracking-[0.2em]">SECURITY CODE</label>
            <div className="relative">
              <input
                type="text"
                value={passwordInput}
                onChange={handlePasswordChange}
                disabled={loading}
                className="absolute inset-0 opacity-0 cursor-text w-full h-full z-10"
              />
              <div className="bg-black/70 border border-primary/30 text-primary px-4 py-3 flex items-center justify-center text-4xl tracking-[0.5em] h-24">
                {renderDots()}
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="text-red-500 text-lg text-center animate-[pulse_1s_ease-in-out_infinite] tracking-[0.2em] bg-red-500/10 py-3 border border-red-500/30">
              {errorMsg}
            </div>
          )}

          <div className="flex justify-between text-sm text-muted tracking-[0.3em] mt-4">
            <span>ATTEMPTS REMAINING:</span>
            <span className="text-primary">0{attemptsRemaining}</span>
          </div>

          <button
            type="submit"
            disabled={loading || passwordInput.length !== 3 || !teamIdInput}
            className="w-full border border-primary bg-primary/10 hover:bg-primary/20 text-primary py-5 text-xl tracking-[0.4em] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            [ AUTHENTICATE ]
          </button>

          <div className="mt-8 pt-6 border-t border-primary/20 text-center text-lg tracking-[0.3em]">
            <span className="text-muted">STATUS: </span>
            <span className={statusMsg.includes('FAILED') || statusMsg.includes('UNKNOWN') ? 'text-red-500' : 'text-primary'}>
              {statusMsg}
            </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthenticationScreen;
