
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LandingHeaderProps {
  scrollToSection: (id: string) => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ scrollToSection }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-xl flex items-center">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <span>TrustOverride</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('benefits')} 
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              Product
            </button>
            <button 
              onClick={() => scrollToSection('comparison')} 
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              Documentation
            </button>
            <button 
              onClick={() => scrollToSection('cta')} 
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              Contact
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Hackathon Demo
          </Badge>
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
