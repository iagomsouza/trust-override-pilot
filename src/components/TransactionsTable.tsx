
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Transaction } from '@/data/mockTransactions';
import { StatusBadge } from '@/components/StatusBadge';
import { RiskScoreBadge } from '@/components/RiskScoreBadge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { RefreshCw, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <div className="flex items-center space-x-2">
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <ArrowUpDown className="h-4 w-4" />
              <span>Sort</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Original Status</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead>Override Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => {
                const date = new Date(transaction.timestamp);
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono">{transaction.id}</TableCell>
                    <TableCell>
                      {format(date, 'MM/dd/yyyy HH:mm', { locale: enUS })}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: transaction.currency,
                      }).format(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <div>{transaction.merchant}</div>
                              <div className="text-xs text-gray-500">{transaction.category}</div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p>Device: {transaction.deviceId}</p>
                              <p>Location: {transaction.location}</p>
                              <p>Previous uses: {transaction.previousUses}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <RiskScoreBadge score={transaction.riskScore} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={transaction.originalStatus} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={transaction.currentStatus} />
                    </TableCell>
                    <TableCell>
                      {transaction.overrideReason ? (
                        <span className="text-sm">{transaction.overrideReason}</span>
                      ) : (
                        <span className="text-sm text-gray-400">Not applicable</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
