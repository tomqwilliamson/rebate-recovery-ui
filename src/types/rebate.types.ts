export interface RebateCalculation {
  id: string;
  contractId: string;
  period: string;
  expectedAmount: number;
  actualAmount?: number;
  status: RebateStatus;
  calculatedAt: string;
  paidAt?: string;
  variance?: number;
}

export type RebateStatus = 'calculated' | 'pending' | 'paid' | 'disputed' | 'cancelled';

export interface RebateValidation {
  id: string;
  rebateCalculationId: string;
  validationType: 'general_ledger' | 'contract_terms' | 'item_matching';
  status: 'passed' | 'failed' | 'warning';
  details: string;
  validatedAt: string;
}

export interface RebateForecast {
  period: string;
  projectedAmount: number;
  confidence: number;
  factors: ForecastFactor[];
}

export interface ForecastFactor {
  factor: string;
  impact: number;
  description: string;
}