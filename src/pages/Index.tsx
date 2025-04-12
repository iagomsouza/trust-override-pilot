
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { StatisticsCard } from '@/components/StatisticsCard';
import { TransactionsTable } from '@/components/TransactionsTable';
import { OverridesSummary } from '@/components/OverridesSummary';
import { FilterControls } from '@/components/FilterControls';
import { mockTransactions } from '@/data/mockTransactions';
import { 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  BarChart3 
} from 'lucide-react';

const Index = () => {
  // Calculate statistics
  const totalTransactions = mockTransactions.length;
  const blockedTransactions = mockTransactions.filter(tx => tx.originalStatus === 'blocked').length;
  const overrideTransactions = mockTransactions.filter(tx => tx.originalStatus !== tx.currentStatus).length;
  const overridePercentage = Math.round((overrideTransactions / blockedTransactions) * 100);
  
  // Calculate average risk score
  const totalRiskScore = mockTransactions.reduce((acc, tx) => acc + tx.riskScore, 0);
  const averageRiskScore = Math.round(totalRiskScore / totalTransactions);
  
  return (
    <DashboardLayout>
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
