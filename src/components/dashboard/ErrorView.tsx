
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ErrorViewProps {
  errorMessage: string;
  onRefresh: () => void;
  onSignOut: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ errorMessage, onRefresh, onSignOut }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle>Error Loading Dashboard</CardTitle>
          <CardDescription>
            There was a problem loading your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-3 rounded-md text-sm text-red-800 border border-red-200">
            {errorMessage || "Please try refreshing the page or sign in again."}
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              onClick={onRefresh}
              className="flex-1"
            >
              Refresh Page
            </Button>
            <Button
              variant="outline"
              onClick={onSignOut}
              className="flex-1"
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
