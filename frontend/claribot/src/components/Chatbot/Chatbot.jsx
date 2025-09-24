import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, MessageCircle, HelpCircle, FileText, Shield, CreditCard, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import AnimatedRobot from './AnimatedRobot';
import { useVoice } from '../../hooks/useVoice';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm ClariBot Assistant. I can help you with government loan regulations, document uploads, and financial analysis questions. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  
  const { 
    isListening, 
    isSpeaking, 
    transcript, 
    error, 
    startListening, 
    stopListening, 
    speak, 
    stopSpeaking 
  } = useVoice();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update input text when voice transcript changes
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  // Auto-speak bot responses when voice is enabled
  useEffect(() => {
    if (voiceEnabled && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.isBot && !isLoading) {
        speak(lastMessage.text);
      }
    }
  }, [messages, voiceEnabled, speak, isLoading]);

  const quickQuestions = [
    { text: "Government loan interest rates", icon: CreditCard },
    { text: "How to upload documents", icon: FileText },
    { text: "Financial regulations", icon: Shield },
    { text: "Document requirements", icon: HelpCircle }
  ];

  const handleQuickQuestion = (question) => {
    setInputText(question);
    handleSendMessage(question);
  };

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // For demo purposes, using mock responses since Gemini API key needs to be configured
      const mockResponses = {
        "government loan interest rates": "Government loan interest rates in India vary by scheme. For example, Pradhan Mantri Mudra Yojana offers loans at 8.5-12% p.a., while Kisan Credit Card provides 4% p.a. for farmers. Rates depend on loan amount, tenure, and borrower profile.",
        "how to upload documents": "To upload documents: 1) Click 'Start Analyzing' on our homepage, 2) Select your PDF file (max 10MB), 3) Choose analysis language, 4) Click 'Get Financial Analysis'. Supported formats: Financial statements, reports, portfolios.",
        "financial regulations": "Key Indian financial regulations include RBI guidelines for banks, SEBI regulations for securities, and IRDAI for insurance. These ensure consumer protection, fair lending practices, and transparent financial services.",
        "document requirements": "For financial analysis, upload PDF documents containing: Balance sheets, Income statements, Cash flow statements, or Investment portfolios. Documents should be clear, readable, and in English or supported regional languages."
      };

      const lowerText = text.toLowerCase();
      let botResponse = "I can help you with government loan regulations, document uploads, and financial analysis. Could you be more specific about what you need?";
      
      for (const [key, response] of Object.entries(mockResponses)) {
        if (lowerText.includes(key.split(' ')[0]) || lowerText.includes(key.split(' ')[1])) {
          botResponse = response;
          break;
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now. Please try again later or contact support.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-blue-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">ClariBot Assistant</h3>
                <p className="text-blue-100 text-xs">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-blue-50 text-slate-700 border border-blue-100'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-blue-50 text-slate-700 border border-blue-100 p-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-3 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q.text)}
                  className="flex items-center gap-2 p-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                >
                  <q.icon className="w-3 h-3" />
                  <span className="truncate">{q.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Controls */}
          <div className="p-3 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-600">Voice Controls</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`p-1 rounded-lg transition-colors ${
                    voiceEnabled ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {voiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                </button>
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                  className={`p-1 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-700 animate-pulse' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                </button>
              </div>
            </div>
            {transcript && (
              <div className="text-xs text-slate-600 bg-white p-2 rounded border">
                <strong>Voice:</strong> {transcript}
              </div>
            )}
            {error && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about loans, regulations..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button with Animated Robot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <AnimatedRobot isActive={!isOpen} />
        )}
      </button>
    </div>
  );
};

export default Chatbot;
