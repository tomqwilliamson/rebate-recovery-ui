import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';
import { formatCurrency, formatDate } from '@utils/formatters';
import { RebateDetailDialog } from './RebateDetailDialog';

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

const mockCalculations: RebateCalculation[] = [
  {
    id: '1',
    contractName: 'Medical Supplies Agreement 2024',
    vendor: 'AmeriMed Solutions',
    period: 'Q3 2024',
    expectedAmount: 135000,
    actualAmount: 132000,
    variance: -3000,
    status: 'calculated',
    calculatedAt: '2024-08-10',
    dueDate: '2024-09-30'
  },
  {
    id: '2',
    contractName: 'Surgical Equipment Contract',
    vendor: 'SurgiTech Corp',
    period: 'Q3 2024',
    expectedAmount: 89000,
    actualAmount: 89000,
    variance: 0,
    status: 'pending',
    calculatedAt: '2024-08-08',
    dueDate: '2024-09-30'
  },
  {
    id: '3',
    contractName: 'Pharmaceutical Supplies',
    vendor: 'MedTech Pharma',
    period: 'Q2 2024',
    expectedAmount: 156000,
    actualAmount: 154000,
    variance: -2000,
    status: 'paid',
    calculatedAt: '2024-07-15',
    dueDate: '2024-08-31'
  }
];

export const RebateCalculations: React.FC = () => {
  const [calculations, setCalculations] = useState<RebateCalculation[]>(mockCalculations);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedCalculation, setSelectedCalculation] = useState<RebateCalculation | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const runCalculations = async () => {
    setIsCalculating(true);
    // Simulate calculation process
    setTimeout(() => {
      setIsCalculating(false);
    }, 3000);
  };

  const handleViewDetails = (calculation: RebateCalculation) => {
    setSelectedCalculation(calculation);
    setIsDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
    setSelectedCalculation(null);
  };

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

  const totalExpected = calculations.reduce((sum, calc) => sum + calc.expectedAmount, 0);
  const totalActual = calculations.reduce((sum, calc) => sum + calc.actualAmount, 0);
  const totalVariance = totalActual - totalExpected;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Rebate Calculations</h1>
          <p className="text-slate-600">
            Automated rebate calculations and variance analysis
          </p>
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
          <Button 
            variant="primary" 
            onClick={runCalculations}
            loading={isCalculating}
          >
            {isCalculating ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Calculating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Calculations
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6" hover>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{calculations.length}</h3>
              <p className="text-sm text-slate-600">Total Calculations</p>
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalExpected)}</h3>
              <p className="text-sm text-slate-600">Expected Total</p>
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalActual)}</h3>
              <p className="text-sm text-slate-600">Actual Total</p>
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              totalVariance >= 0 
                ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                : 'bg-gradient-to-br from-red-500 to-red-600'
            }`}>
              {totalVariance >= 0 ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${getVarianceColor(totalVariance)}`}>
                {formatCurrency(totalVariance)}
              </h3>
              <p className="text-sm text-slate-600">Total Variance</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Calculations Table */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900">Recent Calculations</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Expected
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Variance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {calculations.map((calculation, index) => (
                <motion.tr
                  key={calculation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {calculation.contractName}
                      </div>
                      <div className="text-sm text-slate-500">
                        {calculation.vendor}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {calculation.period}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 text-right font-medium">
                    {formatCurrency(calculation.expectedAmount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 text-right font-medium">
                    {formatCurrency(calculation.actualAmount)}
                  </td>
                  <td className={`px-6 py-4 text-sm text-right font-medium ${getVarianceColor(calculation.variance)}`}>
                    {calculation.variance >= 0 ? '+' : ''}{formatCurrency(calculation.variance)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(calculation.status)}>
                      {calculation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDate(calculation.dueDate)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleViewDetails(calculation)}
                      >
                        View Details
                      </Button>
                      {calculation.status === 'calculated' && (
                        <Button variant="primary" size="sm">
                          Approve
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Calculation Progress */}
      {isCalculating && (
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Running Rebate Calculations...
              </h3>
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <p className="text-sm text-slate-600 mt-2">
                Processing contract terms and purchase data...
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Rebate Detail Dialog */}
      <RebateDetailDialog 
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        calculation={selectedCalculation}
      />
    </div>
  );
};
                  