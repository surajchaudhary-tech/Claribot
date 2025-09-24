import React from 'react';
import { Eye, EyeOff, Lock, Mail, User, Shield, Loader } from 'lucide-react';

const AuthForm = ({ 
  isLogin, 
  formData, 
  authErrors, 
  showPassword, 
  isAuthLoading, 
  handleInputChange, 
  setShowPassword, 
  handleAuthSubmit 
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
          Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="w-5 h-5 text-slate-400" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none transition-all duration-200 ${
              authErrors.name 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
            } focus:ring-4 focus:ring-opacity-20`}
            placeholder="Enter your name"
          />
        </div>
        {authErrors.name && (
          <p className="text-sm text-red-600 font-medium">{authErrors.name}</p>
        )}
      </div>

      {/* Full Name (Registration only) */}
      {!isLogin && (
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none transition-all duration-200 ${
                authErrors.fullName 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
              } focus:ring-4 focus:ring-opacity-20`}
              placeholder="Enter your full name"
            />
          </div>
          {authErrors.fullName && (
            <p className="text-sm text-red-600 font-medium">{authErrors.fullName}</p>
          )}
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-slate-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none transition-all duration-200 ${
              authErrors.email 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
            } focus:ring-4 focus:ring-opacity-20`}
            placeholder="Enter your email"
          />
        </div>
        {authErrors.email && (
          <p className="text-sm text-red-600 font-medium">{authErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-slate-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={formData.password}
            onChange={handleInputChange}
            className={`block w-full pl-12 pr-12 py-4 border-2 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none transition-all duration-200 ${
              authErrors.password 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
            } focus:ring-4 focus:ring-opacity-20`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
            ) : (
              <Eye className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
            )}
          </button>
        </div>
        {authErrors.password && (
          <p className="text-sm text-red-600 font-medium">{authErrors.password}</p>
        )}
      </div>

      {/* Confirm Password (Registration only) */}
      {!isLogin && (
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-slate-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none transition-all duration-200 ${
                authErrors.confirmPassword 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
              } focus:ring-4 focus:ring-opacity-20`}
              placeholder="Confirm your password"
            />
          </div>
          {authErrors.confirmPassword && (
            <p className="text-sm text-red-600 font-medium">{authErrors.confirmPassword}</p>
          )}
        </div>
      )}

      {/* Terms and Conditions (Registration only) */}
      {!isLogin && (
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded transition-colors"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-slate-700 leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Privacy Policy
              </a>
            </label>
          </div>
          {authErrors.agreeToTerms && (
            <p className="text-sm text-red-600 font-medium">{authErrors.agreeToTerms}</p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleAuthSubmit}
          disabled={isAuthLoading}
          className={`w-full flex justify-center items-center py-4 px-6 border-0 text-lg font-semibold rounded-2xl text-white transition-all duration-200 ${
            isAuthLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
          }`}
        >
          {isAuthLoading ? (
            <div className="flex items-center gap-3">
              <Loader className="animate-spin w-5 h-5" />
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5" />
              {isLogin ? 'Sign In' : 'Create Account'}
            </div>
          )}
        </button>
      </div>

      {/* Submit Error */}
      {authErrors.submit && (
        <div className="text-center pt-2">
          <p className="text-sm text-red-600 font-medium">{authErrors.submit}</p>
        </div>
      )}

      {/* Forgot Password (Login only) */}
      {isLogin && (
        <div className="text-center pt-4">
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
          >
            Forgot your password?
          </a>
        </div>
      )}
    </div>
  );
};

export default AuthForm;