
import React from 'react';
import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import ComparisonSection from '@/components/landing/ComparisonSection';
import FlowDiagramSection from '@/components/landing/FlowDiagramSection';
import MetricsSection from '@/components/landing/MetricsSection';
import TestimonialSection from '@/components/landing/TestimonialSection';
import CTASection from '@/components/landing/CTASection';
import FooterSection from '@/components/landing/FooterSection';

const LandingPage = () => {
  // Function to scroll to a section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader scrollToSection={scrollToSection} />

      <main className="flex-1">
        <HeroSection scrollToSection={scrollToSection} />
        <BenefitsSection id="benefits" />
        <ComparisonSection id="comparison" />
        <FlowDiagramSection id="how-it-works" />
        <MetricsSection />
        <TestimonialSection />
        <CTASection id="cta" />
      </main>

      <FooterSection />
    </div>
  );
};

export default LandingPage;
