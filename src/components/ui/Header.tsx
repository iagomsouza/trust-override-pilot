
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const Header: React.FC = () => {
  const { toast } = useToast();

  const handleNotificationClick = () => {
    toast({
      title: "Notificações",
      description: "Você não tem novas notificações.",
    });
  };

  return (
    <header className="border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Buscar transações..." 
              className="pl-9 w-[250px] bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNotificationClick}
            className="text-gray-500 hover:text-gray-700"
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-500 hover:text-gray-700"
            asChild
          >
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
