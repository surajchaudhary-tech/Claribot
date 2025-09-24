import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bot, FileText, ArrowRight, BarChart3, Globe, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import WordOverlay from '../components/common/WordOverlay.jsx';
import Chatbot from '../components/Chatbot/Chatbot.jsx';
import RBIActionPanel from '../components/RBIActions/RBIActionPanel.jsx';
import PersonalizedDashboard from '../components/Dashboard/PersonalizedDashboard.jsx';
import RBIDataFeed from '../components/RBIIntegration/RBIDataFeed.jsx';
import PlatformSelector from '../components/MultiPlatform/PlatformSelector.jsx';

const Home = () => {
  const { user } = useAuth();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isRBIFeedOpen, setIsRBIFeedOpen] = useState(false);
  const [isPlatformSelectorOpen, setIsPlatformSelectorOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-250">
      <WordOverlay />
      
      {/* Left Upper Corner - Dashboard */}
      <button
        onClick={() => setIsDashboardOpen(true)}
        className="fixed left-6 top-6 z-40 group"
        title="Personal Dashboard"
      >
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-100 hover:shadow-xl transition-all group-hover:scale-105">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-slate-800 text-sm">Dashboard</div>
            <div className="text-xs text-slate-600">Track Progress</div>
          </div>
        </div>
      </button>

      {/* Below Dashboard - Platform Links */}
      <button
        onClick={() => setIsPlatformSelectorOpen(true)}
        className="fixed left-6 top-32 z-40 group"
        title="Multi-Platform Access"
      >
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100 hover:shadow-xl transition-all group-hover:scale-105">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <Globe className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-slate-800 text-sm">Multi-Platform</div>
            <div className="text-xs text-slate-600">WhatsApp, Telegram</div>
          </div>
        </div>
      </button>

      {/* Right Side RBI Data Feed Icon */}
      <button
        onClick={() => setIsRBIFeedOpen(true)}
        className="fixed right-6 top-6 z-40 group"
        title="RBI Data Feed"
      >
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100 hover:shadow-xl transition-all group-hover:scale-105">
          <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
            <Globe className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-slate-800 text-sm">RBI Feed</div>
            <div className="text-xs text-slate-600">Live Data</div>
          </div>
        </div>
      </button>

      <div className="relative container mx-auto px-6 py-12 max-w-6xl">
        <header className="flex items-center justify-between mb-12 bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-blue-100 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Cool New Claribot Logo */}
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="relative">
                  <Bot className="w-8 h-8 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ClariBot
              </h1>
              <p className="text-slate-600 text-sm font-medium">AI Financial Intelligence</p>
            </div>
          </div>
          <nav className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/analyzer" className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                  Open Analyzer
                </Link>
                <Link to="/settings" className="p-2 rounded-xl border-2 border-blue-200 text-blue-700 hover:bg-blue-50 transition-all">
                  <SettingsIcon className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-xl border-2 border-blue-200 text-blue-700 font-semibold bg-white/50 hover:bg-white/80 transition">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </header>

        <section className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Analyze Financial Documents </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">Upload financial documents and get instant multi-language risk assessment, portfolio diversification scores, and a narrated summary.</p>
          <div className="mt-8">
            <Link to={user ? '/analyzer' : '/signup'} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl">
              {user ? 'Start Analyzing' : 'Create Free Account'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow border border-blue-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className=" text-2xl font-semibold text-slate-800 mb-1">Secure Analysis</h3>
            <p className="text-slate-600 text-sm">Your documents stay private while we extract key insights safely.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border border-blue-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-1">Actionable Reports</h3>
            <p className="text-slate-600 text-sm">Risk levels, scores, and diversification metrics—ready for decisions.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border border-blue-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Bot className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className=" text-2xl font-semibold text-slate-800 mb-1">Narrated Summaries</h3>
            <p className="text-slate-600 text-sm">Listen to results in your preferred language with built-in TTS.</p>
          </div>
        </section>
      </div>
      

      <Chatbot />
      <RBIActionPanel />
      
      {/* Modal Components */}
      <PersonalizedDashboard 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)} 
        user={user}
      />
      <RBIDataFeed 
        isOpen={isRBIFeedOpen} 
        onClose={() => setIsRBIFeedOpen(false)} 
      />
      <PlatformSelector 
        isOpen={isPlatformSelectorOpen} 
        onClose={() => setIsPlatformSelectorOpen(false)} 
      />
    </div>
  );
};

export default Home;


