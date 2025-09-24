import React from 'react';
import { Shield, Zap, Globe } from 'lucide-react';

const AuthFeatures = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
      <h3 className="text-center text-lg font-semibold text-slate-800 mb-4">
        Why Choose ClariBot?
      </h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs font-medium text-slate-600">Secure Analysis</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs font-medium text-slate-600">AI-Powered</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs font-medium text-slate-600">Multi-Language</span>
        </div>
      </div>
    </div>
  );
};

export default AuthFeatures;