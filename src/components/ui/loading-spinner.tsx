
import React from "react";
import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    xs: "h-3 w-3 border-[1.5px]",
    sm: "h-4 w-4 border-[1.5px]",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-2",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-solid border-primary border-r-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
};
