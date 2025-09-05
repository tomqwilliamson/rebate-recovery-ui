import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Filter,
  Calendar,
  DollarSign,
  Percent,
  Building,
  Package,
  TrendingUp,
  RotateCcw,
  Search
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';

interface AdvancedFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterValues) => void;
  currentFilters?: FilterValues;
}

export interface FilterValues {
  // Time Range Filters
  dateRange: 'all' | 'thisQuarter' | 'lastQuarter' | 'thisYear' | 'lastYear' | 'custom';
  customStartDate: string;
  customEndDate: string;
  
  // Status Filters
  status: string[];
  
  // Financial Filters
  valueMin: string;
  valueMax: string;
  rebateRateMin: string;
  rebateRateMax: string;
  
  // Performance Filters
  complianceMin: string;
  complianceMax: string;
  performanceRating: 'all' | 'excellent' | 'good' | 'fair' | 'poor';
  
  // Vendor & Type Filters
  vendors: string[];
  contractTypes: string[];
  
  // Volume & Activity Filters
  itemCountMin: string;
  itemCountMax: string;
  lastModifiedDays: string;
  
  // Risk & Renewal Filters
  expiringWithin: 'all' | '30days' | '60days' | '90days' | '6months';
  riskLevel: 'all' | 'low' | 'medium' | 'high';
  renewalStatus: 'all' | 'autoRenew' | 'manualRenew' | 'expiring';
}

const defaultFilters: FilterValues = {
  dateRange: 'all',
  customStartDate: '',
  customEndDate: '',
  status: [],
  valueMin: '',
  valueMax: '',
  rebateRateMin: '',
  rebateRateMax: '',
  complianceMin: '',
  complianceMax: '',
  performanceRating: 'all',
  vendors: [],
  contractTypes: [],
  itemCountMin: '',
  itemCountMax: '',
  lastModifiedDays: '',
  expiringWithin: 'all',
  riskLevel: 'all',
  renewalStatus: 'all'
};

export const AdvancedFiltersModal: React.FC<AdvancedFiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters = defaultFilters
}) => {
  const [filters, setFilters] = useState<FilterValues>(currentFilters);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setFilters(prev => ({
        ...prev,
        status: [...(prev.status || []), status]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        status: (prev.status || []).filter(s => s !== status)
      }));
    }
  };

  const handleVendorChange = (vendor: string, checked: boolean) => {
    if (checked) {
      setFilters(prev => ({
        ...prev,
        vendors: [...(prev.vendors || []), vendor]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        vendors: (prev.vendors || []).filter(v => v !== vendor)
      }));
    }
  };

  const handleContractTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFilters(prev => ({
        ...prev,
        contractTypes: [...(prev.contractTypes || []), type]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        contractTypes: (prev.contractTypes || []).filter(t => t !== type)
      }));
    }
  };

  const availableVendors = [
    'AmeriMed Solutions', 'SurgiTech Corp', 'MedTech Pharma', 
    'DiagnosticPro Inc', 'HealthCare Partners', 'Medical Supply Co'
  ];

  const availableTypes = [
    'Medical Supplies', 'Surgical Equipment', 'Pharmaceuticals', 
    'Diagnostic Equipment', 'Lab Equipment', 'Safety Equipment'
  ];

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-emerald-100 text-emerald-700' },
    { value: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-700' },
    { value: 'expired', label: 'Expired', color: 'bg-red-100 text-red-700' },
    { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-700' }
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: Filter },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'advanced', label: 'Advanced', icon: Package }
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
              className="relative w-full max-w-5xl my-8"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-6 text-white rounded-t-2xl flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Filter className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Advanced Filters</h2>
                        <p className="text-white/80 text-sm mt-1">Fine-tune your contract search criteria</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center space-x-1 p-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 flex-shrink-0 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-slate-600 hover:bg-white/50'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      {/* Date Range */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                          Date Range
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                              { value: 'all', label: 'All Time' },
                              { value: 'thisQuarter', label: 'This Quarter' },
                              { value: 'lastQuarter', label: 'Last Quarter' },
                              { value: 'thisYear', label: 'This Year' },
                              { value: 'lastYear', label: 'Last Year' },
                              { value: 'custom', label: 'Custom Range' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="dateRange"
                                  value={option.value}
                                  checked={filters.dateRange === option.value}
                                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value as any }))}
                                  className="text-primary-600"
                                />
                                <span className="text-sm text-slate-700">{option.label}</span>
                              </label>
                            ))}
                          </div>
                          {filters.dateRange === 'custom' && (
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                                <input
                                  type="date"
                                  value={filters.customStartDate}
                                  onChange={(e) => setFilters(prev => ({ ...prev, customStartDate: e.target.value }))}
                                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                                <input
                                  type="date"
                                  value={filters.customEndDate}
                                  onChange={(e) => setFilters(prev => ({ ...prev, customEndDate: e.target.value }))}
                                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>

                      {/* Status */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Contract Status</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {statusOptions.map((status) => (
                            <label key={status.value} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.status?.includes(status.value) || false}
                                onChange={(e) => handleStatusChange(status.value, e.target.checked)}
                                className="text-primary-600"
                              />
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                {status.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </Card>

                      {/* Vendors */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <Building className="w-5 h-5 mr-2 text-primary-600" />
                          Vendors
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {availableVendors.map((vendor) => (
                            <label key={vendor} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.vendors?.includes(vendor) || false}
                                onChange={(e) => handleVendorChange(vendor, e.target.checked)}
                                className="text-primary-600"
                              />
                              <span className="text-sm text-slate-700">{vendor}</span>
                            </label>
                          ))}
                        </div>
                      </Card>

                      {/* Contract Types */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-primary-600" />
                          Contract Types
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {availableTypes.map((type) => (
                            <label key={type} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.contractTypes?.includes(type) || false}
                                onChange={(e) => handleContractTypeChange(type, e.target.checked)}
                                className="text-primary-600"
                              />
                              <span className="text-sm text-slate-700">{type}</span>
                            </label>
                          ))}
                        </div>
                      </Card>
                    </div>
                  )}

                  {activeTab === 'financial' && (
                    <div className="space-y-6">
                      {/* Contract Value */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
                          Contract Value Range
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Value</label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="text"
                                value={filters.valueMin}
                                onChange={(e) => setFilters(prev => ({ ...prev, valueMin: e.target.value }))}
                                placeholder="e.g., 100000"
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Maximum Value</label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="text"
                                value={filters.valueMax}
                                onChange={(e) => setFilters(prev => ({ ...prev, valueMax: e.target.value }))}
                                placeholder="e.g., 5000000"
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Rebate Rate */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <Percent className="w-5 h-5 mr-2 text-primary-600" />
                          Rebate Rate Range
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Rate (%)</label>
                            <div className="relative">
                              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="text"
                                value={filters.rebateRateMin}
                                onChange={(e) => setFilters(prev => ({ ...prev, rebateRateMin: e.target.value }))}
                                placeholder="e.g., 2.0"
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Maximum Rate (%)</label>
                            <div className="relative">
                              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="text"
                                value={filters.rebateRateMax}
                                onChange={(e) => setFilters(prev => ({ ...prev, rebateRateMax: e.target.value }))}
                                placeholder="e.g., 8.0"
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}

                  {activeTab === 'performance' && (
                    <div className="space-y-6">
                      {/* Compliance Score */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                          Compliance Score Range
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Score (%)</label>
                            <input
                              type="text"
                              value={filters.complianceMin}
                              onChange={(e) => setFilters(prev => ({ ...prev, complianceMin: e.target.value }))}
                              placeholder="e.g., 80"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Maximum Score (%)</label>
                            <input
                              type="text"
                              value={filters.complianceMax}
                              onChange={(e) => setFilters(prev => ({ ...prev, complianceMax: e.target.value }))}
                              placeholder="e.g., 100"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                      </Card>

                      {/* Performance Rating */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Rating</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          {[
                            { value: 'all', label: 'All' },
                            { value: 'excellent', label: 'Excellent (95%+)' },
                            { value: 'good', label: 'Good (85-94%)' },
                            { value: 'fair', label: 'Fair (70-84%)' },
                            { value: 'poor', label: 'Poor (<70%)' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="performanceRating"
                                value={option.value}
                                checked={filters.performanceRating === option.value}
                                onChange={(e) => setFilters(prev => ({ ...prev, performanceRating: e.target.value as any }))}
                                className="text-primary-600"
                              />
                              <span className="text-sm text-slate-700">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </Card>
                    </div>
                  )}

                  {activeTab === 'advanced' && (
                    <div className="space-y-6">
                      {/* Item Count */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-primary-600" />
                          Item Count Range
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Items</label>
                            <input
                              type="text"
                              value={filters.itemCountMin}
                              onChange={(e) => setFilters(prev => ({ ...prev, itemCountMin: e.target.value }))}
                              placeholder="e.g., 100"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Maximum Items</label>
                            <input
                              type="text"
                              value={filters.itemCountMax}
                              onChange={(e) => setFilters(prev => ({ ...prev, itemCountMax: e.target.value }))}
                              placeholder="e.g., 1000"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                      </Card>

                      {/* Contract Expiration */}
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                          Expiring Within
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          {[
                            { value: 'all', label: 'All Contracts' },
                            { value: '30days', label: '30 Days' },
                            { value: '60days', label: '60 Days' },
                            { value: '90days', label: '90 Days' },
                            { value: '6months', label: '6 Months' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="expiringWithin"
                                value={option.value}
                                checked={filters.expiringWithin === option.value}
                                onChange={(e) => setFilters(prev => ({ ...prev, expiringWithin: e.target.value as any }))}
                                className="text-primary-600"
                              />
                              <span className="text-sm text-slate-700">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </Card>

                      {/* Risk Level & Renewal Status */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-4">
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">Risk Level</h3>
                          <div className="space-y-2">
                            {[
                              { value: 'all', label: 'All Levels' },
                              { value: 'low', label: 'Low Risk' },
                              { value: 'medium', label: 'Medium Risk' },
                              { value: 'high', label: 'High Risk' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="riskLevel"
                                  value={option.value}
                                  checked={filters.riskLevel === option.value}
                                  onChange={(e) => setFilters(prev => ({ ...prev, riskLevel: e.target.value as any }))}
                                  className="text-primary-600"
                                />
                                <span className="text-sm text-slate-700">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </Card>

                        <Card className="p-4">
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">Renewal Status</h3>
                          <div className="space-y-2">
                            {[
                              { value: 'all', label: 'All Types' },
                              { value: 'autoRenew', label: 'Auto-Renewal' },
                              { value: 'manualRenew', label: 'Manual Renewal' },
                              { value: 'expiring', label: 'Expiring Soon' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="renewalStatus"
                                  value={option.value}
                                  checked={filters.renewalStatus === option.value}
                                  onChange={(e) => setFilters(prev => ({ ...prev, renewalStatus: e.target.value as any }))}
                                  className="text-primary-600"
                                />
                                <span className="text-sm text-slate-700">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex-shrink-0">
                  <Button
                    variant="secondary"
                    onClick={handleReset}
                    className="flex items-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All</span>
                  </Button>
                  <div className="flex items-center space-x-3">
                    <Button variant="secondary" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleApply}>
                      <Search className="w-4 h-4 mr-2" />
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};