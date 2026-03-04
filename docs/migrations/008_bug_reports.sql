-- Migration 008: bug_reports table
-- Run in Supabase SQL Editor after deploying the /api/report-bug endpoint.

CREATE TABLE IF NOT EXISTS bug_reports (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  description   text        NOT NULL,
  steps         text,
  contact_email text,
  status        text        NOT NULL DEFAULT 'new'
                CHECK (status IN ('new', 'investigating', 'fixed', 'wont-fix')),
  created_at    timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated) can insert a report
CREATE POLICY "Anyone can submit bug reports"
  ON bug_reports FOR INSERT
  WITH CHECK (true);

-- Users can only read their own reports (optional — mostly admin access)
CREATE POLICY "Users can view own bug reports"
  ON bug_reports FOR SELECT
  USING (auth.uid() = user_id);
