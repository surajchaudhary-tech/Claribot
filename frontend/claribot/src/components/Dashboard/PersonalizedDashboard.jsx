import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Download, 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Target,
  BookOpen,
  Award,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

const PersonalizedDashboard = ({ isOpen, onClose, user }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    // Simulate fetching user dashboard data
    const fetchDashboardData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDashboardData({
        documentAnalysis: {
          totalDocuments: 12,
          thisMonth: 4,
          complianceRate: 87,
          recentAnalyses: [
            { id: 1, name: 'Bank Statement Q3.pdf', date: '2024-01-15', status: 'compliant', score: 92 },
            { id: 2, name: 'Loan Application.pdf', date: '2024-01-12', status: 'review', score: 78 },
            { id: 3, name: 'Income Certificate.pdf', date: '2024-01-10', status: 'compliant', score: 95 },
            { id: 4, name: 'KYC Documents.pdf', date: '2024-01-08', status: 'compliant', score: 88 }
          ]
        },
        chatbotInteractions: {
          totalSessions: 45,
          thisMonth: 12,
          averageRating: 4.6,
          recentChats: [
            { id: 1, topic: 'Loan Interest Rates', date: '2024-01-15', duration: '5m 32s', rating: 5 },
            { id: 2, topic: 'RBI Guidelines', date: '2024-01-14', duration: '3m 15s', rating: 4 },
            { id: 3, topic: 'Document Upload', date: '2024-01-13', duration: '7m 45s', rating: 5 },
            { id: 4, topic: 'Fraud Prevention', date: '2024-01-12', duration: '4m 20s', rating: 4 }
          ]
        },
        financialLiteracy: {
          currentLevel: 'Intermediate',
          progress: 68,
          completedModules: 8,
          totalModules: 12,
          achievements: [
            { name: 'Document Master', icon: '📄', earned: '2024-01-10' },
            { name: 'Compliance Expert', icon: '🛡️', earned: '2024-01-08' },
            { name: 'Chat Champion', icon: '💬', earned: '2024-01-05' }
          ],
          nextMilestone: 'Advanced Financial Analysis'
        },
        analytics: {
          monthlyTrend: [
            { month: 'Oct', documents: 3, chats: 8, score: 85 },
            { month: 'Nov', documents: 5, chats: 12, score: 88 },
            { month: 'Dec', documents: 4, chats: 10, score: 90 },
            { month: 'Jan', documents: 4, chats: 12, score: 87 }
          ],
          topTopics: [
            { topic: 'Loan Applications', count: 15, percentage: 35 },
            { topic: 'RBI Compliance', count: 12, percentage: 28 },
            { topic: 'Document Analysis', count: 10, percentage: 23 },
            { topic: 'Fraud Prevention', count: 6, percentage: 14 }
          ]
        }
      });
      setLoading(false);
    };

    if (isOpen) {
      fetchDashboardData();
    }
  }, [isOpen]);

  const generateReport = () => {
    // Simulate report generation
    const reportData = {
      user: user?.name || 'User',
      generatedAt: new Date().toISOString(),
      period: selectedPeriod,
      data: dashboardData
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claribot-dashboard-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Personal Dashboard</h2>
                <p className="text-white text-opacity-90">Track your financial journey with Claribot</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white bg-opacity-30 border border-white border-opacity-50 rounded-xl px-4 py-2 text-slate-800 font-semibold"
              >
                <option value="7d" className="text-slate-800">Last 7 days</option>
                <option value="30d" className="text-slate-800">Last 30 days</option>
                <option value="90d" className="text-slate-800">Last 90 days</option>
                <option value="1y" className="text-slate-800">Last year</option>
              </select>
              <button
                onClick={generateReport}
                className="flex items-center gap-2 bg-white bg-opacity-30 hover:bg-opacity-40 border border-white border-opacity-50 rounded-xl px-4 py-2 transition-all text-slate-800 font-semibold"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Document Analysis Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-slate-800">Document Analysis</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{dashboardData.documentAnalysis.totalDocuments}</div>
                      <div className="text-sm text-slate-600">Total Documents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{dashboardData.documentAnalysis.thisMonth}</div>
                      <div className="text-sm text-slate-600">This Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{dashboardData.documentAnalysis.complianceRate}%</div>
                      <div className="text-sm text-slate-600">Compliance Rate</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-700">Recent Analyses</h4>
                    {dashboardData.documentAnalysis.recentAnalyses.map((analysis) => (
                      <div key={analysis.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="font-medium text-slate-800">{analysis.name}</div>
                            <div className="text-sm text-slate-500">{analysis.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.status === 'compliant' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {analysis.status}
                          </span>
                          <span className="text-sm font-semibold text-slate-600">{analysis.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chatbot Interactions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-slate-800">Chatbot Interactions</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{dashboardData.chatbotInteractions.totalSessions}</div>
                      <div className="text-sm text-slate-600">Total Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{dashboardData.chatbotInteractions.thisMonth}</div>
                      <div className="text-sm text-slate-600">This Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">{dashboardData.chatbotInteractions.averageRating}</div>
                      <div className="text-sm text-slate-600">Avg Rating</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-700">Recent Chats</h4>
                    {dashboardData.chatbotInteractions.recentChats.map((chat) => (
                      <div key={chat.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="font-medium text-slate-800">{chat.topic}</div>
                            <div className="text-sm text-slate-500">{chat.date} • {chat.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < chat.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Literacy & Analytics */}
              <div className="space-y-6">
                {/* Financial Literacy Progress */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-slate-800">Financial Literacy</h3>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{dashboardData.financialLiteracy.currentLevel}</div>
                    <div className="text-sm text-slate-600">Current Level</div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>Progress</span>
                      <span>{dashboardData.financialLiteracy.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${dashboardData.financialLiteracy.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-slate-600 mb-4">
                    {dashboardData.financialLiteracy.completedModules} of {dashboardData.financialLiteracy.totalModules} modules completed
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-700 text-sm">Recent Achievements</h4>
                    {dashboardData.financialLiteracy.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                        <span className="text-lg">{achievement.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 text-sm">{achievement.name}</div>
                          <div className="text-xs text-slate-500">{achievement.earned}</div>
                        </div>
                        <Award className="w-4 h-4 text-yellow-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analytics Overview */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-6 h-6 text-slate-600" />
                    <h3 className="text-xl font-bold text-slate-800">Analytics</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm mb-2">Top Topics</h4>
                      {dashboardData.analytics.topTopics.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">{topic.topic}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${topic.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-500 w-8">{topic.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;
