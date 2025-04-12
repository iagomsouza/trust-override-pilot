import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { StatisticsCard } from '@/components/StatisticsCard';
import { TransactionsTable } from '@/components/TransactionsTable';
import { OverridesSummary } from '@/components/OverridesSummary';
import { FilterControls } from '@/components/FilterControls';
import { mockTransactions } from '@/data/mockTransactions';
import { PageWrapper } from '@/components/page-wrapper';
import { 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  BarChart3 
} from 'lucide-react';

const Index = () => {
  // Simulate API call with React Query
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockTransactions;
    }
  });

  return (
    <DashboardLayout>
      <PageWrapper isLoading={isLoading} error={error as Error}>
        {transactions && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Intelligent Transaction Approval Monitoring System
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatisticsCard
                title="Total Transactions"
                value={transactions.length}
                icon={<BarChart3 />}
                description="in the last 24 hours"
              />
              <StatisticsCard
                title="Blocked Transactions"
                value={transactions.filter(tx => tx.originalStatus === 'blocked').length}
                icon={<ShieldAlert />}
                description={`${Math.round((transactions.filter(tx => tx.originalStatus === 'blocked').length / transactions.length) * 100)}% of total`}
              />
              <StatisticsCard
                title="Applied Overrides"
                value={transactions.filter(tx => tx.originalStatus !== tx.currentStatus).length}
                icon={<ShieldCheck />}
                description={`${Math.round((transactions.filter(tx => tx.originalStatus !== tx.currentStatus).length / transactions.filter(tx => tx.originalStatus === 'blocked').length) * 100)}% of blocks`}
                trend={{
                  value: 20,
                  isPositive: true
                }}
              />
              <StatisticsCard
                title="Average Risk Score"
                value={Math.round(transactions.reduce((acc, tx) => acc + tx.riskScore, 0) / transactions.length)}
                icon={<TrendingUp />}
                description="on a 0-100 scale"
              />
            </div>
            
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
        )}
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Index;
