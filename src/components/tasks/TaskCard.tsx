import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Task } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  const priorityStyles = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low',
  };

  const statusStyles = {
    pending: 'bg-muted text-muted-foreground',
    'in-progress': 'bg-primary/10 text-primary',
    completed: 'bg-success/10 text-success',
  };

  const statusLabels = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
  };

  return (
    <Link
      to={`/tasks/${task.id}`}
      className={cn(
        "block card-elevated p-5 transition-all duration-300 hover:translate-y-[-2px] group opacity-0 animate-fade-up",
        `stagger-${(index % 4) + 1}`
      )}
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={cn("status-badge border", priorityStyles[task.priority])}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            <Badge className={cn("status-badge", statusStyles[task.status])}>
              {statusLabels[task.status]}
            </Badge>
          </div>
          
          <h3 className="font-display font-semibold text-foreground text-lg mb-1.5 truncate group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {task.description}
          </p>
          
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Calendar className="h-3.5 w-3.5" />
            <span>Due {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-secondary-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
