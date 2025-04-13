
import React from 'react';
import { StatisticsCard } from '@/components/StatisticsCard';
import { Transaction } from '@/data/mockTransactions';
import { ShieldCheck, ShieldAlert, TrendingUp, BarChart3 } from 'lucide-react';

interface DashboardStatisticsProps {
  transactions: Transaction[];
}

export const DashboardStatistics: React.FC<DashboardStatisticsProps> = ({ transactions }) => {
  // Calculate statistics
  const totalTransactions = transactions.length;
  const blockedTransactions = transactions.filter(tx => tx.originalStatus === 'blocked').length;
  const overrideTransactions = transactions.filter(tx => tx.originalStatus !== tx.currentStatus).length;
  const overridePercentage = Math.round((overrideTransactions / blockedTransactions) * 100);

  // Calculate average risk score
  const totalRiskScore = transactions.reduce((acc, tx) => acc + tx.riskScore, 0);
  const averageRiskScore = Math.round(totalRiskScore / totalTransactions);

  return (
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
  );
};
