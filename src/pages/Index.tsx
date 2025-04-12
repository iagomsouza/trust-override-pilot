import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { StatisticsCard } from '@/components/StatisticsCard';
import { TransactionsTable } from '@/components/TransactionsTable';
import { OverridesSummary } from '@/components/OverridesSummary';
import { FilterControls } from '@/components/FilterControls';
import { mockTransactions } from '@/data/mockTransactions';
import { useSupabase } from '@/contexts/SupabaseContext';
import { auth, supabase } from '@/lib/supabase';
import {
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  BarChart3,
  User,
  Instagram,
  Twitter,
  Linkedin,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Define the user profile type
interface UserProfile {
  id: string;
  created_at: string;
  x_username: string | null;
  instagram_username: string | null;
  linkedin_url: string | null;
  face_image_url: string | null;
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // For direct access, check auth without depending on context
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error checking session:', sessionError);
          setHasError(true);
          setErrorMessage('Session error: ' + sessionError.message);
          return;
        }

        if (!session) {
          // No session, redirect to login
          navigate('/login');
          return;
        }

        // Session exists, get user profile
        try {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('uid', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error);

            if (error.code === 'PGRST116') { // No profile found
              navigate('/onboarding');
              return;
            }

            setHasError(true);
            setErrorMessage('Profile error: ' + error.message);
            return;
          }

          if (!data.face_image_url) {
            navigate('/onboarding');
            return;
          }

          setUserProfile(data as UserProfile);
          setIsProfileLoading(false);
        } catch (error: any) {
          console.error('Error in profile check:', error);
          setHasError(true);
          setErrorMessage('Profile fetch error: ' + error.message);
        }
      } catch (error: any) {
        console.error('Error in auth check:', error);
        setHasError(true);
        setErrorMessage('Auth error: ' + error.message);
      }
    };

    checkAuth();
  }, [navigate]);

  // Calculate statistics
  const totalTransactions = mockTransactions.length;
  const blockedTransactions = mockTransactions.filter(tx => tx.originalStatus === 'blocked').length;
  const overrideTransactions = mockTransactions.filter(tx => tx.originalStatus !== tx.currentStatus).length;
  const overridePercentage = Math.round((overrideTransactions / blockedTransactions) * 100);

  // Calculate average risk score
  const totalRiskScore = mockTransactions.reduce((acc, tx) => acc + tx.riskScore, 0);
  const averageRiskScore = Math.round(totalRiskScore / totalTransactions);

  const handleSignOut = async () => {
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error signing out",
        description: error.message || "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Show loading state 
  if (isProfileLoading && !hasError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle>Error Loading Dashboard</CardTitle>
            <CardDescription>
              There was a problem loading your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 p-3 rounded-md text-sm text-red-800 border border-red-200">
              {errorMessage || "Please try refreshing the page or sign in again."}
            </div>
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                Refresh Page
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex-1"
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fallback in case no profile but no error either
  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Profile Found</CardTitle>
            <CardDescription>
              Please complete the onboarding process first
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate('/onboarding')}
              className="w-full"
            >
              Go to Onboarding
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
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
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Intelligent Transaction Approval Monitoring System
            </p>
          </div>
          <Card className="w-auto">
            <CardHeader className="p-4 flex flex-row items-center space-y-0 gap-4">
              <Avatar className="h-10 w-10">
                {userProfile.face_image_url ? (
                  <AvatarImage src={userProfile.face_image_url} alt="User" />
                ) : (
                  <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                )}
              </Avatar>
              <div className="space-y-1">
                {/* Use safe access to prevent errors */}
                <CardTitle className="text-sm font-medium">
                  {userProfile?.id || "User"}
                </CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {userProfile.x_username && (
                    <div className="flex items-center gap-1">
                      <Twitter className="h-3 w-3" />
                      <span>{userProfile.x_username}</span>
                    </div>
                  )}
                  {userProfile.instagram_username && (
                    <div className="flex items-center gap-1">
                      <Instagram className="h-3 w-3" />
                      <span>{userProfile.instagram_username}</span>
                    </div>
                  )}
                  {userProfile.linkedin_url && (
                    <div className="flex items-center gap-1">
                      <Linkedin className="h-3 w-3" />
                      <span>LinkedIn</span>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatisticsCard
            title="Total Transactions"
            value={totalTransactions}
            icon={<BarChart3 />}
            description="in the last 24 hours"
          />
          <StatisticsCard
            title="Blocked Transactions"
            value={blockedTransactions}
            icon={<ShieldAlert />}
            description={`${Math.round((blockedTransactions / totalTransactions) * 100)}% of total`}
          />
          <StatisticsCard
            title="Applied Overrides"
            value={overrideTransactions}
            icon={<ShieldCheck />}
            description={`${overridePercentage}% of blocks`}
            trend={{
              value: 20,
              isPositive: true
            }}
          />
          <StatisticsCard
            title="Average Risk Score"
            value={averageRiskScore}
            icon={<TrendingUp />}
            description="on a 0-100 scale"
          />
        </div>

        <FilterControls />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionsTable transactions={mockTransactions} />
          </div>
          <div className="lg:col-span-1">
            <OverridesSummary transactions={mockTransactions} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
