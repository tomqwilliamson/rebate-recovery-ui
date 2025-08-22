import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@components/common/UI';
import TrendChart from '@components/common/Charts/TrendChart';
import { 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart
} from 'lucide-react';
import { mockAnalyticsService, AnalyticsMetrics } from '@services/mock/mockAnalyticsService';

const AnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('ytd');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await mockAnalyticsService.getAnalyticsMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number, decimals = 1) => {
    return `${value.toFixed(decimals)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-emerald-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 
      ? <ArrowUpRight className="w-4 h-4" />
      : <ArrowDownRight className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-slate-200 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Analytics Overview</h1>
          <p className="text-slate-600">Comprehensive insights into rebate performance and compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="mtd">Month to Date</option>
            <option value="qtd">Quarter to Date</option>
            <option value="ytd">Year to Date</option>
            <option value="trailing">Trailing 12 Months</option>
          </select>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Rebates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${getChangeColor(metrics.totalRebates.change)}`}>
                {getChangeIcon(metrics.totalRebates.change)}
                <span>{formatPercent(Math.abs(metrics.totalRebates.change))}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {formatCurrency(metrics.totalRebates.value)}
              </h3>
              <p className="text-sm text-slate-600">Total Rebates ({metrics.totalRebates.period})</p>
            </div>
          </Card>
        </motion.div>

        {/* Active Contracts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs text-slate-500">
                {metrics.totalContracts.pending} pending
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {metrics.totalContracts.active}
              </h3>
              <p className="text-sm text-slate-600">Active Contracts</p>
              <p className="text-xs text-slate-500 mt-1">
                {metrics.totalContracts.total} total • {metrics.totalContracts.expired} expired
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Compliance Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  metrics.complianceMetrics.riskLevel === 'low' ? 'bg-emerald-500' :
                  metrics.complianceMetrics.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                }`}></div>
                <span className="text-xs text-slate-500 capitalize">
                  {metrics.complianceMetrics.riskLevel} Risk
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {formatPercent(metrics.complianceMetrics.overallRate)}
              </h3>
              <p className="text-sm text-slate-600">Compliance Rate</p>
              <p className="text-xs text-slate-500 mt-1">
                Audit Score: {formatPercent(metrics.complianceMetrics.auditScore)}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Processing Efficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs text-slate-500">
                {formatPercent(metrics.performanceMetrics.automationRate)} automated
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {metrics.performanceMetrics.processingTime.toFixed(1)}h
              </h3>
              <p className="text-sm text-slate-600">Avg Processing Time</p>
              <p className="text-xs text-slate-500 mt-1">
                {formatPercent(metrics.performanceMetrics.accuracy)} accuracy
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Revenue Variance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                metrics.financialMetrics.variance >= 0 
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                  : 'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                getChangeColor(metrics.financialMetrics.variance)
              }`}>
                {getChangeIcon(metrics.financialMetrics.variance)}
                <span>{formatPercent(
                  (Math.abs(metrics.financialMetrics.variance) / metrics.financialMetrics.expectedRevenue) * 100
                )}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {formatCurrency(Math.abs(metrics.financialMetrics.variance))}
              </h3>
              <p className="text-sm text-slate-600">Revenue Variance</p>
              <p className="text-xs text-slate-500 mt-1">
                vs. Expected: {formatCurrency(metrics.financialMetrics.expectedRevenue)}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Projected Annual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs text-slate-500">
                Annual projection
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {formatCurrency(metrics.financialMetrics.projectedAnnual)}
              </h3>
              <p className="text-sm text-slate-600">Projected Annual</p>
              <p className="text-xs text-slate-500 mt-1">
                Based on current trends
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Error Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                metrics.performanceMetrics.errorRate < 2 
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                  : metrics.performanceMetrics.errorRate < 5
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600'
                  : 'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-slate-500">Low</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {formatPercent(metrics.performanceMetrics.errorRate)}
              </h3>
              <p className="text-sm text-slate-600">Error Rate</p>
              <p className="text-xs text-slate-500 mt-1">
                Within acceptable range
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {metrics.alerts.critical + metrics.alerts.warnings}
              </h3>
              <p className="text-sm text-slate-600">Active Alerts</p>
              <p className="text-xs text-slate-500 mt-1">
                {metrics.alerts.critical} critical • {metrics.alerts.warnings} warnings
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rebate Trends Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Rebate Trends</h3>
            <BarChart3 className="w-5 h-5 text-slate-500" />
          </div>
          <TrendChart 
            data={metrics.trendData.rebatesByMonth.map(item => ({
              date: item.month,
              value: item.amount
            }))}
          />
        </Card>

        {/* Top Performing Contracts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Top Performing Contracts</h3>
            <Award className="w-5 h-5 text-slate-500" />
          </div>
          <div className="space-y-4">
            {metrics.topContracts.slice(0, 5).map((contract, index) => (
              <div key={contract.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                    index === 0 ? 'bg-gold-100 text-gold-700' :
                    index === 1 ? 'bg-slate-200 text-slate-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 truncate max-w-48">
                      {contract.vendor}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatPercent(contract.compliance)} compliance
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">
                    {formatCurrency(contract.totalRebates)}
                  </p>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    contract.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    contract.status === 'expiring' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {contract.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Compliance Trends */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Compliance Trends</h3>
          <PieChart className="w-5 h-5 text-slate-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {metrics.trendData.complianceByQuarter.map((quarter, index) => (
            <div key={quarter.quarter} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(quarter.rate / 100) * 175.9} 175.9`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-900">
                    {formatPercent(quarter.rate, 0)}
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-medium text-slate-900">{quarter.quarter}</h4>
              <p className="text-xs text-slate-500">{quarter.audits} audits</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;