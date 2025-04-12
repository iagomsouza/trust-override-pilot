
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/data/mockTransactions';
import { ShieldCheck, ShieldX, Shield } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';

interface OverridesSummaryProps {
  transactions: Transaction[];
}

export const OverridesSummary: React.FC<OverridesSummaryProps> = ({ transactions }) => {
  const overrides = transactions.filter(tx => 
    tx.originalStatus !== tx.currentStatus
  );
  
  if (overrides.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Transações Sobrescritas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-gray-500">
            <Shield className="h-12 w-12 mb-2 opacity-30" />
            <p>Nenhuma transação sobrescrita encontrada.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Transações Sobrescritas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {overrides.map(tx => (
            <div key={tx.id} className="border rounded-lg p-3 bg-green-50 border-green-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium">{tx.merchant}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusBadge status={tx.originalStatus} className="line-through opacity-70" />
                  <ShieldX className="h-4 w-4 text-gray-400" />
                  <StatusBadge status={tx.currentStatus} />
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-1">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: tx.currency,
                }).format(tx.amount)} • {tx.category}
              </div>
              <div className="text-sm bg-white p-2 rounded border border-green-200">
                <span className="font-medium text-green-700">Motivo:</span> {tx.overrideReason}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                ID: {tx.id} • Dispositivo: {tx.deviceId.split('-')[0]}... • Usos anteriores: {tx.previousUses}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
