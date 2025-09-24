import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Upload, FileText, AlertTriangle, TrendingUp, CheckCircle, Loader, ChevronDown, Globe, Volume2, Play, Pause, Square, Shield, BarChart3, Award, Zap } from 'lucide-react';
import WordOverlay from '../components/common/WordOverlay.jsx';

const Analyzer = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const [speechSynthesisInstance] = useState(window.speechSynthesis);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);

  const languages = useMemo(() => ([
    { value: 'english', label: 'English', flag: '🇺🇸', nativeName: 'English' },
    { value: 'hindi', label: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { value: 'spanish', label: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { value: 'french', label: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { value: 'german', label: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { value: 'portuguese', label: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    { value: 'italian', label: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { value: 'chinese', label: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { value: 'japanese', label: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { value: 'korean', label: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { value: 'arabic', label: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
    { value: 'russian', label: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
    { value: 'dutch', label: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands' },
    { value: 'swedish', label: 'Swedish', flag: '🇸🇪', nativeName: 'Svenska' },
    { value: 'norwegian', label: 'Norwegian', flag: '🇳🇴', nativeName: 'Norsk' },
    { value: 'danish', label: 'Danish', flag: '🇩🇰', nativeName: 'Dansk' },
    { value: 'finnish', label: 'Finnish', flag: '🇫🇮', nativeName: 'Suomi' },
    { value: 'turkish', label: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
    { value: 'greek', label: 'Greek', flag: '🇬🇷', nativeName: 'Ελληνικά' },
    { value: 'polish', label: 'Polish', flag: '🇵🇱', nativeName: 'Polski' }
  ]), []);

  const selectedLanguage = languages.find(lang => lang.value === language);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const startSpeech = (text) => {
    if (speechSynthesisInstance.speaking) speechSynthesisInstance.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = speechSynthesisInstance.getVoices();
    const languageMap = { english: 'en', hindi: 'hi', spanish: 'es', french: 'fr', german: 'de', portuguese: 'pt', italian: 'it', chinese: 'zh', japanese: 'ja', korean: 'ko', arabic: 'ar', russian: 'ru', dutch: 'nl', swedish: 'sv', norwegian: 'no', danish: 'da', finnish: 'fi', turkish: 'tr', greek: 'el', polish: 'pl' };
    const langCode = languageMap[language] || 'en';
    const voice = voices.find(v => v.lang.includes(langCode));
    if (voice) utterance.voice = voice;
    utterance.onstart = () => { setIsPlaying(true); setIsPaused(false); };
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); setCurrentUtterance(null); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); setCurrentUtterance(null); };
    setCurrentUtterance(utterance);
    speechSynthesisInstance.speak(utterance);
  };

  const pauseSpeech = () => { if (speechSynthesisInstance.speaking && !speechSynthesisInstance.paused) { speechSynthesisInstance.pause(); setIsPaused(true); } };
  const resumeSpeech = () => { if (speechSynthesisInstance.paused) { speechSynthesisInstance.resume(); setIsPaused(false); } };
  const stopSpeech = () => { speechSynthesisInstance.cancel(); setIsPlaying(false); setIsPaused(false); setCurrentUtterance(null); };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') { setFile(droppedFile); setError(''); }
      else { setError('Please upload a PDF file only'); }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') { setFile(selectedFile); setError(''); }
      else { setError('Please upload a PDF file only'); }
    }
  };

  const handleLanguageSelect = (val) => { setLanguage(val); setIsLanguageDropdownOpen(false); };

  const handleAnalyzeSubmit = async () => {
    if (!file) { setError('Please select a PDF file'); return; }
    setLoading(true); setError(''); setAnalysis(null);
    const formDataObj = new FormData();
    formDataObj.append('pdfFile', file);
    formDataObj.append('language', language);
    try {
      const response = await fetch('https://claribot.onrender.com/analyze-pdf', { method: 'POST', body: formDataObj });
      const data = await response.json();
      if (data.success) setAnalysis(data.analysis);
      else setError(data.error || 'Analysis failed');
    } catch (err) {
      setError('Connection error. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    if (!risk) return 'text-slate-600';
    const riskLevel = risk.toLowerCase();
    if (riskLevel.includes('high') || riskLevel.includes('उच्च') || riskLevel.includes('alto') || riskLevel.includes('élevé') || riskLevel.includes('hoch') || riskLevel.includes('elevado') || riskLevel.includes('高') || riskLevel.includes('높은') || riskLevel.includes('عالي') || riskLevel.includes('высокий')) return 'text-red-600';
    if (riskLevel.includes('medium') || riskLevel.includes('मध्यम') || riskLevel.includes('medio') || riskLevel.includes('moyen') || riskLevel.includes('mittel') || riskLevel.includes('médio') || riskLevel.includes('中') || riskLevel.includes('중간') || riskLevel.includes('متوسط') || riskLevel.includes('средний')) return 'text-yellow-600';
    return 'text-green-600';
  };
  const getScoreColor = (score) => { const n = parseInt(score) || 0; if (n >= 70) return 'text-green-600'; if (n >= 40) return 'text-yellow-600'; return 'text-red-600'; };
  const getProgressBarColor = (score) => { const n = parseInt(score) || 0; if (n >= 70) return 'bg-green-500'; if (n >= 40) return 'bg-yellow-500'; return 'bg-red-500'; };

  if (!user) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <WordOverlay />
      <div className="relative container mx-auto px-6 py-8 max-w-7xl">
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
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">ClariBot</h1>
              <p className="text-blue-600 font-medium">Financial Document Analyzer</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-600">Welcome back,</p>
              <p className="font-semibold text-2xl text-slate-800">{user?.name}</p>
            </div>
            <button onClick={() => { logout(); navigate('/'); }} className="bg-red-300 hover:bg-red-400 text-red-800 px-6 py-2.5 rounded-xl font-medium shadow-sm border border-slate-200 transition-all duration-200 hover:shadow-md">Sign Out</button>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">National Financial Analysis</h2>
            <p className="text-xl text-slate-600 leading-relaxed">Upload your financial documents and receive comprehensive risk assessment with detailed analysis in your preferred language</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-blue-100">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg"><Globe className="w-5 h-5 text-blue-600" /></div>
                <h3 className="text-xl font-semibold text-blue-800">Select Analysis Language</h3>
              </div>
              <div className="relative">
                <button type="button" onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} className="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-300 text-left flex items-center justify-between transition-all duration-200 bg-white hover:shadow-md group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedLanguage?.flag}</span>
                    <div>
                      <span className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{selectedLanguage?.label}</span>
                      <span className="text-slate-500 ml-2 text-sm">({selectedLanguage?.nativeName})</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLanguageDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-2xl shadow-xl z-20 max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <button key={lang.value} type="button" onClick={() => handleLanguageSelect(lang.value)} className={`w-full p-3 text-left hover:bg-blue-50 flex items-center gap-3 transition-all duration-200 ${language === lang.value ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'} first:rounded-t-2xl last:rounded-b-2xl`}>
                        <span className="text-lg">{lang.flag}</span>
                        <div>
                          <span className="font-medium">{lang.label}</span>
                          <span className="text-slate-500 ml-2 text-sm">({lang.nativeName})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg"><FileText className="w-5 h-5 text-blue-600" /></div>
                <h3 className="text-xl font-semibold text-blue-800">Upload Financial Document</h3>
              </div>
              <div className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${dragActive ? 'border-blue-400 bg-blue-50 shadow-lg scale-105' : file ? 'border-green-400 bg-green-50 shadow-md' : 'border-slate-300 hover:border-blue-300 hover:bg-blue-25'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                {file ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                    <div className="text-left">
                      <div className="text-slate-800 font-semibold text-lg">{file.name}</div>
                      <div className="text-slate-600">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center"><Upload className="w-8 h-8 text-blue-600" /></div>
                    <div>
                      <p className="text-slate-700 text-lg mb-2">Drop your PDF here or <span className="text-blue-600 font-semibold">click to browse</span></p>
                      <p className="text-slate-500">PDF files only, max 10MB</p>
                      <p className="text-slate-400 text-sm mt-2">Supported: Financial statements, reports, portfolios</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            )}

            <button onClick={handleAnalyzeSubmit} disabled={!file || loading} className={`w-full py-5 px-8 rounded-2xl font-semibold text-white text-lg transition-all duration-300 flex items-center justify-center gap-3 ${!file || loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'}`}>
              {loading ? (<><Loader className="animate-spin w-6 h-6" />Analyzing Document...</>) : (<><Zap className="w-6 h-6" />Get Financial Analysis</>)}
            </button>
          </div>
        </div>

        {analysis && (
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4"><Award className="w-5 h-5 text-blue-600" /><span className="text-blue-700 font-semibold">Analysis Complete</span></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Financial Analysis Report</h2>
              <p className="text-slate-600 text-lg">Comprehensive insights into your financial document</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6"><div className="p-4 bg-red-100 rounded-2xl group-hover:scale-110 transition-transform duration-300"><AlertTriangle className="w-8 h-8 text-red-600" /></div><div><h3 className="text-xl font-bold text-slate-800">Risk Level</h3><p className="text-slate-500">Overall Assessment</p></div></div>
                <div className={`text-4xl font-bold mb-3 ${getRiskColor(analysis.risk)}`}>{analysis.risk}</div>
                <p className="text-slate-600">Current risk classification</p>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6"><div className="p-4 bg-yellow-100 rounded-2xl group-hover:scale-110 transition-transform duration-300"><TrendingUp className="w-8 h-8 text-yellow-600" /></div><div><h3 className="text-xl font-bold text-slate-800">Risk Score</h3><p className="text-slate-500">Quantified Risk</p></div></div>
                <div className={`text-4xl font-bold mb-3 ${getScoreColor(analysis.percentage)}`}>{analysis.percentage}%</div>
                <div className="mt-4 bg-slate-200 rounded-full h-3 overflow-hidden"><div className={`h-3 rounded-full transition-all duration-1000 ${getProgressBarColor(analysis.percentage)}`} style={{ width: `${Math.min(100, Math.max(0, parseInt(analysis.percentage) || 0))}%` }}></div></div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6"><div className="p-4 bg-blue-100 rounded-2xl group-hover:scale-110 transition-transform duration-300"><BarChart3 className="w-8 h-8 text-blue-600" /></div><div><h3 className="text-xl font-bold text-slate-800">Portfolio Score</h3><p className="text-slate-500">Diversification</p></div></div>
                <div className={`text-4xl font-bold mb-3 ${getScoreColor(analysis.diversification_score)}`}>{analysis.diversification_score}/100</div>
                <div className="mt-4 bg-slate-200 rounded-full h-3 overflow-hidden"><div className={`h-3 rounded-full transition-all duration-1000 ${getProgressBarColor(analysis.diversification_score)}`} style={{ width: `${Math.min(100, Math.max(0, parseInt(analysis.diversification_score) || 0))}%` }}></div></div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100">
              <div className="p-8 border-b border-slate-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4"><div className="p-3 bg-slate-100 rounded-2xl"><FileText className="w-8 h-8 text-slate-700" /></div><div><h3 className="text-2xl font-bold text-slate-800">Detailed Analysis Report</h3><p className="text-slate-600">Complete breakdown of your financial document</p></div></div>
                  <div className="flex items-center gap-3">
                    {!isPlaying && !isPaused && (<button onClick={() => startSpeech(analysis.response)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"><Volume2 className="w-4 h-4" />Listen</button>)}
                    {isPlaying && !isPaused && (<button onClick={pauseSpeech} className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium shadow-lg transition-all duration-200"><Pause className="w-4 h-4" />Pause</button>)}
                    {isPaused && (<button onClick={resumeSpeech} className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium shadow-lg transition-all duration-200"><Play className="w-4 h-4" />Resume</button>)}
                    {(isPlaying || isPaused) && (<button onClick={stopSpeech} className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium shadow-lg transition-all duration-200"><Square className="w-4 h-4" />Stop</button>)}
                  </div>
                </div>
              </div>
              <div className="p-8"><div className="prose prose-slate max-w-none"><div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap text-justify">{analysis.response}</div></div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;


