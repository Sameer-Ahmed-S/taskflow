-- 002_add_priority.sql — TaskFlow schema v2, SQLite dialect (ADR-005)
-- Implements specs/001-task-priority (taskflow-spec @ 9fc092b): Task.priority (FR-7)
-- Additive migration: existing rows get 'medium' via the column default.

ALTER TABLE tasks ADD COLUMN priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high'));
