import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, TrendingUp, PieChart, CheckCircle, Loader, ChevronDown, Globe, Volume2, VolumeX, Play, Pause, Square } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  
  // Speech synthesis states
  const [speechSynthesis] = useState(window.speechSynthesis);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const languages = [
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
  ];

  const selectedLanguage = languages.find(lang => lang.value === language);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Text-to-speech functions
  const startSpeech = (text) => {
    console.log(text)
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Set voice based on selected language
    const voices = speechSynthesis.getVoices();
    const languageMap = {
      'english': 'en',
      'hindi': 'hi',
      'spanish': 'es',
      'french': 'fr',
      'german': 'de',
      'portuguese': 'pt',
      'italian': 'it',
      'chinese': 'zh',
      'japanese': 'ja',
      'korean': 'ko',
      'arabic': 'ar',
      'russian': 'ru',
      'dutch': 'nl',
      'swedish': 'sv',
      'norwegian': 'no',
      'danish': 'da',
      'finnish': 'fi',
      'turkish': 'tr',
      'greek': 'el',
      'polish': 'pl'
    };
    
    const langCode = languageMap[language] || 'en';
    const voice = voices.find(voice => voice.lang.includes(langCode));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    };

    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentUtterance(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setError('');
      } else {
        setError('Please upload a PDF file only');
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF file only');
      }
    }
  };

  const handleLanguageSelect = (langValue) => {
    setLanguage(langValue);
    setIsLanguageDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('language', language);

    try {
      const response = await fetch('http://localhost:3000/analyze-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Connection error. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    if (!risk) return 'text-gray-500';
    const riskLevel = risk.toLowerCase();
    if (riskLevel.includes('high') || riskLevel.includes('उच्च') || riskLevel.includes('alto') || 
        riskLevel.includes('élevé') || riskLevel.includes('hoch') || riskLevel.includes('elevado') ||
        riskLevel.includes('alto') || riskLevel.includes('高') || riskLevel.includes('높은') ||
        riskLevel.includes('عالي') || riskLevel.includes('высокий')) {
      return 'text-gray-900';
    } else if (riskLevel.includes('medium') || riskLevel.includes('मध्यम') || riskLevel.includes('medio') ||
               riskLevel.includes('moyen') || riskLevel.includes('mittel') || riskLevel.includes('médio') ||
               riskLevel.includes('medio') || riskLevel.includes('中') || riskLevel.includes('중간') ||
               riskLevel.includes('متوسط') || riskLevel.includes('средний')) {
      return 'text-gray-700';
    } else {
      return 'text-gray-600';
    }
  };

  const getScoreColor = (score) => {
    const numScore = parseInt(score) || 0;
    if (numScore >= 70) return 'text-gray-600';
    if (numScore >= 40) return 'text-gray-700';
    return 'text-gray-900';
  };

  const getProgressBarColor = (score) => {
    const numScore = parseInt(score) || 0;
    if (numScore >= 70) return 'bg-gray-600';
    if (numScore >= 40) return 'bg-gray-700';
    return 'bg-gray-900';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-black rounded-xl text-white shadow-lg">
              <FileText size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
              Financial PDF Analyzer
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload your financial documents and get AI-powered comprehensive risk assessment with detailed analysis in your preferred language
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-200 backdrop-blur-sm">
            {/* Language Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Globe size={16} />
                Select Analysis Language
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="w-full p-4 rounded-xl border-2 border-gray-300 hover:border-gray-400 text-left flex items-center justify-between transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl filter grayscale">{selectedLanguage?.flag}</span>
                    <div>
                      <span className="font-medium text-gray-900">{selectedLanguage?.label}</span>
                      <span className="text-sm text-gray-600 ml-2">({selectedLanguage?.nativeName})</span>
                    </div>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl z-10 max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.value}
                        type="button"
                        onClick={() => handleLanguageSelect(lang.value)}
                        className={`w-full p-3 text-left hover:bg-gray-100 flex items-center gap-3 transition-all duration-150 ${
                          language === lang.value ? 'bg-gray-200 text-black font-medium' : 'text-gray-700'
                        } first:rounded-t-xl last:rounded-b-xl`}
                      >
                        <span className="text-lg filter grayscale">{lang.flag}</span>
                        <div>
                          <span className="font-medium">{lang.label}</span>
                          <span className="text-sm text-gray-500 ml-2">({lang.nativeName})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Upload Financial PDF Document
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-black bg-gray-100 shadow-inner'
                    : file
                    ? 'border-gray-600 bg-gray-50 shadow-inner'
                    : 'border-gray-400 hover:border-gray-500 hover:shadow-md'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-gray-700" size={24} />
                    <div className="text-left">
                      <div className="text-gray-900 font-medium">{file.name}</div>
                      <div className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto text-gray-500 mb-4" size={32} />
                    <p className="text-gray-700 mb-2">
                      Drop your financial PDF here or <span className="text-black font-medium">click to browse</span>
                    </p>
                    <p className="text-sm text-gray-500">PDF files only, max 10MB</p>
                    <p className="text-xs text-gray-400 mt-1">Supported: Financial statements, reports, portfolios, etc.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-gray-100 border-2 border-gray-400 rounded-xl flex items-center gap-3 shadow-inner">
                <AlertTriangle className="text-gray-800 flex-shrink-0" size={20} />
                <span className="text-gray-900 font-medium">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!file || loading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                !file || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 hover:shadow-xl transform hover:scale-105 active:scale-95'
              }`}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Analyzing Financial Document...
                </>
              ) : (
                <>
                  <TrendingUp size={20} />
                  Get Comprehensive Financial Analysis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Comprehensive Financial Analysis</h2>
            
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Risk Level Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-gray-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gray-200 rounded-xl shadow-inner">
                    <AlertTriangle className="text-gray-800" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
                </div>
                <div className={`text-3xl font-bold mb-2 ${getRiskColor(analysis.risk)}`}>
                  {analysis.risk}
                </div>
                <p className="text-sm text-gray-600">Overall risk evaluation</p>
              </div>

              {/* Risk Percentage Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-gray-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gray-200 rounded-xl shadow-inner">
                    <TrendingUp className="text-gray-800" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Risk Score</h3>
                </div>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysis.percentage)}`}>
                  {analysis.percentage}%
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-3 shadow-inner">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 shadow-sm ${getProgressBarColor(analysis.percentage)}`}
                    style={{ width: `${Math.min(100, Math.max(0, parseInt(analysis.percentage) || 0))}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Quantified risk percentage</p>
              </div>

              {/* Diversification Score Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-gray-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gray-200 rounded-xl shadow-inner">
                    <PieChart className="text-gray-800" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Portfolio Health</h3>
                </div>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysis.diversification_score)}`}>
                  {analysis.diversification_score}/100
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-3 shadow-inner">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 shadow-sm ${getProgressBarColor(analysis.diversification_score)}`}
                    style={{ width: `${Math.min(100, Math.max(0, parseInt(analysis.diversification_score) || 0))}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Diversification strength</p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 hover:border-gray-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-200 rounded-xl shadow-inner">
                    <FileText className="text-gray-800" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Comprehensive Financial Analysis Report</h3>
                </div>
                
                {/* Audio Controls */}
                <div className="flex items-center gap-2">
                  {!isPlaying && !isPaused && (
                    <button
                      onClick={() => startSpeech(analysis.response)
                        
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                      title="Listen to Summary"
                    >
                      <Volume2 size={16} />
                      Listen to Summary
                    </button>
                  )}
                  
                  {isPlaying && !isPaused && (
                    <button
                      onClick={pauseSpeech}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                      title="Pause"
                    >
                      <Pause size={16} />
                      Pause
                    </button>
                  )}
                  
                  {isPaused && (
                    <button
                      onClick={resumeSpeech}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                      title="Resume"
                    >
                      <Play size={16} />
                      Resume
                    </button>
                  )}
                  
                  {(isPlaying || isPaused) && (
                    <button
                      onClick={stopSpeech}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                      title="Stop"
                    >
                      <Square size={16} />
                      Stop
                    </button>
                  )}
                </div>
              </div>
              
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-gray-200 text-justify shadow-inner">
                {analysis.response}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;