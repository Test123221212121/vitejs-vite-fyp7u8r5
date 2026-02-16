/*
  # Update ID columns to use text instead of UUID

  1. Changes
    - Convert all ID columns from UUID to TEXT to support custom IDs like "c1", "p1", "cl4"
    - Maintain all foreign key relationships
    - Preserve existing data structure and RLS policies
  
  2. Security
    - All existing RLS policies remain active
*/

-- Drop existing foreign key constraints
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_company_id_fkey;
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_company_id_fkey;
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_customer_id_fkey;
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_project_id_fkey;
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_customer_id_fkey;

-- Update companies table
ALTER TABLE companies ALTER COLUMN id DROP DEFAULT;
ALTER TABLE companies ALTER COLUMN id TYPE TEXT;

-- Update customers table
ALTER TABLE customers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE customers ALTER COLUMN id TYPE TEXT;
ALTER TABLE customers ALTER COLUMN company_id TYPE TEXT;

-- Update projects table
ALTER TABLE projects ALTER COLUMN id DROP DEFAULT;
ALTER TABLE projects ALTER COLUMN id TYPE TEXT;
ALTER TABLE projects ALTER COLUMN company_id TYPE TEXT;
ALTER TABLE projects ALTER COLUMN customer_id TYPE TEXT;

-- Update tasks table
ALTER TABLE tasks ALTER COLUMN id DROP DEFAULT;
ALTER TABLE tasks ALTER COLUMN id TYPE TEXT;
ALTER TABLE tasks ALTER COLUMN project_id TYPE TEXT;
ALTER TABLE tasks ALTER COLUMN customer_id TYPE TEXT;

-- Update routines table
ALTER TABLE routines ALTER COLUMN id DROP DEFAULT;
ALTER TABLE routines ALTER COLUMN id TYPE TEXT;

-- Update activity_log table
ALTER TABLE activity_log ALTER COLUMN id DROP DEFAULT;
ALTER TABLE activity_log ALTER COLUMN id TYPE TEXT;

-- Re-add foreign key constraints
ALTER TABLE customers 
  ADD CONSTRAINT customers_company_id_fkey 
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE;

ALTER TABLE projects 
  ADD CONSTRAINT projects_company_id_fkey 
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE;

ALTER TABLE projects 
  ADD CONSTRAINT projects_customer_id_fkey 
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL;

ALTER TABLE tasks 
  ADD CONSTRAINT tasks_project_id_fkey 
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL;

ALTER TABLE tasks 
  ADD CONSTRAINT tasks_customer_id_fkey 
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL;
