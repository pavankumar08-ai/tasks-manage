import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (data: TaskFormData) => void;
  updateTask: (id: string, data: TaskFormData) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Setup',
    description: 'Create a comprehensive design system with color tokens, typography scales, and component variants for consistent UI across the application.',
    priority: 'high',
    status: 'completed',
    dueDate: '2024-01-15',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '2',
    title: 'User Authentication Flow',
    description: 'Implement secure login and registration with email verification, password reset functionality, and session management.',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-01-20',
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-12T11:00:00Z',
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Build interactive charts and metrics display for task completion rates, productivity trends, and team performance.',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-01-25',
    createdAt: '2024-01-08T15:00:00Z',
    updatedAt: '2024-01-08T15:00:00Z',
  },
  {
    id: '4',
    title: 'API Documentation',
    description: 'Write comprehensive API documentation with examples, error codes, and integration guides for developers.',
    priority: 'low',
    status: 'pending',
    dueDate: '2024-02-01',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data: TaskFormData) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, data: TaskFormData) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...data, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTask = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTask }}>
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
