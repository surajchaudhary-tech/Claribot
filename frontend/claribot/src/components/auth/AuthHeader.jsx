import React from 'react';
import { Bot, Shield } from 'lucide-react';

const AuthHeader = ({ isLogin, switchAuthMode }) => {
  return (
    <div className="text-center">
      <div className="relative mx-auto mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Shield className="w-4 h-4 text-blue-600" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
        ClariBot
      </h1>
      <p className="text-slate-600 text-lg font-medium mb-6">Financial Intelligence Platform</p>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-blue-100 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={switchAuthMode}
            className="ml-2 font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;