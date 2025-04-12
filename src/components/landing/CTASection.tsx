
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to reduce false positives and improve customer experience?
        </h2>
        <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
          Join our early access program and see how our AI can transform your fraud prevention.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => window.open('mailto:demo@fraudguardai.com?subject=Access Request', '_blank')}
          >
            Request access
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-blue-700"
            asChild
          >
            <Link to="/dashboard">
              See dashboard demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
