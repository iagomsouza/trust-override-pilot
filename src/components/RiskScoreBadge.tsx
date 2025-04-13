
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
    riskLevel = 'Low';
    colorClass = 'bg-trust text-white';
  } else if (score < 70) {
    riskLevel = 'Medium';
    colorClass = 'bg-caution text-white';
  } else {
    riskLevel = 'High';
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
          <p>{riskLevel} Risk ({score}/100)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
