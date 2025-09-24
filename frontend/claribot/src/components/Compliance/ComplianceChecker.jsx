import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, FileText, Scale, Eye, TrendingUp } from 'lucide-react';

const ComplianceChecker = ({ analysisData, onComplianceResults }) => {
  const [complianceResults, setComplianceResults] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const rbiRegulations = {
    "KYC Requirements": {
      description: "Know Your Customer compliance",
      checks: ["Customer identification", "Address verification", "Document authenticity"],
      weight: 0.3
    },
    "Anti-Money Laundering": {
      description: "AML compliance checks",
      checks: ["Suspicious transaction monitoring", "Customer due diligence", "Record keeping"],
      weight: 0.4
    },
    "Credit Assessment": {
      description: "RBI credit guidelines",
      checks: ["Income verification", "Debt-to-income ratio", "Credit history assessment"],
      weight: 0.2
    },
    "Data Protection": {
      description: "Data privacy compliance",
      checks: ["Personal data protection", "Consent management", "Data retention"],
      weight: 0.1
    }
  };

  const fraudIndicators = [
    "Unusual transaction patterns",
    "Rapid account opening",
    "Inconsistent documentation",
    "High-risk geographical locations",
    "Politically exposed persons",
    "Shell company structures"
  ];

  const performComplianceCheck = async () => {
    setIsChecking(true);
    
    // Simulate AI compliance checking
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results = {
      overallScore: Math.floor(Math.random() * 40) + 60, // 60-100
      complianceStatus: "COMPLIANT", // COMPLIANT, NON_COMPLIANT, REQUIRES_REVIEW
      regulations: {},
      fraudRisk: Math.floor(Math.random() * 30) + 5, // 5-35%
      recommendations: []
    };

    // Check each regulation
    Object.keys(rbiRegulations).forEach(regulation => {
      const isCompliant = Math.random() > 0.2; // 80% compliance rate
      results.regulations[regulation] = {
        compliant: isCompliant,
        score: isCompliant ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 40) + 40,
        issues: isCompliant ? [] : [`${regulation} requirements not fully met`],
        recommendations: isCompliant ? [] : [`Review ${regulation.toLowerCase()} documentation`]
      };
    });

    // Generate recommendations
    if (results.overallScore < 80) {
      results.recommendations.push("Review document authenticity");
      results.recommendations.push("Verify customer identity documents");
    }
    if (results.fraudRisk > 20) {
      results.recommendations.push("Enhanced due diligence required");
      results.recommendations.push("Monitor for suspicious activities");
    }

    setComplianceResults(results);
    onComplianceResults?.(results);
    setIsChecking(false);
  };

  useEffect(() => {
    if (analysisData) {
      performComplianceCheck();
    }
  }, [analysisData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLIANT": return "text-green-600 bg-green-50 border-green-200";
      case "NON_COMPLIANT": return "text-red-600 bg-red-50 border-red-200";
      case "REQUIRES_REVIEW": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  if (!complianceResults && !isChecking) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-2xl">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Compliance & Risk Assessment</h3>
          <p className="text-slate-600">RBI regulation compliance and fraud detection</p>
        </div>
      </div>

      {isChecking ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-slate-600">Analyzing compliance...</span>
          </div>
        </div>
      ) : complianceResults && (
        <div className="space-y-6">
          {/* Overall Status */}
          <div className={`p-4 rounded-2xl border-2 ${getStatusColor(complianceResults.complianceStatus)}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">Overall Compliance Status</h4>
              <span className="text-2xl font-bold">{complianceResults.overallScore}%</span>
            </div>
            <p className="text-sm opacity-80">
              {complianceResults.complianceStatus === "COMPLIANT" 
                ? "Document meets RBI compliance requirements" 
                : "Document requires review for compliance issues"}
            </p>
          </div>

          {/* Regulation Checks */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              RBI Regulation Compliance
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(complianceResults.regulations).map(([regulation, data]) => (
                <div key={regulation} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-slate-800">{regulation}</h5>
                    <div className="flex items-center gap-2">
                      {data.compliant ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className={`font-bold ${getScoreColor(data.score)}`}>
                        {data.score}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    {rbiRegulations[regulation].description}
                  </p>
                  {data.issues.length > 0 && (
                    <div className="text-xs text-red-600">
                      <strong>Issues:</strong> {data.issues.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Fraud Risk Assessment */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Fraud Risk Assessment
            </h4>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Risk Level</span>
                <span className={`text-2xl font-bold ${getScoreColor(100 - complianceResults.fraudRisk)}`}>
                  {complianceResults.fraudRisk}%
                </span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    complianceResults.fraudRisk > 20 ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${complianceResults.fraudRisk}%` }}
                ></div>
              </div>
              <p className="text-sm text-orange-700">
                {complianceResults.fraudRisk > 20 
                  ? "High fraud risk detected - Enhanced monitoring recommended"
                  : "Low fraud risk - Standard procedures apply"
                }
              </p>
            </div>
          </div>

          {/* Recommendations */}
          {complianceResults.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Recommendations
              </h4>
              <div className="space-y-2">
                {complianceResults.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-800">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplianceChecker;
