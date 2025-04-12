
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '@/components/landing/LandingHeader';
import FooterSection from '@/components/landing/FooterSection';
import DataCollectionSection from '@/components/how-it-works/DataCollectionSection';
import ApiIntegrationSection from '@/components/how-it-works/ApiIntegrationSection';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();
  
  // Function to scroll to a section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
      el.classList.remove('opacity-0');
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader scrollToSection={() => {}} />

      <main className="flex-1">
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4 overflow-hidden">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-8 animate-on-scroll opacity-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                How Our AI Fraud Detection Works
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Discover how our advanced AI transforms unstructured data into powerful fraud intelligence that protects your business in real-time.
              </p>
            </div>
            
            <Button 
              variant="ghost" 
              className="flex items-center mx-auto mt-6 animate-bounce"
              onClick={() => scrollToSection('data-collection')}
            >
              <span className="mr-2">Explore</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div id="data-collection" className="min-h-screen scroll-mt-16 snap-start">
          <DataCollectionSection />
        </div>

        <div id="api-integration" className="min-h-screen scroll-mt-16 snap-start">
          <ApiIntegrationSection />
        </div>

        <div className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to implement fraud protection?</h2>
            <p className="text-xl text-gray-700 mb-8">Our API documentation makes integration smooth and efficient</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate('/')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('#', '_blank')}
              >
                API Documentation
              </Button>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default HowItWorks;
