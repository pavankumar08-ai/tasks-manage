import { useTasks } from '@/context/TaskContext';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TaskStats() {
  const { tasks } = useTasks();

  const stats = [
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: ListTodo,
      color: 'text-foreground',
      bg: 'bg-secondary',
    },
    {
      label: 'Completed',
      value: tasks.filter(t => t.status === 'completed').length,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'In Progress',
      value: tasks.filter(t => t.status === 'in-progress').length,
      icon: Clock,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Pending',
      value: tasks.filter(t => t.status === 'pending').length,
      icon: AlertCircle,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "card-elevated p-5 opacity-0 animate-fade-up",
            `stagger-${index + 1}`
          )}
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="flex items-center gap-4">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", stat.bg)}>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
