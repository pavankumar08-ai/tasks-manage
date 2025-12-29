import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "@/context/TaskContext";
import Index from "./pages/Index";
import TaskList from "./pages/TaskList";
import TaskCreate from "./pages/TaskCreate";
import TaskView from "./pages/TaskView";
import TaskEdit from "./pages/TaskEdit";
import TaskDelete from "./pages/TaskDelete";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TaskProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/create" element={<TaskCreate />} />
            <Route path="/tasks/:id" element={<TaskView />} />
            <Route path="/tasks/:id/edit" element={<TaskEdit />} />
            <Route path="/tasks/:id/delete" element={<TaskDelete />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TaskProvider>
  </QueryClientProvider>
);

export default App;
