import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { useTasks } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Calendar, Clock, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function TaskView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTask, loading } = useTasks();
  
  const task = getTask(id || '');

  if (loading) {
    return (
      <PageLayout>
        <div className="max-w-3xl mx-auto">
          <div className="card-elevated p-8 animate-pulse">
            <div className="h-6 bg-muted rounded w-1/4 mb-4" />
            <div className="h-8 bg-muted rounded w-3/4 mb-6" />
            <div className="h-4 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!task) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Task Not Found</h1>
          <p className="text-muted-foreground mb-6">The task you're looking for doesn't exist.</p>
          <Link to="/tasks">
            <Button variant="gradient">Back to Tasks</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

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
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link to="/tasks">
          <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Tasks
          </Button>
        </Link>

        {/* Task Details Card */}
        <div className="card-elevated overflow-hidden opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          {/* Header with badges */}
          <div className="p-6 sm:p-8 border-b border-border">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={cn("status-badge border", priorityStyles[task.priority])}>
                <Flag className="h-3 w-3 mr-1" />
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </Badge>
              <Badge className={cn("status-badge", statusStyles[task.status])}>
                {statusLabels[task.status]}
              </Badge>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">{task.title}</h1>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-2">Description</h2>
              <p className="text-foreground leading-relaxed">{task.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Due Date</p>
                  <p className="font-medium text-foreground">
                    {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="font-medium text-foreground">
                    {format(new Date(task.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-foreground">
                    {format(new Date(task.updatedAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 sm:p-8 bg-secondary/30 border-t border-border flex flex-col sm:flex-row gap-3">
            <Link to={`/tasks/${task.id}/edit`} className="flex-1">
              <Button variant="default" className="w-full gap-2">
                <Edit className="h-4 w-4" />
                Edit Task
              </Button>
            </Link>
            <Link to={`/tasks/${task.id}/delete`} className="flex-1">
              <Button variant="destructive" className="w-full gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Task
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
