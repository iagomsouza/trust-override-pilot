
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Shield, 
  Clock, 
  Zap, 
  ArrowRight, 
  Check, 
  MessageSquare,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-semibold text-xl flex items-center">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <span>TrustOverride</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="#" className="text-sm font-medium text-gray-600 hover:text-primary">
                Product
              </Link>
              <Link to="#" className="text-sm font-medium text-gray-600 hover:text-primary">
                Features
              </Link>
              <Link to="#" className="text-sm font-medium text-gray-600 hover:text-primary">
                Documentation
              </Link>
              <Link to="#" className="text-sm font-medium text-gray-600 hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              Hackathon Demo
            </Badge>
            <Link to="/" className="hidden md:block">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
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
                  <Button size="lg" className="group">
                    See how it works
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Request access
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="aspect-video bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="AI Fraud Detection System" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 md:px-8">
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

        {/* Comparison Section */}
        <section className="py-20 px-4 sm:px-6 md:px-8 bg-gray-50">
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

        {/* Flow Diagram Section */}
        <section className="py-20 px-4 sm:px-6 md:px-8">
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

        {/* Metrics Section */}
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

        {/* Testimonial Section */}
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

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to reduce false positives and improve customer experience?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              Join our early access program and see how our AI can transform your fraud prevention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Request access
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                See dashboard demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">API</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Partners</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="bg-gray-700 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-blue-400 mr-2" />
              <span className="font-semibold text-white">TrustOverride</span>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} TrustOverride. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
