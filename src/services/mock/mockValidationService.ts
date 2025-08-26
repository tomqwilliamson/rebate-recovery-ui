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
  private readonly serviceVersion = '2.0.1-NUCLEAR'; // Updated for dynamic validation data
  
  constructor() {
    // NUCLEAR OPTION: Log immediately when service is created
    console.log('🚀 NUCLEAR DEPLOYMENT: MockValidationService v' + this.serviceVersion + ' LOADED!');
    console.log('🎯 If you see this message, the new validation service is deployed!');
  }
  
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

  private generateMockValidations(rebateCalculationId: string): RebateValidation[] {
    const timestamp = new Date().toISOString();
    return [
      {
        id: `v-${rebateCalculationId}-gl`,
        rebateCalculationId,
        validationType: 'general_ledger',
        status: Math.random() > 0.8 ? 'warning' : 'passed',
        details: Math.random() > 0.8 
          ? 'Minor variance detected in GL account reconciliation (within acceptable range)'
          : 'All general ledger entries match rebate calculations perfectly',
        validatedAt: timestamp
      },
      {
        id: `v-${rebateCalculationId}-ct`,
        rebateCalculationId,
        validationType: 'contract_terms',
        status: Math.random() > 0.7 ? 'warning' : 'passed',
        details: Math.random() > 0.7
          ? 'Rebate tier achievement is close to threshold (92-98% of required volume)'
          : 'All contract terms validated successfully, tier requirements met',
        validatedAt: timestamp
      },
      {
        id: `v-${rebateCalculationId}-im`,
        rebateCalculationId,
        validationType: 'item_matching',
        status: Math.random() > 0.9 ? 'failed' : 'passed',
        details: Math.random() > 0.9
          ? 'Product code mismatch detected in 3 items - manual review required'
          : `All product codes successfully matched (${Math.floor(Math.random() * 500) + 800} items verified)`,
        validatedAt: timestamp
      }
    ];
  }

  async getValidationRules(): Promise<ValidationRule[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`MockValidationService v${this.serviceVersion} - Loading validation rules`);
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
    
    console.log(`MockValidationService v${this.serviceVersion} - Running validation for ${rebateCalculationId}`);
    // Generate fresh validation data for this specific calculation
    const allValidations = this.generateMockValidations(rebateCalculationId);
    
    const validationsToRun = validationType 
      ? allValidations.filter(v => v.validationType === validationType)
      : allValidations;

    const totalChecks = validationsToRun.length * 3; // Multiple checks per validation type
    const passedChecks = Math.floor(Math.random() * 3) + Math.max(totalChecks - 4, 0);
    const failedChecks = Math.floor(Math.random() * 2);
    const warningChecks = totalChecks - passedChecks - failedChecks;

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
      validations: validationsToRun,
      overallStatus,
      validatedAt: new Date().toISOString(),
      validatedBy: 'Demo User',
      executionTime: 2500 + Math.random() * 2000
    };
  }

  async getValidationHistory(rebateCalculationId: string): Promise<ValidationReport[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate historical validation reports for any rebate calculation ID
    const historyCount = Math.floor(Math.random() * 3) + 2; // 2-4 historical reports
    const history: ValidationReport[] = [];
    
    for (let i = 0; i < historyCount; i++) {
      const daysAgo = (i + 1) * Math.floor(Math.random() * 3 + 1); // 1-3 days apart
      const totalChecks = 9;
      const passedChecks = Math.floor(Math.random() * 3) + 5;
      const failedChecks = Math.floor(Math.random() * 2);
      const warningChecks = totalChecks - passedChecks - failedChecks;
      
      const overallStatus: 'passed' | 'failed' | 'warning' = 
        failedChecks > 0 ? 'failed' : 
        warningChecks > 0 ? 'warning' : 'passed';
      
      history.push({
        id: `report-${rebateCalculationId}-${i + 1}`,
        rebateCalculationId,
        totalChecks,
        passedChecks,
        failedChecks,
        warningChecks,
        validations: this.generateMockValidations(rebateCalculationId),
        overallStatus,
        validatedAt: new Date(Date.now() - (daysAgo * 86400000)).toISOString(),
        validatedBy: Math.random() > 0.5 ? 'Demo User' : 'System Validator',
        executionTime: 2000 + Math.random() * 2000
      });
    }
    
    return history.reverse(); // Most recent first
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