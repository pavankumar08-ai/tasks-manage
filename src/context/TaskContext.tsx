import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFormData, Priority, Status } from '@/types/task';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (data: TaskFormData) => Promise<void>;
  updateTask: (id: string, data: TaskFormData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Map database row to Task type
const mapDbRowToTask = (row: {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}): Task => ({
  id: row.id,
  title: row.title,
  description: row.description || '',
  priority: row.priority as Priority,
  status: row.status as Status,
  dueDate: row.due_date || '',
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from database
  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data?.map(mapDbRowToTask) || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (data: TaskFormData) => {
    try {
      const { data: newTask, error } = await supabase
        .from('tasks')
        .insert({
          title: data.title,
          description: data.description,
          priority: data.priority,
          status: data.status,
          due_date: data.dueDate || null,
        })
        .select()
        .single();

      if (error) throw error;
      setTasks(prev => [mapDbRowToTask(newTask), ...prev]);
      toast.success('Task created successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to create task');
    }
  };

  const updateTask = async (id: string, data: TaskFormData) => {
    try {
      const { data: updatedTask, error } = await supabase
        .from('tasks')
        .update({
          title: data.title,
          description: data.description,
          priority: data.priority,
          status: data.status,
          due_date: data.dueDate || null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTasks(prev =>
        prev.map(task => (task.id === id ? mapDbRowToTask(updatedTask) : task))
      );
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id);

      if (error) throw error;
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const getTask = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask, updateTask, deleteTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
}
