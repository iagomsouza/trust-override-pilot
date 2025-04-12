
import React from 'react';
import { Check, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const BenefitsSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Intelligent fraud prevention that understands context
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI analyzes transaction patterns, device trust, and user behavior to make smarter decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reduced False Positives</h3>
              <p className="text-gray-600">
                Stop blocking legitimate customers while maintaining strong security against actual fraud attempts.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Decisions</h3>
              <p className="text-gray-600">
                Process transactions instantly with sub-500ms response times even with complex contextual analysis.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Explainable AI</h3>
              <p className="text-gray-600">
                Understand exactly why a transaction was approved or rejected with clear, human-readable explanations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
