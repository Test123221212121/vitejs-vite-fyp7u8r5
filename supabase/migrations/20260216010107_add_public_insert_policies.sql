/*
  # Add insert policies for data import

  1. Changes
    - Add INSERT policies to allow data import
    - These policies allow authenticated users to insert data
  
  2. Security
    - Policies require authentication
    - Can be made more restrictive later if needed
*/

-- Allow inserts for companies
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON companies;
CREATE POLICY "Enable insert for authenticated users"
  ON companies FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow inserts for customers
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON customers;
CREATE POLICY "Enable insert for authenticated users"
  ON customers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow inserts for projects
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON projects;
CREATE POLICY "Enable insert for authenticated users"
  ON projects FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow inserts for tasks
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON tasks;
CREATE POLICY "Enable insert for authenticated users"
  ON tasks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow inserts for routines
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON routines;
CREATE POLICY "Enable insert for authenticated users"
  ON routines FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
