
import React from 'react';

const MetricsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 bg-blue-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Proven results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our technology delivers measurable improvements to your fraud prevention.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Metric 1 */}
          <div className="bg-white p-8 rounded-xl border border-blue-100 shadow-sm text-center">
            <h3 className="text-5xl font-bold text-blue-600 mb-4">-20%</h3>
            <p className="text-xl font-medium">False Positives</p>
            <p className="text-gray-600 mt-2">Fewer legitimate transactions blocked</p>
          </div>
          
          {/* Metric 2 */}
          <div className="bg-white p-8 rounded-xl border border-blue-100 shadow-sm text-center">
            <h3 className="text-5xl font-bold text-blue-600 mb-4">+15%</h3>
            <p className="text-xl font-medium">Approval Rate</p>
            <p className="text-gray-600 mt-2">More legitimate transactions approved</p>
          </div>
          
          {/* Metric 3 */}
          <div className="bg-white p-8 rounded-xl border border-blue-100 shadow-sm text-center">
            <h3 className="text-5xl font-bold text-blue-600 mb-4">90%+</h3>
            <p className="text-xl font-medium">Accuracy</p>
            <p className="text-gray-600 mt-2">In identifying legitimate transactions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
