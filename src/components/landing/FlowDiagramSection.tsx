
import React from 'react';

const FlowDiagramSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent system analyzes multiple factors to make the best decision.
          </p>
        </div>

        <div className="relative py-10">
          {/* Flow diagram using CSS grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="text-lg font-semibold mb-3 mt-4 text-center">Transaction Data</h3>
              <p className="text-gray-600 text-center">
                Collects device ID, location, purchase history, and behavioral patterns
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="text-lg font-semibold mb-3 mt-4 text-center">Context Analysis</h3>
              <p className="text-gray-600 text-center">
                AI evaluates trust signals and compares with known patterns
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
              <h3 className="text-lg font-semibold mb-3 mt-4 text-center">Smart Decision</h3>
              <p className="text-gray-600 text-center">
                Override system approves legitimate transactions with explanation
              </p>
            </div>
            
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-1/2 left-[33%] w-[34%] h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 left-[66%] w-[34%] h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlowDiagramSection;
