export interface Company {
  id: string;
  name: string;
  color: string;
  created_at?: string;
}

export interface Customer {
  id: string;
  name: string;
  company_id: string;
  created_at?: string;
}

export interface Project {
  id: string;
  name: string;
  company_id: string;
  customer_id?: string;
  status: 'active' | 'planned' | 'completed';
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  project_id?: string;
  customer_id?: string;
  status: 'urgent' | 'todo' | 'doing' | 'done' | 'recurring';
  ai_content?: string;
  ai_updated_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Routine {
  id: string;
  text: string;
  time: 'morning' | 'day' | 'evening' | 'weekly';
  icon: string;
  completed: boolean;
  created_at?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  type: 'system' | 'user' | 'upgrade';
  created_at: string;
}
