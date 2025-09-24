import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bot, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import WordOverlay from '../components/common/WordOverlay.jsx';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-250">
      <WordOverlay />
      <div className="relative container mx-auto px-6 py-12 max-w-6xl">
        <header className="flex items-center justify-between mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-purple-800">ClariBot</h1>
              <p className="text-blue-600 text-medium">Financial Intelligence Platform</p>
            </div>
          </div>
          <nav className="flex items-center gap-3">
            {user ? (
              <Link to="/analyzer" className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Open Analyzer</Link>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-xl border-2 border-blue-200 text-blue-700 font-semibold bg-white hover:bg-blue-50 transition">Sign In</Link>
                <Link to="/signup" className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Get Started</Link>
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
    </div>
  );
};

export default Home;


