import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseProvider } from "@/contexts/SupabaseContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";

// Auth status checker component for debugging
import { supabase } from "./lib/supabase";
import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";

const AuthChecker = () => {
  const [authStatus, setAuthStatus] = useState<{
    session: any;
    user: any;
    loading: boolean;
    error: any;
  }>({
    session: null,
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        const { data: userData, error: userError } = await supabase.auth.getUser();

        setAuthStatus({
          session: sessionData?.session,
          user: userData?.user,
          loading: false,
          error: sessionError || userError
        });
      } catch (error) {
        setAuthStatus({
          session: null,
          user: null,
          loading: false,
          error: error
        });
      }
    };

    checkAuth();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (authStatus.loading) {
    return <div className="p-8">Loading auth status...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth Status Check</h1>

      <div className="mb-4 p-4 bg-gray-100 rounded-md">
        <h2 className="font-semibold">Authentication Status</h2>
        <p className="mb-2">Is Authenticated: {authStatus.session ? "✅ YES" : "❌ NO"}</p>

        {authStatus.error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
            <h3 className="font-semibold">Error:</h3>
            <pre className="text-sm overflow-auto p-2">{JSON.stringify(authStatus.error, null, 2)}</pre>
          </div>
        )}

        {authStatus.session && (
          <div className="mt-4">
            <h3 className="font-semibold">Session Info:</h3>
            <pre className="text-sm bg-white p-2 rounded overflow-auto mt-2">
              {JSON.stringify(authStatus.session, null, 2)}
            </pre>
          </div>
        )}

        {authStatus.user && (
          <div className="mt-4">
            <h3 className="font-semibold">User Info:</h3>
            <pre className="text-sm bg-white p-2 rounded overflow-auto mt-2">
              {JSON.stringify(authStatus.user, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6 flex gap-2">
          {authStatus.session ? (
            <Button onClick={signOut}>Sign Out</Button>
          ) : (
            <Button onClick={() => window.location.href = "/login"}>
              Go to Login
            </Button>
          )}
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

// Provide all necessary contexts
const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SupabaseProvider>
        <Toaster />
        <Sonner />
        {children}
      </SupabaseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/check-auth" element={<AuthChecker />} />
        <Route path="/login" element={<LoginPage />} />
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

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        } />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        } />

        {/* Catch all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AppProviders>
);

export default App;
