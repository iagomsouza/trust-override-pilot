
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Smarter fraud detection with AI context
            </h1>
            <p className="text-xl text-gray-600">
              Reduce false positives by 20% and enhance customer experience through contextual trust assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="group"
                onClick={() => scrollToSection('how-it-works')}
              >
                See how it works
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('cta')}
              >
                Request access
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="aspect-video bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <img 
                src="/lovable-uploads/e46c5599-905f-4b2c-98f6-a88d37e09680.png" 
                alt="TrustOverride Dashboard" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
