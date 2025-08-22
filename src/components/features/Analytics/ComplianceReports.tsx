import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Plus,
  Filter,
  Download,
  Eye,
  Calendar,
  User,
  TrendingUp,
  BarChart3,
  AlertCircle,
  Award
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';
import { mockComplianceService, ComplianceReport, ComplianceMetrics } from '@services/mock/mockComplianceService';

export const ComplianceReports: React.FC = () => {
  const [reports, setReports] = useState<ComplianceReport[]>([]);
  const [metrics, setMetrics] = useState<ComplianceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    priority: 'all'
  });

  useEffect(() => {
    loadComplianceData();
  }, [filters]);

  const loadComplianceData = async () => {
    setLoading(true);
    try {
      const [reportsData, metricsData] = await Promise.all([
        mockComplianceService.getComplianceReports(filters),
        mockComplianceService.getComplianceMetrics()
      ]);
      setReports(reportsData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Failed to load compliance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-emerald-100 text-emerald-700`;
      case 'in_progress':
        return `${baseClasses} bg-blue-100 text-blue-700`;
      case 'scheduled':
        return `${baseClasses} bg-slate-100 text-slate-700`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (priority) {
      case 'critical':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'high':
        return `${baseClasses} bg-orange-100 text-orange-700`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'low':
        return `${baseClasses} bg-blue-100 text-blue-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (type) {
      case 'audit':
        return `${baseClasses} bg-purple-100 text-purple-700`;
      case 'regulatory':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'internal':
        return `${baseClasses} bg-blue-100 text-blue-700`;
      case 'vendor':
        return `${baseClasses} bg-green-100 text-green-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-slate-200 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Compliance Reports</h1>
          <p className="text-slate-600">Monitor compliance status and manage audit reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6" hover>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {formatPercent(metrics.overallScore)}
                  </h3>
                  <p className="text-sm text-slate-600">Overall Score</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6" hover>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {metrics.completedReports}
                  </h3>
                  <p className="text-sm text-slate-600">Completed Reports</p>
                  <p className="text-xs text-slate-500">
                    {metrics.totalReports} total
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6" hover>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  metrics.criticalFindings > 0 
                    ? 'bg-gradient-to-br from-red-500 to-red-600'
                    : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                }`}>
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {metrics.criticalFindings}
                  </h3>
                  <p className="text-sm text-slate-600">Critical Findings</p>
                  <p className="text-xs text-slate-500">
                    {metrics.resolvedFindings} resolved
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6" hover>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {metrics.averageResolutionTime.toFixed(1)}
                  </h3>
                  <p className="text-sm text-slate-600">Avg Resolution (days)</p>
                  <p className="text-xs text-slate-500">
                    {metrics.overdueReports} overdue
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex space-x-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="audit">Audit</option>
            <option value="regulatory">Regulatory</option>
            <option value="internal">Internal</option>
            <option value="vendor">Vendor</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">Compliance Reports</h2>
          
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6" hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{report.title}</h3>
                      <span className={getTypeBadge(report.type)}>
                        {report.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{report.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{report.assignedTo}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Due: {formatDate(report.dueDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={getStatusBadge(report.status)}>
                      {report.status.replace('_', ' ')}
                    </span>
                    <span className={getPriorityBadge(report.priority)}>
                      {report.priority}
                    </span>
                  </div>
                </div>

                {report.status === 'completed' && (
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-slate-900">{formatPercent(report.overallScore)}</div>
                        <div className="text-xs text-slate-500">Score</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-slate-900">{report.contractsAudited}</div>
                        <div className="text-xs text-slate-500">Contracts</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-slate-900">
                          {report.issuesFound}
                        </div>
                        <div className="text-xs text-slate-500">Issues</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 mt-4">
                  <Button variant="secondary" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Compliance Trends */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">Compliance Trends</h2>
          
          {metrics && (
            <>
              {/* Monthly Trends */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-semibold text-slate-900">Monthly Performance</h3>
                  <TrendingUp className="w-5 h-5 text-slate-500" />
                </div>
                <div className="space-y-4">
                  {metrics.monthlyTrends.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{month.month}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-900">
                          {formatPercent(month.score)}
                        </span>
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                            style={{ width: `${month.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Category Performance */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-semibold text-slate-900">Category Performance</h3>
                  <BarChart3 className="w-5 h-5 text-slate-500" />
                </div>
                <div className="space-y-4">
                  {metrics.complianceByCategory.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{category.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-slate-900">
                            {formatPercent(category.score)}
                          </span>
                          <div className={`flex items-center text-xs ${
                            category.trend === 'improving' ? 'text-emerald-600' :
                            category.trend === 'declining' ? 'text-red-600' :
                            'text-slate-500'
                          }`}>
                            {category.trend === 'improving' ? '↑' :
                             category.trend === 'declining' ? '↓' : '→'}
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            category.score >= 95 ? 'bg-emerald-500' :
                            category.score >= 85 ? 'bg-blue-500' :
                            category.score >= 75 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${category.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Risk Distribution */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-semibold text-slate-900">Risk Distribution</h3>
                  <AlertCircle className="w-5 h-5 text-slate-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{metrics.riskDistribution.critical}</div>
                    <div className="text-xs text-slate-500">Critical</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{metrics.riskDistribution.high}</div>
                    <div className="text-xs text-slate-500">High</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{metrics.riskDistribution.medium}</div>
                    <div className="text-xs text-slate-500">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{metrics.riskDistribution.low}</div>
                    <div className="text-xs text-slate-500">Low</div>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};