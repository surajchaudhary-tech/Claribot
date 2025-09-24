import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector = ({ 
  languages, 
  selectedLanguage, 
  isLanguageDropdownOpen, 
  setIsLanguageDropdownOpen, 
  handleLanguageSelect 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Globe className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Select Analysis Language</h3>
      </div>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          className="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-300 text-left flex items-center justify-between transition-all duration-200 bg-white hover:shadow-md group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedLanguage?.flag}</span>
            <div>
              <span className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                {selectedLanguage?.label}
              </span>
              <span className="text-slate-500 ml-2 text-sm">({selectedLanguage?.nativeName})</span>
            </div>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {isLanguageDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-2xl shadow-xl z-20 max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.value}
                type="button"
                onClick={() => handleLanguageSelect(lang.value)}
                className={`w-full p-3 text-left hover:bg-blue-50 flex items-center gap-3 transition-all duration-200 ${
                  selectedLanguage.value === lang.value ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'
                } first:rounded-t-2xl last:rounded-b-2xl`}
              >
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
  );
};

export default LanguageSelector;