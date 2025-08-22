import { RebateValidation, RebateCalculation } from '../../types/rebate.types';

export interface ValidationRule {
  id: string;
  name: string;
  category: 'general_ledger' | 'contract_terms' | 'item_matching';
  description: string;
  severity: 'error' | 'warning' | 'info';
  enabled: boolean;
}

export interface ValidationReport {
  id: string;
  rebateCalculationId: string;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
  validations: RebateValidation[];
  overallStatus: 'passed' | 'failed' | 'warning';
  validatedAt: string;
  validatedBy: string;
  executionTime: number;
}

class MockValidationService {
  private validationRules: ValidationRule[] = [
    {
      id: 'gl-001',
      name: 'General Ledger Balance Check',
      category: 'general_ledger',
      description: 'Ensures rebate amounts match general ledger entries',
      severity: 'error',
      enabled: true
    },
    {
      id: 'gl-002', 
      name: 'Account Code Validation',
      category: 'general_ledger',
      description: 'Validates correct account codes are used for rebate entries',
      severity: 'warning',
      enabled: true
    },
    {
      id: 'ct-001',
      name: 'Contract Terms Compliance',
      category: 'contract_terms',
      description: 'Verifies rebate calculations comply with contract terms',
      severity: 'error',
      enabled: true
    },
    {
      id: 'ct-002',
      name: 'Tier Achievement Validation',
      category: 'contract_terms',
      description: 'Confirms rebate tiers are correctly achieved',
      severity: 'error',
      enabled: true
    },
    {
      id: 'ct-003',
      name: 'Date Range Validation',
      category: 'contract_terms',
      description: 'Ensures transactions fall within contract periods',
      severity: 'warning',
      enabled: true
    },
    {
      id: 'im-001',
      name: 'Product Code Matching',
      category: 'item_matching',
      description: 'Validates product codes match between systems',
      severity: 'error',
      enabled: true
    },
    {
      id: 'im-002',
      name: 'Quantity Reconciliation',
      category: 'item_matching',
      description: 'Reconciles quantities between purchase and rebate data',
      severity: 'warning',
      enabled: true
    },
    {
      id: 'im-003',
      name: 'Unit Price Validation',
      category: 'item_matching',
      description: 'Validates unit prices are within expected ranges',
      severity: 'info',
      enabled: true
    }
  ];

  private mockValidations: RebateValidation[] = [
    {
      id: 'v-001',
      rebateCalculationId: 'calc-001',
      validationType: 'general_ledger',
      status: 'passed',
      details: 'All general ledger entries match rebate calculations',
      validatedAt: new Date().toISOString()
    },
    {
      id: 'v-002',
      rebateCalculationId: 'calc-001',
      validationType: 'contract_terms',
      status: 'warning',
      details: 'Rebate tier achievement is close to threshold (95% of required volume)',
      validatedAt: new Date().toISOString()
    },
    {
      id: 'v-003',
      rebateCalculationId: 'calc-001',
      validationType: 'item_matching',
      status: 'passed',
      details: 'All product codes successfully matched between systems',
      validatedAt: new Date().toISOString()
    }
  ];

  async getValidationRules(): Promise<ValidationRule[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.validationRules;
  }

  async updateValidationRule(ruleId: string, updates: Partial<ValidationRule>): Promise<ValidationRule> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const ruleIndex = this.validationRules.findIndex(rule => rule.id === ruleId);
    if (ruleIndex !== -1) {
      this.validationRules[ruleIndex] = { ...this.validationRules[ruleIndex], ...updates };
      return this.validationRules[ruleIndex];
    }
    throw new Error('Validation rule not found');
  }

  async runValidation(rebateCalculationId: string, validationType?: string): Promise<ValidationReport> {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    const validationsToRun = validationType 
      ? this.mockValidations.filter(v => v.validationType === validationType)
      : this.mockValidations.filter(v => v.rebateCalculationId === rebateCalculationId);

    const totalChecks = 8;
    const passedChecks = Math.floor(Math.random() * 3) + 5;
    const failedChecks = Math.floor(Math.random() * 2);
    const warningChecks = totalChecks - passedChecks - failedChecks;

    const validations: RebateValidation[] = [
      {
        id: `v-${Date.now()}-1`,
        rebateCalculationId,
        validationType: 'general_ledger',
        status: failedChecks > 0 ? 'failed' : 'passed',
        details: failedChecks > 0 
          ? 'Variance detected in GL account 4500-REV: Expected $135,000, Found $132,000' 
          : 'All general ledger entries reconciled successfully',
        validatedAt: new Date().toISOString()
      },
      {
        id: `v-${Date.now()}-2`,
        rebateCalculationId,
        validationType: 'contract_terms',
        status: warningChecks > 0 ? 'warning' : 'passed',
        details: warningChecks > 0
          ? 'Volume threshold achieved at 98% - close monitoring recommended'
          : 'All contract terms validated successfully',
        validatedAt: new Date().toISOString()
      },
      {
        id: `v-${Date.now()}-3`,
        rebateCalculationId,
        validationType: 'item_matching',
        status: 'passed',
        details: 'Product code matching: 1,247 items matched, 0 discrepancies',
        validatedAt: new Date().toISOString()
      }
    ];

    const overallStatus: 'passed' | 'failed' | 'warning' = 
      failedChecks > 0 ? 'failed' : 
      warningChecks > 0 ? 'warning' : 'passed';

    return {
      id: `report-${Date.now()}`,
      rebateCalculationId,
      totalChecks,
      passedChecks,
      failedChecks,
      warningChecks,
      validations,
      overallStatus,
      validatedAt: new Date().toISOString(),
      validatedBy: 'System Validator',
      executionTime: 2500 + Math.random() * 2000
    };
  }

  async getValidationHistory(rebateCalculationId: string): Promise<ValidationReport[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'report-1',
        rebateCalculationId,
        totalChecks: 8,
        passedChecks: 6,
        failedChecks: 1,
        warningChecks: 1,
        validations: this.mockValidations.filter(v => v.rebateCalculationId === rebateCalculationId),
        overallStatus: 'failed',
        validatedAt: new Date(Date.now() - 86400000).toISOString(),
        validatedBy: 'Demo User',
        executionTime: 3200
      },
      {
        id: 'report-2',
        rebateCalculationId,
        totalChecks: 8,
        passedChecks: 7,
        failedChecks: 0,
        warningChecks: 1,
        validations: this.mockValidations.filter(v => v.rebateCalculationId === rebateCalculationId),
        overallStatus: 'warning',
        validatedAt: new Date(Date.now() - 43200000).toISOString(),
        validatedBy: 'Demo User',
        executionTime: 2800
      }
    ];
  }

  async getValidationMetrics(): Promise<{
    totalValidationsRun: number;
    successRate: number;
    averageExecutionTime: number;
    commonFailures: { rule: string; count: number }[];
    trendData: { date: string; passed: number; failed: number; warnings: number }[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      totalValidationsRun: 247,
      successRate: 87.4,
      averageExecutionTime: 2950,
      commonFailures: [
        { rule: 'General Ledger Balance Check', count: 12 },
        { rule: 'Contract Terms Compliance', count: 8 },
        { rule: 'Product Code Matching', count: 5 }
      ],
      trendData: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6-i) * 86400000).toISOString().split('T')[0],
        passed: Math.floor(Math.random() * 20) + 15,
        failed: Math.floor(Math.random() * 5),
        warnings: Math.floor(Math.random() * 8) + 2
      }))
    };
  }
}

export const mockValidationService = new MockValidationService();