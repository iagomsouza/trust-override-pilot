import { ReactNode } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

interface PageWrapperProps {
  children: ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  fullHeight?: boolean;
}

export function PageWrapper({
  children,
  isLoading,
  error,
  fullHeight = true,
}: PageWrapperProps) {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${fullHeight ? "min-h-[50vh]" : "py-8"}`}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage
          title="Something went wrong"
          message={error.message || "An unexpected error occurred. Please try again later."}
        />
      </div>
    );
  }

  return <>{children}</>;
}
