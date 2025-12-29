import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useTasks } from '@/context/TaskContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { TaskFormData } from '@/types/task';

export default function TaskEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTask, updateTask } = useTasks();
  const { toast } = useToast();
  
  const task = getTask(id || '');

  if (!task) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Task Not Found</h1>
          <p className="text-muted-foreground mb-6">The task you're trying to edit doesn't exist.</p>
          <Link to="/tasks">
            <Button variant="gradient">Back to Tasks</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const handleSubmit = (data: TaskFormData) => {
    updateTask(task.id, data);
    toast({
      title: 'Task Updated',
      description: 'Your task has been updated successfully.',
    });
    navigate(`/tasks/${task.id}`);
  };

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link to={`/tasks/${task.id}`}>
          <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Task
          </Button>
        </Link>

        {/* Page Header */}
        <div className="mb-8 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Edit className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Edit Task</h1>
          </div>
          <p className="text-muted-foreground">
            Make changes to your task below.
          </p>
        </div>

        {/* Form */}
        <div className="card-elevated p-6 sm:p-8 opacity-0 animate-fade-up stagger-1" style={{ animationFillMode: 'forwards' }}>
          <TaskForm
            defaultValues={{
              title: task.title,
              description: task.description,
              priority: task.priority,
              status: task.status,
              dueDate: task.dueDate,
            }}
            onSubmit={handleSubmit}
            submitLabel="Update Task"
          />
        </div>
      </div>
    </PageLayout>
  );
}
