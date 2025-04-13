
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { mockTransactions } from '@/data/mockTransactions';
import { LoadingView } from '@/components/dashboard/LoadingView';
import { ErrorView } from '@/components/dashboard/ErrorView';
import { NoProfileView } from '@/components/dashboard/NoProfileView';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { 
    userProfile, 
    isProfileLoading, 
    hasError, 
    errorMessage, 
    handleSignOut 
  } = useAuth();

  // Show loading state 
  if (isProfileLoading && !hasError) {
    return <LoadingView />;
  }

  // Show error state
  if (hasError) {
    return (
      <ErrorView 
        errorMessage={errorMessage} 
        onRefresh={() => window.location.reload()} 
        onSignOut={handleSignOut} 
      />
    );
  }

  // Fallback in case no profile but no error either
  if (!userProfile) {
    return (
      <NoProfileView 
        onNavigateToOnboarding={() => navigate('/onboarding')} 
        onSignOut={handleSignOut} 
      />
    );
  }

  return (
    <DashboardLayout>
      <DashboardContent 
        userProfile={userProfile} 
        transactions={mockTransactions}
        onSignOut={handleSignOut}
      />
    </DashboardLayout>
  );
};

export default Index;
