import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { auth, supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

// Error boundary class component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("LoginPage error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle>Something Went Wrong</CardTitle>
              <CardDescription className="mt-2">
                There was an error loading the login page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 mb-4 bg-destructive/10 rounded-md text-sm">
                <p className="font-semibold">Error:</p>
                <p className="font-mono">{this.state.error?.message}</p>
              </div>
              <Button
                onClick={() => window.location.href = "/"}
                className="w-full"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main login component
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication status directly
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth check error:', error);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(!!data.session);

          // If authenticated, check if they have completed onboarding
          if (data.session) {
            try {
              // Check if user profile exists
              const { data: userData, error: profileError } = await supabase
                .from('users')
                .select('face_image_url')
                .eq('uid', data.session.user.id)
                .single();

              // If no user profile exists, create one
              if (profileError && profileError.code === 'PGRST116') {
                console.log('No user profile found during session check, creating one...');

                // Insert a new user record
                const { error: insertError } = await supabase
                  .from('users')
                  .insert([{ uid: data.session.user.id }]);

                if (insertError) {
                  console.error('Error creating user profile during session check:', insertError);
                  // Continue to onboarding anyway
                }

                navigate('/onboarding');
                return;
              }

              if (profileError && profileError.code !== 'PGRST116') {
                console.error('Error checking user profile during session check:', profileError);
                // Continue to dashboard on error
                navigate('/dashboard');
                return;
              }

              if (userData) {
                // User has a profile, check if onboarding is complete
                if (userData.face_image_url) {
                  navigate('/dashboard');
                } else {
                  navigate('/onboarding');
                }
              }
            } catch (profileCheckError) {
              console.error('Profile check error:', profileCheckError);
              // If there's an error, we'll still try to go to dashboard
              navigate('/dashboard');
            }
          }
        }
      } catch (e) {
        console.error('Unexpected auth error:', e);
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await auth.signIn(email, password);

      if (error) {
        console.error('Sign in error:', error);
        let errorMessage = error.message;

        // Provide more user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email to confirm your account before signing in.';
        }

        toast({
          title: "Authentication failed",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      // Get current user after successful authentication
      const currentUser = await supabase.auth.getUser();
      const userId = currentUser.data.user?.id;

      if (!userId) {
        toast({
          title: "Authentication error",
          description: "Could not retrieve user information. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Check if user has completed onboarding
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('uid', userId)
        .single();

      if (userError) {
        // If the error is that no row was found, we need to create the user profile
        if (userError.code === 'PGRST116') {
          console.log('No user profile found, creating one...');
          // Create user profile record
          const { error: insertError } = await supabase
            .from('users')
            .insert([{ uid: userId }]);

          if (insertError) {
            console.error('Error creating user profile:', insertError);
            toast({
              title: "Profile setup error",
              description: "There was an issue setting up your profile. Please try again.",
              variant: "destructive",
            });
            return;
          }

          // Redirect to onboarding to complete profile
          toast({
            title: "Welcome!",
            description: "Please complete your profile to continue.",
          });
          navigate('/onboarding');
          return;
        } else {
          console.error('Error fetching user data:', userError);
          toast({
            title: "Error retrieving profile",
            description: "There was an issue retrieving your profile. Please try again.",
            variant: "destructive",
          });
          return;
        }
      }

      // If user exists and has face_image_url, they've completed onboarding
      if (userData && userData.face_image_url) {
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
        navigate('/dashboard');
      } else {
        // User hasn't completed onboarding
        toast({
          title: "Welcome!",
          description: "Please complete your profile to continue.",
        });
        navigate('/onboarding');
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await auth.signUp(email, password);

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!data?.user?.id) {
        toast({
          title: "Sign up failed",
          description: "User creation failed. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Create a new record in the users table using the uid field from schema
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          { uid: data.user.id }
        ]);

      if (insertError) {
        console.error('Error creating user record:', insertError);
        toast({
          title: "Account created",
          description: "There was an issue setting up your profile. Please try again or contact support.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created",
          description: "Please complete your profile to continue.",
        });

        // Redirect to onboarding
        navigate('/onboarding');
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading indicator while checking authentication
  if (isAuthChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Already authenticated users get a card with options
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle>You're Already Signed In</CardTitle>
            <CardDescription className="mt-2">
              Where would you like to go?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                await auth.signOut();
                window.location.reload();
              }}
              className="w-full"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle>Welcome</CardTitle>
          <CardDescription className="mt-2">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="Choose a password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={() => navigate('/')}
          >
            ← Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Wrap the component with the error boundary before exporting
const LoginPageWithErrorBoundary = () => (
  <ErrorBoundary>
    <LoginPage />
  </ErrorBoundary>
);

export default LoginPageWithErrorBoundary;
