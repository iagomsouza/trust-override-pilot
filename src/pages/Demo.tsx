
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Shield, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Demo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [protectionEnabled, setProtectionEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-xl">Sentinel</span>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Demo</h1>
            <p className="text-gray-600">Experience an online purchase with intelligent protection</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
            {success ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Purchase approved successfully!</h2>
                <p className="text-gray-600 mb-6">
                  This transaction was protected by <span className="font-bold">Sentinel</span>, our AI-based fraud detection technology.
                </p>
                <Link to="/">
                  <Button>Return to Home</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                      className="mt-1" 
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      className="mt-1"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="card">Card Information</Label>
                    <div className="mt-1 p-3 border rounded-md bg-gray-50 text-gray-500">
                      <div className="flex justify-between items-center">
                        <span>•••• •••• •••• 4242</span>
                        <div className="flex items-center space-x-4">
                          <span>04/24</span>
                          <span>123</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Card details are pre-filled for demo purposes</p>
                  </div>

                  <div className="flex items-start pt-2">
                    <div className="flex items-center h-5">
                      <Checkbox 
                        id="protection" 
                        checked={protectionEnabled}
                        onCheckedChange={(checked) => setProtectionEnabled(checked as boolean)}
                      />
                    </div>
                    <div className="ml-3 flex items-center">
                      <Label htmlFor="protection" className="text-sm font-normal">
                        This purchase is protected with advanced fraud detection technology
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="ml-1 flex h-4 w-4 items-center justify-center rounded-full">
                              <Info className="h-3 w-3 text-gray-500" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>We use AI to analyze social media data, emails, location, and other signals to improve your approval without compromising security.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing your purchase securely...
                    </span>
                  ) : "Buy Now"}
                </Button>
              </form>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 flex items-center justify-center">
              Less friction. More approvals. 
              <span className="ml-1 font-medium flex items-center">
                Powered by Sentinel
                <Shield className="h-4 w-4 ml-1 text-blue-500" />
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;
