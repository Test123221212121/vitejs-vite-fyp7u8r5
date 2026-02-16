import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Company, Customer, Project, Task, Routine } from '@/types';

export function useData() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    try {
      setLoading(true);
      const [companiesRes, customersRes, projectsRes, tasksRes, routinesRes] = await Promise.all([
        supabase.from('companies').select('*').order('name'),
        supabase.from('customers').select('*').order('name'),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('routines').select('*').order('created_at'),
      ]);

      if (companiesRes.data) setCompanies(companiesRes.data);
      if (customersRes.data) setCustomers(customersRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
      if (tasksRes.data) setTasks(tasksRes.data);
      if (routinesRes.data) setRoutines(routinesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getProjectById = (id: string) => {
    return projects.find(p => p.id === id);
  };

  const getCompanyById = (id: string) => {
    return companies.find(c => c.id === id);
  };

  const getCustomerById = (id: string) => {
    return customers.find(c => c.id === id);
  };

  return {
    companies,
    customers,
    projects,
    tasks,
    routines,
    loading,
    getTasksByStatus,
    getProjectById,
    getCompanyById,
    getCustomerById,
    reload: loadAllData,
    refreshData: loadAllData,
  };
}
