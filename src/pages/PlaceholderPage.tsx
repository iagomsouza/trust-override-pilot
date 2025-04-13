
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import FooterSection from '@/components/landing/FooterSection';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-xl">Sentinel</span>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">
            This page is currently under development. Please check back soon for more information.
          </p>
          <div className="flex justify-center">
            <Link to="/">
              <Button size="lg">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default PlaceholderPage;
