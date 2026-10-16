// Serverless endpoint for Vercel
// Stores & merges state in memory per container and syncs with state.json
const fs = require('fs');
const path = require('path');

let memoryState = null;

function getState() {
  if (memoryState) return memoryState;
  try {
    const data = fs.readFileSync(path.join(process.cwd(), 'state.json'), 'utf8');
    memoryState = JSON.parse(data);
  } catch (e) {
    memoryState = { groups: [], sessions: {}, settings: {}, updated: Date.now() };
  }
  return memoryState;
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const state = getState();

  if (req.method === 'GET') {
    return res.status(200).json({ ...state, now: Date.now() });
  }

  if (req.method === 'POST') {
    try {
      const d = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

      // Merge incoming groups (by id)
      const currentGroups = state.groups || [];
      const incomingGroups = Array.isArray(d.groups) ? d.groups : [];
      const groupMap = new Map();
      currentGroups.forEach(g => { if (g && g.id) groupMap.set(g.id, g); });
      incomingGroups.forEach(g => {
        if (g && g.id) {
          const existing = groupMap.get(g.id);
          groupMap.set(g.id, existing ? { ...existing, ...g } : g);
        }
      });
      const mergedGroups = Array.from(groupMap.values());

      // Merge incoming sessions (by group id)
      const currentSessions = state.sessions || {};
      const incomingSessions = (d.sessions && typeof d.sessions === 'object') ? d.sessions : {};
      const mergedSessions = { ...currentSessions };
      for (const [gid, s] of Object.entries(incomingSessions)) {
        mergedSessions[gid] = { ...(currentSessions[gid] || {}), ...s };
      }

      // Merge settings
      const mergedSettings = { ...(state.settings || {}), ...(d.settings || {}) };

      memoryState = {
        groups: mergedGroups,
        sessions: mergedSessions,
        settings: mergedSettings,
        updated: Date.now()
      };

      try {
        fs.writeFileSync(path.join(process.cwd(), 'state.json'), JSON.stringify(memoryState, null, 2));
      } catch (e) {}

      return res.status(200).json({ ok: true, state: memoryState });
    } catch (e) {
      return res.status(400).send('Bad Request');
    }
  }

  res.status(405).send('Method Not Allowed');
};
