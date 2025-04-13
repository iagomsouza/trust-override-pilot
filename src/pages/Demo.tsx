import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  Shield, 
  Info, 
  CheckCircle, 
  XCircle, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Camera, 
  Smartphone, 
  MapPin, 
  Globe, 
  CreditCard, 
  Activity,
  RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { ErrorMessage } from '@/components/ui/error-message';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Define stages for the demo flow
enum DemoStage {
  CHECKOUT = 'checkout',
  PROCESSING = 'processing',
  ERROR = 'error',
  VERIFICATION = 'verification',
  SUCCESS = 'success'
}

// Verification modules that run during the "behind the scenes" stage
const verificationModules = [
  {
    id: 'social',
    title: 'Social Media Scan',
    description: 'Analyzing presence on Instagram, LinkedIn, Twitter',
    icon: <Instagram className="h-5 w-5" />,
    platforms: [
      { name: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
      { name: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
      { name: 'Twitter', icon: <Twitter className="h-4 w-4" /> }
    ]
  },
  {
    id: 'visual',
    title: 'Visual Monitoring',
    description: 'Analyzing security camera footage of partners',
    icon: <Camera className="h-5 w-5" />
  },
  {
    id: 'device',
    title: 'Device Fingerprint',
    description: 'Verifying unique device identification',
    icon: <Smartphone className="h-5 w-5" />
  },
  {
    id: 'location',
    title: 'Location Data',
    description: 'Confirming location consistency',
    icon: <MapPin className="h-5 w-5" />
  },
  {
    id: 'gps',
    title: 'GPS & IP Matching',
    description: 'Verifying IP and GPS data match',
    icon: <Globe className="h-5 w-5" />
  },
  {
    id: 'credit',
    title: 'Credit Bureau Sync',
    description: 'Validating credit history patterns',
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: 'behavior',
    title: 'Behavioral Analysis',
    description: 'Comparing with previous user patterns',
    icon: <Activity className="h-5 w-5" />
  }
];

const Demo = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [protectionEnabled, setProtectionEnabled] = useState(false);
  
  // Application state
  const [stage, setStage] = useState<DemoStage>(DemoStage.CHECKOUT);
  const [loading, setLoading] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(-1);
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);

  // Form validation
  const isFormValid = name.trim() !== '' && email.trim() !== '' && email.includes('@');

  // Process the purchase
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setLoading(true);
    
    // If protection is not enabled, simulate a failed transaction
    if (!protectionEnabled) {
      setTimeout(() => {
        setLoading(false);
        setStage(DemoStage.ERROR);
      }, 2000);
    } else {
      // If protection is enabled, move to the verification stage
      setTimeout(() => {
        setLoading(false);
        setStage(DemoStage.VERIFICATION);
        setCurrentModuleIndex(-1);
        setCompletedModules({});
        setProgress(0);
        startVerificationProcess();
      }, 2000);
    }
  };

  // Start the verification process by triggering the first module
  const startVerificationProcess = () => {
    processNextModule();
  };

  // Try again with Sentinel enabled
  const handleTryWithSentinel = () => {
    setProtectionEnabled(true);
    setStage(DemoStage.CHECKOUT);
  };

  // Process verification modules one by one
  const processNextModule = () => {
    const nextIndex = currentModuleIndex + 1;
    
    if (nextIndex < verificationModules.length) {
      setCurrentModuleIndex(nextIndex);
      
      const moduleProgress = Math.floor((nextIndex / verificationModules.length) * 100);
      setProgress(moduleProgress);
      
      // Process the current module with a delay
      setTimeout(() => {
        setCompletedModules(prev => ({
          ...prev,
          [verificationModules[nextIndex].id]: true
        }));
        
        // Move to the next module after a delay
        setTimeout(() => {
          processNextModule(); // Call recursively to process the next module
        }, 800);
      }, 1200);
    } else {
      // All modules processed, set progress to 100% and move to success
      setProgress(100);
      setTimeout(() => {
        setStage(DemoStage.SUCCESS);
      }, 1000);
    }
  };

  // Reset the demo
  const resetDemo = () => {
    setName('');
    setEmail('');
    setProtectionEnabled(false);
    setStage(DemoStage.CHECKOUT);
    setLoading(false);
    setCurrentModuleIndex(-1);
    setCompletedModules({});
    setProgress(0);
  };

  // Render the appropriate stage
  const renderStage = () => {
    switch (stage) {
      case DemoStage.CHECKOUT:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Checkout</CardTitle>
              <CardDescription>Complete your purchase</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
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
                      Enable Sentinel fraud protection technology
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
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all" 
                  disabled={loading || !isFormValid}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Processing your purchase securely...
                    </span>
                  ) : "Buy Now"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        );
      
      case DemoStage.ERROR:
        return (
          <Card className="w-full max-w-md border-red-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-red-100 p-3">
                  <XCircle className="h-10 w-10 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-center text-red-700">Purchase Not Authorized</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Your bank rejected this transaction.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-4">
              <div className="flex items-center justify-center mb-4 p-3 bg-blue-50 rounded-md">
                <div className="mr-2">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-blue-700">
                  Try again with our fraud protection enabled.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                onClick={handleTryWithSentinel}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Shield className="mr-2 h-4 w-4" />
                Try again with Sentinel
              </Button>
              <Button 
                variant="outline" 
                onClick={resetDemo}
                className="w-full"
              >
                Start Over
              </Button>
            </CardFooter>
          </Card>
        );

      case DemoStage.VERIFICATION:
        return (
          <Card className="w-full max-w-3xl bg-gray-900 text-white border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-mono flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-400" />
                Sentinel Verification System
              </CardTitle>
              <CardDescription className="text-gray-400">
                Processing your transaction through our AI-powered verification system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full bg-gray-800 rounded-md p-1">
                <Progress value={progress} className="h-2 bg-gray-700" />
              </div>
              
              <div className="space-y-4 py-2">
                {verificationModules.map((module, index) => {
                  const isActive = index === currentModuleIndex;
                  const isCompleted = completedModules[module.id];
                  const isPending = index > currentModuleIndex;
                  
                  return (
                    <div 
                      key={module.id}
                      className={cn(
                        "p-3 rounded-md transition-all duration-300",
                        isActive ? "bg-blue-900/50 border border-blue-700/50" : "",
                        isCompleted ? "bg-green-900/30 border border-green-700/30" : "",
                        isPending ? "opacity-50" : "opacity-100"
                      )}
                    >
                      <div className="flex items-center">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                          isCompleted ? "bg-green-800/50 text-green-400" : 
                          isActive ? "bg-blue-800/50 text-blue-400" : 
                          "bg-gray-800 text-gray-400"
                        )}>
                          {isCompleted ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            module.icon
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={cn(
                            "text-sm font-semibold",
                            isCompleted ? "text-green-400" : 
                            isActive ? "text-blue-400" : 
                            "text-gray-400"
                          )}>
                            {module.title}
                          </h4>
                          
                          <p className="text-xs text-gray-500">
                            {module.description}
                          </p>
                        </div>
                        
                        <div className="ml-2">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : isActive ? (
                            <div className="h-5 w-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-gray-600"></div>
                          )}
                        </div>
                      </div>
                      
                      {module.platforms && isActive && (
                        <div className="ml-11 mt-2">
                          <div className="flex space-x-2">
                            {module.platforms.map((platform, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "flex items-center space-x-1 px-2 py-1 rounded-full text-xs",
                                  "bg-gray-800 text-gray-400"
                                )}
                              >
                                {platform.icon}
                                <span>{platform.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );

      case DemoStage.SUCCESS:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-center">Purchase Approved!</CardTitle>
              <CardDescription className="text-center">
                Your transaction was protected and optimized with <span className="font-semibold">Sentinel</span>, our AI fraud detection technology based on real and behavioral data.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-4">
              <div className="inline-flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded text-sm text-blue-700">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Protected by Sentinel</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                onClick={resetDemo}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Make another purchase
              </Button>
              <Link to="/" className="w-full">
                <Button 
                  variant="outline"
                  className="w-full"
                >
                  Return to homepage
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
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
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Demo</h1>
            <p className="text-gray-600">Experience an online purchase with intelligent protection</p>
          </div>

          <div className="flex justify-center">
            {renderStage()}
          </div>

          {stage !== DemoStage.SUCCESS && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 flex items-center justify-center">
                Less friction. More approvals. 
                <span className="ml-1 font-medium flex items-center">
                  Powered by Sentinel
                  <Shield className="h-4 w-4 ml-1 text-blue-500" />
                </span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Demo;
