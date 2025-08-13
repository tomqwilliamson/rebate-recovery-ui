export interface Contract {
  id: string;
  name: string;
  vendor: Vendor;
  type: ContractType;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  rebateRate: string;
  totalValue: number;
  itemsCount: number;
  lastModified: string;
  compliance: number;
  description?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  documentPath?: string;
  extractedTerms?: ContractTerm[];
  amendments?: ContractAmendment[];
}

export interface Vendor {
  id: string;
  name: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  status: 'active' | 'inactive';
}

export interface ContractType {
  id: string;
  name: string;
  description?: string;
}

export type ContractStatus = 'active' | 'expired' | 'pending' | 'draft' | 'cancelled';

export interface ContractTerm {
  id: string;
  contractId: string;
  termType: string;
  description: string;
  value: string;
  extractedAt: string;
  confidence: number;
}

export interface ContractAmendment {
  id: string;
  contractId: string;
  name: string;
  description?: string;
  uploadedAt: string;
  status: 'processing' | 'completed' | 'failed';
  documentPath: string;
}

export interface ContractUpload {
  file: File;
  vendorId?: string;
  contractType?: string;
  metadata?: Record<string, any>;
}