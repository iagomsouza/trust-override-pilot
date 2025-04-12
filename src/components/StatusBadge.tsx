
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: 'approved' | 'blocked';
  className?: string;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  if (status === 'approved') {
    return (
      <Badge 
        className={cn(
          'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 flex items-center gap-1',
          className
        )}
      >
        <CheckCircle className="h-3.5 w-3.5" />
        Approved
      </Badge>
    );
  }
  
  return (
    <Badge 
      className={cn(
        'bg-red-100 text-red-800 border-red-200 hover:bg-red-200 flex items-center gap-1',
        className
      )}
    >
      <AlertCircle className="h-3.5 w-3.5" />
      Blocked
    </Badge>
  );
};
