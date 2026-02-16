/*
  # Add public read and write policies

  1. Changes
    - Add SELECT policies to allow reading data
    - Add UPDATE and DELETE policies for full CRUD operations
  
  2. Security
    - Public access for demo purposes
    - Can be restricted later with proper authentication
*/

-- Companies policies
DROP POLICY IF EXISTS "Enable read access for all users" ON companies;
CREATE POLICY "Enable read access for all users"
  ON companies FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Enable update for all users" ON companies;
CREATE POLICY "Enable update for all users"
  ON companies FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Customers policies
DROP POLICY IF EXISTS "Enable read access for all users" ON customers;
CREATE POLICY "Enable read access for all users"
  ON customers FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Enable update for all users" ON customers;
CREATE POLICY "Enable update for all users"
  ON customers FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Projects policies
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
CREATE POLICY "Enable read access for all users"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Enable update for all users" ON projects;
CREATE POLICY "Enable update for all users"
  ON projects FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Tasks policies
DROP POLICY IF EXISTS "Enable read access for all users" ON tasks;
CREATE POLICY "Enable read access for all users"
  ON tasks FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Enable update for all users" ON tasks;
CREATE POLICY "Enable update for all users"
  ON tasks FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON tasks;
CREATE POLICY "Enable delete for all users"
  ON tasks FOR DELETE
  TO anon, authenticated
  USING (true);

-- Routines policies
DROP POLICY IF EXISTS "Enable read access for all users" ON routines;
CREATE POLICY "Enable read access for all users"
  ON routines FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Enable update for all users" ON routines;
CREATE POLICY "Enable update for all users"
  ON routines FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Activity log policies
DROP POLICY IF EXISTS "Enable read access for all users" ON activity_log;
CREATE POLICY "Enable read access for all users"
  ON activity_log FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON activity_log;
CREATE POLICY "Enable insert for all users"
  ON activity_log FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
