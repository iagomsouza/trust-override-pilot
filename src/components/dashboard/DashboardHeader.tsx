
import React from 'react';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { UserProfile } from '@/hooks/useAuth';

interface DashboardHeaderProps {
  userProfile: UserProfile;
  onSignOut: () => Promise<void>;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userProfile, onSignOut }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Intelligent Transaction Approval Monitoring System
        </p>
      </div>
      <ProfileCard userProfile={userProfile} onSignOut={onSignOut} />
    </div>
  );
};
