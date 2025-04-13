
import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardStatistics } from '@/components/dashboard/DashboardStatistics';
import { FilterControls } from '@/components/FilterControls';
import { TransactionsTable } from '@/components/TransactionsTable';
import { OverridesSummary } from '@/components/OverridesSummary';
import { Transaction } from '@/data/mockTransactions';

interface UserProfile {
  id: string;
  created_at: string;
  x_username: string | null;
  instagram_username: string | null;
  linkedin_url: string | null;
  face_image_url: string | null;
}

interface DashboardContentProps {
  userProfile: UserProfile;
  transactions: Transaction[];
  onSignOut: () => Promise<void>;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ 
  userProfile, 
  transactions, 
  onSignOut 
}) => {
  return (
    <div className="space-y-6">
      <DashboardHeader userProfile={userProfile} onSignOut={onSignOut} />
      <DashboardStatistics transactions={transactions} />
      <FilterControls />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionsTable transactions={transactions} />
        </div>
        <div className="lg:col-span-1">
          <OverridesSummary transactions={transactions} />
        </div>
      </div>
    </div>
  );
};
