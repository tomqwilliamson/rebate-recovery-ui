import BaseApiService from './base.api';
import { 
  RebateCalculation, 
  RebateValidation, 
  RebateForecast 
} from '@types/rebate.types';
import { PaginatedResponse } from '@types/api.types';

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
    const response = await this.get<RebateForecast[]>('/rebates/forecasts', { contractId });
    return response.data;
  }

  async updateRebateStatus(id: string, status: string): Promise<RebateCalculation> {
    const response = await this.put<RebateCalculation>(`/rebates/calculations/${id}`, { status });
    return response.data;
  }
}

export const rebatesApi = new RebatesApiService();