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
  id: string;
  contractId: string;
  period: string;
  projectedAmount: number;
  confidence: number;
  factors: ForecastFactor[];
  createdAt: string;
  forecastType: 'quarterly' | 'annual' | 'monthly';
  baselineAmount?: number;
  growthRate?: number;
}

export interface ForecastFactor {
  factor: string;
  impact: number;
  description: string;
  weight: number;
}

export interface ForecastParameters {
  contractId?: string;
  startPeriod?: string;
  endPeriod?: string;
  forecastType?: 'quarterly' | 'annual' | 'monthly';
  includeHistorical?: boolean;
}

export interface ForecastAnalytics {
  totalProjectedRevenue: number;
  averageConfidence: number;
  riskFactors: string[];
  opportunities: string[];
  trendAnalysis: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    description: string;
  };
}