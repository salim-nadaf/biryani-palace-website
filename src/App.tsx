import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load the menu page for better initial load performance
const MenuPage = lazy(() => import("./pages/Menu"));

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter> {/* ✅ Router must be outside all context hooks that use react-router */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route 
                path="/menu" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  }>
                    <MenuPage />
                  </Suspense>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
