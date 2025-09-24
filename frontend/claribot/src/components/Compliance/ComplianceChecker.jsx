import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, FileText, Scale, Eye, TrendingUp } from 'lucide-react';

const ComplianceChecker = ({ analysisData, onComplianceResults, selectedLanguage = 'english' }) => {
  const [complianceResults, setComplianceResults] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  // Multilingual content
  const getLocalizedContent = (language) => {
    const content = {
      english: {
        title: "Compliance & Risk Assessment",
        subtitle: "RBI regulation compliance and fraud detection",
        overallStatus: "Overall Compliance Status",
        rbiCompliance: "RBI Regulation Compliance",
        fraudRisk: "Fraud Risk Assessment",
        recommendations: "Recommendations",
        analyzing: "Analyzing compliance...",
        compliant: "Document meets RBI compliance requirements",
        nonCompliant: "Document requires review for compliance issues",
        highRisk: "High fraud risk detected - Enhanced monitoring recommended",
        lowRisk: "Low fraud risk - Standard procedures apply",
        regulations: {
          "KYC Requirements": {
            title: "KYC Requirements",
            description: "Know Your Customer compliance",
            checks: ["Customer identification", "Address verification", "Document authenticity"]
          },
          "Anti-Money Laundering": {
            title: "Anti-Money Laundering",
            description: "AML compliance checks", 
            checks: ["Suspicious transaction monitoring", "Customer due diligence", "Record keeping"]
          },
          "Credit Assessment": {
            title: "Credit Assessment",
            description: "RBI credit guidelines",
            checks: ["Income verification", "Debt-to-income ratio", "Credit history assessment"]
          },
          "Data Protection": {
            title: "Data Protection",
            description: "Data privacy compliance",
            checks: ["Personal data protection", "Consent management", "Data retention"]
          }
        }
      },
      hindi: {
        title: "अनुपालन और जोखिम मूल्यांकन",
        subtitle: "आरबीआई विनियम अनुपालन और धोखाधड़ी का पता लगाना",
        overallStatus: "समग्र अनुपालन स्थिति",
        rbiCompliance: "आरबीआई विनियम अनुपालन",
        fraudRisk: "धोखाधड़ी जोखिम मूल्यांकन",
        recommendations: "सिफारिशें",
        analyzing: "अनुपालन का विश्लेषण कर रहे हैं...",
        compliant: "दस्तावेज़ आरबीआई अनुपालन आवश्यकताओं को पूरा करता है",
        nonCompliant: "दस्तावेज़ को अनुपालन मुद्दों की समीक्षा की आवश्यकता है",
        highRisk: "उच्च धोखाधड़ी जोखिम का पता चला - बढ़ी हुई निगरानी की सिफारिश",
        lowRisk: "कम धोखाधड़ी जोखिम - मानक प्रक्रियाएं लागू",
        regulations: {
          "KYC Requirements": {
            title: "KYC आवश्यकताएं",
            description: "ग्राहक की पहचान अनुपालन",
            checks: ["ग्राहक पहचान", "पता सत्यापन", "दस्तावेज़ प्रामाणिकता"]
          },
          "Anti-Money Laundering": {
            title: "मनी लॉन्ड्रिंग रोधी",
            description: "AML अनुपालन जांच",
            checks: ["संदिग्ध लेनदेन निगरानी", "ग्राहक उचित परिश्रम", "रिकॉर्ड रखरखाव"]
          },
          "Credit Assessment": {
            title: "क्रेडिट मूल्यांकन",
            description: "आरबीआई क्रेडिट दिशानिर्देश",
            checks: ["आय सत्यापन", "ऋण-से-आय अनुपात", "क्रेडिट इतिहास मूल्यांकन"]
          },
          "Data Protection": {
            title: "डेटा सुरक्षा",
            description: "डेटा गोपनीयता अनुपालन",
            checks: ["व्यक्तिगत डेटा सुरक्षा", "सहमति प्रबंधन", "डेटा प्रतिधारण"]
          }
        }
      },
      tamil: {
        title: "இணங்குதல் மற்றும் ஆபத்து மதிப்பீடு",
        subtitle: "RBI ஒழுங்குமுறை இணங்குதல் மற்றும் மோசடி கண்டறிதல்",
        overallStatus: "மொத்த இணங்குதல் நிலை",
        rbiCompliance: "RBI ஒழுங்குமுறை இணங்குதல்",
        fraudRisk: "மோசடி ஆபத்து மதிப்பீடு",
        recommendations: "பரிந்துரைகள்",
        analyzing: "இணங்குதலை பகுப்பாய்வு செய்கிறது...",
        compliant: "ஆவணம் RBI இணங்குதல் தேவைகளை பூர்த்தி செய்கிறது",
        nonCompliant: "ஆவணத்திற்கு இணங்குதல் பிரச்சினைகளுக்கான மறுஆய்வு தேவை",
        highRisk: "உயர் மோசடி ஆபத்து கண்டறியப்பட்டது - மேம்படுத்தப்பட்ட கண்காணிப்பு பரிந்துரைக்கப்படுகிறது",
        lowRisk: "குறைந்த மோசடி ஆபத்து - நிலையான நடைமுறைகள் பொருந்தும்",
        regulations: {
          "KYC Requirements": {
            title: "KYC தேவைகள்",
            description: "வாடிக்கையாளர் அடையாளம் இணங்குதல்",
            checks: ["வாடிக்கையாளர் அடையாளம்", "முகவரி சரிபார்ப்பு", "ஆவண நம்பகத்தன்மை"]
          },
          "Anti-Money Laundering": {
            title: "பணம் கழுவுதல் எதிர்ப்பு",
            description: "AML இணங்குதல் சரிபார்ப்புகள்",
            checks: ["சந்தேகத்திற்குரிய பரிவர்த்தனை கண்காணிப்பு", "வாடிக்கையாளர் கடமை", "பதிவு வைத்திருத்தல்"]
          },
          "Credit Assessment": {
            title: "கடன் மதிப்பீடு",
            description: "RBI கடன் வழிகாட்டிகள்",
            checks: ["வருமான சரிபார்ப்பு", "கடன்-க்கு-வருமான விகிதம்", "கடன் வரலாறு மதிப்பீடு"]
          },
          "Data Protection": {
            title: "தரவு பாதுகாப்பு",
            description: "தரவு தனியுரிமை இணங்குதல்",
            checks: ["தனிப்பட்ட தரவு பாதுகாப்பு", "ஒப்புதல் மேலாண்மை", "தரவு வைத்திருத்தல்"]
          }
        }
      }
    };
    
    return content[language] || content.english;
  };

  const localizedContent = getLocalizedContent(selectedLanguage);

  const rbiRegulations = {
    "KYC Requirements": {
      description: localizedContent.regulations["KYC Requirements"].description,
      checks: localizedContent.regulations["KYC Requirements"].checks,
      weight: 0.3
    },
    "Anti-Money Laundering": {
      description: localizedContent.regulations["Anti-Money Laundering"].description,
      checks: localizedContent.regulations["Anti-Money Laundering"].checks,
      weight: 0.4
    },
    "Credit Assessment": {
      description: localizedContent.regulations["Credit Assessment"].description,
      checks: localizedContent.regulations["Credit Assessment"].checks,
      weight: 0.2
    },
    "Data Protection": {
      description: localizedContent.regulations["Data Protection"].description,
      checks: localizedContent.regulations["Data Protection"].checks,
      weight: 0.1
    }
  };

  const fraudIndicators = {
    english: [
      "Unusual transaction patterns",
      "Rapid account opening",
      "Inconsistent documentation", 
      "High-risk geographical locations",
      "Politically exposed persons",
      "Shell company structures"
    ],
    hindi: [
      "असामान्य लेनदेन पैटर्न",
      "तेज़ी से खाता खोलना",
      "असंगत दस्तावेज़ीकरण",
      "उच्च जोखिम भौगोलिक स्थान",
      "राजनीतिक रूप से उजागर व्यक्ति",
      "शेल कंपनी संरचनाएं"
    ],
    tamil: [
      "அசாதாரண பரிவர்த்தனை முறைகள்",
      "விரைவான கணக்கு திறத்தல்",
      "முரண்பாடான ஆவணமாக்கல்",
      "உயர் ஆபத்து புவியியல் இடங்கள்",
      "அரசியல் ரீதியாக வெளிப்படுத்தப்பட்ட நபர்கள்",
      "ஷெல் நிறுவன கட்டமைப்புகள்"
    ]
  };

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
      const regulationTitle = localizedContent.regulations[regulation]?.title || regulation;
      results.regulations[regulation] = {
        compliant: isCompliant,
        score: isCompliant ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 40) + 40,
        issues: isCompliant ? [] : [`${regulationTitle} requirements not fully met`],
        recommendations: isCompliant ? [] : [`Review ${regulationTitle.toLowerCase()} documentation`]
      };
    });

    // Generate localized recommendations
    const recommendations = {
      english: {
        reviewDoc: "Review document authenticity",
        verifyIdentity: "Verify customer identity documents", 
        enhancedDD: "Enhanced due diligence required",
        monitorSuspicious: "Monitor for suspicious activities"
      },
      hindi: {
        reviewDoc: "दस्तावेज़ प्रामाणिकता की समीक्षा करें",
        verifyIdentity: "ग्राहक पहचान दस्तावेज़ सत्यापित करें",
        enhancedDD: "बढ़ी हुई उचित परिश्रम आवश्यक",
        monitorSuspicious: "संदिग्ध गतिविधियों की निगरानी करें"
      },
      tamil: {
        reviewDoc: "ஆவண நம்பகத்தன்மையை மறுஆய்வு செய்யுங்கள்",
        verifyIdentity: "வாடிக்கையாளர் அடையாள ஆவணங்களை சரிபாருங்கள்",
        enhancedDD: "மேம்படுத்தப்பட்ட கடமை தேவை",
        monitorSuspicious: "சந்தேகத்திற்குரிய செயல்பாடுகளை கண்காணிக்கவும்"
      }
    };

    const recContent = recommendations[selectedLanguage] || recommendations.english;

    if (results.overallScore < 80) {
      results.recommendations.push(recContent.reviewDoc);
      results.recommendations.push(recContent.verifyIdentity);
    }
    if (results.fraudRisk > 20) {
      results.recommendations.push(recContent.enhancedDD);
      results.recommendations.push(recContent.monitorSuspicious);
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
          <h3 className="text-2xl font-bold text-slate-800">{localizedContent.title}</h3>
          <p className="text-slate-600">{localizedContent.subtitle}</p>
        </div>
      </div>

      {isChecking ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-slate-600">{localizedContent.analyzing}</span>
          </div>
        </div>
      ) : complianceResults && (
        <div className="space-y-6">
          {/* Overall Status */}
          <div className={`p-4 rounded-2xl border-2 ${getStatusColor(complianceResults.complianceStatus)}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">{localizedContent.overallStatus}</h4>
              <span className="text-2xl font-bold">{complianceResults.overallScore}%</span>
            </div>
            <p className="text-sm opacity-80">
              {complianceResults.complianceStatus === "COMPLIANT" 
                ? localizedContent.compliant
                : localizedContent.nonCompliant}
            </p>
          </div>

          {/* Regulation Checks */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              {localizedContent.rbiCompliance}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(complianceResults.regulations).map(([regulation, data]) => (
                <div key={regulation} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-slate-800">{localizedContent.regulations[regulation]?.title || regulation}</h5>
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
              {localizedContent.fraudRisk}
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
                  ? localizedContent.highRisk
                  : localizedContent.lowRisk
                }
              </p>
            </div>
          </div>

          {/* Recommendations */}
          {complianceResults.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                {localizedContent.recommendations}
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
