// Mock backend to represent Supabase server-side logic
// In production, this would be actual Supabase calls using RLS and edge functions/secret RPCs

export interface AuthResult {
  success: boolean;
  message?: string;
  attemptsRemaining?: number;
  disqualified?: boolean;
}

// Simulated Database
const mockDatabase = {
  'TEAM-001': { password: '123', attemptsUsed: 0, disqualified: false },
  'TEAM-002': { password: '456', attemptsUsed: 0, disqualified: false },
  'TEAM-TEST': { password: '999', attemptsUsed: 0, disqualified: false },
};

export const authenticateTeam = async (teamId: string, password: string): Promise<AuthResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const team = mockDatabase[teamId as keyof typeof mockDatabase];
      
      if (!team) {
        resolve({ success: false, message: 'UNKNOWN TEAM IDENTIFIER' });
        return;
      }

      if (team.disqualified) {
        resolve({ success: false, disqualified: true, message: 'MISSION ACCESS REVOKED' });
        return;
      }

      if (team.password === password) {
        resolve({ success: true });
        return;
      } else {
        team.attemptsUsed += 1;
        const attemptsRemaining = 2 - team.attemptsUsed;
        
        if (attemptsRemaining <= 0) {
          team.disqualified = true;
          resolve({ success: false, disqualified: true, message: 'SECURITY LOCKOUT' });
        } else {
          resolve({ success: false, attemptsRemaining, message: 'AUTHENTICATION FAILED' });
        }
      }
    }, 1000); // Simulate network latency
  });
};
