import React from 'react';

const words = [
  { text: 'नमस्ते', style: 'top-10 left-6 rotate-[-6deg]' }, // Hindi
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', style: 'top-1/4 left-1/5 rotate-[6deg]' }, // Punjabi
  { text: 'नमस्कार', style: 'top-1/2 right-10 rotate-[-3deg]' }, // Marathi/Maithili
  { text: 'வணக்கம்', style: 'bottom-24 left-12 rotate-[4deg]' }, // Tamil
  { text: 'স্বাগতম', style: 'bottom-10 right-1/4 rotate-[-5deg]' }, // Bengali
  { text: 'నమస్తే', style: 'top-1/3 right-8 rotate-[5deg]' }, // Telugu
  { text: 'ನಮಸ್ಕಾರ', style: 'bottom-1/3 left-1/3 rotate-[-4deg]' }, // Kannada
  { text: 'ନମସ୍କାର', style: 'top-14 right-1/3 rotate-[3deg]' }, // Odia
  { text: 'നമസ്കാരം', style: 'bottom-16 right-6 rotate-[-6deg]' }, // Malayalam
  { text: 'নমস্কাৰ', style: 'top-1/5 left-1/2 rotate-[2deg]' }, // Assamese
  { text: 'आदाब', style: 'bottom-28 right-1/2 rotate-[7deg]' }, // Urdu greeting (used in India)
  { text: 'जय हिन्द', style: 'top-1/2 left-6 rotate-[-7deg]' }, // Hindi patriotic
  { text: 'ભારત', style: 'bottom-8 left-1/2 rotate-[5deg]' }, // Gujarati "Bharat"
];

const WordOverlay = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {words.map((w, idx) => (
        <span
          key={idx}
          className={`absolute ${w.style} text-blue-700/10 text-2xl md:text-4xl font-extrabold tracking-wide whitespace-nowrap`}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
};

export default WordOverlay;


