import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Play,
  Settings,
  Clock,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  FileText,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';
import { formatCurrency, formatDate } from '@utils/formatters';
import { RootState } from '@store/store';
import { 
  runValidation, 
  fetchValidationRules, 
  fetchValidationHistory, 
  fetchValidationMetrics,
  fetchRebateCalculations 
} from '@store/slices/rebatesSlice';
import { ValidationReport } from '@services/mock/mockValidationService';

export const RebateValidation: React.FC = () => {
  const dispatch = useDispatch();
  const rebateState = useSelector((state: RootState) => state.rebates);
  
  // DEMO DATA - Light up the validation page!
  const demoCalculations = [
    { id: 'calc-001', contractId: 'contract-med-supplies-2024', period: 'Q3 2024', expectedAmount: 135000 },
    { id: 'calc-002', contractId: 'contract-surgical-equipment', period: 'Q3 2024', expectedAmount: 89000 },
    { id: 'calc-003', contractId: 'contract-pharma-supplies', period: 'Q2 2024', expectedAmount: 156000 },
    { id: 'calc-004', contractId: 'contract-diagnostic-equipment', period: 'Q3 2024', expectedAmount: 78500 }
  ];

  const demoValidationRules = [
    { id: 'gl-001', name: 'General Ledger Balance Check', category: 'general_ledger', description: 'Ensures rebate amounts match general ledger entries', severity: 'error', enabled: true },
    { id: 'gl-002', name: 'Account Code Validation', category: 'general_ledger', description: 'Validates correct account codes are used', severity: 'warning', enabled: true },
    { id: 'ct-001', name: 'Contract Terms Compliance', category: 'contract_terms', description: 'Verifies rebate calculations comply with contract terms', severity: 'error', enabled: true },
    { id: 'ct-002', name: 'Tier Achievement Validation', category: 'contract_terms', description: 'Confirms rebate tiers are correctly achieved', severity: 'error', enabled: true },
    { id: 'im-001', name: 'Product Code Matching', category: 'item_matching', description: 'Validates product codes match between systems', severity: 'error', enabled: true }
  ];

  const demoValidationMetrics = {
    totalValidationsRun: 247,
    successRate: 87.4,
    averageExecutionTime: 2950,
    commonFailures: [
      { rule: 'General Ledger Balance Check', count: 12 },
      { rule: 'Contract Terms Compliance', count: 8 },
      { rule: 'Product Code Matching', count: 5 }
    ],
    trendData: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6-i) * 86400000).toISOString().split('T')[0],
      passed: Math.floor(Math.random() * 20) + 15,
      failed: Math.floor(Math.random() * 5),
      warnings: Math.floor(Math.random() * 8) + 2
    }))
  };

  const demoValidationReports = [
    {
      id: 'report-demo-1',
      rebateCalculationId: 'calc-001',
      totalChecks: 8,
      passedChecks: 6,
      failedChecks: 1,
      warningChecks: 1,
      validations: [],
      overallStatus: 'warning',
      validatedAt: new Date(Date.now() - 86400000).toISOString(),
      validatedBy: 'Demo User',
      executionTime: 3200
    },
    {
      id: 'report-demo-2',
      rebateCalculationId: 'calc-001',
      totalChecks: 8,
      passedChecks: 7,
      failedChecks: 0,
      warningChecks: 1,
      validations: [],
      overallStatus: 'passed',
      validatedAt: new Date(Date.now() - 43200000).toISOString(),
      validatedBy: 'System Validator',
      executionTime: 2800
    }
  ];
  
  // Use demo data if real data is not available
  const { 
    calculations = demoCalculations, 
    currentValidationReport = null, 
    validationReports = demoValidationReports, 
    validationRules = demoValidationRules, 
    validationMetrics = demoValidationMetrics,
    validationLoading = false, 
    loading = false 
  } = rebateState || {};

  const [selectedCalculation, setSelectedCalculation] = useState<string>('');
  const [selectedValidationType, setSelectedValidationType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'rules' | 'history'>('dashboard');

  useEffect(() => {
    console.log('🔄 RebateValidation: Loading initial data...');
    dispatch(fetchValidationRules() as any);
    dispatch(fetchValidationMetrics() as any);
    dispatch(fetchRebateCalculations({}) as any);
  }, [dispatch]);

  useEffect(() => {
    console.log('📊 RebateValidation: Data status check', {
      calculationsCount: calculations?.length || 0,
      validationRulesCount: validationRules?.length || 0,
      validationReportsCount: validationReports?.length || 0,
      hasValidationMetrics: !!validationMetrics
    });
    
    // Load sample validation history when we have calculations
    if (calculations?.length > 0 && validationReports?.length === 0) {
      console.log('📈 Loading validation history for first calculation');
      dispatch(fetchValidationHistory(calculations[0].id) as any);
    }
  }, [calculations, validationRules, validationReports, validationMetrics, dispatch]);

  const handleRunValidation = async () => {
    if (selectedCalculation) {
      console.log('🎯 DEMO: Running spectacular validation show!');
      
      // Create amazing demo validation result
      const demoValidationResult = {
        id: `report-${Date.now()}`,
        rebateCalculationId: selectedCalculation,
        totalChecks: 9,
        passedChecks: 7,
        failedChecks: 1,
        warningChecks: 1,
        validations: [
          {
            id: `v-${Date.now()}-1`,
            rebateCalculationId: selectedCalculation,
            validationType: 'general_ledger',
            status: 'passed',
            details: 'All general ledger entries reconciled successfully. Variance within acceptable range (0.2%)',
            validatedAt: new Date().toISOString()
          },
          {
            id: `v-${Date.now()}-2`,
            rebateCalculationId: selectedCalculation,
            validationType: 'contract_terms',
            status: 'warning',
            details: 'Volume threshold achieved at 97% - close monitoring recommended for next quarter',
            validatedAt: new Date().toISOString()
          },
          {
            id: `v-${Date.now()}-3`,
            rebateCalculationId: selectedCalculation,
            validationType: 'item_matching',
            status: 'failed',
            details: 'Product code mismatch detected in 3 items: PROD-4471, PROD-8832, PROD-9901 - requires manual review',
            validatedAt: new Date().toISOString()
          }
        ],
        overallStatus: 'warning',
        validatedAt: new Date().toISOString(),
        validatedBy: 'Demo User',
        executionTime: 3250 + Math.random() * 1000
      };

      // Simulate the validation process with loading
      setValidationLoading(true);
      
      setTimeout(() => {
        setCurrentValidationReport(demoValidationResult);
        setValidationLoading(false);
        console.log('✅ DEMO: Validation completed with spectacular results!');
      }, 3000);
    }
  };

  // Local state for demo
  const [demoCurrentValidationReport, setCurrentValidationReport] = useState<ValidationReport | null>(null);
  const [demoValidationLoading, setValidationLoading] = useState(false);
  
  // Use demo state if available
  const effectiveCurrentValidationReport = demoCurrentValidationReport || currentValidationReport;
  const effectiveValidationLoading = demoValidationLoading || validationLoading;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'passed':
        return `${baseClasses} bg-emerald-100 text-emerald-700`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'warning':
        return `${baseClasses} bg-amber-100 text-amber-700`;
      default:
        return `${baseClasses} bg-blue-100 text-blue-700`;
    }
  };

  const validationTypeOptions = [
    { value: 'all', label: 'All Validations' },
    { value: 'general_ledger', label: 'General Ledger' },
    { value: 'contract_terms', label: 'Contract Terms' },
    { value: 'item_matching', label: 'Item Matching' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Rebate Validation</h1>
          <p className="text-slate-600">
            Comprehensive validation and compliance monitoring for rebate calculations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      {validationMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6" hover>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {validationMetrics.totalValidationsRun}
                </h3>
                <p className="text-sm text-slate-600">Total Validations</p>
              </div>
            </div>
          </Card>

          <Card className="p-6" hover>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {validationMetrics.successRate}%
                </h3>
                <p className="text-sm text-slate-600">Success Rate</p>
              </div>
            </div>
          </Card>

          <Card className="p-6" hover>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {Math.round(validationMetrics.averageExecutionTime / 1000)}s
                </h3>
                <p className="text-sm text-slate-600">Avg. Execution</p>
              </div>
            </div>
          </Card>

          <Card className="p-6" hover>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {validationMetrics.commonFailures.length}
                </h3>
                <p className="text-sm text-slate-600">Common Issues</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'rules', label: 'Rules', icon: Settings },
          { id: 'history', label: 'History', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Validation Controls */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Run New Validation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Rebate Calculation
                </label>
                <select
                  value={selectedCalculation}
                  onChange={(e) => setSelectedCalculation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">
                    {(calculations?.length || 0) === 0 ? 'Loading calculations...' : 'Select calculation...'}
                  </option>
                  {(calculations || []).map(calc => (
                    <option key={calc.id} value={calc.id}>
                      {calc.contractId} - {calc.period} (Expected: {formatCurrency(calc.expectedAmount)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Validation Type
                </label>
                <select
                  value={selectedValidationType}
                  onChange={(e) => setSelectedValidationType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {validationTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="primary"
                  onClick={handleRunValidation}
                  loading={effectiveValidationLoading}
                  disabled={!selectedCalculation}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run Validation
                </Button>
              </div>
            </div>
          </Card>

          {/* Current Validation Report */}
          {effectiveCurrentValidationReport && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Latest Validation Report
                  </h2>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(effectiveCurrentValidationReport.overallStatus)}
                    <span className={getStatusBadge(effectiveCurrentValidationReport.overallStatus)}>
                      {effectiveCurrentValidationReport.overallStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {effectiveCurrentValidationReport.passedChecks}
                    </div>
                    <div className="text-sm text-slate-600">Passed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {effectiveCurrentValidationReport.failedChecks}
                    </div>
                    <div className="text-sm text-slate-600">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {effectiveCurrentValidationReport.warningChecks}
                    </div>
                    <div className="text-sm text-slate-600">Warnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {Math.round(effectiveCurrentValidationReport.executionTime / 1000)}s
                    </div>
                    <div className="text-sm text-slate-600">Duration</div>
                  </div>
                </div>

                {/* Validation Details */}
                <div className="space-y-3">
                  <h3 className="text-md font-medium text-slate-900">Validation Results</h3>
                  {(effectiveCurrentValidationReport.validations || []).map((validation, index) => (
                    <motion.div
                      key={validation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg"
                    >
                      {getStatusIcon(validation.status)}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900 capitalize">
                          {validation.validationType.replace('_', ' ')} Validation
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          {validation.details}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Validated at {formatDate(validation.validatedAt)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Validation Rules</h2>
          {(validationRules?.length || 0) === 0 ? (
            <div className="text-center py-8">
              <div className="text-slate-500">Loading validation rules...</div>
            </div>
          ) : (
            <div className="space-y-3">
              {(validationRules || []).map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-slate-900">{rule.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      rule.category === 'general_ledger' ? 'bg-blue-100 text-blue-700' :
                      rule.category === 'contract_terms' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {rule.category.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      rule.severity === 'error' ? 'bg-red-100 text-red-700' :
                      rule.severity === 'warning' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {rule.severity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{rule.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Validation History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Report ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Checks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Validated At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(validationReports || []).map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{report.id}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(report.overallStatus)}>
                        {report.overallStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 text-center">
                      <div className="flex justify-center space-x-1">
                        <span className="text-emerald-600">{report.passedChecks}</span>
                        <span>/</span>
                        <span className="text-red-600">{report.failedChecks}</span>
                        <span>/</span>
                        <span className="text-amber-600">{report.warningChecks}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {Math.round(report.executionTime / 1000)}s
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDate(report.validatedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Loading State */}
      {effectiveValidationLoading && (
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Running Validation Checks...
              </h3>
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <p className="text-sm text-slate-600 mt-2">
                Validating general ledger, contract terms, and item matching...
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};