import React from 'react';
import { Modal } from '@components/common/UI/Modal';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  FileText,
  User,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { formatCurrency, formatDate } from '@utils/formatters';

interface RebateCalculation {
  id: string;
  contractName: string;
  vendor: string;
  period: string;
  expectedAmount: number;
  actualAmount: number;
  variance: number;
  status: 'calculated' | 'pending' | 'paid' | 'disputed';
  calculatedAt: string;
  dueDate: string;
}

interface RebateDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  calculation: RebateCalculation | null;
}

export const RebateDetailDialog: React.FC<RebateDetailDialogProps> = ({
  isOpen,
  onClose,
  calculation
}) => {
  if (!calculation) return null;

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'calculated':
        return `${baseClasses} bg-blue-100 text-blue-700`;
      case 'pending':
        return `${baseClasses} bg-amber-100 text-amber-700`;
      case 'paid':
        return `${baseClasses} bg-emerald-100 text-emerald-700`;
      case 'disputed':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-emerald-600';
    if (variance < 0) return 'text-red-600';
    return 'text-slate-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'calculated':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'disputed':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rebate Calculation Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              {calculation.contractName}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-1" />
                {calculation.vendor}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {calculation.period}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(calculation.status)}
            <span className={getStatusBadge(calculation.status)}>
              {calculation.status}
            </span>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-600">Expected Amount</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {formatCurrency(calculation.expectedAmount)}
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-slate-600">Actual Amount</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {formatCurrency(calculation.actualAmount)}
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className={`w-5 h-5 ${calculation.variance >= 0 ? 'text-emerald-600' : 'text-red-600'}`} />
              <span className="text-sm font-medium text-slate-600">Variance</span>
            </div>
            <div className={`text-2xl font-bold ${getVarianceColor(calculation.variance)}`}>
              {calculation.variance >= 0 ? '+' : ''}{formatCurrency(calculation.variance)}
            </div>
          </div>
        </div>

        {/* Calculation Details */}
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Calculation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Calculation ID:</span>
                <span className="text-sm font-medium text-slate-900">#{calculation.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Calculated On:</span>
                <span className="text-sm font-medium text-slate-900">
                  {formatDate(calculation.calculatedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Due Date:</span>
                <span className="text-sm font-medium text-slate-900">
                  {formatDate(calculation.dueDate)}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Variance Percentage:</span>
                <span className={`text-sm font-medium ${getVarianceColor(calculation.variance)}`}>
                  {((calculation.variance / calculation.expectedAmount) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Contract Period:</span>
                <span className="text-sm font-medium text-slate-900">{calculation.period}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Payment Status:</span>
                <span className={getStatusBadge(calculation.status)}>
                  {calculation.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Information</h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-900 mb-1">Calculation Notes</h4>
                <p className="text-sm text-blue-800">
                  This rebate calculation is based on the contract terms for {calculation.period}. 
                  {calculation.variance !== 0 && (
                    <> The variance of {formatCurrency(Math.abs(calculation.variance))} 
                    {calculation.variance > 0 ? ' in favor' : ' shortfall'} requires review.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {calculation.status === 'calculated' && (
          <div className="border-t border-slate-200 pt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors">
              Download Report
            </button>
            <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              Approve Payment
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};