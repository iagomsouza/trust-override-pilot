
import React from 'react';
import { ProfileCard } from '@/components/dashboard/ProfileCard';

interface UserProfile {
  id: string;
  created_at: string;
  x_username: string | null;
  instagram_username: string | null;
  linkedin_url: string | null;
  face_image_url: string | null;
}

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
