import { create } from 'zustand';

export type GameState = 
  | 'BOOT' 
  | 'AUTHENTICATION' 
  | 'CRASH_SEQUENCE' 
  | 'MISSION_START' 
  | 'MISSION_EXPIRED'
  | 'DISQUALIFIED';

interface StoreState {
  gameState: GameState;
  teamId: string | null;
  attemptsRemaining: number;
  remainingTime: number; // in seconds
  setGameState: (state: GameState) => void;
  setTeamId: (id: string) => void;
  decrementAttempts: () => void;
  setRemainingTime: (time: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  gameState: 'BOOT',
  teamId: null,
  attemptsRemaining: 2,
  remainingTime: 12 * 60, // 12 minutes
  setGameState: (state) => set({ gameState: state }),
  setTeamId: (id) => set({ teamId: id }),
  decrementAttempts: () => set((state) => ({ attemptsRemaining: Math.max(0, state.attemptsRemaining - 1) })),
  setRemainingTime: (time) => set({ remainingTime: time }),
}));
