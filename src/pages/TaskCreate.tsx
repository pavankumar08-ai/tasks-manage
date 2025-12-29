import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useTasks } from '@/context/TaskContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TaskFormData } from '@/types/task';

export default function TaskCreate() {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const { toast } = useToast();

  const handleSubmit = (data: TaskFormData) => {
    addTask(data);
    toast({
      title: 'Task Created',
      description: 'Your new task has been created successfully.',
    });
    navigate('/tasks');
  };

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link to="/tasks">
          <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Tasks
          </Button>
        </Link>

        {/* Page Header */}
        <div className="mb-8 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <PlusCircle className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Create New Task</h1>
          </div>
          <p className="text-muted-foreground">
            Fill in the details below to create a new task.
          </p>
        </div>

        {/* Form */}
        <div className="card-elevated p-6 sm:p-8 opacity-0 animate-fade-up stagger-1" style={{ animationFillMode: 'forwards' }}>
          <TaskForm onSubmit={handleSubmit} submitLabel="Create Task" />
        </div>
      </div>
    </PageLayout>
  );
}
