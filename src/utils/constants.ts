export const API_ENDPOINTS = {
  CONTRACTS: '/api/contracts',
  REBATES: '/api/rebates',
  VENDORS: '/api/vendors',
  AUTH: '/api/auth',
  ANALYTICS: '/api/analytics',
} as const;

export const CONTRACT_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  PENDING: 'pending',
  DRAFT: 'draft',
  CANCELLED: 'cancelled',
} as const;

export const REBATE_STATUS = {
  CALCULATED: 'calculated',
  PENDING: 'pending',
  PAID: 'paid',
  DISPUTED: 'disputed',
  CANCELLED: 'cancelled',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  CONTRACT_MANAGER: 'contract_manager',
  FINANCE_ANALYST: 'finance_analyst',
  DATA_ANALYST: 'data_analyst',
  COMPLIANCE_OFFICER: 'compliance_officer',
} as const;

export const FILE_UPLOAD_CONFIG = {
  MAX_SIZE: 50 * 1024 * 1024, // 50MB
  ACCEPTED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  ACCEPTED_EXTENSIONS: ['.pdf', '.doc', '.docx'],
} as const;