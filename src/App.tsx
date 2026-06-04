import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Guide from "./pages/Guide";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Reference from "./pages/Reference";
import Library from "./pages/Library";
import Documents from "./pages/Documents";
import Presentations from "./pages/Presentations";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuth, login, logout } = useAuth();

  // Пока проверяем токен — показываем заглушку
  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-[hsl(var(--beige))] flex items-center justify-center font-golos">
        <div className="flex flex-col items-center gap-3 text-[hsl(var(--muted-foreground))]">
          <div className="w-8 h-8 border-2 border-[hsl(var(--burgundy))]/30 border-t-[hsl(var(--burgundy))] rounded-full animate-spin" />
          <span className="text-sm">Загрузка…</span>
        </div>
      </div>
    );
  }

  // Не авторизован — /admin открыт отдельно, остальное — логин
  if (!isAuth) {
    if (window.location.pathname.startsWith("/admin")) {
      return <BrowserRouter><Routes><Route path="/admin" element={<Admin />} /><Route path="*" element={<Login onSuccess={login} />} /></Routes></BrowserRouter>;
    }
    return <Login onSuccess={login} />;
  }

  // Авторизован — полный доступ
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Index onLogout={logout} />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/reference" element={<Reference />} />
        <Route path="/library" element={<Library />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/presentations" element={<Presentations />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppRoutes />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;