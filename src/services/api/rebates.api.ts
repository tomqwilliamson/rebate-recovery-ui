import BaseApiService from './base.api';
import { 
  RebateCalculation, 
  RebateValidation, 
  RebateForecast,
  ForecastParameters,
  ForecastAnalytics
} from '../../types/rebate.types';
import { PaginatedResponse } from '../../types/api.types';
import { mockForecastingService } from '@services/mock/mockForecastingService';
import { mockValidationService, ValidationRule, ValidationReport } from '@services/mock/mockValidationService';
import { mockRebateCalculationsService } from '@services/mock/mockRebateCalculationsService';

class RebatesApiService extends BaseApiService {
  async getRebateCalculations(params?: {
    page?: number;
    limit?: number;
    contractId?: string;
    status?: string;
    period?: string;
  }): Promise<PaginatedResponse<RebateCalculation>> {
    try {
      const response = await this.get<PaginatedResponse<RebateCalculation>>('/rebates/calculations', params);
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock rebate calculations service');
      return await mockRebateCalculationsService.getRebateCalculations(params);
    }
  }

  async getRebateCalculation(id: string): Promise<RebateCalculation> {
    try {
      const response = await this.get<RebateCalculation>(`/rebates/calculations/${id}`);
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock rebate calculations service');
      return await mockRebateCalculationsService.getRebateCalculation(id);
    }
  }

  async createRebateCalculation(contractId: string, period: string): Promise<RebateCalculation> {
    try {
      const response = await this.post<RebateCalculation>('/rebates/calculations', {
        contractId,
        period
      });
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock rebate calculations service');
      return await mockRebateCalculationsService.createRebateCalculation(contractId, period);
    }
  }

  async validateRebate(rebateId: string, validationType: string): Promise<RebateValidation[]> {
    const response = await this.post<RebateValidation[]>(`/rebates/${rebateId}/validate`, {
      validationType
    });
    return response.data;
  }

  async getRebateValidations(rebateId: string): Promise<RebateValidation[]> {
    const response = await this.get<RebateValidation[]>(`/rebates/${rebateId}/validations`);
    return response.data;
  }

  async getRebateForecasts(contractId?: string): Promise<RebateForecast[]> {
    try {
      const response = await this.get<RebateForecast[]>('/rebates/forecasts', { contractId });
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock forecasting service');
      return await mockForecastingService.generateForecasts({ contractId });
    }
  }

  async generateForecasts(params: ForecastParameters): Promise<RebateForecast[]> {
    try {
      const response = await this.post<RebateForecast[]>('/rebates/forecasts/generate', params);
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock forecasting service');
      return await mockForecastingService.generateForecasts(params);
    }
  }

  async getForecastAnalytics(forecasts: RebateForecast[]): Promise<ForecastAnalytics> {
    try {
      const response = await this.post<ForecastAnalytics>('/rebates/forecasts/analytics', { forecasts });
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock forecasting service');
      return await mockForecastingService.getForecastAnalytics(forecasts);
    }
  }

  async getForecastAccuracy(): Promise<{
    period: string;
    predicted: number;
    actual: number;
    accuracy: number;
  }[]> {
    try {
      const response = await this.get<any[]>('/rebates/forecasts/accuracy');
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock forecasting service');
      return await mockForecastingService.getHistoricalAccuracy();
    }
  }

  async simulateForecastScenarios(forecasts: RebateForecast[]): Promise<{
    scenario: string;
    description: string;
    forecasts: RebateForecast[];
  }[]> {
    try {
      const response = await this.post<any[]>('/rebates/forecasts/scenarios', { forecasts });
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock forecasting service');
      return await mockForecastingService.simulateScenarios(forecasts);
    }
  }

  async updateRebateStatus(id: string, status: string): Promise<RebateCalculation> {
    try {
      const response = await this.put<RebateCalculation>(`/rebates/calculations/${id}`, { status });
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock rebate calculations service');
      return await mockRebateCalculationsService.updateRebateStatus(id, status as any);
    }
  }

  // Validation API methods
  async getValidationRules(): Promise<ValidationRule[]> {
    try {
      const response = await this.get<ValidationRule[]>('/validations/rules');
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock validation service');
      return await mockValidationService.getValidationRules();
    }
  }

  async updateValidationRule(ruleId: string, updates: Partial<ValidationRule>): Promise<ValidationRule> {
    try {
      const response = await this.put<ValidationRule>(`/validations/rules/${ruleId}`, updates);
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock validation service');
      return await mockValidationService.updateValidationRule(ruleId, updates);
    }
  }

  async runValidation(rebateCalculationId: string, validationType?: string): Promise<ValidationReport> {
    try {
      const response = await this.post<ValidationReport>('/validations/run', {
        rebateCalculationId,
        validationType
      });
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock validation service');
      return await mockValidationService.runValidation(rebateCalculationId, validationType);
    }
  }

  async getValidationHistory(rebateCalculationId: string): Promise<ValidationReport[]> {
    try {
      const response = await this.get<ValidationReport[]>(`/validations/history/${rebateCalculationId}`);
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock validation service');
      return await mockValidationService.getValidationHistory(rebateCalculationId);
    }
  }

  async getValidationMetrics(): Promise<{
    totalValidationsRun: number;
    successRate: number;
    averageExecutionTime: number;
    commonFailures: { rule: string; count: number }[];
    trendData: { date: string; passed: number; failed: number; warnings: number }[];
  }> {
    try {
      const response = await this.get<any>('/validations/metrics');
      return response.data;
    } catch (error) {
      console.log('API unavailable, using mock validation service');
      return await mockValidationService.getValidationMetrics();
    }
  }
}

export const rebatesApi = new RebatesApiService();