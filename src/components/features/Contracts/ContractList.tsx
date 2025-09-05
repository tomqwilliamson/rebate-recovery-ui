import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2,
  Calendar,
  Building,
  DollarSign,
  FileText,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';
import { ContractDetailsModal } from './ContractDetailsModal';
import { ContractUploadModal } from './ContractUploadModal';
import { AdvancedFiltersModal, FilterValues } from './AdvancedFiltersModal';

interface Contract {
  id: string;
  name: string;
  vendor: string;
  type: string;
  status: 'active' | 'expired' | 'pending' | 'draft';
  startDate: string;
  endDate: string;
  rebateRate: string;
  totalValue: string;
  itemsCount: number;
  lastModified: string;
  compliance: number;
}

const mockContracts: Contract[] = [
  {
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
    compliance: 94
  },
  {
    id: '2',
    name: 'Surgical Equipment Contract',
    vendor: 'SurgiTech Corp',
    type: 'Surgical Equipment',
    status: 'active',
    startDate: '2024-03-15',
    endDate: '2025-03-14',
    rebateRate: '3.0% - 5.5%',
    totalValue: '$1.8M',
    itemsCount: 234,
    lastModified: '2024-08-08',
    compliance: 98
  },
  {
    id: '3',
    name: 'Pharmaceutical Supplies',
    vendor: 'MedTech Pharma',
    type: 'Pharmaceuticals',
    status: 'pending',
    startDate: '2024-09-01',
    endDate: '2025-08-31',
    rebateRate: '1.8% - 3.2%',
    totalValue: '$3.2M',
    itemsCount: 1247,
    lastModified: '2024-08-12',
    compliance: 87
  },
  {
    id: '4',
    name: 'Diagnostic Equipment Agreement',
    vendor: 'DiagnosticPro Inc',
    type: 'Diagnostic Equipment',
    status: 'expired',
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    rebateRate: '4.0% - 6.8%',
    totalValue: '$950K',
    itemsCount: 156,
    lastModified: '2024-05-30',
    compliance: 91
  }
];

export const ContractList: React.FC = () => {
  const [contracts] = useState<Contract[]>(mockContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterValues>({
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
  });

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleSaveContract = (updatedContract: Contract) => {
    console.log('Saving contract:', updatedContract);
  };

  const handleUploadContract = (contractData: any) => {
    console.log('Uploading contract:', contractData);
  };

  const handleDeleteContract = (contractId: string) => {
    console.log('Deleting contract:', contractId);
    setShowDropdownId(null);
  };

  const handleExportContract = (contractId: string) => {
    console.log('Exporting contract:', contractId);
    setShowDropdownId(null);
  };

  const handleAdvancedFilters = (filters: FilterValues) => {
    setAdvancedFilters(filters);
    console.log('Applied advanced filters:', filters);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-emerald-100 text-emerald-700`;
      case 'pending':
        return `${baseClasses} bg-amber-100 text-amber-700`;
      case 'expired':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'draft':
        return `${baseClasses} bg-gray-100 text-gray-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return 'text-emerald-600';
    if (compliance >= 85) return 'text-amber-600';
    return 'text-red-600';
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || contract.status === filterStatus;
    
    // Apply advanced filters if any are set
    let matchesAdvanced = true;
    if (advancedFilters && Object.keys(advancedFilters).length > 0) {
      // Status filter
      if (advancedFilters.status?.length > 0) {
        matchesAdvanced = matchesAdvanced && advancedFilters.status.includes(contract.status);
      }
      
      // Vendor filter
      if (advancedFilters.vendors?.length > 0) {
        matchesAdvanced = matchesAdvanced && advancedFilters.vendors.includes(contract.vendor);
      }
      
      // Contract type filter
      if (advancedFilters.contractTypes?.length > 0) {
        matchesAdvanced = matchesAdvanced && advancedFilters.contractTypes.includes(contract.type);
      }
      
      // Compliance range filter
      if (advancedFilters.complianceMin) {
        matchesAdvanced = matchesAdvanced && contract.compliance >= parseInt(advancedFilters.complianceMin);
      }
      if (advancedFilters.complianceMax) {
        matchesAdvanced = matchesAdvanced && contract.compliance <= parseInt(advancedFilters.complianceMax);
      }
    }
    
    return matchesSearch && matchesFilter && matchesAdvanced;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Contracts</h1>
          <p className="text-slate-600">
            Manage and monitor your vendor contracts and agreements
          </p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setIsUploadModalOpen(true)}>
          <FileText className="w-5 h-5 mr-2" />
          Upload Contract
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all min-w-80"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            >
              <option value="name">Sort by Name</option>
              <option value="vendor">Sort by Vendor</option>
              <option value="endDate">Sort by End Date</option>
              <option value="compliance">Sort by Compliance</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" onClick={() => setIsAdvancedFiltersOpen(true)}>
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredContracts.map((contract, index) => (
          <motion.div
            key={contract.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6" hover>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {contract.name}
                        </h3>
                        <span className={getStatusBadge(contract.status)}>
                          {contract.status}
                        </span>
                      </div>
                      <p className="text-slate-600 flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {contract.vendor} • {contract.type}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Contract Period</p>
                      <p className="text-sm font-medium text-slate-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Total Value</p>
                      <p className="text-sm font-medium text-slate-900 flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {contract.totalValue}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Rebate Rate</p>
                      <p className="text-sm font-medium text-slate-900">
                        {contract.rebateRate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Compliance</p>
                      <p className={`text-sm font-medium ${getComplianceColor(contract.compliance)}`}>
                        {contract.compliance}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      {contract.itemsCount} items • Last modified {new Date(contract.lastModified).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="secondary" size="sm" onClick={() => handleViewContract(contract)}>
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <div className="relative">
                        <button 
                          className="p-2 rounded hover:bg-slate-100 transition-colors"
                          onClick={() => setShowDropdownId(showDropdownId === contract.id ? null : contract.id)}
                        >
                          <MoreVertical className="w-4 h-4 text-slate-500" />
                        </button>
                        {showDropdownId === contract.id && (
                          <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10">
                            <button
                              onClick={() => handleExportContract(contract.id)}
                              className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 flex items-center"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Export Contract
                            </button>
                            <button
                              onClick={() => handleDeleteContract(contract.id)}
                              className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-red-600 flex items-center"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Contract
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center" hover>
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            {contracts.length}
          </h3>
          <p className="text-sm text-slate-600">Total Contracts</p>
        </Card>

        <Card className="p-6 text-center" hover>
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            {contracts.filter(c => c.status === 'active').length}
          </h3>
          <p className="text-sm text-slate-600">Active Contracts</p>
        </Card>

        <Card className="p-6 text-center" hover>
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            $8.35M
          </h3>
          <p className="text-sm text-slate-600">Total Value</p>
        </Card>

        <Card className="p-6 text-center" hover>
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
            <Building className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            12
          </h3>
          <p className="text-sm text-slate-600">Vendors</p>
        </Card>
      </div>

      {/* Contract Details Modal */}
      {selectedContract && (
        <ContractDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contract={selectedContract}
          mode={modalMode}
          onSave={handleSaveContract}
        />
      )}

      {/* Contract Upload Modal */}
      <ContractUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadContract}
      />

      {/* Advanced Filters Modal */}
      <AdvancedFiltersModal
        isOpen={isAdvancedFiltersOpen}
        onClose={() => setIsAdvancedFiltersOpen(false)}
        onApplyFilters={handleAdvancedFilters}
        currentFilters={advancedFilters}
      />
    </div>
  );
};