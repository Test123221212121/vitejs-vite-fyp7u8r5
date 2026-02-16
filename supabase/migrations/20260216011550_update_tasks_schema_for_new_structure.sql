/*
  # Update tasks table schema

  1. Changes
    - Rename `text` column to `title`
    - Rename `content` column to `description`
    - Add `priority` column with values: low, medium, high, critical
    - Remove `tag` column as it's no longer needed
  
  2. Security
    - All existing RLS policies remain active
*/

-- Rename text column to title
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'text'
  ) THEN
    ALTER TABLE tasks RENAME COLUMN text TO title;
  END IF;
END $$;

-- Rename content column to description
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'content'
  ) THEN
    ALTER TABLE tasks RENAME COLUMN content TO description;
  END IF;
END $$;

-- Add priority column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'priority'
  ) THEN
    ALTER TABLE tasks ADD COLUMN priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical'));
  END IF;
END $$;

-- Drop tag column if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'tag'
  ) THEN
    ALTER TABLE tasks DROP COLUMN tag;
  END IF;
END $$;

-- Update existing tasks to have medium priority if NULL
UPDATE tasks SET priority = 'medium' WHERE priority IS NULL;
