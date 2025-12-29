import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
              <CheckSquare className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              TaskFlow
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" active={location.pathname === '/'}>
              Dashboard
            </NavLink>
            <NavLink to="/tasks" active={location.pathname === '/tasks'}>
              All Tasks
            </NavLink>
          </nav>

          <Link to="/tasks/create">
            <Button variant="gradient" size="default" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Task</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      {children}
    </Link>
  );
}
