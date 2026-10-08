import { useStore } from './store/useStore';
import BootSequence from './components/BootSequence';
import AuthenticationScreen from './components/AuthenticationScreen';
import CrashSequence from './components/CrashSequence';
import MissionInterface from './components/MissionInterface';
import GlobalEffects from './components/GlobalEffects';
import CustomCursor from './components/CustomCursor';
import MainScene from './components/3d/MainScene';

function App() {
  const gameState = useStore((state) => state.gameState);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-textMain selection:bg-primary selection:text-black">
      <GlobalEffects />
      <CustomCursor />
      
      {/* Persistent 3D Scene */}
      <MainScene />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {gameState === 'BOOT' && <BootSequence />}
        {gameState === 'AUTHENTICATION' && <AuthenticationScreen />}
        {gameState === 'CRASH_SEQUENCE' && <CrashSequence />}
        {gameState === 'MISSION_START' && <MissionInterface />}
        {gameState === 'MISSION_EXPIRED' && (
          <div className="flex flex-col items-center justify-center gap-4 text-red-500 w-full px-12">
            <h1 className="text-6xl md:text-9xl font-display uppercase tracking-widest text-center border-b-4 border-red-500/50 pb-8 w-full">Mission Time Expired</h1>
            <p className="text-3xl md:text-5xl font-mono tracking-[0.3em]">BLACK BOX SIGNAL LOST</p>
          </div>
        )}
        {gameState === 'DISQUALIFIED' && (
          <div className="flex flex-col items-center justify-center gap-4 text-red-500 w-full px-12">
            <h1 className="text-6xl md:text-9xl font-display uppercase tracking-widest text-center border-b-4 border-red-500/50 pb-8 w-full">Team Disqualified</h1>
            <p className="text-3xl md:text-5xl font-mono tracking-[0.3em]">SECURITY PROTOCOL TRIGGERED</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
