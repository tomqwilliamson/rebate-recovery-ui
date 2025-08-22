import { RebateCalculation, RebateStatus } from '../../types/rebate.types';
import { PaginatedResponse } from '../../types/api.types';

class MockRebateCalculationsService {
  private mockCalculations: RebateCalculation[] = [
    {
      id: 'calc-001',
      contractId: 'contract-med-supplies-2024',
      period: 'Q3 2024',
      expectedAmount: 135000,
      actualAmount: 132000,
      status: 'calculated',
      calculatedAt: '2024-08-15T10:30:00Z',
      paidAt: undefined,
      variance: -3000
    },
    {
      id: 'calc-002',
      contractId: 'contract-surgical-equipment',
      period: 'Q3 2024',
      expectedAmount: 89000,
      actualAmount: 89000,
      status: 'pending',
      calculatedAt: '2024-08-12T14:20:00Z',
      paidAt: undefined,
      variance: 0
    },
    {
      id: 'calc-003',
      contractId: 'contract-pharma-supplies',
      period: 'Q2 2024',
      expectedAmount: 156000,
      actualAmount: 154000,
      status: 'paid',
      calculatedAt: '2024-07-18T09:15:00Z',
      paidAt: '2024-08-01T16:45:00Z',
      variance: -2000
    },
    {
      id: 'calc-004',
      contractId: 'contract-diagnostic-equipment',
      period: 'Q3 2024',
      expectedAmount: 78500,
      actualAmount: 82000,
      status: 'calculated',
      calculatedAt: '2024-08-10T11:00:00Z',
      paidAt: undefined,
      variance: 3500
    },
    {
      id: 'calc-005',
      contractId: 'contract-rehabilitation-supplies',
      period: 'Q2 2024',
      expectedAmount: 45000,
      actualAmount: 45000,
      status: 'disputed',
      calculatedAt: '2024-07-22T13:30:00Z',
      paidAt: undefined,
      variance: 0
    },
    {
      id: 'calc-006',
      contractId: 'contract-emergency-medical',
      period: 'Q3 2024',
      expectedAmount: 112000,
      actualAmount: 115000,
      status: 'pending',
      calculatedAt: '2024-08-08T08:45:00Z',
      paidAt: undefined,
      variance: 3000
    },
    {
      id: 'calc-007',
      contractId: 'contract-laboratory-equipment',
      period: 'Q1 2024',
      expectedAmount: 95000,
      actualAmount: 92000,
      status: 'paid',
      calculatedAt: '2024-04-15T10:20:00Z',
      paidAt: '2024-05-01T14:30:00Z',
      variance: -3000
    },
    {
      id: 'calc-008',
      contractId: 'contract-dental-supplies',
      period: 'Q3 2024',
      expectedAmount: 67000,
      actualAmount: 70000,
      status: 'calculated',
      calculatedAt: '2024-08-14T15:45:00Z',
      paidAt: undefined,
      variance: 3000
    }
  ];

  async getRebateCalculations(params?: {
    page?: number;
    limit?: number;
    contractId?: string;
    status?: string;
    period?: string;
  }): Promise<PaginatedResponse<RebateCalculation>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredCalculations = [...this.mockCalculations];

    // Apply filters
    if (params?.contractId) {
      filteredCalculations = filteredCalculations.filter(calc => 
        calc.contractId.toLowerCase().includes(params.contractId!.toLowerCase())
      );
    }

    if (params?.status && params.status !== 'all') {
      filteredCalculations = filteredCalculations.filter(calc => calc.status === params.status);
    }

    if (params?.period) {
      filteredCalculations = filteredCalculations.filter(calc => calc.period === params.period);
    }

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredCalculations.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: filteredCalculations.length,
        totalPages: Math.ceil(filteredCalculations.length / limit)
      }
    };
  }

  async getRebateCalculation(id: string): Promise<RebateCalculation> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const calculation = this.mockCalculations.find(calc => calc.id === id);
    if (!calculation) {
      throw new Error('Rebate calculation not found');
    }
    return calculation;
  }

  async createRebateCalculation(contractId: string, period: string): Promise<RebateCalculation> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newCalculation: RebateCalculation = {
      id: `calc-${Date.now()}`,
      contractId,
      period,
      expectedAmount: Math.floor(Math.random() * 100000) + 50000,
      actualAmount: undefined,
      status: 'calculated',
      calculatedAt: new Date().toISOString(),
      paidAt: undefined,
      variance: undefined
    };

    // Calculate actual amount and variance
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    newCalculation.actualAmount = Math.floor(newCalculation.expectedAmount * (1 + variation));
    newCalculation.variance = newCalculation.actualAmount - newCalculation.expectedAmount;

    this.mockCalculations.unshift(newCalculation);
    return newCalculation;
  }

  async updateRebateStatus(id: string, status: RebateStatus): Promise<RebateCalculation> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const calculationIndex = this.mockCalculations.findIndex(calc => calc.id === id);
    if (calculationIndex === -1) {
      throw new Error('Rebate calculation not found');
    }

    const calculation = { ...this.mockCalculations[calculationIndex] };
    calculation.status = status;
    
    if (status === 'paid') {
      calculation.paidAt = new Date().toISOString();
    }

    this.mockCalculations[calculationIndex] = calculation;
    return calculation;
  }

  // Helper method to get calculations for validation dropdown
  async getCalculationsForValidation(): Promise<{ id: string; label: string }[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return this.mockCalculations
      .filter(calc => calc.status === 'calculated' || calc.status === 'pending')
      .map(calc => ({
        id: calc.id,
        label: `${calc.contractId} - ${calc.period}`
      }));
  }
}

export const mockRebateCalculationsService = new MockRebateCalculationsService();