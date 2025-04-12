
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type RiskScoreBadgeProps = {
  score: number;
  className?: string;
};

export const RiskScoreBadge: React.FC<RiskScoreBadgeProps> = ({ score, className }) => {
  let riskLevel: string;
  let colorClass: string;
  
  if (score < 30) {
    riskLevel = 'Baixo';
    colorClass = 'bg-trust text-white';
  } else if (score < 70) {
    riskLevel = 'Médio';
    colorClass = 'bg-caution text-white';
  } else {
    riskLevel = 'Alto';
    colorClass = 'bg-risk text-white';
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "text-xs font-medium rounded-full px-2 py-1 flex items-center",
              colorClass,
              className
            )}
          >
            <span>{score}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Risco {riskLevel} ({score}/100)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
