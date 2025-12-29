import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { TaskStats } from '@/components/tasks/TaskStats';
import { TaskCard } from '@/components/tasks/TaskCard';
import { useTasks } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight } from 'lucide-react';

const Index = () => {
  const { tasks } = useTasks();
  const recentTasks = tasks.slice(0, 4);

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center py-8 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Manage Your Tasks
            <span className="text-gradient block sm:inline"> Effortlessly</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Stay organized and boost your productivity with our intuitive task management system. 
            Create, track, and complete tasks with ease.
          </p>
          <Link to="/tasks/create">
            <Button variant="gradient" size="xl" className="gap-2">
              <Plus className="h-5 w-5" />
              Create Your First Task
            </Button>
          </Link>
        </section>

        {/* Stats */}
        <section>
          <TaskStats />
        </section>

        {/* Recent Tasks */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Recent Tasks
            </h2>
            <Link to="/tasks">
              <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {recentTasks.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {recentTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
            </div>
          ) : (
            <div className="card-elevated p-12 text-center">
              <p className="text-muted-foreground mb-4">No tasks yet. Create your first task to get started!</p>
              <Link to="/tasks/create">
                <Button variant="gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
