/*
  # AssetLink Dashboard Database Schema
  
  ## Overview
  Complete database structure for AssetLink OS dashboard application with companies, customers, projects, tasks, and personal routines management.
  
  ## New Tables
  
  ### `companies`
  - `id` (uuid, primary key)
  - `name` (text) - Company name
  - `color` (text) - Brand color hex code
  - `created_at` (timestamptz)
  
  ### `customers`
  - `id` (uuid, primary key)
  - `name` (text) - Customer name
  - `company_id` (uuid, foreign key to companies)
  - `created_at` (timestamptz)
  
  ### `projects`
  - `id` (uuid, primary key)
  - `name` (text) - Project name
  - `company_id` (uuid, foreign key to companies)
  - `customer_id` (uuid, foreign key to customers)
  - `status` (text) - Project status (active, planned, completed)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `tasks`
  - `id` (uuid, primary key)
  - `text` (text) - Task description
  - `tag` (text) - Task category tag
  - `content` (text) - Additional task details
  - `project_id` (uuid, foreign key to projects)
  - `customer_id` (uuid, foreign key to customers)
  - `status` (text) - Task status (urgent, todo, doing, done, recurring)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `routines`
  - `id` (uuid, primary key)
  - `text` (text) - Routine description
  - `time` (text) - Time category (morning, day, evening, weekly)
  - `icon` (text) - Emoji icon
  - `completed` (boolean) - Completion status
  - `created_at` (timestamptz)
  
  ### `activity_log`
  - `id` (uuid, primary key)
  - `action` (text) - Action description
  - `details` (text) - Additional details
  - `type` (text) - Activity type (system, user, upgrade)
  - `created_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their data
*/

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL DEFAULT '#6366f1',
  created_at timestamptz DEFAULT now()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'planned',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  tag text DEFAULT '',
  content text DEFAULT '',
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'todo',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create routines table
CREATE TABLE IF NOT EXISTS routines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  time text NOT NULL,
  icon text NOT NULL DEFAULT '⚡',
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create activity_log table
CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  details text DEFAULT '',
  type text NOT NULL DEFAULT 'system',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies for companies
CREATE POLICY "Allow all operations on companies"
  ON companies
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for customers
CREATE POLICY "Allow all operations on customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for projects
CREATE POLICY "Allow all operations on projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for tasks
CREATE POLICY "Allow all operations on tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for routines
CREATE POLICY "Allow all operations on routines"
  ON routines
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for activity_log
CREATE POLICY "Allow read on activity_log"
  ON activity_log
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert on activity_log"
  ON activity_log
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_company ON customers(company_id);
CREATE INDEX IF NOT EXISTS idx_projects_company ON projects(company_id);
CREATE INDEX IF NOT EXISTS idx_projects_customer ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_activity_log_created ON activity_log(created_at DESC);
