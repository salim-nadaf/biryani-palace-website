import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load components not needed for initial render
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
const MenuPage = lazy(() => import("./pages/Menu"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter> {/* ✅ Router must be outside all context hooks that use react-router */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Suspense fallback={null}>
              <Toaster />
              <Sonner />
            </Suspense>
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
              <Route
                path="/biryani-calculator"
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  }>
                    <CalculatorPage />
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
