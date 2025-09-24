import React, { useState, useEffect } from 'react';
import { Bot, Eye, EyeOff } from 'lucide-react';

const AnimatedRobot = ({ isActive = false }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    // Blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    // Floating animation
    const floatInterval = setInterval(() => {
      setIsFloating(true);
      setTimeout(() => setIsFloating(false), 2000);
    }, 4000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(floatInterval);
    };
  }, []);

  return (
    <div className={`relative transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
      {/* Robot Body */}
      <div className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg flex items-center justify-center transition-transform duration-300 ${isFloating ? 'translate-y-[-4px]' : 'translate-y-0'}`}>
        <Bot className="w-8 h-8 text-white" />
      </div>
      
      {/* Robot Head */}
      <div className={`absolute -top-2 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md transition-transform duration-200 ${isBlinking ? 'scale-95' : 'scale-100'}`}>
        {isBlinking ? (
          <EyeOff className="w-3 h-3 text-blue-600" />
        ) : (
          <Eye className="w-3 h-3 text-blue-600" />
        )}
      </div>

      {/* Antenna */}
      <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-blue-400 rounded-full transition-transform duration-300 ${isFloating ? 'translate-y-[-2px]' : 'translate-y-0'}`}>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>

      {/* Speech bubble when active */}
      {isActive && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 border border-blue-200 animate-bounce">
          <div className="text-xs text-blue-700 font-semibold">Hi! Ask me anything!</div>
          <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-2 right-2 w-1 h-1 bg-blue-300 rounded-full transition-all duration-1000 ${isFloating ? 'opacity-100 translate-y-[-8px]' : 'opacity-0 translate-y-0'}`}></div>
        <div className={`absolute top-4 left-2 w-1 h-1 bg-blue-300 rounded-full transition-all duration-1000 delay-200 ${isFloating ? 'opacity-100 translate-y-[-6px]' : 'opacity-0 translate-y-0'}`}></div>
        <div className={`absolute bottom-2 right-4 w-1 h-1 bg-blue-300 rounded-full transition-all duration-1000 delay-400 ${isFloating ? 'opacity-100 translate-y-[-4px]' : 'opacity-0 translate-y-0'}`}></div>
      </div>
    </div>
  );
};

export default AnimatedRobot;
