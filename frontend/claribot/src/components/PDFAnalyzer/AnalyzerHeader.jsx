import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const AnalyzerHeader = ({ userName, onSignOut }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center mb-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-blue-100">
      <div className="flex items-center gap-4 mb-4 lg:mb-0">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
            ClariBot
          </h1>
          <p className="text-blue-600 font-medium">Financial Document Analyzer</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-slate-600">Welcome back,</p>
          <p className="font-semibold text-slate-800">{userName}</p>
        </div>
        <button
          onClick={onSignOut}
          className="bg-white hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl font-medium shadow-sm border border-slate-200 transition-all duration-200 hover:shadow-md"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AnalyzerHeader;