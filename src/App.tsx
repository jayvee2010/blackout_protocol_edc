import { useStore } from './store/useStore';
import BootSequence from './components/BootSequence';
import AuthenticationScreen from './components/AuthenticationScreen';
import CrashSequence from './components/CrashSequence';
import GlobalEffects from './components/GlobalEffects';
import CustomCursor from './components/CustomCursor';
import MainScene from './components/3d/MainScene';
import HugeRedRadarLanding from './components/HugeRedRadarLanding';
import AirplaneCockpitSimulator from './components/AirplaneCockpitSimulator';
import UserManualDocument from './components/UserManualDocument';
import LeaderboardModal from './components/LeaderboardModal';
import GlobalMissionTimerHUD from './components/GlobalMissionTimerHUD';
import BlackBoxAudioModal from './components/BlackBoxAudioModal';
import AdminStartGate from './components/AdminStartGate';

import { useEffect } from 'react';

function App() {
  const { gameState, isLeaderboardOpen, setIsLeaderboardOpen } = useStore();

  // Secret Admin Shortcut: Press Alt+L or Ctrl+Shift+L to view the Leaderboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'l') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l')) {
        e.preventDefault();
        setIsLeaderboardOpen(!isLeaderboardOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLeaderboardOpen, setIsLeaderboardOpen]);

  const isLegacyGlobeState = [
    'BOOT', 
    'AUTHENTICATION', 
    'ADMIN_START_GATE',
    'CRASH_SEQUENCE', 
    'MISSION_EXPIRED', 
    'DISQUALIFIED'
  ].includes(gameState);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-textMain selection:bg-red-500 selection:text-white">
      <GlobalEffects />
      <CustomCursor />
      
      {/* Persistent 3D Globe Scene for original auth / crash sequences */}
      {isLegacyGlobeState && <MainScene />}

      {/* Global Mission Timer HUD - Visibly Persistent Throughout the Entire Game */}
      <GlobalMissionTimerHUD />

      {/* Black Box Audio File Modal - Pops up on correct code, stamps official time */}
      <BlackBoxAudioModal />

      {/* Global Winners Leaderboard Modal */}
      <LeaderboardModal 
        isOpen={isLeaderboardOpen} 
        onClose={() => setIsLeaderboardOpen(false)} 
      />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* INITIAL LOGIN FLOW - COMPLETELY UNCHANGED */}
        {gameState === 'BOOT' && <BootSequence />}
        {gameState === 'AUTHENTICATION' && <AuthenticationScreen />}
        {gameState === 'ADMIN_START_GATE' && <AdminStartGate />}
        {gameState === 'CRASH_SEQUENCE' && <CrashSequence />}

        {/* MAIN LANDING PAGE - HUGE RED SPINNING RADAR */}
        {gameState === 'MISSION_START' && <HugeRedRadarLanding />}

        {/* AIRPLANE COCKPIT SIMULATOR & USER MANUAL */}
        {gameState === 'COCKPIT_SIMULATOR' && <AirplaneCockpitSimulator />}
        {gameState === 'MANUAL_DOCUMENT' && <UserManualDocument />}

        {gameState === 'MISSION_EXPIRED' && (
          <div className="flex flex-col items-center justify-center gap-4 text-red-500 w-full px-12 font-mono">
            <h1 className="text-6xl md:text-9xl font-display uppercase tracking-widest text-center border-b-4 border-red-500/50 pb-8 w-full">Mission Time Expired</h1>
            <p className="text-3xl md:text-5xl font-mono tracking-[0.3em]">BLACK BOX SIGNAL LOST</p>
          </div>
        )}
        {gameState === 'DISQUALIFIED' && (
          <div className="flex flex-col items-center justify-center gap-4 text-red-500 w-full px-12 font-mono">
            <h1 className="text-6xl md:text-9xl font-display uppercase tracking-widest text-center border-b-4 border-red-500/50 pb-8 w-full">Team Disqualified</h1>
            <p className="text-3xl md:text-5xl font-mono tracking-[0.3em]">SECURITY PROTOCOL TRIGGERED</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
