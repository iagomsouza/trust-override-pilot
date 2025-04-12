
import React from 'react';

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm relative">
          <div className="absolute -top-5 -left-2 text-gray-200 text-7xl">"</div>
          <blockquote className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-6 relative z-10">
            With this AI system, we aren't just preventing fraud. We're saying yes to our best customers when they need it most, creating a smoother experience without compromising security.
          </blockquote>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <p className="font-semibold">Maria Rodriguez</p>
              <p className="text-gray-600 text-sm">Risk Analyst, Global Payments Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
