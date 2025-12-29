import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const basename = import.meta.env.MODE === "production" ? "/tasks-manage" : "";
import { AuthProvider } from "@/hooks/useAuth";
import { TaskProvider } from "@/context/TaskContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import TaskList from "./pages/TaskList";
import TaskCreate from "./pages/TaskCreate";
import TaskView from "./pages/TaskView";
import TaskEdit from "./pages/TaskEdit";
import TaskDelete from "./pages/TaskDelete";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <TaskProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
              <Route path="/tasks/create" element={<ProtectedRoute><TaskCreate /></ProtectedRoute>} />
              <Route path="/tasks/:id" element={<ProtectedRoute><TaskView /></ProtectedRoute>} />
              <Route path="/tasks/:id/edit" element={<ProtectedRoute><TaskEdit /></ProtectedRoute>} />
              <Route path="/tasks/:id/delete" element={<ProtectedRoute><TaskDelete /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
