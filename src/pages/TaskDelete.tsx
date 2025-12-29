import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { useTasks } from '@/context/TaskContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';

export default function TaskDelete() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTask, deleteTask } = useTasks();
  const { toast } = useToast();
  
  const task = getTask(id || '');

  if (!task) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Task Not Found</h1>
          <p className="text-muted-foreground mb-6">The task you're trying to delete doesn't exist.</p>
          <Link to="/tasks">
            <Button variant="gradient">Back to Tasks</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const handleDelete = () => {
    deleteTask(task.id);
    toast({
      title: 'Task Deleted',
      description: 'The task has been permanently deleted.',
      variant: 'destructive',
    });
    navigate('/tasks');
  };

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto">
        {/* Back Button */}
        <Link to={`/tasks/${task.id}`}>
          <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Task
          </Button>
        </Link>

        {/* Delete Confirmation Card */}
        <div className="card-elevated overflow-hidden opacity-0 animate-scale-in" style={{ animationFillMode: 'forwards' }}>
          {/* Warning Header */}
          <div className="p-6 sm:p-8 bg-destructive/5 border-b border-destructive/10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mx-auto mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">Delete Task</h1>
            <p className="text-muted-foreground">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
          </div>

          {/* Task Preview */}
          <div className="p-6 sm:p-8 border-b border-border">
            <div className="rounded-lg bg-secondary/50 p-4">
              <h3 className="font-semibold text-foreground mb-1">{task.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-3">
            <Link to={`/tasks/${task.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="flex-1 gap-2"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              Delete Task
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
