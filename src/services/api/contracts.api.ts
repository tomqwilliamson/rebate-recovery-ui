import BaseApiService from './base.api';
import { 
  Contract, 
  ContractUpload, 
  ContractAmendment,
  Vendor,
  ContractType 
} from '@types/contract.types';
import { PaginatedResponse } from '@types/api.types';

class ContractsApiService extends BaseApiService {
  async getContracts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    vendorId?: string;
  }): Promise<PaginatedResponse<Contract>> {
    const response = await this.get<PaginatedResponse<Contract>>('/contracts', params);
    return response.data;
  }

  async getContract(id: string): Promise<Contract> {
    const response = await this.get<Contract>(`/contracts/${id}`);
    return response.data;
  }

  async uploadContract(contractUpload: ContractUpload): Promise<Contract> {
    const formData = new FormData();
    formData.append('file', contractUpload.file);
    
    if (contractUpload.vendorId) {
      formData.append('vendorId', contractUpload.vendorId);
    }
    
    if (contractUpload.contractType) {
      formData.append('contractType', contractUpload.contractType);
    }

    if (contractUpload.metadata) {
      formData.append('metadata', JSON.stringify(contractUpload.metadata));
    }

    const response = await this.upload<Contract>('/contracts/upload', formData);
    return response.data;
  }

  async updateContract(id: string, updates: Partial<Contract>): Promise<Contract> {
    const response = await this.put<Contract>(`/contracts/${id}`, updates);
    return response.data;
  }

  async deleteContract(id: string): Promise<void> {
    await this.delete(`/contracts/${id}`);
  }

  async getContractAmendments(contractId: string): Promise<ContractAmendment[]> {
    const response = await this.get<ContractAmendment[]>(`/contracts/${contractId}/amendments`);
    return response.data;
  }

  async uploadAmendment(contractId: string, file: File): Promise<ContractAmendment> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.upload<ContractAmendment>(
      `/contracts/${contractId}/amendments`,
      formData
    );
    return response.data;
  }

  async getVendors(): Promise<Vendor[]> {
    const response = await this.get<Vendor[]>('/vendors');
    return response.data;
  }

  async getContractTypes(): Promise<ContractType[]> {
    const response = await this.get<ContractType[]>('/contract-types');
    return response.data;
  }

  async searchContracts(query: string): Promise<Contract[]> {
    const response = await this.get<Contract[]>('/contracts/search', { q: query });
    return response.data;
  }
}

export const contractsApi = new ContractsApiService();