
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { auth } from '@/lib/supabase';

// Define the user profile type
export interface UserProfile {
  id: string;
  created_at: string;
  x_username: string | null;
  instagram_username: string | null;
  linkedin_url: string | null;
  face_image_url: string | null;
}

export const useAuth = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication and load user profile
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

  return {
    userProfile,
    isProfileLoading,
    hasError,
    errorMessage,
    handleSignOut
  };
};
