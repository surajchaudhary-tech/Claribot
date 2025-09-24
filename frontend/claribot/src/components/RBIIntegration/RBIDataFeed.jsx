import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink,
  Bell,
  BellOff,
  Calendar,
  Globe,
  Shield,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

const RBIDataFeed = ({ isOpen, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchRBIData();
      // Set up real-time updates every 5 minutes
      const interval = setInterval(fetchRBIData, 300000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const fetchRBIData = async () => {
    setLoading(true);
    try {
      // Simulate API calls to RBI endpoints
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData = {
        interestRates: {
          repoRate: { current: 6.50, previous: 6.25, change: 0.25, trend: 'up' },
          reverseRepoRate: { current: 6.25, previous: 6.00, change: 0.25, trend: 'up' },
          mclr: { current: 8.75, previous: 8.50, change: 0.25, trend: 'up' },
          savingsRate: { current: 3.50, previous: 3.25, change: 0.25, trend: 'up' }
        },
        currencyRates: {
          usd: { rate: 83.12, change: 0.15, trend: 'up' },
          eur: { rate: 90.45, change: -0.23, trend: 'down' },
          gbp: { rate: 105.67, change: 0.08, trend: 'up' },
          jpy: { rate: 0.56, change: -0.01, trend: 'down' }
        },
        policyUpdates: [
          {
            id: 1,
            title: "RBI Monetary Policy Committee Meeting - January 2024",
            date: "2024-01-15",
            type: "monetary_policy",
            impact: "high",
            summary: "Repo rate increased by 25 basis points to 6.50%",
            link: "https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx"
          },
          {
            id: 2,
            title: "Digital Payment Guidelines Updated",
            date: "2024-01-12",
            type: "regulation",
            impact: "medium",
            summary: "New guidelines for digital payment security and fraud prevention",
            link: "https://rbi.org.in/Scripts/NotificationUser.aspx"
          },
          {
            id: 3,
            title: "Banking Sector Risk Assessment",
            date: "2024-01-10",
            type: "risk_assessment",
            impact: "low",
            summary: "Quarterly assessment shows stable banking sector",
            link: "https://rbi.org.in/Scripts/AnnualPublications.aspx"
          }
        ],
        marketIndicators: {
          inflation: { current: 5.8, target: 4.0, trend: 'down' },
          gdpGrowth: { current: 6.2, previous: 5.8, trend: 'up' },
          forexReserves: { current: 642.5, unit: 'billion', trend: 'up' },
          creditGrowth: { current: 15.2, previous: 14.8, trend: 'up' }
        },
        alerts: [
          {
            id: 1,
            type: "rate_change",
            message: "Repo rate increased by 25 basis points",
            severity: "high",
            timestamp: "2024-01-15T10:30:00Z"
          },
          {
            id: 2,
            type: "policy_update",
            message: "New digital payment guidelines published",
            severity: "medium",
            timestamp: "2024-01-12T14:20:00Z"
          }
        ]
      };

      setData(mockData);
      setAlerts(mockData.alerts);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching RBI data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-slate-600" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">RBI Data Feed</h2>
                <p className="text-white text-opacity-90">Real-time financial data and policy updates</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchRBIData}
                disabled={loading}
                className="flex items-center gap-2 bg-white bg-opacity-30 hover:bg-opacity-40 border border-white border-opacity-50 rounded-xl px-4 py-2 transition-all disabled:opacity-50 text-slate-800 font-semibold"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`p-2 rounded-xl transition-all text-white ${
                  notificationsEnabled 
                    ? 'bg-white bg-opacity-20' 
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
                title={notificationsEnabled ? 'Disable Notifications' : 'Enable Notifications'}
              >
                {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all text-white"
              >
                ✕
              </button>
            </div>
          </div>
          {lastUpdated && (
            <div className="mt-2 text-sm text-green-100">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Interest Rates */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-800">Interest Rates</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(data.interestRates).map(([key, rate]) => (
                    <div key={key} className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        {getTrendIcon(rate.trend)}
                      </div>
                      <div className="text-2xl font-bold text-slate-800 mb-1">
                        {rate.current}%
                      </div>
                      <div className={`text-sm ${getTrendColor(rate.trend)}`}>
                        {rate.change > 0 ? '+' : ''}{rate.change}% from {rate.previous}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currency Exchange Rates */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-slate-800">Currency Exchange Rates</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(data.currencyRates).map(([currency, rate]) => (
                    <div key={currency} className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 uppercase">
                          {currency}/INR
                        </span>
                        {getTrendIcon(rate.trend)}
                      </div>
                      <div className="text-2xl font-bold text-slate-800 mb-1">
                        ₹{rate.rate}
                      </div>
                      <div className={`text-sm ${getTrendColor(rate.trend)}`}>
                        {rate.change > 0 ? '+' : ''}{rate.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Indicators */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-slate-800">Market Indicators</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm font-medium text-slate-600 mb-1">Inflation Rate</div>
                    <div className="text-2xl font-bold text-slate-800 mb-1">{data.marketIndicators.inflation.current}%</div>
                    <div className="text-sm text-slate-500">Target: {data.marketIndicators.inflation.target}%</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm font-medium text-slate-600 mb-1">GDP Growth</div>
                    <div className="text-2xl font-bold text-slate-800 mb-1">{data.marketIndicators.gdpGrowth.current}%</div>
                    <div className="text-sm text-slate-500">Previous: {data.marketIndicators.gdpGrowth.previous}%</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm font-medium text-slate-600 mb-1">Forex Reserves</div>
                    <div className="text-2xl font-bold text-slate-800 mb-1">${data.marketIndicators.forexReserves.current}B</div>
                    <div className="text-sm text-slate-500">USD Billion</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm font-medium text-slate-600 mb-1">Credit Growth</div>
                    <div className="text-2xl font-bold text-slate-800 mb-1">{data.marketIndicators.creditGrowth.current}%</div>
                    <div className="text-sm text-slate-500">Previous: {data.marketIndicators.creditGrowth.previous}%</div>
                  </div>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-slate-800">Policy Updates</h3>
                </div>
                <div className="space-y-4">
                  {data.policyUpdates.map((update) => (
                    <div key={update.id} className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-1">{update.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">{update.summary}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {update.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {update.type.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(update.impact)}`}>
                            {update.impact} impact
                          </span>
                          <a
                            href={update.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-slate-100 rounded transition-all"
                          >
                            <ExternalLink className="w-4 h-4 text-slate-500" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              {alerts.length > 0 && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-xl font-bold text-slate-800">Recent Alerts</h3>
                  </div>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="bg-white rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <AlertCircle className={`w-5 h-5 ${
                              alert.severity === 'high' ? 'text-red-500' : 
                              alert.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                            }`} />
                            <span className="font-medium text-slate-800">{alert.message}</span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RBIDataFeed;
