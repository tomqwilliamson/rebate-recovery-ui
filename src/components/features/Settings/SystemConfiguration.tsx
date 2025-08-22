import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Database, 
  Shield, 
  Activity,
  Search,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Server,
  Mail,
  Bell,
  Eye,
  Lock,
  Globe,
  Users,
  FileText,
  BarChart3,
  CheckSquare,
  Edit3,
  Plus,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';
import { mockSystemConfigService, SystemHealth, AuditLog } from '@services/mock/mockSystemConfigService';
import { mockValidationService, ValidationRule } from '@services/mock/mockValidationService';

export const SystemConfiguration: React.FC = () => {
  const [config, setConfig] = useState<SystemHealth | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [validationRules, setValidationRules] = useState<ValidationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingRule, setEditingRule] = useState<ValidationRule | null>(null);

  useEffect(() => {
    loadConfigData();
  }, []);

  const loadConfigData = async () => {
    setLoading(true);
    try {
      const [configData, logsData, rulesData] = await Promise.all([
        mockSystemConfigService.getSystemHealth(),
        mockSystemConfigService.getAuditLogs(),
        mockValidationService.getValidationRules()
      ]);
      setConfig(configData);
      setAuditLogs(logsData);
      setValidationRules(rulesData);
    } catch (error) {
      console.error('Failed to load system configuration:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigUpdate = async (category: string, updates: any) => {
    setSaving(true);
    try {
      const updatedConfig = await mockSystemConfigService.getSystemHealth();
      setConfig(updatedConfig);
    } catch (error) {
      console.error('Failed to update configuration:', error);
    } finally {
      setSaving(false);
    }
  };

  const filteredLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getHealthStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'healthy':
        return `${baseClasses} bg-emerald-100 text-emerald-700`;
      case 'warning':
        return `${baseClasses} bg-amber-100 text-amber-700`;
      case 'critical':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-700`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
          <h1 className="text-3xl font-bold text-gradient mb-2">System Configuration</h1>
          <p className="text-slate-600">Manage system settings, health monitoring, and audit logs</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={loadConfigData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="primary" disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      {config && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6" hover>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Server className="w-6 h-6 text-white" />
                </div>
                {getHealthStatusIcon(config.database.connectionStatus === 'connected' ? 'healthy' : 'critical')}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Database</h3>
              <p className="text-sm text-slate-600">{config.database.queryPerformance}ms avg</p>
              <span className={getHealthStatusBadge(config.database.connectionStatus === 'connected' ? 'healthy' : 'critical')}>
                {config.database.connectionStatus}
              </span>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6" hover>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                {getHealthStatusIcon('healthy')}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">API Service</h3>
              <p className="text-sm text-slate-600">145ms avg</p>
              <span className={getHealthStatusBadge('healthy')}>
                healthy
              </span>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-6" hover>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                {getHealthStatusIcon('healthy')}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Authentication</h3>
              <p className="text-sm text-slate-600">{config.performance.activeConnections} active users</p>
              <span className={getHealthStatusBadge('healthy')}>
                healthy
              </span>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="p-6" hover>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                {getHealthStatusIcon(config.performance.diskUsage > 80 ? 'warning' : 'healthy')}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">File Storage</h3>
              <p className="text-sm text-slate-600">{config.performance.diskUsage}% used</p>
              <span className={getHealthStatusBadge(config.performance.diskUsage > 80 ? 'warning' : 'healthy')}>
                {config.performance.diskUsage > 80 ? 'warning' : 'healthy'}
              </span>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Configuration Tabs */}
      <Card className="p-6">
        <div className="border-b border-slate-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'general', label: 'General Settings', icon: Settings },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'validation', label: 'Validation Rules', icon: CheckSquare },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'audit', label: 'Audit Logs', icon: FileText }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {config && (
          <div className="space-y-6">
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Application Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Application Name</label>
                      <input
                        type="text"
                        defaultValue="Rebate Recovery System"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        defaultValue={480}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Default Currency</label>
                      <select
                        defaultValue="USD"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="text-sm text-slate-700">Maintenance Mode</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">File Upload Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Max File Size (MB)</label>
                      <input
                        type="number"
                        defaultValue={50}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Allowed File Types</label>
                      <input
                        type="text"
                        defaultValue="pdf, xlsx, csv, txt"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Data Retention (days)</label>
                      <input
                        type="number"
                        defaultValue={2555}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Password Policy</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Minimum Length</label>
                      <input
                        type="number"
                        defaultValue={12}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm text-slate-700">Require Uppercase</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm text-slate-700">Require Numbers</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm text-slate-700">Require Special Characters</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Session Security</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Max Login Attempts</label>
                      <input
                        type="number"
                        defaultValue={5}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Lockout Duration (minutes)</label>
                      <input
                        type="number"
                        defaultValue={30}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="text-sm text-slate-700">Enable Two-Factor Authentication</label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="text-sm text-slate-700">Enable Email Notifications</label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">SMTP Server</label>
                      <input
                        type="text"
                        defaultValue="smtp.company.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">From Email</label>
                      <input
                        type="email"
                        defaultValue="noreply@company.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Alert Settings</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm text-slate-700">System Alerts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm text-slate-700">Rebate Alerts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm text-slate-700">Compliance Alerts</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'validation' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Validation Rules Configuration</h3>
                  <Button variant="primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Rule
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {validationRules.map((rule) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            rule.category === 'general_ledger' ? 'bg-blue-100' :
                            rule.category === 'contract_terms' ? 'bg-purple-100' : 'bg-green-100'
                          }`}>
                            {rule.category === 'general_ledger' && <BarChart3 className="w-5 h-5 text-blue-600" />}
                            {rule.category === 'contract_terms' && <FileText className="w-5 h-5 text-purple-600" />}
                            {rule.category === 'item_matching' && <CheckSquare className="w-5 h-5 text-green-600" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{rule.name}</h4>
                            <p className="text-xs text-slate-500 capitalize">{rule.category.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => setEditingRule(rule)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="text-slate-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 mb-4">{rule.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={rule.enabled}
                            onChange={() => {
                              const updatedRules = validationRules.map(r => 
                                r.id === rule.id ? { ...r, enabled: !r.enabled } : r
                              );
                              setValidationRules(updatedRules);
                            }}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label className="text-sm text-slate-700">
                            {rule.enabled ? 'Enabled' : 'Disabled'}
                          </label>
                        </div>
                        <div className="flex items-center space-x-1">
                          {rule.severity === 'error' && (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          )}
                          {rule.severity === 'warning' && (
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          )}
                          {rule.severity === 'info' && (
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          )}
                          <span className={`text-xs font-medium capitalize ${
                            rule.severity === 'error' ? 'text-red-600' :
                            rule.severity === 'warning' ? 'text-amber-600' : 'text-blue-600'
                          }`}>
                            {rule.severity}
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>

                {validationRules.length === 0 && (
                  <div className="text-center py-12">
                    <CheckSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No validation rules configured</h3>
                    <p className="text-slate-600 mb-4">Get started by adding your first validation rule.</p>
                    <Button variant="primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Validation Rule
                    </Button>
                  </div>
                )}

                {/* Rule Categories Summary */}
                <Card className="p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Rule Categories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { 
                        category: 'general_ledger', 
                        label: 'General Ledger', 
                        icon: BarChart3, 
                        color: 'blue',
                        count: validationRules.filter(r => r.category === 'general_ledger').length
                      },
                      { 
                        category: 'contract_terms', 
                        label: 'Contract Terms', 
                        icon: FileText, 
                        color: 'purple',
                        count: validationRules.filter(r => r.category === 'contract_terms').length
                      },
                      { 
                        category: 'item_matching', 
                        label: 'Item Matching', 
                        icon: CheckSquare, 
                        color: 'green',
                        count: validationRules.filter(r => r.category === 'item_matching').length
                      }
                    ].map(({ category, label, icon: Icon, color, count }) => (
                      <div key={category} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                        <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${color}-600`} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{label}</p>
                          <p className="text-sm text-slate-600">{count} rules</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Audit Log History</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{log.action}</p>
                          <p className="text-sm text-slate-600">
                            {log.userEmail} • {log.resource} • {formatDate(log.timestamp)}
                          </p>
                          {log.details && (
                            <p className="text-xs text-slate-500 mt-1">{log.details}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">{log.ipAddress}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredLogs.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No audit logs found</h3>
                    <p className="text-slate-600">No logs match your current search criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};