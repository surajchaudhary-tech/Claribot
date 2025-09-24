import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthHeader from '../components/Auth/AuthHeader.jsx';
import AuthForm from '../components/Auth/AuthForm.jsx';
import AuthFeatures from '../components/Auth/AuthFeatures.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import WordOverlay from '../components/common/WordOverlay.jsx';

const Signup = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authErrors, setAuthErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', fullName: '', email: '', password: '', confirmPassword: '', agreeToTerms: false });

  useEffect(() => {
    if (user) navigate('/analyzer', { replace: true });
  }, [user, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) errors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) errors.email = 'Please enter a valid email address';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters long';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) errors.agreeToTerms = 'You must agree to the terms and conditions';
    setAuthErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (authErrors[name]) setAuthErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAuthSubmit = async () => {
    if (!validateForm()) return;
    setIsAuthLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      // Fake register then log in
      login({ name: formData.name, email: formData.email });
      navigate('/analyzer', { replace: true });
    } catch (e) {
      setAuthErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
      <WordOverlay />
      <div className="max-w-md w-full space-y-8 relative">
        <AuthHeader isLogin={false} switchAuthMode={() => navigate('/login')} />
        <AuthForm 
          isLogin={false}
          formData={formData}
          authErrors={authErrors}
          showPassword={showPassword}
          isAuthLoading={isAuthLoading}
          handleInputChange={handleInputChange}
          setShowPassword={setShowPassword}
          handleAuthSubmit={handleAuthSubmit}
        />
        <AuthFeatures />
        <div className="text-center text-sm text-slate-600">Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Sign in</Link></div>
      </div>
    </div>
  );
};

export default Signup;


