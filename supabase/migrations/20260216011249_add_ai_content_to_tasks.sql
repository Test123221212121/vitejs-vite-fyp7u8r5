/*
  # Add AI content field to tasks table

  1. Changes
    - Add `ai_content` TEXT column to tasks table for storing AI-generated content
    - Add `ai_updated_at` TIMESTAMPTZ column to track when AI content was last updated
  
  2. Security
    - Existing RLS policies remain active
*/

-- Add AI content fields to tasks table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'ai_content'
  ) THEN
    ALTER TABLE tasks ADD COLUMN ai_content TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'ai_updated_at'
  ) THEN
    ALTER TABLE tasks ADD COLUMN ai_updated_at TIMESTAMPTZ;
  END IF;
END $$;
