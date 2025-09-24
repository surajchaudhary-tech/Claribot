import React, { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Share2, 
  Copy, 
  Check,
  ExternalLink,
  QrCode,
  Download,
  Settings,
  Bot,
  Users,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const PlatformSelector = ({ isOpen, onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [copied, setCopied] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  const platforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '💬',
      description: 'Connect with Claribot on WhatsApp for instant financial guidance',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      features: [
        'Voice messages support',
        'Document sharing',
        'Real-time notifications',
        'Group chat integration'
      ],
      setup: {
        phone: '+91-9876543210',
        link: 'https://wa.me/919876543210?text=Hi%20Claribot',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/919876543210?text=Hi%20Claribot'
      }
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '✈️',
      description: 'Join our Telegram bot for comprehensive financial assistance',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: [
        'Inline keyboards',
        'File sharing up to 2GB',
        'Channel updates',
        'Bot commands'
      ],
      setup: {
        username: '@ClaribotOfficial',
        link: 'https://t.me/ClaribotOfficial',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://t.me/ClaribotOfficial'
      }
    },
    {
      id: 'facebook',
      name: 'Facebook Messenger',
      icon: '📘',
      description: 'Chat with Claribot on Facebook Messenger',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: [
        'Rich media support',
        'Quick replies',
        'Persistent menu',
        'Webhook integration'
      ],
      setup: {
        page: 'Claribot Financial Assistant',
        link: 'https://m.me/ClaribotOfficial',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://m.me/ClaribotOfficial'
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      description: 'Follow and DM Claribot on Instagram',
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      features: [
        'Story interactions',
        'Direct messages',
        'Visual content sharing',
        'Hashtag integration'
      ],
      setup: {
        handle: '@claribot_official',
        link: 'https://instagram.com/claribot_official',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://instagram.com/claribot_official'
      }
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: '🐦',
      description: 'Get financial updates and chat with Claribot on Twitter',
      color: 'from-slate-600 to-slate-700',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      features: [
        'Tweet interactions',
        'Direct messages',
        'Thread support',
        'Hashtag monitoring'
      ],
      setup: {
        handle: '@ClaribotOfficial',
        link: 'https://twitter.com/ClaribotOfficial',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://twitter.com/ClaribotOfficial'
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      description: 'Professional financial guidance on LinkedIn',
      color: 'from-blue-700 to-blue-800',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: [
        'Professional networking',
        'Article sharing',
        'Company updates',
        'B2B interactions'
      ],
      setup: {
        page: 'Claribot Financial Services',
        link: 'https://linkedin.com/company/claribot',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://linkedin.com/company/claribot'
      }
    }
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generateQRCode = (url) => {
    setQrCode(url);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-2xl">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Multi-Platform Access</h2>
                  <p className="text-white text-opacity-90">Connect with Claribot across all your favorite platforms</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform) => (
                <div 
                  key={platform.id}
                  className={`${platform.bgColor} rounded-2xl p-6 border-2 ${platform.borderColor} hover:shadow-lg transition-all cursor-pointer ${
                    selectedPlatform?.id === platform.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setSelectedPlatform(platform)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{platform.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{platform.name}</h3>
                      <p className="text-sm text-slate-600">{platform.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-700 text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {platform.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                          <Check className="w-3 h-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(platform.setup.link, '_blank');
                      }}
                      className={`w-full bg-gradient-to-r ${platform.color} text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Connect Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Details Modal */}
      {selectedPlatform && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className={`bg-gradient-to-r ${selectedPlatform.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{selectedPlatform.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPlatform.name}</h3>
                    <p className="text-white text-opacity-80">Setup Instructions</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlatform(null)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Connection Methods */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-800">Connection Methods</h4>
                
                {/* Direct Link */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-700">Direct Link</span>
                    <button
                      onClick={() => copyToClipboard(selectedPlatform.setup.link)}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="text-sm text-slate-600 break-all">{selectedPlatform.setup.link}</div>
                </div>

                {/* QR Code */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-slate-700">QR Code</span>
                    <button
                      onClick={() => generateQRCode(selectedPlatform.setup.qrCode)}
                      className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all"
                    >
                      <QrCode className="w-4 h-4" />
                      Generate QR
                    </button>
                  </div>
                  {qrCode && (
                    <div className="flex justify-center">
                      <img src={qrCode} alt="QR Code" className="w-32 h-32" />
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-3">Available Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPlatform.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Setup Instructions */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-3">Setup Instructions</h4>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>Click "Connect Now" or scan the QR code with your device</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>Follow the platform-specific setup instructions</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>Start chatting with Claribot for financial assistance</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => window.open(selectedPlatform.setup.link, '_blank')}
                  className={`flex-1 bg-gradient-to-r ${selectedPlatform.color} text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open {selectedPlatform.name}
                </button>
                <button
                  onClick={() => setSelectedPlatform(null)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlatformSelector;
