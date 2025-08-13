import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  Edit, 
  Share,
  Calendar,
  Building,
  DollarSign,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';
import { TrendChart } from '@components/common/Charts/TrendChart';

export const ContractDetails: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock contract data
  const contract = {
    id: '1',
    name: 'Medical Supplies Agreement 2024',
    vendor: 'AmeriMed Solutions',
    type: 'Medical Supplies',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rebateRate: '2.5% - 4.2%',
    totalValue: '$2.4M',
    itemsCount: 847,
    lastModified: '2024-08-10',
    compliance: 94,
    description: 'Comprehensive medical supplies agreement covering surgical instruments, diagnostic equipment, and consumables.',
    contactPerson: 'Sarah Johnson',
    contactEmail: 'sarah.johnson@amerimed.com',
    contactPhone: '+1 (555) 123-4567'
  };

  const rebateHistory = [
    { period: 'Q1 2024', expected: 95000, actual: 92000, status: 'paid' },
    { period: 'Q2 2024', expected: 120000, actual: 118000, status: 'paid' },
    { period: 'Q3 2024', expected: 135000, actual: 0, status: 'pending' },
    { period: 'Q4 2024', expected: 110000, actual: 0, status: 'projected' }
  ];

  const contractTerms = [
    { term: 'Rebate Threshold', value: '$50,000 minimum quarterly purchase' },
    { term: 'Payment Terms', value: 'Net 30 days from quarter end' },
    { term: 'Tier 1 Rebate', value: '2.5% on $50K-$100K purchases' },
    { term: 'Tier 2 Rebate', value: '3.2% on $100K-$200K purchases' },
    { term: 'Tier 3 Rebate', value: '4.2% on $200K+ purchases' },
    { term: 'Amendment Process', value: 'Written notice 30 days prior' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'terms', label: 'Contract Terms', icon: Calendar },
    { id: 'rebates', label: 'Rebate History', icon: DollarSign },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gradient">{contract.name}</h1>
            <p className="text-slate-600 flex items-center mt-1">
              <Building className="w-4 h-4 mr-1" />
              {contract.vendor}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="primary">
            <Edit className="w-4 h-4 mr-2" />
            Edit Contract
          </Button>
        </div>
      </div>

      {/* Contract Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6" hover>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{contract.totalValue}</h3>
              <p className="text-sm text-slate-600">Total Value</p>
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{contract.rebateRate}</h3>
              <p className="text-sm text-slate-600">Rebate Rate</p>
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{contract.itemsCount}</h3>
              <p className="text-sm text-slate-600">Items</p>
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{contract.compliance}%</h3>
              <p className="text-sm text-slate-600">Compliance</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="overflow-hidden">
        <div className="border-b border-slate-200">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Contract Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Contract Type:</span>
                      <span className="font-medium text-slate-900">{contract.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status:</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                        {contract.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Start Date:</span>
                      <span className="font-medium text-slate-900">
                        {new Date(contract.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">End Date:</span>
                      <span className="font-medium text-slate-900">
                        {new Date(contract.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Last Modified:</span>
                      <span className="font-medium text-slate-900">
                        {new Date(contract.lastModified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Contact Person:</span>
                      <span className="font-medium text-slate-900">{contract.contactPerson}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span className="font-medium text-primary-600">{contract.contactEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phone:</span>
                      <span className="font-medium text-slate-900">{contract.contactPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Description</h3>
                <p className="text-slate-600 leading-relaxed">{contract.description}</p>
              </div>
            </motion.div>
          )}

          {/* Contract Terms Tab */}
          {activeTab === 'terms' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Contract Terms & Conditions</h3>
              <div className="grid grid-cols-1 gap-4">
                {contractTerms.map((term, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-900">{term.term}</span>
                    <span className="text-slate-600">{term.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Rebate History Tab */}
          {activeTab === 'rebates' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Rebate History</h3>
              <div className="space-y-4">
                {rebateHistory.map((rebate, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{rebate.period}</h4>
                        <p className="text-sm text-slate-600">
                          Expected: ${rebate.expected.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-900">
                        ${rebate.actual.toLocaleString()}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rebate.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                        rebate.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {rebate.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Compliance Tab */}
          {activeTab === 'compliance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Compliance Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-emerald-600 mb-1">94%</h4>
                  <p className="text-sm text-slate-600">Overall Compliance</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-amber-600 mb-1">2</h4>
                  <p className="text-sm text-slate-600">Pending Items</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-red-600 mb-1">1</h4>
                  <p className="text-sm text-slate-600">Issues Found</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
};