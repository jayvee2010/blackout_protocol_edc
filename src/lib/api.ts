// Database of pre-authorized teams and their 3-digit security access codes (TEAM-001 through TEAM-150)
export interface TeamCredentials {
  password: string;
  attemptsUsed: number;
  disqualified: boolean;
}

export const TEAM_CREDENTIALS: Record<string, TeamCredentials> = {
  'TEAM-001': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-002': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-003': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-004': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-005': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-006': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-007': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-008': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-009': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-010': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-011': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-012': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-013': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-014': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-015': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-016': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-017': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-018': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-019': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-020': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-021': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-022': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-023': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-024': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-025': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-026': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-027': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-028': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-029': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-030': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-031': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-032': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-033': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-034': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-035': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-036': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-037': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-038': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-039': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-040': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-041': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-042': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-043': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-044': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-045': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-046': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-047': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-048': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-049': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-050': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-051': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-052': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-053': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-054': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-055': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-056': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-057': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-058': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-059': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-060': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-061': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-062': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-063': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-064': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-065': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-066': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-067': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-068': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-069': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-070': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-071': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-072': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-073': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-074': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-075': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-076': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-077': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-078': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-079': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-080': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-081': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-082': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-083': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-084': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-085': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-086': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-087': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-088': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-089': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-090': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-091': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-092': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-093': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-094': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-095': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-096': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-097': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-098': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-099': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-100': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-101': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-102': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-103': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-104': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-105': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-106': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-107': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-108': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-109': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-110': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-111': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-112': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-113': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-114': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-115': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-116': { password: '941', attemptsUsed: 0, disqualified: false },
  'TEAM-117': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-118': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-119': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-120': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-121': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-122': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-123': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-124': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-125': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-126': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-127': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-128': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-129': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-130': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-131': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-132': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-133': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-134': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-135': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-136': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-137': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-138': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-139': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-140': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-141': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-142': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-143': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-144': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-145': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-146': { password: '482', attemptsUsed: 0, disqualified: false },
  'TEAM-147': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-148': { password: '673', attemptsUsed: 0, disqualified: false },
  'TEAM-149': { password: '592', attemptsUsed: 0, disqualified: false },
  'TEAM-150': { password: '592', attemptsUsed: 0, disqualified: false },
  // Testing fallback
  'TEAM-TEST': { password: '999', attemptsUsed: 0, disqualified: false },
};

export interface AuthResult {
  success: boolean;
  message?: string;
  attemptsRemaining?: number;
  disqualified?: boolean;
}

export const authenticateTeam = async (teamId: string, password: string): Promise<AuthResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cleanId = teamId.trim().toUpperCase();
      const team = TEAM_CREDENTIALS[cleanId];
      
      if (!team) {
        resolve({ success: false, message: 'UNKNOWN TEAM IDENTIFIER' });
        return;
      }

      if (team.disqualified) {
        resolve({ success: false, disqualified: true, message: 'MISSION ACCESS REVOKED' });
        return;
      }

      if (team.password === password.trim()) {
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
    }, 600); // Realistic authentication delay
  });
};
