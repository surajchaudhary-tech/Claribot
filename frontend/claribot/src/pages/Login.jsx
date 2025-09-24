import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthHeader from '../components/Auth/AuthHeader.jsx';
import AuthForm from '../components/Auth/AuthForm.jsx';
import AuthFeatures from '../components/Auth/AuthFeatures.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import WordOverlay from '../components/common/WordOverlay.jsx';

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authErrors, setAuthErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (user) navigate('/analyzer', { replace: true });
  }, [user, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) errors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) errors.email = 'Please enter a valid email address';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters long';
    setAuthErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (authErrors[name]) setAuthErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAuthSubmit = async () => {
    if (!validateForm()) return;
    setIsAuthLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      login({ name: formData.name, email: formData.email });
      navigate('/analyzer', { replace: true });
    } catch (e) {
      setAuthErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
      <WordOverlay />
      {/* Subtle tricolor top ribbon for trusted Indian feel */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>
      </div>
      <div className="max-w-md w-full space-y-8 relative">
        <AuthHeader isLogin={true} switchAuthMode={() => navigate('/signup')} />
        <AuthForm 
          isLogin={true}
          formData={formData}
          authErrors={authErrors}
          showPassword={showPassword}
          isAuthLoading={isAuthLoading}
          handleInputChange={handleInputChange}
          setShowPassword={setShowPassword}
          handleAuthSubmit={handleAuthSubmit}
        />
        {/* Trust indicators */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-700 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              <span className="font-semibold">Secure Sign-In</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">256-bit</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">SSL</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Made in India</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Your credentials are processed securely. We follow Indian data protection best practices.
          </div>
        </div>
        <AuthFeatures />
        <div className="text-center text-sm text-slate-600">New here? <Link to="/signup" className="text-blue-600 font-semibold">Create an account</Link></div>
      </div>
    </div>
  );
};

export default Login;


