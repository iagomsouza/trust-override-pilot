
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Twitter, Instagram, Camera, MapPin, Database, CloudCog } from 'lucide-react';

const DataCollectionSection = () => {
  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <h2 className="text-3xl font-bold mb-4">Data Collection & Processing</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our AI agent continuously collects and analyzes vast amounts of unstructured data from multiple sources to identify potential fraud patterns and behaviors.
          </p>
        </div>

        <div className="relative flex justify-center mb-20">
          <div className="data-sources-container relative max-w-5xl w-full">
            {/* Data Sources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <DataSourceCard 
                title="Social Media" 
                description="Data from social networks helps establish digital identities and detect suspicious patterns."
                icon={<div className="flex gap-2"><Twitter className="h-6 w-6 text-blue-500" /><Instagram className="h-6 w-6 text-pink-500" /></div>}
                className="animate-on-scroll opacity-0"
                delay={0}
              />
              
              <DataSourceCard 
                title="Visual Monitoring" 
                description="Live camera feeds and surveillance systems help verify physical presence and prevent identity fraud."
                icon={<Camera className="h-6 w-6 text-purple-500" />}
                className="animate-on-scroll opacity-0"
                delay={100}
              />
              
              <DataSourceCard 
                title="Device Intelligence" 
                description="Device fingerprinting identifies and tracks suspicious devices across multiple transactions."
                icon={<div className="h-6 w-6 flex items-center justify-center text-green-500 font-bold text-lg">ID</div>}
                className="animate-on-scroll opacity-0"
                delay={200}
              />
              
              <DataSourceCard 
                title="Location Data" 
                description="GPS and IP location help verify transaction origins and detect suspicious location patterns."
                icon={<MapPin className="h-6 w-6 text-red-500" />}
                className="animate-on-scroll opacity-0"
                delay={300}
              />
              
              <DataSourceCard 
                title="Credit Bureaus" 
                description="Information from credit bureaus provides essential financial background and credibility checks."
                icon={<Database className="h-6 w-6 text-blue-700" />}
                className="animate-on-scroll opacity-0"
                delay={400}
              />
              
              <DataSourceCard 
                title="Behavioral Analysis" 
                description="User behavior patterns help identify unusual activities that may indicate fraud attempts."
                icon={<div className="h-6 w-6 flex items-center justify-center text-orange-500 font-bold text-lg">👤</div>}
                className="animate-on-scroll opacity-0"
                delay={500}
              />
            </div>

            {/* Data Flow Animation */}
            <div className="relative flex justify-center items-center py-16">
              <div className="data-flow-lines absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
                  <path d="M400,0 C250,50 150,100 150,100 S250,150 400,200" className="stroke-blue-200 stroke-2 fill-none data-path" />
                  <path d="M400,0 C550,50 650,100 650,100 S550,150 400,200" className="stroke-purple-200 stroke-2 fill-none data-path" />
                </svg>
              </div>

              {/* AI Agent */}
              <div className="relative z-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full w-40 h-40 flex items-center justify-center shadow-lg animate-on-scroll opacity-0">
                <CloudCog className="text-white h-16 w-16 animate-pulse" />
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md">
                  <span className="font-semibold text-gray-800">AI Fraud Agent</span>
                </div>
              </div>
            </div>

            {/* Processing Explanation */}
            <div className="bg-blue-50 rounded-xl p-8 max-w-4xl mx-auto mt-16 shadow-sm animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">How Data Transforms Into Intelligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProcessStep 
                  number="1"
                  title="Collection" 
                  description="Our AI continuously gathers raw data from multiple sources in real-time"
                />
                <ProcessStep 
                  number="2"
                  title="Analysis" 
                  description="Advanced algorithms detect patterns and anomalies across diverse data sets"
                />
                <ProcessStep 
                  number="3"
                  title="Enrichment" 
                  description="Data is contextualized with historical information to improve accuracy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataSourceCard = ({ title, description, icon, className = "", delay = 0 }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${className}`}
            style={{ animationDelay: `${delay}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              {icon}
              <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Click to learn more about {title.toLowerCase()} data</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProcessStep = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3">
        {number}
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default DataCollectionSection;
