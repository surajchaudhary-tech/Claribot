import React, { useState } from 'react';
import { X, ExternalLink, Shield, CreditCard, FileText, AlertTriangle, Building2, Users, TrendingUp, Globe } from 'lucide-react';

const RBIActionPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const rbiActions = [
    {
      title: "File Banking Complaint",
      description: "Lodge complaints against banks and NBFCs",
      icon: AlertTriangle,
      link: "https://cms.rbi.org.in/cms/",
      category: "Complaints",
      color: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
    },
    {
      title: "Apply for Mudra Loan",
      description: "Micro Units Development & Refinance Agency",
      icon: CreditCard,
      link: "https://www.mudra.org.in/",
      category: "Loans",
      color: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
    },
    {
      title: "Kisan Credit Card",
      description: "Agricultural credit facility for farmers",
      icon: Building2,
      link: "https://www.rbi.org.in/scripts/BS_ViewMasCirculardetails.aspx?id=12089",
      category: "Loans",
      color: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
    },
    {
      title: "PM SVANidhi Scheme",
      description: "Micro credit for street vendors",
      icon: Users,
      link: "https://pmsvanidhi.mohua.gov.in/",
      category: "Government Schemes",
      color: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
    },
    {
      title: "Credit Guarantee Fund",
      description: "CGTMSE for MSME loans",
      icon: Shield,
      link: "https://www.cgtmse.in/",
      category: "Government Schemes",
      color: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
    },
    {
      title: "RBI Monetary Policy",
      description: "Latest policy rates and announcements",
      icon: TrendingUp,
      link: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx",
      category: "Information",
      color: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
    }
  ];

  const governmentPortals = [
    {
      title: "Digital India Portal",
      description: "Government services and schemes",
      icon: Globe,
      link: "https://www.digitalindia.gov.in/",
      color: "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
    },
    {
      title: "MyGov India",
      description: "Citizen engagement platform",
      icon: Users,
      link: "https://www.mygov.in/",
      color: "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
    },
    {
      title: "PM Kisan Portal",
      description: "Direct benefit transfer for farmers",
      icon: Building2,
      link: "https://pmkisan.gov.in/",
      color: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
    }
  ];

  const categories = [...new Set(rbiActions.map(action => action.category))];

  return (
    <div className="fixed left-6 top-58 z-50">
      {/* Action Panel */}
      {isOpen && (
        <div className="mb-4 w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-blue-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">RBI Action Center</h3>
                <p className="text-orange-100 text-xs">Government Portal Access</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[60vh] p-4 space-y-4">
            {/* RBI Actions */}
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                RBI Direct Actions
              </h4>
              <div className="space-y-3">
                {rbiActions.map((action, idx) => (
                  <a
                    key={idx}
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-3 rounded-xl border-2 transition-all duration-200 ${action.color} hover:shadow-md`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white/50 rounded-lg">
                        <action.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm mb-1">{action.title}</h5>
                        <p className="text-xs opacity-80 mb-2">{action.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-2 py-1 bg-white/50 rounded-full">
                            {action.category}
                          </span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Government Portals */}
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                Government Portals
              </h4>
              <div className="space-y-3">
                {governmentPortals.map((portal, idx) => (
                  <a
                    key={idx}
                    href={portal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-3 rounded-xl border-2 transition-all duration-200 ${portal.color} hover:shadow-md`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white/50 rounded-lg">
                        <portal.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm mb-1">{portal.title}</h5>
                        <p className="text-xs opacity-80 mb-2">{portal.description}</p>
                        <div className="flex items-center justify-end">
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <h5 className="font-semibold text-slate-800 mb-2">Quick Access</h5>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center">
                  <div className="font-bold text-blue-600">6</div>
                  <div className="text-slate-600">RBI Actions</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">3</div>
                  <div className="text-slate-600">Gov Portals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 px-4 py-3 group"
        title="RBI Actions & Government Links"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm">RBI Actions</div>
              <div className="text-xs opacity-80">Government Links</div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default RBIActionPanel;
