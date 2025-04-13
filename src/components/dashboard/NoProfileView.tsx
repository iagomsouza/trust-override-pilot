
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NoProfileViewProps {
  onNavigateToOnboarding: () => void;
  onSignOut: () => void;
}

export const NoProfileView: React.FC<NoProfileViewProps> = ({ onNavigateToOnboarding, onSignOut }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>No Profile Found</CardTitle>
          <CardDescription>
            Please complete the onboarding process first
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={onNavigateToOnboarding}
            className="w-full"
          >
            Go to Onboarding
          </Button>
          <Button
            variant="outline"
            onClick={onSignOut}
            className="w-full"
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
