import BaseApiService from './base.api';
import { 
  RebateCalculation, 
  RebateValidation, 
  RebateForecast,
  ForecastParameters,
  ForecastAnalytics
} from '@types/rebate.types';
import { PaginatedResponse } from '@types/api.types';
import { mockForecastingService } from '@services/mock/mockForecastingService';

class RebatesApiService extends BaseApiService {
  async getRebateCalculations(params?: {
    page?: number;
    limit?: number;
    contractId?: string;
    status?: string;
    period?: string;
  }): Promise<PaginatedResponse<RebateCalculation>> {
    const response = await this.get<PaginatedResponse<RebateCalculation>>('/rebates/calculations', params);
    return response.data;
  }

  async getRebateCalculation(id: string): Promise<RebateCalculation> {
    const response = await this.get<RebateCalculation>(`/rebates/calculations/${id}`);
    return response.data;
  }

  async createRebateCalculation(contractId: string, period: string): Promise<RebateCalculation> {
    const response = await this.post<RebateCalculation>('/rebates/calculations', {
      contractId,
      period
    });
    return response.data;
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
    const response = await this.put<RebateCalculation>(`/rebates/calculations/${id}`, { status });
    return response.data;
  }
}

export const rebatesApi = new RebatesApiService();