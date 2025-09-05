import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Building,
  Calendar,
  DollarSign,
  TrendingUp,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Shield,
  Activity,
  Target,
  Users,
  FileBarChart,
  ArrowUpRight,
  ArrowDownRight,
  Edit3,
  Save,
  XCircle
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface ContractDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: any;
  mode: 'view' | 'edit';
  onSave?: (contract: any) => void;
}

export const ContractDetailsModal: React.FC<ContractDetailsModalProps> = ({
  isOpen,
  onClose,
  contract,
  mode: initialMode,
  onSave
}) => {
  const [mode, setMode] = useState(initialMode);
  const [editedContract, setEditedContract] = useState(contract);
  const [activeTab, setActiveTab] = useState('overview');

  if (!contract) return null;

  const handleSave = () => {
    onSave?.(editedContract);
    setMode('view');
  };

  const handleCancel = () => {
    setEditedContract(contract);
    setMode('view');
  };

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Rebate Performance',
        data: [65, 72, 78, 85, 89, 94],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Target',
        data: [70, 70, 70, 70, 70, 70],
        borderColor: 'rgb(156, 163, 175)',
        borderDash: [5, 5]
      }
    ]
  };

  const spendAnalysisData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Actual Spend',
        data: [450000, 520000, 480000, 550000],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
      {
        label: 'Projected',
        data: [400000, 500000, 500000, 600000],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
      }
    ]
  };

  const complianceData = {
    labels: ['Compliant', 'Pending Review', 'Non-Compliant'],
    datasets: [
      {
        data: [85, 10, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          padding: 20,
          color: '#64748b'
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#64748b'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#64748b'
        }
      }
    }
  };

  const kpis = [
    {
      label: 'Total Contract Value',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      label: 'Current Rebate Rate',
      value: '3.8%',
      change: '+0.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-emerald-500 to-green-600'
    },
    {
      label: 'YTD Savings',
      value: '$187K',
      change: '+24%',
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-pink-600'
    },
    {
      label: 'Compliance Score',
      value: '94%',
      change: '+2%',
      trend: 'up',
      icon: Shield,
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const milestones = [
    { title: 'Contract Initiated', date: '2024-01-01', status: 'completed' },
    { title: 'Q1 Review', date: '2024-03-31', status: 'completed' },
    { title: 'Mid-Year Audit', date: '2024-06-30', status: 'completed' },
    { title: 'Q3 Review', date: '2024-09-30', status: 'pending' },
    { title: 'Annual Renewal', date: '2024-12-31', status: 'upcoming' }
  ];

  const topItems = [
    { name: 'Surgical Gloves', sku: 'SG-2401', spend: '$124,500', rebate: '$4,980' },
    { name: 'N95 Masks', sku: 'NM-9521', spend: '$98,200', rebate: '$3,928' },
    { name: 'Syringes 5ml', sku: 'SY-0512', spend: '$76,400', rebate: '$3,056' },
    { name: 'Bandages Sterile', sku: 'BS-3421', spend: '$64,200', rebate: '$2,568' },
    { name: 'IV Catheters', sku: 'IC-8721', spend: '$58,900', rebate: '$2,356' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-7xl max-h-[90vh] my-8"
            >
              <div className="bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 max-h-[90vh]">
              {/* Header - Fixed */}
              <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-6 text-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{contract.name}</h2>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {contract.vendor}
                        </span>
                        <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                          {contract.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {mode === 'view' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setMode('edit')}
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handleSave}
                          className="bg-white text-primary-600"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleCancel}
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs - Fixed */}
              <div className="flex items-center space-x-1 p-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 flex-shrink-0 overflow-x-auto">
                {['overview', 'performance', 'items', 'compliance', 'timeline'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-slate-600 hover:bg-white/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {kpis.map((kpi, index) => (
                        <motion.div
                          key={kpi.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-4" hover>
                            <div className="flex items-center justify-between mb-3">
                              <div className={`w-10 h-10 bg-gradient-to-br ${kpi.color} rounded-lg flex items-center justify-center`}>
                                <kpi.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className={`flex items-center text-sm ${
                                kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                              }`}>
                                {kpi.change}
                                {kpi.trend === 'up' ? (
                                  <ArrowUpRight className="w-4 h-4 ml-1" />
                                ) : (
                                  <ArrowDownRight className="w-4 h-4 ml-1" />
                                )}
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                              {mode === 'edit' && kpi.label === 'Total Contract Value' ? (
                                <input
                                  type="text"
                                  value={editedContract.totalValue || kpi.value}
                                  onChange={(e) => setEditedContract({...editedContract, totalValue: e.target.value})}
                                  className="w-full px-2 py-1 border border-slate-200 rounded"
                                />
                              ) : (
                                kpi.value
                              )}
                            </h3>
                            <p className="text-sm text-slate-600">{kpi.label}</p>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    {/* Contract Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <FileBarChart className="w-5 h-5 mr-2 text-primary-600" />
                          Contract Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Contract ID</span>
                            <span className="font-medium text-slate-900">CTR-2024-{contract.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Type</span>
                            {mode === 'edit' ? (
                              <input
                                type="text"
                                value={editedContract.type}
                                onChange={(e) => setEditedContract({...editedContract, type: e.target.value})}
                                className="px-2 py-1 border border-slate-200 rounded text-right"
                              />
                            ) : (
                              <span className="font-medium text-slate-900">{contract.type}</span>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Start Date</span>
                            {mode === 'edit' ? (
                              <input
                                type="date"
                                value={editedContract.startDate}
                                onChange={(e) => setEditedContract({...editedContract, startDate: e.target.value})}
                                className="px-2 py-1 border border-slate-200 rounded"
                              />
                            ) : (
                              <span className="font-medium text-slate-900">
                                {new Date(contract.startDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">End Date</span>
                            {mode === 'edit' ? (
                              <input
                                type="date"
                                value={editedContract.endDate}
                                onChange={(e) => setEditedContract({...editedContract, endDate: e.target.value})}
                                className="px-2 py-1 border border-slate-200 rounded"
                              />
                            ) : (
                              <span className="font-medium text-slate-900">
                                {new Date(contract.endDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Rebate Range</span>
                            {mode === 'edit' ? (
                              <input
                                type="text"
                                value={editedContract.rebateRate}
                                onChange={(e) => setEditedContract({...editedContract, rebateRate: e.target.value})}
                                className="px-2 py-1 border border-slate-200 rounded text-right"
                              />
                            ) : (
                              <span className="font-medium text-slate-900">{contract.rebateRate}</span>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Items Count</span>
                            <span className="font-medium text-slate-900">{contract.itemsCount}</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <Activity className="w-5 h-5 mr-2 text-primary-600" />
                          Recent Activity
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900">Rebate processed</p>
                              <p className="text-xs text-slate-500">$24,500 - 2 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900">Contract updated</p>
                              <p className="text-xs text-slate-500">Rate adjusted - 5 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900">Review scheduled</p>
                              <p className="text-xs text-slate-500">Q3 audit - 10 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900">New items added</p>
                              <p className="text-xs text-slate-500">12 items - 15 days ago</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          Rebate Performance Trend
                        </h3>
                        <div className="h-64">
                          <Line data={performanceData} options={chartOptions} />
                        </div>
                      </Card>
                      
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          Quarterly Spend Analysis
                        </h3>
                        <div className="h-64">
                          <Bar data={spendAnalysisData} options={chartOptions} />
                        </div>
                      </Card>
                    </div>

                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Performance Metrics
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto">
                            <Doughnut 
                              data={{
                                labels: ['Achieved', 'Remaining'],
                                datasets: [{
                                  data: [78, 22],
                                  backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(226, 232, 240, 0.8)'],
                                  borderWidth: 0
                                }]
                              }}
                              options={{
                                plugins: { legend: { display: false } },
                                cutout: '70%'
                              }}
                            />
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mt-4">78%</h4>
                          <p className="text-sm text-slate-600">Target Achievement</p>
                        </div>
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto">
                            <Doughnut 
                              data={{
                                labels: ['Used', 'Available'],
                                datasets: [{
                                  data: [62, 38],
                                  backgroundColor: ['rgba(236, 72, 153, 0.8)', 'rgba(226, 232, 240, 0.8)'],
                                  borderWidth: 0
                                }]
                              }}
                              options={{
                                plugins: { legend: { display: false } },
                                cutout: '70%'
                              }}
                            />
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mt-4">$1.49M</h4>
                          <p className="text-sm text-slate-600">Budget Utilization</p>
                        </div>
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto">
                            <Doughnut 
                              data={{
                                labels: ['Realized', 'Projected'],
                                datasets: [{
                                  data: [85, 15],
                                  backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(226, 232, 240, 0.8)'],
                                  borderWidth: 0
                                }]
                              }}
                              options={{
                                plugins: { legend: { display: false } },
                                cutout: '70%'
                              }}
                            />
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mt-4">85%</h4>
                          <p className="text-sm text-slate-600">Savings Realized</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {activeTab === 'items' && (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900">
                          Top Performing Items
                        </h3>
                        <Button variant="secondary" size="sm">
                          View All Items
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Item</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">SKU</th>
                              <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">YTD Spend</th>
                              <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">Rebate</th>
                              <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topItems.map((item, index) => (
                              <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                                      <Package className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-medium text-slate-900">{item.name}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-600">{item.sku}</td>
                                <td className="py-3 px-4 text-right font-medium text-slate-900">{item.spend}</td>
                                <td className="py-3 px-4 text-right">
                                  <span className="text-emerald-600 font-medium">{item.rebate}</span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <div className="flex items-center justify-center text-emerald-600">
                                    <TrendingUp className="w-4 h-4" />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          Category Distribution
                        </h3>
                        <div className="h-64">
                          <Doughnut 
                            data={{
                              labels: ['Medical Supplies', 'Surgical', 'Diagnostic', 'Pharmaceuticals', 'Other'],
                              datasets: [{
                                data: [35, 25, 20, 15, 5],
                                backgroundColor: [
                                  'rgba(99, 102, 241, 0.8)',
                                  'rgba(236, 72, 153, 0.8)',
                                  'rgba(251, 191, 36, 0.8)',
                                  'rgba(34, 197, 94, 0.8)',
                                  'rgba(156, 163, 175, 0.8)'
                                ],
                                borderWidth: 0
                              }]
                            }}
                            options={chartOptions}
                          />
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          Volume Metrics
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-slate-600">Order Frequency</span>
                              <span className="text-sm font-medium text-slate-900">Weekly</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full" style={{width: '85%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-slate-600">Avg. Order Value</span>
                              <span className="text-sm font-medium text-slate-900">$24,500</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full" style={{width: '72%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-slate-600">SKU Coverage</span>
                              <span className="text-sm font-medium text-slate-900">847 / 1,200</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{width: '70%'}}></div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === 'compliance' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="p-6 lg:col-span-2">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          Compliance Overview
                        </h3>
                        <div className="h-64">
                          <Doughnut data={complianceData} options={chartOptions} />
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          Audit Status
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                              <span className="text-sm font-medium text-slate-900">Last Audit</span>
                            </div>
                            <span className="text-sm text-slate-600">Jun 30, 2024</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-amber-600" />
                              <span className="text-sm font-medium text-slate-900">Next Audit</span>
                            </div>
                            <span className="text-sm text-slate-600">Sep 30, 2024</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Shield className="w-5 h-5 text-blue-600" />
                              <span className="text-sm font-medium text-slate-900">Risk Level</span>
                            </div>
                            <span className="text-sm font-medium text-emerald-600">Low</span>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Compliance Requirements
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'Price Match Verification', status: 'compliant', date: '2024-08-01' },
                          { name: 'Volume Commitment', status: 'compliant', date: '2024-07-15' },
                          { name: 'Payment Terms', status: 'compliant', date: '2024-08-10' },
                          { name: 'Quality Standards', status: 'compliant', date: '2024-08-05' },
                          { name: 'Delivery Timeline', status: 'pending', date: '2024-08-12' },
                          { name: 'Documentation', status: 'compliant', date: '2024-08-08' }
                        ].map((req, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {req.status === 'compliant' ? (
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-amber-500" />
                              )}
                              <div>
                                <p className="text-sm font-medium text-slate-900">{req.name}</p>
                                <p className="text-xs text-slate-500">Last checked: {req.date}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              req.status === 'compliant' 
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {req.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">
                        Contract Timeline & Milestones
                      </h3>
                      <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                        {milestones.map((milestone, index) => (
                          <div key={index} className="relative flex items-start mb-8">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              milestone.status === 'completed' 
                                ? 'bg-emerald-500 border-emerald-500'
                                : milestone.status === 'pending'
                                ? 'bg-amber-500 border-amber-500'
                                : 'bg-white border-slate-300'
                            } absolute left-6 mt-1.5`}></div>
                            <div className="ml-16 flex-1">
                              <div className="bg-slate-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-slate-900">{milestone.title}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    milestone.status === 'completed' 
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : milestone.status === 'pending'
                                      ? 'bg-amber-100 text-amber-700'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}>
                                    {milestone.status}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600 flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(milestone.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          Key Contacts
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">John Smith</p>
                              <p className="text-xs text-slate-600">Account Manager • j.smith@amerimed.com</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">Sarah Johnson</p>
                              <p className="text-xs text-slate-600">Contract Specialist • s.johnson@amerimed.com</p>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          Important Dates
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm text-slate-600">Annual Review</span>
                            <span className="text-sm font-medium text-slate-900">Dec 1, 2024</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm text-slate-600">Rate Negotiation</span>
                            <span className="text-sm font-medium text-slate-900">Nov 15, 2024</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm text-slate-600">Renewal Deadline</span>
                            <span className="text-sm font-medium text-slate-900">Dec 31, 2024</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};