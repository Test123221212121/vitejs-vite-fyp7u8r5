import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importData() {
  try {
    console.log('Loading data from JSON files...');
    
    const metadata = JSON.parse(readFileSync('metadata.json', 'utf-8'));
    const kanban = JSON.parse(readFileSync('kanban.json', 'utf-8'));

    console.log('\nImporting companies...');
    const { data: companies, error: compError } = await supabase
      .from('companies')
      .upsert(metadata.companies.map(c => ({
        id: c.id,
        name: c.name,
        color: c.color
      })), { onConflict: 'id' });
    
    if (compError) throw compError;
    console.log(`✓ Imported ${metadata.companies.length} companies`);

    console.log('\nImporting customers...');
    const { error: custError } = await supabase
      .from('customers')
      .upsert(metadata.customers.map(c => ({
        id: c.id,
        name: c.name,
        company_id: c.companyId
      })), { onConflict: 'id' });
    
    if (custError) throw custError;
    console.log(`✓ Imported ${metadata.customers.length} customers`);

    console.log('\nImporting projects...');
    const { error: projError } = await supabase
      .from('projects')
      .upsert(metadata.projects.map(p => ({
        id: p.id,
        name: p.name,
        company_id: p.companyId,
        customer_id: p.customerId || null,
        status: p.status || 'planned'
      })), { onConflict: 'id' });
    
    if (projError) throw projError;
    console.log(`✓ Imported ${metadata.projects.length} projects`);

    console.log('\nImporting tasks...');
    const allTasks = [
      ...kanban.urgent.map(t => ({ ...t, status: 'urgent' })),
      ...kanban.todo.map(t => ({ ...t, status: 'todo' })),
      ...kanban.doing.map(t => ({ ...t, status: 'doing' })),
      ...kanban.done.map(t => ({ ...t, status: 'done' })),
      ...(kanban.recurring || []).map(t => ({ ...t, status: 'recurring' }))
    ];

    const { error: taskError } = await supabase
      .from('tasks')
      .upsert(allTasks.map(t => ({
        id: t.id,
        title: t.text || '',
        description: t.content || '',
        priority: t.tag === 'HIGH' ? 'high' : t.tag === 'CRITICAL' ? 'critical' : t.tag === 'LOW' ? 'low' : 'medium',
        project_id: t.projectId || null,
        customer_id: t.customerId || null,
        status: t.status
      })), { onConflict: 'id' });
    
    if (taskError) throw taskError;
    console.log(`✓ Imported ${allTasks.length} tasks`);

    if (metadata.routines) {
      console.log('\nImporting routines...');
      const { error: routineError } = await supabase
        .from('routines')
        .upsert(metadata.routines.map(r => ({
          id: r.id || `r_${Date.now()}_${Math.random()}`,
          text: r.text,
          time: r.time,
          icon: r.icon || '⚡',
          completed: r.completed || false
        })), { onConflict: 'id' });
      
      if (routineError) throw routineError;
      console.log(`✓ Imported ${metadata.routines.length} routines`);
    }

    console.log('\n✅ Import completed successfully!');
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

importData();
