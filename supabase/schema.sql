-- ========================================================
-- MISSION AI: IMPOSSIBLE - SUPABASE POSTGRESQL SCHEMA
-- ========================================================

-- 1. Create Teams Table
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_code TEXT UNIQUE NOT NULL,
  team_name TEXT NOT NULL,
  password TEXT NOT NULL,
  attempts_used INT DEFAULT 0,
  max_attempts INT DEFAULT 2,
  is_disqualified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Mission Leaderboard Table
CREATE TABLE IF NOT EXISTS public.mission_leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_code TEXT UNIQUE NOT NULL REFERENCES public.teams(team_code) ON UPDATE CASCADE,
  team_name TEXT NOT NULL,
  time_taken_seconds INT NOT NULL,
  formatted_time TEXT NOT NULL,
  challenges_completed INT DEFAULT 3,
  status TEXT DEFAULT 'COMPLETED',
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow public read access to leaderboard so participants and admins can view rankings
CREATE POLICY "Allow public read on mission_leaderboard"
  ON public.mission_leaderboard
  FOR SELECT
  USING (true);

-- Allow public insert/upsert on mission_leaderboard for game completion
CREATE POLICY "Allow public upsert on mission_leaderboard"
  ON public.mission_leaderboard
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Allow public select on teams for login authentication
CREATE POLICY "Allow public select on teams"
  ON public.teams
  FOR SELECT
  USING (true);

-- Populate initial teams
INSERT INTO public.teams (team_code, team_name, password) VALUES
  ('TEAM-001', 'ALPHA SQUADRON', '123'),
  ('TEAM-002', 'BRAVO TACTICAL', '456'),
  ('TEAM-TEST', 'CYBER SPECIALIST', '999'),
  ('GHOST-01', 'SPECTRE OPERATIVE', '777')
ON CONFLICT (team_code) DO NOTHING;
