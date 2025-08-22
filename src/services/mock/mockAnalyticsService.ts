export interface AnalyticsMetrics {
  totalRebates: {
    value: number;
    change: number;
    trend: 'up' | 'down';
    period: string;
  };
  totalContracts: {
    active: number;
    expired: number;
    pending: number;
    total: number;
  };
  complianceMetrics: {
    overallRate: number;
    auditScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    lastAudit: string;
  };
  financialMetrics: {
    expectedRevenue: number;
    actualRevenue: number;
    variance: number;
    projectedAnnual: number;
  };
  performanceMetrics: {
    processingTime: number;
    accuracy: number;
    automationRate: number;
    errorRate: number;
  };
  trendData: {
    rebatesByMonth: Array<{ month: string; amount: number; contracts: number }>;
    complianceByQuarter: Array<{ quarter: string; rate: number; audits: number }>;
    processingMetrics: Array<{ date: string; processed: number; errors: number }>;
  };
  topContracts: Array<{
    id: string;
    name: string;
    vendor: string;
    totalRebates: number;
    compliance: number;
    status: 'active' | 'expiring' | 'renewed';
  }>;
  alerts: {
    critical: number;
    warnings: number;
    info: number;
    resolved: number;
  };
}

class MockAnalyticsService {
  async getAnalyticsMetrics(): Promise<AnalyticsMetrics> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      totalRebates: {
        value: 2840000,
        change: 18.5,
        trend: 'up',
        period: 'YTD 2024'
      },
      totalContracts: {
        active: 248,
        expired: 32,
        pending: 15,
        total: 295
      },
      complianceMetrics: {
        overallRate: 94.8,
        auditScore: 87.5,
        riskLevel: 'low',
        lastAudit: '2024-07-15T00:00:00Z'
      },
      financialMetrics: {
        expectedRevenue: 2650000,
        actualRevenue: 2840000,
        variance: 190000,
        projectedAnnual: 3800000
      },
      performanceMetrics: {
        processingTime: 2.3, // hours
        accuracy: 98.7,
        automationRate: 89.2,
        errorRate: 1.3
      },
      trendData: {
        rebatesByMonth: [
          { month: 'Jan 2024', amount: 245000, contracts: 45 },
          { month: 'Feb 2024', amount: 280000, contracts: 48 },
          { month: 'Mar 2024', amount: 320000, contracts: 52 },
          { month: 'Apr 2024', amount: 285000, contracts: 49 },
          { month: 'May 2024', amount: 365000, contracts: 58 },
          { month: 'Jun 2024', amount: 410000, contracts: 62 },
          { month: 'Jul 2024', amount: 395000, contracts: 59 },
          { month: 'Aug 2024', amount: 440000, contracts: 65 }
        ],
        complianceByQuarter: [
          { quarter: 'Q1 2024', rate: 92.3, audits: 15 },
          { quarter: 'Q2 2024', rate: 94.1, audits: 18 },
          { quarter: 'Q3 2024', rate: 96.2, audits: 22 },
          { quarter: 'Q4 2024', rate: 94.8, audits: 20 }
        ],
        processingMetrics: [
          { date: '2024-08-15', processed: 125, errors: 2 },
          { date: '2024-08-16', processed: 142, errors: 1 },
          { date: '2024-08-17', processed: 108, errors: 3 },
          { date: '2024-08-18', processed: 156, errors: 0 },
          { date: '2024-08-19', processed: 134, errors: 2 },
          { date: '2024-08-20', processed: 167, errors: 1 },
          { date: '2024-08-21', processed: 145, errors: 2 }
        ]
      },
      topContracts: [
        {
          id: 'contract-med-supplies-2024',
          name: 'Medical Supplies Agreement 2024',
          vendor: 'AmeriMed Solutions',
          totalRebates: 485000,
          compliance: 98.5,
          status: 'active'
        },
        {
          id: 'contract-surgical-equipment',
          name: 'Surgical Equipment Contract',
          vendor: 'SurgiTech Corp',
          totalRebates: 425000,
          compliance: 96.2,
          status: 'active'
        },
        {
          id: 'contract-pharma-supplies',
          name: 'Pharmaceutical Supplies',
          vendor: 'MedTech Pharma',
          totalRebates: 380000,
          compliance: 94.8,
          status: 'expiring'
        },
        {
          id: 'contract-diagnostic-equipment',
          name: 'Diagnostic Equipment',
          vendor: 'DiagnoTech Inc',
          totalRebates: 295000,
          compliance: 97.1,
          status: 'active'
        },
        {
          id: 'contract-emergency-medical',
          name: 'Emergency Medical Supplies',
          vendor: 'EmergMed Corp',
          totalRebates: 265000,
          compliance: 92.3,
          status: 'renewed'
        }
      ],
      alerts: {
        critical: 3,
        warnings: 12,
        info: 8,
        resolved: 47
      }
    };
  }

  async getRevenueProjections(months: number = 12): Promise<Array<{
    month: string;
    projected: number;
    actual?: number;
    confidence: number;
  }>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const baseDate = new Date();
    const projections = [];

    for (let i = 0; i < months; i++) {
      const date = new Date(baseDate);
      date.setMonth(date.getMonth() + i);
      
      const isHistorical = i < 8; // First 8 months are "actual"
      const baseAmount = 300000 + (Math.sin(i * 0.5) * 50000) + (i * 5000);
      
      projections.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        projected: Math.round(baseAmount * (1 + Math.random() * 0.1)),
        actual: isHistorical ? Math.round(baseAmount * (0.95 + Math.random() * 0.1)) : undefined,
        confidence: isHistorical ? 100 : Math.round(85 + Math.random() * 10)
      });
    }

    return projections;
  }

  async getContractPerformance(): Promise<Array<{
    contractId: string;
    vendor: string;
    rebateGoal: number;
    currentRebates: number;
    complianceScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    nextMilestone: string;
  }>> {
    await new Promise(resolve => setTimeout(resolve, 400));

    return [
      {
        contractId: 'contract-med-supplies-2024',
        vendor: 'AmeriMed Solutions',
        rebateGoal: 500000,
        currentRebates: 485000,
        complianceScore: 98.5,
        riskLevel: 'low',
        nextMilestone: '2024-09-30'
      },
      {
        contractId: 'contract-surgical-equipment',
        vendor: 'SurgiTech Corp', 
        rebateGoal: 450000,
        currentRebates: 425000,
        complianceScore: 96.2,
        riskLevel: 'low',
        nextMilestone: '2024-10-15'
      },
      {
        contractId: 'contract-pharma-supplies',
        vendor: 'MedTech Pharma',
        rebateGoal: 400000,
        currentRebates: 380000,
        complianceScore: 94.8,
        riskLevel: 'medium',
        nextMilestone: '2024-08-31'
      }
    ];
  }
}

export const mockAnalyticsService = new MockAnalyticsService();