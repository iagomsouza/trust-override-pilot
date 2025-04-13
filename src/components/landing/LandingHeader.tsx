import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LandingHeaderProps {
  scrollToSection: (id: string) => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Sentinel</span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>

            {isMenuOpen && (
              <div className="fixed inset-0 top-16 bg-white z-40 p-4">
                <nav className="flex flex-col space-y-4">
                  <Link to="/" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="/how-it-works" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    How It Works
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection('benefits');
                      setIsMenuOpen(false);
                    }}
                    className="justify-start px-0 hover:text-blue-600"
                  >
                    Benefits
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection('comparison');
                      setIsMenuOpen(false);
                    }}
                    className="justify-start px-0 hover:text-blue-600"
                  >
                    Comparison
                  </Button>
                  <div className="pt-4">
                    <Link to="/dashboard">
                      <Button className="w-full">Dashboard</Button>
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/how-it-works" className="hover:text-blue-600 transition-colors">
                How It Works
              </Link>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('benefits')}
                className="hover:text-blue-600"
              >
                Benefits
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('comparison')}
                className="hover:text-blue-600"
              >
                Comparison
              </Button>
            </nav>

            <div className="hidden md:block">
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
