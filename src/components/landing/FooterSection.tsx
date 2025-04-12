
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const FooterSection: React.FC = () => {
  return (
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
  );
};

export default FooterSection;
