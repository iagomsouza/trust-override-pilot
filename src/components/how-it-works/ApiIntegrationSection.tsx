
import React from 'react';
import { CodeBlock } from '@/components/how-it-works/CodeBlock';
import { ArrowRight, Shield, Server, Database, CheckCircle } from 'lucide-react';

const ApiIntegrationSection = () => {
  return (
    <div className="bg-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <h2 className="text-3xl font-bold mb-4">API Integration for Payment Ecosystem</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our secure API allows any layer of the payment ecosystem to enhance their fraud rules with real-time intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* API Flow Diagram */}
          <div className="animate-on-scroll opacity-0">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-center">Payment Ecosystem Integration</h3>
              <div className="relative">
                <img 
                  src="/lovable-uploads/609acdf0-d12c-4cb4-9a81-603b94b55e14.png" 
                  alt="Payment Ecosystem Diagram" 
                  className="mb-4 bg-black rounded-lg p-4"
                />
                
                {/* API Integration Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-blue-600/90 text-white py-2 px-4 rounded-full text-sm font-medium animate-pulse">
                    AI Fraud API
                  </div>
                  
                  {/* API Connection Lines */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
                      <path d="M250,100 L150,150" className="stroke-blue-300 stroke-2 dashed-line" strokeDasharray="5,5" />
                      <path d="M250,100 L350,150" className="stroke-blue-300 stroke-2 dashed-line" strokeDasharray="5,5" />
                      <path d="M250,100 L250,200" className="stroke-blue-300 stroke-2 dashed-line" strokeDasharray="5,5" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <IntegrationPoint 
                  title="Banks & Issuers" 
                  description="Enhance credit approval processes and transaction monitoring" 
                />
                <IntegrationPoint 
                  title="Payment Processors" 
                  description="Strengthen transaction validation and fraud detection rules" 
                />
                <IntegrationPoint 
                  title="Merchants" 
                  description="Improve checkout security and reduce chargebacks" 
                />
              </div>
            </div>
          </div>
          
          {/* API Example */}
          <div className="animate-on-scroll opacity-0" style={{ animationDelay: '200ms' }}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-900 p-4 flex items-center justify-between">
                <h3 className="text-white font-mono text-sm">Fraud Detection API Example</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">API Request</div>
                  <CodeBlock code={`
POST /api/v1/transaction/validate HTTP/1.1
Host: api.frauddetection.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "transaction_id": "tx_12345",
  "amount": 1299.99,
  "currency": "USD",
  "customer": {
    "id": "cus_xyz789",
    "email": "customer@example.com",
    "ip_address": "198.51.100.42",
    "device_id": "dev_abcdef"
  },
  "payment": {
    "method": "credit_card",
    "last4": "4242"
  }
}
                  `} language="json" />
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">API Response</div>
                  <CodeBlock code={`
{
  "transaction_id": "tx_12345",
  "risk_score": 18,
  "recommendation": "approve",
  "confidence": 0.92,
  "risk_factors": [
    {
      "type": "location_mismatch",
      "severity": "low",
      "description": "IP location differs from billing address"
    }
  ],
  "processing_time_ms": 124
}
                  `} language="json" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ApiFeature 
                icon={<Shield className="h-5 w-5 text-green-600" />}
                title="Real-time Protection" 
                description="Make fraud decisions in milliseconds with no added latency" 
              />
              <ApiFeature 
                icon={<Server className="h-5 w-5 text-blue-600" />}
                title="Easy Integration" 
                description="Simple REST API with comprehensive documentation" 
              />
              <ApiFeature 
                icon={<Database className="h-5 w-5 text-purple-600" />}
                title="Customizable Rules" 
                description="Tailor fraud detection to your specific business needs" 
              />
              <ApiFeature 
                icon={<CheckCircle className="h-5 w-5 text-teal-600" />}
                title="Continuous Learning" 
                description="AI models that improve over time with new data" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntegrationPoint = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const ApiFeature = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
      <div className="mt-0.5">
        {icon}
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ApiIntegrationSection;
