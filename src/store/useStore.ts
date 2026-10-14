import { create } from 'zustand';
import { recordTeamCompletion } from '../lib/database';

export type GameState = 
  | 'BOOT' 
  | 'AUTHENTICATION' 
  | 'ADMIN_START_GATE'
  | 'CRASH_SEQUENCE' 
  | 'MISSION_START' 
  | 'COCKPIT_SIMULATOR'
  | 'MANUAL_DOCUMENT'
  | 'MISSION_EXPIRED'
  | 'DISQUALIFIED';

interface StoreState {
  gameState: GameState;
  teamId: string | null;
  attemptsRemaining: number;
  remainingTime: number; // in seconds, starting at 12 * 60 = 720
  isTimerRunning: boolean;
  isGameFinished: boolean;
  stampedTimeTakenSeconds: number | null;
  isAudioPopupOpen: boolean;
  soundEnabled: boolean;
  cockpitPitch: number;
  cockpitRoll: number;
  solvedChallenges: number[];
  customManualContent: string | null;
  isLeaderboardOpen: boolean;

  setGameState: (state: GameState) => void;
  setTeamId: (id: string) => void;
  decrementAttempts: () => void;
  setRemainingTime: (time: number) => void;
  decrementRemainingTime: () => void;
  toggleSound: () => void;
  setCockpitAttitude: (pitch: number, roll: number) => void;
  markChallengeSolved: (id: number) => void;
  resetChallenges: () => void;
  setCustomManualContent: (content: string) => void;
  setIsLeaderboardOpen: (open: boolean) => void;
  setIsAudioPopupOpen: (open: boolean) => void;
  startGlobalTimer: () => void;
  stampFinalVictory: () => { timeTaken: number; formattedTime: string };
}

export const useStore = create<StoreState>((set, get) => ({
  gameState: 'BOOT',
  teamId: null,
  attemptsRemaining: 2,
  remainingTime: 12 * 60, // 12 minutes (720 seconds)
  isTimerRunning: false,
  isGameFinished: false,
  stampedTimeTakenSeconds: null,
  isAudioPopupOpen: false,
  soundEnabled: true,
  cockpitPitch: 0,
  cockpitRoll: 0,
  solvedChallenges: [],
  customManualContent: null,
  isLeaderboardOpen: false,

  setGameState: (state) => {
    // Timer starts only after admin gate authorization (when entering CRASH_SEQUENCE)
    if (state === 'CRASH_SEQUENCE' && !get().isTimerRunning && !get().isGameFinished) {
      set({ isTimerRunning: true });
    }
    set({ gameState: state });
  },
  setTeamId: (id) => set({ teamId: id }),
  decrementAttempts: () => set((state) => ({ attemptsRemaining: Math.max(0, state.attemptsRemaining - 1) })),
  setRemainingTime: (time) => set({ remainingTime: time }),
  decrementRemainingTime: () => {
    const { remainingTime, isTimerRunning, isGameFinished } = get();
    if (!isTimerRunning || isGameFinished) return;

    if (remainingTime <= 1) {
      set({ remainingTime: 0, isTimerRunning: false, gameState: 'MISSION_EXPIRED' });
    } else {
      set({ remainingTime: remainingTime - 1 });
    }
  },
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setCockpitAttitude: (pitch, roll) => set({ cockpitPitch: pitch, cockpitRoll: roll }),
  markChallengeSolved: (id) => {
    set((state) => {
      const next = state.solvedChallenges.includes(id) 
        ? state.solvedChallenges 
        : [...state.solvedChallenges, id];
      return { solvedChallenges: next };
    });
  },
  resetChallenges: () => set({ 
    solvedChallenges: [], 
    isGameFinished: false, 
    stampedTimeTakenSeconds: null,
    isAudioPopupOpen: false 
  }),
  setCustomManualContent: (content) => set({ customManualContent: content }),
  setIsLeaderboardOpen: (open) => set({ isLeaderboardOpen: open }),
  setIsAudioPopupOpen: (open) => set({ isAudioPopupOpen: open }),
  startGlobalTimer: () => set({ isTimerRunning: true }),

  // Called the exact second the audio file pops up (game ends here!)
  stampFinalVictory: () => {
    const state = get();
    const totalAllowed = 12 * 60; // 720 seconds
    const timeTaken = Math.max(1, totalAllowed - state.remainingTime);

    const m = Math.floor(timeTaken / 60).toString().padStart(2, '0');
    const s = (timeTaken % 60).toString().padStart(2, '0');
    const formattedTime = `${m}m ${s}s`;

    set({
      isTimerRunning: false,
      isGameFinished: true,
      stampedTimeTakenSeconds: timeTaken,
      isAudioPopupOpen: true,
    });

    const teamCode = state.teamId || 'TEAM-001';
    recordTeamCompletion(teamCode, timeTaken, 3).catch(console.error);

    return { timeTaken, formattedTime };
  },
}));
