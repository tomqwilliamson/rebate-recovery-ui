export interface ComplianceReport {
  id: string;
  title: string;
  type: 'audit' | 'regulatory' | 'internal' | 'vendor';
  status: 'completed' | 'in_progress' | 'scheduled' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  completedAt?: string;
  dueDate: string;
  assignedTo: string;
  description: string;
  findings: ComplianceFinding[];
  overallScore: number;
  recommendations: string[];
  contractsAudited: number;
  issuesFound: number;
  issuesResolved: number;
}

export interface ComplianceFinding {
  id: string;
  category: 'documentation' | 'contract_terms' | 'payment_accuracy' | 'regulatory' | 'data_integrity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  contractId?: string;
  status: 'open' | 'in_progress' | 'resolved';
  assignedTo: string;
  dueDate: string;
  resolution?: string;
}

export interface ComplianceMetrics {
  overallScore: number;
  totalReports: number;
  completedReports: number;
  overdueReports: number;
  criticalFindings: number;
  resolvedFindings: number;
  averageResolutionTime: number; // in days
  complianceByCategory: Array<{
    category: string;
    score: number;
    trend: 'improving' | 'declining' | 'stable';
  }>;
  monthlyTrends: Array<{
    month: string;
    score: number;
    reportsCompleted: number;
    findingsResolved: number;
  }>;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

class MockComplianceService {
  private mockReports: ComplianceReport[] = [
    {
      id: 'comp-001',
      title: 'Q3 2024 Financial Audit',
      type: 'audit',
      status: 'completed',
      priority: 'high',
      createdAt: '2024-07-01T00:00:00Z',
      completedAt: '2024-08-15T00:00:00Z',
      dueDate: '2024-08-30T00:00:00Z',
      assignedTo: 'Sarah Johnson',
      description: 'Comprehensive financial audit of rebate calculations and payments for Q3 2024',
      findings: [],
      overallScore: 94.5,
      recommendations: [
        'Implement automated variance detection for rebate calculations',
        'Enhance documentation for contract term interpretations',
        'Establish monthly reconciliation procedures'
      ],
      contractsAudited: 45,
      issuesFound: 8,
      issuesResolved: 6
    },
    {
      id: 'comp-002',
      title: 'SOX Compliance Review',
      type: 'regulatory',
      status: 'in_progress',
      priority: 'critical',
      createdAt: '2024-08-01T00:00:00Z',
      dueDate: '2024-09-15T00:00:00Z',
      assignedTo: 'Michael Chen',
      description: 'Sarbanes-Oxley compliance review of financial controls and reporting processes',
      findings: [],
      overallScore: 0,
      recommendations: [],
      contractsAudited: 0,
      issuesFound: 0,
      issuesResolved: 0
    },
    {
      id: 'comp-003',
      title: 'Vendor Compliance Assessment',
      type: 'vendor',
      status: 'completed',
      priority: 'medium',
      createdAt: '2024-06-15T00:00:00Z',
      completedAt: '2024-07-20T00:00:00Z',
      dueDate: '2024-07-31T00:00:00Z',
      assignedTo: 'Lisa Rodriguez',
      description: 'Assessment of top 5 vendors for contract compliance and rebate accuracy',
      findings: [],
      overallScore: 91.2,
      recommendations: [
        'Standardize vendor reporting formats',
        'Implement quarterly vendor scorecards',
        'Enhance vendor training programs'
      ],
      contractsAudited: 25,
      issuesFound: 12,
      issuesResolved: 10
    },
    {
      id: 'comp-004',
      title: 'Data Integrity Review',
      type: 'internal',
      status: 'overdue',
      priority: 'high',
      createdAt: '2024-07-01T00:00:00Z',
      dueDate: '2024-08-15T00:00:00Z',
      assignedTo: 'David Kim',
      description: 'Review of data integrity across rebate calculation systems',
      findings: [],
      overallScore: 0,
      recommendations: [],
      contractsAudited: 0,
      issuesFound: 0,
      issuesResolved: 0
    },
    {
      id: 'comp-005',
      title: 'Contract Terms Validation',
      type: 'internal',
      status: 'scheduled',
      priority: 'medium',
      createdAt: '2024-08-20T00:00:00Z',
      dueDate: '2024-09-30T00:00:00Z',
      assignedTo: 'Emma Thompson',
      description: 'Validation of contract terms interpretation and application in rebate calculations',
      findings: [],
      overallScore: 0,
      recommendations: [],
      contractsAudited: 0,
      issuesFound: 0,
      issuesResolved: 0
    }
  ];

  private mockFindings: ComplianceFinding[] = [
    {
      id: 'finding-001',
      category: 'payment_accuracy',
      severity: 'high',
      description: 'Rebate payment variance exceeds 5% threshold for contract MED-2024-001',
      contractId: 'contract-med-supplies-2024',
      status: 'resolved',
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-08-25T00:00:00Z',
      resolution: 'Updated calculation formula to account for volume tier adjustments'
    },
    {
      id: 'finding-002',
      category: 'documentation',
      severity: 'medium',
      description: 'Missing supporting documentation for rebate calculation methodology',
      contractId: 'contract-surgical-equipment',
      status: 'in_progress',
      assignedTo: 'Michael Chen',
      dueDate: '2024-09-01T00:00:00Z'
    },
    {
      id: 'finding-003',
      category: 'contract_terms',
      severity: 'critical',
      description: 'Ambiguous contract terms leading to calculation discrepancies',
      contractId: 'contract-pharma-supplies',
      status: 'open',
      assignedTo: 'Lisa Rodriguez',
      dueDate: '2024-08-30T00:00:00Z'
    },
    {
      id: 'finding-004',
      category: 'data_integrity',
      severity: 'medium',
      description: 'Data synchronization issues between systems causing delays',
      status: 'in_progress',
      assignedTo: 'David Kim',
      dueDate: '2024-09-05T00:00:00Z'
    },
    {
      id: 'finding-005',
      category: 'regulatory',
      severity: 'low',
      description: 'Minor reporting format deviations from regulatory requirements',
      status: 'resolved',
      assignedTo: 'Emma Thompson',
      dueDate: '2024-08-20T00:00:00Z',
      resolution: 'Updated reporting templates to match current regulatory standards'
    }
  ];

  async getComplianceReports(filters?: {
    status?: string;
    type?: string;
    priority?: string;
  }): Promise<ComplianceReport[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    let reports = [...this.mockReports];

    if (filters?.status && filters.status !== 'all') {
      reports = reports.filter(report => report.status === filters.status);
    }

    if (filters?.type && filters.type !== 'all') {
      reports = reports.filter(report => report.type === filters.type);
    }

    if (filters?.priority && filters.priority !== 'all') {
      reports = reports.filter(report => report.priority === filters.priority);
    }

    // Add findings to reports
    reports.forEach(report => {
      if (report.status === 'completed') {
        report.findings = this.mockFindings.filter(f => Math.random() > 0.5).slice(0, 3);
      }
    });

    return reports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getComplianceMetrics(): Promise<ComplianceMetrics> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      overallScore: 92.8,
      totalReports: this.mockReports.length,
      completedReports: this.mockReports.filter(r => r.status === 'completed').length,
      overdueReports: this.mockReports.filter(r => r.status === 'overdue').length,
      criticalFindings: this.mockFindings.filter(f => f.severity === 'critical').length,
      resolvedFindings: this.mockFindings.filter(f => f.status === 'resolved').length,
      averageResolutionTime: 12.5,
      complianceByCategory: [
        { category: 'Payment Accuracy', score: 94.2, trend: 'improving' },
        { category: 'Documentation', score: 91.5, trend: 'stable' },
        { category: 'Contract Terms', score: 89.8, trend: 'improving' },
        { category: 'Data Integrity', score: 95.1, trend: 'stable' },
        { category: 'Regulatory', score: 96.3, trend: 'improving' }
      ],
      monthlyTrends: [
        { month: 'May 2024', score: 89.2, reportsCompleted: 3, findingsResolved: 8 },
        { month: 'Jun 2024', score: 91.5, reportsCompleted: 4, findingsResolved: 12 },
        { month: 'Jul 2024', score: 92.1, reportsCompleted: 5, findingsResolved: 15 },
        { month: 'Aug 2024', score: 92.8, reportsCompleted: 3, findingsResolved: 9 }
      ],
      riskDistribution: {
        low: 45,
        medium: 32,
        high: 18,
        critical: 5
      }
    };
  }

  async getComplianceFinding(id: string): Promise<ComplianceFinding> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const finding = this.mockFindings.find(f => f.id === id);
    if (!finding) {
      throw new Error('Finding not found');
    }
    return finding;
  }

  async updateFindingStatus(id: string, status: 'open' | 'in_progress' | 'resolved', resolution?: string): Promise<ComplianceFinding> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const findingIndex = this.mockFindings.findIndex(f => f.id === id);
    if (findingIndex === -1) {
      throw new Error('Finding not found');
    }

    const finding = { ...this.mockFindings[findingIndex] };
    finding.status = status;
    if (resolution) {
      finding.resolution = resolution;
    }

    this.mockFindings[findingIndex] = finding;
    return finding;
  }

  async generateComplianceReport(params: {
    title: string;
    type: 'audit' | 'regulatory' | 'internal' | 'vendor';
    priority: 'low' | 'medium' | 'high' | 'critical';
    assignedTo: string;
    dueDate: string;
    description: string;
  }): Promise<ComplianceReport> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newReport: ComplianceReport = {
      id: `comp-${Date.now()}`,
      ...params,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      findings: [],
      overallScore: 0,
      recommendations: [],
      contractsAudited: 0,
      issuesFound: 0,
      issuesResolved: 0
    };

    this.mockReports.unshift(newReport);
    return newReport;
  }
}

export const mockComplianceService = new MockComplianceService();