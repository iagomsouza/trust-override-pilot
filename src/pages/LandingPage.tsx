import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import ComparisonSection from '@/components/landing/ComparisonSection';
import FlowDiagramSection from '@/components/landing/FlowDiagramSection';
import MetricsSection from '@/components/landing/MetricsSection';
import TestimonialSection from '@/components/landing/TestimonialSection';
import CTASection from '@/components/landing/CTASection';
import FooterSection from '@/components/landing/FooterSection';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';

const LandingPage = () => {
  // Function to scroll to a section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <ErrorBoundary
      fallback={
        <div className="container mx-auto p-4">
          <ErrorMessage
            title="Section Error"
            message="Failed to load this section. Please refresh the page."
          />
        </div>
      }
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader scrollToSection={scrollToSection} />

      <main className="flex-1">
        <SectionWrapper>
          <HeroSection scrollToSection={scrollToSection} />
        </SectionWrapper>

        <SectionWrapper>
          <BenefitsSection id="benefits" />
        </SectionWrapper>

        <SectionWrapper>
          <ComparisonSection id="comparison" />
        </SectionWrapper>

        <SectionWrapper>
          <FlowDiagramSection id="how-it-works" />
        </SectionWrapper>

        <SectionWrapper>
          <MetricsSection />
        </SectionWrapper>

        <SectionWrapper>
          <TestimonialSection />
        </SectionWrapper>

        <SectionWrapper>
          <CTASection id="cta" />
        </SectionWrapper>
      </main>

      <FooterSection />
    </div>
  );
};

export default LandingPage;
