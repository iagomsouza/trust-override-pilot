
import React from 'react';
import { Check } from 'lucide-react';

const ComparisonSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 md:px-8 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            The evolution of fraud prevention
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our solution compares to traditional rule-based systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="text-gray-500">Before:</span>
              <span className="ml-2">Traditional Rule-based Systems</span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="rounded-full bg-red-100 p-1 mr-3 mt-1">
                  <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-gray-600">Rigid rules that can't adapt to new patterns</p>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-red-100 p-1 mr-3 mt-1">
                  <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-gray-600">High rate of false positives disrupting user experience</p>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-red-100 p-1 mr-3 mt-1">
                  <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-gray-600">No context about user behavior or trusted devices</p>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-red-100 p-1 mr-3 mt-1">
                  <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-gray-600">Unclear rejection reasons leading to customer frustration</p>
              </li>
            </ul>
          </div>

          {/* After */}
          <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="text-blue-600">After:</span>
              <span className="ml-2">AI with Contextual Analysis</span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <p className="text-gray-600">Adaptive learning that improves with each transaction</p>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <p className="text-gray-600">Recognizes trusted devices and location patterns</p>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <p className="text-gray-600">Intelligent override system for legitimate transactions</p>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <p className="text-gray-600">Clear explanations for both approvals and rejections</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
