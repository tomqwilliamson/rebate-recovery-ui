export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  lastLoginAt?: string;
  createdAt: string;
  isActive: boolean;
}

export type UserRole = 'admin' | 'contract_manager' | 'finance_analyst' | 'data_analyst' | 'compliance_officer';

export interface UserPermission {
  id: string;
  name: string;
  description: string;
}