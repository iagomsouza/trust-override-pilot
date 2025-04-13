import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Instagram, Twitter, Linkedin, User } from 'lucide-react';
import { UserProfile } from '@/hooks/useAuth';

interface ProfileCardProps {
  userProfile: UserProfile;
  onSignOut: () => Promise<void>;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ userProfile, onSignOut }) => {
  return (
    <Card className="w-auto">
      <CardHeader className="p-4 flex flex-row items-center space-y-0 gap-4">
        <Avatar className="h-10 w-10">
          {userProfile.face_image_url ? (
            <AvatarImage src={userProfile.face_image_url} alt="User" />
          ) : (
            <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">
            {userProfile?.id || "User"}
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {userProfile.x_username && (
              <div className="flex items-center gap-1">
                <Twitter className="h-3 w-3" />
                <span>{userProfile.x_username}</span>
              </div>
            )}
            {userProfile.instagram_username && (
              <div className="flex items-center gap-1">
                <Instagram className="h-3 w-3" />
                <span>{userProfile.instagram_username}</span>
              </div>
            )}
            {userProfile.linkedin_url && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3" />
                <span>LinkedIn</span>
              </div>
            )}
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onSignOut}>
          Sign out
        </Button>
      </CardHeader>
    </Card>
  );
};
