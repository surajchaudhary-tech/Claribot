import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Type, 
  Eye, 
  Sun, 
  Moon, 
  Contrast, 
  BookOpen,
  ArrowLeft,
  Save,
  RotateCcw,
  Check,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Accessibility,
  Zap
} from 'lucide-react';
import WordOverlay from '../components/common/WordOverlay.jsx';

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Theme states
  const [currentTheme, setCurrentTheme] = useState('light');
  const [themeVariant, setThemeVariant] = useState('default');
  
  // Font states
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('inter');
  
  // Accessibility states
  const [colorBlindType, setColorBlindType] = useState('none');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Device states
  const [deviceType, setDeviceType] = useState('desktop');
  
  // Preview states
  const [showPreview, setShowPreview] = useState(false);
  const [previewText, setPreviewText] = useState('Sample text for preview');

  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
    
    // Load saved settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem('claribot-settings') || '{}');
    setCurrentTheme(savedSettings.theme || 'light');
    setThemeVariant(savedSettings.themeVariant || 'default');
    setFontSize(savedSettings.fontSize || 16);
    setFontFamily(savedSettings.fontFamily || 'inter');
    setColorBlindType(savedSettings.colorBlindType || 'none');
    setHighContrast(savedSettings.highContrast || false);
    setReducedMotion(savedSettings.reducedMotion || false);
  }, [user, navigate]);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme
    root.setAttribute('data-theme', currentTheme);
    root.setAttribute('data-theme-variant', themeVariant);
    
    // Apply font size
    root.style.fontSize = `${fontSize}px`;
    
    // Apply font family
    root.setAttribute('data-font-family', fontFamily);
    
    // Apply color blind accessibility
    root.setAttribute('data-color-blind', colorBlindType);
    
    // Apply high contrast
    root.setAttribute('data-high-contrast', highContrast.toString());
    
    // Apply reduced motion
    root.setAttribute('data-reduced-motion', reducedMotion.toString());
    
  }, [currentTheme, themeVariant, fontSize, fontFamily, colorBlindType, highContrast, reducedMotion]);

  const saveSettings = () => {
    const settings = {
      theme: currentTheme,
      themeVariant,
      fontSize,
      fontFamily,
      colorBlindType,
      highContrast,
      reducedMotion
    };
    
    localStorage.setItem('claribot-settings', JSON.stringify(settings));
    
    // Show success feedback
    const saveButton = document.getElementById('save-settings');
    if (saveButton) {
      const originalText = saveButton.textContent;
      saveButton.textContent = 'Saved!';
      saveButton.classList.add('bg-green-500');
      setTimeout(() => {
        saveButton.textContent = originalText;
        saveButton.classList.remove('bg-green-500');
      }, 2000);
    }
  };

  const resetSettings = () => {
    setCurrentTheme('light');
    setThemeVariant('default');
    setFontSize(16);
    setFontFamily('inter');
    setColorBlindType('none');
    setHighContrast(false);
    setReducedMotion(false);
  };

  const themes = [
    { id: 'light', name: 'Light Mode', icon: Sun, description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark Mode', icon: Moon, description: 'Easy on the eyes in low light' },
    { id: 'warm-dark', name: 'Warm Dark', icon: BookOpen, description: 'Cozy amber-tinted dark theme' },
    { id: 'cool-dark', name: 'Cool Dark', icon: Moon, description: 'Modern blue-tinted dark theme' },
    { id: 'high-contrast', name: 'High Contrast', icon: Contrast, description: 'Maximum visibility and accessibility' },
    { id: 'sepia', name: 'Sepia Mode', icon: BookOpen, description: 'Vintage paper-like appearance' }
  ];

  const fontFamilies = [
    { id: 'inter', name: 'Inter', description: 'Modern, clean sans-serif' },
    { id: 'roboto', name: 'Roboto', description: 'Google\'s versatile font' },
    { id: 'open-sans', name: 'Open Sans', description: 'Highly readable humanist font' },
    { id: 'source-sans', name: 'Source Sans Pro', description: 'Adobe\'s clean font' },
    { id: 'noto-sans', name: 'Noto Sans', description: 'Google\'s international font' },
    { id: 'dyslexia-friendly', name: 'Dyslexia Friendly', description: 'OpenDyslexic font for better readability' },
    { id: 'hindi', name: 'Hindi Support', description: 'Noto Sans Devanagari for Hindi text' },
    { id: 'tamil', name: 'Tamil Support', description: 'Noto Sans Tamil for Tamil text' }
  ];

  const colorBlindTypes = [
    { id: 'none', name: 'None', description: 'Standard color palette' },
    { id: 'protanopia', name: 'Protanopia', description: 'Red-blind (red appears darker)' },
    { id: 'deuteranopia', name: 'Deuteranopia', description: 'Green-blind (green appears darker)' },
    { id: 'tritanopia', name: 'Tritanopia', description: 'Blue-blind (blue appears darker)' },
    { id: 'achromatopsia', name: 'Achromatopsia', description: 'Complete color blindness' }
  ];

  const getThemePreview = (themeId) => {
    const previews = {
      'light': 'bg-white text-slate-800 border-slate-200',
      'dark': 'bg-slate-900 text-white border-slate-700',
      'warm-dark': 'bg-amber-900 text-amber-100 border-amber-700',
      'cool-dark': 'bg-blue-900 text-blue-100 border-blue-700',
      'high-contrast': 'bg-black text-white border-white',
      'sepia': 'bg-amber-50 text-amber-900 border-amber-300'
    };
    return previews[themeId] || previews['light'];
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-250">
      <WordOverlay />
      
      <div className="relative container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Settings & Personalization</h1>
              <p className="text-slate-600">Customize your Claribot experience</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Theme Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-800">Appearance & Themes</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => setCurrentTheme(theme.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      currentTheme === theme.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <theme.icon className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-slate-800">{theme.name}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{theme.description}</p>
                    <div className={`w-full h-8 rounded-lg border ${getThemePreview(theme.id)}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Font Customization */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <Type className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-800">Typography</h2>
              </div>
              
              {/* Font Size Slider */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Font Size: {fontSize}px
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500">12px</span>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-xs text-slate-500">24px</span>
                </div>
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <p style={{ fontSize: `${fontSize}px` }} className="text-slate-800">
                    {previewText}
                  </p>
                </div>
              </div>

              {/* Font Family Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Font Family
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fontFamilies.map((font) => (
                    <div
                      key={font.id}
                      onClick={() => setFontFamily(font.id)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        fontFamily === font.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-800 mb-1">{font.name}</div>
                      <div className="text-sm text-slate-600">{font.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accessibility Settings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <Accessibility className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-800">Accessibility</h2>
              </div>
              
              {/* Color Blind Support */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Color Blind Support
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {colorBlindTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setColorBlindType(type.id)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        colorBlindType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-800 mb-1">{type.name}</div>
                      <div className="text-sm text-slate-600">{type.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Accessibility Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-800">High Contrast Mode</div>
                    <div className="text-sm text-slate-600">Enhanced contrast for better visibility</div>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      highContrast ? 'bg-blue-500' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                      highContrast ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-800">Reduce Motion</div>
                    <div className="text-sm text-slate-600">Minimize animations and transitions</div>
                  </div>
                  <button
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      reducedMotion ? 'bg-blue-500' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                      reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800">Live Preview</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Sample Card</div>
                  <div className="font-semibold text-slate-800">Financial Analysis</div>
                  <div className="text-sm text-slate-600">Document processed successfully</div>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">Primary</button>
                  <button className="px-3 py-1 border border-slate-300 text-slate-700 rounded-lg text-sm">Secondary</button>
                </div>
              </div>
            </div>

            {/* Device Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800">Device Preview</h3>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setDeviceType('desktop')}
                  className={`p-2 rounded-lg transition-all ${
                    deviceType === 'desktop' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceType('tablet')}
                  className={`p-2 rounded-lg transition-all ${
                    deviceType === 'tablet' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceType('mobile')}
                  className={`p-2 rounded-lg transition-all ${
                    deviceType === 'mobile' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="space-y-3">
                <button
                  id="save-settings"
                  onClick={saveSettings}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Settings
                </button>
                
                <button
                  onClick={resetSettings}
                  className="w-full flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800">Quick Stats</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Current Theme:</span>
                  <span className="font-semibold text-slate-800">{themes.find(t => t.id === currentTheme)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Font Size:</span>
                  <span className="font-semibold text-slate-800">{fontSize}px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Font Family:</span>
                  <span className="font-semibold text-slate-800">{fontFamilies.find(f => f.id === fontFamily)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Accessibility:</span>
                  <span className="font-semibold text-slate-800">
                    {colorBlindType !== 'none' || highContrast ? 'Enabled' : 'Standard'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
