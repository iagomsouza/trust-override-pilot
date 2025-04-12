
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          
          {/* Placeholder routes for footer links */}
          <Route path="/features" element={<PlaceholderPage title="Features" />} />
          <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
          <Route path="/api" element={<PlaceholderPage title="API" />} />
          <Route path="/docs" element={<PlaceholderPage title="Documentation" />} />
          <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
          <Route path="/resources" element={<PlaceholderPage title="Resources" />} />
          <Route path="/resources/case-studies" element={<PlaceholderPage title="Case Studies" />} />
          <Route path="/resources/guides" element={<PlaceholderPage title="Guides" />} />
          <Route path="/support" element={<PlaceholderPage title="Support" />} />
          <Route path="/about" element={<PlaceholderPage title="About" />} />
          <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
          <Route path="/partners" element={<PlaceholderPage title="Partners" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
          <Route path="/security" element={<PlaceholderPage title="Security" />} />
          <Route path="/compliance" element={<PlaceholderPage title="Compliance" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
